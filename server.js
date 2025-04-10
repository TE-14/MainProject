const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const app = express();

app.use(cors());

// DB connection
const db = mysql.createConnection({
  host: 'seatdatabase.cy12y2awagfp.us-east-1.rds.amazonaws.com',
  user: 'db_admin',
  password: 'gkA$k8Yme4RG',
  database: 'mainproject'
});

db.connect(err => {
  if (err) throw err;
  console.log('Connected to MySQL');
});

// Example route: Cyberbullying victims by age group
app.get('/api/victims-by-age', (req, res) => {
  const sql = `
    SELECT age_group, COUNT(*) as count
    FROM brack_data 
    WHERE total_cyber_victim > 0
    GROUP BY age_group
  `;
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

app.get('/api/cyberbullying-ratio', (req, res) => {
    const sql = `
      SELECT 
        (SELECT COUNT(*) FROM trolling_data WHERE troll_victim > 0) AS victims,
        (SELECT COUNT(*) FROM trolling_data) AS total
    `;
    db.query(sql, (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
  
      const { victims, total } = results[0];
      const ratio = total > 0 ? victims / total : 0;
  
      res.json({ victims, total, ratio });
    });
  });

// Example route: Victims by gender
app.get('/api/victims-by-gender', (req, res) => {
  const sql = `
    SELECT gender, COUNT(*) as count
    FROM brack_data
    WHERE total_cyber_victim > 0
    GROUP BY gender
  `;
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// ✅ Route: Get all table names
app.get('/api/tables', (req, res) => {
  const sql = `SHOW TABLES`;
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });

    const tableKey = Object.keys(results[0])[0]; // dynamic key like "Tables_in_mainproject"
    const tableNames = results.map(row => row[tableKey]);

    res.json(tableNames);
  });
});

// ✅ Route: Get all data from a specific table
app.get('/api/table/:name', (req, res) => {
  const tableName = req.params.name;

  // Simple validation to avoid SQL injection
  if (!/^[\w]+$/.test(tableName)) {
    return res.status(400).json({ error: 'Invalid table name' });
  }

  const sql = `SELECT * FROM ??`;
  db.query(sql, [tableName], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});


app.get('/api/perpetrators-by-age', (req, res) => {
    const sql = `
      SELECT age, COUNT(*) AS count
      FROM trolling_data
      WHERE troll_perp > 0
      GROUP BY age
      ORDER BY age
    `;
    db.query(sql, (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(results);
    });
});

app.listen(3001, () => {
  console.log('API server running on http://localhost:3001');
});

