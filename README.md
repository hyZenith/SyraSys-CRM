# SyraCRM

This is a production-ready CRM monorepo scaffold using pnpm workspaces and Turborepo.

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (>= 22.0.0)
- pnpm (v11+)
- Docker and Docker Compose (for running the PostgreSQL database)

## Running the Application Locally

Follow these steps to get the application up and running on your local machine:

### 1. Install Dependencies

Install all the required dependencies across the monorepo:

```bash
pnpm install
```

### 2. Environment Variables

Create your local environment variables file by copying the example:

```bash
cp .env.example .env
```

*(Optional) You can edit `.env` to customize settings if needed. The default `.env.example` comes with out-of-the-box configurations suitable for local development.*

### 3. Start the Database Infrastructure (Optional)

If you do not have an external PostgreSQL database (like Neon, Supabase, etc.), you can start a local one using Docker:

```bash
pnpm compose:up
```

*Note: To stop the database later, you can run `pnpm compose:down`.*

**If you are using a hosted database provider like Neon:**
You can skip this step! Just make sure your Neon connection string is set as the `DATABASE_URL` in your `.env` file and proceed directly to Step 4.

### 4. Setup the Database Schema

With the database running, generate the Prisma client, apply migrations, and optionally seed the database:

```bash
# Generate the Prisma client
pnpm db:generate

# Apply migrations to the local database
pnpm db:migrate:dev

# (Optional) Seed the database with initial data
pnpm db:seed
```

### 5. Start the Development Server

Finally, run the development server. This command will start both the frontend and backend applications in parallel:

```bash
pnpm dev
```

- **Frontend Application:** http://localhost:5173
- **Backend API:** http://localhost:4000/api
