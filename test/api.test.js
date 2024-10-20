// test/api.test.js
const request = require('supertest');
const { expect } = require('chai');
const app = require('../src/app');

describe('API Testing', () => {

    // Test untuk mendapatkan semua item
    it('should return all items', (done) => {
        request(app)
            .get('/api/items')
            .end((err, res) => {
                expect(res.status).to.equal(200);
                expect(res.body).to.be.an('array');
                expect(res.body.length).to.be.at.least(1);
                done();
            });
    });

    // Test untuk membuat item baru
    it('should create a new item', (done) => {
        const newItem = { name: 'Item 3' };
        request(app)
            .post('/api/items')
            .send(newItem)
            .end((err, res) => {
                expect(res.status).to.equal(201);
                expect(res.body).to.have.property('id');
                expect(res.body).to.have.property('name', 'Item 3');
                done();
            });
    });

    // Test untuk memperbarui item yang sudah ada
    it('should update an existing item with new data', (done) => {
        const updatedItem = { name: 'Updated Item 3' };
        request(app)
            .put('/api/items/1')  // Pastikan ID item sesuai dengan yang ada di database
            .send(updatedItem)
            .end((err, res) => {
                expect(res.status).to.equal(200);
                expect(res.body).to.have.property('id');
                expect(res.body).to.have.property('name', 'Updated Item 3');
                done();
            });
    });

    // Test untuk menghapus item yang ada
    it('should delete an existing item', (done) => {
        request(app)
            .delete('/api/items/1')  // Pastikan ID item sesuai dengan yang ada di database
            .end((err, res) => {
                expect(res.status).to.equal(200);
                done();
            });
    });

    // Test untuk mengembalikan 404 ketika menghapus item yang tidak ada
    it('should return 404 when deleting a non-existing item', (done) => {
        request(app)
            .delete('/api/items/999')  // ID yang tidak ada
            .end((err, res) => {
                expect(res.status).to.equal(404);
                done();
            });
    });

    // Test untuk mengembalikan 404 ketika memperbarui item yang tidak ada
    it('should return 404 when updating a non-existing item', (done) => {
        const updatedItem = { name: 'Non-existing Item' };
        request(app)
            .put('/api/items/999')  // ID yang tidak ada
            .send(updatedItem)
            .end((err, res) => {
                expect(res.status).to.equal(404);
                done();
            });
    });
});
// Test untuk mendapatkan item spesifik berdasarkan ID
it('should return a single item by ID', (done) => {
    request(app)
        .get('/api/items/1')  // Pastikan ID item sesuai dengan yang ada di database
        .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(res.body).to.have.property('id', 1);  // Pastikan ID item benar
            expect(res.body).to.have.property('name');
            done();
        });
});
