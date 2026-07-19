You are a Principal Software Architect and Senior Full Stack Engineer.

Your task is to build a production-ready, enterprise-grade CRM monorepo from scratch using the latest stable versions of every dependency. Do NOT use deprecated packages, APIs, or outdated configuration. Always follow the latest official documentation.

Your goal is to create a scalable codebase that can be maintained for years by multiple developers.

------------------------------------------------------------
GENERAL REQUIREMENTS
------------------------------------------------------------

- Use the latest stable versions of all packages.
- Use strict TypeScript everywhere.
- Follow SOLID principles.
- Follow Clean Architecture where appropriate.
- Follow modular architecture.
- Avoid duplicate code.
- Use reusable packages.
- Use environment variables correctly.
- Use modern tooling and configuration.
- Ensure everything compiles without warnings or errors.
- Follow production best practices.
- Prefer composition over inheritance.
- Keep the codebase highly scalable.

------------------------------------------------------------
TECH STACK
------------------------------------------------------------

Package Manager
- pnpm

Monorepo
- Turborepo

Frontend
- React
- Vite
- TypeScript

Backend
- NestJS
- TypeScript

Database
- PostgreSQL
- Prisma ORM

Frontend Libraries
- Tailwind CSS
- shadcn/ui
- React Router DOM
- React Hook Form
- Zod
- TanStack Query
- TanStack Table
- Recharts
- Lucide React

Backend Libraries
- JWT
- Passport
- Passport JWT
- bcrypt
- class-validator
- class-transformer
- Helmet
- Compression
- Cookie Parser
- ConfigModule
- CORS

Development
- ESLint (latest Flat Config)
- Prettier
- Husky
- lint-staged
- Commitlint
- Conventional Commits
- dotenv
- tsx
- Vitest

Infrastructure
- Docker
- Docker Compose

------------------------------------------------------------
REPOSITORY STRUCTURE
------------------------------------------------------------

crm/

apps/
    frontend/
    api/

packages/
    ui/
    types/
    database/
    utils/
    validation/
    constants/
    api-client/
    auth/

tooling/
    eslint/
    prettier/
    typescript/
    tailwind/
    scripts/

infra/
    docker/
        postgres/
        nginx/
    monitoring/

docs/

.github/
    workflows/

.husky/

package.json
pnpm-workspace.yaml
turbo.json
docker-compose.yml
README.md

------------------------------------------------------------
PACKAGES
------------------------------------------------------------

packages/database

Contains

- Prisma schema
- Prisma migrations
- Seed scripts
- Generated Prisma Client
- Database helper functions

Must export

import { prisma } from "@crm/database"

------------------------------------------------------------

packages/ui

Contains

- Shared shadcn components
- Shared layouts
- Buttons
- Inputs
- Dialogs
- Tables
- Forms

------------------------------------------------------------

packages/types

Contains

- Shared interfaces
- DTOs
- API response types
- Generic utility types

------------------------------------------------------------

packages/constants

Contains

- Enums
- Roles
- Permissions
- Status values
- Application constants

------------------------------------------------------------

packages/validation

Contains shared Zod schemas used by both frontend and backend.

Examples

CreateCustomerSchema

UpdateLeadSchema

LoginSchema

RegisterSchema

------------------------------------------------------------

packages/api-client

Contains

- Typed API SDK
- Fetch wrapper
- Authentication interceptor
- Error handling
- Query helpers

Usage example

customerApi.getAll()

leadApi.create()

authApi.login()

------------------------------------------------------------

packages/auth

Contains

- Shared auth types
- JWT payload types
- Permission helpers
- Role helpers
- Authentication utilities

------------------------------------------------------------
TOOLING
------------------------------------------------------------

Centralize all configuration.

tooling/eslint

tooling/prettier

tooling/typescript

tooling/tailwind

tooling/scripts

Avoid duplicated configuration files.

------------------------------------------------------------
TASKS
------------------------------------------------------------

1. Create the latest Turborepo workspace.

2. Remove all demo/example apps and packages.

3. Create the repository structure exactly as described above.

4. Configure pnpm workspaces.

5. Configure Turborepo.

6. Configure TypeScript.

7. Configure path aliases.

8. Configure ESLint.

9. Configure Prettier.

10. Configure Husky.

11. Configure lint-staged.

12. Configure Commitlint.

13. Configure EditorConfig.

14. Configure .gitignore.

15. Configure Docker.

16. Configure PostgreSQL container.

17. Configure Prisma.

18. Configure shared Prisma Client.

19. Configure frontend.

20. Configure Tailwind.

21. Configure shadcn/ui.

22. Configure React Router.

23. Configure TanStack Query.

24. Configure backend.

25. Configure ConfigModule.

26. Configure Helmet.

27. Configure Compression.

28. Configure Cookie Parser.

29. Configure JWT.

30. Configure Passport.

31. Configure logging.

32. Configure production scripts.

33. Configure development scripts.

34. Configure Turbo pipeline.

35. Configure all shared packages.

------------------------------------------------------------
SCRIPTS
------------------------------------------------------------

Root package.json should include

dev

build

lint

lint:fix

format

typecheck

test

clean

prepare

------------------------------------------------------------
QUALITY REQUIREMENTS
------------------------------------------------------------

Everything must

- compile successfully
- pass TypeScript checks
- use strict typing
- use modern configuration
- avoid deprecated APIs
- avoid unnecessary dependencies
- support scalable architecture
- support future microservices
- support future mobile applications
- support future worker services

------------------------------------------------------------
VERIFICATION
------------------------------------------------------------

After setup

Verify

- pnpm install
- pnpm dev
- pnpm build
- pnpm lint
- pnpm typecheck

Confirm

- Frontend starts correctly
- Backend starts correctly
- Prisma works correctly
- Turborepo detects every workspace
- Shared packages resolve correctly
- TypeScript path aliases work correctly

------------------------------------------------------------
OUTPUT
------------------------------------------------------------

For every change

1. Explain why it is needed.
2. Show terminal commands before creating files.
3. Show complete file contents.
4. Never skip steps.
5. Follow the latest official documentation.
6. If there are multiple valid approaches, explain the trade-offs and recommend the best one.
7. Optimize the repository for long-term maintainability and enterprise-scale development.