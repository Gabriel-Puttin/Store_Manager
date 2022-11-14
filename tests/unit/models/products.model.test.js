const sinon = require('sinon');
const { expect } = require('chai');

const { productsModel } = require('../../../src/models');
const connection = require('../../../src/models/connection');
const { allProducts } = require('./mocks/products.mocks');

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
});