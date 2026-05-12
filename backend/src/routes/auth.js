import express from "express";
import passport from "passport";
import {
  handleOauthCallBack,
  verifyToken,
} from "../controllers/authController.js";

const router = express.Router();

router.get(
  "/google",
  (req, res, next) => {
    next();
  },
  passport.authenticate("google", { scope: ["profile", "email"] }),
);

router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  handleOauthCallBack,
);

router.get("/verify", verifyToken);

export default router;
