import mongoose from 'mongoose';

export const connectDB = async () => {
    try {
        const mongoURI = process.env.DB_CONNECTION || "mongodb://localhost:27017/store";
        await mongoose.connect(mongoURI);
        console.log("succeded to connect mongoDB");
    }
    catch (err) {
        console.log("failed to connect mongoDB");
        console.log(err);
        process.exit(1);
    }
};
