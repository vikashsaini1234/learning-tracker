
# 🔗 API Specification Document (API_SPEC)
### Project: Learning Tracker  
**Author:** Vikash Saini  
**Version:** 1.0  
**Date:** 12-11-2025

---

## 🧭 1. Overview

This document defines the REST API specifications for the **Learning Tracker** platform.  
It acts as a **contract** between frontend and backend, describing the available endpoints, request/response structures, and data validation rules.  

The APIs follow RESTful design principles, returning **JSON** for all responses and using standard **HTTP status codes**.

---

## 🌐 2. Base Configuration

| Item | Value |
|------|--------|
| **Base URL (Dev)** | `http://localhost:8080/api` |
| **Base URL (Prod)** | `https://<aws-endpoint>/api` |
| **Content Type** | `application/json` |
| **Authentication** | None (MVP release) |
| **Pagination / Filtering** | Not implemented (v1.0) |
| **Versioning** | `/api/v1` planned for future versions |

---

## 🧩 3. Category APIs

### 🟢 3.1 Get All Categories
**Endpoint:**  
`GET /api/categories`

**Description:**  
Fetches all categories with progress and status.

**Query Params:**
| Name | Type | Default | Description |
|------|------|----------|--------------|
| `includeTopics` | boolean | false | Whether to include topic list within each category |

**Response Example:**
```json
[
  {
    "id": 1,
    "name": "System Design",
    "description": "High-level design concepts",
    "status": "IN_PROGRESS",
    "progressPercent": 40.0,
    "topics": []
  }
]
```

**Status Codes:**
| Code | Description |
|------|--------------|
| 200 | Success |
| 500 | Internal server error |

---

### 🟢 3.2 Get Category by ID
**Endpoint:**  
`GET /api/categories/{id}`

**Response Example:**
```json
{
  "id": 2,
  "name": "AWS",
  "description": "Learn AWS Cloud fundamentals",
  "status": "NOT_STARTED",
  "progressPercent": 0.0,
  "topics": [
    { "id": 5, "name": "EC2 Basics", "status": "NOT_STARTED" }
  ]
}
```

**Status Codes:**
| Code | Description |
|------|--------------|
| 200 | Success |
| 404 | Category not found |

---

### 🟢 3.3 Create Category
**Endpoint:**  
`POST /api/categories`

**Request Body:**
```json
{
  "name": "ReactJS",
  "description": "Frontend library for building UI components"
}
```

**Validation Rules:**
| Field | Type | Rules |
|--------|------|--------|
| `name` | string | required, 2–150 chars |
| `description` | string | required, max 500 chars |

**Response Example:**
```json
{
  "id": 3,
  "name": "ReactJS",
  "description": "Frontend library for building UI components",
  "status": "NOT_STARTED",
  "progressPercent": 0.0
}
```

**Status Codes:**
| Code | Description |
|------|--------------|
| 201 | Category created |
| 400 | Validation failed |
| 409 | Duplicate category name |

---

### 🟢 3.4 Update Category
**Endpoint:**  
`PUT /api/categories/{id}`

**Request Body:**
```json
{
  "name": "ReactJS Advanced",
  "description": "Updated description"
}
```

**Response Example:**
```json
{
  "id": 3,
  "name": "ReactJS Advanced",
  "description": "Updated description",
  "status": "NOT_STARTED",
  "progressPercent": 0.0
}
```

---

### 🟢 3.5 Delete Category
**Endpoint:**  
`DELETE /api/categories/{id}`

**Response Example:**
```json
{ "message": "Category deleted successfully" }
```

**Status Codes:**
| Code | Description |
|------|--------------|
| 204 | No content |
| 404 | Category not found |

---

## 🧩 4. Topic APIs

### 🟢 4.1 Get All Topics
**Endpoint:**  
`GET /api/topics`

**Response Example:**
```json
[
  {
    "id": 10,
    "name": "Load Balancing",
    "status": "IN_PROGRESS",
    "categoryId": 1
  }
]
```

---

