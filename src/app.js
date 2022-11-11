const express = require('express');
const model = require('./models');

const app = express();

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.get('/products', async (_req, res) => {
  const result = await model.productsModel.findAll();
  res.status(200).json(result);
});

app.get('/products/:id', async (req, res) => {
  const { id } = req.params;
  const result = await model.productsModel.findById(id);
  res.status(200).json(result);
});

// não remova essa exportação, é para o avaliador funcionar
// você pode registrar suas rotas normalmente, como o exemplo acima
// você deve usar o arquivo index.js para executar sua aplicação 
module.exports = app;