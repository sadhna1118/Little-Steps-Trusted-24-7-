/**
 * Little Steps - Childcare Provider & Crèche Portal Module
 * Handles Provider Dashboard, Capacity Management, Booking Approvals, Caregiver Staff Roster & Live Activity Feeds
 */

const ProviderModule = {
  currentDaycareId: "dc-001", // Little Blooms 24x7 Crèche

  init() {
    this.renderProviderPortal();
  },

  renderProviderPortal() {
    const container = document.getElementById("provider-portal-view");
    if (!container) return;

    const dc = window.LSState.getDaycareById(this.currentDaycareId) || window.LSState.getDaycares()[0];
    if (!dc) return;

    const allBookings = window.LSState.getBookings();
    const providerBookings = allBookings.filter(b => b.daycareId === dc.id);
    
    const pendingBookings = providerBookings.filter(b => b.status === "pending");
    const activeCheckedIn = providerBookings.filter(b => b.status === "checked_in");
    const confirmedUpcoming = providerBookings.filter(b => b.status === "confirmed");

    const occupancyRate = Math.round((dc.currentOccupancy / dc.totalCapacity) * 100);
    const monthlyRev = providerBookings.reduce((sum, b) => sum + (b.priceTotal || 0), 0);

    container.innerHTML = `
      <div class="container" style="padding: 2.5rem 0 4rem 0;">
        <!-- Provider Top Header -->
        <div class="flex justify-between items-center" style="margin-bottom: 2rem;">
          <div>
            <div class="flex items-center gap-2" style="margin-bottom: 4px;">
              <span class="badge ${dc.isVerified ? 'badge-verified' : 'badge-pending'}">
                ${dc.isVerified ? '🛡️ Little Steps 24×7 Certified Center' : '⏳ Verification In Progress'}
              </span>
              <span class="badge badge-24x7">🌙 24×7 Operations Active</span>
            </div>
            <h1 style="font-size: 2.2rem; margin-bottom: 0.25rem;">${dc.name}</h1>
            <p style="color: var(--text-secondary); font-size: 0.95rem;">
              Provider Operations Center • License: <strong>${dc.licenseNumber}</strong> • ${dc.area}, ${dc.city}
            </p>
          </div>

          <div class="flex gap-2">
            <button class="btn btn-outline btn-sm" onclick="ProviderModule.openEditProfileModal('${dc.id}')">
              ⚙️ Center Settings & Rates
            </button>
            <button class="btn btn-primary btn-sm" onclick="ProviderModule.openAddCaregiverModal('${dc.id}')">
              + Add Caregiver
            </button>
          </div>
        </div>

        <!-- 1. KPI Stats Cards Grid -->
        <div class="dashboard-kpi-grid">
          <div class="kpi-stat-card">
            <div class="kpi-stat-icon" style="background: #ECFDF5; color: #059669;">👶</div>
            <div>
              <div class="kpi-stat-value">${activeCheckedIn.length}</div>
              <div class="kpi-stat-label">Currently Checked-In</div>
            </div>
          </div>

          <div class="kpi-stat-card">
            <div class="kpi-stat-icon" style="background: #EFF6FF; color: #2563EB;">📊</div>
            <div>
              <div class="kpi-stat-value">${dc.currentOccupancy} / ${dc.totalCapacity}</div>
              <div class="kpi-stat-label">Capacity Utilized (${occupancyRate}%)</div>
            </div>
          </div>

          <div class="kpi-stat-card">
            <div class="kpi-stat-icon" style="background: #FEF3C7; color: #D97706;">⏳</div>
            <div>
              <div class="kpi-stat-value">${pendingBookings.length}</div>
              <div class="kpi-stat-label">Pending Requests</div>
            </div>
          </div>

          <div class="kpi-stat-card">
            <div class="kpi-stat-icon" style="background: #F5F3FF; color: #7C3AED;">💳</div>
            <div>
              <div class="kpi-stat-value">₹${monthlyRev.toLocaleString()}</div>
              <div class="kpi-stat-label">Gross Bookings Value</div>
            </div>
          </div>
        </div>

        <!-- 2. Live Checked-In Children & Activity Logger -->
        <div style="background: #FFFFFF; border: 1px solid var(--border-light); border-radius: var(--radius-md); padding: 1.5rem; margin-bottom: 2rem;">
          <div class="flex justify-between items-center" style="margin-bottom: 1.25rem;">
            <div class="flex items-center gap-2">
              <span class="live-dot"></span>
              <h3 style="font-size: 1.25rem;">Live Checked-In Children (${activeCheckedIn.length})</h3>
            </div>
            <span style="font-size: 0.85rem; color: var(--text-secondary);">Real-time parent updates broadcaster</span>
          </div>

          ${activeCheckedIn.length === 0 ? `
            <div style="text-align: center; padding: 2rem; color: var(--text-secondary); background: var(--bg-subtle); border-radius: var(--radius-sm);">
              No children currently checked-in for this active shift.
            </div>
          ` : `
            <div class="data-table-container">
              <table class="data-table">
                <thead>
                  <tr>
                    <th>Child / Age</th>
                    <th>Parent & Phone</th>
                    <th>Assigned Caregiver</th>
                    <th>Shift & Plan</th>
                    <th>Last Activity</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  ${activeCheckedIn.map(bk => {
                    const lastLog = bk.liveActivityLog?.[bk.liveActivityLog.length - 1];
                    return `
                      <tr>
                        <td>
                          <strong>${bk.childName}</strong>
                          <div style="font-size: 0.78rem; color: var(--text-secondary);">${bk.childAgeGroup}</div>
                          ${bk.allergies ? `<span style="font-size: 0.72rem; color: var(--coral-600); font-weight: 700;">⚠️ ${bk.allergies}</span>` : ''}
                        </td>
                        <td>
                          <div>${bk.parentName}</div>
                          <div style="font-size: 0.78rem; color: var(--text-muted);">${bk.parentPhone}</div>
                        </td>
                        <td>
                          <span class="badge badge-verified">👩‍⚕️ ${bk.caregiverAssigned || 'Sister Mary'}</span>
                        </td>
                        <td>
                          <span class="badge badge-24x7">${bk.planName}</span>
                          <div style="font-size: 0.75rem; color: var(--text-muted);">${bk.startTime} - ${bk.endTime}</div>
                        </td>
                        <td>
                          <div style="font-size: 0.82rem; font-weight: 600;">${lastLog ? lastLog.event : 'Checked-in'}</div>
                          <div style="font-size: 0.75rem; color: var(--text-muted);">${lastLog ? lastLog.time : ''}</div>
                        </td>
                        <td>
                          <div class="flex gap-2">
                            <button class="btn btn-primary btn-sm" onclick="ProviderModule.openLiveLogModal('${bk.id}')">
                              + Post Update
                            </button>
                            <button class="btn btn-secondary btn-sm" onclick="ProviderModule.checkOutChild('${bk.id}')">
                              ✓ Check Out
                            </button>
                          </div>
                        </td>
                      </tr>
                    `;
                  }).join('')}
                </tbody>
              </table>
            </div>
          `}
        </div>

        <!-- 3. Pending & Upcoming Bookings Management -->
        <div style="background: #FFFFFF; border: 1px solid var(--border-light); border-radius: var(--radius-md); padding: 1.5rem; margin-bottom: 2rem;">
          <div class="flex justify-between items-center" style="margin-bottom: 1.25rem;">
            <h3 style="font-size: 1.25rem;">Booking Requests & Reservations (${providerBookings.length})</h3>
            <span style="font-size: 0.85rem; color: var(--text-secondary);">${pendingBookings.length} Pending Approval</span>
          </div>

          <div class="data-table-container">
            <table class="data-table">
              <thead>
                <tr>
                  <th>Booking ID</th>
                  <th>Parent / Child</th>
                  <th>Plan & Timing</th>
                  <th>Total Amount</th>
                  <th>Status</th>
                  <th>Manage</th>
                </tr>
              </thead>
              <tbody>
                ${providerBookings.map(bk => `
                  <tr>
                    <td><strong>${bk.id}</strong></td>
                    <td>
                      <div><strong>${bk.childName}</strong> (${bk.childAgeGroup})</div>
                      <div style="font-size: 0.8rem; color: var(--text-secondary);">Parent: ${bk.parentName} (${bk.parentPhone})</div>
                    </td>
                    <td>
                      <div>${bk.planName}</div>
                      <div style="font-size: 0.78rem; color: var(--text-muted);">${bk.startDate} • ${bk.startTime} to ${bk.endTime}</div>
                    </td>
                    <td>
                      <strong style="color: var(--primary-700);">₹${bk.priceTotal}</strong>
                    </td>
                    <td>
                      ${bk.status === 'pending' ? `<span class="badge badge-pending">⏳ Pending</span>` : ''}
                      ${bk.status === 'confirmed' ? `<span class="badge badge-confirmed">✓ Confirmed</span>` : ''}
                      ${bk.status === 'checked_in' ? `<span class="badge badge-checkedin">● Active Checked-In</span>` : ''}
                      ${bk.status === 'completed' ? `<span class="badge badge-completed">✓ Completed</span>` : ''}
                    </td>
                    <td>
                      <div class="flex gap-2">
                        ${bk.status === 'pending' ? `
                          <button class="btn btn-success btn-sm" onclick="ProviderModule.approveBooking('${bk.id}')">
                            ✓ Accept
                          </button>
                          <button class="btn btn-danger btn-sm" onclick="ProviderModule.rejectBooking('${bk.id}')">
                            ✕ Decline
                          </button>
                        ` : ''}
                        ${bk.status === 'confirmed' ? `
                          <button class="btn btn-primary btn-sm" onclick="ProviderModule.checkInChild('${bk.id}')">
                            📥 Check In Child
                          </button>
                        ` : ''}
                        ${bk.status === 'checked_in' ? `
                          <button class="btn btn-secondary btn-sm" onclick="ProviderModule.openLiveLogModal('${bk.id}')">
                            📝 Post Log
                          </button>
                        ` : ''}
                      </div>
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>

        <!-- 4. Staff Caregivers Roster -->
        <div style="background: #FFFFFF; border: 1px solid var(--border-light); border-radius: var(--radius-md); padding: 1.5rem;">
          <div class="flex justify-between items-center" style="margin-bottom: 1.25rem;">
            <div>
              <h3 style="font-size: 1.25rem;">Caregiver Staff & Pediatric Nurse Roster</h3>
              <p style="font-size: 0.85rem; color: var(--text-secondary);">Police verified personnel assigned to day and night shift rotations</p>
            </div>
            <button class="btn btn-outline btn-sm" onclick="ProviderModule.openAddCaregiverModal('${dc.id}')">
              + Onboard Caregiver
            </button>
          </div>

          <div class="grid grid-cols-3 gap-4">
            ${(dc.caregivers || []).map(cg => `
              <div class="caregiver-card">
                <img src="${cg.photo}" alt="${cg.name}" class="caregiver-photo" />
                <div style="flex: 1;">
                  <div class="flex justify-between items-start">
                    <strong style="font-size: 1rem;">${cg.name}</strong>
                    <span style="font-size: 0.78rem; color: var(--accent-amber); font-weight: 700;">★ ${cg.rating}</span>
                  </div>
                  <div style="font-size: 0.82rem; color: var(--primary-600); font-weight: 600;">${cg.role}</div>
                  <div style="font-size: 0.75rem; color: var(--text-muted); margin-bottom: 4px;">
                    ${cg.qualifications} • ${cg.experience}
                  </div>
                  <div style="font-size: 0.72rem; background: var(--bg-subtle); padding: 2px 6px; border-radius: var(--radius-xs); color: var(--text-secondary);">
                    🕒 Shift: ${cg.shift || 'Rotation'}
                  </div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;
  },

  approveBooking(bookingId) {
    const dc = window.LSState.getDaycareById(this.currentDaycareId);
    const caregiver = dc?.caregivers?.[0]?.name || "Sister Mary Varghese";

    window.LSState.updateBookingStatus(bookingId, "confirmed", caregiver);
    App.showToast("Booking Approved! ✓", `Slot confirmed for ${bookingId}. Parent notified.`, "success");
    this.renderProviderPortal();
  },

  rejectBooking(bookingId) {
    window.LSState.updateBookingStatus(bookingId, "cancelled");
    App.showToast("Booking Declined", `Booking ${bookingId} has been cancelled.`, "warning");
    this.renderProviderPortal();
  },

  checkInChild(bookingId) {
    window.LSState.updateBookingStatus(bookingId, "checked_in");
    
    // Increment daycare occupancy
    const dc = window.LSState.getDaycareById(this.currentDaycareId);
    if (dc && dc.currentOccupancy < dc.totalCapacity) {
      window.LSState.updateDaycare(dc.id, { currentOccupancy: dc.currentOccupancy + 1 });
    }

    App.showToast("Child Checked In! 🧸", `Live check-in notification and camera pass dispatched to parent.`, "success");
    this.renderProviderPortal();
  },

  checkOutChild(bookingId) {
    window.LSState.updateBookingStatus(bookingId, "completed");

    // Decrement daycare occupancy
    const dc = window.LSState.getDaycareById(this.currentDaycareId);
    if (dc && dc.currentOccupancy > 0) {
      window.LSState.updateDaycare(dc.id, { currentOccupancy: dc.currentOccupancy - 1 });
    }

    App.showToast("Child Checked Out Safely! 👋", `Session concluded. Parent checkout receipt sent.`, "info");
    this.renderProviderPortal();
  },

  openLiveLogModal(bookingId) {
    const bk = window.LSState.getBookingById(bookingId);
    if (!bk) return;

    const modal = document.getElementById("live-log-modal");
    if (!modal) return;

    document.getElementById("log-modal-booking-id").value = bookingId;
    document.getElementById("log-modal-child-name").textContent = `${bk.childName} (${bk.childAgeGroup})`;
    modal.classList.add("active");
  },

  submitLiveLog(e) {
    e.preventDefault();
    const bookingId = document.getElementById("log-modal-booking-id").value;
    const event = document.getElementById("log-event-type").value;
    const note = document.getElementById("log-event-note").value;

    window.LSState.addLiveActivity(bookingId, event, note);
    document.getElementById("live-log-modal").classList.remove("active");
    
    App.showToast("Live Update Broadcasted! 📡", `Parent received alert: "${event}"`, "success");
    this.renderProviderPortal();
  },

  openAddCaregiverModal(daycareId) {
    const modal = document.getElementById("add-caregiver-modal");
    if (modal) modal.classList.add("active");
  },

  submitAddCaregiver(e) {
    e.preventDefault();
    const name = document.getElementById("cg-input-name").value;
    const role = document.getElementById("cg-input-role").value;
    const experience = document.getElementById("cg-input-exp").value;
    const qualifications = document.getElementById("cg-input-qual").value;
    const shift = document.getElementById("cg-input-shift").value;
    const bgCheckId = "POL-BLR-" + Math.floor(1000 + Math.random() * 9000);

    window.LSState.addCaregiver(this.currentDaycareId, {
      name,
      role,
      experience,
      qualifications,
      shift,
      policeVerified: true,
      bgCheckId,
      photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80"
    });

    document.getElementById("add-caregiver-modal").classList.remove("active");
    App.showToast("Caregiver Onboarded! 👩‍⚕️", `${name} added to verified caregiver roster.`, "success");
    this.renderProviderPortal();
  },

  openEditProfileModal(daycareId) {
    const dc = window.LSState.getDaycareById(daycareId);
    if (!dc) return;

    const modal = document.getElementById("edit-daycare-modal");
    if (!modal) return;

    document.getElementById("edit-dc-name").value = dc.name;
    document.getElementById("edit-dc-capacity").value = dc.totalCapacity;
    document.getElementById("edit-dc-hourly").value = dc.pricing.hourly;
    document.getElementById("edit-dc-night").value = dc.pricing.nightHourly;
    document.getElementById("edit-dc-monthly").value = dc.pricing.monthly;

    modal.classList.add("active");
  },

  submitEditProfile(e) {
    e.preventDefault();
    const name = document.getElementById("edit-dc-name").value;
    const capacity = parseInt(document.getElementById("edit-dc-capacity").value);
    const hourly = parseInt(document.getElementById("edit-dc-hourly").value);
    const night = parseInt(document.getElementById("edit-dc-night").value);
    const monthly = parseInt(document.getElementById("edit-dc-monthly").value);

    window.LSState.updateDaycare(this.currentDaycareId, {
      name,
      totalCapacity: capacity,
      pricing: {
        ...window.LSState.getDaycareById(this.currentDaycareId).pricing,
        hourly,
        nightHourly: night,
        monthly
      }
    });

    document.getElementById("edit-daycare-modal").classList.remove("active");
    App.showToast("Center Profile Updated! ⚙️", "Rates and capacity modified successfully.", "success");
    this.renderProviderPortal();
  }
};

window.ProviderModule = ProviderModule;
