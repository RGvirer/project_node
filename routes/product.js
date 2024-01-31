import express from "express";
import * as productController from '../controllers/product.js'
import {auth} from "../middlewares/auth.js"
import {adminAuth} from "../middlewares/authAdmin.js"
//ניתובים אפשריים:
const router=express.Router();
router.get("/",productController.getAllProducts);
router.get('/:id',productController.getProductById);
router.delete('/:id',adminAuth,productController.deleteProductById);
router.post("/",adminAuth,productController.addNewProduct);
router.put("/:id",adminAuth,productController.updateProductById);

export default router;