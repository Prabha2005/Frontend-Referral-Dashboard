# Referral Dashboard

A React-based Referral Dashboard application that allows users to view referral metrics, search and sort referrals, navigate through paginated results, and view detailed information for individual referrals.

## Features

* Secure login with JWT authentication
* Protected routes
* Dashboard overview metrics
* Service summary section
* Referral link and code display
* Search referrals by name or service
* Sort referrals by date
* Client-side pagination (10 entries per page)
* Referral details page
* Custom 404 page
* Responsive UI

## Tech Stack

* React.js
* React Router DOM
* JavaScript (ES6+)
* CSS3
* Fetch API
* js-cookie

## Installation

Clone the repository:

```bash
git clone https://github.com/Prabha2005/Frontend-Referral-Dashboard.git
```

Navigate to the project directory:

```bash
cd referral-dashboard
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm start
```

The application will run at:

```text
http://localhost:3000
```

## Build for Production

```bash
npm run build
```

The production-ready files will be generated in the `build` folder.

## Project Structure

```text
src
├── components
│   ├── Footer
│   ├── Navbar
│   ├── Overview
│   ├── ProtectedRoute
│   ├── ReferralsTable
│   ├── ServiceSummary
│   └── ShareReferral
│
├── pages
│   ├── Dashboard
│   ├── Login
│   ├── ReferralDetails
│   └── NotFound
│
├── App.js
└── index.js
```

## Functionality

### Dashboard

* Displays overview metrics
* Shows service summary
* Displays referral link and code
* Supports search and sorting
* Supports pagination

### Referral Details

* Displays detailed information about a selected referral
* Accessible by clicking a referral row

### Authentication

* Login-based access control
* Protected routes using JWT token validation