require('dotenv').config();

const express = require('express');
const { databaseConfig, testConnection, getDemoData, insertDemoData } = require('./database');
const app = express();

// Environment variables
const PORT = process.env.PORT || 3000;
const API_KEY = process.env.API_KEY || 'default-api-key';
const SECRET_MESSAGE = process.env.SECRET_MESSAGE || 'This is a secret!';

// Middleware
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to Env Vars Secrets App!',
    port: PORT,
    apiKey: API_KEY.substring(0, 10) + '...', // Don't expose full API key
    timestamp: new Date().toISOString()
  });
});

app.get('/secret', (req, res) => {
  // Check API key
  const providedKey = req.headers['x-api-key'];
  if (providedKey !== API_KEY) {
    return res.status(401).json({ error: 'Invalid API key' });
  }

  res.json({
    secret: SECRET_MESSAGE,
    accessedAt: new Date().toISOString()
  });
});

app.get('/env-info', (req, res) => {
  res.json({
    nodeEnv: process.env.NODE_ENV || 'development',
    port: PORT,
    hasApiKey: !!API_KEY,
    hasSecretMessage: !!SECRET_MESSAGE,
    database: {
      clusterAddress: databaseConfig.clusterAddress,
      dbUser: databaseConfig.dbUser,
      dbName: databaseConfig.dbName,
      hasDbPassword: !!databaseConfig.dbPassword,
      connectionStringConfigured: !!databaseConfig.connectionString
    }
  });
});

app.get('/db-test', async (req, res) => {
  try {
    const result = await testConnection();
    res.json({
      message: 'Database connection test',
      result: result
    });
  } catch (error) {
    res.status(500).json({
      message: 'Database connection test failed',
      error: error.message
    });
  }
});

app.get('/demo-data', async (req, res) => {
  try {
    const data = await getDemoData();
    res.json({
      message: 'Demo data retrieved',
      count: data.length,
      data: data
    });
  } catch (error) {
    res.status(500).json({
      message: 'Failed to retrieve demo data',
      error: error.message
    });
  }
});

app.post('/demo-data', async (req, res) => {
  try {
    const demoItem = req.body || { name: 'Demo Item', value: Math.random() };
    const result = await insertDemoData(demoItem);
    res.json({
      message: 'Demo data inserted',
      insertedId: result.insertedId
    });
  } catch (error) {
    res.status(500).json({
      message: 'Failed to insert demo data',
      error: error.message
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`API Key configured: ${!!API_KEY}`);
  console.log(`Secret message configured: ${!!SECRET_MESSAGE}`);
  console.log(`Database configured: ${!!databaseConfig.connectionString}`);
});
