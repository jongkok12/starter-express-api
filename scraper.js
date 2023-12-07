const request = require('request');
const cheerio = require('cheerio');

request('https://livedraw-hongkong1.blogspot.com/', (error, response, html) => {
  if (!error && response.statusCode == 200) {
    const $ = cheerio.load(html);

    // Mengambil data yang dibutuhkan dari tabel
    const result = [];
    $('table tr').each(function() {
      const date = $(this).find('td:nth-child(1)').text().trim();
      const number1 = $(this).find('td:nth-child(2)').text().trim();
      const number2 = $(this).find('td:nth-child(3)').text().trim();
      const number3 = $(this).find('td:nth-child(4)').text().trim();
      const number4 = $(this).find('td:nth-child(5)').text().trim();
      const number5 = $(this).find('td:nth-child(6)').text().trim();
      const number6 = $(this).find('td:nth-child(7)').text().trim();
      const number7 = $(this).find('td:nth-child(8)').text().trim();
      result.push({ date, number1, number2, number3, number4, number5, number6, number7 });
    });

    // Menampilkan hasil scraping
    console.log(result);
  }
});
