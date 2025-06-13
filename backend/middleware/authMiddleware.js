import jwt from 'jsonwebtoken';
import User from "../models/UserModel.js"

const protect = (roles = []) => async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return res.status(401).json({ msg: "Not authorized, no token" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id);
    if (roles.length && !roles.includes(req.user.role)) {
      return res.status(403).json({ msg: "Forbidden: Role not allowed" });
    }
    next();
  } catch (err) {
    return res.status(401).json({ msg: "Token is not valid" });
  }
};

export default protect;
