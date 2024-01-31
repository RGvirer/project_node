import express from "express";
import * as orderController from '../controllers/order.js'
import { auth } from "../middlewares/auth.js";
import { adminAuth } from "../middlewares/authAdmin.js";

//ניתובים אפשריים:
const router = express.Router();
router.get("/",adminAuth, orderController.getAllOrders);
router.get("/myOrders",auth,orderController.getOrdersOfUser);
router.delete('/:id', auth, orderController.deleteOrderById);
router.post("/", auth, orderController.addNewOrder);
router.put("/:id",adminAuth,orderController.updateIfOrderStarted)
export default router;