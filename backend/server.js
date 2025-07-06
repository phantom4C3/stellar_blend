import express from "express"; 
import cors from "cors";
import mongoose from 'mongoose';
import env from './config/env.js'
import templateRouter from './routes/templates.routes.js'
import poolRouter from './routes/pools.routes.js'
import ratingRouter from './routes/ratings.routes.js'
import notificationRouter from './routes/notifications.routes.js';
import validateTemplate from './middlewares/validateTemplate.middlewares.js'
import errorHandler from './middlewares/errorHandler.middlewares.js';

const app = express();
 
app.use(cors({ origin: env.CORS_ORIGIN, credentials: true, }));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(validateTemplate);

const connectDB = async () => {
    try {
        await mongoose.connect(env.MONGODB_URI);
        console.log("MongoDB connected successfully");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        process.exit(1);
    }
}
connectDB();

app.use("/api/templates", templateRouter);
app.use("/api/pools", poolRouter);
app.use("/api/ratings", ratingRouter);
app.use('/api/notifications', notificationRouter);

app.get("/api/health", (req, res)=>{
    res.status(200).json({ status: "OK", message: "Server is running" });
});

app.use((req, res, next)=> {
    const error = new Error(`Not Found - ${req.originalUrl}`);
    res.status(404);
    next(error);
})

app.use(errorHandler);

const server = app.listen(env.PORT,  () => {
    console.log("Server is running on http://localhost:" +env.PORT);
} )

process.on("uncaughtException", (error) => {
    console.error("Uncaught Exception:", error);
    process.exit(1);
})

process.on("unhandledRejection", (error)=>{
    console.error("Unhandled Rejection:", error);
    server.close(() =>process.exit(1));
})

export default app;