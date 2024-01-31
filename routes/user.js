import express from "express";
import * as userController from '../controllers/user.js';

const router = express.Router();
router.get("/", userController.getAllUsers);
router.post('/login', userController.login);
router.delete('/:id', userController.deleteUserById);
router.get('/:id', userController.getUserById);
router.post("/", userController.addNewUser);
router.put("/:id", userController.updateUserById);

export default router;