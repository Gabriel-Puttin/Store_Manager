const { expect } = require('chai');
const sinon = require('sinon');
const { salesModel } = require('../../../src/models');
const salesService = require('../../../src/services/sales.service');
const { newSales, products, wrongProducts } = require('./mocks/sales.mocks');

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
});
