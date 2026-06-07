
const { pool } = require("../db");

async function getAllCustomers() {
  const result = await pool.query("SELECT * FROM customers ORDER BY id DESC");
  return result.rows;
}

async function createCustomer(payload) {
  const { name, email } = payload;
  const result = await pool.query(
    "INSERT INTO customers(name,email) VALUES($1,$2) RETURNING *",
    [name, email]
  );
  return result.rows[0];
}

async function updateCustomer(id, payload) {
  const { name, email } = payload;
  const result = await pool.query(
    "UPDATE customers SET name=$1, email=$2 WHERE id=$3 RETURNING *",
    [name, email, id]
  );
  return result.rows[0];
}

async function removeCustomer(id) {
  await pool.query("DELETE FROM customers WHERE id=$1", [id]);
  return { ok: true };
}

module.exports = {
  getAllCustomers,
  createCustomer,
  updateCustomer,
  removeCustomer,
};
``
