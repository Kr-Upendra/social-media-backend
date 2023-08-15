import dotenv from "dotenv";
dotenv.config();
import app from "./app.js";
import { connectToDatabase } from "./dbConnection/connect.js";

const port = process.env.PORT;
const devDB = process.env.DEV_DATABASE;

connectToDatabase(devDB);

app.listen(port, () =>
  console.log(`server started at http://127.0.0.1:${port}`)
);
