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
            firstN: "Cesar",
            lastN: "Leyva"
        }
    }

    res.render('index', data); // output of template by file name & const data 
});

app.get('/contact',(req, res) => { 
    res.render('contact');
 });

app.post('/thanks', (req, res) => { 
    res.render('thanks',{ contact: req.body });
    console.log({ contact: req.body });
 });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Our app is running on port ${ PORT }`);
});



   
