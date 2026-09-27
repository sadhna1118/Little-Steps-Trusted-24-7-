const express = require('express');
const cors = require('cors');
const path = require('path');
const { SEED_DAYCARES, SEED_REVIEWS, SEED_BOOKINGS, SEED_DISPUTES } = require('./js/data.js');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname)));

// In-Memory store initialized with seed data
let daycares = JSON.parse(JSON.stringify(SEED_DAYCARES));
let reviews = JSON.parse(JSON.stringify(SEED_REVIEWS));
let bookings = JSON.parse(JSON.stringify(SEED_BOOKINGS));
let disputes = JSON.parse(JSON.stringify(SEED_DISPUTES));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'healthy', platform: 'Little Steps 24x7 Childcare Platform', timestamp: new Date() });
});

// Daycare Endpoints
app.get('/api/daycares', (req, res) => {
  const { city, is24x7, nightShift, emergency, ageGroup } = req.query;
  let results = [...daycares];

  if (city && city !== 'All Cities') {
    results = results.filter(d => d.city.toLowerCase() === city.toLowerCase());
  }
  if (is24x7 === 'true') {
    results = results.filter(d => d.is24x7);
  }
  if (nightShift === 'true') {
    results = results.filter(d => d.supportsNightShift);
  }
  if (emergency === 'true') {
    results = results.filter(d => d.supportsEmergency);
  }
  if (ageGroup && ageGroup !== 'all') {
    results = results.filter(d => d.ageGroups.some(ag => ag.toLowerCase().includes(ageGroup.toLowerCase())));
  }

  res.json({ success: true, count: results.length, data: results });
});

app.get('/api/daycares/:id', (req, res) => {
  const dc = daycares.find(d => d.id === req.params.id);
  if (!dc) return res.status(404).json({ success: false, error: 'Daycare not found' });
  const dcReviews = reviews.filter(r => r.daycareId === req.params.id);
  res.json({ success: true, data: { ...dc, reviews: dcReviews } });
});

app.post('/api/daycares', (req, res) => {
  const newDc = {
    id: `dc-${Date.now().toString().slice(-4)}`,
    isVerified: false,
    verificationStatus: 'pending_review',
    rating: 5.0,
    reviewCount: 0,
    currentOccupancy: 0,
    establishedYear: new Date().getFullYear(),
    images: ["https://images.unsplash.com/photo-1587654780291-39c9404d746b?auto=format&fit=crop&w=800&q=80"],
    ...req.body
  };
  daycares.push(newDc);
  res.status(201).json({ success: true, data: newDc });
});

app.patch('/api/daycares/:id', (req, res) => {
  const idx = daycares.findIndex(d => d.id === req.params.id);
  if (idx === -1) return res.status(404).json({ success: false, error: 'Daycare not found' });
  daycares[idx] = { ...daycares[idx], ...req.body };
  res.json({ success: true, data: daycares[idx] });
});

app.post('/api/daycares/:id/caregivers', (req, res) => {
  const dc = daycares.find(d => d.id === req.params.id);
  if (!dc) return res.status(404).json({ success: false, error: 'Daycare not found' });
  
  const newCaregiver = {
    id: `cg-${Date.now().toString().slice(-4)}`,
    rating: 5.0,
    policeVerified: true,
    ...req.body
  };
  dc.caregivers = dc.caregivers || [];
  dc.caregivers.push(newCaregiver);
  res.status(201).json({ success: true, data: newCaregiver });
});

// Bookings Endpoints
app.get('/api/bookings', (req, res) => {
  const { daycareId, parentEmail } = req.query;
  let results = [...bookings];
  if (daycareId) results = results.filter(b => b.daycareId === daycareId);
  if (parentEmail) results = results.filter(b => b.parentEmail === parentEmail);
  res.json({ success: true, count: results.length, data: results });
});

app.post('/api/bookings', (req, res) => {
  const dc = daycares.find(d => d.id === req.body.daycareId);
  const newBooking = {
    id: `LS-BK-${Math.floor(1000 + Math.random() * 9000)}`,
    createdAt: new Date().toISOString().replace('T', ' ').slice(0, 16),
    status: 'pending',
    daycareName: dc ? dc.name : 'Little Steps Certified Center',
    qrCodeToken: `QR-LS-${Math.random().toString(36).substring(2, 10).toUpperCase()}`,
    liveActivityLog: [
      {
        time: new Date().toTimeString().slice(0, 5),
        event: 'Booking Request Submitted',
        note: 'Reservation request initiated by parent. Pending center confirmation.'
      }
    ],
    ...req.body
  };
  bookings.unshift(newBooking);
  res.status(201).json({ success: true, data: newBooking });
});

