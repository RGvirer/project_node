import joi from "joi"
import mongoose from "mongoose"

// mongoose.Schema() הגדרת מודל סכימה של מוצר באמצעות הפונקציה 
const inspirationalPhotosSchema = mongoose.Schema(
    {
        name: { type: String, required: true },
        description: { type: String, required: true },
        routingToImage: { type: String },
        imageDetails: [
            {coordinatePoints: { type: String },productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' }}
        ]
    }
);

export const Product = mongoose.model("product", inspirationalPhotosSchema);

// Joi פונקציה המאמתת את המוצר, המתבססת על סכימה מוגדרת מראש באמצעות ספריית 
export const inspirationalPhotosValidator = (_inspirationalPhotosValidate) => {
    let productJoi = joi.object({
        name: joi.string().required(),
        description: joi.string().required(),
        routingToImage: joi.string().required(),
        imageDetails: joi.array().items(joi.object({
            coordinatePoints: joi.string().required(),
            productId: joi.string().required()
        })).required()
    });
    return productJoi.validate(_inspirationalPhotosValidate);
}
