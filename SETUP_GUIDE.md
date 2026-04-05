# Quick Issues - Setup Guide

## BACKEND SETUP

### Step 1: Navigate to Backend Folder
```bash
cd backend
```

### Step 2: Initialize Node.js Project
```bash
npm init -y
```
**What this does:** Creates a `package.json` file that tracks your project's dependencies.

### Step 3: Install Required Packages
```bash
npm install express mongoose cors dotenv
npm install --save-dev nodemon
```

**What each package does:**
- **express** - Makes building APIs super easy (handles routing, requests, responses)
- **mongoose** - Helps us talk to MongoDB in a simple way
- **cors** - Allows your frontend (running on port 3000) to talk to backend (port 5000)
- **dotenv** - Loads environment variables from .env file (keeps secrets safe)
- **nodemon** - Auto-restarts server when you change code (developer convenience)

### Step 4: Setup MongoDB Atlas (FREE Cloud Database)

1. Go to https://www.mongodb.com/cloud/atlas
2. Sign up for a FREE account
3. Create a new cluster (choose FREE tier)
4. Click "Connect" → "Connect your application"
5. Copy the connection string (looks like: `mongodb+srv://username:password@cluster.mongodb.net/`)
6. Replace `<password>` with your actual password
7. Add `/quick-issues` at the end before `?`

**Example:**
```
mongodb+srv://myuser:mypass123@cluster0.abc123.mongodb.net/quick-issues?retryWrites=true&w=majority
```

---

## FRONTEND SETUP (We'll do this later)

### Step 1: Create React App
```bash
cd frontend
npx create-react-app .
```

### Step 2: Install Axios
```bash
npm install axios
```

---

## TESTING WITH POSTMAN

1. Download Postman: https://www.postman.com/downloads/
2. We'll use it to test our API before building the frontend
3. I'll show you exact examples after we build the backend

---

## RUNNING THE PROJECT

### Run Backend:
```bash
cd backend
npm run dev
```
Should see: "Server running on port 5000" and "MongoDB connected"

### Run Frontend (in a separate terminal):
```bash
cd frontend
npm start
```
Should open browser at http://localhost:3000
