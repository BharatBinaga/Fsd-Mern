import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import route from "./server/routes/userRoute.js";

const app = express();
app.use(bodyParser.json());
app.use(express.json());

const PORT = 7000;
const MONGO_URL = "mongodb://localhost:27017/MERN";

mongoose
  .connect(MONGO_URL)
  .then(() => {
    console.log("DB Connected");
    app.use("/api", route);
    app.listen(PORT, () => {
      console.log("Server Running");
    });
  })
  .catch((err) => {
    console.log("Error : DB not connected!", err);
  });