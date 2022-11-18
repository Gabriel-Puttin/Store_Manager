const snakeize = require('snakeize');
const connection = require('./connection');

const insertSales = async () => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO StoreManager.sales (date) VALUE (default);',
  );

  return insertId;
};

const insertSalesProducts = async (saleId, salesProducts) => {
  const columns = Object.keys(snakeize(salesProducts))
    .map((key) => `${key}`)
    .join(', ');

  const placeholders = Object.keys(salesProducts)
    .map((_key) => '?')
    .join(', ');

  const [{ insertId }] = await connection.execute(
    `INSERT INTO StoreManager.sales_products (sale_id, ${columns}) 
    VALUE (?, ${placeholders});`,
    [saleId, ...Object.values(salesProducts)],
  );

  return insertId;
};

const findAll = async () => {
  const [result] = await connection.execute(
    `SELECT A.sale_id AS saleId, B.date,
      A.product_id AS productId, A.quantity FROM StoreManager.sales_products AS A
      INNER JOIN StoreManager.sales AS B
      ON A.sale_id = B.id
      ORDER BY A.sale_id, A.product_id;`,
  );

  return result;
};

const findById = async (saleId) => {
  const [result] = await connection.execute(
    `SELECT B.date, A.product_id AS productId, A.quantity
      FROM StoreManager.sales_products AS A
      INNER JOIN StoreManager.sales AS B
      ON A.sale_id = B.id
      WHERE A.sale_id = ?
      ORDER BY A.sale_id, A.product_id;`,
    [saleId],
  );

  return result;
};

const deleteSale = async (id) => {
  const [{ insertId }] = await connection.execute(
    'DELETE FROM StoreManager.sales WHERE id = ?;',
    [id],
  );

  return insertId;
};

const updateSales = async ({ productId, quantity }, saleId) => {
  const [{ insertId }] = await connection.execute(
    `UPDATE StoreManager.sales_products
      SET quantity = ?
      WHERE sale_id = ? AND product_id = ?;`,
    [quantity, saleId, productId],
  );

  return insertId;
};

module.exports = {
  insertSales,
  insertSalesProducts,
  findAll,
  findById,
  deleteSale,
  updateSales,
};