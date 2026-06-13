import express from "express";
import cors from "cors";
import passport from "passport";
import session from "express-session";

export const configureMiddleware = (app) => {
  //Body parsing middleware
  app.use(express.json({ limit: "5mb" }));
  app.use(express.urlencoded({ limit: "5mb", extended: true }));

  //CORS configuration
  app.use(
    cors({
      // origin: [process.env.FRONTEND_URL],
      origin: "*",
      credentials: true,
    }),
  );

  // Session
  app.use(
    session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: {
        secure: false, //for local
        // secret: true    //for production
        maxAge: 24 * 60 * 60 * 1000, //24 hours
      },
    }),
  );

  // Initialize Password middleware
  app.use(passport.initialize());
  app.use(passport.session());
};
