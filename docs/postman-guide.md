# Postman Collection Guide

## Screenshots to Capture for Portfolio

### 1. Complete User Flow (Hero Image)

**Collection Structure Screenshot:**
Create a Postman collection showing this folder structure:
```
📁 SubTracker API
  📁 Authentication
    ├── Sign Up
    ├── Sign In
    └── Sign Out
  📁 Subscriptions
    ├── Create Subscription
    ├── Get User Subscriptions
    └── Delete Subscription
  📁 Workflows
    └── Trigger Reminder
```

---

### 2. Authentication Flow Screenshots

#### A. Sign Up Request
**POST** `http://localhost:5500/api/v1/auth/sign-up`

**Body (JSON):**
```json
{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "password": "securePass123",
  "preferences": {
    "reminderDays": [7, 5, 2, 1, 0],
    "currency": "USD"
  }
}
```

**Expected Response (201):**
```json
{
  "success": true,
  "message": "User created successfully",
  "data": {
    "user": {
      "_id": "65a1b2c3d4e5f6g7h8i9j0k1",
      "name": "John Doe",
      "email": "john.doe@example.com",
      "preferences": {
        "reminderDays": [7, 5, 2, 1, 0],
        "currency": "USD"
      }
    }
  }
}
```

---

#### B. Sign In Request
**POST** `http://localhost:5500/api/v1/auth/sign-in`

**Body (JSON):**
```json
{
  "email": "john.doe@example.com",
  "password": "securePass123"
}
```

**Expected Response (200):**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "_id": "65a1b2c3d4e5f6g7h8i9j0k1",
      "name": "John Doe",
      "email": "john.doe@example.com"
    },
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

**💡 Portfolio Tip:** Highlight the JWT tokens in the screenshot

---

### 3. Protected Route - Create Subscription

**POST** `http://localhost:5500/api/v1/subscriptions`

**Headers:**
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: application/json
```

**Body (JSON):**
```json
{
  "name": "Netflix Premium",
  "price": 15.99,
  "currency": "USD",
  "frequency": "monthly",
  "category": "Entertainment",
  "paymentMethod": "Credit Card",
  "startDate": "2024-01-01",
  "renewalDate": "2024-02-01"
}
```

**Expected Response (201):**
```json
{
  "success": true,
  "message": "Subscription created successfully",
  "data": {
    "subscription": {
      "_id": "65a1b2c3d4e5f6g7h8i9j0k2",
      "name": "Netflix Premium",
      "price": 15.99,
      "currency": "USD",
      "frequency": "monthly",
      "category": "Entertainment",
      "paymentMethod": "Credit Card",
      "status": "active",
      "startDate": "2024-01-01T00:00:00.000Z",
      "renewalDate": "2024-02-01T00:00:00.000Z",
      "user": "65a1b2c3d4e5f6g7h8i9j0k1",
      "createdAt": "2024-01-15T10:30:00.000Z"
    }
  }
}
```

**💡 Portfolio Tip:** Show the Authorization header in the screenshot to demonstrate JWT authentication

---

### 4. Get User's Subscriptions

**GET** `http://localhost:5500/api/v1/subscriptions/user/65a1b2c3d4e5f6g7h8i9j0k1`

**Headers:**
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Expected Response (200):**
```json
{
  "success": true,
  "data": {
    "subscriptions": [
      {
        "_id": "65a1b2c3d4e5f6g7h8i9j0k2",
        "name": "Netflix Premium",
        "price": 15.99,
        "currency": "USD",
        "frequency": "monthly",
        "status": "active",
        "renewalDate": "2024-02-01T00:00:00.000Z"
      },
      {
        "_id": "65a1b2c3d4e5f6g7h8i9j0k3",
        "name": "Spotify Premium",
        "price": 9.99,
        "currency": "USD",
        "frequency": "monthly",
        "status": "active",
        "renewalDate": "2024-02-15T00:00:00.000Z"
      }
    ],
    "count": 2
  }
}
```

---

## Postman Collection Export

Save this as `SubTracker.postman_collection.json` and import it into Postman:

```json
{
  "info": {
    "name": "SubTracker API",
    "description": "Subscription management API with automated reminders",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "auth": {
    "type": "bearer",
    "bearer": [
      {
        "key": "token",
        "value": "{{accessToken}}",
        "type": "string"
      }
    ]
  },
  "variable": [
    {
      "key": "baseUrl",
      "value": "http://localhost:5500/api/v1"
    },
    {
      "key": "accessToken",
      "value": ""
    }
  ]
}
```

---

## How to Capture Screenshots

### For Portfolio Hero Image:
1. Open Postman with the collection fully expanded
2. Execute the "Sign In" request successfully
3. Capture the response showing the JWT tokens
4. Make sure the request body and headers are visible

### For Gallery Images:
1. **Authentication Flow**: Show Sign Up → Sign In with responses
2. **Protected Route**: Show Create Subscription with Authorization header visible
3. **Data Retrieval**: Show Get User Subscriptions with multiple subscription objects

### Screenshot Tips:
- Use Postman's dark theme for modern aesthetics
- Ensure JSON responses are formatted (prettified)
- Show status codes (200, 201) in green
- Include the Authorization header in protected route screenshots
- Zoom in so text is clearly readable
- Consider using Postman's "Generate Code Snippet" feature to show how to consume the API

---

## Alternative: Create API Documentation with Swagger

For an even more impressive portfolio piece, consider documenting the API with Swagger/OpenAPI:

1. Install swagger-jsdoc and swagger-ui-express
2. Add JSDoc comments to your routes
3. Generate interactive API documentation
4. Screenshot the Swagger UI interface

This shows professional API design skills and gives you a polished, interactive documentation interface to showcase.
