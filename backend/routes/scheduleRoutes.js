import express from "express";
import { searchBuses } from "../controllers/scheduleController.js";

import {
  getSchedules,
  addSchedule,
  updateSchedule,
  deleteSchedule
} from "../controllers/scheduleController.js";
const router = express.Router();


router.post("/schedule/search", searchBuses);



router.get("/schedules", getSchedules);
router.post("/schedules", addSchedule);
router.put("/schedules/:id", updateSchedule);
router.delete("/schedules/:id", deleteSchedule);



export default router;
