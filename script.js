// script.js — SEMS Website 2.2

function escapeHtml(str){
  return String(str ?? "").replace(/[&<>"']/g, (m) => ({
    "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"
  }[m]));
}

// ===== DATA =====
const DATA = window.SEMS_DATA || {
  heroPhoto: "",
  thoughts: [],
  reviews: [],
  events: [],
  gallery: []
};

// ===== HERO BACKGROUND PHOTO =====
const heroBg = document.getElementById("heroBg");
if(heroBg){
  const url = DATA.heroPhoto?.trim();
  if(url){
    heroBg.style.backgroundImage = `url("${url}")`;
  } else {
    // fallback (soft gradient effect if no photo)
    heroBg.style.backgroundImage = `linear-gradient(135deg, rgba(29,78,216,0.20), rgba(7,26,61,0.20))`;
  }
}

// ===== THOUGHT =====
const thoughtBox = document.getElementById("thoughtBox");
if(thoughtBox){
  const thought = (DATA.thoughts && DATA.thoughts.length > 0)
    ? DATA.thoughts[0]
    : "A Sea of Knowledge 📚";

  thoughtBox.innerHTML = `💡 <b>Thought:</b> ${escapeHtml(thought)}`;
}

// ===== REVIEWS (HOME) =====
const reviewsBox = document.getElementById("reviewsBox");
if(reviewsBox){
  const reviews = (DATA.reviews || []).slice(0, 3);

  if(reviews.length === 0){
    reviewsBox.innerHTML = `
      <div class="card">
        <h3>No feedback yet ✅</h3>
        <p class="muted">Admin will add parents feedback soon.</p>
      </div>
    `;
  } else {
    reviewsBox.innerHTML = "";
    reviews.forEach(r => {
      const stars = Math.max(1, Math.min(5, Number(r.stars || 5)));
      const div = document.createElement("div");
      div.className = "card";
      div.innerHTML = `
        <h3>${"⭐".repeat(stars)} ${escapeHtml(r.name || "Parent")}</h3>
        <p>${escapeHtml(r.text || "")}</p>
      `;
      reviewsBox.appendChild(div);
    });
  }
}

// ===== LATEST EVENTS (HOME) =====
const homeEvents = document.getElementById("homeEvents");
if(homeEvents){
  const events = DATA.events || [];
  const latest = events.slice().reverse().slice(0, 3);

  if(latest.length === 0){
    homeEvents.innerHTML = `
      <div class="card">
        <h3>No events yet ✅</h3>
        <p class="muted">Admin will update events soon.</p>
      </div>
    `;
  } else {
    homeEvents.innerHTML = "";
    latest.forEach(ev => {
      const div = document.createElement("div");
      div.className = "event";
      div.innerHTML = `
        <div class="event-tag">📢</div>
        <div>
          <h3>${escapeHtml(ev.title || "Event")}</h3>
          <p class="muted"><b>${escapeHtml(ev.date || "")}</b></p>
          <p>${escapeHtml(ev.desc || "")}</p>
          ${ev.featured ? `<span class="badge-featured">🔥 Featured</span>` : ""}
        </div>
      `;
      homeEvents.appendChild(div);
    });
  }
}

// ===== ADMIN LOGIN =====
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

    const ok = ADMIN_USERS.some(acc => acc.user === u && acc.pass === p);

    if(ok){
      localStorage.setItem("sems_admin_logged", "yes");
      adminModal.classList.remove("show");
      window.location.href = "admin.html";
    } else {
      alert("❌ Wrong username or password");
    }
  });
}
