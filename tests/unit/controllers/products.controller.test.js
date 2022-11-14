const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);
const productsService = require('../../../src/services/products.service');
const productsController = require('../../../src/controllers/products.controller');
const { allProducts } = require('../models/mocks/products.mocks');

const HTTP_OK_STATUS = 200;

describe('Testes da camada Controllers', function () {
  describe('Teste o endpoint que lida com a requisição de todos os produtos', function () {
    it('Testa a função "getAllProducts"', async function () {
      const res = {};
      const req = { body: {} };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(productsService, 'getAllProducts').resolves({type: null, message: allProducts});
      await productsController.getAllProducts(req, res);

      expect(res.status).to.have.been.calledWith(HTTP_OK_STATUS);
      expect(res.json).to.have.been.calledWith(allProducts);
    });

    afterEach(function () {
      sinon.restore();
    });
  });
});
