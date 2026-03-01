# To-do List
This is a to-do list with draggable "post-it"-like tasks with deep customization: colour, size, \*_font colour & size, locking_

*_not yet implemented but in the works_

I created this project to learn more about and practice React. It has been a long and hard journey for me, since I was a beginner at React, Javascript, CSS and HTML at the beginning. I barely knew the basics of JS, so decided to test my own abilities and "learn as I go".

[MIT LICENSE](./LICENSE)

# Functionality
- Create new tasks & delete old ones
- Edit task title & details
- Customize tasks: resize, drag around & change colour
- Smooth animations
- Hovering over a task brings it to the front for quick view, then it goes back to its previous position
- Clicking on a task brings it to the front
- Tasks save when page is reloaded or reopened

# Tech Stack

I separated my project into 2 repositories to separate my **backend** and **frontend**:

## Frontend
React Single Page Application (SPA) that handles UI, dragging interactions, and colour theming

| Technology | Purpose |
|---|---|
| [React 19](https://react.dev/) | UI component library |
| [Vite 7](https://vite.dev/) | Build tool and dev server |
| [Motion](https://motion.dev/) | Drag-and-drop and animations |
| [ESLint](https://eslint.org/) | Code linting |

## Backend
REST API that handles task CRUD operations, colour & location persistence, and database access

| Technology | Purpose |
|---|---|
| [Node.js](https://nodejs.org/) | JavaScript runtime |
| [Express](https://expressjs.com/) | HTTP server and REST API framework |
| [PostgreSQL](https://www.postgresql.org/) | Relational database |

## Data Flow

```
┌─────────────────┐                        ┌─────────────────┐                  ┌─────────────────┐
│                 │       HTTP/REST        │                 │        SQL       │                 │
│  React + Vite   │  ──────────────────►   │   Express API   │  ──────────────► │    PostgreSQL   │
│   (Frontend)    │  ◄──────────────────   │    (Backend)    │  ◄────────────── │    (Database)   │
│                 │         JSON           │                 │      Results     │                 │
└─────────────────┘                        └─────────────────┘                  └─────────────────┘
```

# Project Structure
(temporary, will change drastically)

```
root
│
├── src/
│   ├── assets/
│   │   └── board_bg.png
│   ├── components/
│   │   ├── Board.jsx
│   │   ├── Homepage.jsx
│   │   └── TodoCard.jsx
│   ├── css/
│   │   ├── board.css
│   │   ├── homepage.css
│   │   ├── index.css
│   │   └── todo-card.css
│   ├── tasks.json
│   └── main.jsx
├── package.json
└── README.md
```

# Problems I Encountered & Fixes

- Tasks jumping around
- Task persistence between page reloads
- Task z-index updating
- External colour picker for tasks
