# Fullstack CRUD Starter

🚀 A lightweight fullstack CRUD starter kit with Express, EJS, Tailwind CSS, HTMX, Drizzle ORM, and SQLite.
Perfect for rapid prototyping, learning fullstack concepts, or building simple web apps with modern tooling.

## Features

- **Express** – backend routing
- **EJS** – templating with partials & layouts
- **Tailwind CSS** – utility-first styling
- **HTMX** – dynamic UI updates with minimal JavaScript
- **Drizzle ORM + SQLite** – simple and modern database stack
- **TypeScript, ESLint, Prettier, and hot-reload dev setup**

## Getting Started

```sh
# Install dependencies
pnpm install

# Generate SQL migrations
pnpm db:generate

# Run database migrations
pnpm db:migrate

# Build (compile TypeScript & process CSS)
pnpm build

# Run development
pnpm dev
```

Visit http://localhost:*PORT_FROM_DOT_ENV*
after starting the server.