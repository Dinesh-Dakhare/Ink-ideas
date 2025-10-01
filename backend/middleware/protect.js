import jwt from "jsonwebtoken";
import userSchema from "../model/userSchema.js";


export const protect = async (req, res, next) => {
   let token;


  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];


      const decoded = jwt.verify(token, process.env.JWT_SECRET);
  

      req.user = decoded; // attach user payload
      return next();
    } catch (err) {
      console.error("❌ Token verification error:", err.message);
      return res.status(403).json({ message: "Invalid token" });
    }
  }

  if (!token) {
    return res.status(401).json({ message: "Access token required" });
  }
};
