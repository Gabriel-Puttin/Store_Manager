const connection = require('./connection');

const findAll = async () => {
  const [result] = await connection.execute(
    'SELECT * FROM StoreManager.products',
  );

  return result;
};

const findById = async (productId) => {
  const [[result]] = await connection.execute(
    'SELECT * FROM StoreManager.products WHERE id = ?',
    [productId],
  );

  return result;
};

const insertProduct = async (productName) => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO StoreManager.products (name) VALUE (?)',
    [productName],
  );

  return insertId;
};

const updateProduct = async (productName, productId) => {
  const [{ insertId }] = await connection.execute(
    `UPDATE StoreManager.products
      SET name = ?
      WHERE id = ?`,
    [productName, productId],
  );

  return insertId;
};

const deleteProduct = async (productId) => {
  const [{ insertId }] = await connection.execute(
    'DELETE FROM StoreManager.products WHERE id = ?;',
    [productId],
  );

  return insertId;
};

module.exports = {
  findAll,
  findById,
  insertProduct,
  updateProduct,
  deleteProduct,
};