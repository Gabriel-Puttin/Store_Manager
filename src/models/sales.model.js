// const snakeize = require('snakeize');
const connection = require('./connection');

const insertSales = async () => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO StoreManager.sales (date) VALUE (default);',
  );

  return insertId;
};

const insertSalesProducts = async (saleId, salesProducts) => {
  // const columns = Object.keys(snakeize(salesProducts))
  //   .map((key) => `${key}`)
  //   .join(', ');

  // const placeholders = Object.keys(salesProducts)
  //   .map((_key) => '?')
  //   .join(', ');

  const [{ insertId }] = await connection.execute(
    `INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity) 
    VALUE (?, ?, ?);`,
    [saleId, ...Object.values(salesProducts)],
  );

  return insertId;
};

module.exports = {
  insertSales,
  insertSalesProducts,
};