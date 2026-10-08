# Referral Dashboard (React + FastAPI + SQLite)

A full-stack, responsive partner and affiliate referral dashboard with JWT authentication, dynamic financial analytics calculated directly from an SQLite database, multi-parameter search, date sorting, client-side pagination, and individual referral inspection.

> **Disclaimer:** Financial inputs and payouts are synthetic sample data. Dashboard values are calculated from SQLite using project-defined demo formulas. No real financial transactions occur.

---

## 1. Project Overview

This project provides a complete analytics and management portal for affiliate programs. Originally developed with an external API gateway that expired, the application has been transitioned to an integrated **FastAPI** Python backend powered by an ACID-compliant **SQLite** database. 

Instead of displaying hardcoded constants or placeholder statistics, the backend performs live relational queries and precision `Decimal` calculations across stored referral sales and bank payouts to drive eight financial overview metrics and partner summaries.

---

## 2. Screenshots & Live Links

### Application Pages
- **Login View**: Centered card with email/password authentication and alert banners.
- **Dashboard View**: 8-card responsive metric grid, 4-card service summary, referral link/code share panel, and 10-item paginated table with live search and date sorting.
- **Referral Details View**: Dedicated detail card displaying partner name, service badge, referral ID, date, and net commission.
- **404 Not Found View**: Clean full-viewport fallback for unmatched routes or nonexistent referral IDs.

### Endpoints & Target Platforms
- **Frontend Server**: `http://localhost:3000` (Local Development)
- **Backend API**: `http://127.0.0.1:8000` (Local REST Server)
- **Interactive OpenAPI Docs**: `http://127.0.0.1:8000/docs`
- **Target Deployment**: Configuration prepared for Vercel (frontend) and Render (backend); deployment pending reviewer publication.

---

## 3. Features

- **JWT Authentication & Cookie Session**: Secure token generation via PyJWT with automatic client-side storage in cookies (`js-cookie`).
- **Protected Routing**: React Router v7 route guards (`ProtectedRoute`) that bounce unauthenticated visitors to `/login` and redirect logged-in users away from the login page.
- **Eight Dynamically Calculated Metrics**: Live metrics derived from SQLite: Total Balance, Discount Percentage, Total Referral, Discount Amount, Commission Amount, Total Earning, Commission Discount, and Total Bank Transfer.
- **Service Summary**: Aggregate breakdown of all distinct service categories, total referrals, active referrals, and net commission earnings.
- **Responsive Layouts**: Fully responsive interface supporting mobile (320px, 375px), tablet (768px), and desktop (1024px, 1440px) with CSS Grid, Flexbox, and zero page-level horizontal overflow.
- **Adaptive Metric Cards**: Fluid columns (4 on desktop, 2 on tablet, 1 on phone) with dynamic font clamps and `overflow-wrap: anywhere` to prevent large financial numbers from clipping.
- **Contained Scrollable Table**: Smooth touch horizontal scrolling confined strictly within the table container, ensuring 4-column accessibility on small viewports without page blowout.
- **Keyboard Focus & Reduced Motion**: Full `:focus-visible` ring styling for keyboard navigation, touch-friendly 38px–44px targets, and `@media (prefers-reduced-motion: reduce)` support.
- **Search & Filter Independence**: Live case-insensitive search by name or service, plus date sorting (newest/oldest first). Search and sorting filter table rows while preserving global dashboard totals.
- **10-Row Client-Side Pagination**: Automatic page calculation (6 pages across 52 records) with boundary controls and auto-reset to Page 1 upon searching or sorting.
- **Single Referral Inspection**: Dynamic lookup by referral ID (`/referral/:id`) with formatted currency and dates.
- **One-Click Share Panel**: Read-only referral link and referral code inputs with clipboard copy buttons and instant feedback states.
- **Safe Insert-Only Seeding**: Non-destructive database migrations that preserve user edits and prevent duplicates.

---

## 4. Tech Stack

