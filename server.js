const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
var request = require("request");

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
    addEmailChimp(req.body.firstName, req.body.lastName, req.body.email);
    console.log({ firstName :  req.body.firstName }, { lastName: req.body.lastName }, { email: req.body.email });
 });


 function addEmailChimp(firstName, lastName, email) {

    var options = { method: 'POST',
      url: 'https://us19.api.mailchimp.com/3.0/lists/801bc7eca7/members',
      headers: 
       { 'Postman-Token': '7314d42d-0ca6-4e42-999a-532a091c1322',
         'Cache-Control': 'no-cache',
         Authorization: 'Basic YW55c3RyaW5nOjg3NDM1YWQ4MGY2NWU1NWIyOTMyYTliOWY1NjdlMDgyLXVzMTk=',
         'Content-Type': 'application/json' },
      body: 
       { email_address: email,
         status: 'subscribed',
         merge_fields: { FNAME: firstName, LNAME: lastName } },
      json: true };
    
    request(options, function (error, response, body) {
      if (error) throw new Error(error);
    
      console.log(body);
    });
    
 }


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Our app is running on port ${ PORT }`);
});



   
/*
curl --request GET \
--url 'https://us19.api.mailchimp.com/3.0/' \
--user 'anystring:87435ad80f65e55b2932a9b9f567e082-us19'
*/
