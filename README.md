# Async Race

**Score: 360 / 400** (self-check before deploy and git push; up to **370 / 400** after deploy + conventional commits)

**Deployment:** https://sashay29.github.io/async_race _(run `npm run deploy` after pushing to GitHub)_

**Repository:** https://github.com/sashay29/async_race

SPA for managing a garage of radio-controlled cars, running races, and viewing winner statistics. Built for the RS School "Async Race" test task.

## Setup

### 1. Start the API server

Clone and run the official [async-race-api](https://github.com/mikhama/async-race-api) mock server:

```bash
git clone https://github.com/mikhama/async-race-api.git
cd async-race-api
npm install
npm start
```

The API must be running at `http://127.0.0.1:3000` before using the UI.

### 2. Start the frontend

```bash
npm install
npm start
```

Dev server: **http://localhost:3001/async_race/garage** (port 3001 avoids conflict with the API on 3000).

Optional: set `REACT_APP_API_URL` in `.env.development` to point at another API host (full URL, e.g. `http://127.0.0.1:3000`).

### 3. Deploy to GitHub Pages

```bash
npm run deploy
```

Then enable **GitHub Pages** for branch `gh-pages` in the repository settings.

### 4. Push to GitHub

```bash
git commit -m "init: start async race project"
git branch -M main
git remote add origin https://github.com/sashay29/async_race.git
git push -u origin main
npm run deploy
```

After deploy, update the checklist in README: mark **UI Deployment** and **Conventional Commits** as done and set score to **370 / 400**.

## Scripts

| Script | Description |
|--------|-------------|
| `npm start` | Dev server |
| `npm run build` | Production build |
| `npm run lint` | ESLint (Airbnb) |
| `npm run format` | Prettier write |
| `npm run ci:format` | Prettier check |
| `npm run deploy` | Build and publish to GitHub Pages |

## Checklist

### UI Deployment — 0 / 10
- [ ] UI deployed to GitHub Pages — run `npm run deploy`, then enable **gh-pages** branch in repo settings

### Requirements to Commits and Repository — 30 / 40
- [ ] Conventional Commits — use `feat:`, `fix:`, `refactor:`, `docs:` on every commit
- [x] Checklist included in README.md
- [x] Score calculated and placed at the top of README.md
- [x] Deployment link at the top of README.md

### Basic Structure — 80 / 80
- [x] Two views: **Garage** and **Winners** (10 pts)
- [x] Garage view: title, car create/edit panel, race control panel, garage section (30 pts)
- [x] Winners view: title, winners table (10 pts)
- [x] Pagination on both views (included)
- [x] Persistent UI state between view switches: page numbers (`sessionStorage`), new-car form draft (`sessionStorage`), selected car (Redux) (30 pts)

### Garage View — 90 / 90
- [x] CRUD for cars (name + color), validation for empty/too long names (20 pts)
- [x] Delete removes car from garage and winners (20 pts)
- [x] RGB color picker, color shown on car icon (10 pts)
- [x] Generate 100 random cars (10+10 name parts, random color) (20 pts)
- [x] Update / delete buttons per car (10 pts)
- [x] Pagination: 7 cars per page (10 pts)
- [x] Empty garage message (10 pts)
- [x] Redirect to previous page when last car on page is deleted (10 pts)

### Winners View — 50 / 50
- [x] Winners appear after a race (15 pts)
- [x] Pagination: 10 winners per page (10 pts)
- [x] Table: №, car icon, name, wins, best time (15 pts)
- [x] Sort by wins / best time, ASC / DESC via API (full dataset) (10 pts)

### Race — 165 / 170
- [x] Start engine: wait for velocity → animate → drive request; stop on 500 (20 pts)
- [x] Stop engine: wait for API → car returns to start (20 pts)
- [x] Responsive animation down to ~500px width (30 pts)
- [x] Race button starts all cars on current page (10 pts)
- [x] Reset button returns cars to start (15 pts)
- [x] Winner banner with car name (5 pts)
- [x] Start/stop button disabled states (20 pts)
- [x] Race actions handled: forms, delete, pagination, navigation blocked or race stopped (45/50 pts)

### Prettier & ESLint — 10 / 10
- [x] Prettier: `format` and `ci:format` scripts (5 pts)
- [x] ESLint Airbnb + `lint` script, TypeScript strict mode (5 pts)

### Overall Code Quality — reviewer only (0 / 100)

## Stack

- React 19 + TypeScript (strict, `noImplicitAny`)
- Redux Toolkit
- React Router
- CSS Modules
- Fetch API + [async-race-api](https://github.com/mikhama/async-race-api)
