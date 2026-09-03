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

| Variable      | Description                                                                |
| ------------- | -------------------------------------------------------------------------- |
| `PORT`        | Port the server runs on (e.g., `5000`)                                     |
| `DB_HOST`     | MySQL database host (e.g., `localhost`)                                    |
| `DB_USER`     | MySQL database username                                                    |
| `DB_PASSWORD` | MySQL database password                                                    |
| `DB_DATABASE` | Database name (e.g., `barangay_database`)                                  |
| `JWT_SECRET`  | Secret key used to sign authentication tokens - use a long, random string  |
| `MY_EMAIL`    | Gmail address used to send OTP password recovery emails                    |
| `MY_PASSWORD` | Gmail App Password for the above account (not your regular Gmail password) |

A template is available in [`.env.example`](.env.example) - copy it to `.env` and fill in your own values.

## Project Structure

```
backend/
├── public/
│   └── images/                    # Uploaded official photos (served statically)
├── routes/
│   └── AdminRoute.js              # All API routes — auth, officials, residents, history
├── scripts/
│   └── hashExistingPasswords.js   # One-off migration script for password hashing
├── utils/
│   └── db.js                      # MySQL connection setup
├── .env.example                   # Template for required environment variables
├── schema.sql                     # Database schema (tables only, no data)
├── index.js                       # App entry point
└── package.json
```

## API Overview

All routes are prefixed with `/auth`. Below is a summary grouped by resource.

### Authentication

| Method | Endpoint               | Description                       |
| ------ | ---------------------- | --------------------------------- |
| POST   | `/adminlogin`          | Log in and receive a JWT token    |
| GET    | `/logout`              | Clear the auth token              |
| POST   | `/verify_password`     | Verify the current admin password |
| PUT    | `/change_password`     | Update admin email and password   |
| POST   | `/add_account`         | Create a new admin account        |
| POST   | `/send_recovery_email` | Send an OTP for password recovery |

### Barangay Officials

| Method | Endpoint               | Description                            |
| ------ | ---------------------- | -------------------------------------- |
| POST   | `/add_official`        | Add a new official (with photo upload) |
| GET    | `/official`            | Get all officials                      |
| GET    | `/official/:id`        | Get a single official by ID            |
| PUT    | `/edit_official/:id`   | Update an official's details           |
| DELETE | `/delete_official/:id` | Remove an official                     |

### Residents

| Method | Endpoint               | Description                         |
| ------ | ---------------------- | ----------------------------------- |
| POST   | `/add_resident`        | Add a new resident                  |
| GET    | `/residents`           | Get all residents                   |
| GET    | `/residents/:id`       | Get a single resident by ID         |
| PUT    | `/edit_residents/:id`  | Update a resident's details         |
| DELETE | `/delete_resident/:id` | Remove a resident (logs to history) |

### Households & Dashboard Stats

| Method | Endpoint                           | Description                            |
| ------ | ---------------------------------- | -------------------------------------- |
| GET    | `/household_record`                | Get all households                     |
| GET    | `/household_members/:house_number` | Get all residents under a house number |
| GET    | `/residents_count`                 | Get total resident count               |
| GET    | `/male_count`                      | Get total male resident count          |
| GET    | `/female_count`                    | Get total female resident count        |
| GET    | `/household_count`                 | Get total household count              |

### History

| Method | Endpoint          | Description                          |
| ------ | ----------------- | ------------------------------------ |
| GET    | `/history`        | Get deletion history log             |
| POST   | `/delete_history` | Remove an entry from the history log |
