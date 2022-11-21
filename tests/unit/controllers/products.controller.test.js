const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);
const productsService = require('../../../src/services/products.service');
const productsController = require('../../../src/controllers/products.controller');
const { allProducts, newProduct, searchedProducts } = require('../models/mocks/products.mocks');
const { updatedProduct, wrongUpdatedProduct, deletedProduct } = require('./mocks/products.mocks');

const HTTP_OK_STATUS = 200;
const HTTP_NO_CONTENT_STATUS = 204;
const HTTP_CREATE_STATUS = 201;
const HTTP_NOT_FOUND_STATUS = 404;

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

    it('Testa a função "getAllProducts" em caso de erro', async function () {
      const res = {};
      const req = { body: {} };
      res.status = sinon.stub().returns(res);
      res.send = sinon.stub().returns();
      sinon.stub(productsService, 'getAllProducts')
        .resolves({ type: 'Invalid Product', message: 'Product not found' });
      await productsController.getAllProducts(req, res);

      expect(res.status).to.have.been.calledWith(HTTP_NOT_FOUND_STATUS);
      expect(res.send).to.have.been.calledWith({ message: 'Product not found' });
    });

    afterEach(function () {
      sinon.restore();
    });
  });

  describe('Teste o endpoint que lida com a requisição de apenas um produto', function () {
    it('Testa a função "getProductsById"', async function () {
      const res = {};
      const req = { params: { id: 1 } };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(productsService, 'getProductsById')
        .resolves({ type: null, message: allProducts[0] });
      await productsController.getProductsById(req, res);

      expect(res.status).to.have.been.calledWith(HTTP_OK_STATUS);
      expect(res.json).to.have.been.calledWith(allProducts[0]);
    });

    it('Testa a função "getProductsById" caso o produto não exista', async function () {
      const res = {};
      const req = { params: { id: 90 } };
      res.status = sinon.stub().returns(res);
      res.send = sinon.stub().returns();
      sinon.stub(productsService, 'getProductsById')
        .resolves({ type: 'Invalid Product', message: 'Product not found' });
      await productsController.getProductsById(req, res);

      expect(res.status).to.have.been.calledWith(HTTP_NOT_FOUND_STATUS);
      expect(res.send).to.have.been.calledWith({ message: 'Product not found' });
    });

    afterEach(function () {
      sinon.restore();
    });
  });

  describe('Teste o endpoint que lida com a criação de um novo produto', function () {
    it('Testa a função "createProduct"', async function () {
      const res = {};
      const req = { body: { name: newProduct.name } };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(productsService, 'createProduct')
        .resolves({ type: null, message: newProduct });
      await productsController.createProduct(req, res);

      expect(res.status).to.have.been.calledWith(HTTP_CREATE_STATUS);
      expect(res.json).to.have.been.calledWith(newProduct);
    });

    afterEach(function () {
      sinon.restore();
    });
  });

  describe('Teste o endpoint que lida com a atualização de um produto', function () {
    afterEach(function () {
      sinon.restore();
    });

    it('Testa a função "updateProduct"', async function () {
      const res = { };
      const req = { body: { name: updatedProduct.message.name }, params: { id: 1 } };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(productsService, 'updateProduct')
        .resolves(updatedProduct);
      await productsController.updateProduct(req, res);

      expect(res.status).to.have.been.calledWith(HTTP_OK_STATUS);
      expect(res.json).to.have.been.calledWith(updatedProduct.message);
    });

    it('Testa a função "updateProduct" em caso de erro', async function () {
      const res = {};
      const req = { body: { name: updatedProduct.message.name }, params: { id: 0 } };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(productsService, 'updateProduct')
        .resolves(wrongUpdatedProduct);
      await productsController.updateProduct(req, res);

      expect(res.status).to.have.been.calledWith(HTTP_NOT_FOUND_STATUS);
      expect(res.json).to.have.been.calledWith({ message: wrongUpdatedProduct.message });
    });
  });

  describe('Teste o endpoint que lida com a remoção de um produto', function () {
    afterEach(function () {
      sinon.restore();
    });

    it('Testa a função "deleteProduct"', async function () {
      const res = {};
      const req = { params: { id: 1 } };
      res.status = sinon.stub().returns(res);
      res.end = sinon.stub().returns();
      sinon.stub(productsService, 'deleteProduct')
        .resolves(deletedProduct);
      await productsController.deleteProduct(req, res);

      expect(res.status).to.have.been.calledWith(HTTP_NO_CONTENT_STATUS);
    });

    it('Testa a função "deleteProduct" em caso de erro', async function () {
      const res = {};
      const req = { params: { id: 10 } };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(productsService, 'deleteProduct')
        .resolves(wrongUpdatedProduct);
      await productsController.deleteProduct(req, res);

      expect(res.status).to.have.been.calledWith(HTTP_NOT_FOUND_STATUS);
      expect(res.json).to.have.been.calledWith({ message: wrongUpdatedProduct.message });
    });
  });

  describe('Teste o endpoint que lida com a busca de produtos por caracteres semelhantes', function () {
    afterEach(function () {
      sinon.restore();
    });

    it('Testa a função "searchProducts"', async function () {
      const res = {};
      const req = { query: { q: 'c' } };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(productsService, 'searchProducts')
        .resolves(searchedProducts);
      await productsController.searchProducts(req, res);

      expect(res.status).to.have.been.calledWith(HTTP_OK_STATUS);
      // expect(res.json).to.have.been.calledWith({ message: searchedProducts });
    });
  });
});
