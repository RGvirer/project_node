import joi from "joi";
import mongoose from "mongoose";

// mongoose.Schema() הגדרת מודל סכימה של מוצרי ההזמנה באמצעות הפונקציה 
const orderedProductSchema = mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true }
});

// mongoose.Schema() הגדרת מודל סכימה של הזמנה באמצעות הפונקציה 
const orderSchema = mongoose.Schema({
    date: { type: Date },
    dueDate: { type: Date, required: true },
    address: { type: String, required: true },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },
    orderedProducts: { type: [orderedProductSchema], required: true },
    ifOrderStarted: { type: Boolean, default: false }
}, { timestamps: true });


export const Order = mongoose.model("orders", orderSchema);

// Joi פונקציה המאמתת את המוצר, המתבססת על סכימה מוגדרת מראש באמצעות ספריית 
export const orderValidator = (_orderToValidate) => {
    let orderJoi = joi.object({
        date: joi.date().default(Date.now),
        dueDate: joi.date().required(),
        address: joi.string(),
        owner: joi.string().hex().length(24).required(),
        orderedProducts: joi.array().items(
            joi.object({
                name: joi.string().required(),
                price: joi.number().required(),
                quantity: joi.number().default(1)
            })
        ).required(),
        ifOrderStarted: joi.boolean()
    });
    return orderJoi.validate(_orderToValidate);
}