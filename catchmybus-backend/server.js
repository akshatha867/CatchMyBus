const express = require('express');
const cors=require('cors');
const db = require('./config/db');

const app = express();

app.use(cors());

app.get('/', (req, res) => {
  res.send('Backend is working great!');
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
app.get('/search', (req, res) => {
  const destination = req.query.destination;

  const sql = `
    SELECT buses.bus_name, destinations.destination_name, schedules.departure_time
    FROM schedules
    JOIN buses ON schedules.bus_id = buses.id
    JOIN destinations ON schedules.destination_id = destinations.id
    WHERE destinations.destination_name LIKE ?
    AND schedules.departure_time > CURTIME()
    ORDER BY schedules.departure_time ASC
  `;
  const values = [`%${destination}%`];

  db.query(sql, values, (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).send('Error searching buses');
    } else {
      res.json(results);
    }
  });
});



app.listen(5000, () => {
  console.log('Server running on port 5000');
});