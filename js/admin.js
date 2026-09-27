/**
 * Little Steps - Admin Safety & Operations Module
 * Handles Provider Verification, Document Inspection, Safety Audits, Disputes & Platform KPIs
 */

const AdminModule = {
  init() {
    this.renderAdminPortal();
  },

  renderAdminPortal() {
    const container = document.getElementById("admin-portal-view");
    if (!container) return;

    const kpis = window.LSState.getPlatformKPIs();
    const daycares = window.LSState.getDaycares();
    const pendingDaycares = daycares.filter(d => d.verificationStatus === "pending_review");
    const verifiedDaycares = daycares.filter(d => d.isVerified);
    const disputes = window.LSState.data.disputes || [];

    // Flatten all caregivers across all daycares
    const allCaregivers = [];
    daycares.forEach(dc => {
      (dc.caregivers || []).forEach(cg => {
        allCaregivers.push({ ...cg, daycareName: dc.name, daycareCity: dc.city });
      });
    });

    container.innerHTML = `
      <div class="container" style="padding: 2.5rem 0 4rem 0;">
        <!-- Admin Header -->
        <div class="flex justify-between items-center" style="margin-bottom: 2rem;">
          <div>
            <div class="flex items-center gap-2" style="margin-bottom: 4px;">
              <span class="badge badge-night">🛡️ Super Admin Safety & Governance Center</span>
              <span class="badge badge-24x7">Live System Audit</span>
            </div>
            <h1 style="font-size: 2.2rem; margin-bottom: 0.25rem;">Platform Trust & Operations Hub</h1>
            <p style="color: var(--text-secondary); font-size: 0.95rem;">
              Enforcing rigorous 24×7 childcare safety standards, license authentications, and multi-city operations.
            </p>
          </div>

          <button class="btn btn-secondary btn-sm" onclick="App.resetToDefaultDemoData()">
            🔄 Reset Demo Database
          </button>
        </div>

        <!-- 1. Platform KPI Overview Grid -->
        <div class="dashboard-kpi-grid">
          <div class="kpi-stat-card">
            <div class="kpi-stat-icon" style="background: #EEF2FF; color: #4F46E5;">👨‍👩‍👧‍👦</div>
            <div>
              <div class="kpi-stat-value">${kpis.totalParents.toLocaleString()}</div>
              <div class="kpi-stat-label">Registered Parents</div>
            </div>
          </div>

          <div class="kpi-stat-card">
            <div class="kpi-stat-icon" style="background: #ECFDF5; color: #059669;">🏢</div>
            <div>
              <div class="kpi-stat-value">${kpis.verifiedCenters} / ${kpis.totalDaycares}</div>
              <div class="kpi-stat-label">Verified Centers (${Math.round((kpis.verifiedCenters/kpis.totalDaycares)*100)}%)</div>
            </div>
          </div>

          <div class="kpi-stat-card">
            <div class="kpi-stat-icon" style="background: #FEF3C7; color: #D97706;">🛡️</div>
            <div>
              <div class="kpi-stat-value">${pendingDaycares.length}</div>
              <div class="kpi-stat-label">Pending Verifications</div>
            </div>
          </div>

          <div class="kpi-stat-card">
            <div class="kpi-stat-icon" style="background: #FDF2F8; color: #DB2777;">📈</div>
            <div>
              <div class="kpi-stat-value">${kpis.avgUtilization}%</div>
              <div class="kpi-stat-label">Avg Daycare Utilization</div>
            </div>
          </div>
        </div>

        <!-- 2. Daycare Verification Queue (CRITICAL SAFETY SECTION) -->
        <div style="background: #FFFFFF; border: 1px solid var(--border-light); border-radius: var(--radius-md); padding: 1.5rem; margin-bottom: 2rem;">
          <div class="flex justify-between items-center" style="margin-bottom: 1.25rem;">
            <div>
              <h3 style="font-size: 1.25rem; display: flex; align-items: center; gap: 8px;">
                <span>📋 Daycare Certification Queue</span>
                ${pendingDaycares.length > 0 ? `<span class="badge badge-emergency">${pendingDaycares.length} Action Required</span>` : '<span class="badge badge-verified">All Clear</span>'}
              </h3>
              <p style="font-size: 0.85rem; color: var(--text-secondary);">Inspect submitted government licenses, fire NOCs, and health certificates</p>
            </div>
          </div>

          ${pendingDaycares.length === 0 ? `
            <div style="text-align: center; padding: 2rem; color: var(--text-secondary); background: var(--bg-subtle); border-radius: var(--radius-sm);">
              ✓ No pending provider applications at this time. All active daycares are fully verified.
            </div>
          ` : `
            <div class="data-table-container">
              <table class="data-table">
                <thead>
                  <tr>
                    <th>Center Name / City</th>
                    <th>License Number</th>
                    <th>Submitted Documents</th>
                    <th>Capacity / Shift</th>
                    <th>Safety Audit Action</th>
                  </tr>
                </thead>
                <tbody>
                  ${pendingDaycares.map(dc => `
                    <tr>
                      <td>
                        <strong>${dc.name}</strong>
                        <div style="font-size: 0.78rem; color: var(--text-secondary);">📍 ${dc.area}, ${dc.city}</div>
                      </td>
                      <td>
                        <code>${dc.licenseNumber}</code>
                        <div style="font-size: 0.75rem; color: var(--text-muted);">Est. ${dc.establishedYear}</div>
                      </td>
                      <td>
                        <span class="badge badge-pending">2 Documents Uploaded</span>
                        <div style="font-size: 0.75rem; color: var(--text-secondary); margin-top: 2px;">• State Daycare License<br>• Fire Safety NOC</div>
                      </td>
                      <td>
                        <div>${dc.totalCapacity} Children</div>
                        <div style="font-size: 0.75rem; color: var(--text-muted);">${dc.is24x7 ? '24×7 Night Care' : 'Day Only'}</div>
                      </td>
                      <td>
                        <div class="flex gap-2">
                          <button class="btn btn-outline btn-sm" onclick="AdminModule.openDocInspectionModal('${dc.id}')">
                            🔍 Inspect Docs
                          </button>
                          <button class="btn btn-success btn-sm" onclick="AdminModule.approveCenter('${dc.id}')">
                            ✓ Approve
                          </button>
                          <button class="btn btn-danger btn-sm" onclick="AdminModule.rejectCenter('${dc.id}')">
                            ✕ Reject
                          </button>
                        </div>
                      </td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>
          `}
        </div>

        <!-- 3. Caregivers Police & First-Aid Verification Audit -->
        <div style="background: #FFFFFF; border: 1px solid var(--border-light); border-radius: var(--radius-md); padding: 1.5rem; margin-bottom: 2rem;">
          <div class="flex justify-between items-center" style="margin-bottom: 1.25rem;">
            <div>
              <h3 style="font-size: 1.25rem;">Caregiver Safety & Police Clearance Registry (${allCaregivers.length})</h3>
              <p style="font-size: 0.85rem; color: var(--text-secondary);">Biometric identity checks and AHA pediatric first aid certifications</p>
            </div>
          </div>

          <div class="data-table-container">
            <table class="data-table">
              <thead>
                <tr>
                  <th>Caregiver Name</th>
                  <th>Daycare Center</th>
                  <th>Role & Qualifications</th>
                  <th>Police Verification Status</th>
                  <th>Assigned Shift</th>
                </tr>
              </thead>
              <tbody>
                ${allCaregivers.map(cg => `
                  <tr>
                    <td>
                      <div class="flex items-center gap-3">
                        <img src="${cg.photo}" alt="${cg.name}" style="width: 38px; height: 38px; border-radius: 50%; object-fit: cover;" />
                        <div>
                          <strong>${cg.name}</strong>
                          <div style="font-size: 0.75rem; color: var(--text-muted);">${cg.experience} Exp</div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div>${cg.daycareName}</div>
                      <div style="font-size: 0.75rem; color: var(--text-muted);">${cg.daycareCity}</div>
                    </td>
                    <td>
                      <div style="font-weight: 600;">${cg.role}</div>
                      <div style="font-size: 0.75rem; color: var(--text-secondary);">${cg.qualifications}</div>
                    </td>
                    <td>
                      ${cg.policeVerified ? `
                        <span class="badge badge-verified">🛡️ Cleared: ${cg.bgCheckId}</span>
                      ` : `
                        <span class="badge badge-pending">⏳ Verification In Progress</span>
                      `}
                    </td>
                    <td>
                      <span class="badge badge-24x7">${cg.shift || 'Flexible'}</span>
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>

        <!-- 4. Platform Disputes & Safety Incident Monitor -->
        <div style="background: #FFFFFF; border: 1px solid var(--border-light); border-radius: var(--radius-md); padding: 1.5rem;">
          <div class="flex justify-between items-center" style="margin-bottom: 1.25rem;">
            <div>
              <h3 style="font-size: 1.25rem;">Parent Safety Inquiries & Disputes</h3>
              <p style="font-size: 0.85rem; color: var(--text-secondary);">Audit log of parent questions, reschedule disputes, and resolution status</p>
            </div>
          </div>

          <div class="data-table-container">
            <table class="data-table">
              <thead>
                <tr>
                  <th>Dispute ID</th>
                  <th>Daycare / Parent</th>
                  <th>Issue Category</th>
                  <th>Description & Audit Note</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                ${disputes.map(dsp => `
                  <tr>
                    <td><strong>${dsp.id}</strong></td>
                    <td>
                      <div><strong>${dsp.daycareName}</strong></div>
                      <div style="font-size: 0.78rem; color: var(--text-secondary);">Parent: ${dsp.parentName}</div>
                    </td>
                    <td>
                      <span class="badge ${dsp.severity === 'Medium' ? 'badge-emergency' : 'badge-night'}">${dsp.issueType}</span>
                    </td>
                    <td>
                      <div style="font-size: 0.85rem; color: var(--text-main); max-width: 320px;">${dsp.description}</div>
                      <div style="font-size: 0.75rem; color: var(--success-700); margin-top: 2px;">Resolution: ${dsp.resolution}</div>
                    </td>
                    <td>
                      ${dsp.status === 'resolved' ? `<span class="badge badge-completed">✓ Resolved</span>` : `<span class="badge badge-pending">⏳ Open</span>`}
                    </td>
                    <td>
                      ${dsp.status === 'open' ? `
                        <button class="btn btn-primary btn-sm" onclick="AdminModule.resolveDispute('${dsp.id}')">
                          ✓ Mark Resolved
                        </button>
                      ` : `
                        <span style="font-size: 0.75rem; color: var(--text-muted);">Audited</span>
                      `}
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `;
  },

  openDocInspectionModal(daycareId) {
    const dc = window.LSState.getDaycareById(daycareId);
    if (!dc) return;

    const modal = document.getElementById("doc-inspection-modal");
    if (!modal) return;

    document.getElementById("doc-modal-center-name").textContent = dc.name;
    document.getElementById("doc-modal-license-no").textContent = dc.licenseNumber;
    document.getElementById("doc-modal-address").textContent = dc.address;
    document.getElementById("doc-modal-target-id").value = dc.id;

    modal.classList.add("active");
  },

  approveCenter(daycareId) {
    window.LSState.verifyDaycare(daycareId, "approved", "All government registrations, fire NOC, and police verifications verified successfully.");
    App.showToast("Center Approved! 🛡️", "Daycare granted official Little Steps 24×7 Certified Trust Stamp.", "success");
    this.renderAdminPortal();
  },

  rejectCenter(daycareId) {
    window.LSState.verifyDaycare(daycareId, "rejected", "Document inconsistency detected. Re-submission requested.");
    App.showToast("Application Rejected", "Daycare status marked as rejected. Provider notified with notes.", "warning");
    this.renderAdminPortal();
  },

  resolveDispute(disputeId) {
    const dsp = window.LSState.data.disputes.find(d => d.id === disputeId);
    if (dsp) {
      dsp.status = "resolved";
      dsp.resolution = "Admin verified and signed off on compliance.";
      window.LSState.persist();
      App.showToast("Dispute Resolved ✓", `Case ${disputeId} closed.`, "success");
      this.renderAdminPortal();
    }
  }
};

window.AdminModule = AdminModule;
