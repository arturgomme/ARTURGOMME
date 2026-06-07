
const API = "http://localhost:4000/api";

export const getCustomers = async () => {
  const res = await fetch(API + "/customers");
  return res.json();
};

export const createCustomer = async (data) => {
  const res = await fetch(API + "/customers", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  return res.json();
};
