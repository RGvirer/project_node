import express from "express";
import { config } from "dotenv";
import { connectDB } from "./config/dbConfig.js";
import productRouter from "./routes/product.js"; 
import userRouter from "./routes/user.js"; 
import photoRouter from "./routes/photo.js";
import orderRouter from "./routes/order.js"; 
import chatRouter from "./routes/chat.js";
import morgan from "morgan";
import cors from "cors";
import { erroHandling } from "./middlewares/erroHandling.js";

// טוען את משתני הסביבה
config();

// פונקציה שמתחילה את השרת רק אחרי החיבור למסד
const startServer = async () => {
    try {
        await connectDB(); // מחכה שהחיבור ל-MongoDB יצליח
        console.log("Connected to MongoDB successfully");

        const app = express();

        // Middlewares
        app.use(express.static('images'));
        app.use(express.json());
        app.use(morgan("common"));
        app.use(cors());

        // Routes
        app.use("/api/photos", photoRouter);
        app.use("/api/products", productRouter);
        app.use("/api/users", userRouter);
        app.use("/api/orders", orderRouter);
        app.use("/api/chat", chatRouter);

        // Error handling middleware
        app.use(erroHandling);
        app.use((err, req, res, next) => {
            res.status(err.status || 500).send(err.message || "A fault has occurred");
        });

        // Start server
        const port = process.env.PORT || 6000;
        app.listen(port, () => {
            console.log("Server listening on port " + port);
        });

    } catch (err) {
        console.log("Failed to start server:", err);
        process.exit(1);
    }
};

startServer();
