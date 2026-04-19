export const configureRoutes = (app) => {
  //Health check endpoint
  app.get("/health", (req, res) => {
    res.json({ status: "ok", server: "bhetiyo-api" });
  });

  //API routes

  //Connection stats endpoint
  app.get("/stats", (req, res) => {
    res.json({
      status: "ok",
      server: "bhetiyo-api",
      // ... user count
    });
  });
};
