const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');
const url = require('url');
const app = express();

'use strict';

const fs = require('fs');

let rawdata = fs.readFileSync('./src/assets/countries.json');
let countries = JSON.parse(rawdata);

let searchData = fs.readFileSync('./src/assets/searchResults.json');
let search = JSON.parse(searchData);
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'build')));

app.get('/api/country', function(req, res) {
    return res.send(countries);
});


app.get('/api/search', function(req, res) {
    const q = url.parse(req.url, true).query;
    const txt = q.value;
    const country = q.country;
    if (txt && country) {
        const filteredData = search.filter(function(item) {
            return item.name.indexOf(txt) > -1 && country.indexOf(item.country) > -1;
        });
        return res.send(filteredData);
    } else
        return res.send([]);

});

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(process.env.PORT || 8080);