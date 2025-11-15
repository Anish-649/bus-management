import express from "express";
import { bookSeat, getBookingHistory } from "../controllers/bookingController.js";

const router = express.Router();

router.post("/book", bookSeat);
router.get("/history/:user_id", getBookingHistory);

export default router;
