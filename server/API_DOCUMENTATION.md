# API Endpoints Documentation

This document provides an overview of all available API endpoints in the .NET E-commerce server.

## Base URL

```
http://localhost:5175/api/v1
```

---

## Authentication Endpoints

### Auth Controller (`/api/v1/auth`)

#### Send OTP

```http
POST /api/v1/auth/send-otp?email={email}
```

Send OTP to email for registration.

#### Verify OTP

```http
POST /api/v1/auth/verify-otp
Content-Type: application/json

{
  "email": "user@example.com",
  "otp": "123456"
}
```

#### Sign Up

```http
POST /api/v1/auth/sign-up
Content-Type: application/json

{
  "email": "user@example.com",
  "name": "John Doe",
  "phone": "1234567890",
  "password": "password123"
}
```

#### Sign In

```http
POST /api/v1/auth/sign-in
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

#### Get Current User

```http
GET /api/v1/auth/me
Authorization: Bearer {token}
```

#### Refresh Token

```http
POST /api/v1/auth/refresh-token
Authorization: Bearer {expired-token}
Cookie: refreshToken={refresh-token}
```

#### Logout

```http
POST /api/v1/auth/logout
```

---

## Password Management (`/api/v1/password`)

### Change Password (Authenticated)

```http
PUT /api/v1/password/change
Authorization: Bearer {token}
Content-Type: application/json

{
  "currPassword": "oldpassword123",
  "newPassword": "newpassword123"
}
```

### Forget Password (Request OTP)

```http
PUT /api/v1/password/forget
Content-Type: application/json

{
  "email": "user@example.com"
}
```

### Reset Password (Using OTP)

```http
PUT /api/v1/password/reset/{otp}
Content-Type: application/json

{
  "password": "newpassword123"
}
```

---

## Cart Management (`/api/v1/cart`)

All cart endpoints require authentication.

### Add to Cart

```http
POST /api/v1/cart
Authorization: Bearer {token}
Content-Type: application/json

{
  "itemId": "guid-here",
  "quantity": 2,
  "size": "m",
  "color": "blue"
}
```

### Get Cart Items

```http
GET /api/v1/cart
Authorization: Bearer {token}
```

### Update Cart Item Quantity

```http
PUT /api/v1/cart
Authorization: Bearer {token}
Content-Type: application/json

{
  "cartId": "guid-here",
  "quantity": 3
}
```

### Remove from Cart

```http
DELETE /api/v1/cart?cartId={guid}
Authorization: Bearer {token}
```

---

## Wishlist (`/api/v1/wishlist`)

### Fetch Wishlist Items

```http
POST /api/v1/wishlist
Content-Type: application/json

{
  "ids": [
    "guid-1",
    "guid-2",
    "guid-3"
  ]
}
```

---

## Featured Items (`/api/v1/featured`)

### Get Featured Items

```http
GET /api/v1/featured
```

Returns a curated selection of featured items (track pants, printed top, graphic top, polo t-shirt).

---

## Database Seeding (`/api/v1/seed`)

### Seed All Data

```http
GET /api/v1/seed
GET /api/v1/seed?cleanup=true
GET /api/v1/seed?force=true
```

### Seed Tops Only

```http
GET /api/v1/seed/tops
GET /api/v1/seed/tops?cleanup=true
GET /api/v1/seed/tops?force=true
```

### Seed Bottoms Only

```http
GET /api/v1/seed/bottoms
GET /api/v1/seed/bottoms?cleanup=true
GET /api/v1/seed/bottoms?force=true
```

**Query Parameters:**

- `cleanup` (bool): Remove all existing data instead of seeding
- `force` (bool): Force seeding even if data already exists

---

## Response Formats

### Success Response

```json
{
  "message": "Operation successful",
  "data": { ... }
}
```

### Error Response

```json
{
  "message": "Error description"
}
```

### Common HTTP Status Codes

- `200 OK` - Successful GET/PUT/DELETE
- `201 Created` - Successful POST
- `400 Bad Request` - Invalid request data
- `401 Unauthorized` - Authentication required or failed
- `404 Not Found` - Resource not found
- `422 Unprocessable Entity` - Validation error
- `500 Internal Server Error` - Server error

---

## Authentication

Most endpoints require JWT authentication. Include the token in the Authorization header:

```
Authorization: Bearer {your-jwt-token}
```

Tokens are obtained from the `/api/v1/auth/sign-in` or `/api/v1/auth/sign-up` endpoints.

---

## Testing with cURL

### Example: Sign In

```bash
curl -X POST http://localhost:5175/api/v1/auth/sign-in \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"password123"}'
```

### Example: Get Cart (with auth)

```bash
curl -X GET http://localhost:5175/api/v1/cart \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### Example: Add to Cart

```bash
curl -X POST http://localhost:5175/api/v1/cart \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -H "Content-Type: application/json" \
  -d '{
    "itemId":"guid-here",
    "quantity":2,
    "size":"m",
    "color":"blue"
  }'
```

---

## API Documentation

For interactive API documentation, visit:

```
http://localhost:5175/scalar/v1
```

This provides a Scalar API reference with the ability to test endpoints directly in the browser.
