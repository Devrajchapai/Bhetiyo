import auth from "./auth.js";
import item from "./item.js";
import chat from "./chat.js";
import community from "./community.js";
import home from "./home.js";
import profile from "./profile.js";

export const configureRoutes = (app) => {
  //Health check endpoint
  app.get("/health", (req, res) => {
    res.json({ status: "ok", server: "bhetiyo-api" });
  });

  app.get("/", (req, res) => {
    res.send("Backend running ");
  });

  //API routes
  app.use("/auth", auth);
  app.use("/item", item);
  app.use("/chat", chat);
  app.use("/community", community);
  app.use("/home", home);
  app.use("/profile", profile);

  //Connection status endpoint
  app.get("/status", (req, res) => {
    res.json({
      status: "ok",
      server: "bhetiyo-api",
      // ... user count
    });
  });
};
