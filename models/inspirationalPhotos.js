import joi from "joi"
import mongoose from "mongoose"

// mongoose.Schema() הגדרת מודל סכימה של מוצר באמצעות הפונקציה 
const inspirationalPhotosSchema = mongoose.Schema(
    {
        name: { type: String, required: true },
        description: { type: String, required: true },
        routingToImage:{type:String},
        productDetails: 
        // אני רוצה שבתוך השדה פרטי התמונה יהיו אובייקטים עם השדות הבאים
        //coordinatePoints-שיכיל את הקואורדינטה בה המוצר נמצא בתוך התמונה
        //productId-ניתוב למוצר ע"י id
    }
);

export const Product = mongoose.model("product", inspirationalPhotosSchema);

// Joi פונקציה המאמתת את המוצר, המתבססת על סכימה מוגדרת מראש באמצעות ספריית 
export const inspirationalPhotosValidator = (_inspirationalPhotosValidate) => {
    let productJoi = joi.object({
        name: joi.string().required(),
        description: joi.string().required(),
        routingToImage: joi.string().required(),
    });
    return productJoi.validate(_inspirationalPhotosValidate)
}
