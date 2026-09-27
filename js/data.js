/**
 * Little Steps - Seed Data
 * Rich initial data for 24x7 Childcare centers, caregivers, reviews, and bookings.
 */

const SEED_DAYCARES = [
  {
    id: "dc-001",
    name: "Little Blooms 24×7 Crèche & Early Learning",
    tagline: "Round-the-clock nurturing care with live camera check-ins & pediatric supervision",
    city: "Bengaluru",
    area: "Indiranagar / Koramangala Hub",
    address: "Plot 42, 100ft Road, Near Metro Station, Indiranagar, Bengaluru - 560038",
    rating: 4.9,
    reviewCount: 142,
    is24x7: true,
    supportsNightShift: true,
    supportsEmergency: true,
    isVerified: true,
    verificationStatus: "approved",
    licenseNumber: "KA-BBMP-CR-2024-8891",
    establishedYear: 2018,
    totalCapacity: 35,
    currentOccupancy: 22,
    heroImage: "https://images.unsplash.com/photo-1587654780291-39c9404d746b?auto=format&fit=crop&w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1587654780291-39c9404d746b?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1560785496-3c9d27877182?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1596464716127-f2a829822391?auto=format&fit=crop&w=800&q=80"
    ],
    ageGroups: ["Infant (0-1 yr)", "Toddler (1-3 yrs)", "Preschool (3-5 yrs)", "After School (6-10 yrs)"],
    timings: {
      regular: "24 Hours / 7 Days a Week",
      dayShift: "08:00 AM - 06:00 PM",
      nightShift: "06:00 PM - 08:00 AM",
      emergencyAvailable: true
    },
    pricing: {
      hourly: 180,
      daily: 1400,
      monthly: 18500,
      nightHourly: 240,
      nightMonthly: 23500,
      emergencyHourly: 300
    },
    safetyFeatures: [
      "24×7 On-Duty Pediatric Nurse",
      "Live CCTV Mobile Streaming",
      "Police-Verified Caregivers",
      "Child-Proofed Edge Protectors & Foam Flooring",
      "Biometric Parent Access & GPS Tracking",
      "Organic In-House Nutritious Meals",
      "Emergency Medical Tie-up with Manipal Hospital"
    ],
    certifications: [
      { name: "ISO 9001:2015 Child Safety Standard", issuer: "TUV Nord", validTill: "2027-12-31" },
      { name: "State Child Care Authority License", issuer: "Govt of Karnataka", validTill: "2026-08-15" },
      { name: "Fire & Emergency Safety NOC", issuer: "Karnataka Fire Dept", validTill: "2026-11-20" },
      { name: "Food Safety & Hygiene License (FSSAI)", issuer: "FSSAI", validTill: "2027-03-10" }
    ],
    caregivers: [
      {
        id: "cg-101",
        name: "Sister Mary Varghese",
        role: "Head Pediatric Caregiver",
        experience: "12+ Years",
        qualifications: "B.Sc Nursing, Certified Pediatric First-Aid & BLS",
        photo: "https://images.unsplash.com/photo-1594824813686-2a7e7161e1fa?auto=format&fit=crop&w=300&q=80",
        policeVerified: true,
        bgCheckId: "POL-BLR-2024-9912",
        rating: 4.95,
        shift: "Night & Emergency Rotation"
      },
      {
        id: "cg-102",
        name: "Sunita Deshmukh",
        role: "Early Childhood Educator",
        experience: "7 Years",
        qualifications: "Montessori Certified, Child Psychology Diploma",
        photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80",
        policeVerified: true,
        bgCheckId: "POL-BLR-2023-4410",
        rating: 4.88,
        shift: "Day Shift (8 AM - 4 PM)"
      },
      {
        id: "cg-103",
        name: "Pooja Sharma",
        role: "Infant Care Specialist",
        experience: "5 Years",
        qualifications: "Certified Infant Sleep & Weaning Consultant",
        photo: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=300&q=80",
        policeVerified: true,
        bgCheckId: "POL-BLR-2024-1188",
        rating: 4.92,
        shift: "Evening & Twilight Shift"
      }
    ],
    description: "Little Blooms is Indiranagar's highest-rated 24×7 childcare haven, purpose-built for working professionals in tech, healthcare, and aviation. Featuring HEPA-filtered infant sleeping pods, dedicated toddler sensory play areas, CCTV feeds accessible via parent app, and round-the-clock certified medical nursing staff."
  },
  {
    id: "dc-002",
    name: "Starlight 24×7 Daycare & Night Crèche",
    tagline: "Dedicated night-shift childcare for doctors, IT engineers, and corporate parents",
    city: "Mumbai",
    area: "Powai / Hiranandani",
    address: "Building 8, Tech Park Avenue, Central Avenue, Powai, Mumbai - 400076",
    rating: 4.8,
    reviewCount: 98,
    is24x7: true,
    supportsNightShift: true,
    supportsEmergency: true,
    isVerified: true,
    verificationStatus: "approved",
    licenseNumber: "MH-MCGM-CR-2023-5512",
    establishedYear: 2019,
    totalCapacity: 30,
    currentOccupancy: 19,
    heroImage: "https://images.unsplash.com/photo-1560785496-3c9d27877182?auto=format&fit=crop&w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1560785496-3c9d27877182?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1587654780291-39c9404d746b?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1596464716127-f2a829822391?auto=format&fit=crop&w=800&q=80"
    ],
    ageGroups: ["Infant (0-1 yr)", "Toddler (1-3 yrs)", "Preschool (3-5 yrs)"],
    timings: {
      regular: "24 Hours / 7 Days a Week",
      dayShift: "07:30 AM - 06:30 PM",
      nightShift: "06:30 PM - 08:00 AM",
      emergencyAvailable: true
    },
    pricing: {
      hourly: 200,
      daily: 1600,
      monthly: 21000,
      nightHourly: 260,
      nightMonthly: 25000,
      emergencyHourly: 350
    },
    safetyFeatures: [
      "Acoustic Soundproof Sleep Pods for Night Care",
      "Female Caregivers with 100% Police Clearance",
      "Doctor on Call & Fortis Hospital Emergency Link",
      "Real-Time App Diaper & Nap Notifications",
      "RO UV Alkaline Water & Fresh Baby Purees"
    ],
    certifications: [
      { name: "Maharashtra Child Care License", issuer: "WCD Maharashtra", validTill: "2027-01-20" },
      { name: "First Aid & CPR Certified Facility", issuer: "Red Cross India", validTill: "2026-09-30" }
    ],
    caregivers: [
      {
        id: "cg-201",
        name: "Kavita Salunkhe",
        role: "Night Care Supervisor",
        experience: "9 Years",
        qualifications: "GNM Nursing, CPR Specialist",
        photo: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=300&q=80",
        policeVerified: true,
        bgCheckId: "POL-MUM-2024-3011",
        rating: 4.9,
        shift: "Night Shift (6 PM - 8 AM)"
      },
      {
        id: "cg-202",
        name: "Ananya Roy",
        role: "Montessori Lead Guide",
        experience: "6 Years",
        qualifications: "AMI Montessori Diploma",
        photo: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&w=300&q=80",
        policeVerified: true,
        bgCheckId: "POL-MUM-2023-7712",
        rating: 4.85,
        shift: "Day Shift (8 AM - 5 PM)"
      }
    ],
    description: "Located right next to Powai Supreme IT Park, Starlight is tailored for parents working round-the-clock rotations. Equipped with specialized dark-room slumber suites with soothing white noise machines, air purifiers, and 1:2 caregiver-to-infant ratios at night."
  },
  {
    id: "dc-003",
    name: "WonderCare Montessori & 24×7 Baby Sanctuary",
    tagline: "Holistic development with flexible hourly drop-ins & round-the-clock childcare",
    city: "Bengaluru",
    area: "Whitefield / ITPL",
    address: "Near ITPL Gate 3, Whitefield Main Road, Bengaluru - 560066",
    rating: 4.7,
    reviewCount: 115,
    is24x7: true,
    supportsNightShift: true,
    supportsEmergency: true,
    isVerified: true,
    verificationStatus: "approved",
    licenseNumber: "KA-BBMP-CR-2023-1029",
    establishedYear: 2020,
    totalCapacity: 40,
    currentOccupancy: 31,
    heroImage: "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1587654780291-39c9404d746b?auto=format&fit=crop&w=800&q=80"
    ],
    ageGroups: ["Infant (0-1 yr)", "Toddler (1-3 yrs)", "Preschool (3-5 yrs)", "After School (6-10 yrs)"],
    timings: {
      regular: "24 Hours / 7 Days a Week",
      dayShift: "08:00 AM - 07:00 PM",
      nightShift: "07:00 PM - 08:00 AM",
      emergencyAvailable: true
    },
    pricing: {
      hourly: 170,
      daily: 1300,
      monthly: 17500,
      nightHourly: 220,
      nightMonthly: 21500,
      emergencyHourly: 280
    },
    safetyFeatures: [
      "Full Facility CCTV Access",
      "Trained Special Educator & Speech Therapist",
      "Daily Sanitization & UV Air Sterilization",
      "Smart ID Tagging for Child Safe Drop/Pickup"
    ],
    certifications: [
      { name: "Karnataka Pre-Primary Accreditation", issuer: "Edu Board Karnataka", validTill: "2027-06-10" },
      { name: "Pediatric CPR & AED Certified", issuer: "AHA India", validTill: "2026-10-01" }
    ],
    caregivers: [
      {
        id: "cg-301",
        name: "Geeta Ranganathan",
        role: "Senior Childcare Practitioner",
        experience: "10 Years",
        qualifications: "Early Childhood Care Education (ECCE)",
        photo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80",
        policeVerified: true,
        bgCheckId: "POL-BLR-2024-6019",
        rating: 4.88,
        shift: "Full Day / On Call"
      }
    ],
    description: "Spread over 6,000 sq ft of lush, green, baby-safe campus in Whitefield. Features open-air play zones with impact-absorbing rubberized surfaces, indoor sensory rooms, and specialized infant sleeping suites."
  },
  {
    id: "dc-004",
    name: "HappyNest 24×7 Infant Oasis & Crèche",
    tagline: "Premier infant & toddler day and night care with warm, home-like comfort",
    city: "Pune",
    area: "Hinjawadi Phase 1",
    address: "Tech Park Oasis Road, Hinjawadi Phase 1, Pune - 411057",
    rating: 4.9,
    reviewCount: 76,
    is24x7: true,
    supportsNightShift: true,
    supportsEmergency: true,
    isVerified: true,
    verificationStatus: "approved",
    licenseNumber: "MH-PMC-CR-2024-1123",
    establishedYear: 2021,
    totalCapacity: 25,
    currentOccupancy: 14,
    heroImage: "https://images.unsplash.com/photo-1596464716127-f2a829822391?auto=format&fit=crop&w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1596464716127-f2a829822391?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1587654780291-39c9404d746b?auto=format&fit=crop&w=800&q=80"
    ],
    ageGroups: ["Infant (0-1 yr)", "Toddler (1-3 yrs)", "Preschool (3-5 yrs)"],
    timings: {
      regular: "24 Hours / 7 Days a Week",
      dayShift: "08:00 AM - 06:00 PM",
      nightShift: "06:00 PM - 08:00 AM",
      emergencyAvailable: true
    },
    pricing: {
      hourly: 160,
      daily: 1250,
      monthly: 16000,
      nightHourly: 210,
      nightMonthly: 19500,
      emergencyHourly: 260
    },
    safetyFeatures: [
      "Dedicated Nanny for Infants (1:1 during nights)",
      "Daily Doctor Visit & Health Journal",
      "Fingerprint Door Access for Parents",
      "Zero Screen Time & STEM Montessori Play"
    ],
    certifications: [
      { name: "Pune Municipal Child Welfare Certification", issuer: "PMC Pune", validTill: "2027-05-15" }
    ],
    caregivers: [
      {
        id: "cg-401",
        name: "Shalini Patil",
        role: "Lead Infant Specialist",
        experience: "8 Years",
        qualifications: "Certified Infant Developmental Specialist",
        photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80",
        policeVerified: true,
        bgCheckId: "POL-PUN-2024-8821",
        rating: 4.93,
        shift: "Night Care Specialist"
      }
    ],
    description: "Designed specifically for IT parents working in Hinjawadi IT Park. We offer flexible hourly drop-ins, 24x7 overnight boarding, warm homemade meals, and gentle sleep routines."
  },
  {
    id: "dc-005",
    name: "TinySteps Day & Night Crèche",
    tagline: "Safe, nurturing daycare with structured learning and 24x7 flexible options",
    city: "Delhi-NCR",
    area: "Cyber City / Sector 29, Gurugram",
    address: "Tower C Ground Floor, Near DLF Cyber City, Gurugram - 122002",
    rating: 4.75,
    reviewCount: 89,
    is24x7: true,
    supportsNightShift: true,
    supportsEmergency: true,
    isVerified: true,
    verificationStatus: "approved",
    licenseNumber: "HR-MCG-CR-2023-7744",
    establishedYear: 2020,
    totalCapacity: 30,
    currentOccupancy: 20,
    heroImage: "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&w=800&q=80"
    ],
    ageGroups: ["Infant (0-1 yr)", "Toddler (1-3 yrs)", "Preschool (3-5 yrs)", "After School (6-10 yrs)"],
    timings: {
      regular: "24 Hours / 7 Days a Week",
      dayShift: "08:00 AM - 07:00 PM",
      nightShift: "07:00 PM - 08:00 AM",
      emergencyAvailable: true
    },
    pricing: {
      hourly: 190,
      daily: 1500,
      monthly: 19000,
      nightHourly: 250,
      nightMonthly: 24000,
      emergencyHourly: 320
    },
    safetyFeatures: [
      "Air-conditioned Sleeping Suites with HEPA 14 Filters",
      "Trained CPR Caregivers & Pediatric Emergency Protocol",
      "Live Camera Stream with Smart Parent Alerts",
      "Custom Organic Dietary Kitchen"
    ],
    certifications: [
      { name: "Gurugram Municipal Daycare License", issuer: "MCG", validTill: "2026-12-31" }
    ],
    caregivers: [
      {
        id: "cg-501",
        name: "Ritu Mathur",
        role: "Center Director & Early Learning Specialist",
        experience: "11 Years",
        qualifications: "M.A. Child Psychology, Montessori Master Trainer",
        photo: "https://images.unsplash.com/photo-1594824813686-2a7e7161e1fa?auto=format&fit=crop&w=300&q=80",
        policeVerified: true,
        bgCheckId: "POL-GUR-2024-1011",
        rating: 4.9,
        shift: "Day & Evening Rotation"
      }
    ],
    description: "Located within 2 minutes of Cyber City, TinySteps provides a tranquil, protected, high-security space for your little ones with 24-hour video surveillance and caring nursery staff."
  },
  {
    id: "dc-006",
    name: "Sunbeam 24×7 Childcare & Playschool",
    tagline: "Loving caregivers, clean facilities, and trusted around-the-clock service",
    city: "Hyderabad",
    area: "Gachibowli / Hitec City",
    address: "Lane 4, Financial District, Gachibowli, Hyderabad - 500032",
    rating: 4.85,
    reviewCount: 64,
    is24x7: true,
    supportsNightShift: true,
    supportsEmergency: true,
    isVerified: true,
    verificationStatus: "approved",
    licenseNumber: "TS-GHMC-CR-2024-3450",
    establishedYear: 2022,
    totalCapacity: 35,
    currentOccupancy: 18,
    heroImage: "https://images.unsplash.com/photo-1587654780291-39c9404d746b?auto=format&fit=crop&w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1587654780291-39c9404d746b?auto=format&fit=crop&w=800&q=80"
    ],
    ageGroups: ["Infant (0-1 yr)", "Toddler (1-3 yrs)", "Preschool (3-5 yrs)"],
    timings: {
      regular: "24 Hours / 7 Days a Week",
      dayShift: "07:30 AM - 06:30 PM",
      nightShift: "06:30 PM - 08:00 AM",
      emergencyAvailable: true
    },
    pricing: {
      hourly: 175,
      daily: 1350,
      monthly: 17000,
      nightHourly: 230,
      nightMonthly: 21000,
      emergencyHourly: 290
    },
    safetyFeatures: [
      "24x7 CCTV stream with dual security checkpoint",
      "Infant CPR Certified Staff on all shifts",
      "Nutritious South & North Indian baby meal plans",
      "Spacious sensory playrooms & nap pods"
    ],
    certifications: [
      { name: "Telangana State Childcare Registration", issuer: "GHMC Hyderabad", validTill: "2027-04-01" }
    ],
    caregivers: [
      {
        id: "cg-601",
        name: "Lakshmi Prasanna",
        role: "Senior Childcare Associate",
        experience: "6 Years",
        qualifications: "B.Ed, Child Development Specialist",
        photo: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=300&q=80",
        policeVerified: true,
        bgCheckId: "POL-HYD-2024-5502",
        rating: 4.88,
        shift: "Night & Weekend Shift"
      }
    ],
    description: "Situated in the heart of Hyderabad's Financial District, Sunbeam gives working parents complete peace of mind with verified staff, bedtime story sessions, and real-time photo logs."
  },
  {
    id: "dc-007",
    name: "AngelWings 24×7 Day & Night Crèche",
    tagline: "Reliable 24-hour childcare near IT corridor with certified pediatric assistance",
    city: "Bengaluru",
    area: "Electronic City Phase 1",
    address: "Electronic City Toll Gate Road, Near Infosys Gate 4, Bengaluru - 560100",
    rating: 4.65,
    reviewCount: 52,
    is24x7: true,
    supportsNightShift: true,
    supportsEmergency: true,
    isVerified: true,
    verificationStatus: "approved",
    licenseNumber: "KA-BBMP-CR-2023-9041",
    establishedYear: 2021,
    totalCapacity: 28,
    currentOccupancy: 15,
    heroImage: "https://images.unsplash.com/photo-1560785496-3c9d27877182?auto=format&fit=crop&w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1560785496-3c9d27877182?auto=format&fit=crop&w=800&q=80"
    ],
    ageGroups: ["Infant (0-1 yr)", "Toddler (1-3 yrs)", "Preschool (3-5 yrs)"],
    timings: {
      regular: "24 Hours / 7 Days a Week",
      dayShift: "08:00 AM - 07:00 PM",
      nightShift: "07:00 PM - 08:00 AM",
      emergencyAvailable: true
    },
    pricing: {
      hourly: 150,
      daily: 1200,
      monthly: 15500,
      nightHourly: 200,
      nightMonthly: 19000,
      emergencyHourly: 250
    },
    safetyFeatures: [
      "Live CCTV mobile feed",
      "Police verified nannies",
      "First-aid certified attendants",
      "GPS smart pickup & drop service"
    ],
    certifications: [
      { name: "Karnataka Health & Safety Compliance", issuer: "BBMP", validTill: "2026-10-15" }
    ],
    caregivers: [
      {
        id: "cg-701",
        name: "Deepa Nair",
        role: "Caregiver & Infant Nurse",
        experience: "5 Years",
        qualifications: "Diploma in General Nursing & Midwifery",
        photo: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=300&q=80",
        policeVerified: true,
        bgCheckId: "POL-BLR-2024-9182",
        rating: 4.82,
        shift: "Night Shift"
      }
    ],
    description: "Affordable, compassionate 24×7 childcare tailored for parents working shifts in Electronic City tech parks. Safe crib rooms and hygienic play areas."
  },
  {
    id: "dc-008",
    name: "Bloomfield Montessori & 24×7 Daycare [New Application]",
    tagline: "Pending verification: High standards Montessori center applying for 24x7 certification",
    city: "Bengaluru",
    area: "HSR Layout Sector 2",
    address: "14th Main, HSR Layout Sector 2, Bengaluru - 560102",
    rating: 4.5,
    reviewCount: 12,
    is24x7: true,
    supportsNightShift: true,
    supportsEmergency: false,
    isVerified: false,
    verificationStatus: "pending_review",
    licenseNumber: "KA-BBMP-CR-2024-PEND-44",
    establishedYear: 2024,
    totalCapacity: 20,
    currentOccupancy: 6,
    heroImage: "https://images.unsplash.com/photo-1596464716127-f2a829822391?auto=format&fit=crop&w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1596464716127-f2a829822391?auto=format&fit=crop&w=800&q=80"
    ],
    ageGroups: ["Toddler (1-3 yrs)", "Preschool (3-5 yrs)"],
    timings: {
      regular: "24 Hours / 7 Days a Week",
      dayShift: "08:00 AM - 06:00 PM",
      nightShift: "06:00 PM - 08:00 AM",
      emergencyAvailable: false
    },
    pricing: {
      hourly: 160,
      daily: 1250,
      monthly: 16500,
      nightHourly: 210,
      nightMonthly: 20000,
      emergencyHourly: 270
    },
    safetyFeatures: [
      "CCTV Installed",
      "Police Verification In Progress",
      "First Aid Station"
    ],
    certifications: [
      { name: "Building Fire NOC", issuer: "Karnataka Fire Services", validTill: "2027-01-01" },
      { name: "Daycare License Application", issuer: "Govt of Karnataka", validTill: "Submitted - Verification Pending" }
    ],
    caregivers: [
      {
        id: "cg-801",
        name: "Meera Krishnan",
        role: "Primary Educator",
        experience: "4 Years",
        qualifications: "B.A. Child Psychology",
        photo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80",
        policeVerified: false,
        bgCheckId: "POL-BLR-PENDING",
        rating: 4.5,
        shift: "Day Shift"
      }
    ],
    description: "New state-of-the-art facility in HSR Layout submitting documentation for Little Steps 24×7 verification accreditation."
  }
];

