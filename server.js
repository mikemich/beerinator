const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

let popularBeers = [
    { name: 'Heineken', votes: 0 },
    { name: 'Amstel', votes: 0 },
    { name: 'Grolsch', votes: 0 },
    { name: 'Hertog Jan', votes: 0 },
    { name: 'Brand', votes: 0 },
    { name: 'La Trappe', votes: 0 },
    { name: 'Bavaria', votes: 0 },
    { name: 'Jupiler', votes: 0 },
    { name: 'Palm', votes: 0 },
    { name: 'De Koninck', votes: 0 }
];

let userSubmittedBeers = [];

app.get('/beers', (req, res) => {
    res.json({ popularBeers, userSubmittedBeers });
});

app.post('/vote', (req, res) => {
    const { name, type } = req.body;
    if (type === 'popular') {
        const beer = popularBeers.find(b => b.name === name);
        if (beer) {
            beer.votes += 1;
        }
    } else if (type === 'user') {
        const beer = userSubmittedBeers.find(b => b.name === name);
        if (beer) {
            beer.votes += 1;
        }
    }
    res.json({ popularBeers, userSubmittedBeers });
});

app.post('/submit', (req, res) => {
    const { name } = req.body;
    if (name && !userSubmittedBeers.find(b => b.name === name)) {
        userSubmittedBeers.push({ name, votes: 0 });
    }
    res.json({ popularBeers, userSubmittedBeers });
});

app.post('/reset', (req, res) => {
    popularBeers.forEach(beer => beer.votes = 0);
    userSubmittedBeers.forEach(beer => beer.votes = 0);
    res.json({ popularBeers, userSubmittedBeers });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});