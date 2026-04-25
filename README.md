# 🎨 Excalidraw Clone (Real-time Collaborative Drawing App)

A full-stack, real-time drawing application inspired by Excalidraw.
This project enables users to create, share, and collaborate on diagrams in real-time with authentication and persistent storage.

---

## 🚀 Features

* ✏️ Real-time collaborative drawing (WebSockets)
* 🔐 User authentication (JWT-based)
* 🧠 Persistent storage using PostgreSQL + Prisma
* ⚡ Monorepo architecture (Turbo + Bun)
* 🌐 REST API for user and room management
* 📡 WebSocket server for live updates
* 🎯 Scalable backend structure

---

## 🏗️ Tech Stack

### Frontend

* React (Next.js / Vite)
* Canvas API

### Backend

* Node.js + Express
* WebSockets (`ws`)

### Database

* PostgreSQL (Docker)
* Prisma ORM

### Tooling

* TurboRepo (monorepo)
* Bun (package manager + runtime)
* TypeScript

---

## 📁 Project Structure

```
excalidraw/
│
├── apps/
│   ├── web/        # Frontend (drawing UI)
│   ├── api/        # REST API (auth, rooms, etc.)
│   └── ws/         # WebSocket server (real-time sync)
│
├── packages/
│   └── database/   # Prisma client + schema
│
├── turbo.json
├── package.json
```

---

## ⚙️ Getting Started

### 1. Clone the repo

```bash
git clone <your-repo-url>
cd excalidraw
```

---

### 2. Install dependencies

```bash
bun install
```

---

### 3. Start PostgreSQL (Docker)

```bash
docker run --name postgres-db \
  -e POSTGRES_PASSWORD=mysecretpassword \
  -p 5432:5432 -d postgres
```

---

### 4. Setup environment variables

Create `.env` inside `packages/database`:

```env
DATABASE_URL="postgresql://postgres:mysecretpassword@localhost:5432/postgres"
```

Create `.env` inside `apps/api`:

```env
JWT_SECRET="your_secret_key"
```

---

### 5. Run database migrations

```bash
bunx prisma migrate dev
```

---

### 6. Start development servers

```bash
bun run dev
```

This runs:

* Frontend (`web`)
* API server (`api`)
* WebSocket server (`ws`)

---

## 🔐 Authentication

* Signup & Signin endpoints
* Password hashing using bcrypt
* JWT-based authentication
* Protected routes via middleware

---

## 📡 WebSocket Flow

* Client connects to WS server
* Sends drawing events
* Server broadcasts updates to all connected clients
* Enables real-time collaboration

---

## 🧪 API Endpoints (Sample)

### Auth

* `POST /signup`
* `POST /signin`

### Protected

* `GET /me` (requires JWT)

---

## 🛠️ Development Notes

* Uses **workspace packages** for shared DB client
* Prisma client is exported from `@repo/database`
* All services run in parallel using Turbo

---

## 🚧 Future Improvements

* 🧑‍🤝‍🧑 Multi-user rooms
* 💾 Autosave drawings
* 🔗 Shareable links
* 🧾 Version history
* 🎨 Advanced drawing tools
* 🔄 CRDT or OT for conflict resolution

---

## 🤝 Contributing

Pull requests are welcome. For major changes, please open an issue first.

---

## 📄 License

MIT

---

## 💡 Inspiration

Inspired by the amazing open-source project Excalidraw.

---

## 👨‍💻 Author

Built by divi 🚀
