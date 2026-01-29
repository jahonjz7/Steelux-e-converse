const express = require("express");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
const multer = require("multer");

const app = express();
const PORT = process.env.PORT || 3000; // ⭐ ОБЯЗАТЕЛЬНО ДЛЯ ХОСТА

// ===== PATHS =====
const FRONTEND = path.join(__dirname, "../frontend");
const ADMIN = path.join(__dirname, "../admin");
const UPLOADS = path.join(__dirname, "uploads");
const DATA = path.join(__dirname, "products.json");

// ===== MIDDLEWARE =====
app.use(cors());
app.use(express.json());

app.use("/uploads", express.static(UPLOADS));
app.use("/admin", express.static(ADMIN));
app.use(express.static(FRONTEND));

// ===== DATA =====
if (!fs.existsSync(DATA)) fs.writeFileSync(DATA, "[]");
if (!fs.existsSync(UPLOADS)) fs.mkdirSync(UPLOADS);

// ===== MULTER =====
const storage = multer.diskStorage({
  destination: (_, __, cb) => cb(null, UPLOADS),
  filename: (_, file, cb) =>
    cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });

// ===== API =====
app.get("/api/products", (_, res) => {
  res.json(JSON.parse(fs.readFileSync(DATA)));
});

app.post("/api/products", upload.single("img"), (req, res) => {
  const products = JSON.parse(fs.readFileSync(DATA));

  products.push({
    id: Date.now(),
    name: req.body.name,
    category: req.body.category,
    price: Number(req.body.price),
    oldPrice: req.body.oldPrice ? Number(req.body.oldPrice) : null,
    description: req.body.description || "",
    img: req.file.filename,
    available: true
  });

  fs.writeFileSync(DATA, JSON.stringify(products, null, 2));
  res.json({ success: true });
});

app.delete("/api/products/:id", (req, res) => {
  let products = JSON.parse(fs.readFileSync(DATA));
  products = products.filter(p => p.id != req.params.id);
  fs.writeFileSync(DATA, JSON.stringify(products, null, 2));
  res.json({ success: true });
});

app.put("/api/products/:id/stock", (req, res) => {
  const products = JSON.parse(fs.readFileSync(DATA));
  const product = products.find(p => p.id == req.params.id);

  if (product) product.available = !product.available;

  fs.writeFileSync(DATA, JSON.stringify(products, null, 2));
  res.json({ success: true });
});

// ===== PAGES =====
app.get("/", (_, res) =>
  res.sendFile(path.join(FRONTEND, "index.html"))
);

app.get("/catalog.html", (_, res) =>
  res.sendFile(path.join(FRONTEND, "catalog.html"))
);

// ===== START =====
app.listen(PORT, () =>
  console.log(`✅ SERVER → running on port ${PORT}`)
);
