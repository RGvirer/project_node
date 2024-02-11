import joi from "joi"
import mongoose from "mongoose"

// mongoose.Schema() הגדרת מודל סכימה של מוצר באמצעות הפונקציה 
const inspirationalPhotosSchema = mongoose.Schema(
    {
        name: { type: String, required: true },
        description: { type: String, required: true },
        manufacturingDate: { type: Date },
        routingToImage: { type: String, required: true },
        coordinatePoints: [{ type: String}],
    }
);

export const Product = mongoose.model("product", inspirationalPhotosSchema);

// Joi פונקציה המאמתת את המוצר, המתבססת על סכימה מוגדרת מראש באמצעות ספריית 
export const inspirationalPhotosValidator = (_inspirationalPhotosValidate) => {
    let productJoi = joi.object({
        name: joi.string().required(),
        description: joi.string().required(),
        manufacturingDate: joi.date().default(Date.now),
        routingToImage: joi.string().required(),
        coordinatePoints: joi.array().items(joi.string())
    });
    return productJoi.validate(_inspirationalPhotosValidate)
}
