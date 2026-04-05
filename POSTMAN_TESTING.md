# Testing Backend with Postman

## First, Start Your Server
```bash
cd backend
npm install
npm run dev
```

You should see:
```
🚀 Server running on port 5000
📍 Test it: http://localhost:5000
✅ MongoDB connected successfully
```

---

## Test Each Endpoint

### 1. GET All Issues
**Purpose:** See all issues (should be empty at first)

- Method: `GET`
- URL: `http://localhost:5000/api/issues`
- Click "Send"

**Expected Response:**
```json
{
  "success": true,
  "count": 0,
  "data": []
}
```

---

### 2. CREATE an Issue
**Purpose:** Add a new issue

- Method: `POST`
- URL: `http://localhost:5000/api/issues`
- Go to "Body" tab → Select "raw" → Select "JSON"
- Paste this:
```json
{
  "title": "Login button not working",
  "description": "When I click login, nothing happens"
}
```
- Click "Send"

**Expected Response:**
```json
{
  "success": true,
  "data": {
    "_id": "65abc123...",
    "title": "Login button not working",
    "description": "When I click login, nothing happens",
    "status": "open",
    "createdAt": "2026-02-04T..."
  }
}
```

**Copy the `_id` value - you'll need it for the next tests!**

---

### 3. UPDATE Issue Status
**Purpose:** Toggle issue from open → closed

- Method: `PATCH`
- URL: `http://localhost:5000/api/issues/YOUR_ID_HERE`
  (Replace `YOUR_ID_HERE` with the `_id` from step 2)
- Click "Send"

**Expected Response:**
```json
{
  "success": true,
  "data": {
    "_id": "65abc123...",
    "status": "closed"  ← Changed!
  }
}
```

---

### 4. DELETE an Issue
**Purpose:** Remove an issue

- Method: `DELETE`
- URL: `http://localhost:5000/api/issues/YOUR_ID_HERE`
- Click "Send"

**Expected Response:**
```json
{
  "success": true,
  "message": "Issue deleted successfully"
}
```

---

## Common Errors in Postman

### ❌ "Cannot POST /api/issues"
**Fix:** Make sure server is running (`npm run dev`)

### ❌ "Please add a title"
**Fix:** Check your JSON body - title and description are required

### ❌ "Issue not found"
**Fix:** The ID in the URL is wrong. Get a valid ID from GET request first

### ❌ Server won't start
**Fix:** Check if `.env` file has correct MongoDB URI

---

## ✅ If All Tests Pass
Your backend is working! Now we can build the frontend.
