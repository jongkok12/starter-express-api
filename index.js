
// const express = require('express');
// const app = express();
// const port = 3000;

// const jsonData = require('./data.json');

// app.get('/data', (req, res) => {
//   res.json(jsonData);
// });

// app.listen(port, () => {
//   console.log(`Aplikasi berjalan di http://localhost:${port}/data`);
// });

// const express = require('express')
// const app = express()

// app.all('/', (req, res) => {
//     console.log("Just got a request!")
//     res.send('Yo!')
// })
// app.listen(process.env.PORT || 3000)

const express = require('express')

const app = express()

app.get('/', (req, res) => {
  fs.readFile('data.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err)
      return res.status(500).send('Internal Server Error')
    }

    res.setHeader('Access-Control-Allow-Origin', '*')
    res.json(JSON.parse(data))
  })
})

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server started on port ${process.env.PORT || 3000}`)
})



const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');

axios.get('https://hongkong.pools.wiki/')
  .then(response => {
    const $ = cheerio.load(response.data);
    const tableRows = $('table tr');
    const tableData = [];

    tableRows.each((i, row) => {
      const rowData = [];
      $(row).find('td').each((j, cell) => {
        rowData.push($(cell).text().trim());
      });
      if (rowData.length > 0) {
        tableData.push(rowData);
      }
    });

    const headers = tableData.shift();
    const jsonData = tableData.map(row => {
      const obj = {};
      row.forEach((cell, i) => {
        obj[headers[i]] = cell;
      });
      return obj;
    });

    const jsonString = JSON.stringify(jsonData);
    fs.writeFile('data.json', jsonString, 'utf8', err => {
      if (err) {
        console.log(err);
      } else {
        console.log('Data saved to data.json');
      }
    });
  })
  .catch(error => {
    console.log(error);
  });
