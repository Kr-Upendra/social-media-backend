import express from "express";
import morgan from "morgan";

import { router as userRouter } from "./route/userRoute.js";
import { router as postRouter } from "./route/postRoute.js";
import { router as commentRouter } from "./route/commentRoute.js";

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
app.use("/api/", postRouter);
app.use("/api/", commentRouter);

app.all("*", (req, res) => {
  res.status(404).json({
    status: "fail",
    messag: `The requested ${req.originalUrl} not exist on this server!`,
  });
});

export default app;
