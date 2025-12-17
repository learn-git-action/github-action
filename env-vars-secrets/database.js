require('dotenv').config();
const { MongoClient } = require('mongodb');

// Database configuration using environment variables
const databaseConfig = {
  clusterAddress: process.env.CLUSTER_ADDRESS,
  dbUser: process.env.DB_USER,
  dbPassword: process.env.DB_PASSWORD,
  dbName: process.env.DB_NAME,
  connectionString: process.env.CLUSTER_ADDRESS
    ? `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.CLUSTER_ADDRESS.replace('mongodb+srv://', '')}/${process.env.DB_NAME}?retryWrites=true&w=majority`
    : null
};

// Validate required database environment variables
const requiredVars = ['CLUSTER_ADDRESS', 'DB_USER', 'DB_PASSWORD', 'DB_NAME'];
const missingVars = requiredVars.filter(varName => !process.env[varName]);

if (missingVars.length > 0) {
  console.warn(`Warning: Missing database environment variables: ${missingVars.join(', ')}`);
  console.warn('Database functionality will be limited');
}

// MongoDB connection
let client = null;
let db = null;

async function connectToDatabase() {
  if (!databaseConfig.connectionString) {
    throw new Error('Database connection string not configured');
  }

  try {
    client = new MongoClient(databaseConfig.connectionString);
    await client.connect();
    db = client.db(databaseConfig.dbName);
    console.log('Connected to MongoDB successfully');
    return { client, db };
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error.message);
    throw error;
  }
}

async function disconnectFromDatabase() {
  if (client) {
    await client.close();
    console.log('Disconnected from MongoDB');
  }
}

// Demo functions
async function getDemoData() {
  try {
    if (!db) await connectToDatabase();

    const collection = db.collection('demo');
    const data = await collection.find({}).limit(5).toArray();
    return data;
  } catch (error) {
    console.error('Error fetching demo data:', error.message);
    return [];
  }
}

async function insertDemoData(item) {
  try {
    if (!db) await connectToDatabase();

    const collection = db.collection('demo');
    const result = await collection.insertOne({
      ...item,
      createdAt: new Date(),
      demo: true
    });
    return result;
  } catch (error) {
    console.error('Error inserting demo data:', error.message);
    throw error;
  }
}

async function testConnection() {
  try {
    if (!db) await connectToDatabase();
    await db.admin().ping();
    return { status: 'connected', database: databaseConfig.dbName };
  } catch (error) {
    return { status: 'error', message: error.message };
  }
}

module.exports = {
  databaseConfig,
  connectToDatabase,
  disconnectFromDatabase,
  getDemoData,
  insertDemoData,
  testConnection
};