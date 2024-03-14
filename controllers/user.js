import { User, userValidator } from "../models/user.js";
import mongoose from "mongoose";
import bcyript from "bcryptjs";
import { generateToken } from "../config/jwt.js";

export const addNewUser = async (req, res) => {
    try {
        let { name, password, email } = req.body;
        let validate = userValidator(req.body);
        if (!/[0-9]{2}[A-Za-z]{2}/.test(password))
            return res.status(400).send("סיסמה לא תקינה");
        if (validate.error) {
            res.status(400).send(validate.error.details[0]);
        }
        let sameUsers = await User.find(req.body);
        if (sameUsers.length > 0) {
            res.status(409).send("המשתמש הזה כבר קיים במערכת ");
        }
        let hushPassword = await bcyript.hash(password, 15);
        let newUser = new User({ name, password: hushPassword, email });
        await newUser.save();
        let { _id, name: userName, email: userEmail } = newUser;
        let token = generateToken(newUser);
        res.json({ _id, userName, userEmail, token });
    }
    catch (err) {
        res.status(400).send("הטעות ב: " + err.message);
    }
}

export const getAllUsers = async (req, res) => {
    try {
        let allUsers = await User.find({}, "-password");
        res.json(allUsers);
    }
    catch (err) {
        res.status(500).send("הטעות ב: " + err.message);
    }
}
export const getUserById = async (req, res) => {
    try {
        let { id } = req.params;
        if (!mongoose.isValidObjectId(id))
            return res.status(400).send("id לא תקין");
        let user = await User.findById(id);
        if (!user)
            return res.status(404).send("אין כזה משתמש");
        res.json(user);
    }
    catch (err) {
        res.status(400).send("לא אפשרי להביא את המשתמש: " + err.message);
    }
}

export const login = async (req, res) => {
    try {
        let { email, password } = req.body;
        if (!email || !password)
            return res.status(404).send("חסר שדות חובה");
        let user = await User.findOne({ email });
        if (!user)
            return res.status(404).send("לא קיים כזה משתמש");
        if (!/[0-9]{2}[A-Za-z]{2}/.test(password))
            return res.status(400).send("הסיסמה לא תקינה");
        if (!await bcyript.compare(password, user.password))
            return res.status(404).send("שגיאת סיסמה");
        let { _id, name, role, email: userEmail } = user;
        let token = generateToken(user);
        res.json({ _id, name, role, userEmail, token });
    }
    catch (err) {
        res.status(500).send("השגיאה ב: " + err.message);
    }
}

export const deleteUserById = async (req, res) => {
    let { id } = req.params;
    try {
        if (!mongoose.isValidObjectId(id))
            return res.status(400).send("id לא תקין");
        let user = await User.findByIdAndDelete(id);
        if (!user)
            return res.status(404).send("לא קיים כזה משתמש");
        res.json(user);
    }
    catch (err) {
        res.status(400).send("הבעיה: " + err.message);
    }
}

export const updateUserById = async (req, res) => {
    let { id } = req.params;
    let { name } = req.body;
    try {
        if (!mongoose.isValidObjectId(id))
            return res.status(400).send("id לא תקין");
        let user = await User.findById(id);
        if (!user)
            return res.status(404).send("לא קיים כזה משתמש");
        user.name = name || user.name;
        user.password = numPages || user.password;
        user.email = audience || user.email;
        user.status = audience || user.status;
        await User.save();
        res.json(user);
    }
    catch (err) {
        res.status(400).send("לא אפשרי לערוך את המשתמש: " + err.message);
    }
}