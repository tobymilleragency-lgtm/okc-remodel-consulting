import express from "express";
import { createServer } from "http";
import path from "path";
import { fileURLToPath } from "url";
import contactHandler from "../api/contact";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const server = createServer(app);

  app.use(express.json({ limit: "1mb" }));

  app.get("/api/health", (_req, res) => {
    res.json({ ok: true, app: "relax-remodel-consulting" });
  });

  app.post("/api/contact", (req, res) => contactHandler(req, res));

  // Serve static files from dist/public in production
  const staticPath =
    process.env.NODE_ENV === "production"
      ? path.resolve(__dirname, "public")
      : path.resolve(__dirname, "..", "dist", "public");

  const prerenderedRoutes = [
    "/",
    "/about",
    "/how-it-works",
    "/contact",
    "/blog",
    "/blog/why-homeowners-need-construction-experience-on-their-side",
    "/blog/how-vetted-contractors-save-money-and-headaches",
  ];
  for (const route of prerenderedRoutes) {
    app.get(route, (_req, res) => {
      const filePath = route === "/"
        ? path.join(staticPath, "index.html")
        : path.join(staticPath, route.slice(1), "index.html");
      res.sendFile(filePath);
    });
  }

  app.use(express.static(staticPath));

  // Local SEO service-city pages are prerendered only when enabled in the data layer.
  // If Express static did not find a service-city index.html above, return the SPA
  // shell with a real 404 so disabled combinations do not look indexable.
  app.get(/^\/services\/[^/]+\/[^/]+\/?$/, (_req, res) => {
    res.status(404).sendFile(path.join(staticPath, "index.html"));
  });

  // Handle client-side routing - serve index.html for all other routes
  app.get("*", (_req, res) => {
    res.sendFile(path.join(staticPath, "index.html"));
  });

  const port = process.env.PORT || 3000;

  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}

startServer().catch(console.error);
