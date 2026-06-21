# Referral Dashboard

A responsive React-based Referral Dashboard that enables users to track referral performance, search and sort referral records, view detailed referral information, and manage referral activity through a clean and intuitive interface.

## Live Demo

Live Application:
https://frontend-referral-dashboard-ipt4d5nie.vercel.app

GitHub Repository:
https://github.com/Prabha2005/Frontend-Referral-Dashboard

---

## Features

* JWT-based authentication
* Protected routes using React Router
* Dashboard overview metrics
* Service summary section
* Referral link and referral code display
* Search referrals by name or service
* Sort referrals by date (Newest / Oldest)
* Client-side pagination (10 entries per page)
* Referral details page
* Custom 404 page
* Responsive design
* Logout functionality

---

## Tech Stack

### Frontend

* React.js
* React Router DOM
* JavaScript (ES6+)
* CSS3

### API & Authentication

* Fetch API
* JWT Authentication
* js-cookie

### Deployment

* Vercel

---

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

Application runs at:

```text
http://localhost:3000
```

---

## Build for Production

```bash
npm run build
```

The optimized production files will be generated inside the `build` folder.

---

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

---

## Functionalities

### Authentication

* Secure login
* JWT token storage using cookies
* Route protection using ProtectedRoute

### Dashboard

* Overview metrics
* Service summary
* Referral code and referral link
* Search functionality
* Sorting functionality
* Pagination support

### Referral Details

* Dynamic routing using referral ID
* Detailed referral information
* Back to dashboard navigation

### Error Handling

* Custom 404 page
* API error handling
* Loading states

---

## Deployment

The application is deployed on Vercel and automatically redeploys whenever new changes are pushed to the GitHub repository.