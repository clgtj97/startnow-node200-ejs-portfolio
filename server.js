const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('views','./views'); // folder to put all our templates

app.set('view engine','ejs'); // setting default engine to be EJS, express auto inputs this 

app.get('/',(req,res) => {
    const data = {
        person: {
            firstN: 'Cesar',
            lastN: 'Leyva'
        }
    }

    res.render('index', data); // output of template by file name & const data 
});

app.get('/contact',(req, res) => { 
    res.render('contact');
 });

 /*
 app.post('https://sheets.googleapis.com/v4/spreadsheets/1ovHnMffenM-DvRdyvCtKbPaMLU9Luxa4KktgRTevVEA/values/'contacts'?valueInputOption=RAW', (req, res, next) => {
    var firstN = document.getElementById('firstName');
    var lastN = document.getElementById('lastName');
    var eMail = document.getElementById('email');

    {
        "range": "contacts",
        "majorDimension": "COLUMNS",
        "values": [
          [null,firstN, null],
          [null,lastN, null],
          [null,eMail, null]
        ]
      }

 });
 
 */

app.post('/thanks', (req, res) => { 
    res.render('thanks',{ contact: req.body });
 });

app.listen(8080, () => {
    console.log('listening at http://localhost:8080');
});