app.patch('/api/bookings/:id/status', (req, res) => {
  const booking = bookings.find(b => b.id === req.params.id);
  if (!booking) return res.status(404).json({ success: false, error: 'Booking not found' });

  const { status, caregiverAssigned, note } = req.body;
  if (status) booking.status = status;
  if (caregiverAssigned) booking.caregiverAssigned = caregiverAssigned;

  const timeStr = new Date().toTimeString().slice(0, 5);
  booking.liveActivityLog.push({
    time: timeStr,
    event: `Status updated to ${status}`,
    note: note || `Booking marked as ${status}`
  });

  res.json({ success: true, data: booking });
});

app.post('/api/bookings/:id/activity', (req, res) => {
  const booking = bookings.find(b => b.id === req.params.id);
  if (!booking) return res.status(404).json({ success: false, error: 'Booking not found' });

  const { event, note } = req.body;
  const timeStr = new Date().toTimeString().slice(0, 5);
  const entry = { time: timeStr, event, note };
  booking.liveActivityLog.push(entry);
  res.status(201).json({ success: true, data: entry });
});

// Reviews Endpoints
app.get('/api/reviews/:daycareId', (req, res) => {
  const dcReviews = reviews.filter(r => r.daycareId === req.params.daycareId);
  res.json({ success: true, count: dcReviews.length, data: dcReviews });
});

app.post('/api/reviews', (req, res) => {
  const newRev = {
    id: `rev-${Date.now().toString().slice(-4)}`,
    date: 'Just now',
    verifiedBooking: true,
    ...req.body
  };
  reviews.unshift(newRev);

  // Recalculate average rating
  const dc = daycares.find(d => d.id === req.body.daycareId);
  if (dc) {
    const dcReviews = reviews.filter(r => r.daycareId === req.body.daycareId);
    const avg = dcReviews.reduce((sum, r) => sum + r.rating, 0) / dcReviews.length;
    dc.rating = parseFloat(avg.toFixed(1));
    dc.reviewCount = (dc.reviewCount || 0) + 1;
  }

  res.status(201).json({ success: true, data: newRev });
});

// Admin Verification Endpoint
app.post('/api/admin/verify/:daycareId', (req, res) => {
  const dc = daycares.find(d => d.id === req.params.daycareId);
  if (!dc) return res.status(404).json({ success: false, error: 'Daycare not found' });

  const { status, notes } = req.body;
  dc.verificationStatus = status;
  dc.isVerified = (status === 'approved');
  dc.verificationNotes = notes;

  res.json({ success: true, data: dc });
});

// Analytics & KPI Endpoint
app.get('/api/stats/kpis', (req, res) => {
  const totalCapacity = daycares.reduce((sum, d) => sum + (d.totalCapacity || 0), 0);
  const totalOccupancy = daycares.reduce((sum, d) => sum + (d.currentOccupancy || 0), 0);
  const avgUtilization = totalCapacity > 0 ? Math.round((totalOccupancy / totalCapacity) * 100) : 0;
  const totalGrossRevenue = bookings.reduce((sum, b) => sum + (b.priceTotal || 0), 0);

  res.json({
    success: true,
    data: {
      totalParents: 1240,
      totalDaycares: daycares.length,
      verifiedCenters: daycares.filter(d => d.isVerified).length,
      pendingCenters: daycares.filter(d => d.verificationStatus === 'pending_review').length,
      totalBookings: bookings.length,
      avgUtilization,
      totalGrossRevenue,
      conversionRate: 92,
      avgSatisfaction: 4.88
    }
  });
});

// Fallback to index.html for SPA routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`=======================================================`);
  console.log(`🚀 Little Steps 24x7 Childcare Platform Server Running!`);
  console.log(`🔗 Local URL: http://localhost:${PORT}`);
  console.log(`📁 Serving Static Assets & REST APIs`);
  console.log(`=======================================================`);
});
