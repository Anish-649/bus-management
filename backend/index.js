import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import dashboardRoutes from "./routes/dashboardRoutes.js";
import customerRoutes from "./routes/customerRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import routeRoutes from "./routes/routeRoutes.js";
import busRoutes from "./routes/busRoutes.js";
import scheduleRoutes from "./routes/scheduleRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);

app.use("/routes", routeRoutes);
app.use("/", busRoutes);
app.use("/", scheduleRoutes);
app.use("/booking", bookingRoutes);
app.use("/",customerRoutes);
app.use("/", dashboardRoutes);


app.listen(process.env.PORT, () =>
  console.log("Server running on port", process.env.PORT)
);
