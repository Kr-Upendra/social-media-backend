import express from "express";
import morgan from "morgan";

import { router as userRouter } from "./route/userRoute.js";

const app = express();

app.use(express.json());

if (process.env.NODE_ENV !== "production") app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "server started!",
  });
});

app.use("/api/", userRouter);

export default app;
