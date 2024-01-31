import { Order, orderValidator } from "../models/order.js";
import mongoose from "mongoose";

// ספרייה שמגבבת קוד
import bcyript from "bcryptjs"
import { generateToken } from "../config/jwt.js";

export const addNewOrder = async (req, res) => {
    try {
        let owner = req.uuser._id;
        let validate = orderValidator({ ...req.body, owner });
        if (validate.error) {
            return res.status(400).send(validate.error.details[0]);
        }
        let newOrder = await Order.create(validate.value);
        res.json(newOrder);
    }
    catch (err) {
        res.status(400).send("an error occured in: " + err.message);
    }
}

export const getAllOrders = async (req, res) => {
    try {
        let allOrders = await Order.find({}, "-password");
        res.json(allOrders);
    }
    catch (err) {
        res.status(500).send("an error occured in: " + err.message);
    }
}

export const deleteOrderById = async (req, res) => {
    try {
        let { id } = req.params;
        let order = await Order.findById(id);
        if (order.ifOrderStarted)
            return res.status(400).send("the order was sent already");
        if (!req.uuser.role == "admin" && !req.uuser._id == order.owner)
            return res.status(403).send("you are not authorized");
        let deletedOrder = await Order.findByIdAndDelete(id);
        res.json(deletedOrder)
    }
    catch (err) {
        res.status(400).send("an error occured in: " + err.message);
    }
}

export const updateIfOrderStarted = async (req, res) => {
    let { id } = req.params;
    try {
        if (!mongoose.isValidObjectId(id))
            return res.status(400).send("id is not valid");
        let order = await Order.findById(id);
        if (!order)
            return res.status(404).send("no such order");
        if (order.ifOrderStarted)
            return res.status(404)
        order.ifOrderStarted = true;
        await order.save();
        res.status(200).send("order sent successfuly");
    }
    catch (err) {
        res.status(400).send("its impossible to update this order" + err.message);
    }
}

export const getOrdersOfUser = async (req, res) => {
    try {
        let { _id } = req.uuser;
        let userOrders = await Order.find({ owner: _id });
        res.json(userOrders);
    }
    catch (err) {
        res.status(400).send("an error occured in: " + err.message);
    }
}