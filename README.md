# CatchMyBus 🚌

A full-stack bus schedule and route-finder web app built for local commuters in the Belthangady/Moodbidire region — helping users find upcoming buses to their destination, and giving admins a dashboard to manage routes, schedules, and buses.

> Built as a team project (4 members) — I was the backend developer, responsible for the API, authentication, and admin functionality.

---

## Features

### For Users
- **Search buses by destination** — free-text search returns upcoming buses only, sorted by soonest departure
- **Departure-board style homepage** — cream/navy/orange themed UI showing popular destinations and live schedule results
- **AI chatbot** — answers questions about destinations and timings using real backend data (not hardcoded)
- **Live visitor counter** — tracks unique daily visitors
- **Notify me** — opt-in browser notifications 10 and 5 minutes before a bus's departure

### For Admins
- **JWT-authenticated admin login**
- **Full CRUD on buses and schedules** — add, edit, delete buses, including batch-adding multiple departure times for the same bus/destination in one go
- **Live dashboard** — real counts of buses, destinations, and visitors (no hardcoded/dummy data)
- **Toast notifications** for success/error feedback on all admin actions

---

## Tech Stack

| Layer     | Technology                     |
|-----------|---------------------------------|
| Frontend  | React (Vite)                   |
| Backend   | Node.js, Express                |
| Database  | MySQL                           |
| Auth      | JWT + bcrypt                    |
| Other     | react-toastify, browser Notification API |

---

## Database Schema

- **admins** — id, username (unique), password_hash
- **buses** — id, bus_name, service_type
- **destinations** — id, destination_name
- **schedules** — id, bus_id, destination_id, departure_time

---

## Project Structure

```
catchmybus/
├── catchmybus-backend/     # Express API, MySQL queries, JWT auth
└── Frontend/               # React app
    └── src/
        ├── components/     # Navbar, Hero, SearchBox, BusTable, Chatbot, Footer, etc.
        └── pages/          # Dashboard, Login, AddBus, EditBus, ManageBus
```

---

## Local Setup

### Prerequisites
- Node.js (LTS)
- MySQL Server

### 1. Clone the repo
```bash
git clone <your-repo-url>
cd catchmybus
```

### 2. Backend setup
```bash
cd catchmybus-backend
npm install
```

Create a `.env` file in `catchmybus-backend/`:
```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=catchmybus1
JWT_SECRET=your_jwt_secret
PORT=5000
```

Run the SQL schema (see `/schema.sql` if included, or set up the four tables listed above) and start the server:
```bash
npm run dev
```

### 3. Frontend setup
```bash
cd ../Frontend
npm install
npm run dev
```

The app will be available at `http://localhost:5173` (frontend) with the API running on `http://localhost:5000`.

> **Note:** This project is not yet deployed. It currently runs locally only — deployment (Vercel + Render/Railway) is planned next.

---

## API Overview

| Method | Route                          | Description                          | Auth |
|--------|----------------------------------|---------------------------------------|------|
| GET    | `/buses`                        | List all buses                        | No   |
| GET    | `/destinations`                 | List all destinations                 | No   |
| GET    | `/search?destination=`          | Upcoming buses to a destination       | No   |
| GET    | `/visits`                       | Get visitor count                     | No   |
| POST   | `/visits/increment`             | Increment daily visitor count         | No   |
| POST   | `/admin/register`               | Create admin account                  | No   |
| POST   | `/admin/login`                  | Admin login, returns JWT              | No   |
| GET    | `/admin/dashboard`               | Dashboard stats                       | Yes  |
| GET    | `/admin/buses`                  | All schedules (admin view)            | Yes  |
| POST   | `/admin/buses`                  | Add bus + schedule(s)                 | Yes  |
| PUT    | `/admin/buses/:id`               | Edit a bus + schedule                 | Yes  |
| DELETE | `/admin/buses/:id`                | Delete a bus + its schedules          | Yes  |
| GET    | `/admin/schedules/:scheduleId`   | Get one schedule                      | Yes  |
| DELETE | `/admin/schedules/:id`           | Delete one schedule (multi-time bus)  | Yes  |

---

## Screenshots

*(Coming soon)*

| Homepage | Search Results | Admin Dashboard |
|----------|-----------------|-------------------|
| _placeholder_ | _placeholder_ | _placeholder_ |

---

## Scope Decisions

- No live GPS bus tracking — only scheduled departure times
- No bus route numbers (operator data unavailable)
- Only departure times are shown, not estimated arrival
- Destinations and search consolidated onto the homepage (dropped a separate Destinations page) to keep the experience simple for local users

---

## Roadmap

- [ ] Deploy (Vercel for frontend, Render/Railway for backend + MySQL)
- [ ] Add screenshots
- [ ] Minor bug: sidebar active-link highlight in admin panel

---

## Author

**Akshatha** — Backend Developer
Final-year BCA student, Alva's College
