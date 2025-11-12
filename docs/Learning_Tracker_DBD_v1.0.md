
# 🧩 Database Design Document (DBD)
### Project: Learning Tracker  
**Author:** Vikash Saini  
**Version:** 1.0  
**Date:** 12-11-2025

---

## 🧭 1. Overview

This document defines the **database schema and relationships** for the *Learning Tracker* system.  
The database stores information about learning categories and their associated topics, along with progress and status tracking.

The system uses **MySQL** as the database engine, managed locally through **Docker Compose** during development, and **AWS RDS or Dockerized MySQL** for production.

---

## 🧱 2. Entity Relationship Diagram (ERD)

![ERD Diagram](ERD_Learning_Tracker.png)

### Key Relationships
- A **Category** can contain multiple **Topics**.
- A **Topic** always belongs to exactly one **Category**.
- Deleting a category will **cascade delete** all its topics.

---

## 🗃️ 3. Entity Definitions

### 🗂️ `categories` Table

| Column | Type | Constraints | Description |
|--------|------|--------------|--------------|
| `id` | BIGINT | PRIMARY KEY, AUTO_INCREMENT | Unique category identifier |
| `name` | VARCHAR(150) | NOT NULL, UNIQUE | Category name (e.g., “AWS”, “System Design”) |
| `description` | VARCHAR(500) | NULL | Optional text about what this category covers |
| `status` | ENUM('NOT_STARTED','IN_PROGRESS','COMPLETED') | DEFAULT 'NOT_STARTED' | Current learning status |
| `progress_percent` | DECIMAL(5,2) | DEFAULT 0.00 | Auto-updated completion percentage |
| `created_at` | DATETIME | DEFAULT CURRENT_TIMESTAMP | Creation timestamp |
| `updated_at` | DATETIME | ON UPDATE CURRENT_TIMESTAMP | Last update timestamp |

---

### 🗂️ `topics` Table

| Column | Type | Constraints | Description |
|--------|------|--------------|--------------|
| `id` | BIGINT | PRIMARY KEY, AUTO_INCREMENT | Unique topic identifier |
| `category_id` | BIGINT | FOREIGN KEY REFERENCES `categories(id)` ON DELETE CASCADE | Link to parent category |
| `name` | VARCHAR(150) | NOT NULL | Topic name |
| `status` | ENUM('NOT_STARTED','IN_PROGRESS','COMPLETED') | DEFAULT 'NOT_STARTED' | Current progress of topic |
| `created_at` | DATETIME | DEFAULT CURRENT_TIMESTAMP | Creation timestamp |
| `updated_at` | DATETIME | ON UPDATE CURRENT_TIMESTAMP | Last update timestamp |

---

## 🔗 4. Relationships Summary

| Relationship | Type | Description |
|---------------|-------|--------------|
| Category → Topics | One-to-Many | A category can contain many topics |
| Topic → Category | Many-to-One | A topic belongs to one category |
| Deletion Rule | Cascade | When a category is deleted, all its topics are also removed |

---

## ⚙️ 5. Sample SQL Schema

```sql
CREATE TABLE categories (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(150) NOT NULL UNIQUE,
  description VARCHAR(500),
  status ENUM('NOT_STARTED','IN_PROGRESS','COMPLETED') DEFAULT 'NOT_STARTED',
  progress_percent DECIMAL(5,2) DEFAULT 0.00,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE topics (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  category_id BIGINT NOT NULL,
  name VARCHAR(150) NOT NULL,
  status ENUM('NOT_STARTED','IN_PROGRESS','COMPLETED') DEFAULT 'NOT_STARTED',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_category FOREIGN KEY (category_id)
    REFERENCES categories(id)
    ON DELETE CASCADE
);
```

---

## 🧩 6. Indexing Strategy

| Table | Column | Type | Purpose |
|--------|--------|-------|----------|
| `categories` | `name` | UNIQUE | Prevent duplicate category names |
| `topics` | `category_id` | INDEX | Optimize category-topic joins |
| `topics` | `status` | INDEX | Improve filtering by topic status |

---

## 🧠 7. Design Notes

- The database is **normalized (3NF)** — no redundant data.
- **Cascade deletes** maintain referential integrity automatically.
- **Progress** is calculated dynamically or cached in the `categories` table.
- Designed for **easy migration to AWS RDS** without schema changes.
- Compatible with **Spring Boot JPA** using entity annotations.

---

### 🔖 End of DBD (v1.0)
