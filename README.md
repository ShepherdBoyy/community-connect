<div align="center">

# Community Connect

A barangay management system that centralizes and simplifies the administration of resident information, households, and barangay records.

![React](https://img.shields.io/badge/React-18.2-61DAFB?logo=react&logoColor=white)
![Express](https://img.shields.io/badge/Express-4.19-000000?logo=express&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-4479A1?logo=mysql&logoColor=white)

</div>

## Preview

<table>
  <tr>
    <td align="center"><b>Login</b></td>
    <td align="center"><b>Dashboard</b></td>
  </tr>
  <tr>
    <td><img src=".github/preview-login.png" width="600"/></td>
    <td><img src=".github/preview-dashboard.png" width="600"/></td>
  </tr>
</table>

## About

Community Connect is a full-stack barangay management system built to digitize and simplify 
the administration of resident and household records. It replaces scattered, manual 
record-keeping with a centralized platform where barangay staff can manage official records, 
resident profiles, and household data in one place.

The system features an interactive dashboard summarizing key demographics — total population, 
male/female resident counts, and total households — giving administrators a quick, accurate 
overview at a glance.

This project was built individually for a Software Engineering course, developed as a 
full-stack application with a separate React frontend and an Express/MySQL backend.

## Features

- Interactive dashboard displaying total population, male/female resident counts, and total households
- Barangay Officials Management — add, update, view, and remove official records with photo upload
- Resident Records module with search functionality for managing digital resident profiles
- Household Records module tracking households and their members, grouped by house number
- Deletion history log for tracking removed resident records and reasons
- Admin authentication with JWT-based session management
- OTP-based password recovery sent via email
- Ability to update admin email and password through account settings

## Project Setup

This project is split into two parts, each with its own setup instructions and tech stack:

- [`backend/`](backend/README.md) — Express + MySQL REST API
- [`frontend/`](frontend/README.md) — React client application

See each folder's README for installation steps, environment variables, and project structure.

## License

This project is licensed under the [MIT License](LICENSE).