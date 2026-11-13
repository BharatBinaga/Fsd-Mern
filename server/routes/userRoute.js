import express from "express";
import {
  create,
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserById,
} from "../controller/userController.js";

const route = express.Router();

route.post("/user", create);
route.get("/users", getAllUsers);
route.get("/users/:id", getUserById);
route.put("/users/:id", updateUserById);
route.delete("/delete/:id", deleteUserById);

export default route;