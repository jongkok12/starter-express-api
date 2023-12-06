
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
/////////////////////////////////////////////////////
// const express = require('express')

// const app = express()

// app.get('/', (req, res) => {
//   fs.readFile('data.json', 'utf8', (err, data) => {
//     if (err) {
//       console.error(err)
//       return res.status(500).send('Internal Server Error')
//     }

//     res.setHeader('Access-Control-Allow-Origin', '*')
//     res.json(JSON.parse(data))
//   })
// })

// app.listen(process.env.PORT || 3000, () => {
//   console.log(`Server started on port ${process.env.PORT || 3000}`)
// })



// const axios = require('axios');
// const cheerio = require('cheerio');
// const fs = require('fs');

// axios.get('https://hongkong.pools.wiki/')
//   .then(response => {
//     const $ = cheerio.load(response.data);
//     const tableRows = $('table tr');
//     const tableData = [];

//     tableRows.each((i, row) => {
//       const rowData = [];
//       $(row).find('td').each((j, cell) => {
//         rowData.push($(cell).text().trim());
//       });
//       if (rowData.length > 0) {
//         tableData.push(rowData);
//       }
//     });

//     const headers = tableData.shift();
//     const jsonData = tableData.map(row => {
//       const obj = {};
//       row.forEach((cell, i) => {
//         obj[headers[i]] = cell;
//       });
//       return obj;
//     });

//     const jsonString = JSON.stringify(jsonData);
//     fs.writeFile('data.json', jsonString, 'utf8', err => {
//       if (err) {
//         console.log(err);
//       } else {
//         console.log('Data saved to data.json');
//       }
//     });
//   })
//   .catch(error => {
//     console.log(error);
//   });


const express = require('express')

const app = express()






const cheerio = require('cheerio');



const port = 3000;


const url = 'https://w3.angkanet.zone/wp-content/plugins/togelmania/datalive/datalivehk.php';


// const url = 'https://w3.angkanet.zone/wp-content/plugins/togelmania/datalive/sd.php';




app.get('/', async (req, res) => {

  try {

    // Menggunakan dynamic import untuk mengimpor 'node-fetch'

    const { default: fetch } = await import('node-fetch');


    const response = await fetch(url);

    const html = await response.text();


    // Menggunakan cheerio untuk mem-parsing HTML

    const $ = cheerio.load(html);


    // Mengekstrak data dari tabel

    const tableData = [];

    $('table tbody tr').each((index, element) => {

      const columns = $(element).find('td');

      const rowData = {

        name: $(columns[0]).text().trim(),

        number: $(columns[1]).text().trim()

      };

      tableData.push(rowData);

    });


    // Kirim data tabel sebagai JSON

    res.json(tableData);

  } catch (error) {

    console.error('Error fetching data:', error);

    res.status(500).json({ error: 'Error fetching data' });

  }

});


app.listen(port, () => {

  console.log(`Server is running on port ${port}`);

});

