import mongoose from 'mongoose';

export const connectDB = async () => {
    try {
        const mongoURI = process.env.DB_CONNECTION || 'mongodb+srv://118rgv:d7c-dBFPPf$J$Lc@cluster0.gixnso0.mongodb.net/?retryWrites=true&w=majority';
        await mongoose.connect(mongoURI);
        console.log("succeded to connect mongoDB");
    }
    catch (err) {
        console.log("failed to connect mongoDB");
        console.log(err);
        process.exit(1);
    }
};
