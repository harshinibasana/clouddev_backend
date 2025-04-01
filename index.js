const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// MySQL connection config
// triggering azure deployment


const db = mysql.createConnection({ 
   host: 'cloudclass-ci-cd.mysql.database.azure.com',  
   user: 'mysql_admin', 
    password: 'Happie@111',  
    database: 'studentdb'
  });

db.connect(err => {
  if (err) throw err;
  console.log('Connected to MySQL database');
});

app.get('/api/students', (req, res) => {
  db.query('SELECT * FROM students', (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});

const PORT = process.env.PORT || 3306;
app.listen(PORT, () => console.log(`Backend running on http://localhost:${PORT}`));
