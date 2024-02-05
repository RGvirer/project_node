import { User, userValidator } from "../models/user.js";
import mongoose from "mongoose";
import bcyript from "bcryptjs";
import { generateToken } from "../config/jwt.js";

export const addNewUser = async (req, res) => {
    try {
        let { name, password, email } = req.body;
        if (!name || !password || !email)
            return res.status(404).send("one of the parameters is missing");
        let validate = userValidator(req.body);
        if (validate.error) {
            res.status(400).send(validate.error.details[0]);
        }
        let sameUsers = await User.find(req.body);
        if (sameUsers.length > 0) {
            res.status(409).send("this user already exists ");
        }
        let hushPassword = await bcyript.hash(password, 15);
        let newUser = new User({ name, password: hushPassword, email });
        await newUser.save();
        let { _id, name: userName, email: userEmail} = newUser;
        let token = generateToken(newUser);
        res.json({ _id, userName, userEmail  ,token});
    }
    catch (err) {
        res.status(400).send("an error occured in: " + err.message);
    }

}

export const getAllUsers = async (req, res) => {
    try {
        let allUsers = await User.find({},"-password");
        res.json(allUsers);
    }
    catch (err) {
        res.status(500).send("an error occured in: " + err.message);
    }
}
export const getUserById = async (req, res) => {
    try {
        let { id } = req.params;
        if (!mongoose.isValidObjectId(id))
            return res.status(400).send("this id is not valid");
        let user = await User.findById(id);
        if (!user)
            return res.status(404).send("no such product");
        res.json(user);
    }
    catch (err) {
        res.status(400).send("The user cannot be received " + err.message);
    }
}
export const login = async (req, res) => {
    try {
        let { email, password } = req.body;
        let user = await User.findOne({ email });
        if (!user || !password)
            return res.status(404).send("missing required parameter");
        if (!/[0-9]{2}[A-Za-z]{2}/.test(password))
            return res.status(400).send("password is not valid");
        let loggedInUser = await User.findOne({ user });
        if (!loggedInUser)
            return res.status(404).send("there is no user with such credentials");
        if (!await bcyript.compare(password, loggedInUser.password))
            return res.status(404).send("there is no user with such credentials");
        let { _id, name: userName, roles, email: userEmail } = loggedInUser;
        let token = generateToken(loggedInUser);
        res.json({ _id, name: userName, roles, email: userEmail, token });
    }
    catch (err) {
        res.status(500).send("an error occured in: " + err.message);
    }
}

export const deleteUserById = async (req, res) => {
    let { id } = req.params;
    try {
        if (!mongoose.isValidObjectId(id))
            return res.status(400).send("id isn't valid");
        let user = await User.findByIdAndDelete(id);
        if (!user)
            return res.status(404).send("no such user");
        res.json(user);
    }
    catch (err) {
        res.status(400).send("problem " + err.message);
    }
}

export const updateUserById = async (req, res) => {
    let { id } = req.params;
    let { name } = req.body;
    try {
        if (!mongoose.isValidObjectId(id))
            return res.status(400).send("id inst valid");
        let user = await User.findById(id);
        if (!user)
            return res.status(404).send("no such user");
        user.name = name || user.name;
        user.password = numPages || user.password;
        user.email = audience || user.email;
        user.status = audience || user.status;
        await User.save();
        res.json(user);
    }
    catch (err) {
        res.status(400).send("its impossible to update this user" + err.message);
    }
}