const SEED_REVIEWS = [
  {
    id: "rev-1",
    daycareId: "dc-001",
    author: "Priyanka & Rahul Menon",
    childAge: "Infant (9 months)",
    rating: 5,
    date: "2 days ago",
    comment: "As IT consultants on US shift hours (6 PM to 3 AM), finding Little Blooms was a life-saver! Sister Mary and the night team are incredibly gentle. The live camera access gives us complete peace of mind. Highly recommended for night shift parents!",
    verifiedBooking: true
  },
  {
    id: "rev-2",
    daycareId: "dc-001",
    author: "Dr. Aniruddh Kulkarni",
    childAge: "Toddler (2.5 yrs)",
    rating: 5,
    date: "1 week ago",
    comment: "I am an emergency on-call surgeon and frequently need drop-in emergency care at odd hours. Little Blooms accepted my toddler at 11 PM seamlessly. Safety protocols are hospital-grade clean.",
    verifiedBooking: true
  },
  {
    id: "rev-3",
    daycareId: "dc-002",
    author: "Sneha Sen",
    childAge: "Preschooler (3.5 yrs)",
    rating: 5,
    date: "2 weeks ago",
    comment: "The monthly night subscription at Starlight Powai is top-tier. My daughter loves the bedtime storytelling sessions and the freshly cooked wholesome meals. Absolutely 10/10.",
    verifiedBooking: true
  }
];