- **Frontend**: React 19, React Router v7, Vanilla CSS3, React Icons (`Fa` FontAwesome), `js-cookie`
- **Backend**: Python 3.11+ / 3.12+, FastAPI, Uvicorn (ASGI)
- **Database**: SQLite3 (embedded relational database)
- **Security & Cryptography**: PyJWT (HMAC-SHA256), `pwdlib` with Argon2 password hashing
- **Precision Math**: Python `decimal.Decimal` (integer cents to eliminate floating-point rounding errors)

---

## 5. Architecture

```text
React SPA (Port 3000)
    │
    │  HTTP Requests + Bearer JWT
    ▼
FastAPI REST Server (Port 8000)
    │
    │  SQL Queries (Decimal Math)
    ▼
SQLite Database (referrals.db)
    ├── referrals (52 records)
    ├── referral_financials (monetary cents & status)
    ├── payouts (completed, pending, failed)
    └── referral_settings (demo link & code)
```

---

## 6. Folder Structure

```text
frontend-referral-dashboard/
├── backend/
│   ├── .env                    # Backend private environment configuration
│   ├── .env.example            # Backend environment template
│   ├── main.py                 # FastAPI application, authentication & endpoints
│   ├── referrals.db            # SQLite relational database
│   ├── seed.py                 # Non-destructive, insert-only seeding script
│   └── start.sh                # Production start script (seeding + uvicorn)
├── public/
│   ├── index.html              # HTML5 root template
│   └── manifest.json           # Web app manifest
├── src/
│   ├── components/
│   │   ├── Footer/             # Footer branding and links
│   │   ├── Navbar/             # Top navigation with logo, CTA, and logout
│   │   ├── Overview/           # 8-card responsive metric grid
│   │   ├── ProtectedRoute/     # Route security wrapper checking jwt_token cookie
│   │   ├── ReferralsTable/     # Table with search, sort, pagination, and row clicks
│   │   ├── ServiceSummary/     # 4-card summary (service names, active counts)
│   │   └── ShareReferral/      # Referral link and code copy widgets
│   ├── pages/
│   │   ├── Dashboard/          # Main dashboard container view
│   │   ├── Login/              # Email/password authentication page
│   │   ├── NotFound/           # Full-screen 404 error page
│   │   └── ReferralDetails/    # Individual referral detail view (/referral/:id)
│   ├── App.js                  # Application routing table
│   └── index.js                # React DOM root entrypoint
├── tests/
│   └── test_dashboard.py       # Automated unit, calculation, and API test suite
├── .env                        # React root environment configuration
├── package.json                # Frontend dependencies and npm scripts
├── project_overall_now.md      # Comprehensive technical documentation
├── requirements.txt            # Python dependencies
└── vercel.json                 # Vercel SPA client-side routing configuration
```

---

## 7. Local Setup

### Prerequisites
- **Node.js**: v18.x or later and `npm`
- **Python**: v3.11 or v3.12
- **Git**

### Installation

From the repository root:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Prabha2005/Frontend-Referral-Dashboard.git
   cd Frontend-Referral-Dashboard
   ```

2. **Install frontend dependencies:**
   ```bash
   npm install
   ```

3. **Set up Python virtual environment & install backend dependencies:**
   ```bash
   python -m venv .venv
   # Windows:
   .venv\Scripts\activate
   # macOS/Linux:
   source .venv/bin/activate

   pip install -r requirements.txt
   ```

### Environment Configuration

Configure two separate environment files:

```env
# React root .env
REACT_APP_API_BASE_URL=http://127.0.0.1:8000
```

```env
# backend/.env.example
JWT_SECRET=replace_with_a_generated_secret
DEMO_EMAIL=your_demo_email
DEMO_PASSWORD=your_demo_password
```

> **Reviewer Demo Credentials:**
> - **Email**: `demo1@gmail.com`
> - **Password**: `Demo@pa1`
> *(For local development, copy `backend/.env.example` to `backend/.env` and replace values or keep default demo credentials.)*

### Database Seeding

Run the idempotent database migration script from the repository root:
```bash
python backend/seed.py
```
*(On Windows using virtual environment: `& .venv/Scripts/python.exe backend/seed.py`)*

### Starting Both Servers

Run these commands from the repository root in separate terminals:

**Terminal 1 — Backend (FastAPI):**
```bash
python -m uvicorn backend.main:app --reload --port 8000
```

**Terminal 2 — Frontend (React):**
```bash
npm start
```

Visit `http://localhost:3000` in your browser.

