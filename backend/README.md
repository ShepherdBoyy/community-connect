<div align="center">

# Community Connect - Backend

Express + MySQL REST API powering the Community Connect barangay management system.

</div>

## Tech Stack

| Technology                    | Purpose                         | Version |
| ----------------------------- | ------------------------------- | ------- |
| Node.js                       | Runtime environment             | -       |
| Express                       | Web framework / REST API        | 4.19.2  |
| MySQL                         | Database                        | -       |
| JSON Web Token (jsonwebtoken) | Authentication                  | 9.0.2   |
| bcrypt                        | Password hashing                | 5.1.1   |
| Multer                        | File/image upload handling      | 1.4.5   |
| Nodemailer                    | Sending OTP recovery emails     | 6.9.13  |
| cookie-parser                 | Reading auth cookies            | 1.4.6   |
| CORS                          | Cross-origin request handling   | 2.8.5   |
| dotenv                        | Environment variable management | 16.4.5  |

## Installation

1. Navigate into the backend directory

```bash
    cd backend
```

2. Install dependencies

```bash
    npm install
```

3. Create a `.env` file based on `.env.example` and fill in your own values

```bash
    cp .env.example .env
```

4. Import the database schema

```bash
    mysql -u your_username -p barangay_database < barangayDatabase.sql
```

5. Start the development server (auto-restarts on file changes)

```bash
   npm run dev
```

Or start it normally:

```bash
   npm start
```

6. The API will be running at `http://localhost:5000` (or whichever `PORT` you set in `.env`)

## Environment Variables

Create a `.env` file in the `backend/` directory with the following variables:

| Variable  | Description                             |
| --------- | --------------------------------------- |
| `PORT`    | Port the server runs on (e.g., `5000`)  |
| `DB_HOST` | MySQL database host (e.g., `localhost`) |
| `DB_USER` | MySQL database username |
| `DB_PASSWORD` | MySQL database password |
| `DB_DATABASE` | Database name (e.g., `barangay_database`) |
| `JWT_SECRET` | Secret key used to sign authentication tokens - use a long, random string |
| `MY_EMAIL` | Gmail address used to send OTP password recovery emails |
| `MY_PASSWORD` | Gmail App Password for the above account (not your regular Gmail password) |

A template is available in [`.env.example`](.env.example) - copy it to `.env` and fill in your own values.