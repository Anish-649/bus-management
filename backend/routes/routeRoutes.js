import express from "express";
const router = express.Router();
import {
  getRoutes,
  addRoute,
  updateRoute,
  deleteRoute
} from "../controllers/routeController.js";



router.get("/", getRoutes);
router.post("/", addRoute);
router.put("/:id", updateRoute);
router.delete("/:id", deleteRoute);





export default router;
