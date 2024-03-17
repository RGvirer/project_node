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
        res.status(400).send("הבעיה: " + err.message);
    }
};


export const getProductById = async (req, res) => {
    try {
        let { id } = req.params;
        if (!mongoose.isValidObjectId(id))
            return res.status(400).send("id לא תקין")
        let product = await Product.findById(id);
        if (!product)
            return res.status(404).send("אין כזה מוצר");
        res.json(product)
    }
    catch (err) {
        res.status(400).send("לא אפשרי להביא את המוצר: " + err.message);
    }
}
export const deleteProductById = async (req, res) => {
    let { id } = req.params;
    if (!mongoose.isValidObjectId(id))
        return res.status(400).send("id לא תקין");
    let product = await Product.findById(id);
    if (product.ownerUser != req.uuser._id)
        return res.status(403).send("ביכולתך למחוק רק מוצרים שאתה הוספת");
    let deletedProduct = await Product.findByIdAndDelete(id);
    if (!deletedProduct)
        return res.status(404).send("לא נמצא כזה מוצר למחיקה");
    return res.json(deletedProduct);

}

export const addNewProduct = async (req, res) => {
    try {
        let { name, description, routingToImage, manufacturingDate, price, details, size } = req.body;
        let ownerUser = req.uuser._id;
        let validate = productValidator({ ...req.body, ownerUser });
        if (validate.error) {
            let errorMessages = [];
            validate.error.details.forEach((errorDetail) => {
                const { message, path } = errorDetail;
                const errorMessage = `${path.join('.')} ${message}`;
                errorMessages.push(errorMessage);
            });
            return res.status(400).send(errorMessages);
        };
        let sameProducts = await Product.find(req.body);
        if (sameProducts.length > 0)
            return res.status(409).send("המוצר הזה כבר נכנס למערכת ");
        let newProduct = new Product({ name, price, description, routingToImage, manufacturingDate, details, ownerUser, size });
        await newProduct.save();
        res.status(201).json(newProduct)
    }
    catch (err) {
        res.status(400).send("השגיאה ב: " + err.message);
    }
}

export const updateProductById = async (req, res) => {
    let { id } = req.params;
    let { name, description, routingToImage, manufacturingDate, price, details } = req.body;
    let ownerUser = req.uuser._id;
    if (!mongoose.isValidObjectId(id))
        return res.status(400).send("id לא תקין")
    try {
        let product = await Product.findById(id);
        if (!product)
            return res.status(404).send("אין כזה מוצר");
        product.name = name || product.name;
        product.description = description || product.description;
        product.manufacturingDate = manufacturingDate || product.manufacturingDate;
        product.price = price || product.price;
        product.details = details || product.details;
        product.routingToImage = routingToImage || product.routingToImage;
        product.ownerUser = ownerUser || product.ownerUser;
        await product.save();
        res.json(product);
    }
    catch (err) {
        res.status(400).send("לא אפשרי לערוך את המוצר " + err.message);
    }
}