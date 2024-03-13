import joi from "joi";
import mongoose from "mongoose";

// mongoose.Schema() הגדרת מודל סכימה של משתמש באמצעות הפונקציה 
const userSchema = mongoose.Schema({
    name: { type: String, required: true },
    password: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    role: { type: String, default: "user"}

}, { timestamps: true });
export const User = mongoose.model("users", userSchema);

// Joi פונקציה המאמתת את המשתמש, המתבססת על סכימה מוגדרת מראש באמצעות ספריית 
export const userValidator = (_userToValidate) => {
    let userJoi = joi.object({
        name: joi.string().required(),
        password: joi.string().required().regex(/^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]+$/),
        email: joi.string().email().required(),
        role: joi.string().default("user")
    });
    return userJoi.validate(_userToValidate);
}