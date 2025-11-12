
# 🚀 Implementation & Development Setup Guide (v1.0)
### Project: Learning Tracker  
**Author:** Vikash Saini  
**Version:** 1.0  
**Date:** 12-11-2025

---

## 🧭 1. Purpose

This guide outlines how to **set up, run, and deploy** the Learning Tracker system using a **Docker-based environment**.  
It ensures every developer can quickly get the backend, database, and frontend connected and running consistently on their local system.

---

## 🧱 2. Tech Stack Summary

| Component | Technology | Notes |
|------------|-------------|-------|
| **Frontend** | React (Vite) + TailwindCSS | Runs locally during development |
| **Backend** | Java 17 + Spring Boot | REST API service with JPA + Validation |
| **Database** | MySQL 8.x | Containerized in Docker Compose |
| **Containerization** | Docker & Docker Compose | Manages backend and DB in local dev |
| **Cloud Platform** | AWS (EC2/RDS planned) | For production deployment |
| **CI/CD** | GitHub Actions (future) | Automated build/test/deploy pipeline |

---

## ⚙️ 3. Project Structure

```
learning-tracker/
│
├── api/                # Spring Boot backend
├── web/                # React frontend
├── infra/              # Docker & infra scripts
├── docs/               # Project documentation
└── docker-compose.yml  # Orchestrates API & MySQL containers
```

---

## 💻 4. Local Development Setup (Docker-Based)

The entire backend and database are containerized using Docker Compose, ensuring a consistent setup for all developers.

### 4.1 Prerequisites

Install the following tools:

- **Docker Desktop / Docker Engine**
- **Docker Compose (v2+)**
- **Git**
- **Node.js 22+ & npm 10+** (for running React locally)

### 4.2 Clone the Repository

```bash
git clone https://github.com/vikashsaini1234/learning-tracker.git
cd learning-tracker
```

### 4.3 Run the Application

```bash
docker-compose up --build
```

This command starts:
- `learning-tracker-api` → Spring Boot app (port 8080)
- `learning-tracker-db` → MySQL DB (port 3306)

Once up, access your components at:
- **Backend API:** http://localhost:8080/api/categories  
- **Database:** Inside Docker network (`learning-tracker-db`)  
- **Frontend (React):** Run separately via local development server

```bash
cd web
npm install
npm run dev
```
React runs at **http://localhost:5173** and connects to backend via `http://localhost:8080`.

### 4.4 Stop Containers

```bash
docker-compose down
```

### 4.5 Useful Commands

Check running containers:
```bash
docker ps
```

View logs:
```bash
docker logs learning-tracker-api
```

Access MySQL CLI inside container:
```bash
docker exec -it learning-tracker-db mysql -u root -p
```

Rebuild containers (after changes in code or Dockerfile):
```bash
docker-compose up --build --force-recreate
```

---

## 🔐 5. Environment Variables

Create a `.env` file in the root directory:

```
MYSQL_ROOT_PASSWORD=rootpass
MYSQL_DATABASE=learning_tracker
MYSQL_USER=tracker_user
MYSQL_PASSWORD=tracker_pass

SPRING_DATASOURCE_URL=jdbc:mysql://learning-tracker-db:3306/learning_tracker
SPRING_DATASOURCE_USERNAME=tracker_user
SPRING_DATASOURCE_PASSWORD=tracker_pass
```

These variables are automatically used in `docker-compose.yml` and Spring Boot configs.

---

## ☁️ 6. Deployment (Future AWS Plan)

| Component | AWS Service | Description |
|------------|-------------|--------------|
| API | **AWS ECS / Elastic Beanstalk** | Runs Dockerized Spring Boot container |
| Database | **AWS RDS (MySQL)** | Managed database service |
| Frontend | **S3 + CloudFront** | Hosts React build for production |
| CI/CD | **GitHub Actions** | Automates build/test/deploy pipeline |

---

## 🧩 7. Build & Deployment Flow

1. Developer commits changes to GitHub.  
2. Docker Compose builds and runs containers locally.  
3. CI/CD pipeline (future) will push Docker images to AWS.  
4. Production environment will run the same Docker setup via ECS.

---

## 🧠 8. Troubleshooting

| Issue | Possible Fix |
|--------|---------------|
| MySQL container fails | Remove `MYSQL_USER=root` or check `.env` |
| Port conflict on 8080/3306 | Stop previous containers or change ports in `docker-compose.yml` |
| API cannot connect to DB | Verify `SPRING_DATASOURCE_URL` and container names |
| CORS error in frontend | Ensure `@CrossOrigin` annotation is set in backend controllers |

---

## ✅ 9. Summary

- The system is **Docker-first** — backend & DB run as containers.  
- React frontend runs locally during development for faster hot reload.  
- The same setup will extend directly to **AWS ECS/RDS** for production.  
- Future updates will add CI/CD automation and full containerization of frontend.

---

### 🔖 End of Implementation & Development Setup Guide (v1.0)
