# Branch Management API Documentation

## Overview

The Branch Management API allows users to create, manage, and organize multiple branches for their debt tracking. Each branch operates independently with its own set of debts, settings, and analytics.

## Authentication

All branch API endpoints require authentication via JWT token in the Authorization header:

```
Authorization: Bearer <jwt_token>
```

## Subscription Limits

Branch creation is limited based on user subscription tiers:

- **Free**: 1 branch
- **Lite**: 2 branches  
- **Standard**: 3 branches
- **Pro**: 5 branches

## API Endpoints

### 1. Get User Branches

Retrieve all branches belonging to the authenticated user.

**Endpoint:** `GET /api/branches`

**Headers:**
```
Authorization: Bearer <jwt_token>
Content-Type: application/json
```

**Response:**
```json
{
  "success": true,
  "branches": [
    {
      "_id": "64f8a1b2c3d4e5f6a7b8c9d0",
      "userId": "64f8a1b2c3d4e5f6a7b8c9d1",
      "name": "Asosiy filial",
      "description": "Sizning asosiy filialingiz",
      "currency": "UZS",
      "color": "#3B82F6",
      "icon": "building",
      "isActive": true,
      "createdAt": "2023-09-06T10:30:00.000Z",
      "updatedAt": "2023-09-06T10:30:00.000Z"
    }
  ]
}
```

**Error Responses:**
- `401 Unauthorized`: Invalid or missing JWT token
- `500 Internal Server Error`: Database or server error

---

### 2. Create New Branch

Create a new branch for the authenticated user.

**Endpoint:** `POST /api/branches`

**Headers:**
```
Authorization: Bearer <jwt_token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "name": "Yangi filial",
  "description": "Filial tavsifi",
  "currency": "UZS",
  "color": "#10B981",
  "icon": "store"
}
```

**Request Parameters:**
- `name` (required): Branch name (2-100 characters)
- `description` (optional): Branch description (max 500 characters)
- `currency` (required): Branch currency (UZS, USD, EUR, RUB, TJS)
- `color` (required): Branch color (hex code)
- `icon` (required): Branch icon (building, store, office, home, factory, warehouse)

**Response:**
```json
{
  "success": true,
  "branch": {
    "_id": "64f8a1b2c3d4e5f6a7b8c9d2",
    "userId": "64f8a1b2c3d4e5f6a7b8c9d1",
    "name": "Yangi filial",
    "description": "Filial tavsifi",
    "currency": "UZS",
    "color": "#10B981",
    "icon": "store",
    "isActive": true,
    "createdAt": "2023-09-06T11:00:00.000Z",
    "updatedAt": "2023-09-06T11:00:00.000Z"
  }
}
```

**Error Responses:**
- `400 Bad Request`: Validation errors or missing required fields
- `403 Forbidden`: Branch limit exceeded for subscription tier
- `401 Unauthorized`: Invalid or missing JWT token
- `500 Internal Server Error`: Database or server error

**Example Error Response:**
```json
{
  "success": false,
  "message": "Branch limit exceeded for your subscription tier",
  "upgradeRequired": true,
  "currentCount": 1,
  "limit": 1,
  "tier": "free"
}
```

---

### 3. Update Branch

Update an existing branch.

**Endpoint:** `PUT /api/branches/:id`

**Headers:**
```
Authorization: Bearer <jwt_token>
Content-Type: application/json
```

**URL Parameters:**
- `id`: Branch ID

**Request Body:**
```json
{
  "name": "Yangilangan filial nomi",
  "description": "Yangilangan tavsif",
  "currency": "USD",
  "color": "#EF4444",
  "icon": "office"
}
```

**Response:**
```json
{
  "success": true,
  "branch": {
    "_id": "64f8a1b2c3d4e5f6a7b8c9d2",
    "userId": "64f8a1b2c3d4e5f6a7b8c9d1",
    "name": "Yangilangan filial nomi",
    "description": "Yangilangan tavsif",
    "currency": "USD",
    "color": "#EF4444",
    "icon": "office",
    "isActive": true,
    "createdAt": "2023-09-06T11:00:00.000Z",
    "updatedAt": "2023-09-06T12:00:00.000Z"
  }
}
```

**Error Responses:**
- `400 Bad Request`: Validation errors
- `404 Not Found`: Branch not found or doesn't belong to user
- `401 Unauthorized`: Invalid or missing JWT token
- `500 Internal Server Error`: Database or server error

---

### 4. Delete Branch

Delete a branch and optionally transfer its debts to another branch.

