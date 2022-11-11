const express = require('express');
const model = require('./models');

const app = express();
app.use(express.json());

const HTTP_OK_STATUS = 200;

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.get('/products', async (_req, res) => {
  try {
    const result = await model.productsModel.findAll();
    if (!result) return res.status(404).send({ message: 'Product not found' });
    return res.status(HTTP_OK_STATUS).json(result);
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
});

app.get('/products/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await model.productsModel.findById(Number(id));
    if (!result) return res.status(404).send({ message: 'Product not found' });
    return res.status(HTTP_OK_STATUS).json(result);
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
});

// não remova essa exportação, é para o avaliador funcionar
// você pode registrar suas rotas normalmente, como o exemplo acima
// você deve usar o arquivo index.js para executar sua aplicação 
module.exports = app;