# CivicSense - Phase 1 Complete: Authentication ✅

## 🎉 What You Just Added:

✅ User registration (signup)  
✅ User login with JWT tokens  
✅ Password hashing with bcrypt  
✅ Protected routes middleware  
✅ Auth state management  

---

## 🧪 TESTING AUTHENTICATION

### 1. Test Signup
**POST** `http://localhost:5000/api/auth/signup`

Body (JSON):
```json
{
  "name": "John Doe",
  "email": "john@civic.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "65abc123...",
    "name": "John Doe",
    "email": "john@civic.com",
    "token": "eyJhbGciOiJIUz..."
  }
}
```

**SAVE THE TOKEN!** You'll need it for protected routes.

---

### 2. Test Login
**POST** `http://localhost:5000/api/auth/login`

Body (JSON):
```json
{
  "email": "john@civic.com",
  "password": "password123"
}
```

---

### 3. Test Protected Route
**GET** `http://localhost:5000/api/auth/me`

Headers:
```
Authorization: Bearer YOUR_TOKEN_HERE
```

---

## 📚 HOW AUTHENTICATION WORKS

### The Flow:

```
1. USER SIGNS UP
   ↓
2. Backend hashes password with bcrypt
   ↓
3. Saves user to MongoDB
   ↓
4. Generates JWT token (contains user ID)
   ↓
5. Sends token to frontend
   ↓
6. Frontend stores token (localStorage)
   ↓
7. For protected requests, frontend sends:
   Authorization: Bearer TOKEN
   ↓
8. Backend middleware verifies token
   ↓
9. If valid, req.user = logged in user
   ↓
10. Route handler executes
```

---

## 🔑 KEY CONCEPTS

### JWT (JSON Web Token)
- Self-contained token with user info
- Signed with secret key
- Can't be tampered with
- Has expiration (30 days in our case)

### bcrypt
- One-way hashing (can't reverse)
- Automatically adds salt (random data)
- Same password → different hash each time

### Middleware
- Function that runs BEFORE route handler
- Can modify req/res objects
- Can block access (401 Unauthorized)

---

## 🎯 NEXT: Protect Issue Routes

We need to update Issue routes so:
- Only logged-in users can create issues
- Only issue creator can delete it

Stay tuned for Phase 2!

---

## 🐛 COMMON ERRORS

### "jwt must be provided"
→ You forgot to add Authorization header

### "Token failed"
→ Token is invalid or expired, log in again

### "User already exists"
→ Email is already registered

### "Invalid credentials"
→ Wrong email or password

---

## 💡 PRO TIPS

1. **Never log passwords** - They're hashed anyway
2. **Token in headers, not body** - More secure
3. **Use HTTPS in production** - Tokens can be stolen over HTTP
4. **Set reasonable expiration** - 30 days is good for dev
5. **Refresh tokens** - For production, implement token refresh

---

**Phase 1 Complete!** Your app now has enterprise-grade authentication. 🎊
