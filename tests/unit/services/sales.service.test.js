const { expect } = require('chai');
const sinon = require('sinon');
const { salesModel } = require('../../../src/models');
const salesService = require('../../../src/services/sales.service');
const { newSales, products, wrongProducts } = require('./mocks/sales.mocks');
const { allSales, allSalesById, upProducts } = require('../models/mocks/sales.mocks');

describe('Testes da camada Services', function () {
  describe('Teste da função que lida com a criação de uma venda', function () {
    beforeEach(function () {
      sinon.stub(salesModel, 'insertSales').resolves(3);
      sinon.stub(salesModel, 'insertSalesProducts').resolves([{ insertId: 2 }]);
    })

    afterEach(function () {
      sinon.restore();
    });

    it('Testa a função "createNewSalesProducts" em caso de sucesso', async function () {
      const response = await salesService.createNewSalesProducts(products);

      expect(response.type).to.be.null;
      expect(response.message).to.deep.equal(newSales);
    });

    it('Testa a função "createNewSalesProducts" sem productId', async function () {
      const response = await salesService.createNewSalesProducts(wrongProducts.withoutProductId);

      expect(response.type).to.equal('PRODUCT_ID_REQUIRED');
      expect(response.message).to.equal('"productId" is required');
    });

    it('Testa a função "createNewSalesProducts" sem quantity', async function () {
      const response = await salesService.createNewSalesProducts(wrongProducts.withoutQuantity);

      expect(response.type).to.equal('QUANTITY_REQUIRED');
      expect(response.message).to.equal('"quantity" is required');
    });

    it('Testa a função "createNewSalesProducts" com quantity incorreto', async function () {
      const response = await salesService.createNewSalesProducts(wrongProducts.wrongQuantity);

      expect(response.type).to.equal('INVALID_QUANTITY');
      expect(response.message).to.equal('"quantity" must be greater than or equal to 1');
    });

    it('Testa a função "createNewSalesProducts" com produto inexistente', async function () {
      const response = await salesService.createNewSalesProducts(wrongProducts.nanProduct);

      expect(response.type).to.equal('PRODUCT_NOT_FOUND');
      expect(response.message).to.equal('Product not found');
    });

  });

  describe('Teste da função que lida com a busca de todas as venda', function () {
    beforeEach(function () {
      sinon.stub(salesModel, 'findAll').resolves(allSales);
    })

    afterEach(function () {
      sinon.restore();
    });

    it('Testa a função "getAllSales"', async function () {
      const response = await salesService.getAllSales();

      expect(response.type).to.be.null;
      expect(response.message).to.deep.equal(allSales);
    });
  });

  describe('Teste da função que lida com a busca de todas as venda com base no mesmo ID', function () {
    afterEach(function () {
      sinon.restore();
    });

    it('Testa a função "getSalesById"', async function () {
      sinon.stub(salesModel, 'findById').resolves(allSalesById);
      const response = await salesService.getSalesById(1);

      expect(response.type).to.be.null;
      expect(response.message).to.deep.equal(allSalesById);
    });

    it('Testa a função "getSalesById" em caso de erro', async function () {
      sinon.stub(salesModel, 'findById').resolves([]);
      const response = await salesService.getSalesById(0);

      expect(response.type).to.equal('SALES_NOT_FOUND');
      expect(response.message).to.equal('Sale not found');
    });
  });

  describe('Teste da função que lida com a remoção de uma venda com base no ID', function () {
    afterEach(function () {
      sinon.restore();
    });

    it('Testa a função "deleteSale"', async function () {
      sinon.stub(salesModel, 'deleteSale').resolves(2);
      const response = await salesService.deleteSale(2);

      expect(response.type).to.be.null;
      expect(response.message).to.deep.equal(2);
    });

    it('Testa a função "deleteSale" em caso de erro', async function () {
      sinon.stub(salesModel, 'deleteSale').resolves(22);
      const response = await salesService.deleteSale(22);

      expect(response.type).to.equal('SALES_NOT_FOUND');
      expect(response.message).to.equal('Sale not found');
    });
  });

  describe('Teste da função que lida com a atualização de vendas com base no ID', function () {
    afterEach(function () {
      sinon.restore();
    });

    it('Testa a função "updateSales"', async function () {
      sinon.stub(salesModel, 'updateSales').resolves(1);
      const response = await salesService.updateSales(upProducts, 1);

      expect(response.type).to.be.null;
      expect(response.message).to.deep.equal(upProducts);
    });
  });
});
