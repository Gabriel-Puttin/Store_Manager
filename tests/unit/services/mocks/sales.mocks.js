const newSales = {
  id: 3,
  itemsSold: [
    {
      productId: 1,
      quantity: 1
    },
    {
      productId: 2,
      quantity: 5
    }
  ]
}

const products = [
  {
    "productId": 1,
    "quantity": 1
  },
  {
    "productId": 2,
    "quantity": 5
  }
];

const wrongProducts = {
  withoutProductId: [
    {
      "quantity": 1
    },
    {
      "productId": 2,
      "quantity": 5
    }
  ],
  withoutQuantity: [
    {
      "productId": 1,
      "quantity": 1
    },
    {
      "productId": 2,
    }
  ],
  wrongQuantity: [
    {
      "productId": 1,
      "quantity": 0
    },
    {
      "productId": 2,
      "quantity": 5
    }
  ],
  nanProduct: [
    {
      "productId": 9,
      "quantity": 1
    },
    {
      "productId": 2,
      "quantity": 5
    }
  ],
};

module.exports = {
  newSales,
  products,
  wrongProducts,
};