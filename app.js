import express from "express";
import morgan from "morgan";

import { router as userRouter } from "./route/userRoute.js";
import { router as postRouter } from "./route/postRoute.js";
import { router as commentRouter } from "./route/commentRoute.js";
import { globalErrorHandler } from "./controller/errorController.js";
import { AppError } from "./utils/AppError.js";

const app = express();

app.use(express.json());

if (process.env.NODE_ENV !== "production") app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "Ohh You come across the right place!",
  });
});

app.use("/api/", userRouter);
app.use("/api/", postRouter);
app.use("/api/", commentRouter);

app.all("*", (req, res, next) => {
  next(
    new AppError(
      `The requested ${req.originalUrl} not exist on this server!`,
      404
    )
  );
});

app.use(globalErrorHandler);

export default app;
