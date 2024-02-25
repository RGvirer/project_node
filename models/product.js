import joi from "joi"
import mongoose from "mongoose"

// mongoose.Schema() הגדרת מודל סכימה של מוצר באמצעות הפונקציה 
export const productSchema = mongoose.Schema(
    {
        name: { type: String, required: true },
        price: { type: Number, required: true },
        description: { type: String, required: true },
        manufacturingDate: { type: Date },
        routingToImage: { type: [String], required: true },
        ownerUser: { type: mongoose.Schema.Types.ObjectId, required: true },
        details: { type: String }
    }
);

export const Product = mongoose.model("product", productSchema);

// Joi פונקציה המאמתת את המוצר, המתבססת על סכימה מוגדרת מראש באמצעות ספריית 
export const productValidator = (_productToValidate) => {
    let productJoi = joi.object({
        name: joi.string().required(),
        price: joi.number().required(),
        description: joi.string().required(),
        manufacturingDate: joi.date().default(Date.now()),
        routingToImage: joi.array().items(joi.string()).required(),
        ownerUser: joi.string().hex().length(24).required(),
        details: joi.string() 
    });
    return productJoi.validate(_productToValidate)
}