---

## 8. Deployment Guide (Render + Vercel)

### A. Backend Deployment on Render

1. **Create Web Service**:
   - In the Render dashboard, create a new **Web Service** and connect this Git repository.
2. **Build & Start Commands**:
   - **Runtime**: Python 3
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `bash backend/start.sh`
   - **Health Check Path**: `/health`
3. **Environment Variables**:
   Configure the following in the Render service settings:
   - `JWT_SECRET`: A secure generated random secret (e.g. generated via `python -c "import secrets; print(secrets.token_hex(32))"`).
   - `DEMO_EMAIL`: Demo account email (e.g. `demo1@gmail.com`).
   - `DEMO_PASSWORD`: Demo account password (e.g. `Demo@pa1`).
   - `FRONTEND_ORIGINS`: Comma-separated list of production frontend origins, e.g. `https://your-app.vercel.app`.
   - `DATABASE_PATH`: Path to SQLite database file (defaults to `backend/referrals.db`, or `/var/data/referrals.db` if attaching a Render Persistent Disk).
   - `PORT`: Injected automatically by Render (the `backend/start.sh` script binds to `${PORT:-8000}`).

`backend/start.sh` automatically runs `backend/seed.py` (idempotent, insert-only) to initialize and populate the SQLite database schema before starting Uvicorn with ASGI workers on `0.0.0.0:${PORT}`.

### B. Frontend Deployment on Vercel

1. **Import Project**:
   - In the Vercel dashboard, click **Add New Project** and select your repository.
2. **Build Configuration**:
   - **Framework Preset**: `Create React App`
   - **Root Directory**: `./` (repository root)
   - **Build Command**: `npm run build`
   - **Output Directory**: `build`
3. **Environment Variables**:
   - `REACT_APP_API_BASE_URL`: The URL of your deployed Render backend (e.g. `https://your-backend.onrender.com`), without trailing slash.
