import mongoose from "mongoose";

const connectToDatabase = async (database) => {
  try {
    const response = await mongoose.connect(database);
    if (response.connection.readyState === 1) {
      console.log("MONGO CONNECTED!");
    } else {
      console.error("UNEXPECTED STATE", response.connection.readyState);
    }
  } catch (err) {
    console.error("mongo connection failed!", err);
  }
};

export { connectToDatabase };
