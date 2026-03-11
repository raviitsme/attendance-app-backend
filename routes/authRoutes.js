import express from "express";
import { loginUser, registerUniversity, registerUser } from "../controllers/authController.js";

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser)
router.post('/registerUniversity', registerUniversity);

export default router;