4. **SPA Client-Side Routing**:
   The repository includes [vercel.json](file:///d:/prabha/Github_Prabha2005/frontend-referral-dashboard/vercel.json) to rewrite all non-file route requests to `/index.html`:
   ```json
   {
     "rewrites": [
       {
         "source": "/(.*)",
         "destination": "/index.html"
       }
     ]
   }
   ```
   This ensures that refreshing `/dashboard`, `/dashboard/referrals`, or `/referral/:id` maintains client-side routing without returning 404 errors.

---

## 9. API Endpoints

### 1. Health Check (`GET /health`)
- **Headers**: None required
- **Response (`200 OK`)**:
  ```json
  {
    "status": "ok"
  }
  ```
- **Purpose**: Used for Render health checks, deployment liveness probes, and uptime monitoring.

### 2. Authentication (`POST /api/auth/signin`)
- **Headers**: `Content-Type: application/json`
- **Body**:
  ```json
  {
    "email": "demo1@gmail.com",
    "password": "Demo@pa1"
  }
  ```
- **Response (`200 OK`)**:
  ```json
  {
    "status": "success",
    "message": "Login successful",
    "data": {
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
    }
  }
  ```

### 3. Referrals & Measures (`GET /api/referrals`)
- **Headers**: `Authorization: Bearer <token>`
- **Query Parameters**:
  - `search` *(optional)*: Case-insensitive filter on name or service.
  - `sort` *(optional)*: `desc` (newest first, default) or `asc` (oldest first).
  - `id` *(optional)*: Filter by specific referral ID.
- **Response (`200 OK`)**:
  ```json
  {
    "status": "success",
    "data": {
      "metrics": [
        { "id": 1, "label": "Total Balance", "value": "$4,023,300.00" },
        { "id": 2, "label": "Discount Percentage", "value": "22.4%" },
        { "id": 3, "label": "Total Referral", "value": "52" },
        { "id": 4, "label": "Discount Amount", "value": "$15,735,460.19" },
        { "id": 5, "label": "Commission Amount", "value": "$11,703,918.50" },
        { "id": 6, "label": "Total Earning", "value": "$10,023,300.00" },
        { "id": 7, "label": "Commission Discount", "value": "14.4%" },
        { "id": 8, "label": "Total Bank Transfer", "value": "$6,000,000.00" }
      ],
      "serviceSummary": {
        "service": "B2B, Backend, Cloud Hosting, DevOps, Frontend, Fullstack, Graphics, HR, PM, QA, UI/UX, Web Development",
        "yourReferrals": "52",
        "activeReferrals": "42",
        "totalRefEarnings": "$10,023,300.00"
      },
      "referral": {
        "link": "https://gobusiness.com/?referral=ABCXYZ",
        "code": "ABCXYZ"
      },
      "referrals": [
        {
          "id": "ref-001",
          "name": "Geeta",
          "serviceName": "Frontend",
          "date": "2013-07-29",
          "profit": 259300.0
        }
      ]
    }
  }
  ```

---

## 10. Database & Sample Data

The SQLite database (`backend/referrals.db`) consists of four relational tables:

1. **`referrals`** (52 rows):
   - 10 Visible Reference Records (`ref-001` to `ref-010`: Geeta, Vinod, Rekha, Ashok, Sonal, Mohit, Anjali, Srinivas, Harish, Moumita)
   - 40 Synthetic Demo Records (`ref-011` to `ref-050` with older dates)
   - 2 Restored Demo Records (`ref-051` Priya, `ref-052` Arun)
2. **`referral_financials`** (52 rows):
   - Stores integer cents: `original_amount_cents`, `discount_amount_cents`, `gross_commission_cents`, `commission_discount_cents`, and `is_active` (42 active, 10 inactive).
3. **`payouts`** (5 rows):
   - `payout-001`: $2,500,000.00 (`completed`)
   - `payout-002`: $1,500,000.00 (`completed`)
   - `payout-003`: $2,000,000.00 (`completed`)
   - `payout-004`: $750,000.00 (`pending`, excluded from balance & transfers)
   - `payout-005`: $500,000.00 (`failed`, excluded from balance & transfers)
4. **`referral_settings`**:
   - Stores the reference demo link and sharing code.

---

## 11. Metric Formulas & Calculation Rules

### The Net Commission Identity
For every referral record in the database:
$$\text{gross\_commission\_cents} - \text{commission\_discount\_cents} = \text{profit\_cents}$$
Existing profit values represent net earned commission and are preserved exactly.

### Overview Metric Formulas
1. **Total Balance**:
   $$\text{Total Net Commission} - \text{Completed Payouts} = \$10,023,300.00 - \$6,000,000.00 = \$4,023,300.00$$
2. **Discount Percentage** (Weighted aggregate percentage):
   $$\frac{\sum \text{discount\_amount\_cents}}{\sum \text{original\_amount\_cents}} \times 100 = \frac{\$15,735,460.19}{\$70,302,300.00} \times 100 = 22.4\%$$
   *(Zero denominators evaluate to $0.0\%$)*
3. **Total Referral**:
   $$\text{COUNT}(*) \text{ of stored referrals} = 52$$
4. **Discount Amount**:
   $$\sum \text{discount\_amount\_cents} / 100 = \$15,735,460.19$$
5. **Commission Amount**:
   $$\sum \text{gross\_commission\_cents} / 100 = \$11,703,918.50$$
6. **Total Earning**:
   $$\sum \text{profit} = \$10,023,300.00$$
7. **Commission Discount** (Weighted aggregate percentage):
   $$\frac{\sum \text{commission\_discount\_cents}}{\sum \text{gross\_commission\_cents}} \times 100 = \frac{\$1,680,618.50}{\$11,703,918.50} \times 100 = 14.4\%$$
   *(Zero denominators evaluate to $0.0\%$)*
8. **Total Bank Transfer**:
   $$\sum \text{amount\_cents WHERE status} = \text{'completed'} / 100 = \$6,000,000.00$$

### Service Summary Formulas
- **service**: Derived by joining all distinct stored service names in SQLite.
- **yourReferrals**: Total referral count across the single-account dataset (`52`).
- **activeReferrals**: Count of referrals where `is_active = 1` (`42`).
- **totalRefEarnings**: Total net earned commission (`$10,023,300.00`).

### Missing-Data Fallback
If any custom referral lacks an associated financial record in `referral_financials`, dependent metrics (**Discount Percentage**, **Discount Amount**, **Commission Amount**, **Commission Discount**, **Active Referrals**) return `"N/A"` rather than assuming zero. Non-dependent measures continue to compute cleanly.

---

## 12. Testing

The repository includes an automated test suite verifying both isolated database unit tests and live API integration tests.

### Running Tests from Repository Root
```bash
python tests/test_dashboard.py
```
*(On Windows: `& .venv/Scripts/python.exe tests/test_dashboard.py`)*

### Verification Results
- **Automated Backend & Math Tests**: All 9 unit, calculation, and live API checks in `tests/test_dashboard.py` passed with 100% success.
- **Production Build**: `npm run build` compiled successfully with 0 warnings or errors.
- **Visual Checks Status**: Automated visual checks at the requested screen widths (320px, 375px, 768px, 1024px, and 1440px) remain **pending** because the automated browser subagent environment could not launch (Playwright driver CDN returned HTTP 404). Manual verification via browser developer tools (e.g. Chrome Device Toolbar) is recommended.

---

## 13. Limitations

- **Single Demo Account**: The application is tailored for a single authenticated affiliate account.
- **Synthetic Data**: Financial inputs and payouts are generated demo records; no real banking integration exists.
- **Referral Sharing**: The referral link and code widgets provide one-click clipboard copying for UI demonstration without an active tracking pixel or attribution pipeline.
- **SQLite Persistence on Ephemeral Hosts**: The application uses local SQLite storage (`backend/referrals.db`). When deploying to ephemeral container platforms like Render (free tier) without an attached persistent disk, changes or new database records do not persist across container reboots or redeployments. To ensure persistence in production, attach a Render Persistent Disk and set `DATABASE_PATH` accordingly.

---

## 14. Troubleshooting

- **`Connection Refused` on API calls**:
  - Ensure the FastAPI server is running on port 8000: `python -m uvicorn backend.main:app --reload --port 8000`.
- **`401 Unauthorized` / Expired Token**:
  - JWT tokens are set to expire after 1 hour. Log out via the Navbar and sign back in to issue a fresh token.
- **Undefined `REACT_APP_API_BASE_URL`**:
  - Ensure the root `.env` file exists and specifies `REACT_APP_API_BASE_URL=http://127.0.0.1:8000` (locally) or your Render backend URL (on Vercel). Restart the dev server or re-trigger deployment after changing.
- **CORS Errors in Production**:
  - Set `FRONTEND_ORIGINS` in Render environment variables to your exact Vercel frontend URL (e.g. `FRONTEND_ORIGINS=https://frontend-referral-dashboard.vercel.app`), without a trailing slash.
- **Vercel 404 on Direct Route Refresh**:
  - The repository includes [vercel.json](file:///d:/prabha/Github_Prabha2005/frontend-referral-dashboard/vercel.json) configured with SPA route rewrites to `/index.html`. If deploying outside Vercel, configure equivalent URL rewriting on your web server (e.g. Nginx `try_files $uri /index.html`).
- **Render Free Tier Cold Starts**:
  - Free web services on Render spin down during inactivity. The initial request can take 30-50 seconds while the container boots. Ping `GET /health` using a free uptime monitor (e.g., UptimeRobot) if continuous responsiveness is required.