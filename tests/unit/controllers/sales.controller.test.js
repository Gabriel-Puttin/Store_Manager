const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);
const salesController = require('../../../src/controllers/sales.controller');
const salesService = require('../../../src/services/sales.service');
const { products, newSales, wrongProducts } = require('../services/mocks/sales.mocks')

const HTTP_CREATE_STATUS = 201;
const HTTP_NOT_FOUND_STATUS = 404;

describe('Testes da camada Controllers', function () {
  describe('Teste o endpoint que lida com a criação de uma nova venda', function () {
    it('Testa a função "createSale"', async function () {
      const res = {};
      const req = { body: products };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(salesService, 'createNewSalesProducts')
        .resolves({ type: null, message: newSales });
      await salesController.createSale(req, res);

      expect(res.status).to.have.been.calledWith(HTTP_CREATE_STATUS);
      expect(res.json).to.have.been.calledWith(newSales);
    });

    it('Testa a função "createSale" em caso de erro', async function () {
      const res = {};
      const req = { body: wrongProducts.nanProduct };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(salesService, 'createNewSalesProducts')
        .resolves({ type: 'PRODUCT_NOT_FOUND', message: 'Product not found' });
      await salesController.createSale(req, res);

      expect(res.status).to.have.been.calledWith(HTTP_NOT_FOUND_STATUS);
      expect(res.json).to.have.been.calledWith({ message: 'Product not found' });
    });

    afterEach(function () {
      sinon.restore();
    });
  });
});