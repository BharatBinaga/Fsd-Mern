import express from "express";
import { create } from "../controller/userController.js";
import { getAllUsers } from "../controller/userController.js";
import { getUserById } from "../controller/userController.js";
import { updateUserById } from "../controller/userController.js";
import { deleteUserById } from "../controller/userController.js";

const route = express.Router();

route.post("/user", create);

route.get("/users", getAllUsers);

route.get("/users/:id", getUserById);

route.put("/users/:id", updateUserById);

route.delete("/delete/:id", deleteUserById);

export default route;