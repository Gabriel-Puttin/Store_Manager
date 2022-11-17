const addProducts = [
  {
    "productId": 1,
    "quantity": 1
  },
  {
    "productId": 2,
    "quantity": 5
  }
];

const allSales = [
  {
    saleId: 1,
    date: "2022-11-17T20:41:17.000Z",
    productId: 1,
    quantity: 5
  },
  {
    saleId: 1,
    date: "2022-11-17T20:41:17.000Z",
    productId: 2,
    quantity: 10
  },
  {
    saleId: 2,
    date: "2022-11-17T20:41:17.000Z",
    productId: 3,
    quantity: 15
  }
];

const allSalesById = [
  {
    date: "2022-11-17T20:41:17.000Z",
    productId: 1,
    quantity: 5
  },
  {
    date: "2022-11-17T20:41:17.000Z",
    productId: 2,
    quantity: 10
  }
]

module.exports = {
  addProducts,
  allSales,
  allSalesById
};