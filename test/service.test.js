const { expect } = require('chai');
const sinon = require('sinon');
const Service = require('../src/service');
const PrimaryRepository = require('../src/repository');
const SecondaryRepository = require('../src/secondaryRepository')

describe('Service Integration Tests with Multiple Stubs', () => {
    let service;
    let primaryRepositoryStub;
    let secondaryRepositoryStub;

    beforeEach(() => {
        // Membuat instance stub untuk repository
        primaryRepositoryStub = sinon.createStubInstance(PrimaryRepository);
        secondaryRepositoryStub = sinon.createStubInstance(SecondaryRepository);
        service = new Service(primaryRepositoryStub, secondaryRepositoryStub); // Mengirimkan stubs
    });

    it('should throw an error if item is not found in both repositories', () => {
        primaryRepositoryStub.getItemById.returns(null);
        secondaryRepositoryStub.getItemById.returns(null);
        
        expect(() => service.getItemById(5)).to.throw('Item not found in both repositories'); // Sesuaikan dengan pesan error
        expect(primaryRepositoryStub.getItemById.calledOnceWith(5)).to.be.true;
        expect(secondaryRepositoryStub.getItemById.calledOnceWith(5)).to.be.true;
    });

    it('should return item from primary repository if found', () => {
        const item = { id: 1, name: 'Item 1' };
        primaryRepositoryStub.getItemById.withArgs(1).returns(item);
        
        const result = service.getItemById(1);
        expect(result).to.deep.equal(item); // Gunakan deep equality
        expect(primaryRepositoryStub.getItemById.calledOnceWith(1)).to.be.true;
        expect(secondaryRepositoryStub.getItemById.notCalled).to.be.true;
    });

    it('should return item from secondary repository if not found in primary', () => {
        primaryRepositoryStub.getItemById.withArgs(3).returns(null);
        const item = { id: 3, name: 'Item 3' };
        secondaryRepositoryStub.getItemById.withArgs(3).returns(item);
        
        const result = service.getItemById(3);
        expect(result).to.deep.equal(item); // Gunakan deep equality
        expect(primaryRepositoryStub.getItemById.calledOnceWith(3)).to.be.true;
        expect(secondaryRepositoryStub.getItemById.calledOnceWith(3)).to.be.true;
    });

    // Uji metode removeItemById
    describe('removeItemById', () => {
        it('should remove item from primary repository', () => {
            const item = { id: 1, name: 'Item 1' };
            primaryRepositoryStub.getItemById.withArgs(1).returns(item);
            primaryRepositoryStub.removeItemById = sinon.stub().returns({ message: 'Item berhasil dihapus' });

            const result = service.removeItemById(1);
    
            expect(result).to.deep.equal({ message: 'Item berhasil dihapus' });
            expect(primaryRepositoryStub.removeItemById.calledOnceWith(1)).to.be.true;
        });
    
        it('should throw an error if item not found', () => {
            primaryRepositoryStub.removeItemById = sinon.stub().throws(new Error('Item tidak ditemukan'));

            expect(() => service.removeItemById(3)).to.throw('Item tidak ditemukan');
            expect(primaryRepositoryStub.removeItemById.calledOnceWith(3)).to.be.true;
        });
    });
});
