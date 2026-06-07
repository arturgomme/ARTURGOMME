
const { ipcMain } = require("electron");
const { Pool } = require("pg");

const pool = new Pool({
  connectionString: "postgresql://postgres:123456@localhost:5432/officina"
});

// GET
ipcMain.handle("get-customers", async () => {
  const result = await pool.query("SELECT * FROM customers");
  return result.rows;
});

// POST
ipcMain.handle("add-customer", async (_, data) => {
  const result = await pool.query(
    "INSERT INTO customers(name,email) VALUES($1,$2) RETURNING *",
    [data.name, data.email]
  );
  return result.rows[0];
});
