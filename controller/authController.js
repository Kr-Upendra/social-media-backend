import jwt from "jsonwebtoken";
import { promisify } from "util";
import { findById, findOne } from "../utils/userFunction.js";
import { AppError } from "../utils/AppError.js";

const authenticate = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return next(new AppError("please provide email and password!", 400));

    const user = findOne(email);
    if (!user || user.password !== password)
      return next(new AppError("Invalid username of password!", 400));

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

  if (!token) return next(new AppError("You are not authenticated!", 401));

  const decoded = await promisify(jwt.verify)(
    token,
    process.env.JWT_SECRET_KEY
  );

  const user = findById(decoded.userId);

  if (!user)
    return next(
      new AppError("The user belonging to this token does no longer exist", 401)
    );

  user.password = undefined;

  req.user = decoded;
  next();
};

export default { authenticate, protect };
