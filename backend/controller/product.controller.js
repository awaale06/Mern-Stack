import Product from "../models/product.model.js";
import mongoose from "mongoose";

export const getProducts =  async (req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json({ success: true, data: products });
    } catch (error) {
        console.error("Error in fetching products:", error.message);
        res.status(500).json({ success: false, message: "server error" });
    }
}

export const createProduct = async (req,res)=>{

    // user will send this data
    const product = req.body;

    if (!product.name || !product.price || !product.image){
        return res.status(400).json({ success:false, message: 'All fields are required' });
    }

    const newProduct = new Product(product)

    try {
        await newProduct.save();
        res.status(201).json({ success: true, data: newProduct });
    } catch (error) {
        console.error("Error in Create product:", error.message);
        res.status(500).json({ success: false, message: "server error" });
    }

}


export const updateProduct = async (req, res) =>{
    const {id} = req.params;
    const product = req.body;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({success:false, message: 'Invalid Product id' });
    }
    
    try{
    const updateProduct =  await Product.findByIdAndUpdate(id, product, {new:true});
    res.status(200).json({success:true , data:updateProduct});
   }catch(error){
    console.log("error in updating product:" , error.message);
    
    res.status(500).json({success:false , message:"server error"});
   }}

   export const deleteProduct =  async (req, res) =>{
    const {id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({success:false, message: 'Invalid Product id' });
    }
   try{
    await Product.findByIdAndDelete(id);
    res.status(200).json({success:true , message:"product deleted successfully"});
   }catch(error){
    console.log("error in deleting product:" , error.message);
    
    res.status(500).json({success:false , message:"server error"});
   }
    
}