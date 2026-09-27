/**
 * Little Steps - Central Reactive State Store
 * Handles data persistence, real-time updates, role switching, and action dispatchers.
 */

class LittleStepsState {
  constructor() {
    this.STORAGE_KEY = "LITTLE_STEPS_STATE_V1";
    this.subscribers = [];
    this.init();
  }

  init() {
    const saved = localStorage.getItem(this.STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        this.data = {
          daycares: parsed.daycares || window.SEED_DAYCARES,
          reviews: parsed.reviews || window.SEED_REVIEWS,
          bookings: parsed.bookings || window.SEED_BOOKINGS,
          disputes: parsed.disputes || window.SEED_DISPUTES,
          currentRole: parsed.currentRole || "parent", // parent, provider, admin
          selectedCity: parsed.selectedCity || "All Cities",
          searchQuery: parsed.searchQuery || "",
          activeFilters: parsed.activeFilters || {
            is24x7: false,
            nightShift: false,
            emergency: false,
            ageGroup: "all",
            maxPrice: 300,
            minRating: 0
          },
          currentParent: parsed.currentParent || {
            name: "Sadhna Sharma",
            email: "sadhna.parent@example.com",
            phone: "+91 98765 43210",
            children: [
              { name: "Aarav Sharma", age: "2 years 4 months", ageGroup: "Toddler (1-3 yrs)", allergies: "Mild Peanut Allergy" }
            ],
            subscriptions: [
              {
                id: "SUB-8812",
                daycareId: "dc-001",
                daycareName: "Little Blooms 24×7 Crèche",
                plan: "24×7 Night Care Pass",
                hoursAllocated: 60,
                hoursUsed: 28,
                renewalDate: "2026-10-15",
                status: "Active"
              }
            ]
          },
          currentProvider: parsed.currentProvider || {
            id: "dc-001",
            name: "Little Blooms 24×7 Crèche & Early Learning",
            contactEmail: "admin@littlebloomsblr.com",
            phone: "+91 80 4912 3456"
          },
          notifications: parsed.notifications || [
            {
              id: "notif-1",
              role: "parent",
              title: "Live Update: Aarav is Asleep 🌙",
              message: "Sister Mary tucked Aarav into Pod 4 after his bedtime story. Sound monitor active.",
              time: "25m ago",
              unread: true,
              type: "status"
            },
            {
              id: "notif-2",
              role: "provider",
              title: "New Night Shift Request Received 📋",
              message: "Amitabh Verma requested a 5-Hour Night Care slot for Rohan (Toddler).",
              time: "1 hour ago",
              unread: true,
              type: "booking"
            },
            {
              id: "notif-3",
              role: "admin",
              title: "Daycare Verification Pending 🛡️",
              message: "Bloomfield Montessori submitted police verification & fire safety NOC for review.",
              time: "3 hours ago",
              unread: true,
              type: "admin"
            }
          ],
          favorites: parsed.favorites || ["dc-001", "dc-002"]
        };
      } catch (e) {
        console.error("State parse error, restoring defaults:", e);
        this.resetToDefaults();
      }
    } else {
      this.resetToDefaults();
    }
  }

  resetToDefaults() {
    this.data = {
      daycares: JSON.parse(JSON.stringify(window.SEED_DAYCARES)),
      reviews: JSON.parse(JSON.stringify(window.SEED_REVIEWS)),
      bookings: JSON.parse(JSON.stringify(window.SEED_BOOKINGS)),
      disputes: JSON.parse(JSON.stringify(window.SEED_DISPUTES)),
      currentRole: "parent",
      selectedCity: "All Cities",
      searchQuery: "",
      activeFilters: {
        is24x7: false,
        nightShift: false,
        emergency: false,
        ageGroup: "all",
        maxPrice: 350,
        minRating: 0
      },
      currentParent: {
        name: "Sadhna Sharma",
        email: "sadhna.parent@example.com",
        phone: "+91 98765 43210",
        children: [
          { name: "Aarav Sharma", age: "2 years 4 months", ageGroup: "Toddler (1-3 yrs)", allergies: "Mild Peanut Allergy" }
        ],
        subscriptions: [
          {
            id: "SUB-8812",
            daycareId: "dc-001",
            daycareName: "Little Blooms 24×7 Crèche",
            plan: "24×7 Night Care Pass",
            hoursAllocated: 60,
            hoursUsed: 28,
            renewalDate: "2026-10-15",
            status: "Active"
          }
        ]
      },
      currentProvider: {
        id: "dc-001",
        name: "Little Blooms 24×7 Crèche & Early Learning",
        contactEmail: "admin@littlebloomsblr.com",
        phone: "+91 80 4912 3456"
      },
      notifications: [
        {
          id: "notif-1",
          role: "parent",
          title: "Live Update: Aarav is Asleep 🌙",
          message: "Sister Mary tucked Aarav into Pod 4 after his bedtime story. Sound monitor active.",
          time: "25m ago",
          unread: true,
          type: "status"
        },
        {
          id: "notif-2",
          role: "provider",
          title: "New Night Shift Request Received 📋",
          message: "Amitabh Verma requested a 5-Hour Night Care slot for Rohan (Toddler).",
          time: "1 hour ago",
          unread: true,
          type: "booking"
        },
        {
          id: "notif-3",
          role: "admin",
          title: "Daycare Verification Pending 🛡️",
          message: "Bloomfield Montessori submitted police verification & fire safety NOC for review.",
          time: "3 hours ago",
          unread: true,
          type: "admin"
        }
      ],
      favorites: ["dc-001", "dc-002"]
    };
    this.persist();
  }

  persist() {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.data));
    } catch (e) {
      console.error("Storage save error:", e);
    }
    this.notify();
  }

  subscribe(listener) {
    this.subscribers.push(listener);
    return () => {
      this.subscribers = this.subscribers.filter(sub => sub !== listener);
    };
  }

  notify() {
    this.subscribers.forEach(listener => {
      try {
        listener(this.data);
      } catch (err) {
        console.error("Subscriber notification error:", err);
      }
    });
  }

  // Role Management
  setRole(role) {
    if (["parent", "provider", "admin"].includes(role)) {
      this.data.currentRole = role;
      this.persist();
    }
  }

  // Daycare Management
  getDaycares() {
    return this.data.daycares;
  }

  getDaycareById(id) {
    return this.data.daycares.find(dc => dc.id === id);
  }

  updateDaycare(id, updates) {
    const idx = this.data.daycares.findIndex(dc => dc.id === id);
    if (idx !== -1) {
      this.data.daycares[idx] = { ...this.data.daycares[idx], ...updates };
      this.persist();
      return this.data.daycares[idx];
    }
    return null;
  }

  addCaregiver(daycareId, caregiver) {
    const dc = this.getDaycareById(daycareId);
    if (dc) {
      const newCg = {
        id: "cg-" + Date.now().toString().slice(-4),
        rating: 5.0,
        ...caregiver
      };
      dc.caregivers = dc.caregivers || [];
      dc.caregivers.push(newCg);
      this.persist();
      return newCg;
    }
    return null;
  }

  // Bookings Management
  getBookings() {
    return this.data.bookings;
  }

  getBookingById(id) {
    return this.data.bookings.find(bk => bk.id === id);
  }

  createBooking(bookingData) {
    const dc = this.getDaycareById(bookingData.daycareId);
    const newBooking = {
      id: "LS-BK-" + Math.floor(1000 + Math.random() * 9000),
      createdAt: new Date().toISOString().replace("T", " ").slice(0, 16),
      status: "pending",
      daycareName: dc ? dc.name : "Little Steps Certified Center",
      qrCodeToken: "QR-LS-" + Math.random().toString(36).substring(2, 10).toUpperCase(),
      liveActivityLog: [
        {
          time: new Date().toTimeString().slice(0, 5),
          event: "Booking Request Created",
          note: "Booking submitted by parent. Awaiting daycare confirmation."
        }
      ],
      ...bookingData
    };

    this.data.bookings.unshift(newBooking);

    // Add notification for provider
    this.addNotification({
      role: "provider",
      title: "New Booking Request",
      message: `${newBooking.parentName} booked a ${newBooking.planName} for ${newBooking.childName}`,
      type: "booking"
    });

    this.persist();
    return newBooking;
  }

  updateBookingStatus(bookingId, newStatus, caregiverAssigned = null) {
    const booking = this.getBookingById(bookingId);
    if (booking) {
      booking.status = newStatus;
      if (caregiverAssigned) {
        booking.caregiverAssigned = caregiverAssigned;
      }
      
      // Auto add activity entry
      const timeStr = new Date().toTimeString().slice(0, 5);
      if (newStatus === "confirmed") {
        booking.liveActivityLog.push({
          time: timeStr,
          event: "Booking Confirmed",
          note: `Slot locked. Dedicated caregiver ${booking.caregiverAssigned || 'Team'} prepared.`
        });
        this.addNotification({
          role: "parent",
          title: "Booking Confirmed! 🎉",
          message: `Your reservation at ${booking.daycareName} has been confirmed.`,
          type: "status"
        });
      } else if (newStatus === "checked_in") {
        booking.liveActivityLog.push({
          time: timeStr,
          event: "Child Checked-in",
          note: `${booking.childName} checked in safely. Sanitization and intake log complete.`
        });
        this.addNotification({
          role: "parent",
          title: `${booking.childName} is Checked-In 🧸`,
          message: `Your child is safely in the care of ${booking.daycareName}.`,
          type: "status"
        });
      } else if (newStatus === "completed") {
        booking.liveActivityLog.push({
          time: timeStr,
          event: "Check-out Complete",
          note: `${booking.childName} safely picked up. Session successfully concluded.`
        });
        this.addNotification({
          role: "parent",
          title: "Session Completed & Picked Up",
          message: `Thank you for trusting Little Steps! Please share your feedback.`,
          type: "status"
        });
      }

      this.persist();
      return booking;
    }
    return null;
  }

  addLiveActivity(bookingId, event, note) {
    const booking = this.getBookingById(bookingId);
    if (booking) {
      booking.liveActivityLog = booking.liveActivityLog || [];
      const timeStr = new Date().toTimeString().slice(0, 5);
      const entry = { time: timeStr, event, note };
      booking.liveActivityLog.push(entry);

      this.addNotification({
        role: "parent",
        title: `Live Update for ${booking.childName}: ${event}`,
        message: note,
        type: "status"
      });

      this.persist();
      return entry;
    }
    return null;
  }

  // Reviews
  addReview(daycareId, reviewData) {
    const newRev = {
      id: "rev-" + Date.now().toString().slice(-4),
      daycareId,
      date: "Just now",
      verifiedBooking: true,
      ...reviewData
    };
    this.data.reviews.unshift(newRev);

    // Update daycare average rating
    const dc = this.getDaycareById(daycareId);
    if (dc) {
      const allDcRevs = this.data.reviews.filter(r => r.daycareId === daycareId);
      const avg = allDcRevs.reduce((acc, curr) => acc + curr.rating, 0) / allDcRevs.length;
      dc.rating = parseFloat(avg.toFixed(1));
      dc.reviewCount = (dc.reviewCount || 0) + 1;
    }

    this.persist();
    return newRev;
  }

  getReviewsForDaycare(daycareId) {
    return this.data.reviews.filter(r => r.daycareId === daycareId);
  }

  // Admin Actions
  verifyDaycare(daycareId, status, notes = "") {
    const dc = this.getDaycareById(daycareId);
    if (dc) {
      dc.verificationStatus = status;
      dc.isVerified = (status === "approved");
      dc.verificationNotes = notes;

      this.addNotification({
        role: "provider",
        title: `Center Verification ${status.toUpperCase()} 🛡️`,
        message: status === "approved"
          ? "Congratulations! Your daycare has received Little Steps Trusted 24×7 Certification."
          : `Verification status updated: ${status}. Admin notes: ${notes}`,
        type: "admin"
      });

      this.persist();
      return dc;
    }
    return null;
  }

  // Notifications
  addNotification({ role, title, message, type }) {
    const notif = {
      id: "notif-" + Date.now(),
      role: role || "all",
      title,
      message,
      time: "Just now",
      unread: true,
      type: type || "info"
    };
    this.data.notifications.unshift(notif);
    if (this.data.notifications.length > 20) {
      this.data.notifications.pop();
    }
  }

  markAllNotificationsRead(role) {
    this.data.notifications.forEach(n => {
      if (n.role === role || n.role === "all") {
        n.unread = false;
      }
    });
    this.persist();
  }

  // Favorites
  toggleFavorite(daycareId) {
    const idx = this.data.favorites.indexOf(daycareId);
    if (idx !== -1) {
      this.data.favorites.splice(idx, 1);
    } else {
      this.data.favorites.push(daycareId);
    }
    this.persist();
  }

  // KPI Analytics
  getPlatformKPIs() {
    const daycares = this.data.daycares;
    const bookings = this.data.bookings;
    const verifiedCenters = daycares.filter(d => d.isVerified).length;
    const pendingCenters = daycares.filter(d => d.verificationStatus === "pending_review").length;
    
    const totalCapacity = daycares.reduce((sum, d) => sum + (d.totalCapacity || 0), 0);
    const totalOccupancy = daycares.reduce((sum, d) => sum + (d.currentOccupancy || 0), 0);
    const avgUtilization = totalCapacity > 0 ? Math.round((totalOccupancy / totalCapacity) * 100) : 0;

    const totalGrossRevenue = bookings.reduce((sum, b) => sum + (b.priceTotal || 0), 0);
    const completedBookings = bookings.filter(b => b.status === "completed" || b.status === "checked_in").length;
    const conversionRate = bookings.length > 0 ? Math.round((completedBookings / bookings.length) * 100) : 85;

    return {
      totalParents: 1240,
      totalDaycares: daycares.length,
      verifiedCenters,
      pendingCenters,
      totalBookings: bookings.length,
      avgUtilization,
      totalGrossRevenue,
      conversionRate,
      avgSatisfaction: 4.88
    };
  }
}

// Instantiate global state
window.LSState = new LittleStepsState();
