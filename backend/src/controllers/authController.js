import jwt from "jsonwebtoken";
import crypto from "node:crypto";
import User from "../entities/User.js";
import { BhetiyoDataSource } from "../config/database.js";

const signAccessToken = (user) =>
  jwt.sign(
    { id: user.id, email: user.email, name: user.name },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "15m" },
  );

const signRefreshToken = () =>
  jwt.sign({ jti: crypto.randomUUID() }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "7d",
  });

export const handleOauthCallBack = async (req, res) => {
  try {
    const profile = req.user;
    if (!profile) {
      return res.redirect(`${process.env.FRONTEND_URL}/home`);
    }

    const userRepo = BhetiyoDataSource.getRepository(User);
    let user = await userRepo.findOne({ where: { email: profile.email } });

    if (!user) {
      user = await userRepo.save({
        name: profile.displayName,
        externalId: profile.externalId,
        email: profile.email,
        source: profile.provider,
      });
    }

    const accessToken = signAccessToken(user);
    const refreshToken = signRefreshToken();

    await userRepo.update(user.id, { refreshToken });

    const userJson = encodeURIComponent(
      JSON.stringify({
        id: user.id,
        email: user.email,
        name: user.name,
      }),
    );

    return res.redirect(
      `${process.env.FRONTEND_URL}/callback?token=${accessToken}&refreshToken=${refreshToken}&userJson=${userJson}`,
    );
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ error: "Failed to login" });
  }
};

export const refreshToken = async (req, res) => {
  try {
    const { refreshToken: token } = req.body;
    if (!token) {
      return res.status(400).json({ error: "Refresh token required" });
    }

    let payload;
    try {
      payload = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
    } catch {
      return res.status(401).json({ error: "Invalid or expired refresh token" });
    }

    const userRepo = BhetiyoDataSource.getRepository(User);
    const user = await userRepo.findOne({ where: { refreshToken: token } });
    if (!user) {
      return res.status(401).json({ error: "Refresh token revoked" });
    }

    const newAccessToken = signAccessToken(user);
    const newRefreshToken = signRefreshToken();

    await userRepo.update(user.id, { refreshToken: newRefreshToken });

    res.json({ accessToken: newAccessToken, refreshToken: newRefreshToken });
  } catch (error) {
    console.error("Error refreshing token:", error);
    res.status(500).json({ error: "Failed to refresh token" });
  }
};

export const verifyToken = (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(403).json({ error: "No token provided", valid: false });
  }
  const token = authHeader.split(" ")[1];
  try {
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    res.json({ valid: true });
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ error: "Token expired", valid: false });
    }
    return res.status(403).json({ error: "Invalid token", valid: false });
  }
};
