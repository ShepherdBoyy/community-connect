<div align="center">

# Community Connect - Frontend

React client application

</div>

## Tech Stack

| Technology                 | Purpose                          | Version |
| -------------------------- | -------------------------------- | ------- |
| React                      | UI library                       | 18.2.0  |
| React Router DOM           | Client-side routing              | 6.23.0  |
| React Bootstrap            | UI components                    | 2.10.2  |
| Bootstrap                  | Base styling framework           | 5.3.3   |
| Bootstrap Icons            | Icon set                         | 1.11.3  |
| React Data Table Component | Sortable/searchable data tables  | 7.6.2   |
| Axios                      | HTTP requests to the backend API | 1.6.8   |
| Vite                       | Build tool & dev server          | 5.2.0   |

## Installation

1. Navigate into the frontend directory

```bash
    cd frontend
```

2. Install dependencies

```bash
    npm install
```

3. Start the development server

```bash
    npm run dev
```

4. Open your browser and go to the local URL shown in the terminal (usually `http://localhost:5173`)

> **Note:** This frontend is configured to call the live backend at
> `https://community-connect-backend.onrender.com`. To run it against a local backend instead,
> update the API base URL in the relevant components (e.g., `Login.jsx`, `ChangeUserPass.jsx`)
> to point to your local backend, such as `http://localhost:5000`.