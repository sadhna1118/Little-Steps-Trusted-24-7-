# Little Steps – Trusted 24×7 Childcare & Daycare Platform

![Platform Badge](https://img.shields.io/badge/Platform-Little%20Steps%2024%C3%977-indigo?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-emerald?style=for-the-badge)
![Status](https://img.shields.io/badge/Status-Production%20Ready-blue?style=for-the-badge)
![Stack](https://img.shields.io/badge/Tech%20Stack-HTML5%20%7C%20Vanilla%20CSS%20%7C%20JavaScript%20%7C%20Node.js%20Express-orange?style=for-the-badge)

> **A centralized digital platform connecting working parents with verified childcare centers and caregivers offering 24×7 daycare, night crèches, and emergency babysitting services.**

---

## 🌟 Key Platform Features

### 👤 Parent Persona
- **Smart 24×7 Daycare Search:** Multi-faceted filtering across major tech hubs (*Bengaluru, Mumbai, Pune, Delhi-NCR, Hyderabad*).
- **Verified Caregivers & Safety Protocols:** Inspect police background clearances, pediatric CPR certificates, and ISO safety standards.
- **Flexible Booking Plans:** Hourly Flexi, Full-Day, 24×7 Night Care (with slumber pods), and Monthly Memberships.
- **Live Child Activity Feed:** Real-time timestamped meal logs, nap alerts, and health checks broadcasted by caregivers.
- **Digital QR Safety Pass:** Encrypted check-in pass for secure child handovers.

### 🏢 Childcare Provider Portal
- **Command Center & KPIs:** Real-time capacity utilization meter, active checked-in headcount, and monthly revenue.
- **1-Click Booking Approvals:** Accept, decline, or reschedule incoming requests with caregiver allocation.
- **Live Milestone Broadcaster:** Instant push notifications to parents for meals, bedtime stories, and health checks.
- **Staff & Pricing Management:** Onboard nurses, assign night shifts, and configure transparent hourly/night tariffs.

### 🛡️ Safety & Super Admin Hub
- **Daycare Verification Queue:** Inspect state operating permits, Fire Safety NOCs, and police verification documents.
- **Caregiver Safety Registry:** Centralized audit of background check IDs across all centers.
- **Dispute & Incident Monitor:** Track parent feedback, emergency triage requests, and dispute resolutions.
- **Platform Analytics:** Real-time KPI charts for registered parents, verified center ratio, and capacity utilization.

---

## 📁 Repository Structure

```
Little step trusted/
├── index.html                   # Master single-page web application entry point
├── css/
│   ├── style.css               # Core design tokens, CSS variables, typography & resets
│   ├── components.css          # Navigation, buttons, badges, daycare cards, modals & forms
│   └── views.css               # Discovery, detail page, parent dashboard, provider & admin portals
├── js/
│   ├── data.js                 # Realistic seed data for 8+ verified centers, staff & bookings
│   ├── state.js                # Reactive store with LocalStorage persistence & CRUD methods
│   ├── parent.js               # Search engine, filtering, booking flow & parent dashboard
│   ├── provider.js             # Provider portal, capacity manager & live milestone broadcaster
│   ├── admin.js                # Safety verification queue, doc inspector & platform KPIs
│   └── app.js                  # Master router, role switcher, toast & modal coordinator
├── docs/
│   ├── PRD.md                  # Comprehensive Product Requirements Document
│   ├── TECHNICAL_DOCUMENTATION.md  # Architecture, Data Models, REST APIs & Security
│   └── USER_GUIDE.md           # Operational manual for Parents, Providers & Admins
├── server.js                   # Node.js + Express REST API backend server
├── package.json                # Project dependencies & scripts
└── README.md                   # Project overview & documentation index
```

---

## 🚀 Quick Start Guide

### Option 1: Run with Node.js Express Server
```bash
# 1. Install dependencies
npm install

# 2. Start the server
npm start
```
Then open your browser and navigate to: **`http://localhost:3000`**

### Option 2: Standalone Browser Launch
Simply double-click or open `index.html` directly in any modern web browser (Google Chrome, Microsoft Edge, Safari, Firefox). All reactive features, state persistence, and role switching work standalone via LocalStorage!

---

## 🌐 Live Public Access
- **Public Tunnel URL:** `https://little-steps-childcare.loca.lt`
- **Local Dev Server:** `http://localhost:3000`

---

## 📚 Documentation Index

- 📄 **[Product Requirements Document (PRD)](docs/PRD.md):** Full product scope, user personas, problem statement, and requirements.
- 📐 **[Technical Documentation](docs/TECHNICAL_DOCUMENTATION.md):** System architecture, data schemas, REST API specs, and security standards.
- 📖 **[User & Operations Guide](docs/USER_GUIDE.md):** Step-by-step user manual for Parents, Daycare Providers, and Safety Admins.

---

## 🔒 Safety & Trust Standards

- **100% Police Verified Staff:** Biometric and criminal history clearance recorded per caregiver.
- **Pediatric First-Aid Certified:** Trained in Infant BLS, CPR, and pediatric medical emergency response.
- **Encrypted Biometric Check-In Pass:** QR tokens generated dynamically per active reservation.
- **24×7 Emergency Triage:** Integrated telephone hotline `1800-247-KIDS`.