**Endpoint:** `DELETE /api/branches/:id`

**Headers:**
```
Authorization: Bearer <jwt_token>
Content-Type: application/json
```

**URL Parameters:**
- `id`: Branch ID

**Request Body (Optional):**
```json
{
  "transferToBranchId": "64f8a1b2c3d4e5f6a7b8c9d0",
  "deleteDebts": false
}
```

**Request Parameters:**
- `transferToBranchId` (optional): ID of branch to transfer debts to
- `deleteDebts` (optional): If true, delete all debts instead of transferring

**Response:**
```json
{
  "success": true,
  "message": "Branch deleted successfully",
  "transferredDebts": 5
}
```

**Error Responses:**
- `400 Bad Request`: Cannot delete branch with debts without specifying transfer option
- `404 Not Found`: Branch not found or doesn't belong to user
- `401 Unauthorized`: Invalid or missing JWT token
- `500 Internal Server Error`: Database or server error

---

### 5. Get Branch Statistics

Get statistics for a specific branch.

**Endpoint:** `GET /api/branches/:id/stats`

**Headers:**
```
Authorization: Bearer <jwt_token>
Content-Type: application/json
```

**URL Parameters:**
- `id`: Branch ID

**Response:**
```json
{
  "success": true,
  "stats": {
    "totalDebts": 15,
    "pendingDebts": 8,
    "paidDebts": 7,
    "totalAmount": 5000000,
    "pendingAmount": 3000000,
    "paidAmount": 2000000,
    "currency": "UZS",
    "averageDebtAmount": 333333,
    "oldestDebt": "2023-08-01T00:00:00.000Z",
    "newestDebt": "2023-09-06T00:00:00.000Z"
  }
}
```

---

### 6. Get Branch Debts

Get all debts for a specific branch.

**Endpoint:** `GET /api/branches/:id/debts`

**Headers:**
```
Authorization: Bearer <jwt_token>
Content-Type: application/json
```

**URL Parameters:**
- `id`: Branch ID

**Query Parameters:**
- `status` (optional): Filter by debt status (pending, paid)
- `limit` (optional): Number of debts to return (default: 50)
- `offset` (optional): Number of debts to skip (default: 0)
- `sortBy` (optional): Sort field (debtDate, amount, creditor)
- `sortOrder` (optional): Sort order (asc, desc)

**Response:**
```json
{
  "success": true,
  "debts": [
    {
      "_id": "64f8a1b2c3d4e5f6a7b8c9d3",
      "userId": "64f8a1b2c3d4e5f6a7b8c9d1",
      "branchId": "64f8a1b2c3d4e5f6a7b8c9d2",
      "creditor": "John Doe",
      "amount": 500000,
      "description": "Qarz tavsifi",
      "phone": "+998901234567",
      "countryCode": "+998",
      "debtDate": "2023-09-01T00:00:00.000Z",
      "status": "pending",
      "currency": "UZS",
      "createdAt": "2023-09-01T10:00:00.000Z",
      "updatedAt": "2023-09-01T10:00:00.000Z"
    }
  ],
  "total": 15,
  "hasMore": true
}
```

---

### 7. Create Branch Debt

Create a new debt in a specific branch.

**Endpoint:** `POST /api/branches/:id/debts`

**Headers:**
```
Authorization: Bearer <jwt_token>
Content-Type: application/json
```

**URL Parameters:**
- `id`: Branch ID

**Request Body:**
```json
{
  "creditor": "Jane Smith",
  "amount": 750000,
  "description": "Yangi qarz",
  "phone": "+998901234568",
  "countryCode": "+998",
  "debtDate": "2023-09-06",
  "currency": "UZS"
}
```

**Response:**
```json
{
  "success": true,
  "debt": {
    "_id": "64f8a1b2c3d4e5f6a7b8c9d4",
    "userId": "64f8a1b2c3d4e5f6a7b8c9d1",
    "branchId": "64f8a1b2c3d4e5f6a7b8c9d2",
    "creditor": "Jane Smith",
    "amount": 750000,
    "description": "Yangi qarz",
    "phone": "+998901234568",
    "countryCode": "+998",
    "debtDate": "2023-09-06T00:00:00.000Z",
    "status": "pending",
    "currency": "UZS",
    "createdAt": "2023-09-06T12:30:00.000Z",
    "updatedAt": "2023-09-06T12:30:00.000Z"
  }
}
```

---

### 8. Transfer Debts Between Branches

Transfer debts from one branch to another.

