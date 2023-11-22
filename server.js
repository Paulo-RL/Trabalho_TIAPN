const express = require('express');
const mysql = require('mysql');

const app = express();
const port = 4000;

// Create MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'Paulo',
  password: 'Pogo44==',
  database: 'BibliotecaOtaku',
});

// Connect to MySQL
db.connect((err) => {
  if (err) {
    console.error('MySQL connection error:', err);
  } else {
    console.log('Connected to MySQL database');
  }
});

// Define routes
app.get('/api/products', (req, res) => {
  // Example query to fetch products from the database
  const query = 'SELECT * FROM Produtos';
  db.query(query, (error, results) => {
    if (error) {
      console.error('MySQL query error:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.json(results);
    }
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
