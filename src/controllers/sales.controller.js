const salesServices = require('../services/sales.service');
const errorMap = require('../utils/errorMap');

const HTTP_OK_STATUS = 200;
const HTTP_NO_CONTENT_STATUS = 204;
const HTTP_CREATE_STATUS = 201;

const createSale = async (req, res) => {
  const arr = req.body;
  const { type, message } = await salesServices.createNewSalesProducts(arr);
  if (type) return res.status(errorMap.mapError(type)).json({ message });
  res.status(HTTP_CREATE_STATUS).json(message);
};

const getAllSales = async (_req, res) => {
  const { message } = await salesServices.getAllSales();
  res.status(HTTP_OK_STATUS).json(message);
};

const getSaleById = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await salesServices.getSalesById(Number(id));
  if (type) return res.status(errorMap.mapError(type)).json({ message });
  res.status(HTTP_OK_STATUS).json(message);
};

const deleteSale = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await salesServices.deleteSale(Number(id));
  if (type) return res.status(errorMap.mapError(type)).json({ message });
  res.status(HTTP_NO_CONTENT_STATUS).end();
};

const updateSales = async (req, res) => {
  const arr = req.body;
  const { id } = req.params;
  const { type, message } = await salesServices.updateSales(arr, Number(id));
  if (type) return res.status(errorMap.mapError(type)).json({ message });
  res.status(HTTP_OK_STATUS).json({ saleId: id, itemsUpdated: message });
};

module.exports = {
  createSale,
  getAllSales,
  getSaleById,
  deleteSale,
  updateSales,
};