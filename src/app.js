/**
 * Simple Express + MySQL (mysql2/promise) starter
 */
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const mysql = require('mysql2/promise');
const path = require('path'); // <-- Tambahin ini di bagian import

const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

// ⬇️ Tambahin bagian ini sebelum route API (di bawah middleware)
app.use(express.static(path.join(__dirname, '..', 'public')));

// (opsional) route /ui biar gampang akses langsung
app.get('/ui', (_req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

// Read env vars (with sensible defaults)
const PORT = process.env.PORT || 3000;
const DB_HOST = process.env.DB_HOST || 'localhost';
const DB_PORT = Number(process.env.DB_PORT || 3306);
const DB_USER = process.env.DB_USER || 'root';
const DB_PASSWORD = process.env.DB_PASSWORD || '';
const DB_NAME = process.env.DB_NAME || 'mahasiswa';

let pool;

// Create a MySQL connection pool
async function initDb() {
  pool = mysql.createPool({
    host: DB_HOST,
    port: DB_PORT,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  });
  // Quick ping
  const conn = await pool.getConnection();
  await conn.ping();
  conn.release();
  console.log('✅ Connected to MySQL:', DB_HOST, `db=${DB_NAME}`);
}

// Root endpoint
app.get('/', (_req, res) => {
  res.json({
    status: 'ok',
    service: '122_ConnectionDb',
    endpoints: ['/api/biodata'],
  });
});

// GET all biodata
app.get('/api/biodata', async (_req, res) => {
  try {
    const [rows] = await pool.query('SELECT id, nama, nim, kelas FROM biodata ORDER BY id ASC');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET one by id (bonus)
app.get('/api/biodata/:id', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT id, nama, nim, kelas FROM biodata WHERE id = ?', [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ error: 'Not found' });
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Start server after DB init
initDb()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Server ready on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ Failed to initialize DB connection. Check your .env config.', err);
    process.exit(1);
  });
