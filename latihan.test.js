const { expect } = require('chai');
const { tambah, kali, kurang, bagi } = require('./math');

//Pengurangan dan Pembagian
describe('Pengurangan dan Pembagian', () => {
  it('menghasilkan 0 ketika mengurangkan (-2) dari (-2)', () => {
    const hasil = kurang(-2, -2);
    expect(hasil).to.equal(0);
  });

  it('menghasilkan -2 ketika membagi 6 dengan -3', () => {
    const hasil = bagi(6, -3);
    expect(hasil).to.equal(-2);
  });

  it('melempar error ketika mencoba membagi dengan 0', () => {
    const bagiDenganNol = () => bagi(6, 0);
    expect(bagiDenganNol).to.throw('Tidak bisa membagi dengan nol');
  });
});

//Perkalian dan Pertambahan
describe('Perkalian dan Pertambahan', () => {
  const errorTambah = () => new Error('Input tidak valid untuk pertambahan');
  const errorKali = () => new Error('Input tidak valid untuk perkalian');

  it('melempar error ketika menggunakan string pada fungsi tambah', () => {
    expect(() => tambah("a", "b")).to.throw(Error);
    expect(() => tambah(2, "b")).to.throw(Error);
    expect(() => tambah("a", 2)).to.throw(Error);
  });

  it('melempar error ketika salah satu atau kedua parameter null pada fungsi kali', () => {
    expect(() => kali(null, null)).to.throw(Error);
    expect(() => kali(2, null)).to.throw(Error);
    expect(() => kali(null, 2)).to.throw(Error);
  });
});
