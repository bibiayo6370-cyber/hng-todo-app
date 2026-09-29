# Agents.md

You are building the Todo App described in `PRD.md`. Read it first. Follow this file strictly.

## Stack
- **Frontend**: React (Vite, TypeScript), Tailwind CSS, Shadcn/ui, React Hook Form, Zod, React Router
- **Backend**: Node.js, Express, Mongoose, Zod (request validation), cors, dotenv
- **Database**: MongoDB Atlas
- **Deploy**: Client on Vercel, server on Render

## Project Structure
```
/client
  src/
    components/ui/      # shadcn components (generated, don't hand-edit)
    components/         # TodoForm, TodoItem, TodoList, EditTodoDialog, DeleteTodoDialog
    pages/              # Landing.tsx, Todos.tsx
    lib/                # api.ts, schemas.ts, user.ts
/server
  src/
    models/             # User.ts, Todo.ts
    routes/             # users.ts, todos.ts
    middleware/         # requireUser.ts
    index.ts
PRD.md
Agents.md
```

## Rules
1. **Keep it simple.** No extra features, libraries or abstractions beyond the PRD.
2. **UI**: use only Shadcn/ui components. Install with `pnpm dlx shadcn@latest add <component>`. No other UI libraries.
2a. **Package manager**: use `pnpm` only. Never `npm` or `yarn`. Commit `pnpm-lock.yaml`.
3. **Forms**: every form uses React Hook Form with a Zod schema (`zodResolver`). Keep schemas in `client/src/lib/schemas.ts`.
4. **Server validation**: validate every request body with Zod. Return JSON errors as `{ "error": "message" }` with proper status codes.
5. **Ownership**: every todo query must filter by the user id from `x-user-id`.
6. **Delete** must always go through an AlertDialog confirmation.
7. **Completed** todos: strikethrough, muted text, "Done" badge.
8. **Config**: no hardcoded URLs or secrets. Use `VITE_API_URL` (client) and `MONGODB_URI`, `CLIENT_URL`, `PORT` (server). Commit `.env.example`, never `.env`.
9. **TypeScript**: no `any`. Small components, one responsibility each.
10. Handle loading and error states, and show toasts (Sonner) for results.

## Workflow (do in order, one step at a time)
1. Scaffold `/server`, connect to MongoDB, add `/api/health`.
2. Add User and Todo models and all API routes.
3. Scaffold `/client` with Tailwind and Shadcn; add needed components.
4. Build Landing page with form.
5. Build Todos page: create, list, edit, toggle, delete with confirmation.
6. Polish empty, loading and error states.
7. Write `README.md` (setup, env vars, live URL).

After each step: run the app, confirm it works, then commit.

## Commits
Small commits with prefixes: `feat:`, `fix:`, `chore:`, `docs:`. Example: `feat: add delete confirmation dialog`.

## Definition of Done
- Every PRD feature works locally and in production.
- No console errors, no secrets in git.
- `README.md` has the live URL.
