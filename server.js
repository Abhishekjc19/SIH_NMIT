const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const { getConnection } = require('./src/lib/oracledb');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Signup route
app.post('/api/signup', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password required' });
  }
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const connection = await getConnection();
    const result = await connection.execute(
      `INSERT INTO users (username, password) VALUES (:username, :password)`,
      { username, password: hashedPassword },
      { autoCommit: true }
    );
    await connection.close();
    res.status(201).json({ message: 'User created successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Login route
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password required' });
  }
  try {
    const connection = await getConnection();
    const result = await connection.execute(
      `SELECT password FROM users WHERE username = :username`,
      { username }
    );
    await connection.close();
    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }
    const hashedPassword = result.rows[0][0];
    const match = await bcrypt.compare(password, hashedPassword);
    if (!match) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }
    res.status(200).json({ message: 'Login successful' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
