# Debugging Guide - Common Beginner Errors

## ❌ ERROR #1: MongoDB Not Connecting

### Symptoms:
```
❌ MongoDB connection failed: MongoServerError
```

### Causes & Fixes:

#### Fix 1: Wrong Connection String
**Problem:** Your `.env` file has incorrect MongoDB URI

**Check:**
```env
# ❌ WRONG
MONGODB_URI=mongodb+srv://username:<password>@cluster.mongodb.net/

# ✅ CORRECT
MONGODB_URI=mongodb+srv://username:actualPassword123@cluster0.abcde.mongodb.net/quick-issues?retryWrites=true&w=majority
```

**Common mistakes:**
- Forgot to replace `<password>` with actual password
- Password contains special characters (@ # $ %) → must URL encode them
- Missing database name (`/quick-issues`)
- Copied wrong connection string from MongoDB Atlas

#### Fix 2: IP Address Not Whitelisted
1. Go to MongoDB Atlas
2. Click "Network Access" in left sidebar
3. Click "Add IP Address"
4. Click "Allow Access from Anywhere" (for development only!)
5. Wait 2-3 minutes for changes to apply

#### Fix 3: Wrong Username/Password
1. Go to MongoDB Atlas → Database Access
2. Check your username
3. Reset password if needed
4. Update `.env` file with new password

---

## ❌ ERROR #2: CORS Error

### Symptoms:
```
Access to XMLHttpRequest at 'http://localhost:5000/api/issues' 
from origin 'http://localhost:3000' has been blocked by CORS policy
```

### What is CORS?
Browser security feature that blocks requests between different origins (ports).

### Causes & Fixes:

#### Fix 1: CORS Not Installed
```powershell
cd backend
npm install cors
```

#### Fix 2: CORS Not Used in server.js
Check `backend/server.js`:
```javascript
const cors = require('cors');
app.use(cors()); // This line must be BEFORE routes!
```

#### Fix 3: Wrong Order of Middleware
**❌ WRONG:**
```javascript
app.use('/api/issues', issueRoutes);
app.use(cors()); // Too late!
```

**✅ CORRECT:**
```javascript
app.use(cors());
app.use(express.json());
app.use('/api/issues', issueRoutes); // After middleware
```

---

## ❌ ERROR #3: Port Already in Use

### Symptoms:
```
Error: listen EADDRINUSE: address already in use :::5000
```

### Causes & Fixes:

#### Fix 1: Backend Already Running
**You accidentally started the backend twice!**

**Solution:**
1. Close the extra terminal
2. Or press `Ctrl + C` in one terminal

#### Fix 2: Another App Using Port 5000
**Find what's using the port:**
```powershell
netstat -ano | findstr :5000
```

**Kill the process:**
```powershell
taskkill /PID <PID_NUMBER> /F
```

**Or change port in `.env`:**
```env
PORT=5001
```
Don't forget to update frontend's API_URL to match!

---

## ❌ ERROR #4: req.body is undefined

### Symptoms:
Backend logs show:
```javascript
console.log(req.body); // undefined
```

Or you get error:
```
Please add a title
```

### Causes & Fixes:

#### Fix 1: Missing Body Parser Middleware
Check `backend/server.js`:
```javascript
app.use(express.json()); // Must have this!
app.use(express.urlencoded({ extended: true }));
```

#### Fix 2: Forgot to Send JSON from Frontend
Check Postman or `issueService.js`:

**❌ WRONG (Postman):**
- Forgot to select "raw" and "JSON" in Body tab

**✅ CORRECT (Postman):**
- Body → raw → JSON → paste JSON data

**❌ WRONG (Frontend):**
```javascript
axios.post(API_URL); // No data sent!
```

**✅ CORRECT (Frontend):**
```javascript
axios.post(API_URL, { title, description }); // Data included
```

#### Fix 3: Middleware Order
Middleware must be BEFORE routes:
```javascript
app.use(cors());
app.use(express.json()); // BEFORE routes!
app.use('/api/issues', issueRoutes);
```

---

## ❌ ERROR #5: Cannot Find Module

### Symptoms:
```
Error: Cannot find module 'express'
Error: Cannot find module './models/Issue'
```

### Causes & Fixes:

#### Fix 1: Didn't Run npm install
```powershell
cd backend
npm install
```

#### Fix 2: Wrong Path in require()
**❌ WRONG:**
```javascript
const Issue = require('./Issue'); // File is in models/ folder!
```

**✅ CORRECT:**
```javascript
const Issue = require('./models/Issue');
```

**TIP:** Use VS Code autocomplete when typing paths!

#### Fix 3: Wrong Directory
Make sure you're in the correct folder:
```powershell
# Check where you are
pwd

# Should be in backend/
cd backend
```

---

## 🔍 BONUS: Debugging Tips

### 1. Use console.log() Everywhere!
```javascript
// Backend (controllers)
console.log('Request body:', req.body);
console.log('Found issue:', issue);

// Frontend (components)
console.log('Issues:', issues);
console.log('Form submitted:', { title, description });
```

### 2. Check Browser DevTools
**Press F12 → Console tab**
- See JavaScript errors
- See network requests (Network tab)
- Check if API calls succeed or fail

### 3. Check Terminal Output
- **Backend terminal:** See server errors, database connection
- **Frontend terminal:** See compilation errors

### 4. Test Backend First
Always test backend with Postman BEFORE connecting frontend!

### 5. Read Error Messages Carefully
Error messages tell you:
- **What** went wrong
- **Where** it went wrong (file + line number)
- **Why** it went wrong

Example:
```
Error: Cannot find module './models/Issue'
    at server.js:5:17
```
→ Problem is in `server.js` at line 5, can't find the module

---

## 🆘 Still Stuck? Troubleshooting Checklist

- [ ] Is backend terminal showing "MongoDB connected successfully"?
- [ ] Is backend running on port 5000?
- [ ] Is frontend running on port 3000?
- [ ] Did you run `npm install` in BOTH backend and frontend?
- [ ] Is your `.env` file in the backend folder (not root)?
- [ ] Did you test endpoints with Postman first?
- [ ] Are you looking at the correct terminal (backend vs frontend)?
- [ ] Did you save all files after editing?
- [ ] Is your MongoDB Atlas cluster running (not paused)?
- [ ] Are there any typos in your code?

### How to Get Help:
1. Copy the FULL error message
2. Check which file/line has the error
3. Use console.log() to debug
4. Google the error message
5. Ask on Stack Overflow with specific error details

---

## 💡 Prevention Tips

### Before Starting Development:
1. Run `npm install` in both folders
2. Test MongoDB connection
3. Test backend with Postman
4. Then start frontend

### While Developing:
1. Make small changes and test frequently
2. Use console.log() liberally
3. Save files after editing
4. Watch terminal for errors
5. Check browser console for frontend errors

### Best Practices:
1. Keep both terminals visible
2. Don't ignore warnings
3. Test one feature at a time
4. Commit working code to Git
5. Read documentation when stuck
