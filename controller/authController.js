import jwt from "jsonwebtoken";
import { promisify } from "util";
import { findById, findOne } from "../utils/userFunction.js";

const authenticate = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({
        status: "fail",
        message: "please provide email and password!",
      });

    const user = findOne(email);
    if (!user || user.password !== password)
      return res.status(400).json({
        status: "fail",
        message: "Invalid username of password!",
      });

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "10d",
    });

    res.status(400).json({
      status: "success",
      token,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      error: err,
    });
  }
};

const protect = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token)
    return res.status(401).json({
      status: "fail",
      message: "You are not authenticated!",
    });

  const decoded = await promisify(jwt.verify)(
    token,
    process.env.JWT_SECRET_KEY
  );

  const user = findById(decoded.userId);

  if (!user)
    return res.status(401).json({
      status: "fail",
      message: "The user belonging to this token does no longer exist",
    });

  user.password = undefined;

  req.user = decoded;
  next();
};

export default { authenticate, protect };
