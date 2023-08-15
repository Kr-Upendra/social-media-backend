import dotenv from "dotenv";
dotenv.config();
import app from "./app.js";

const port = process.env.PORT;

app.listen(port, () =>
  console.log(`server started at http://127.0.0.1:${port}`)
);
