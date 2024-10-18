import express from "express";

import { createProduct, deleteProduct, getProducts, updateProduct } from "../controller/product.controller.js";
const router = express.Router();

//read API
router.get("/", getProducts )
//create API a route 
router.post("/" , createProduct);

//update API
router.put("/:id", updateProduct);

///Delete API
router.delete("/:id", deleteProduct);


export default router;