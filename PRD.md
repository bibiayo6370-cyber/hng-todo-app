# PRD: Simple Todo App

## Goal
A small, live web app where a user identifies themselves with a name and email, then creates, views, edits, completes and deletes their own todos.

## Users
Anyone visiting the site. No passwords; email identifies the user.

## Features

### 1. Landing page (`/`)
- Form with **Name** and **Email** (React Hook Form + Zod).
- Validation: name required (min 2 chars), email must be valid.
- On submit: user is created (or found if the email exists), saved in the browser, redirected to `/todos`.
- If already identified, visiting `/` redirects to `/todos`.

### 2. Todo page (`/todos`)
- Greeting: "Hi, {name}" and a "Switch user" (log out) button.
- **Create**: form with Title (required, max 100) and optional Description (max 300).
- **Read**: list of the user's todos, newest first. Empty state message when none.
- **Update**: edit title/description in a dialog. Checkbox toggles complete.
- **Delete**: requires confirmation in an alert dialog ("Delete this todo? This can't be undone.").
- **Completed style**: strikethrough title, muted text, and a "Done" badge.

## Data Model

**User**: `name`, `email` (unique, lowercase), `createdAt`

**Todo**: `user` (ref User), `title`, `description`, `completed` (default false), `createdAt`, `updatedAt`

## API

| Method | Route | Purpose |
|---|---|---|
| POST | `/api/users` | Create or fetch user by email, returns user |
| GET | `/api/todos` | List current user's todos |
| POST | `/api/todos` | Create todo |
| PATCH | `/api/todos/:id` | Update title, description or completed |
| DELETE | `/api/todos/:id` | Delete todo |

The client sends the user id in an `x-user-id` header on all `/api/todos` routes. The server only returns or modifies todos owned by that user.

## UI Rules
- Only Shadcn/ui components: Button, Input, Textarea, Label, Form, Card, Checkbox, Badge, Dialog, AlertDialog, Sonner (toasts).
- Tailwind for styling. Responsive, mobile first.
- Toast on success/failure of every action.

## Out of Scope
Passwords, email verification, due dates, filters, drag and drop, tests beyond a manual check.

## Success Criteria
- All CRUD actions work; delete asks for confirmation.
- Completed todos look visibly different.
- App is live at a public URL and the code is in a private GitHub repo with `Agents.md`.
