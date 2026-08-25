const express = require('express');
const cors=require('cors');
const db = require('./config/db');

const app = express();

app.use(cors());
app.use(express.json());

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

const bcrypt = require('bcrypt');

app.post('/admin/register', async (req, res) => {
  const { username, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const sql = 'INSERT INTO admins (username, password_hash) VALUES (?, ?)';
    db.query(sql, [username, hashedPassword], (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send('Error creating admin');
      } else {
        res.json({ message: 'Admin created successfully' });
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).send('Error hashing password');
  }
});

const jwt = require('jsonwebtoken');

app.post('/admin/login', (req, res) => {
  const { username, password } = req.body;

  const sql = 'SELECT * FROM admins WHERE username = ?';
  db.query(sql, [username], async (err, results) => {
    if (err) {
      console.log(err);
      return res.status(500).send('Error logging in');
    }

    if (results.length === 0) {
      return res.status(401).send('Invalid username or password');
    }

    const admin = results[0];
    const passwordMatches = await bcrypt.compare(password, admin.password_hash);

    if (!passwordMatches) {
      return res.status(401).send('Invalid username or password');
    }

    const token = jwt.sign(
      { id: admin.id, username: admin.username },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({ message: 'Login successful', token });
  });
});



app.listen(5000, () => {
  console.log('Server running on port 5000');
});