const SEED_BOOKINGS = [
  {
    id: "LS-BK-9901",
    daycareId: "dc-001",
    daycareName: "Little Blooms 24×7 Crèche & Early Learning",
    parentName: "Sadhna Sharma",
    parentEmail: "sadhna.parent@example.com",
    parentPhone: "+91 98765 43210",
    childName: "Aarav Sharma",
    childAgeGroup: "Toddler (1-3 yrs)",
    childAgeExact: "2 years 4 months",
    allergies: "Mild Peanut Allergy, Lactose Free milk preferred",
    emergencyContact: "+91 98765 43211 (Father - Rajesh)",
    planType: "nightShift", // hourly, daily, nightShift, monthly
    planName: "24×7 Night Shift Plan",
    startDate: "2026-09-28",
    startTime: "18:30",
    endTime: "08:00 (Next Day)",
    duration: "13.5 Hours",
    priceTotal: 3240,
    status: "checked_in", // pending, confirmed, checked_in, completed, cancelled
    createdAt: "2026-09-27 14:30",
    caregiverAssigned: "Sister Mary Varghese",
    qrCodeToken: "QR-LS-9901-SECURE-TOKEN-AARAV",
    liveActivityLog: [
      { time: "18:45", event: "Check-in Complete", note: "Aarav arrived cheerfully. Temperature 98.4°F normal. Sanitized & settled." },
      { time: "19:30", event: "Dinner Served", note: "Ate warm vegetable khichdi and lactose-free curd. Good appetite." },
      { time: "20:30", event: "Bedtime Routine", note: "Brushed teeth, listened to bedtime jungle story with Sister Mary." },
      { time: "21:15", event: "Asleep in Pod 4", note: "Resting peacefully. Sound & breathing monitors active." }
    ]
  },
  {
    id: "LS-BK-9902",
    daycareId: "dc-001",
    daycareName: "Little Blooms 24×7 Crèche & Early Learning",
    parentName: "Vikram Sethi",
    parentEmail: "vikram.sethi@example.com",
    parentPhone: "+91 98112 34567",
    childName: "Dia Sethi",
    childAgeGroup: "Infant (0-1 yr)",
    childAgeExact: "8 months",
    allergies: "None",
    emergencyContact: "+91 98112 34568 (Mother - Renu)",
    planType: "monthly",
    planName: "Full-Time Monthly Care",
    startDate: "2026-10-01",
    startTime: "08:30",
    endTime: "18:30",
    duration: "1 Month (Unlimited Day Shifts)",
    priceTotal: 18500,
    status: "confirmed",
    createdAt: "2026-09-26 10:15",
    caregiverAssigned: "Sunita Deshmukh",
    qrCodeToken: "QR-LS-9902-SECURE-TOKEN-DIA",
    liveActivityLog: []
  },
  {
    id: "LS-BK-9903",
    daycareId: "dc-002",
    daycareName: "Starlight 24×7 Daycare & Night Crèche",
    parentName: "Pooja Reddy",
    parentEmail: "pooja.reddy@example.com",
    parentPhone: "+91 99001 88776",
    childName: "Kabir Reddy",
    childAgeGroup: "Preschool (3-5 yrs)",
    childAgeExact: "4 years",
    allergies: "None",
    emergencyContact: "+91 99001 88777 (Father - Anuj)",
    planType: "hourly",
    planName: "Emergency 4-Hour Drop-in",
    startDate: "2026-09-27",
    startTime: "14:00",
    endTime: "18:00",
    duration: "4 Hours",
    priceTotal: 800,
    status: "completed",
    createdAt: "2026-09-27 12:00",
    caregiverAssigned: "Ananya Roy",
    qrCodeToken: "QR-LS-9903-SECURE-TOKEN-KABIR",
    liveActivityLog: [
      { time: "14:05", event: "Check-in Complete", note: "Kabir checked in for afternoon drop-in." },
      { time: "15:30", event: "Art & Craft", note: "Created water color painting of stars." },
      { time: "17:00", event: "Evening Snack", note: "Apple slices and wholewheat cookies." },
      { time: "18:00", event: "Parent Pick-up", note: "Checked out safely with Mother Pooja Reddy." }
    ]
  },
  {
    id: "LS-BK-9904",
    daycareId: "dc-001",
    daycareName: "Little Blooms 24×7 Crèche & Early Learning",
    parentName: "Amitabh Verma",
    parentEmail: "amitabh.v@example.com",
    parentPhone: "+91 97711 22334",
    childName: "Rohan Verma",
    childAgeGroup: "Toddler (1-3 yrs)",
    childAgeExact: "2 years",
    allergies: "Dust allergy (uses inhaler if wheezing)",
    emergencyContact: "+91 97711 22335",
    planType: "hourly",
    planName: "Night Hourly Care",
    startDate: "2026-09-28",
    startTime: "20:00",
    endTime: "01:00",
    duration: "5 Hours",
    priceTotal: 1200,
    status: "pending",
    createdAt: "2026-09-27 19:40",
    caregiverAssigned: "Sister Mary Varghese",
    qrCodeToken: "QR-LS-9904-SECURE-TOKEN-ROHAN",
    liveActivityLog: []
  }
];

