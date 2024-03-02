import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser"
import authRoutes from "./routes/auth.routes.js";
import carsRoutes from "./routes/cars.routes.js";

const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());
app.use("/api", authRoutes);
app.use("/api", carsRoutes);

export default app;
