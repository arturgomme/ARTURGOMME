
const { ipcMain } = require("electron");
const { pool } = require("./db");

function registerCrud(channel, table, fields) {
  const fieldList = fields.join(", ");
  const placeholders = fields.map((_, i) => `$${i + 1}`).join(", ");
  const updates = fields.map((f, i) => `${f} = $${i + 1}`).join(", ");

  ipcMain.handle(`${channel}:getAll`, async () => {
    const res = await pool.query(`SELECT * FROM ${table} ORDER BY id DESC`);
    return res.rows;
  });

  ipcMain.handle(`${channel}:create`, async (_, data) => {
    const values = fields.map((f) => data[f] ?? null);
    const res = await pool.query(
      `INSERT INTO ${table} (${fieldList}) VALUES (${placeholders}) RETURNING *`,
      values
    );
    return res.rows[0];
  });

  ipcMain.handle(`${channel}:update`, async (_, id, data) => {
    const values = fields.map((f) => data[f] ?? null);
    const res = await pool.query(
      `UPDATE ${table} SET ${updates} WHERE id = $${fields.length + 1} RETURNING *`,
      [...values, id]
    );
    return res.rows[0];
  });

  ipcMain.handle(`${channel}:remove`, async (_, id) => {
    await pool.query(`DELETE FROM ${table} WHERE id = $1`, [id]);
    return { ok: true };
  });
}

function registerAll() {
  registerCrud("customers", "customers", ["name", "email", "phone"]);
  registerCrud("vehicles", "vehicles", ["customer_id", "targa", "marca", "modello"]);
  registerCrud("services", "services", ["name", "price", "duration_min"]);
  registerCrud("inventory", "inventory", ["name", "quantity", "price"]);
  registerCrud("suppliers", "suppliers", ["name", "phone", "email"]);
  registerCrud("appointments", "appointments", ["customer_id", "vehicle_id", "scheduled_at", "note"]);
  registerCrud("workOrders", "work_orders", ["customer_id", "vehicle_id", "description", "status"]);
  registerCrud("invoices", "invoices", ["work_order_id", "total", "paid"]);
  registerCrud("storage", "storage", ["customer_id", "vehicle_id", "note"]);
}

module.exports = { registerAll };