### 🟢 4.2 Get Topics by Category
**Endpoint:**  
`GET /api/topics/category/{categoryId}`

**Response Example:**
```json
[
  { "id": 11, "name": "EC2 Basics", "status": "NOT_STARTED" },
  { "id": 12, "name": "S3 Storage", "status": "COMPLETED" }
]
```

---

### 🟢 4.3 Create Topic under Category
**Endpoint:**  
`POST /api/topics/category/{categoryId}`

**Request Body:**
```json
{
  "name": "Lambda Functions"
}
```

**Response Example:**
```json
{
  "id": 13,
  "name": "Lambda Functions",
  "status": "NOT_STARTED",
  "categoryId": 2
}
```

**Status Codes:**
| Code | Description |
|------|--------------|
| 201 | Topic created |
| 400 | Invalid category ID |

---

### 🟢 4.4 Bulk Import Topics via Excel
**Endpoint:**  
`POST /api/topics/import/{categoryId}`

**Request Type:** `multipart/form-data`  
**Form Field:** `file` (Excel file containing topic names in column A)

**Response Example:**
```json
{
  "categoryId": 2,
  "topicsAdded": 12
}
```

**Status Codes:**
| Code | Description |
|------|--------------|
| 200 | Import successful |
| 400 | Invalid file |
| 500 | Processing error |

---

### 🟢 4.5 Update Topic
**Endpoint:**  
`PUT /api/topics/{id}`

**Request Body:**
```json
{
  "status": "COMPLETED"
}
```

**Response Example:**
```json
{
  "id": 13,
  "name": "Lambda Functions",
  "status": "COMPLETED",
  "categoryId": 2
}
```

After update:
- Category’s progress is automatically recalculated.

---

### 🟢 4.6 Delete Topic
**Endpoint:**  
`DELETE /api/topics/{id}`

**Response Example:**
```json
{ "message": "Topic deleted successfully" }
```

---

## ⚙️ 5. Common Status Codes

| Code | Meaning |
|------|----------|
| 200 | Success |
| 201 | Resource created |
| 204 | No content |
| 400 | Bad request / validation error |
| 404 | Resource not found |
| 409 | Conflict (duplicate entry) |
| 500 | Internal server error |

---

## 🧠 6. Behavior Rules

1. **Automatic Progress Updates:**  
   Whenever a topic’s status changes, the category’s `progress_percent` and `status` are recalculated:
   ```
   progress = (completedTopics / totalTopics) * 100
   ```
2. **Cascade Deletes:**  
   Deleting a category automatically deletes its topics.
3. **Default Values:**
   - Category: `status = NOT_STARTED`, `progress = 0.0`
   - Topic: `status = NOT_STARTED`

---

## 🧩 7. Validation Summary

| Field | Validation | Applies To |
|--------|-------------|-------------|
| `name` | Required, 2–150 chars | Category, Topic |
| `description` | required, max 500 chars | Category |
| `status` | Must be one of: NOT_STARTED, IN_PROGRESS, COMPLETED | Both |
| `categoryId` | Required on Topic creation | Topic |

---

## 🧾 8. Example Error Responses

**400 Bad Request**
```json
{
  "timestamp": "2025-11-12T12:45:00",
  "message": "Category name is required"
}
```

**404 Not Found**
```json
{
  "timestamp": "2025-11-12T12:50:00",
  "message": "Topic not found"
}
```

**500 Internal Server Error**
```json
{
  "timestamp": "2025-11-12T12:55:00",
  "message": "Unexpected error occurred"
}
```

---

## ✅ 9. Summary

This API specification provides a complete and consistent contract for the **Learning Tracker** system.  
It defines all endpoints required by the frontend for CRUD operations, ensures strong validation, and describes automatic behaviors like progress updates and cascade deletes.  
Future enhancements (v2.0) may include:
- Authentication & User Management  
- Filtering & Search APIs  
- Pagination  
- OpenAPI / Swagger integration  

---

### 🔖 End of API_SPEC (v1.0)
