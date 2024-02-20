import joi from "joi"
import mongoose from "mongoose"
import { productSchema } from "./product.js";

const photoSchema = mongoose.Schema(
    {
        name: { type: String, required: true },
        description: { type: String, required: true },
        routingToImage: { type: [String], required: true },
        imageDetails: { 
            type: [{ 
                coordinatePoints: { type: String, required: true }, 
                product: { type: productSchema } 
            }], 
            required: true 
        }
    }
);
export const Photo = mongoose.model("photo", photoSchema);

export const photoValidator = (_photoToValidate) => {
    let photoJoi = joi.object({
        name: joi.string().required(),
        description: joi.string().required(),
        routingToImage: joi.string().required(),
        imageDetails: joi.array().items(joi.object(
            {
                coordinatePoints: joi.string().required(),
                product: joi.object(
                    {
                        name: joi.string().required(),
                        description: joi.string().required(),
                        price: joi.number().required(),
                        manufacturingDate: joi.date().default(Date.now()),
                        routingToImage: joi.string().required(),
                        ownerUser:joi.string().required()
                    }
                ).required()
            }
        )).required()
    });
    return photoJoi.validate(_photoToValidate);
}