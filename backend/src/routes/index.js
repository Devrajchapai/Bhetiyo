import auth from "./auth.js";
import item from "./item.js";

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

  //Connection status endpoint
  app.get("/status", (req, res) => {
    res.json({
      status: "ok",
      server: "bhetiyo-api",
      // ... user count
    });
  });
};
