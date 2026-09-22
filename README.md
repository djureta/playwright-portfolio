# Playwright Automation Portfolio

A test automation framework built to demonstrate full-stack QA engineering — from UI interactions to API validation and database integrity checks. The project tests a live hotel booking platform covering authentication, room management, and the complete reservation flow.

Built with Playwright and TypeScript, using Page Object Model pattern, environment-based configuration, and automated CI/CD pipeline via GitHub Actions with a PostgreSQL database provisioned through Docker.

## Tech Stack

| Tool                    | Purpose                        |
| ----------------------- | ------------------------------ |
| Playwright + TypeScript | E2E and API test automation    |
| PostgreSQL              | Database layer validation      |
| Docker                  | Database provisioning in CI/CD |
| GitHub Actions          | Continuous Integration         |

## Test Coverage

| Layer    | Scope                                         |
| -------- | --------------------------------------------- |
| UI       | Authentication, room management, booking flow |
| API      | Rooms and bookings CRUD endpoints             |
| Database | Data integrity validation with JOIN queries   |

## Project Structure

├── pages/ # Page Object Model
├── tests/
│ ├── ui/ # UI tests
│ └── api/ # API + DB tests
├── db/ # Schema and database client
└── helpers/ # Shared base classes

## Setup

```bash
npm install
npx playwright install
```

Create `.env`:
BASE_URL=https://automationintesting.online
ADMIN_USERNAME=your_username
ADMIN_PASSWORD=your_password
DB_HOST=localhost
DB_PORT=5432
DB_NAME=testdb
DB_USER=your_db_user
DB_PASSWORD=your_db_password

## Run Tests

```bash
npx playwright test              # all tests
npx playwright test tests/ui/    # UI only
npx playwright test tests/api/   # API only
npx playwright show-report       # view HTML report
```
