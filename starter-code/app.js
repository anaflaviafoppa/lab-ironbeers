const express = require('express');
const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// add the partials here:
hbs.registerPartials(path.join(__dirname, 'views/partials'));

// add the routes here:
app.get('/', (req, res) => res.render('index'));

app.get('/beers', (request, response) => {
  const strongBeers = punkAPI.getBeers();

  strongBeers
    .then(beersFromApi => {
      //console.log('Beers from the database: ', beersFromApi);
      response.render('beers',{beersFromApi});
    })
    .catch(error => console.log(error));
});

app.get('/random-beers', (request, response) => {
  const randomBeers = punkAPI.getRandom();

  randomBeers
    .then(responseFromAPI => {
      // your magic happens here
      data = {
        singleBeer:responseFromAPI[0]
      }

      response.render('random-beers',data);
    })
    .catch(error => console.log(error));




  //response.render('random-beers');
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));
