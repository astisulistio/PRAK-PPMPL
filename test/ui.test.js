const { Builder, By, Key, until } = require('selenium-webdriver');
const { expect } = require('chai');

describe('UI Testing using Selenium', function() {
    this.timeout(30000); // Set timeout untuk Mocha tests

    let driver;

    // Inisialisasi WebDriver sebelum menjalankan test case
    before(async function() {
        driver = await new Builder().forBrowser('chrome').build(); // Ganti 'chrome' sesuai kebutuhan, misalnya 'firefox'
    });

    // Tutup WebDriver setelah semua test selesai
    after(async function() {
        await driver.quit();
    });

    // 1. Pengujian untuk Memastikan Halaman Login Berfungsi
    it('should load the login page', async function() {
        await driver.get("D:/SEMESTER 5/PRAKTIKUM PPMPL/2200016116-Astisulistio-P4/login.html"); // Ubah path sesuai lokasi file login.html
        const title = await driver.getTitle();
        expect(title).to.equal('Login Page');
    });

    // 2. Pengujian Input Username dan Password menggunakan ID
    it('should input username and password', async function() {
        await driver.findElement(By.id('username')).sendKeys('testuser');
        await driver.findElement(By.id('password')).sendKeys('password123');
        const usernameValue = await driver.findElement(By.id('username')).getAttribute('value');
        const passwordValue = await driver.findElement(By.id('password')).getAttribute('value');
        expect(usernameValue).to.equal('testuser');
        expect(passwordValue).to.equal('password123');
    });

    // 3. Pengujian Klik Tombol Login
    it('should click the login button', async function() {
        await driver.findElement(By.id('loginButton')).click();
    });

    // 4. Pengujian Validasi Login Gagal
    it('should display an error message if login fails', async function() {
        // Input username dan password yang salah
        await driver.findElement(By.id('username')).clear();
        await driver.findElement(By.id('username')).sendKeys('wronguser');
        await driver.findElement(By.id('password')).clear();
        await driver.findElement(By.id('password')).sendKeys('wrongpassword');
        
        // Klik tombol login
        await driver.findElement(By.id('loginButton')).click();
    
        // Tunggu hingga elemen errorMessage muncul
        try {
            const errorElement = await driver.wait(until.elementLocated(By.id('errorMessage')), 5000); // Tunggu hingga 5 detik
            const errorMessage = await errorElement.getText();
            console.log("Pesan error ditemukan:", errorMessage);
        } catch (error) {
            console.log("Pesan error tidak ditemukan:", error);
        }
    });
    // 5. Penggunaan CSS Selector dan XPath untuk Input Data
    it('should input username and password using CSS Selector and XPath', async function() {
        await driver.get("D:/SEMESTER 5/PRAKTIKUM PPMPL/2200016116-Astisulistio-P4/login.html");

        // Masukkan username menggunakan CSS Selector
        await driver.findElement(By.css('#username')).sendKeys('testuser');
        const usernameValue = await driver.findElement(By.css('#username')).getAttribute('value');
        expect(usernameValue).to.equal('testuser');

        // Masukkan password menggunakan XPath
        await driver.findElement(By.xpath('//*[@id="password"]')).sendKeys('password123');
        const passwordValue = await driver.findElement(By.xpath('//*[@id="password"]')).getAttribute('value');
        expect(passwordValue).to.equal('password123');
    });

    // 6. Validasi Visual untuk Elemen Tombol Login
    it('should validate the visibility of login button', async function() {
        await driver.get("D:/SEMESTER 5/PRAKTIKUM PPMPL/2200016116-Astisulistio-P4/login.html");

        // Validasi apakah tombol login terlihat
        const isDisplayed = await driver.findElement(By.id('loginButton')).isDisplayed();
        expect(isDisplayed).to.be.true;
    });
});
