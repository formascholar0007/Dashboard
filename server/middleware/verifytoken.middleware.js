import jwt from "jsonwebtoken";
const secretKey = process.env.JWT_SECRET;

export const verifyToken = (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    return res
      .status(401)
      .json({ message: "Access Denied. No token provided." });
  }
  try {
    const decode = jwt.verify(token, secretKey);
    req.user = decode;
    console.log("req.user " , req.user)
     next();
  } catch (err) {
    return res.status(400).json({ message: "Invalid token." });
  }
};
