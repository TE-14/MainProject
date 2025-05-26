//const fetch = require('node-fetch');
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

app.get('/api/grooming-awareness', (req, res) => {
  const queries = {
    knowGrooming: `
      SELECT Know_grooming AS response FROM CSA_Data_Cleaned
    `,
    knowSigns: `
      SELECT Know_signs AS response FROM CSA_Data_Cleaned
    `,
    supportCounseling: `
      SELECT Support_counseling AS response FROM CSA_Data_Cleaned
    `,
    takeLegalAction: `
      SELECT Take_legal_action AS response FROM CSA_Data_Cleaned
    `
  };

  const getProportionYes = (query, callback) => {
    db.query(query, (err, results) => {
      if (err) return callback(err);
      const total = results.length;
      const yesCount = results.filter(r => r.response && r.response.trim().toLowerCase() === 'yes').length;
      const ratio = total ? +(yesCount / total).toFixed(2) : 0;
      callback(null, ratio);
    });
  };

  const responseData = {};
  let completed = 0;
  const totalQueries = Object.keys(queries).length;

  for (const key in queries) {
    getProportionYes(queries[key], (err, ratio) => {
      if (err) return res.status(500).json({ error: err.message });
      responseData[formatKey(key)] = ratio;
      completed++;
      if (completed === totalQueries) {
        res.json(responseData);
      }
    });
  }

  function formatKey(key) {
    switch (key) {
      case 'knowGrooming': return 'Know Grooming';
      case 'knowSigns': return 'Know Signs';
      case 'supportCounseling': return 'Support Counseling';
      case 'takeLegalAction': return 'Take Legal Action';
      default: return key;
    }
  }
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

app.get('/api/grooming-awareness', (req, res) => {
  const queries = {
    knowGrooming: `
      SELECT Know_grooming AS response FROM CSA_Data_Cleaned
    `,
    knowSigns: `
      SELECT Know_signs AS response FROM CSA_Data_Cleaned
    `,
    supportCounseling: `
      SELECT Support_counseling AS response FROM CSA_Data_Cleaned
    `,
    takeLegalAction: `
      SELECT Take_legal_action AS response FROM CSA_Data_Cleaned
    `
  };

  const getProportionYes = (query, callback) => {
    db.query(query, (err, results) => {
      if (err) return callback(err);
      const total = results.length;
      const yesCount = results.filter(r => r.response && r.response.trim().toLowerCase() === 'yes').length;
      const ratio = total ? +(yesCount / total).toFixed(2) : 0;
      callback(null, ratio);
    });
  };

  const responseData = {};
  let completed = 0;
  const totalQueries = Object.keys(queries).length;

  for (const key in queries) {
    getProportionYes(queries[key], (err, ratio) => {
      if (err) return res.status(500).json({ error: err.message });
      responseData[formatKey(key)] = ratio;
      completed++;
      if (completed === totalQueries) {
        res.json(responseData);
      }
    });
  }

  function formatKey(key) {
    switch (key) {
      case 'knowGrooming': return 'Know Grooming';
      case 'knowSigns': return 'Know Signs';
      case 'supportCounseling': return 'Support Counseling';
      case 'takeLegalAction': return 'Take Legal Action';
      default: return key;
    }
  }
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

//  Route: Get all table names
app.get('/api/tables', (req, res) => {
  const sql = 'SHOW TABLES';
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });

    const tableKey = Object.keys(results[0])[0]; // dynamic key like "Tables_in_mainproject"
    const tableNames = results.map(row => row[tableKey]);

    res.json(tableNames);
  });
});

//  Route: Get all data from a specific table
app.get('/api/table/:name', (req, res) => {
  const tableName = req.params.name;

  // Simple validation to avoid SQL injection
  if (!/^[\w]+$/.test(tableName)) {
    return res.status(400).json({ error: 'Invalid table name' });
  }

  const sql = 'SELECT * FROM ??';
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
app.get('/api/news', async (req, res) => {
  try {
    const url = 'https://newsapi.org/v2/everything?' +
      'q=cybersecurity+teenagers+OR+online+safety+OR+grooming&' +
      'language=en&sortBy=relevancy&pageSize=4';

    const apiKey = 'aec3b79e79e8421cb917a227f6360e77';

    const response = await fetch(url, {
      headers: {
        'X-Api-Key': apiKey
      }
    });

    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error('News API error:', err);
    res.status(500).json({ error: 'Failed to fetch news' });
  }
});


app.listen(3001, () => {
  console.log('API server running on http://localhost:3001');
});
