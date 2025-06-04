# Maritime Tracking Dashboard

A live maritime-tracking dashboard that displays simulated vessel “targets” on a table and an interactive Mapbox map, with real-time updates pushed via WebSocket. This project demonstrates a responsive, component-driven UI with a lightweight backend serving live data.

---

## 🚀 Tech Stack

### Frontend

- **React (Vite)**
- **React Query**
- **Zustand**
- **Material UI (MUI)**
- **React Mapbox GL**

**Why:**

- **Vite** offers fast builds and instant HMR.
- **React Query** manages both REST and WebSocket data as a single source of truth.
- **Zustand** handles minimal UI state (e.g. selected target).
- **MUI** provides accessible UI components with minimal styling overhead.
- **react-mapbox-gl** simplifies integrating Mapbox into React apps.

### Backend

- **Node.js** with **Fastify** (TypeScript)
- **Socket.IO** via `fastify-socket.io`

**Why:**

- **Fastify** is fast, schema-validated, and TypeScript-friendly.
- **Socket.IO** simplifies real-time communication, supports auto-reconnect, and event-based messaging.

### Infrastructure

- **Docker / Docker Compose**

**Why:**

- Containerized dev/prod environments with shared networking between frontend and backend.

### Tooling

- **Monorepo** via Turborepo + pnpm Workspaces
- **Linting & Formatting**: ESLint, Prettier
- **Testing**: Jest + React Testing Library

---

## 📦 Prerequisites

- Node.js v16+ (Recommended: v18+)
- pnpm ≥ 7.x (`npm install -g pnpm`)
- Docker & Docker Compose
- Mapbox Access Token (get one at [mapbox.com](https://mapbox.com))

---

## 🔧 Getting Started

Clone the Repository:

```bash
git clone https://github.com/zippydev1000/maritime-dashboard.git
cd maritime-dashboard
```

Create and Configure Environment Variables (inside the frontend app):

```bash
cd apps/web
cp .env.example .env
```

Edit `apps/web/.env` with your values:

```
VITE_MAPBOX_TOKEN=<your_mapbox_access_token>
VITE_API_BASE_URL=http://localhost:4000/api
VITE_SOCKET_HOST=ws://localhost:4000
VITE_SOCKET_PATH=/stream
```

Go back to the root directory:

```bash
cd ../../
```

**Install Dependencies:**

```bash
pnpm install
```

**Build Internal Packages (required before local development):**

```bash
pnpm build
```

**Re-install Dependencies after Build:**

```bash
pnpm install
```

Start the Application:

```bash
pnpm dev
```

---

## 🧪 Running Tests

```bash
pnpm test
```

---

## ⚖️ Trade-offs

### Monorepo vs Multiple Repos

- ✅ Easier CI/CD, shared dependencies
- ❌ Larger repo size, slower installs with many packages

### Fastify vs Express

- ✅ Faster, built-in validation, better JSON handling
- ❌ Smaller ecosystem

---

## 🔮 Future Improvements

- **Persist map view & selected target:** Save view state to localStorage.
- **Authentication (JWT):** Secure Socket.IO connection with token.
- **Monitoring:** Add APM, structured JSON logging
- **Testing:** Achieve 90%+ coverage and introduce contract testing (e.g. Pact).

---

## 📄 License

MIT

---

## 👨‍💻 Author

**ZippyDev**  
[GitHub](https://github.com/zippydev1000)
