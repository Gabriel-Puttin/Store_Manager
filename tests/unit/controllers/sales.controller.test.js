const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);
const salesController = require('../../../src/controllers/sales.controller');
const salesService = require('../../../src/services/sales.service');
const { products, newSales, wrongProducts } = require('../services/mocks/sales.mocks')
const { allSales, allSalesById } = require('../models/mocks/sales.mocks');

const HTTP_OK_STATUS = 200;
const HTTP_CREATE_STATUS = 201;
const HTTP_NO_CONTENT_STATUS = 204;
const HTTP_NOT_FOUND_STATUS = 404;

describe('Testes da camada Controllers', function () {
  describe('Teste o endpoint que lida com a criação de uma nova venda', function () {
    afterEach(function () {
      sinon.restore();
    });

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
  });

  describe('Teste o endpoint que lida com a busca de todas as vendas', function () {
    afterEach(function () {
      sinon.restore();
    });

    it('Testa a função "getAllSales"', async function () {
      const res = {};
      const req = { body: {} };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(salesService, 'getAllSales')
        .resolves({ type: null, message: allSales });
      await salesController.getAllSales(req, res);

      expect(res.status).to.have.been.calledWith(HTTP_OK_STATUS);
      expect(res.json).to.have.been.calledWith(allSales);
    });
  });

  describe('Teste o endpoint que lida com a busca de todas as vendas com o mesmo ID', function () {
    afterEach(function () {
      sinon.restore();
    });

    it('Testa a função "getSalesById"', async function () {
      const res = {};
      const req = { params: { id: 1 } };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(salesService, 'getSalesById')
        .resolves({ type: null, message: allSalesById });
      await salesController.getSaleById(req, res);

      expect(res.status).to.have.been.calledWith(HTTP_OK_STATUS);
      expect(res.json).to.have.been.calledWith(allSalesById);
    });

    it('Testa a função "getSalesById" em caso de erro', async function () {
      const res = {};
      const req = { params: { id: 0 } };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(salesService, 'getSalesById')
        .resolves({ type: 'SALES_NOT_FOUND', message: 'Sale not found' });
      await salesController.getSaleById(req, res);

      expect(res.status).to.have.been.calledWith(HTTP_NOT_FOUND_STATUS);
      expect(res.json).to.have.been.calledWith({ message: 'Sale not found' });
    });
  });

  describe('Teste o endpoint que lida com a remoção de uma venda', function () {
    afterEach(function () {
      sinon.restore();
    });

    it('Testa a função "deleteSale"', async function () {
      const res = {};
      const req = { params: { id: 1 } };
      res.status = sinon.stub().returns(res);
      res.end = sinon.stub().returns();
      sinon.stub(salesService, 'deleteSale')
        .resolves({ type: null, message: 1 });
      await salesController.deleteSale(req, res);

      expect(res.status).to.have.been.calledWith(HTTP_NO_CONTENT_STATUS);
    });

    it('Testa a função "deleteSale" em caso de erro', async function () {
      const res = {};
      const req = { params: { id: 0 } };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(salesService, 'deleteSale')
        .resolves({ type: 'SALES_NOT_FOUND', message: 'Sale not found' });
      await salesController.deleteSale(req, res);

      expect(res.status).to.have.been.calledWith(HTTP_NOT_FOUND_STATUS);
      expect(res.json).to.have.been.calledWith({ message: 'Sale not found' });
    });
  });
});