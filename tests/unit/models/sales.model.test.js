const sinon = require('sinon');
const { expect } = require('chai');

const { salesModel } = require('../../../src/models');
const connection = require('../../../src/models/connection');
const { addProducts, allSales, allSalesById } = require('./mocks/sales.mocks');

describe('Testes da camada Models', function () {
  describe('Testa a criação de uma nova venda', function () {
    afterEach(function () {
      sinon.restore();
    });

    it('Testa a função "insertSales"', async function () {
      sinon.stub(connection, 'execute').resolves([{ insertId: 3 }]);
      const response = await salesModel.insertSales();
      expect(response).to.be.a('number');
      expect(response).to.deep.equal(3);
    });

    it('Testa a função "insertSalesProducts"', async function () {
      sinon.stub(connection, 'execute').resolves([{ insertId: 3 }]);
      const response = await salesModel.insertSalesProducts(3, addProducts[0]);
      expect(response).to.be.a('number');
      expect(response).to.deep.equal(3);
    });
  });

  describe('Testa a busca por todas as vendas', function () {
    afterEach(function () {
      sinon.restore();
    });

    it('Testa a função "findAll"', async function () {
      sinon.stub(connection, 'execute').resolves([allSales]);
      const response = await salesModel.findAll();
      expect(response).to.be.a('array');
      expect(response).to.deep.equal(allSales);
    });
  });

  describe('Testa a busca por todas as vendas do mesmo ID', function () {
    afterEach(function () {
      sinon.restore();
    });

    it('Testa a função "findById"', async function () {
      sinon.stub(connection, 'execute').resolves([allSalesById]);
      const response = await salesModel.findById(1);
      expect(response).to.be.a('array');
      expect(response).to.deep.equal(allSalesById);
    });
  });
});