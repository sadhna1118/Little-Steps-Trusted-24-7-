/**
 * Little Steps - Parent Module
 * Handles Daycare Discovery, Filtering, Detail View, Booking Flow & Parent Dashboard
 */

const ParentModule = {
  selectedDaycareId: null,
  activeBookingPlan: "hourly", // hourly, daily, nightShift, monthly
  calculatedTotal: 0,

  init() {
    this.renderDaycaresList();
    this.setupEventListeners();
  },

  setupEventListeners() {
    // Search input
    const searchInput = document.getElementById("search-input");
    if (searchInput) {
      searchInput.addEventListener("input", (e) => {
        window.LSState.data.searchQuery = e.target.value;
        this.renderDaycaresList();
      });
    }

    // City Selector
    const citySelect = document.getElementById("city-select");
    if (citySelect) {
      citySelect.addEventListener("change", (e) => {
        window.LSState.data.selectedCity = e.target.value;
        this.renderDaycaresList();
      });
    }

    // Filter toggles
    const filter24x7 = document.getElementById("filter-24x7");
    if (filter24x7) {
      filter24x7.addEventListener("change", (e) => {
        window.LSState.data.activeFilters.is24x7 = e.target.checked;
        this.renderDaycaresList();
      });
    }

    const filterNight = document.getElementById("filter-night");
    if (filterNight) {
      filterNight.addEventListener("change", (e) => {
        window.LSState.data.activeFilters.nightShift = e.target.checked;
        this.renderDaycaresList();
      });
    }

    const filterEmergency = document.getElementById("filter-emergency");
    if (filterEmergency) {
      filterEmergency.addEventListener("change", (e) => {
        window.LSState.data.activeFilters.emergency = e.target.checked;
        this.renderDaycaresList();
      });
    }

    const ageGroupFilter = document.getElementById("filter-age-group");
    if (ageGroupFilter) {
      ageGroupFilter.addEventListener("change", (e) => {
        window.LSState.data.activeFilters.ageGroup = e.target.value;
        this.renderDaycaresList();
      });
    }

    const priceSlider = document.getElementById("filter-price-range");
    const priceDisplay = document.getElementById("filter-price-val");
    if (priceSlider && priceDisplay) {
      priceSlider.addEventListener("input", (e) => {
        const val = parseInt(e.target.value);
        priceDisplay.textContent = `₹${val}/hr`;
        window.LSState.data.activeFilters.maxPrice = val;
        this.renderDaycaresList();
      });
    }
  },

  getFilteredDaycares() {
    const { daycares, selectedCity, searchQuery, activeFilters } = window.LSState.data;

    return daycares.filter(dc => {
      // City filter
      if (selectedCity && selectedCity !== "All Cities" && dc.city.toLowerCase() !== selectedCity.toLowerCase()) {
        return false;
      }

      // Search Query
      if (searchQuery && searchQuery.trim() !== "") {
        const q = searchQuery.toLowerCase();
        const matchName = dc.name.toLowerCase().includes(q);
        const matchArea = dc.area.toLowerCase().includes(q);
        const matchCity = dc.city.toLowerCase().includes(q);
        if (!matchName && !matchArea && !matchCity) return false;
      }

      // 24x7 filter
      if (activeFilters.is24x7 && !dc.is24x7) return false;

      // Night shift filter
      if (activeFilters.nightShift && !dc.supportsNightShift) return false;

      // Emergency filter
      if (activeFilters.emergency && !dc.supportsEmergency) return false;

      // Age Group
      if (activeFilters.ageGroup && activeFilters.ageGroup !== "all") {
        const hasAge = dc.ageGroups.some(ag => ag.toLowerCase().includes(activeFilters.ageGroup.toLowerCase()));
        if (!hasAge) return false;
      }

      // Max hourly price
      if (activeFilters.maxPrice && dc.pricing.hourly > activeFilters.maxPrice) {
        return false;
      }

      return true;
    });
  },

  renderDaycaresList() {
    const grid = document.getElementById("daycares-grid");
    const countEl = document.getElementById("results-count");
    if (!grid) return;

    const list = this.getFilteredDaycares();
    if (countEl) countEl.textContent = `${list.length} Verified Centers Available`;

    if (list.length === 0) {
      grid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 4rem 1rem; background: #FFFFFF; border-radius: var(--radius-md); border: 1px dashed var(--border-light);">
          <div style="font-size: 3rem; margin-bottom: 1rem;">🔍</div>
          <h3 style="font-size: 1.3rem; margin-bottom: 0.5rem;">No Childcare Centers Match Your Criteria</h3>
          <p style="color: var(--text-secondary); max-width: 450px; margin: 0 auto 1.5rem auto;">
            Try adjusting your search filters, expanding the hourly budget range, or selecting another nearby city.
          </p>
          <button class="btn btn-outline btn-sm" onclick="ParentModule.resetFilters()">Reset All Filters</button>
        </div>
      `;
      return;
    }

    grid.innerHTML = list.map(dc => {
      const occupancyRate = Math.round((dc.currentOccupancy / dc.totalCapacity) * 100);
      const isFav = window.LSState.data.favorites.includes(dc.id);

      return `
        <div class="daycare-card">
          <div class="daycare-card-img-wrapper">
            <img src="${dc.heroImage}" alt="${dc.name}" class="daycare-card-img" loading="lazy" />
            <div class="daycare-card-overlay-badges">
              ${dc.isVerified ? `<span class="badge badge-verified">🛡️ 24×7 Certified</span>` : `<span class="badge badge-pending">⏳ Verification Pending</span>`}
              ${dc.is24x7 ? `<span class="badge badge-24x7">🌙 24×7 Open</span>` : ''}
              ${dc.supportsEmergency ? `<span class="badge badge-emergency">🚨 Emergency Drop-in</span>` : ''}
            </div>
            <div class="daycare-card-rating">
              ★ ${dc.rating} <span style="font-size: 0.75rem; font-weight: normal; opacity: 0.85">(${dc.reviewCount})</span>
            </div>
          </div>

          <div class="daycare-card-body">
            <h3 class="daycare-card-title">${dc.name}</h3>
            <div class="daycare-card-location">
              📍 ${dc.area}, ${dc.city}
            </div>

            <div class="daycare-tags-row">
              ${dc.ageGroups.slice(0, 3).map(ag => `<span class="daycare-tag">👶 ${ag.split(' ')[0]}</span>`).join('')}
              <span class="daycare-tag">👩‍⚕️ Nurse On-Duty</span>
            </div>

            <div class="capacity-box">
              <div class="capacity-header">
                <span>Real-Time Availability</span>
                <span><strong>${dc.currentOccupancy}</strong> / ${dc.totalCapacity} Spots Filled</span>
              </div>
              <div class="capacity-progress-bg">
                <div class="capacity-progress-fill ${occupancyRate > 80 ? 'high' : ''}" style="width: ${occupancyRate}%"></div>
              </div>
            </div>

            <div class="daycare-card-footer">
              <div class="daycare-price-block">
                <span class="price-label">Starts at</span>
                <div>
                  <span class="price-value">₹${dc.pricing.hourly}</span>
                  <span class="price-unit">/ hour</span>
                </div>
              </div>

              <div class="flex gap-2">
                <button class="btn btn-secondary btn-sm" title="Bookmark" onclick="window.LSState.toggleFavorite('${dc.id}'); ParentModule.renderDaycaresList();">
                  ${isFav ? '❤️' : '🤍'}
                </button>
                <button class="btn btn-primary btn-sm" onclick="App.showDaycareDetail('${dc.id}')">
                  View & Book ➔
                </button>
              </div>
            </div>
          </div>
        </div>
      `;
    }).join("");
  },

  resetFilters() {
    window.LSState.data.selectedCity = "All Cities";
    window.LSState.data.searchQuery = "";
    window.LSState.data.activeFilters = {
      is24x7: false,
      nightShift: false,
      emergency: false,
      ageGroup: "all",
      maxPrice: 350,
      minRating: 0
    };

    const citySelect = document.getElementById("city-select");
    if (citySelect) citySelect.value = "All Cities";

    const searchInput = document.getElementById("search-input");
    if (searchInput) searchInput.value = "";

    const priceSlider = document.getElementById("filter-price-range");
    const priceDisplay = document.getElementById("filter-price-val");
    if (priceSlider) priceSlider.value = 350;
    if (priceDisplay) priceDisplay.textContent = "₹350/hr";

    const filter24x7 = document.getElementById("filter-24x7");
    if (filter24x7) filter24x7.checked = false;

    const filterNight = document.getElementById("filter-night");
    if (filterNight) filterNight.checked = false;

    const filterEmergency = document.getElementById("filter-emergency");
    if (filterEmergency) filterEmergency.checked = false;

    const ageGroupFilter = document.getElementById("filter-age-group");
    if (ageGroupFilter) ageGroupFilter.value = "all";

    this.renderDaycaresList();
    App.showToast("Filters Reset", "Showing all verified childcare centers across all cities.", "info");
  },

  renderDaycareDetail(daycareId) {
    this.selectedDaycareId = daycareId;
    const dc = window.LSState.getDaycareById(daycareId);
    const container = document.getElementById("daycare-detail-view");
    if (!dc || !container) return;

    const reviews = window.LSState.getReviewsForDaycare(daycareId);

    container.innerHTML = `
      <div class="container" style="padding-top: 2rem; padding-bottom: 4rem;">
        <!-- Back button -->
        <button class="btn btn-secondary btn-sm" style="margin-bottom: 1.5rem;" onclick="App.showView('discovery')">
          ← Back to All Centers
        </button>

        <!-- Detail Header Card -->
        <div class="detail-header-card">
          <div class="detail-gallery-grid">
            <img src="${dc.images[0] || dc.heroImage}" alt="${dc.name}" class="detail-gallery-main" />
            <img src="${dc.images[1] || dc.heroImage}" alt="${dc.name} classroom" class="detail-gallery-thumb" />
            <img src="${dc.images[2] || dc.images[0] || dc.heroImage}" alt="${dc.name} sleeping pod" class="detail-gallery-thumb" />
          </div>

          <div class="detail-main-info">
            <div>
              <div class="flex items-center gap-2" style="margin-bottom: 0.5rem;">
                ${dc.isVerified ? `<span class="badge badge-verified">🛡️ Little Steps 24×7 Certified</span>` : `<span class="badge badge-pending">⏳ Pending Review</span>`}
                <span class="badge badge-24x7">🌙 24×7 Round-the-Clock</span>
                <span style="font-size: 0.85rem; color: var(--text-muted);">License: <strong>${dc.licenseNumber}</strong></span>
              </div>

              <h1 class="detail-title">${dc.name}</h1>
              <div class="detail-address">
                📍 ${dc.address}
              </div>
              <p style="color: var(--text-secondary); max-width: 720px; line-height: 1.6; margin-bottom: 1.25rem;">
                ${dc.description}
              </p>

              <div class="flex gap-4 items-center">
                <div style="font-size: 1.1rem; font-weight: 700; color: var(--primary-700);">
                  ★ ${dc.rating} / 5.0 <span style="font-size: 0.85rem; color: var(--text-secondary); font-weight: normal;">(${dc.reviewCount} Verified Reviews)</span>
                </div>
                <div style="color: var(--border-light)">|</div>
                <div style="font-size: 0.9rem; color: var(--text-secondary);">
                  Est. <strong>${dc.establishedYear}</strong> • Capacity: <strong>${dc.totalCapacity} Children</strong>
                </div>
              </div>
            </div>

            <!-- Sticky Quick Booking CTA Card -->
            <div style="background: var(--bg-main); border: 1px solid var(--border-light); border-radius: var(--radius-md); padding: 1.5rem; min-width: 280px; text-align: center;">
              <span class="price-label">Transparent Rates</span>
              <div style="font-size: 2rem; font-weight: 800; color: var(--primary-700); margin: 0.25rem 0;">
                ₹${dc.pricing.hourly} <span style="font-size: 0.9rem; font-weight: 500; color: var(--text-secondary);">/ hr</span>
              </div>
              <div style="font-size: 0.82rem; color: var(--success-700); font-weight: 600; margin-bottom: 1rem;">
                ✓ 24×7 Night Shift: ₹${dc.pricing.nightHourly}/hr
              </div>

              <button class="btn btn-primary btn-block btn-lg" onclick="ParentModule.openBookingModal('${dc.id}')">
                ⚡ Book Childcare Slot
              </button>

              <button class="btn btn-outline btn-block btn-sm" style="margin-top: 0.75rem;" onclick="ParentModule.openScheduleTourModal('${dc.id}')">
                📅 Schedule In-Person Tour
              </button>
            </div>
          </div>
        </div>

        <!-- Section 1: Verified Caregiver Staff -->
        <div style="margin-bottom: 3rem;">
          <div class="flex justify-between items-center" style="margin-bottom: 1.25rem;">
            <div>
              <h2 style="font-size: 1.5rem;">Dedicated Caregivers & Pediatric Staff</h2>
              <p style="color: var(--text-secondary); font-size: 0.9rem;">100% Police Verified with Pediatric First-Aid Certification</p>
            </div>
            <span class="badge badge-verified">✓ 100% Background Checked</span>
          </div>

          <div class="grid grid-cols-3 gap-4">
            ${(dc.caregivers || []).map(cg => `
              <div class="caregiver-card">
                <img src="${cg.photo}" alt="${cg.name}" class="caregiver-photo" />
                <div>
                  <div class="caregiver-name">${cg.name}</div>
                  <div class="caregiver-role">${cg.role}</div>
                  <div style="font-size: 0.78rem; color: var(--text-secondary); margin-bottom: 4px;">
                    🎓 ${cg.qualifications} (${cg.experience})
                  </div>
                  <div class="flex items-center gap-2">
                    <span class="caregiver-badge-verified">🛡️ ${cg.bgCheckId}</span>
                    <span style="font-size: 0.75rem; color: var(--accent-amber); font-weight: 700;">★ ${cg.rating}</span>
                  </div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Section 2: Safety Protocols & Health Standards -->
        <div style="margin-bottom: 3rem; background: #FFFFFF; border-radius: var(--radius-lg); border: 1px solid var(--border-light); padding: 2rem;">
          <h2 style="font-size: 1.5rem; margin-bottom: 0.5rem;">Safety Protocols & Infrastructure Standards</h2>
          <p style="color: var(--text-secondary); font-size: 0.9rem; margin-bottom: 1.5rem;">Every facility undergoes monthly biometric and pediatric safety audits</p>

          <div class="safety-grid">
            ${(dc.safetyFeatures || []).map(sf => `
              <div class="safety-item">
                <div class="safety-icon">🛡️</div>
                <span>${sf}</span>
              </div>
            `).join('')}
          </div>

          <!-- Official Certifications -->
          <div style="margin-top: 2rem; padding-top: 1.5rem; border-top: 1px solid var(--border-light);">
            <h4 style="font-size: 1.1rem; margin-bottom: 1rem;">Official Accreditations & Licenses</h4>
            <div class="grid grid-cols-2 gap-3">
              ${(dc.certifications || []).map(cert => `
                <div style="background: var(--bg-subtle); padding: 0.85rem 1rem; border-radius: var(--radius-sm); display: flex; justify-content: space-between; align-items: center;">
                  <div>
                    <div style="font-weight: 700; font-size: 0.9rem; color: var(--text-main);">${cert.name}</div>
                    <div style="font-size: 0.78rem; color: var(--text-secondary);">Issued by: ${cert.issuer}</div>
                  </div>
                  <span class="badge badge-verified" style="font-size: 0.72rem;">Valid: ${cert.validTill}</span>
                </div>
              `).join('')}
            </div>
          </div>
        </div>

        <!-- Section 3: Flexible Pricing Plans & Subscriptions -->
        <div style="margin-bottom: 3rem;">
          <h2 style="font-size: 1.5rem; margin-bottom: 0.5rem;">Transparent Pricing & 24×7 Subscription Plans</h2>
          <p style="color: var(--text-secondary); font-size: 0.9rem; margin-bottom: 1.5rem;">No lock-ins. Book on-demand or subscribe for discounted monthly shifts.</p>

          <div class="pricing-matrix-grid">
            <div class="pricing-plan-card">
              <h4 style="font-size: 1.15rem;">Hourly Flexi</h4>
              <p style="font-size: 0.8rem; color: var(--text-secondary);">For ad-hoc meetings & errands</p>
              <div class="plan-price-lg">₹${dc.pricing.hourly}<span style="font-size: 0.9rem; color: var(--text-secondary); font-weight: normal;">/hr</span></div>
              <ul style="list-style: none; text-align: left; font-size: 0.85rem; color: var(--text-secondary); margin-bottom: 1.5rem; display: flex; flex-direction: column; gap: 6px;">
                <li>✓ Minimum 2 hours</li>
                <li>✓ Live CCTV app access</li>
                <li>✓ Nutritious snack included</li>
              </ul>
              <button class="btn btn-outline btn-block btn-sm" onclick="ParentModule.openBookingModal('${dc.id}', 'hourly')">Select Hourly</button>
            </div>

            <div class="pricing-plan-card">
              <h4 style="font-size: 1.15rem;">Full Day Shift</h4>
              <p style="font-size: 0.8rem; color: var(--text-secondary);">8:00 AM - 6:00 PM (10 Hours)</p>
              <div class="plan-price-lg">₹${dc.pricing.daily}<span style="font-size: 0.9rem; color: var(--text-secondary); font-weight: normal;">/day</span></div>
              <ul style="list-style: none; text-align: left; font-size: 0.85rem; color: var(--text-secondary); margin-bottom: 1.5rem; display: flex; flex-direction: column; gap: 6px;">
                <li>✓ Breakfast, Lunch & High Tea</li>
                <li>✓ Structured learning activities</li>
                <li>✓ Supervised afternoon nap</li>
              </ul>
              <button class="btn btn-outline btn-block btn-sm" onclick="ParentModule.openBookingModal('${dc.id}', 'daily')">Select Full Day</button>
            </div>

            <div class="pricing-plan-card featured">
              <div class="featured-ribbon">⭐ Most Popular for Night Shifts</div>
              <h4 style="font-size: 1.15rem;">24×7 Night Care</h4>
              <p style="font-size: 0.8rem; color: var(--text-secondary);">6:30 PM - 8:00 AM (Overnight)</p>
              <div class="plan-price-lg">₹${dc.pricing.nightHourly * 12}<span style="font-size: 0.9rem; color: var(--text-secondary); font-weight: normal;">/night</span></div>
              <ul style="list-style: none; text-align: left; font-size: 0.85rem; color: var(--text-secondary); margin-bottom: 1.5rem; display: flex; flex-direction: column; gap: 6px;">
                <li>✓ Soundproof sleep pods</li>
                <li>✓ 1:1 Caregiver for infants</li>
                <li>✓ Night dinner & warm milk</li>
                <li>✓ Real-time sleep monitor feed</li>
              </ul>
              <button class="btn btn-primary btn-block btn-sm" onclick="ParentModule.openBookingModal('${dc.id}', 'nightShift')">Select Night Care</button>
            </div>

            <div class="pricing-plan-card">
              <h4 style="font-size: 1.15rem;">Monthly Membership</h4>
              <p style="font-size: 0.8rem; color: var(--text-secondary);">Unlimited regular shifts</p>
              <div class="plan-price-lg">₹${dc.pricing.monthly}<span style="font-size: 0.9rem; color: var(--text-secondary); font-weight: normal;">/mo</span></div>
              <ul style="list-style: none; text-align: left; font-size: 0.85rem; color: var(--text-secondary); margin-bottom: 1.5rem; display: flex; flex-direction: column; gap: 6px;">
                <li>✓ Guaranteed reserved slot</li>
                <li>✓ 2 Free emergency nights/mo</li>
                <li>✓ Dedicated primary caregiver</li>
              </ul>
              <button class="btn btn-outline btn-block btn-sm" onclick="ParentModule.openBookingModal('${dc.id}', 'monthly')">Subscribe Monthly</button>
            </div>
          </div>
        </div>

        <!-- Section 4: Verified Parent Reviews -->
        <div style="background: #FFFFFF; border-radius: var(--radius-lg); border: 1px solid var(--border-light); padding: 2rem;">
          <div class="flex justify-between items-center" style="margin-bottom: 1.5rem;">
            <div>
              <h2 style="font-size: 1.5rem;">Parent Reviews & Experiences</h2>
              <p style="color: var(--text-secondary); font-size: 0.9rem;">From parents working tech, medical, and corporate night shifts</p>
            </div>
            <button class="btn btn-outline btn-sm" onclick="ParentModule.openReviewModal('${dc.id}')">
              ✍️ Write a Review
            </button>
          </div>

          <div style="display: flex; flex-direction: column; gap: 1rem;">
            ${reviews.length === 0 ? `<p style="color: var(--text-secondary);">No reviews yet. Be the first to share your experience!</p>` : ''}
            ${reviews.map(r => `
              <div style="background: var(--bg-subtle); padding: 1.25rem; border-radius: var(--radius-md);">
                <div class="flex justify-between items-center" style="margin-bottom: 0.4rem;">
                  <div class="flex items-center gap-2">
                    <strong style="color: var(--text-main);">${r.author}</strong>
                    <span class="badge badge-verified" style="font-size: 0.7rem;">✓ Verified Booking</span>
                    <span style="font-size: 0.78rem; color: var(--text-muted);">${r.childAge}</span>
                  </div>
                  <div style="color: var(--accent-amber); font-weight: 700;">★ ${r.rating}.0</div>
                </div>
                <p style="font-size: 0.9rem; color: var(--text-secondary); line-height: 1.5;">${r.comment}</p>
                <div style="font-size: 0.75rem; color: var(--text-muted); margin-top: 4px;">Posted ${r.date}</div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;
  },

  openBookingModal(daycareId, preselectedPlan = "hourly") {
    this.selectedDaycareId = daycareId;
    this.activeBookingPlan = preselectedPlan;
    const dc = window.LSState.getDaycareById(daycareId);
    if (!dc) return;

    const modal = document.getElementById("booking-modal");
    if (!modal) return;

    document.getElementById("booking-daycare-name").textContent = dc.name;
    document.getElementById("booking-daycare-city").textContent = `${dc.area}, ${dc.city}`;
    
    // Set plan tab
    this.setBookingPlan(preselectedPlan);
    this.calculateBookingCost();

    modal.classList.add("active");
  },

  setBookingPlan(plan) {
    this.activeBookingPlan = plan;
    document.querySelectorAll(".plan-selector-btn").forEach(btn => {
      btn.classList.toggle("active", btn.dataset.plan === plan);
    });

    const hourlyFields = document.getElementById("booking-hourly-fields");
    const dailyFields = document.getElementById("booking-daily-fields");
    const monthlyFields = document.getElementById("booking-monthly-fields");

    if (hourlyFields) hourlyFields.style.display = (plan === "hourly" || plan === "nightShift") ? "block" : "none";
    if (dailyFields) dailyFields.style.display = plan === "daily" ? "block" : "none";
    if (monthlyFields) monthlyFields.style.display = plan === "monthly" ? "block" : "none";

    this.calculateBookingCost();
  },

  calculateBookingCost() {
    const dc = window.LSState.getDaycareById(this.selectedDaycareId);
    if (!dc) return;

    let total = 0;
    let breakdownText = "";

    if (this.activeBookingPlan === "hourly") {
      const hours = parseInt(document.getElementById("booking-hours-count")?.value || 3);
      total = hours * dc.pricing.hourly;
      breakdownText = `${hours} Hours × ₹${dc.pricing.hourly}/hr`;
    } else if (this.activeBookingPlan === "nightShift") {
      const hours = parseInt(document.getElementById("booking-hours-count")?.value || 12);
      total = hours * dc.pricing.nightHourly;
      breakdownText = `${hours} Hours (Overnight) × ₹${dc.pricing.nightHourly}/hr (Includes Bedtime Dinner & Infant Pod)`;
    } else if (this.activeBookingPlan === "daily") {
      const days = parseInt(document.getElementById("booking-days-count")?.value || 1);
      total = days * dc.pricing.daily;
      breakdownText = `${days} Day(s) × ₹${dc.pricing.daily}/day (All Meals Included)`;
    } else if (this.activeBookingPlan === "monthly") {
      total = dc.pricing.monthly;
      breakdownText = `1 Month Full Access (Guaranteed Slot + 2 Emergency Night Passes)`;
    }

    this.calculatedTotal = total;
    const summaryTotalEl = document.getElementById("booking-summary-total");
    const summaryBreakdownEl = document.getElementById("booking-summary-breakdown");

    if (summaryTotalEl) summaryTotalEl.textContent = `₹${total.toLocaleString()}`;
    if (summaryBreakdownEl) summaryBreakdownEl.textContent = breakdownText;
  },

  submitBookingForm(e) {
    e.preventDefault();
    const dc = window.LSState.getDaycareById(this.selectedDaycareId);
    if (!dc) return;

    const childName = document.getElementById("book-child-name").value;
    const childAge = document.getElementById("book-child-age").value;
    const allergies = document.getElementById("book-allergies").value || "None reported";
    const emergencyContact = document.getElementById("book-emergency-contact").value;
    const date = document.getElementById("book-start-date").value || new Date().toISOString().slice(0, 10);
    const startTime = document.getElementById("book-start-time")?.value || "18:30";

    const planNames = {
      hourly: "Hourly Flexi Care",
      nightShift: "24×7 Night Shift Care",
      daily: "Full Day Shift Care",
      monthly: "Monthly Full-Time Membership"
    };

    const newBooking = window.LSState.createBooking({
      daycareId: dc.id,
      daycareName: dc.name,
      parentName: window.LSState.data.currentParent.name,
      parentEmail: window.LSState.data.currentParent.email,
      parentPhone: window.LSState.data.currentParent.phone,
      childName,
      childAgeGroup: childAge,
      childAgeExact: childAge,
      allergies,
      emergencyContact,
      planType: this.activeBookingPlan,
      planName: planNames[this.activeBookingPlan] || "Custom Childcare Plan",
      startDate: date,
      startTime: startTime,
      endTime: this.activeBookingPlan === "nightShift" ? "08:00 (Next Day)" : "Flexible",
      duration: this.activeBookingPlan === "monthly" ? "1 Month" : "Standard Shift",
      priceTotal: this.calculatedTotal,
      caregiverAssigned: dc.caregivers?.[0]?.name || "On-Duty Caregiver Team"
    });

    document.getElementById("booking-modal").classList.remove("active");
    App.showToast("Booking Submitted Successfully! 🎉", `Reference ID: ${newBooking.id}. The daycare will confirm your slot.`, "success");

    // Switch to Parent Dashboard
    App.showView("parent-dashboard");
    this.renderParentDashboard();
  },

  renderParentDashboard() {
    const container = document.getElementById("parent-dashboard-view");
    if (!container) return;

    const { currentParent, bookings, daycares } = window.LSState.data;
    const myBookings = bookings.filter(b => b.parentEmail === currentParent.email || b.parentName === currentParent.name);
    const activeBooking = myBookings.find(b => b.status === "checked_in") || myBookings[0];

    container.innerHTML = `
      <div class="container" style="padding: 2.5rem 0 4rem 0;">
        <!-- Header -->
        <div class="flex justify-between items-center" style="margin-bottom: 2rem;">
          <div>
            <h1 style="font-size: 2.2rem; margin-bottom: 0.25rem;">Welcome back, ${currentParent.name}! 👋</h1>
            <p style="color: var(--text-secondary); font-size: 0.95rem;">Manage your child's 24×7 care, live daily feeds, and active subscriptions.</p>
          </div>
          <button class="btn btn-primary" onclick="App.showView('discovery')">
            + Book Another Session
          </button>
        </div>

        <!-- 1. LIVE CHECKED-IN CHILD STATUS (If active) -->
        ${activeBooking && activeBooking.status === "checked_in" ? `
          <div class="live-child-banner">
            <div>
              <div class="flex items-center gap-2" style="margin-bottom: 0.5rem;">
                <span class="live-dot"></span>
                <span style="font-size: 0.85rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.05em; color: #A7F3D0;">LIVE IN CARE NOW</span>
                <span style="font-size: 0.85rem; opacity: 0.85;">• Ref: ${activeBooking.id}</span>
              </div>
              <h2 style="font-size: 1.8rem; margin-bottom: 0.25rem;">${activeBooking.childName} is currently at ${activeBooking.daycareName}</h2>
              <p style="opacity: 0.9; font-size: 0.95rem;">
                Assigned Caregiver: <strong>${activeBooking.caregiverAssigned}</strong> • Emergency Contact: ${activeBooking.emergencyContact}
              </p>
            </div>
            <div class="flex gap-3">
              <button class="btn btn-sm" style="background: rgba(255,255,255,0.2); color: #FFFFFF; border: 1px solid rgba(255,255,255,0.4);" onclick="ParentModule.showDigitalPass('${activeBooking.id}')">
                📱 Digital QR Pass
              </button>
              <button class="btn btn-sm" style="background: #FFFFFF; color: #064E3B;" onclick="App.showToast('Live Camera Feed', 'Connecting to secure AES-256 encrypted CCTV stream for Pod 4...', 'info')">
                📹 Live Camera Stream
              </button>
            </div>
          </div>
        ` : ''}

        <!-- Two Column Layout: Bookings & Live Timeline -->
        <div class="grid grid-cols-3 gap-6">
          <!-- Column 1 & 2: Active & Past Bookings -->
          <div style="grid-column: span 2;">
            <div style="background: #FFFFFF; border: 1px solid var(--border-light); border-radius: var(--radius-md); padding: 1.5rem; margin-bottom: 2rem;">
              <div class="flex justify-between items-center" style="margin-bottom: 1.25rem;">
                <h3 style="font-size: 1.25rem;">Your Childcare Bookings</h3>
                <span style="font-size: 0.85rem; color: var(--text-secondary);">${myBookings.length} Total Records</span>
              </div>

              ${myBookings.length === 0 ? `
                <div style="text-align: center; padding: 2rem; color: var(--text-secondary);">
                  You have no bookings yet. Find a verified 24×7 center to get started!
                </div>
              ` : `
                <div style="display: flex; flex-direction: column; gap: 1rem;">
                  ${myBookings.map(bk => `
                    <div style="background: var(--bg-subtle); border-radius: var(--radius-sm); padding: 1.25rem; border: 1px solid var(--border-light);">
                      <div class="flex justify-between items-start" style="margin-bottom: 0.75rem;">
                        <div>
                          <div class="flex items-center gap-2" style="margin-bottom: 4px;">
                            <strong style="font-size: 1.05rem; color: var(--text-main);">${bk.daycareName}</strong>
                            ${bk.status === 'checked_in' ? `<span class="badge badge-checkedin">● Checked-In</span>` : ''}
                            ${bk.status === 'confirmed' ? `<span class="badge badge-confirmed">✓ Confirmed</span>` : ''}
                            ${bk.status === 'pending' ? `<span class="badge badge-pending">⏳ Pending Approval</span>` : ''}
                            ${bk.status === 'completed' ? `<span class="badge badge-completed">✓ Completed</span>` : ''}
                          </div>
                          <div style="font-size: 0.85rem; color: var(--text-secondary);">
                            👶 <strong>${bk.childName}</strong> (${bk.childAgeGroup}) • Plan: <strong>${bk.planName}</strong>
                          </div>
                        </div>

                        <div style="text-align: right;">
                          <div style="font-size: 1.15rem; font-weight: 800; color: var(--primary-700);">₹${bk.priceTotal}</div>
                          <div style="font-size: 0.75rem; color: var(--text-muted);">${bk.id}</div>
                        </div>
                      </div>

                      <div style="font-size: 0.82rem; color: var(--text-secondary); margin-bottom: 0.75rem; background: #FFFFFF; padding: 0.5rem 0.75rem; border-radius: var(--radius-xs); border: 1px solid var(--border-light);">
                        📅 Date: <strong>${bk.startDate}</strong> (${bk.startTime} - ${bk.endTime}) • Caregiver: <strong>${bk.caregiverAssigned || 'Staff Lead'}</strong>
                      </div>

                      <div class="flex justify-between items-center">
                        <span style="font-size: 0.78rem; color: var(--text-muted);">Booked on ${bk.createdAt}</span>
                        <div class="flex gap-2">
                          <button class="btn btn-secondary btn-sm" onclick="ParentModule.showDigitalPass('${bk.id}')">
                            🎫 View QR Pass
                          </button>
                          ${bk.status === 'checked_in' ? `
                            <button class="btn btn-outline btn-sm" onclick="ParentModule.viewActivityTimeline('${bk.id}')">
                              📋 Live Log (${bk.liveActivityLog?.length || 0})
                            </button>
                          ` : ''}
                        </div>
                      </div>
                    </div>
                  `).join('')}
                </div>
              `}
            </div>

            <!-- Active Subscriptions Block -->
            <div style="background: #FFFFFF; border: 1px solid var(--border-light); border-radius: var(--radius-md); padding: 1.5rem;">
              <h3 style="font-size: 1.25rem; margin-bottom: 1rem;">Active Subscriptions & Passes</h3>
              ${currentParent.subscriptions.map(sub => `
                <div style="background: linear-gradient(135deg, #EEF2FF, #E0E7FF); border: 1px solid var(--primary-200); border-radius: var(--radius-sm); padding: 1.25rem; display: flex; justify-content: space-between; align-items: center;">
                  <div>
                    <span class="badge badge-verified" style="margin-bottom: 6px;">${sub.status} Pass</span>
                    <h4 style="font-size: 1.1rem; color: var(--primary-900);">${sub.plan}</h4>
                    <p style="font-size: 0.85rem; color: var(--text-secondary);">${sub.daycareName}</p>
                    <div style="font-size: 0.8rem; color: var(--text-muted); margin-top: 4px;">Renews on: ${sub.renewalDate}</div>
                  </div>
                  <div style="text-align: right;">
                    <div style="font-size: 1.5rem; font-weight: 800; color: var(--primary-700);">
                      ${sub.hoursAllocated - sub.hoursUsed} <span style="font-size: 0.85rem; font-weight: normal; color: var(--text-secondary);">hrs left</span>
                    </div>
                    <div style="font-size: 0.78rem; color: var(--text-secondary); margin-bottom: 6px;">
                      (${sub.hoursUsed} / ${sub.hoursAllocated} hrs used this month)
                    </div>
                    <button class="btn btn-primary btn-sm" onclick="App.showToast('Subscription Top-Up', '10 additional emergency night hours added to your pass!', 'success')">
                      + Add 10 Hours
                    </button>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- Column 3: Live Feed / Activity Widget -->
          <div>
            <div style="background: #FFFFFF; border: 1px solid var(--border-light); border-radius: var(--radius-md); padding: 1.5rem; margin-bottom: 1.5rem;">
              <div class="flex items-center gap-2" style="margin-bottom: 1rem;">
                <span class="live-dot"></span>
                <h3 style="font-size: 1.15rem;">Live Daycare Activity Feed</h3>
              </div>
              <p style="font-size: 0.82rem; color: var(--text-secondary); margin-bottom: 1rem;">
                Real-time meals, naps, and health checks logged by caregivers:
              </p>

              <div class="live-activity-timeline" id="parent-live-feed">
                ${activeBooking && activeBooking.liveActivityLog?.length > 0 ? 
                  activeBooking.liveActivityLog.map(item => `
                    <div class="timeline-item">
                      <div class="timeline-time">${item.time}</div>
                      <div class="timeline-event">${item.event}</div>
                      <div class="timeline-note">${item.note}</div>
                    </div>
                  `).join('') : `
                  <p style="font-size: 0.85rem; color: var(--text-muted);">No live activities logged at this moment.</p>
                `}
              </div>
            </div>

            <!-- Emergency Pediatric Hotline Box -->
            <div style="background: #FFF1F2; border: 1px solid #FECDD3; border-radius: var(--radius-md); padding: 1.25rem;">
              <div class="flex items-center gap-2" style="margin-bottom: 0.5rem; color: var(--coral-600); font-weight: 700;">
                <span>🚨</span> 24×7 Emergency Support Desk
              </div>
              <p style="font-size: 0.82rem; color: var(--text-secondary); margin-bottom: 0.75rem;">
                Direct line to Little Steps Central Pediatric Triage and center supervisors.
              </p>
              <a href="tel:18002475437" class="btn btn-danger btn-block btn-sm">
                📞 Call 1800-247-KIDS
              </a>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  showDigitalPass(bookingId) {
    const bk = window.LSState.getBookingById(bookingId);
    if (!bk) return;

    const modal = document.getElementById("qr-pass-modal");
    if (!modal) return;

    document.getElementById("qr-pass-child").textContent = bk.childName;
    document.getElementById("qr-pass-center").textContent = bk.daycareName;
    document.getElementById("qr-pass-plan").textContent = bk.planName;
    document.getElementById("qr-pass-time").textContent = `${bk.startDate} • ${bk.startTime} to ${bk.endTime}`;
    document.getElementById("qr-pass-ref").textContent = bk.id;

    // Simulate QR Code SVG
    document.getElementById("qr-code-canvas").innerHTML = `
      <svg width="130" height="130" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="100" height="100" fill="white"/>
        <rect x="10" y="10" width="30" height="30" fill="#0F172A"/>
        <rect x="15" y="15" width="20" height="20" fill="white"/>
        <rect x="20" y="20" width="10" height="10" fill="#0F172A"/>
        <rect x="60" y="10" width="30" height="30" fill="#0F172A"/>
        <rect x="65" y="15" width="20" height="20" fill="white"/>
        <rect x="70" y="20" width="10" height="10" fill="#0F172A"/>
        <rect x="10" y="60" width="30" height="30" fill="#0F172A"/>
        <rect x="15" y="65" width="20" height="20" fill="white"/>
        <rect x="20" y="70" width="10" height="10" fill="#0F172A"/>
        <rect x="50" y="50" width="10" height="10" fill="#4F46E5"/>
        <rect x="65" y="65" width="15" height="15" fill="#0F172A"/>
        <rect x="80" y="50" width="10" height="20" fill="#0F172A"/>
        <rect x="50" y="80" width="20" height="10" fill="#0F172A"/>
      </svg>
    `;

    modal.classList.add("active");
  },

  viewActivityTimeline(bookingId) {
    this.renderParentDashboard();
    const feed = document.getElementById("parent-live-feed");
    if (feed) feed.scrollIntoView({ behavior: "smooth" });
  },

  openReviewModal(daycareId) {
    this.selectedDaycareId = daycareId;
    const modal = document.getElementById("review-modal");
    if (modal) modal.classList.add("active");
  },

  submitReviewForm(e) {
    e.preventDefault();
    const author = document.getElementById("rev-author").value;
    const rating = parseInt(document.getElementById("rev-rating").value);
    const childAge = document.getElementById("rev-child-age").value;
    const comment = document.getElementById("rev-comment").value;

    window.LSState.addReview(this.selectedDaycareId, {
      author,
      rating,
      childAge,
      comment
    });

    document.getElementById("review-modal").classList.remove("active");
    App.showToast("Review Published! ⭐", "Thank you for helping other working parents find trusted care.", "success");
    this.renderDaycareDetail(this.selectedDaycareId);
  },

  openScheduleTourModal(daycareId) {
    const dc = window.LSState.getDaycareById(daycareId);
    if (!dc) return;
    App.showToast("Tour Scheduled! 📅", `In-person walkthrough at ${dc.name} confirmed for tomorrow at 11:00 AM.`, "info");
  }
};

window.ParentModule = ParentModule;
