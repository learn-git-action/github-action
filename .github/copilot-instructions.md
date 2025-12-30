# GitHub Actions Learning Repository - AI Coding Guidelines

## Overview
This repository contains example projects for learning GitHub Actions CI/CD workflows. It includes multiple independent Node.js applications demonstrating different deployment scenarios: Docker containerization, environment variable management with secrets, and React frontend with Express backend.

## Project Structure
- **docker-project/**: Simple Express.js app containerized with Docker
- **env-vars-secrets/**: Express app with MongoDB integration, demonstrating secure environment variable handling
- **nodejs-workflow/**: React frontend with Express server, showing full-stack Node.js deployment
- **.github/workflows/**: GitHub Actions workflows for repository checkout examples

## Key Patterns & Conventions

### Environment Variables
- Use `dotenv` for loading `.env` files (never commit `.env` to git)
- Mask sensitive values in API responses (e.g., `API_KEY.substring(0, 10) + '...'`)
- Provide `.env.example` templates with dummy values for demos
- Required vars: `PORT`, `API_KEY`, `CLUSTER_ADDRESS`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`

### Database Integration
- MongoDB Atlas connection string format: `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${CLUSTER_ADDRESS}/${DB_NAME}?retryWrites=true&w=majority`
- Graceful degradation: apps run without real DB but show connection errors
- Demo collection operations in `database.js` modules

### Docker Deployment
- Multi-stage builds not used; simple single-stage for learning
- Expose port 3000, map to host port 3000
- Base image: standard Node.js Alpine

### React Apps
- Use Create React App structure with `src/` directory
- Express server serves static files from `public/` alongside API routes
- Standard React hooks and state management

### GitHub Actions
- Workflows demonstrate repository checkout patterns
- Use `actions/checkout@v6` with different configurations
- PAT tokens for private repos, no tokens for public repos

## Development Workflow
- Each project is independent: `cd` into directory, run `npm install`, then `npm start`
- Docker projects: `docker build -t <name> . && docker run -p 3000:3000 <name>`
- React apps: `npm start` for dev server, `npm run build` for production
- Test endpoints with curl or browser after starting servers

## Code Examples
- Environment masking: `res.json({ apiKey: API_KEY.substring(0, 10) + '...' })`
- DB connection test: `await db.admin().ping()` returns connection status
- Docker CMD: `CMD ["npm", "start"]` (not `node index.js` directly)</content>
<parameter name="filePath">c:\Users\Pranav\github-action\.github\copilot-instructions.md