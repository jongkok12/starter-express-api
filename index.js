const express = require('express');
const cheerio = require('cheerio');
const { resolve } = require('path');
const app = express();
const port = 3000;

app.use(express.static('static'));

app.get('/', (req, res) => {
  res.sendFile(resolve(__dirname, 'pages/index.html'));
});

app.get('/sdy', (req, res) => {
  res.sendFile(resolve(__dirname, 'pages/sdy.html'));
});

app.get('/sgp4d', (req, res) => {
  res.sendFile(resolve(__dirname, 'pages/sgp4d.html'));
});

const hkUrl = 'https://w4.angkanet.zone/wp-content/plugins/togelmania/datalive/datalivehk.php';
const sdUrl = 'https://w4.angkanet.zone/wp-content/plugins/togelmania/datalive/sd.php';
const sgp4dUrl = 'https://w4.angkanet.zone/wp-content/plugins/togelmania/datalive/sg4d.php';
const sgptotodUrl = 'https://w4.angkanet.zone/wp-content/plugins/togelmania/datalive/sgtoto.php';


// Endpoint untuk data tabel Hong Kong
app.get('/api/hk', async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  try {
    const { default: fetch } = await import('node-fetch');
    const response = await fetch(hkUrl);
    const html = await response.text();
    const $ = cheerio.load(html);
    let idCounter = 1;

    const tableData = [];

    $('table tbody tr').each((index, element) => {
      const columns = $(element).find('td');
      const rowData = {
        id: idCounter++,
        name: $(columns[0]).text().trim(),
        number: $(columns[1]).text().trim()
      };
      tableData.push(rowData);
    });

    res.json(tableData);
  } catch (error) {
    console.error('Error fetching HK data:', error);
    res.status(500).json({ error: 'Error fetching HK data' });
  }
});

// Endpoint untuk data tabel Sydney
app.get('/api/sdy', async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  try {
    const { default: fetch } = await import('node-fetch');
    const response = await fetch(sdUrl);
    const html = await response.text();
    const $ = cheerio.load(html);
    let idCounter = 1;

    const tableData = [];

    $('table tbody tr').each((index, element) => {
      const columns = $(element).find('td');
      const rowData = {
        id: idCounter++,
        name: $(columns[0]).text().trim(),
        number: $(columns[1]).text().trim()
      };
      tableData.push(rowData);
    });

    res.json(tableData);
  } catch (error) {
    console.error('Error fetching SDY data:', error);
    res.status(500).json({ error: 'Error fetching SDY data' });
  }
});


// Endpoint untuk data tabel SGP4D
app.get('/api/sgp4d', async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  try {
    const { default: fetch } = await import('node-fetch');
    const response = await fetch(sgp4dUrl);
    const html = await response.text();
    const $ = cheerio.load(html);
    let idCounter = 1;

    const tableData = [];

    // Mengambil judul
const judul = $('.judul').text().trim();


    $('table tbody tr').each((index, element) => {
      const columns = $(element).find('td');
      const rowData = {
        s6: judul,
        id: idCounter++,

        s1: $(columns[0]).text().trim(),
        s2: $(columns[1]).text().trim(),
        s3: $(columns[2]).text().trim(),
        s4: $(columns[3]).text().trim(),
        s5: $(columns[4]).text().trim(),
        
      };
      tableData.push(rowData);
    });

    res.json(tableData);
  } catch (error) {
    console.error('Error fetching SGP4D data:', error);
    res.status(500).json({ error: 'Error fetching SGP4D data' });
  }
});


// Endpoint untuk data tabel SGPTOTO
app.get('/api/sgptoto', async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  try {
    const { default: fetch } = await import('node-fetch');
    const response = await fetch(sgptotodUrl);
    const html = await response.text();
    const $ = cheerio.load(html);
    let idCounter = 1;

    const tableData = [];
    const judul = $('.judul').text().trim();

    $('table tbody tr').each((index, element) => {
      const columns = $(element).find('td');
      const rowData = {
        s9: judul,
        id: idCounter++,
        s1: $(columns[0]).text().trim(),
        s2: $(columns[1]).text().trim(),
        s3: $(columns[2]).text().trim(),
        s4: $(columns[3]).text().trim(),
        s5: $(columns[4]).text().trim(),
        s6: $(columns[5]).text().trim(),
        s7: $(columns[6]).text().trim(),
        s8: $(columns[7]).text().trim(),
        
      };
      tableData.push(rowData);
    });

    res.json(tableData);
  } catch (error) {
    console.error('Error fetching SGPTOTO data:', error);
    res.status(500).json({ error: 'Error fetching SGPTOTO data' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
