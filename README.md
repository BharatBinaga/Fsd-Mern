# Morrow People Directory

A MERN application for managing a people directory. The React frontend supports
listing, searching, creating, editing, and deleting people. The Express API
stores each person's name, email address, and location in MongoDB.

## Requirements

- Node.js and npm
- MongoDB running locally on `mongodb://localhost:27017`

The server connects to the `MERN` database. Start MongoDB before starting the
API server.

## Project structure

```text
client/frontend/
  src/
    adduser/       Create a directory entry
    getUser/       List, search, and delete entries
    updateUsers/   Edit a directory entry
    App.jsx        Frontend routes and shared layout
    main.jsx       React entry point
  package.json     Frontend dependencies and scripts

server/
  controller/      User API handlers
  model/           Mongoose user model
  routes/          Express API routes
  index.js         API server and MongoDB connection
  package.json     Backend dependencies
```

The frontend and backend have separate package manifests and lockfiles.
Dependencies are installed separately in each application directory; the
repository root does not need an npm install.

## Install and run

Open two terminals from the project root.

### 1. Start the API server

```bash
cd server
npm install
node index.js
```

The API listens on `http://localhost:7000` and is mounted at `/api`.

### 2. Start the frontend

```bash
cd client/frontend
npm install
npm run dev
```

Open the local URL printed by Vite (usually `http://localhost:5173`).

## API endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/users` | List all people |
| `GET` | `/api/users/:id` | Get one person |
| `POST` | `/api/user` | Create a person |
| `PUT` | `/api/users/:id` | Update a person |
| `DELETE` | `/api/delete/:id` | Delete a person |

New records require `name`, `email`, and `address`. Email addresses must be
unique.

## Useful frontend scripts

Run these from `client/frontend`:

```bash
npm run dev      # Start the Vite development server
npm run build    # Create a production build in dist/
npm run preview  # Preview the production build
npm run lint     # Run ESLint
```

`node_modules/`, build output, environment files, and local editor files are
excluded from Git. The package lockfiles are included so installs can be
reproduced with `npm install`.
