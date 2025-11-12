
# 📘 Product Requirements Document (PRD)
### Project: Learning Tracker  
**Author:** Vikash Saini  
**Version:** 1.0  
**Date:** 12-11-2025

---

## 🧭 1. Product Overview
**Learning Tracker** is a personal web application designed to help users plan, track, and visualize their learning progress across multiple domains.  
It allows users to organize their learning material into **categories** (broad subjects like Java, AWS, React, etc.) and **topics** (specific sub-areas), and to visually monitor completion status and progress.

The goal is to give a simple yet effective way to see:
- What’s next to learn  
- What’s in progress  
- What’s already completed  

---

## 🎯 2. Objectives
- Provide a centralized dashboard to plan and monitor learning.  
- Allow easy creation and management of learning categories and topics.  
- Give a clear, visual understanding of learning progress.  
- Support both single-topic creation and bulk topic import via Excel.  
- Ensure status and progress indicators are visually intuitive.  

---

## 👤 3. User Stories
| # | As a user, I want to... | So that I can... |
|---|--------------------------|------------------|
| 1 | View all my learning categories on a dashboard | Get an overview of what I’m learning |
| 2 | Create a new category with name and description | Add new areas of study |
| 3 | See each category as a tile with color-coded status and progress bar/chart | Quickly identify completed or in-progress categories |
| 4 | Open a category to see its topics in a list | Understand what’s inside each subject |
| 5 | Add a single topic manually | Track small pieces of learning |
| 6 | Import multiple topics via Excel | Quickly add a long list of topics |
| 7 | Update the status of a topic (Not Started / In Progress / Completed) | Track progress easily |
| 8 | See progress % calculated automatically based on topics’ statuses | Understand how much is done |
| 9 | Have a simple, visually appealing dashboard | Stay motivated and organized |

---

## 🧱 4. Core Features
| Feature | Description |
|----------|-------------|
| **Dashboard View** | Shows all Categories as tiles with color-coded status and progress percentage |
| **Add Category** | Button to create a category (fields: name, description) |
| **Category Page** | Displays list of Topics in that category |
| **Add Topic** | Create a single topic manually (only field: name) |
| **Import Topics** | Upload Excel (.xlsx) with one column: list of topic names |
| **Status Tracking** | Each topic can be marked as Not Started, In Progress, or Completed |
| **Auto Status Propagation** | If any topic is “In Progress”, the category becomes “In Progress”; if all are “Completed”, the category becomes “Completed” |
| **Progress Visualization** | Dashboard tiles and category pages show % complete via progress bar or pie chart |
| **Responsive UI** | Should work smoothly on desktop, tablet, and mobile |
| **Color Coding** | - Blue → Not Started<br>- Yellow → In Progress<br>- Green → Completed |

---

## 🧩 5. Data Entities
| Entity | Description | Fields |
|--------|--------------|--------|
| **Category** | Broad area of learning | `id`, `name`, `description`, `status`, `progressPercent`, `createdAt`, `updatedAt` |
| **Topic** | Individual learning unit inside a Category | `id`, `name`, `status`, `categoryId`, `createdAt`, `updatedAt` |

📝 *ProgressPercent and Status will be derived from topics’ statuses and stored or recalculated when needed.*

---

## 🔗 6. Relationships
- **One Category → Many Topics**  
- Category progress = (Completed Topics / Total Topics) × 100  
- Status auto-updates based on topic statuses.  

---

## ⚙️ 7. Non-Functional Requirements
| Area | Requirement |
|-------|--------------|
| **Performance** | The dashboard should load within 2 seconds for up to 100 categories. |
| **Scalability** | Should support thousands of topics per category. |
| **Ease of Use** | UI must be intuitive and require minimal steps for any action. |
| **Portability** | Backend via Docker Compose; easily deployable to AWS Free Tier. |
| **Persistence** | Data stored in MySQL; no data loss between restarts. |

---

## 🖥️ 8. Tech Stack
| Layer | Technology |
|--------|-------------|
| **Frontend** | ReactJS (Vite, TailwindCSS, Framer Motion, Recharts) |
| **Backend** | Java + Spring Boot |
| **Database** | MySQL |
| **Infrastructure** | Docker + Docker Compose |
| **Cloud (later)** | AWS (Free Tier for deployment) |

---

## 📊 9. Future Enhancements (Not in v1)
- User authentication & profiles  
- Learning analytics (time spent, streaks)  
- Notes or resources per topic  
- Goal reminders
- Learning material to open in same aplication

---

## 🧾 10. Acceptance Criteria
- [ ] I can add, view, and delete categories.  
- [ ] I can add topics manually and via Excel import.  
- [ ] I can update statuses on topic level.  
- [ ] Category progress and status updates automatically based on topics.  
- [ ] The UI displays colored statuses and percentage progress correctly.  

---

## ✅ 11. Milestone Plan (MVP)
| Phase | Focus | Output |
|--------|--------|--------|
| **1** | Documentation | PRD + System Design + ERD + API Spec |
| **2** | Backend Setup | Spring Boot, MySQL models, API endpoints |
| **3** | Frontend Dashboard | React UI with Tiles & Category pages |
| **4** | Integration | Link API ↔ UI + Docker Compose |
| **5** | Polish | Charts, Color states, Excel import |

---

### 🔖 End of PRD (v1.0)
