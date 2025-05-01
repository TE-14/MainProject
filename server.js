const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const helmet = require('helmet');
const fetch = require('node-fetch');
require('dotenv').config();

const app = express();

// === AWS-FRIENDLY CORS Configuration ===
const allowedOrigins = process.env.ALLOWED_ORIGINS.split(',');
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('CORS not allowed for this origin'));
    }
  },
  credentials: true
}));

// === Helmet for Security Headers ===
app.use(helmet());
app.use(helmet.contentSecurityPolicy({
  directives: {
    defaultSrc: ["'self'"],
    scriptSrc: ["'self'"],
    styleSrc: ["'self'", "'unsafe-inline'"],
    imgSrc: ["'self'", "data:"],
    connectSrc: ["'self'", "https://newsapi.org"]
  }
}));

// === MySQL Database Connection ===
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
});

db.connect(err => {
  if (err) throw err;
  console.log('✅ Connected to MySQL');
});

// === API Routes ===

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
    res.json({ victims, total, ratio: total > 0 ? victims / total : 0 });
  });
});

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

app.get('/api/tables', (req, res) => {
  const sql = 'SHOW TABLES';
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    const key = Object.keys(results[0])[0];
    res.json(results.map(row => row[key]));
  });
});

app.get('/api/table/:name', (req, res) => {
  const tableName = req.params.name;
  if (!/^[\w]+$/.test(tableName)) {
    return res.status(400).json({ error: 'Invalid table name' });
  }
  const sql = 'SELECT * FROM ??';
  db.query(sql, [tableName], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

app.get('/api/news', async (req, res) => {
  try {
    const url = 'https://newsapi.org/v2/everything?q=cybersecurity+teenagers+OR+online+safety+OR+grooming&language=en&sortBy=relevancy&pageSize=4';
    const response = await fetch(url, {
      headers: { 'X-Api-Key': process.env.NEWS_API_KEY }
    });
    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error('News API error:', err);
    res.status(500).json({ error: 'Failed to fetch news' });
  }
});

// === Start Server ===
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
