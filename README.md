# CodeAlpha Project Management

## Overview
This is a **full-stack project management application** built during my Full Stack Software Engineering training.  

- The **backend is fully functional**, including authentication, project management, and WebSocket notifications.  
- The **frontend is partially implemented** and currently experiencing some issues due to API integration and state management errors, which can result in blank pages on certain routes.

---

## Features (Backend)
- User registration and login with JWT authentication
- CRUD operations for projects
- Task, comment, and notification management
- **Real-time notifications using WebSockets**
- Secure endpoints protected by JWT

---

## Frontend Status & Challenges
- The frontend uses React with Context API for state management.
- **Challenges faced during development:**
  - Blank pages on dashboard and project routes
  - Errors in API calls from React due to incorrect axios imports or token handling
  - Authentication state sometimes not initializing properly, causing navigation issues
  - Overall frontend integration with backend is incomplete
- Authentication and API integration are partially working, but the UI may not display correctly.

---

## Tech Stack
- **Backend:** Node.js, Express, Prisma, PostgreSQL/MySQL (or your DB)
- **Frontend:** React, TypeScript, Context API
- **Authentication:** JWT
- **API Requests:** Axios
- **Real-time Communication:** WebSockets

---

## Running Locally
1. Clone the repository:
   ```bash
   git clone https://github.com/michael-lfc/CodeAlpha_ProjectManagement.git