**Endpoint:** `POST /api/branches/:id/transfer-debts`

**Headers:**
```
Authorization: Bearer <jwt_token>
Content-Type: application/json
```

**URL Parameters:**
- `id`: Source branch ID

**Request Body:**
```json
{
  "targetBranchId": "64f8a1b2c3d4e5f6a7b8c9d0",
  "debtIds": ["64f8a1b2c3d4e5f6a7b8c9d3", "64f8a1b2c3d4e5f6a7b8c9d4"],
  "transferAll": false
}
```

**Request Parameters:**
- `targetBranchId` (required): ID of target branch
- `debtIds` (optional): Array of specific debt IDs to transfer
- `transferAll` (optional): If true, transfer all debts from source branch

**Response:**
```json
{
  "success": true,
  "transferredCount": 2,
  "message": "Debts transferred successfully"
}
```

---

### 9. Get Branch Settings

Get settings for a specific branch.

**Endpoint:** `GET /api/branches/:id/settings`

**Headers:**
```
Authorization: Bearer <jwt_token>
Content-Type: application/json
```

**URL Parameters:**
- `id`: Branch ID

**Response:**
```json
{
  "success": true,
  "settings": {
    "_id": "64f8a1b2c3d4e5f6a7b8c9d5",
    "branchId": "64f8a1b2c3d4e5f6a7b8c9d2",
    "userId": "64f8a1b2c3d4e5f6a7b8c9d1",
    "currency": "UZS",
    "telegramNotifications": {
      "enabled": true,
      "dailyReports": true,
      "debtReminders": true
    },
    "reminderSettings": {
      "enabled": true,
      "daysBefore": 1,
      "frequency": "daily"
    },
    "customTemplates": []
  }
}
```

---

### 10. Update Branch Settings

Update settings for a specific branch.

**Endpoint:** `PUT /api/branches/:id/settings`

**Headers:**
```
Authorization: Bearer <jwt_token>
Content-Type: application/json
```

**URL Parameters:**
- `id`: Branch ID

**Request Body:**
```json
{
  "currency": "USD",
  "telegramNotifications": {
    "enabled": true,
    "dailyReports": false,
    "debtReminders": true
  },
  "reminderSettings": {
    "enabled": true,
    "daysBefore": 2,
    "frequency": "weekly"
  }
}
```

**Response:**
```json
{
  "success": true,
  "settings": {
    "_id": "64f8a1b2c3d4e5f6a7b8c9d5",
    "branchId": "64f8a1b2c3d4e5f6a7b8c9d2",
    "userId": "64f8a1b2c3d4e5f6a7b8c9d1",
    "currency": "USD",
    "telegramNotifications": {
      "enabled": true,
      "dailyReports": false,
      "debtReminders": true
    },
    "reminderSettings": {
      "enabled": true,
      "daysBefore": 2,
      "frequency": "weekly"
    },
    "customTemplates": []
  }
}
```

## Error Codes

| Code | Description |
|------|-------------|
| 400 | Bad Request - Invalid request data or validation errors |
| 401 | Unauthorized - Invalid or missing JWT token |
| 403 | Forbidden - Insufficient permissions or subscription limits |
| 404 | Not Found - Resource not found or doesn't belong to user |
| 409 | Conflict - Resource already exists (e.g., duplicate branch name) |
| 429 | Too Many Requests - Rate limit exceeded |
| 500 | Internal Server Error - Server or database error |

## Rate Limiting

API requests are limited to:
- 100 requests per minute per user for read operations
- 50 requests per minute per user for write operations

## Examples

### Creating a Branch with cURL

```bash
curl -X POST https://api.qarzdaftar.com/api/branches \
  -H "Authorization: Bearer your_jwt_token" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Yangi filial",
    "description": "Test filial",
    "currency": "UZS",
    "color": "#10B981",
    "icon": "store"
  }'
```

### Getting Branch Statistics with JavaScript

```javascript
const response = await fetch('/api/branches/64f8a1b2c3d4e5f6a7b8c9d2/stats', {
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  }
});

const data = await response.json();
if (data.success) {
  console.log('Branch stats:', data.stats);
}
```

## Webhooks (Future Feature)

Branch-related webhooks will be available in future versions:

- `branch.created` - Triggered when a new branch is created
- `branch.updated` - Triggered when a branch is updated
- `branch.deleted` - Triggered when a branch is deleted
- `branch.debt_added` - Triggered when a debt is added to a branch
- `branch.limit_reached` - Triggered when subscription limit is reached