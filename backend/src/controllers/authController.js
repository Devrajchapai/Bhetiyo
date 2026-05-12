import jwt from "jsonwebtoken";
import User from "../entities/User.js";
import { getRepository } from "typeorm";
import { BhetiyoDataSource } from "../config/database.js";

export const handleOauthCallBack = async (req, res) => {
  try {
    const user = req.user; // coming from passport callback

    const userRepository = BhetiyoDataSource.getRepository(User);

    if (!user) {
      return res.redirect(`${process.env.FRONTEND_URL}/home`);
    }
    const userExist = await userRepository.findOne({
      where: { email: user.email },
    });

    let token;
    let userJson;

    if (userExist) {
      token = jwt.sign(
        {
          email: userExist.email,
          name: userExist.name,
        },
        process.env.ACCESS_TOKEN_SECRET,

        { expiresIn: "24h" },
      );

      userJson = encodeURIComponent(
        JSON.stringify({
          email: userExist.email,
          name: userExist.name,
        }),
      );
    } else {
      await userRepository.save({
        name: user.displayName,
        externalId: user.externalId,
        email: user.email,
        source: user.provider,
      });

      token = jwt.sign(
        {
          email: user.email,
          name: user.name,
        },
        process.env.ACCESS_TOKEN_SECRET,

        { expiresIn: "24h" },
      );

      userJson = encodeURIComponent(
        JSON.stringify({
          email: user.email,
          name: user.displayName,
        }),
      );
    }

    return res.redirect(
      `${process.env.FRONTEND_URL}/callback?token=${token}&userJson=${userJson}`,
    );
  } catch (error) {
    console.error("Error loging: " + error);
    res.status(500).json({ error: "Falied to login" });
  }
};

export const verifyToken = (req, res) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(403).json({ error: "No token provided", valid: false });
  }
  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ error: "Token expired", valid: false });
    }
    return res.status(403).json({ error: "invalid token", valid: false });
  }
};
