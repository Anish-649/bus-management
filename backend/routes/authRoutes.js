import express from "express";
import {
  customerSignup,
  customerLogin,
  adminLogin,
  getUser,
  updateUser,
  changePassword
  
} from "../controllers/authController.js";


const router = express.Router();

router.post("/signup", customerSignup);
router.post("/login", customerLogin);
router.post("/admin/login", adminLogin);

router.get("/user/:id", getUser);
router.put("/user/:id", updateUser);
router.put("/user/:id/password", changePassword);

export default router;
