import express from "express";
import passport from "passport";
import {
  handleOauthCallBack,
  refreshToken,
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

router.post("/refresh", refreshToken);
router.get("/verify", verifyToken);

export default router;