const SEED_DISPUTES = [
  {
    id: "DSP-101",
    bookingId: "LS-BK-8840",
    daycareName: "WonderCare Montessori",
    parentName: "Neha Gupta",
    issueType: "Schedule Reschedule Request",
    severity: "Low",
    status: "resolved",
    date: "2026-09-25",
    description: "Parent requested shift timing modification from 7 PM to 9 PM due to flight delay. Provider accepted reschedule smoothly without extra penalty.",
    resolution: "Reschedule approved with zero cancellation fee."
  },
  {
    id: "DSP-102",
    bookingId: "LS-BK-9904",
    daycareName: "Bloomfield Montessori (Pending)",
    parentName: "Deepak Mehra",
    issueType: "Verification Inquiry",
    severity: "Medium",
    status: "open",
    date: "2026-09-27",
    description: "Parent inquired whether Bloomfield Montessori has completed mandatory police verification before booking night slots.",
    resolution: "Admin safety team tagged daycare for expedited document inspection."
  }
];

// Export to window
if (typeof window !== "undefined") {
  window.SEED_DAYCARES = SEED_DAYCARES;
  window.SEED_REVIEWS = SEED_REVIEWS;
  window.SEED_BOOKINGS = SEED_BOOKINGS;
  window.SEED_DISPUTES = SEED_DISPUTES;
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    SEED_DAYCARES,
    SEED_REVIEWS,
    SEED_BOOKINGS,
    SEED_DISPUTES
  };
}
