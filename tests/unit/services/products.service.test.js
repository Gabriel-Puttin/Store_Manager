const { expect } = require('chai');
const sinon = require('sinon');
const { productsModel } = require('../../../src/models');
const ProductsService = require('../../../src/services/products.service');
const { allProducts } = require('../models/mocks/products.mocks');

describe('Testes da camada Services', function () {
  describe('Teste da função que lida com a listagem de produtos', function () {
    it('Testa a função "getAllProducts"', async function () {
      sinon.stub(productsModel, 'findAll').resolves(allProducts);
      const response = await ProductsService.getAllProducts();
      
      expect(response.type).to.be.null;
      expect(response.message).to.deep.equal(allProducts);
    });

    it('Testa a função "getAllProducts" em caso de error', async function () {
      sinon.stub(productsModel, 'findAll').resolves(undefined);
      const response = await ProductsService.getAllProducts();
      
      expect(response.type).to.equal('Invalid Product');
      expect(response.message).to.equal('Product not found');
    });

    afterEach(function () {
      sinon.restore();
    });
  });

  describe('Teste da função que lida com a listagem de apenas um produto', function () {
    it('Testa a função "getProductsById"', async function () {
      sinon.stub(productsModel, 'findById').resolves(allProducts[0]);
      const response = await ProductsService.getProductsById(1);

      expect(response.type).to.be.null;
      expect(response.message).to.deep.equal(allProducts[0]);
    });

    it('Testa a função "getProductsById" em caso de error', async function () {
      sinon.stub(productsModel, 'findById').resolves(undefined);
      const response = await ProductsService.getProductsById(9);

      expect(response.type).to.equal('Invalid Product');
      expect(response.message).to.equal('Product not found');
    });

    afterEach(function () {
      sinon.restore();
    });
  });
});
