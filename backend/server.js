
import express from "express";
import cors from "cors";
import dotenv from "dotenv Pool } = pkg;import dotenv from "dotenv";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const app = express();
app.use(cors());
app.use(express.json());

// TEST
app.get("/api/test", (req, res) => {
  res.json({ ok: true });
});

// CLIENTI
app.get("/api/customers", async (req, res) => {
  const result = await pool.query("SELECT * FROM customers");
  res.json(result.rows);
});

app.post("/api/customers", async (req, res) => {
  const { name, email } = req.body;

  const result = await pool.query(
    "INSERT INTO customers(name,email) VALUES($1,$2) RETURNING *",
    [name, email]
  );

  res.json(result.rows[0]);
});

app.delete("/api/customers/:id", async (req, res) => {
  await pool.query("DELETE FROM customers WHERE id=$1", [req.params.id]);
  res.json({ ok: true });
});

// VEICOLI
app.get("/api/vehicles", async (req, res) => {
  const result = await pool.query("SELECT * FROM vehicles");
  res.json(result.rows);
});

app.post("/api/vehicles", async (req, res) => {
  const { plate, brand, model } = req.body;

  const result = await pool.query(
    "INSERT INTO vehicles(plate,brand,model) VALUES($1,$2,$3) RETURNING *",
    [plate, brand, model]
  );

  res.json(result.rows[0]);
});

app.listen(process.env.PORT, () => {
  console.log("SERVER AVVIATO " + process.env.PORT);
});
import pkg from "pg";

dotenv.config();

