import express from 'express';
import { forgotPasswordController, isAdmin, loginController, signupController, testController } from '../Controllers/authControllers.js';
import { requireSignin } from '../Middelwares/AuthMiddleware.js';

const router = express.Router()

// signup route

router.post("/signup", signupController)

// login route
router.post("/login", loginController)

// peotected route
router.get("/test", requireSignin, isAdmin, testController)

// forgot password
router.post("/forgot-password", forgotPasswordController)

// protected route
router.get("/auth-user", requireSignin, (req, resp) => {
    resp.json({ ok: true })
})

router.get("/auth-admin", requireSignin, isAdmin, (req, resp) => {
    resp.json({ ok: true })
})


export default router;