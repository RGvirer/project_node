import joi from "joi"
import mongoose from "mongoose"

// mongoose.Schema() הגדרת מודל סכימה של מוצר באמצעות הפונקציה 
const productSchema = mongoose.Schema(
    {
        name: { type: String, required: true },
        description: {type: String, required: true},
        manufacturingDate: {type: Date},
        routingToImage: {type: String, default:'https://storeserver-uoax.onrender.com/מיכאל.jpg'}
    }
);

export const Product = mongoose.model("product", productSchema);

// Joi פונקציה המאמתת את המוצר, המתבססת על סכימה מוגדרת מראש באמצעות ספריית 
export const productValidator = (_productToValidate) => {
    let productJoi = joi.object({
        name: joi.string().required(),
        description:joi.string().required(),
        manufacturingDate:joi.date().default(Date.now),
        routingToImage: joi.string().default(https://storeserver-uoax.onrender.com/מיכאל.jpg').replace(/^/, 'https://storeserver-uoax.onrender.com/'),
    });
    return productJoi.validate(_productToValidate)
}
