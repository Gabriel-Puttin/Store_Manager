const { expect } = require('chai');
const sinon = require('sinon');
const { productsModel } = require('../../../src/models');
const ProductsService = require('../../../src/services/products.service');
const { allProducts, newProduct, updatedProduct } = require('../models/mocks/products.mocks');

describe('Testes da camada Services', function () {
  describe('Teste da função que lida com a listagem de produtos', function () {
    afterEach(function () {
      sinon.restore();
    });

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
  });

  describe('Teste da função que lida com a listagem de apenas um produto', function () {
    afterEach(function () {
      sinon.restore();
    });

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
  });

  describe('Teste da função que lida com a criação de um produto', function () {
    afterEach(function () {
      sinon.restore();
    });

    it('Testa a função "createProduct"', async function () {
      sinon.stub(productsModel, 'insertProduct').resolves(newProduct.id);
      const response = await ProductsService.createProduct(newProduct.name);

      expect(response.type).to.be.null;
      expect(response.message).to.deep.equal(newProduct);
    });
  });

  describe('Teste da função que lida com a atualização de um produto', function () {
    afterEach(function () {
      sinon.restore();
    });

    it('Testa a função "updateProduct"', async function () {
      sinon.stub(productsModel, 'updateProduct').resolves(1);
      const response = await ProductsService.updateProduct(updatedProduct.name, 1);

      expect(response.type).to.be.null;
      expect(response.message).to.deep.equal({ id: 1, name: updatedProduct.name });
    });

    it('Testa a função "updateProduct" em caso de erro', async function () {
      sinon.stub(productsModel, 'updateProduct').resolves(0);
      const response = await ProductsService.updateProduct(updatedProduct.name, 0);

      expect(response.type).to.equal('PRODUCT_NOT_FOUND');
      expect(response.message).to.deep.equal('Product not found');
    });
  });

  describe('Teste da função que lida com a remoção de um produto', function () {
    afterEach(function () {
      sinon.restore();
    });

    it('Testa a função "deleteProduct"', async function () {
      sinon.stub(productsModel, 'deleteProduct').resolves(1);
      const response = await ProductsService.deleteProduct(1);

      expect(response.type).to.be.null;
      expect(response.message).to.deep.equal(1);
    });

    it('Testa a função "deleteProduct" em caso de erro', async function () {
      sinon.stub(productsModel, 'deleteProduct').resolves(10);
      const response = await ProductsService.deleteProduct(10);

      expect(response.type).to.equal('PRODUCT_NOT_FOUND');
      expect(response.message).to.deep.equal('Product not found');
    });
  });
});
