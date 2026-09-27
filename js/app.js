/**
 * Little Steps - Master App Controller
 * Orchestrates Routing, Persona Role Switching, Modals, Toasts & Global Interactions
 */

const App = {
  currentView: "discovery",

  init() {
    console.log("🌟 Little Steps 24x7 Childcare Platform Initializing...");

    // Subscribe to state updates
    window.LSState.subscribe((state) => {
      this.updateNavbarBadges();
    });

    // Initialize modules
    ParentModule.init();

    // Setup global listeners
    this.setupGlobalListeners();
    this.updateRolePills(window.LSState.data.currentRole);
    this.updateNavbarBadges();

    console.log("✓ Little Steps Application Ready!");
  },

  setupGlobalListeners() {
    // Role switcher pills
    document.querySelectorAll(".role-pill-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const role = btn.dataset.role;
        this.switchRole(role);
      });
    });

    // Close modals on overlay click or close button
    document.querySelectorAll(".modal-close-btn, .modal-cancel-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        document.querySelectorAll(".modal-overlay").forEach(m => m.classList.remove("active"));
      });
    });

    document.querySelectorAll(".modal-overlay").forEach(overlay => {
      overlay.addEventListener("click", (e) => {
        if (e.target === overlay) {
          overlay.classList.remove("active");
        }
      });
    });

    // Plan selector buttons in booking modal
    document.querySelectorAll(".plan-selector-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        ParentModule.setBookingPlan(btn.dataset.plan);
      });
    });

    // Form Submissions
    const bookingForm = document.getElementById("booking-form");
    if (bookingForm) bookingForm.addEventListener("submit", (e) => ParentModule.submitBookingForm(e));

    const reviewForm = document.getElementById("review-form");
    if (reviewForm) reviewForm.addEventListener("submit", (e) => ParentModule.submitReviewForm(e));

    const liveLogForm = document.getElementById("live-log-form");
    if (liveLogForm) liveLogForm.addEventListener("submit", (e) => ProviderModule.submitLiveLog(e));

    const addCaregiverForm = document.getElementById("add-caregiver-form");
    if (addCaregiverForm) addCaregiverForm.addEventListener("submit", (e) => ProviderModule.submitAddCaregiver(e));

    const editProfileForm = document.getElementById("edit-daycare-form");
    if (editProfileForm) editProfileForm.addEventListener("submit", (e) => ProviderModule.submitEditProfile(e));
  },

  switchRole(role) {
    window.LSState.setRole(role);
    this.updateRolePills(role);

    if (role === "parent") {
      this.showView("discovery");
      this.showToast("Switched to Parent Persona 👤", "Browsing 24×7 centers as parent 'Sadhna Sharma'.", "info");
    } else if (role === "provider") {
      this.showView("provider-portal");
      ProviderModule.renderProviderPortal();
      this.showToast("Switched to Daycare Provider 🏢", "Managing 'Little Blooms 24×7 Crèche' center operations.", "success");
    } else if (role === "admin") {
      this.showView("admin-portal");
      AdminModule.renderAdminPortal();
      this.showToast("Switched to Platform Super Admin 🛡️", "Full access to Safety Verification and Platform KPIs.", "warning");
    }
  },

  updateRolePills(role) {
    document.querySelectorAll(".role-pill-btn").forEach(btn => {
      const isCurrent = btn.dataset.role === role;
      btn.classList.toggle("active", isCurrent);
      if (isCurrent) {
        btn.classList.remove("role-provider", "role-admin");
        if (role === "provider") btn.classList.add("role-provider");
        if (role === "admin") btn.classList.add("role-admin");
      }
    });

    // Update nav links visibility / text according to role
    const parentDashboardLink = document.getElementById("nav-parent-dashboard");
    if (parentDashboardLink) {
      parentDashboardLink.style.display = (role === "parent") ? "block" : "none";
    }
  },

  showView(viewName) {
    this.currentView = viewName;

    // Hide all view containers
    const views = [
      "discovery-view",
      "daycare-detail-view",
      "parent-dashboard-view",
      "provider-portal-view",
      "admin-portal-view"
    ];

    views.forEach(v => {
      const el = document.getElementById(v);
      if (el) el.style.display = "none";
    });

    // Show target view
    const targetEl = document.getElementById(`${viewName}-view`);
    if (targetEl) {
      targetEl.style.display = "block";
      window.scrollTo({ top: 0, behavior: "smooth" });
    }

    // Update active nav links
    document.querySelectorAll(".nav-link").forEach(link => {
      link.classList.toggle("active", link.dataset.view === viewName);
    });
  },

  showDaycareDetail(daycareId) {
    ParentModule.renderDaycareDetail(daycareId);
    this.showView("daycare-detail");
  },

  showToast(title, msg, type = "info") {
    const container = document.getElementById("toast-container");
    if (!container) return;

    const toast = document.createElement("div");
    toast.className = `toast toast-${type}`;
    
    const icons = {
      success: "✓",
      warning: "⚠️",
      error: "✕",
      info: "ℹ️"
    };

    toast.innerHTML = `
      <div class="toast-icon">${icons[type] || "ℹ️"}</div>
      <div>
        <div class="toast-title">${title}</div>
        <div class="toast-msg">${msg}</div>
      </div>
    `;

    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = "0";
      toast.style.transform = "translateY(-10px)";
      setTimeout(() => toast.remove(), 300);
    }, 4500);
  },

  updateNavbarBadges() {
    const role = window.LSState.data.currentRole;
    const unreadCount = window.LSState.data.notifications.filter(n => (n.role === role || n.role === "all") && n.unread).length;
    const badgeEl = document.getElementById("nav-notif-badge");
    
    if (badgeEl) {
      badgeEl.textContent = unreadCount;
      badgeEl.style.display = unreadCount > 0 ? "flex" : "none";
    }
  },

  toggleNotificationDrawer() {
    const role = window.LSState.data.currentRole;
    const notifs = window.LSState.data.notifications.filter(n => n.role === role || n.role === "all");
    
    let modal = document.getElementById("notifications-modal");
    if (!modal) return;

    const listEl = document.getElementById("notifications-list");
    if (listEl) {
      listEl.innerHTML = notifs.length === 0 ? `
        <div style="text-align: center; padding: 2rem; color: var(--text-secondary);">
          No new alerts. You are completely up to date!
        </div>
      ` : notifs.map(n => `
        <div style="padding: 0.85rem 1rem; border-radius: var(--radius-sm); background: ${n.unread ? 'var(--primary-50)' : 'var(--bg-subtle)'}; margin-bottom: 0.5rem; border-left: 3px solid ${n.unread ? 'var(--primary-600)' : 'var(--border-light)'};">
          <div class="flex justify-between items-center" style="margin-bottom: 2px;">
            <strong style="font-size: 0.9rem; color: var(--text-main);">${n.title}</strong>
            <span style="font-size: 0.75rem; color: var(--text-muted);">${n.time}</span>
          </div>
          <p style="font-size: 0.82rem; color: var(--text-secondary);">${n.message}</p>
        </div>
      `).join('');
    }

    modal.classList.add("active");
    window.LSState.markAllNotificationsRead(role);
  },

  resetToDefaultDemoData() {
    window.LSState.resetToDefaults();
    this.showToast("Demo Data Reset", "Initial daycares, bookings, and caregivers reloaded.", "info");
    if (this.currentView === "admin-portal") AdminModule.renderAdminPortal();
    if (this.currentView === "provider-portal") ProviderModule.renderProviderPortal();
    if (this.currentView === "parent-dashboard") ParentModule.renderParentDashboard();
    if (this.currentView === "discovery") ParentModule.renderDaycaresList();
  }
};

window.App = App;

// Bootstrap on DOM ready
document.addEventListener("DOMContentLoaded", () => {
  App.init();
});
