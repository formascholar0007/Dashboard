import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { User } from "../models/User.modal.js";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
dotenv.config();

const googleClientID = process.env.GOOGLE_CLIENT_ID;
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET;
const jwtSecret = process.env.JWT_SECRET;

const generateJwtToken = (user) => {
  return jwt.sign({ id: user._id , role: user.role}, jwtSecret, { expiresIn: "1d" });
};

const passportConfig = () => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: googleClientID,
        clientSecret: googleClientSecret,
        callbackURL: "http://localhost:3000/api/login/google/callback",
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          console.log("Google Profile", profile);
          let user = await User.findOne({ googleId: profile.id });

          if (!user) {
            user = new User({
              googleId: profile.id,
              displayName: profile.displayName,
              email: profile.emails[0].value,
              image: profile.photos[0].value,
            });
            await user.save();
          }

          const token = generateJwtToken(user);
          done(null, { user, token });
        } catch (error) {
          console.error("Error during Google Strategy", error);
          done(error, null);
        }
      }
    )
  );

  passport.serializeUser((data, done) => {
    console.log(data)
    done(null, data.user._id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id);
      done(null, user);
    } catch (error) {
      done(error, null);
    }
  });
};

export default passportConfig;
