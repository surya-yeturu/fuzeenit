# FUZEN IT

Professional technology education platform built with the MERN stack.

## Technology Stack

**Frontend:** React, Vite, React Router, Tailwind CSS, Framer Motion, Axios

**Backend:** Node.js, Express.js

**Database:** MongoDB, Mongoose

## Project Structure

```
fuze/
├── client/          # React frontend (Vite)
├── server/          # Express backend API
├── .env.example     # Environment variables template
└── README.md
```

## Prerequisites

- Node.js 18+
- MongoDB (local or Atlas)

## Installation

```bash
# Install all dependencies
npm run install:all

# Copy environment files
cp .env.example .env
cp client/.env.example client/.env
cp server/.env.example server/.env   # or copy root .env to server/
```

## Environment Setup

### Root / Server (`.env`)

```
MONGODB_URI=mongodb://localhost:27017/fuzen-it
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:5173
```

### Client (`client/.env`)

```
VITE_API_URL=http://localhost:5000/api
```

## MongoDB Setup

1. Install MongoDB locally **or** create a free cluster on [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Set `MONGODB_URI` in `server/.env` (example: `mongodb://localhost:27017/fuzen-it` or your Atlas connection string)
3. Seed the database with sample data:

```bash
npm run seed
```

## Running Locally

Start the backend and frontend together, or in separate terminals:

```bash
# Both at once
npm run dev

# Or separately
npm run dev:server   # Terminal 1
npm run dev:client   # Terminal 2
```

- Frontend: http://localhost:5173
- Backend API: http://localhost:5000/api
- Health check: http://localhost:5000/api/health

## Logo Setup

Place the official FUZEN IT logo source file (white background PNG) and run:

```bash
npm run process-logo path/to/source-logo.png
```

This generates transparent assets in `client/public/`:
- `logo.png` — for light backgrounds (navbar, white sections)
- `logo-light.png` — for dark backgrounds (footer, dark sections)
- `favicon.png`

## API Documentation

### Courses

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/courses` | List courses (search, filter, sort, pagination) |
| GET | `/api/courses/featured` | Featured courses |
| GET | `/api/courses/:slug` | Course by slug |
| POST | `/api/courses` | Create course (admin-ready) |
| PUT | `/api/courses/:id` | Update course (admin-ready) |
| DELETE | `/api/courses/:id` | Delete course (admin-ready) |

**Query params for GET /api/courses:**
- `search` — text search
- `category` — category slug (e.g. `ai-data`)
- `sort` — `newest`, `title`, `level`, `duration`
- `page` — page number
- `limit` — items per page

### Categories

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/categories` | List all categories |

### Resources

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/resources` | List resources |
| GET | `/api/resources/:slug` | Resource by slug |

### Enquiries

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/enquiries` | Submit expert enquiry |

### Contact

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/contact` | Submit contact form |

## Build for Production

```bash
# Build frontend
npm run build

# Start production server
npm start --prefix server
```

Serve the built frontend (`client/dist`) via a static host or configure Express to serve it.

## Deploy to GitHub Pages

GitHub Pages hosts the **React frontend only**. The Express/MongoDB backend must be deployed separately (e.g. [Render](https://render.com), [Railway](https://railway.app)).

### 1. Create a GitHub repository

```bash
git init
git add .
git commit -m "Initial commit: FUZEN IT MERN platform"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/fuzen-it.git
git push -u origin main
```

### 2. Enable GitHub Pages

1. Open your repo on GitHub → **Settings** → **Pages**
2. Under **Build and deployment**, set **Source** to **GitHub Actions**

### 3. Add API secret (required for live data)

After deploying the backend, add a repository secret:

- **Name:** `VITE_API_URL`
- **Value:** `https://your-backend-url.com/api`

Go to **Settings** → **Secrets and variables** → **Actions** → **New repository secret**.

### 4. Automatic deploy

Every push to `main` triggers `.github/workflows/deploy-pages.yml` and publishes the site to:

```
https://YOUR_USERNAME.github.io/fuzen-it/
```

(Replace `fuzen-it` with your repository name.)

### Local GitHub Pages build test

```bash
cd client
npm install
set VITE_BASE_PATH=/fuzen-it/
set GITHUB_PAGES=true
npm run build:pages
```

## Features

- Responsive professional UI (black, white, red brand palette)
- Dynamic courses from MongoDB with search, filter, sort, pagination
- Course detail pages with curriculum, projects, FAQ
- Resources/blog system
- Contact and expert enquiry forms with validation
- Rate limiting, Helmet, CORS, input sanitization
- SEO with dynamic meta tags and structured data
- Lazy-loaded routes and subtle Framer Motion animations
- Admin-ready API architecture for future dashboard

## License

Proprietary — FUZEN IT
