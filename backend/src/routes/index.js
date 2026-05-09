import auth from "./auth.js";

export const configureRoutes = (app) => {
  //Health check endpoint
  app.get("/health", (req, res) => {
    res.json({ status: "ok", server: "bhetiyo-api" });
  });

  //API routes
  app.use("/auth", auth);

  //Connection stats endpoint
  app.get("/stats", (req, res) => {
    res.json({
      status: "ok",
      server: "bhetiyo-api",
      // ... user count
    });
  });
};
