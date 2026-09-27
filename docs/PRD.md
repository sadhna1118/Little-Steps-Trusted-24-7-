# Product Requirements Document (PRD)
## Little Steps – Trusted 24×7 Childcare & Daycare Platform

**Document Version:** 1.0.0  
**Author:** Little Steps Product & Engineering Team  
**Status:** Approved for Implementation  
**Last Updated:** September 2026  

---

## 1. Executive Summary & Context

Modern work dynamics in metropolitan and Tier-1 IT hubs (Bengaluru, Mumbai, Pune, Gurugram, Hyderabad) have created acute childcare challenges:
- Rising incidence of dual-income families and nuclear households.
- 24×7 shift rotations in information technology, healthcare, aviation, customer support, and emergency services.
- Severe lack of verified, trustworthy round-the-clock childcare facilities that operate beyond standard 8:00 AM – 6:00 PM hours.
- Fragmented discovery relying on word-of-mouth with zero real-time availability tracking or transparent caregiver verification.

**Little Steps** is a centralized, digital-first 24×7 childcare platform connecting working parents with certified daycares, night crèches, and verified pediatric caregivers.

---

## 2. Problem Statement

| Core Challenge | Current Reality | Little Steps Solution |
|---|---|---|
| **Discovery & Transparency** | Phone calls, word-of-mouth, unverified social media posts | Structured directory with verified ratings, photos, and licensing info |
| **Caregiver Trust** | Zero visibility into criminal history or pediatric training | 100% Police verification badges & CPR accreditation records |
| **Availability & Capacity** | No real-time visibility; centers frequently overbook | Dynamic live capacity meter and instant slot reservation |
| **Night Shift Support** | Daycares close at 6:00 PM; no structured night nurseries | Purpose-built 24×7 night care with soundproof slumber pods & pediatric nursing |
| **Operational Digitize** | Manual pen-and-paper registers for child attendance | Automated QR check-in, digital health & meal updates sent directly to parents |

---

## 3. User Personas

### 3.1. Working Parent (e.g., Sadhna Sharma - Senior IT Consultant)
- **Pain Point:** Works US shift hours (6:30 PM – 3:30 AM); needs safe, certified overnight care with live updates.
- **Goals:** Find certified 24×7 daycare near Indiranagar, view caregiver qualifications, book hourly/monthly plans, and receive meal/sleep alerts.

### 3.2. Childcare Provider / Crèche Director (e.g., Sister Mary - Little Blooms Crèche)
- **Pain Point:** Difficult to manage nighttime capacity and broadcast updates to anxious parents.
- **Goals:** Digitize bookings, set shift pricing, onboard verified staff, and log daily milestones with 1 click.

### 3.3. Platform Safety Admin (e.g., Little Steps Compliance Team)
- **Pain Point:** Ensuring centers comply with state daycare laws, fire NOCs, and police verification.
- **Goals:** Inspect accreditation documents, audit caregivers, resolve parent disputes, and track city-wide KPIs.

---

## 4. Functional Requirements

### 4.1. Parent / User Experience
1. **Search & Exploration:**
   - Geolocation & city filtering (Bengaluru, Mumbai, Pune, Delhi-NCR, Hyderabad).
   - Multi-faceted filters: 24×7 availability, Night Shift slumber pods, Emergency drop-ins, Age group (Infant 0–1 yr, Toddler 1–3 yrs, Preschool 3–5 yrs, After School 6–10 yrs), and Hourly budget slider.
2. **Daycare Center Detail Page:**
   - Multi-angle high-resolution facility photo gallery.
   - Verified caregiver staff cards with background check IDs, experience, and educational qualifications.
   - Comprehensive safety matrix (CCTV, Pediatric Nurse on duty, Biometric gates, HEPA filters).
   - Official accreditation showcase (ISO 9001, State Childcare License, Fire Safety NOC).
   - Parent reviews with verified booking tags and star ratings.
3. **Booking & Subscriptions:**
   - Plan selection: Hourly Flexi, Full Day, 24×7 Night Care, and Monthly Unlimited Membership.
   - Child profile inputs (Allergies, sleep habits, emergency doctor contact).
   - Real-time price breakdown calculator with night surcharges.
   - Secure digital QR Check-In Pass generation.
4. **Parent Command Center & Live Feed:**
   - Active checked-in child banner with live timer.
   - Real-time timestamped child milestone log (Meals, Naps, Play, Temperature checks).
   - Subscription pass hours remaining counter and 1-click top-up.
   - Direct emergency triage hotline link (1800-247-KIDS).

### 4.2. Childcare Provider Portal
1. **Command Dashboard:** Real-time occupancy gauge, active checked-in headcount, monthly revenue, and pending requests count.
2. **Booking Management:** 1-click Accept, Reject, or Reschedule booking requests with automated caregiver assignment.
3. **Live Attendance & Milestone Broadcaster:** Digital check-in/check-out and live event logging dispatched immediately to parents.
4. **Staff Management:** Onboard new caregivers, record police verification IDs, and configure shift rosters.
5. **Pricing & Capacity Engine:** Configure hourly, night shift, and monthly package tariffs.

### 4.3. Platform Admin & Safety Hub
1. **Verification Queue:** Inspect government daycare licenses, fire NOCs, and health certificates.
2. **Caregiver Registry Audit:** Central repository of biometric background clearances.
3. **Dispute & Incident Monitor:** Safety inquiries and resolution workflows.
4. **Platform Analytics:** Real-time metrics for registered parents, verified center ratio, conversion rates, and gross bookings value.

---

## 5. Non-Functional Requirements

- **Performance:** Sub-1 second initial page load time, ultra-fast client-side reactive filtering.
- **Security & Privacy:** Role-based access control, encrypted child health information, sanitization of user inputs.
- **Usability:** High-contrast accessible color palette, warm child-friendly aesthetics, responsive across mobile, tablet, and desktop viewports.
- **Reliability:** Data persistence via browser LocalStorage with automatic fallback and optional Express REST server.

---

## 6. Key Performance Indicators (KPIs)

1. **Active Parent Registrations:** Target > 10,000 parents in Year 1.
2. **Daycare Verification Rate:** 100% of listed centers verified prior to booking activation.
3. **Booking Conversion Rate:** > 85% from daycare detail view to completed reservation.
4. **Average Facility Capacity Utilization:** > 65% across day and night shifts.
5. **User Satisfaction Score:** Maintain > 4.8 / 5.0 rating across verified reviews.
