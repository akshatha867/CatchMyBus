const express = require('express');
const cors=require('cors');
const db = require('./config/db');
const verifyToken=require('./middleware/auth');

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

app.get('/admin/dashboard', verifyToken, (req, res) => {
  res.json({ message: 'Welcome to the admin dashboard!', admin: req.admin });
});


// Adding bus by admin
app.post('/admin/buses', verifyToken, (req, res) => {
  const { bus_name, service_type, destination_id, departure_time } = req.body;

  const busSql = 'INSERT INTO buses (bus_name, service_type) VALUES (?, ?)';
  db.query(busSql, [bus_name, service_type], (err, busResult) => {
    if (err) {
      console.log(err);
      return res.status(500).send('Error adding bus');
    }

    const newBusId = busResult.insertId;

    const scheduleSql = 'INSERT INTO schedules (bus_id, destination_id, departure_time) VALUES (?, ?, ?)';
    db.query(scheduleSql, [newBusId, destination_id, departure_time], (err, scheduleResult) => {
      if (err) {
        console.log(err);
        return res.status(500).send('Error adding schedule');
      }

      res.json({ message: 'Bus and schedule added successfully', busId: newBusId });
    });
  });
});

// delete bus by admin
app.delete('/admin/buses/:id', verifyToken, (req, res) => {
  const busId = req.params.id;

  // First delete all schedules linked to this bus
  const deleteSchedulesSql = 'DELETE FROM schedules WHERE bus_id = ?';
  db.query(deleteSchedulesSql, [busId], (err) => {
    if (err) {
      console.log(err);
      return res.status(500).send('Error deleting schedules');
    }

    // Now delete the bus itself
    const deleteBusSql = 'DELETE FROM buses WHERE id = ?';
    db.query(deleteBusSql, [busId], (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).send('Error deleting bus');
      }

      if (result.affectedRows === 0) {
        return res.status(404).send('Bus not found');
      }

      res.json({ message: 'Bus and its schedules deleted successfully' });
    });
  });
});

// edit bus by admin
app.put('/admin/buses/:id', verifyToken, (req, res) => {
  const busId = req.params.id;
  const { bus_name, service_type, schedule_id, destination_id, departure_time } = req.body;

  const updateBusSql = 'UPDATE buses SET bus_name = ?, service_type = ? WHERE id = ?';
  db.query(updateBusSql, [bus_name, service_type, busId], (err, busResult) => {
    if (err) {
      console.log(err);
      return res.status(500).send('Error updating bus');
    }

    if (busResult.affectedRows === 0) {
      return res.status(404).send('Bus not found');
    }

    const updateScheduleSql = 'UPDATE schedules SET destination_id = ?, departure_time = ? WHERE id = ? AND bus_id = ?';
    db.query(updateScheduleSql, [destination_id, departure_time, schedule_id, busId], (err, scheduleResult) => {
      if (err) {
        console.log(err);
        return res.status(500).send('Error updating schedule');
      }

      res.json({ message: 'Bus and schedule updated successfully' });
    });
  });
});

app.listen(5000, () => {
  console.log('Server running on port 5000');
});