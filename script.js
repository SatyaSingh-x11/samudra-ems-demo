// ====== helpers ======
function escapeHtml(str){
  return String(str ?? "").replace(/[&<>"']/g, (m) => ({
    "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"
  }[m]));
}

// ====== MOBILE MENU (optional) ======
const hamburger = document.getElementById("hamburger");
const navlinks = document.getElementById("navlinks");
if (hamburger && navlinks) {
  hamburger.addEventListener("click", () => navlinks.classList.toggle("open"));
}

// ====== DATA ======
const DATA = window.SEMS_DATA || { events: [], reviews: [], thoughts: [] };

// ====== Render Thought of the Day (Home) ======
const thoughtBox = document.getElementById("thoughtBox");
if(thoughtBox){
  const t = DATA.thoughts?.[0] || "A Sea of Knowledge 📚";
  thoughtBox.innerHTML = `💡 <b>Thought:</b> ${escapeHtml(t)}`;
}

// ====== Render Reviews (Home) ======
const reviewsBox = document.getElementById("reviewsBox");
if(reviewsBox){
  const r = (DATA.reviews || []).slice(0, 3);
  if(r.length === 0){
    reviewsBox.innerHTML = `<div class="card"><h3>No reviews yet ✅</h3><p class="muted">Admin will add parent feedback soon.</p></div>`;
  } else {
    reviewsBox.innerHTML = "";
    r.forEach(x => {
      const div = document.createElement("div");
      div.className = "card";
      div.innerHTML = `
        <h3>${"⭐".repeat(Math.max(1, Math.min(5, x.stars || 5)))} ${escapeHtml(x.name || "Parent")}</h3>
        <p>${escapeHtml(x.text || "")}</p>
      `;
      reviewsBox.appendChild(div);
    });
  }
}

// ====== Render Latest Events (Home) ======
const homeEvents = document.getElementById("homeEvents");
if(homeEvents){
  const events = DATA.events || [];
  const latest = events.slice().reverse().slice(0, 3);

  if(latest.length === 0){
    homeEvents.innerHTML = `<div class="card"><h3>No events yet ✅</h3><p class="muted">Admin can add events in Admin Panel.</p></div>`;
  } else {
    homeEvents.innerHTML = "";
    latest.forEach(ev => {
      const div = document.createElement("div");
      div.className = "event";
      div.innerHTML = `
        <div class="event-tag">📢</div>
        <div>
          <h3>${escapeHtml(ev.title)}</h3>
          <p class="muted"><b>${escapeHtml(ev.date)}</b></p>
          <p>${escapeHtml(ev.desc)}</p>
          ${ev.featured ? `<span class="badge-featured">🔥 Featured</span>` : ""}
        </div>
      `;
      homeEvents.appendChild(div);
    });
  }
}

// ====== ADMIN LOGIN (Footer button opens modal) ======
const ADMIN_USERS = [
  { user: "Satya41", pass: "qaZ@123" },
  { user: "Sems2016", pass: "educomp@12345" },
];

const adminModal = document.getElementById("adminModal");
const adminOpenBtn = document.getElementById("adminOpenBtn");
const adminLoginBtn = document.getElementById("adminLoginBtn");
const adminCloseBtn = document.getElementById("adminCloseBtn");

if(adminOpenBtn && adminModal){
  adminOpenBtn.addEventListener("click", () => adminModal.classList.add("show"));
}
if(adminCloseBtn && adminModal){
  adminCloseBtn.addEventListener("click", () => adminModal.classList.remove("show"));
}

if(adminLoginBtn){
  adminLoginBtn.addEventListener("click", () => {
    const u = document.getElementById("adminUser").value.trim();
    const p = document.getElementById("adminPass").value.trim();

    const ok = ADMIN_USERS.some(x => x.user === u && x.pass === p);

    if(ok){
      localStorage.setItem("sems_admin_logged", "yes");
      adminModal.classList.remove("show");
      window.location.href = "admin.html";
    } else {
      alert("❌ Wrong username/password");
    }
  });
  }
