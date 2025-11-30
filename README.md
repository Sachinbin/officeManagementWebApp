# Office Management System (Node + Express + MongoDB + EJS)
live at:- https://officemanagementwebapp.onrender.com

Features:
- JWT + bcrypt authentication
- Department CRUD
- Employee CRUD (with department relation)
- Country → State → City dropdowns using public CountriesNow API (no key)
- Bootstrap 5 + animated UI (cards + fade-in)
- EJS templating

## Quick start

1. Install dependencies:

   ```bash
   npm install
   ```

2. Configure `.env`:

   - `MONGO_URL` – your Mongo connection string
   - `JWT_SECRET` – any strong random string
   - `PORT` – (optional) default 5000

3. Run:

   ```bash
   npm run dev
   # or
   npm start
   ```

4. Open `http://localhost:5000/register` to create the first user.

## Location API

This project uses the free public **CountriesNow** API:

- Countries: `GET https://countriesnow.space/api/v0.1/countries`
- States: `POST https://countriesnow.space/api/v0.1/countries/states`
- Cities: `POST https://countriesnow.space/api/v0.1/countries/state/cities`

Backend proxies:

- `GET /location/countries`
- `GET /location/states/:country`
- `GET /location/cities/:country/:state`
