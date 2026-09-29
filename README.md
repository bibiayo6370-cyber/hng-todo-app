# Todo App

A simple MERN todo app built with AI-driven development for the HNG program.

**Live:** https://hng-todo-app-dun.vercel.app

## Features
- Name and email landing page (no password)
- Create, read, update and delete todos
- Delete requires confirmation
- Completed todos are struck through with a "Done" badge

## Stack
- Client: React, Vite, TypeScript, Tailwind, shadcn/ui, React Hook Form, Zod
- Server: Node, Express, TypeScript, Mongoose, Zod
- Database: MongoDB Atlas
- Hosting: Vercel (client), Render (API)

## Run locally
```bash
# server
cd server && cp .env.example .env   # fill in MONGODB_URI
pnpm install && pnpm dev

# client (new terminal)
cd client && cp .env.example .env
pnpm install && pnpm dev
```
Open http://localhost:5173

## Project docs
See `PRD.md` and `Agents.md`.
