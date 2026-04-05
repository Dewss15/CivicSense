# How to Run Quick Issues App

## ⚙️ STEP 1: Backend Setup

### 1.1 Navigate to Backend Folder
```powershell
cd "c:\Users\Dewpearl Gonsalves\prac\quick-issues\backend"
```

### 1.2 Install Dependencies
```powershell
npm install
```
**Wait for this to finish!** It will download all packages (express, mongoose, etc.)

### 1.3 Configure MongoDB Connection

**Option A: Use MongoDB Atlas (Recommended for Beginners)**
1. Go to https://www.mongodb.com/cloud/atlas
2. Sign up for FREE account
3. Create a new cluster (FREE tier)
4. Click "Connect" → "Connect your application"
5. Copy the connection string
6. Open `backend\.env` file
7. Replace the MONGODB_URI with your connection string

**Example `.env` file:**
```
MONGODB_URI=mongodb+srv://myusername:mypassword@cluster0.abcde.mongodb.net/quick-issues?retryWrites=true&w=majority
PORT=5000
```

**Option B: Use Local MongoDB (Advanced)**
```
MONGODB_URI=mongodb://localhost:27017/quick-issues
PORT=5000
```

### 1.4 Start Backend Server
```powershell
npm run dev
```

**✅ Success looks like:**
```
🚀 Server running on port 5000
📍 Test it: http://localhost:5000
✅ MongoDB connected successfully
```

**❌ If you see errors, check the Debugging Guide below**

---

## 🎨 STEP 2: Frontend Setup

**OPEN A NEW TERMINAL** (keep backend running in the first one!)

### 2.1 Navigate to Frontend Folder
```powershell
cd "c:\Users\Dewpearl Gonsalves\prac\quick-issues\frontend"
```

### 2.2 Install Dependencies
```powershell
npm install
```
**This takes 1-2 minutes.** It downloads React and all dependencies.

### 2.3 Start Frontend
```powershell
npm start
```

**✅ Success looks like:**
```
Compiled successfully!

You can now view quick-issues-frontend in the browser.

  Local:            http://localhost:3000
  On Your Network:  http://192.168.x.x:3000
```

**Your browser should automatically open to http://localhost:3000**

---

## 🎯 STEP 3: Test the App

### You should see:
1. Blue header: "⚡ Quick Issues"
2. A form to create new issues
3. "No issues yet!" message (until you create one)

### Try creating an issue:
1. Title: "Test issue"
2. Description: "This is my first issue!"
3. Click "Create Issue"
4. The issue should appear below the form
5. Try clicking "Mark as Closed" and "Delete" buttons

---

## 📋 Quick Reference

### Backend Commands:
```powershell
cd backend
npm install              # First time only
npm run dev             # Start development server
npm start               # Start production server
```

### Frontend Commands:
```powershell
cd frontend
npm install              # First time only
npm start               # Start development server
npm run build           # Create production build
```

### Ports:
- **Backend:** http://localhost:5000
- **Frontend:** http://localhost:3000

### Stop the Servers:
- Press `Ctrl + C` in the terminal
- Type `Y` when asked "Terminate batch job?"

---

## 🔄 Daily Development Workflow

### Starting Your Day:
1. Open VS Code
2. Open Terminal 1 → `cd backend` → `npm run dev`
3. Open Terminal 2 → `cd frontend` → `npm start`

### Making Changes:
- **Backend changes:** Server auto-restarts (thanks to nodemon)
- **Frontend changes:** Browser auto-refreshes (thanks to React)
- **If something breaks:** Stop both servers (Ctrl+C) and restart

### Ending Your Day:
1. Stop frontend (Ctrl+C in Terminal 2)
2. Stop backend (Ctrl+C in Terminal 1)
3. Close VS Code (all changes are saved)

---

## 🌐 Accessing from Other Devices

### On the Same WiFi Network:
1. Find your computer's IP address:
   ```powershell
   ipconfig
   ```
   Look for "IPv4 Address" (usually starts with 192.168.x.x)

2. On your phone/tablet, open browser:
   ```
   http://YOUR_IP:3000
   ```
   Example: `http://192.168.1.100:3000`

**Note:** Backend must also be accessible. Update frontend's API_URL in `issueService.js`:
```javascript
const API_URL = 'http://YOUR_IP:5000/api/issues';
```

---

## ✅ Verification Checklist

Before continuing, make sure:
- [ ] Backend terminal shows "MongoDB connected successfully"
- [ ] Frontend opened browser automatically
- [ ] You can create an issue and it appears on screen
- [ ] You can delete an issue
- [ ] You can toggle issue status

**If all checked, congratulations! Your app is working!** 🎉
