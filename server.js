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


var script_url = "https://script.google.com/macros/s/AKfycbxHGkgrw3H0ZHUNU3Kiaaq145aHeuotPOV8Zf5WoZk0LzY4ub8/exec";


function insert_value() {                            
    var id1 = $("#id").val();
    var name = $("#name").val();
    var email = $("#email").val();
    var city = $("#city option:selected").val();
    var url = script_url + "?callback=ctrlq&name=" + name + "&id=" + id1 + "&email=" + email + "&city=" + city + "&action=insert";
    var request = jQuery.ajax({
        crossDomain: true,
        url: url,
        method: "GET",
        dataType: "jsonp"
    });
    $("#resetForm").reset();
}
function ctrlq(e) {
    alert('Congrats! Registered Successfully');
}

app.post('/thanks', (req, res) => { 
    res.render('thanks',{ contact: req.body });
 });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Our app is running on port ${ PORT }`);
});
