import express from "express";
import { createServer as createViteServer } from "vite";
import Database from "better-sqlite3";
import path from "path";
import jwt from "jsonwebtoken";

const db = new Database("app.db");

// Initialize Database
db.exec(`
  CREATE TABLE IF NOT EXISTS categories (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    description TEXT
  );

  CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    category_id INTEGER,
    title TEXT NOT NULL,
    description TEXT,
    specifications TEXT,
    price TEXT,
    delivery_time TEXT,
    image_url TEXT,
    type TEXT CHECK(type IN ('product', 'service')),
    FOREIGN KEY(category_id) REFERENCES categories(id)
  );

  CREATE TABLE IF NOT EXISTS requests (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    mobile TEXT,
    company TEXT,
    email TEXT NOT NULL,
    description TEXT,
    status TEXT DEFAULT 'pending',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS settings (
    key TEXT PRIMARY KEY,
    value TEXT
  );
`);

// Seed initial settings if empty
const checkSettings = db.prepare("SELECT COUNT(*) as count FROM settings").get() as { count: number };
if (checkSettings.count === 0) {
  const insertSetting = db.prepare("INSERT INTO settings (key, value) VALUES (?, ?)");
  insertSetting.run("siteName", "Industrial Instruments Pro");
  insertSetting.run("primaryColor", "#2563eb");
  insertSetting.run("contactEmail", "admin@example.com");
  insertSetting.run("contactPhone", "+1 234 567 8900");
  insertSetting.run("seoDescription", "Calibration, testing, repair, and sales of industrial instruments.");
  insertSetting.run("logoUrl", "");
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  
  // Auth
  app.post("/api/auth/login", (req, res) => {
    const { email, password } = req.body;
    if (email === "manojprajapatiworks@gmail.com" && password === "Shiva@5696") {
      const token = jwt.sign({ email }, "super_secret_key_123", { expiresIn: "24h" });
      res.json({ token });
    } else {
      res.status(401).json({ error: "Invalid credentials" });
    }
  });

  // Categories
  app.get("/api/categories", (req, res) => {
    const categories = db.prepare("SELECT * FROM categories").all();
    res.json(categories);
  });

  app.post("/api/categories", (req, res) => {
    const { name, description } = req.body;
    const stmt = db.prepare("INSERT INTO categories (name, description) VALUES (?, ?)");
    const info = stmt.run(name, description);
    res.json({ id: info.lastInsertRowid, name, description });
  });

  app.put("/api/categories/:id", (req, res) => {
    const { name, description } = req.body;
    const stmt = db.prepare("UPDATE categories SET name = ?, description = ? WHERE id = ?");
    stmt.run(name, description, req.params.id);
    res.json({ success: true });
  });

  app.delete("/api/categories/:id", (req, res) => {
    db.prepare("DELETE FROM categories WHERE id = ?").run(req.params.id);
    res.json({ success: true });
  });

  // Products/Services
  app.get("/api/products", (req, res) => {
    const products = db.prepare("SELECT p.*, c.name as category_name FROM products p LEFT JOIN categories c ON p.category_id = c.id").all();
    res.json(products);
  });

  app.post("/api/products", (req, res) => {
    const { category_id, title, description, specifications, price, delivery_time, image_url, type } = req.body;
    const stmt = db.prepare("INSERT INTO products (category_id, title, description, specifications, price, delivery_time, image_url, type) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
    const info = stmt.run(category_id, title, description, specifications, price, delivery_time, image_url, type);
    res.json({ id: info.lastInsertRowid });
  });

  app.put("/api/products/:id", (req, res) => {
    const { category_id, title, description, specifications, price, delivery_time, image_url, type } = req.body;
    const stmt = db.prepare("UPDATE products SET category_id = ?, title = ?, description = ?, specifications = ?, price = ?, delivery_time = ?, image_url = ?, type = ? WHERE id = ?");
    stmt.run(category_id, title, description, specifications, price, delivery_time, image_url, type, req.params.id);
    res.json({ success: true });
  });

  app.delete("/api/products/:id", (req, res) => {
    db.prepare("DELETE FROM products WHERE id = ?").run(req.params.id);
    res.json({ success: true });
  });

  // Requests
  app.get("/api/requests", (req, res) => {
    const requests = db.prepare("SELECT * FROM requests ORDER BY created_at DESC").all();
    res.json(requests);
  });

  app.post("/api/requests", (req, res) => {
    const { name, mobile, company, email, description } = req.body;
    const stmt = db.prepare("INSERT INTO requests (name, mobile, company, email, description) VALUES (?, ?, ?, ?, ?)");
    const info = stmt.run(name, mobile, company, email, description);
    
    // In a real app, send email to admin here
    console.log(`New request received from ${email}. Sending email to admin...`);

    res.json({ id: info.lastInsertRowid, success: true });
  });

  app.put("/api/requests/:id/status", (req, res) => {
    const { status } = req.body;
    db.prepare("UPDATE requests SET status = ? WHERE id = ?").run(status, req.params.id);
    res.json({ success: true });
  });

  // Settings
  app.get("/api/settings", (req, res) => {
    const settings = db.prepare("SELECT * FROM settings").all() as {key: string, value: string}[];
    const settingsObj = settings.reduce((acc, curr) => ({ ...acc, [curr.key]: curr.value }), {});
    res.json(settingsObj);
  });

  app.put("/api/settings", (req, res) => {
    const settings = req.body;
    const stmt = db.prepare("UPDATE settings SET value = ? WHERE key = ?");
    const insertStmt = db.prepare("INSERT OR IGNORE INTO settings (key, value) VALUES (?, ?)");
    
    db.transaction(() => {
      for (const [key, value] of Object.entries(settings)) {
        insertStmt.run(key, value);
        stmt.run(value, key);
      }
    })();
    res.json({ success: true });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "dist", "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
