import { Product, productValidator } from "../models/product.js";
import mongoose from "mongoose";


export const getAllProducts = async (req, res) => {
    try {
        let { productsInScreen, numOfScreen, textToSearch, minPrice, maxPrice } = req.query;
        if (!productsInScreen)
            productsInScreen = 30;
        if (!numOfScreen)
            numOfScreen = 1;
        let search = {};
        if (textToSearch) {
            search = {
                $or: [{ model: { $regex: `.*${textToSearch}.*`, $options: 'i' } },
                { description: { $regex: `.*${textToSearch}.*`, $options: 'i' } }]
            };
        }
        if (minPrice || maxPrice) {
            search.price = {};
            if (minPrice) {
                search.price.$gte = parseFloat(minPrice);
            }
            if (maxPrice) {
                search.price.$lte = parseFloat(maxPrice);
            }
        }
        let products = await Product.find(search).skip((numOfScreen - 1) * productsInScreen).limit(productsInScreen);
        res.json(products);
    } catch (err) {
        res.status(400).send("problem: " + err.message);
    }
};


export const getProductById = async (req, res) => {
    try {
        let { id } = req.params;
        if (!mongoose.isValidObjectId(id))
            return res.status(400).send("this id is not valid")
        let product = await Product.findById(id);
        if (!product)
            return res.status(404).send("no such product");
        res.json(product)
    }
    catch (err) {
        res.status(400).send("The product cannot be received " + err.message);
    }
}
export const deleteProductById = async (req, res) => {
    let { id } = req.params;
    if (!mongoose.isValidObjectId(id))
        return res.status(400).send("not valid id");
    let product = await Product.findById(id);
    if (product.ownerUser != req.uuser._id)
        return res.status(403).send("you can only delete products that you have added");
    let deletedProduct = await Product.findByIdAndDelete(id);
    if (!deletedProduct)
        return res.status(404).send("no such product was found");
    return res.json(deletedProduct);

}


export const addNewProduct = async (req, res) => {
    try {
        let { name, description, routingToImage, manufacturingDate } = req.body;
        let validate = productValidator(req.body);
        let ownerUser = req.uuser._id;
        if (validate.error) {
            for (let i = 0; i < validate.error.length; i++) {
                console.log(validate.error[i]);
            }
            return res.status(400).json(validate.error[0]);
        }

        let sameProducts = await Product.find(req.body);
        if (sameProducts.length > 0)
            return res.status(409).send("this product already exists ");
        let newProduct = new Product({ name, description, routingToImage, manufacturingDate, ownerUser });
        await newProduct.save();
        res.status(201).json(newProduct)
    }
    catch (err) {
        res.status(400).send("an error occured in: " + err.message);
    }
}

export const updateProductById = async (req, res) => {
    let { id } = req.params;
    let { name, numPages, audience } = req.body;
    if (!mongoose.isValidObjectId(id))
        return res.status(400).send("not valid id")
    try {
        let product = await Product.findById(id);
        if (!product)
            return res.status(404).send("no such product");
        product.name = name || product.name;
        product.numPages = numPages || product.numPages;
        product.audience = audience || product.audience;
        await product.save();
        res.json(product);
    }
    catch (err) {
        res.status(400).send("its impossible to update this product" + err.message);
    }
}