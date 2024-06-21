import { Router } from "express";
import passport from "passport";
const router = Router();

router.get(
  "/login/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

router.get(
  "/api/login/google/callback",
  passport.authenticate("google"),
  (req, res) => {
    const token = req.user.token;
    res.cookie("jwt", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });
    res.redirect("http://localhost:5173/dashboard");
  }
);

router.get("/api/success/login", (req, res) => {
  console.log(req.cookies);
  if (req.cookies.jwt) {
    res.status(201).json({ user: req.user, token: req.cookies.jwt });
  } else {
    res.status(400).json({ message: "Unauthorized" });
  }
});

router.post("/api/logout", (req, res) => {
  req.logout(() => {
    res.clearCookie("jwt");
    res.status(201).json({ message: "Logged out successfully" });
  });
});


export default router;