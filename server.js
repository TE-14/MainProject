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
app.get('/api/top-words', (req, res) => {
  const sql = 'SELECT `word`, `count` FROM `top_200_words` ORDER BY `count` DESC LIMIT 200';
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

app.get('/api/toxic-words', (req, res) => {
  const sql = 'SELECT `original_word`, `normalized_word`, `toxicity` FROM `toxic_words_filtered` ORDER BY `toxicity` DESC';
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

app.get('/api/emoji-risk-data', (req, res) => {
  const sql = `
    SELECT
      \`Emoji\`,
      \`Unicode codepoint_x\`,
      \`Sentiment_Occurrences\`,
      \`Negative\`,
      \`Neutral\`,
      \`Positive\`,
      \`Tracker_Occurrences\`,
      \`RiskScore\`,
      \`RiskLevel\`
    FROM \`processed_emoji_data\`
    ORDER BY \`RiskScore\` DESC
  `;
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

app.get('/api/emoji-risk/:level', (req, res) => {
  const level = req.params.level;
  const sql = 'SELECT * FROM `processed_emoji_data` WHERE `RiskLevel` = ?';
  db.query(sql, [level], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});


app.get('/api/emoji-risk-stream', (req, res) => {
  const sql = `SELECT Emoji, RiskScore FROM processed_emoji_data WHERE RiskScore IS NOT NULL`;

  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err });

    const categorized = results.map(row => {
      let level = 'safe';
      if (row.RiskScore > 0.3) level = 'risky';
      else if (row.RiskScore > 0.1) level = 'moderate';
      return { emoji: row.Emoji, risk: row.RiskScore, level };
    });

    // Simulate time
    const slices = ['early', 'middle', 'late'];
    const chunkSize = Math.ceil(categorized.length / 3);
    const streamData = {};
    slices.forEach((slice, i) => {
      streamData[slice] = { safe: 0, moderate: 0, risky: 0 };
      const chunk = categorized.slice(i * chunkSize, (i + 1) * chunkSize);
      chunk.forEach(entry => streamData[slice][entry.level]++);
    });

    const chartData = Object.entries(streamData).map(([time_slice, counts]) => ({
      time_slice,
      ...counts
    }));
    function isFaceEmoji(emoji) {
      const codePoint = emoji.codePointAt(0)
      return codePoint >= 0x1F600 && codePoint <= 0x1F64F
    }
    // Top 10 per category
    const topEmojis = {
      safe: categorized
        .filter(e => e.level === 'safe' && isFaceEmoji(e.emoji))
        .sort((a, b) => b.risk - a.risk)
        .slice(0, 10),

      moderate: categorized
        .filter(e => e.level === 'moderate' && isFaceEmoji(e.emoji))
        .sort((a, b) => b.risk - a.risk)
        .slice(0, 10),

      risky: categorized
        .filter(e => e.level === 'risky' && isFaceEmoji(e.emoji))
        .sort((a, b) => b.risk - a.risk)
        .slice(0, 10)
    };

    res.json({
      data: chartData,
      keys: ['safe', 'moderate', 'risky'],
      emojis: {
        safe: topEmojis.safe.map(e => e.emoji),
        moderate: topEmojis.moderate.map(e => e.emoji),
        risky: topEmojis.risky.map(e => e.emoji)
      },
      topEmojiDetails: topEmojis
    });
  });
});

app.get('/api/impulsive-cyberbullying-stats', (req, res) => {
  const sql = `
    SELECT 
      gender,
      ROUND(100.0 * SUM(CASE WHEN cyberbully_presence = 'yes' THEN 1 ELSE 0 END) / COUNT(*)) AS percent_cyberbullied
    FROM 
      brack_data
    WHERE 
      total_impulsivity >= 70
    GROUP BY 
      gender;
  `
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err })
    const data = {
      malePercent: 0,
      femalePercent: 0
    }
    results.forEach(row => {
      if (row.gender.toLowerCase() === 'male') data.malePercent = row.percent_cyberbullied
      else if (row.gender.toLowerCase() === 'female') data.femalePercent = row.percent_cyberbullied
    })
    res.json(data)
  })
});

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
