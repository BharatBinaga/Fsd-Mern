import express from "express";
import mongoose from "mongoose";
import route from "./routes/userRoutes.js";
import cors from "cors"

const app = express();
app.use(cors());
app.use(express.json());
const PORT = 7000;
const MONGO_URL = "mongodb://localhost:27017/MERN";

app.use("/api", route);

mongoose
  .connect(MONGO_URL)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });
