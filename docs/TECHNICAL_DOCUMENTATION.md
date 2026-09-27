# Technical Documentation & System Architecture
## Little Steps – Trusted 24×7 Childcare Platform

**Document Version:** 1.0.0  
**Status:** Production Ready  
**Date:** September 2026  

---

## 1. System Overview & Architecture

Little Steps is built as a responsive, event-driven web application powered by a modular design system and an Express REST API backend. It operates both as a standalone single-page application (SPA) with LocalStorage reactivity and as a full-stack client-server solution.

```mermaid
graph TD
    User([Parent / Provider / Admin]) -->|Interacts| UI[Responsive SPA Frontend]
    
    subgraph Frontend Architecture
        UI --> Router[App Router & Role Switcher]
        Router --> ParentMod[Parent Module]
        Router --> ProvMod[Provider Module]
        Router --> AdminMod[Admin Safety Module]
        ParentMod --> State[LittleStepsState Reactive Store]
        ProvMod --> State
        AdminMod --> State
        State --> LS[(Browser LocalStorage)]
    end

    subgraph Backend Services
        State -.->|REST HTTP/JSON| API[Express REST API Server]
        API --> DaycareEndpoint[/api/daycares]
        API --> BookingEndpoint[/api/bookings]
        API --> ReviewEndpoint[/api/reviews]
        API --> AdminEndpoint[/api/admin/verify]
        API --> StatsEndpoint[/api/stats/kpis]
        API --> DB[(Persistent Database / Mongo / Postgres)]
    end
```

---

## 2. Technology Stack

| Layer | Technologies Used | Rationale |
|---|---|---|
| **Frontend Core** | HTML5 Semantic Elements, Modern ES6+ JavaScript | Zero build step friction, instant execution across all browsers |
| **Styling & Design System** | Modern Vanilla CSS3 with Custom Tokens, CSS Grid, Flexbox, Glassmorphism | Ultra-lightweight, customizable, avoids bloated runtime CSS libraries |
| **Typography** | Google Fonts: `Outfit` (Headings) + `Plus Jakarta Sans` (Body) | Crisp, modern, child-friendly yet high-trust corporate feel |
| **Backend & APIs** | Node.js (v24.x) + Express.js (v4.19.x) + CORS | High throughput, asynchronous I/O, lightweight REST endpoints |
| **Data Persistence** | Dual Model: Client-Side LocalStorage + Express In-Memory/Database | Instant testing and offline persistence with smooth online sync |
| **Security & Tokens** | Encrypted QR Tokens, Role-Based Access Control (RBAC) | Secure check-ins, verifiable caregiver background IDs |

---

## 3. Data Models & Entity Schemas

### 3.1. Daycare Center (`Daycare`)
```typescript
interface Daycare {
  id: string;                      // Unique ID e.g. "dc-001"
  name: string;                    // Center Name
  tagline: string;                 // Brief value proposition
  city: string;                    // e.g. "Bengaluru"
  area: string;                    // e.g. "Indiranagar"
  address: string;                 // Full street address
  rating: number;                  // Average rating e.g. 4.9
  reviewCount: number;             // Total reviews
  is24x7: boolean;                 // Operates 24x7
  supportsNightShift: boolean;     // Dedicated night care pods
  supportsEmergency: boolean;      // Immediate drop-in availability
  isVerified: boolean;             // Verification badge granted
  verificationStatus: "pending_review" | "approved" | "rejected";
  licenseNumber: string;           // Government registration ref
  establishedYear: number;         // e.g. 2018
  totalCapacity: number;           // Total spots
  currentOccupancy: number;        // Active occupied spots
  heroImage: string;               // Main photo URL
  images: string[];                // Facility photo gallery URLs
  ageGroups: string[];             // Supported age brackets
  timings: {
    regular: string;
    dayShift: string;
    nightShift: string;
    emergencyAvailable: boolean;
  };
  pricing: {
    hourly: number;                // e.g. ₹180
    daily: number;                 // e.g. ₹1400
    monthly: number;               // e.g. ₹18500
    nightHourly: number;           // e.g. ₹240
    nightMonthly: number;          // e.g. ₹23500
    emergencyHourly: number;       // e.g. ₹300
  };
  safetyFeatures: string[];        // CCTV, Pediatric Nurse, etc.
  certifications: Array<{
    name: string;
    issuer: string;
    validTill: string;
  }>;
  caregivers: Caregiver[];
  description: string;
}
```

### 3.2. Caregiver Staff (`Caregiver`)
```typescript
interface Caregiver {
  id: string;                      // e.g. "cg-101"
  name: string;                    // e.g. "Sister Mary Varghese"
  role: string;                    // e.g. "Head Pediatric Caregiver"
  experience: string;              // e.g. "12+ Years"
  qualifications: string;          // e.g. "B.Sc Nursing, Pediatric First-Aid"
  photo: string;                   // Avatar URL
  policeVerified: boolean;         // Criminal background checked
  bgCheckId: string;               // e.g. "POL-BLR-2024-9912"
  rating: number;                  // Staff rating e.g. 4.95
  shift: string;                   // Assigned rotation
}
```

### 3.3. Childcare Booking (`Booking`)
```typescript
interface Booking {
  id: string;                      // e.g. "LS-BK-9901"
  daycareId: string;               // Reference to Daycare
  daycareName: string;
  parentName: string;
  parentEmail: string;
  parentPhone: string;
  childName: string;
  childAgeGroup: string;
  childAgeExact: string;
  allergies: string;
  emergencyContact: string;
  planType: "hourly" | "daily" | "nightShift" | "monthly";
  planName: string;
  startDate: string;               // YYYY-MM-DD
  startTime: string;               // HH:MM
  endTime: string;
  duration: string;
  priceTotal: number;
  status: "pending" | "confirmed" | "checked_in" | "completed" | "cancelled";
  createdAt: string;
  caregiverAssigned: string;
  qrCodeToken: string;
  liveActivityLog: Array<{
    time: string;
    event: string;
    note: string;
  }>;
}
```

---

## 4. REST API Endpoint Specifications

### 4.1. Daycares API

#### `GET /api/daycares`
Returns filtered list of childcare centers.
- **Query Params:**
  - `city` (string, optional)
  - `is24x7` (boolean, optional)
  - `nightShift` (boolean, optional)
  - `emergency` (boolean, optional)
  - `ageGroup` (string, optional)
- **Response (200 OK):**
```json
{
  "success": true,
  "count": 8,
  "data": [
    {
      "id": "dc-001",
      "name": "Little Blooms 24×7 Crèche & Early Learning",
      "city": "Bengaluru",
      "rating": 4.9,
      "isVerified": true,
      "pricing": { "hourly": 180, "nightHourly": 240 }
    }
  ]
}
```

#### `GET /api/daycares/:id`
Returns detailed information for a specific daycare including staff, accreditations, and parent reviews.

#### `POST /api/daycares`
Registers a new daycare application (initial status: `pending_review`).

---

### 4.2. Bookings API

#### `POST /api/bookings`
Submits a new slot reservation or subscription request.
- **Request Body:**
```json
{
  "daycareId": "dc-001",
  "parentName": "Sadhna Sharma",
  "parentEmail": "sadhna.parent@example.com",
  "childName": "Aarav Sharma",
  "childAgeGroup": "Toddler (1-3 yrs)",
  "allergies": "Mild Peanut Allergy",
  "emergencyContact": "+91 98765 43211",
  "planType": "nightShift",
  "startDate": "2026-09-28",
  "startTime": "18:30",
  "priceTotal": 3240
}
```
- **Response (201 Created):**
```json
{
  "success": true,
  "data": {
    "id": "LS-BK-4912",
    "status": "pending",
    "qrCodeToken": "QR-LS-88X9Z1",
    "liveActivityLog": [
      { "time": "18:30", "event": "Booking Request Submitted", "note": "Pending center confirmation." }
    ]
  }
}
```

#### `PATCH /api/bookings/:id/status`
Updates booking lifecycle state (`confirmed`, `checked_in`, `completed`, `cancelled`).

#### `POST /api/bookings/:id/activity`
Appends a real-time event (Meal, Nap, Play, Health log) to the child's activity timeline.

---

### 4.3. Admin & Safety Verification API

#### `POST /api/admin/verify/:daycareId`
Approves or rejects a center application after inspecting legal documentation.
- **Request Body:**
```json
{
  "status": "approved",
  "notes": "State license, fire NOC and police verifications fully validated."
}
```

#### `GET /api/stats/kpis`
Returns platform-wide operational and financial metrics.

---

## 5. Security, Safety & Verification Architecture

1. **Caregiver Background Verification Pipeline:**
   - Aadhaar Biometric identity authentication.
   - State police criminal record verification reference tracking.
   - American Heart Association (AHA) certified pediatric CPR & AED validation.
2. **Biometric Child Intake / Digital QR Token:**
   - Single-use, encrypted session token generated per confirmed booking.
   - Requires scanning at the daycare facility's security intake terminal to trigger the `checked_in` status.
3. **Data Protection & Role-Based Access Control (RBAC):**
   - Three segregated persona contexts: `Parent`, `Provider`, and `SuperAdmin`.
   - Child medical & allergy data is strictly isolated to the booked provider and assigned caregiver.

---

## 6. Setup, Execution & Deployment

### Local Development
```bash
# 1. Clone repository and navigate to workspace
cd "c:\Users\HP\OneDrive\Documents\Desktop\SADHNA PROJECTS\Little step trusted"

# 2. Install dependencies
npm install

# 3. Start Express server with static frontend
npm start
```
Open your browser at `http://localhost:3000`.

### Production Deployment
- **Vercel / Netlify:** Directly deploy static bundle (`index.html`, `css/`, `js/`).
- **AWS / Docker:** Run containerized Node.js Express server using standard Linux container.
