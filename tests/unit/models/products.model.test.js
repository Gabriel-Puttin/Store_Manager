const sinon = require('sinon');
const { expect } = require('chai');

const { productsModel } = require('../../../src/models');
const connection = require('../../../src/models/connection');
const { allProducts, newProduct, updatedProduct } = require('./mocks/products.mocks');

describe('Testes da camada Models', function () {
  describe('Testa a listagem de todos os produtos', function () {
    before(async function () {
      sinon.stub(connection, 'execute').resolves([allProducts]);
    });

    after(async function () {
      connection.execute.restore();
    });

    it('Testa a função "findAll"', async function () {
      const response = await productsModel.findAll();
      expect(response).to.be.a('array');
      expect(response).to.deep.equal(allProducts);
    });
  });

  describe('Testa a listagem de apenas um único produto', function () {
    before(async function () {
      sinon.stub(connection, 'execute').resolves([[allProducts[1]]]);
    });

    after(async function () {
      connection.execute.restore();
    });

    it('Testa a função "findById"', async function () {
      const response = await productsModel.findById(2);
      expect(response).to.be.a('object');
      expect(response).to.deep.equal(allProducts[1]);
    });
  });

  describe('Testa a criação de um novo produto', function () {
    before(async function () {
      sinon.stub(connection, 'execute').resolves([{ insertId: newProduct.id }]);
    });

    after(async function () {
      connection.execute.restore();
    });

    it('Testa a função "insertProduct"', async function () {
      const response = await productsModel.insertProduct(newProduct.name);
      expect(response).to.be.a('number');
      expect(response).to.deep.equal(newProduct.id);
    });
  });

  describe('Testa a atualização de um produto', function () {
    before(async function () {
      sinon.stub(connection, 'execute').resolves([{ insertId: 1 }]);
    });

    after(async function () {
      connection.execute.restore();
    });

    it('Testa a função "updateProduct"', async function () {
      const response = await productsModel.updateProduct(updatedProduct.name, 1);
      expect(response).to.be.a('number');
      expect(response).to.deep.equal(1);
    });
  });

  describe('Testa a remoção de um produto', function () {
    before(async function () {
      sinon.stub(connection, 'execute').resolves([{ insertId: 1 }]);
    });

    after(async function () {
      connection.execute.restore();
    });

    it('Testa a função "deleteProduct"', async function () {
      const response = await productsModel.deleteProduct(1);
      expect(response).to.be.a('number');
      expect(response).to.deep.equal(1);
    });
  });
});