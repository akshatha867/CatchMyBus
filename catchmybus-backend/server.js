const express = require('express');
const db = require('./config/db');

const app = express();

app.get('/', (req, res) => {
  res.send('Backend is working!');
});

app.get('/buses', (req, res) => {
  db.query('SELECT * FROM buses', (err, results) => {
    if (err) {
      res.status(500).send('Error fetching buses');
    } else {
      res.json(results);
    }
  });
});

app.get('/destinations', (req, res) => {
  db.query('SELECT * FROM destinations', (err, results) => {
    if (err) {
      res.status(500).send('Error fetching destinations');
    } else {
      res.json(results);
    }
  });
});

app.get('/schedules', (req, res) => {
  db.query('SELECT * FROM schedules', (err, results) => {
    if (err) {
      res.status(500).send('Error fetching schedules');
    } else {
      res.json(results);
    }
  });
});

app.listen(5000, () => {
  console.log('Server running on port 5000');
});