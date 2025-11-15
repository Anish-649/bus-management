import express from "express";


const router = express.Router();
import {
  getBuses,
  addBus,
  updateBus,
  deleteBus
} from "../controllers/busController.js";



router.get("/buses", getBuses);
router.post("/buses", addBus);
router.put("/buses/:id", updateBus);
router.delete("/buses/:id", deleteBus);




export default router;
