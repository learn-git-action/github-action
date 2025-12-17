# Env Vars Secrets

A Node.js Express application that demonstrates the use of environment variables for configuration, including API keys and database credentials.

## Quick Start with Dummy Data

1. Install dependencies:
   ```bash
   npm install
   ```

2. The `.env` file already contains dummy values that work for demonstration. No changes needed!

3. Start the server:
   ```bash
   npm start
   ```

4. Test the endpoints:
   - `GET http://localhost:3000/` - Basic info
   - `GET http://localhost:3000/env-info` - Environment status
   - `GET http://localhost:3000/db-status` - Database config
   - `GET http://localhost:3000/db-test` - Test DB connection
   - `GET http://localhost:3000/demo-data` - Get demo data
   - `POST http://localhost:3000/demo-data` - Add demo data

## API Endpoints

- `GET /` - Welcome message with basic info
- `GET /secret` - Access secret message (requires API key in header: `x-api-key`)
- `GET /env-info` - Show environment configuration status
- `GET /db-status` - Show database configuration details
- `GET /db-test` - Test actual database connection
- `GET /demo-data` - Retrieve demo data from database
- `POST /demo-data` - Insert demo data into database

## Project Structure

- `server.js` - Main Express server application
- `database.js` - Database configuration module
- `.env` - Environment variables (not committed to git)
- `.env.example` - Environment variables template

## Environment Variables

The app uses the following environment variables (dummy values are already configured):

- `PORT` - Server port (default: 3000)
- `API_KEY` - Your API key for authentication
- `SECRET_MESSAGE` - A secret message
- `NODE_ENV` - Environment mode
- `CLUSTER_ADDRESS` - Database cluster address (dummy: mongodb+srv://cluster0.example.mongodb.net)
- `DB_USER` - Database username (dummy: myDatabaseUser)
- `DB_PASSWORD` - Database password (dummy: mySecurePassword123)
- `DB_NAME` - Database name (dummy: myDatabase)

**Note:** The dummy database values are for demonstration only. For production, replace with real MongoDB Atlas credentials.

## MongoDB Setup (Optional)

To make the database endpoints fully functional:

1. Create a free MongoDB Atlas account at https://www.mongodb.com/atlas
2. Create a cluster and database
3. Create a database user
4. Get your connection string
5. Update the `.env` file with real values

The app will still run without a real database - it will show connection errors but won't crash.

## Security Notes

- Never commit `.env` files to version control
- Use strong, unique passwords for database credentials
- The app masks sensitive information in API responses