// admin.js — SEMS Admin Panel 2.2

function esc(str){
  return String(str ?? "").replace(/[&<>"']/g, (m) => ({
    "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"
  }[m]));
}

function requireLogin(){
  if(localStorage.getItem("sems_admin_logged") !== "yes"){
    alert("❌ Admin login required");
    window.location.href = "index.html#home";
    return false;
  }
  return true;
}

const DATA = window.SEMS_DATA || {
  heroPhoto: "",
  thoughts: [],
  reviews: [],
  events: [],
  gallery: []
};

// ===== UI ELEMENTS =====
const editEventId = document.getElementById("editEventId");
const evTitle = document.getElementById("evTitle");
const evDate = document.getElementById("evDate");
const evDesc = document.getElementById("evDesc");
const evPhotos = document.getElementById("evPhotos");
const evFeatured = document.getElementById("evFeatured");

const adminEventsList = document.getElementById("adminEventsList");

const thoughtInput = document.getElementById("thoughtInput");

const revName = document.getElementById("revName");
const revStars = document.getElementById("revStars");
const revText = document.getElementById("revText");

const reviewListMini = document.getElementById("reviewListMini");

const galleryLink = document.getElementById("galleryLink");
const galleryListMini = document.getElementById("galleryListMini");

// ===== HELPERS =====
function normalizePhotos(raw){
  const lines = String(raw || "")
    .split("\n")
    .map(x => x.trim())
    .filter(Boolean);

  return lines;
}

function clearEventForm(){
  editEventId.value = "";
  evTitle.value = "";
  evDate.value = "";
  evDesc.value = "";
  evPhotos.value = "";
  evFeatured.checked = false;
}

function findEventById(id){
  return (DATA.events || []).find(e => e.id === id);
}

// ===== RENDER EVENTS =====
function renderEvents(){
  adminEventsList.innerHTML = "";
  const events = DATA.events || [];

  if(events.length === 0){
    adminEventsList.innerHTML = `<div class="admin-mini">No events yet ✅</div>`;
    return;
  }

  events.slice().reverse().forEach(ev => {
    const div = document.createElement("div");
    div.className = "admin-panel";
    div.style.marginBottom = "12px";

    div.innerHTML = `
      <h3>${esc(ev.title)} ${ev.featured ? "🔥" : ""}</h3>
      <div class="admin-mini"><b>Date:</b> ${esc(ev.date)}</div>
      <div class="admin-mini" style="margin-top:6px;">${esc(ev.desc)}</div>
      <div class="admin-mini" style="margin-top:6px;"><b>Photos:</b> ${(ev.photos || []).length}</div>

      <div style="display:flex; gap:10px; flex-wrap:wrap; margin-top:10px;">
        <button class="btn small primary" data-edit="${esc(ev.id)}" type="button">Edit</button>
        <button class="btn small" data-del="${esc(ev.id)}" type="button">Delete</button>
      </div>
    `;

    adminEventsList.appendChild(div);
  });

  // attach edit/delete actions
  adminEventsList.querySelectorAll("[data-edit]").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = btn.getAttribute("data-edit");
      loadEventToForm(id);
    });
  });

  adminEventsList.querySelectorAll("[data-del]").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = btn.getAttribute("data-del");
      deleteEvent(id);
    });
  });
}

function loadEventToForm(id){
  const ev = findEventById(id);
  if(!ev){
    alert("❌ Event not found");
    return;
  }

  editEventId.value = ev.id;
  evTitle.value = ev.title || "";
  evDate.value = ev.date || "";
  evDesc.value = ev.desc || "";
  evFeatured.checked = !!ev.featured;

  const photos = (ev.photos || []).join("\n");
  evPhotos.value = photos;

  alert("✅ Loaded event for editing");
}

function deleteEvent(id){
  if(!confirm("Delete this event permanently?")){
    return;
  }
  DATA.events = (DATA.events || []).filter(e => e.id !== id);
  renderEvents();
  alert("✅ Event deleted (Remember to Export Data)");
}

// ===== SAVE EVENT (ADD OR EDIT) =====
function saveEvent(){
  const title = evTitle.value.trim();
  const date = evDate.value.trim();
  const desc = evDesc.value.trim();
  const featured = evFeatured.checked;
  const photos = normalizePhotos(evPhotos.value);

  if(!title || !date || !desc){
    alert("❌ Fill Title, Date, and Description");
    return;
  }

  DATA.events = DATA.events || [];

  const id = editEventId.value.trim();

  if(id){
    // Edit existing
    const ev = findEventById(id);
    if(!ev){
      alert("❌ Event not found to update");
      return;
    }
    ev.title = title;
    ev.date = date;
    ev.desc = desc;
    ev.featured = featured;
    ev.photos = photos;

    alert("✅ Event updated (Export to publish)");
  } else {
    // Add new
    DATA.events.push({
      id: "ev_" + Date.now(),
      title, date, desc,
      featured,
      photos
    });

    alert("✅ Event added (Export to publish)");
  }

  clearEventForm();
  renderEvents();
}

// ===== THOUGHT =====
function updateThought(){
  const t = thoughtInput.value.trim();
  if(!t){
    alert("❌ Enter a thought");
    return;
  }
  DATA.thoughts = [t];
  alert("✅ Thought updated (Export to publish)");
}

// ===== REVIEWS =====
function addReview(){
  const name = revName.value.trim();
  const stars = Number(revStars.value);
  const text = revText.value.trim();

  if(!name || !text){
    alert("❌ Enter parent name & review text");
    return;
  }

  DATA.reviews = DATA.reviews || [];
  DATA.reviews.unshift({
    name,
    stars: Math.max(1, Math.min(5, stars || 5)),
    text
  });

  revName.value = "";
  revText.value = "";
  revStars.value = "5";

  renderReviewsMini();
  alert("✅ Review added (Export to publish)");
}

function renderReviewsMini(){
  reviewListMini.innerHTML = "";
  const r = (DATA.reviews || []).slice(0, 4);

  if(r.length === 0){
    reviewListMini.innerHTML = `<div class="admin-mini">No reviews yet ✅</div>`;
    return;
  }

  r.forEach(x => {
    const div = document.createElement("div");
    div.className = "admin-mini";
    div.style.padding = "10px";
    div.style.border = "1px solid rgba(255,255,255,0.10)";
    div.style.borderRadius = "14px";
    div.style.marginTop = "10px";
    div.innerHTML = `<b>${esc(x.name)}</b> • ${"⭐".repeat(x.stars || 5)}<br>${esc(x.text)}`;
    reviewListMini.appendChild(div);
  });
}

// ===== GALLERY =====
function addGalleryImage(){
  const link = galleryLink.value.trim();
  if(!link){
    alert("❌ Paste an image link first");
    return;
  }

  DATA.gallery = DATA.gallery || [];
  DATA.gallery.unshift(link);
  galleryLink.value = "";

  renderGalleryMini();
  alert("✅ Added to gallery (Export to publish)");
}

function deleteGalleryImage(index){
  if(!confirm("Remove this gallery image?")){
    return;
  }
  DATA.gallery.splice(index, 1);
  renderGalleryMini();
  alert("✅ Removed (Export to publish)");
}

function renderGalleryMini(){
  galleryListMini.innerHTML = "";

  const g = DATA.gallery || [];
  if(g.length === 0){
    galleryListMini.innerHTML = `<div class="admin-mini">No gallery images yet ✅</div>`;
    return;
  }

  g.slice(0, 8).forEach((url, i) => {
    const div = document.createElement("div");
    div.className = "admin-mini";
    div.style.padding = "10px";
    div.style.border = "1px solid rgba(255,255,255,0.10)";
    div.style.borderRadius = "14px";
    div.style.marginTop = "10px";

    div.innerHTML = `
      <div style="display:flex; gap:10px; align-items:center;">
        <img src="${esc(url)}" style="width:56px;height:56px;border-radius:14px;object-fit:cover;border:1px solid rgba(255,255,255,0.10);" onerror="this.style.display='none'">
        <div style="flex:1">
          <div style="opacity:.9">Image Link</div>
          <div style="opacity:.65; font-size:12px; word-break:break-word;">${esc(url)}</div>
        </div>
        <button class="btn small" type="button" data-gdel="${i}">Delete</button>
      </div>
    `;
    galleryListMini.appendChild(div);
  });

  galleryListMini.querySelectorAll("[data-gdel]").forEach(btn => {
    btn.addEventListener("click", () => {
      const i = Number(btn.getAttribute("data-gdel"));
      deleteGalleryImage(i);
    });
  });
}

// ===== EXPORT DATA =====
function exportData(){
  const payload = {
    heroPhoto: DATA.heroPhoto || "",
    thoughts: DATA.thoughts || [],
    reviews: DATA.reviews || [],
    events: DATA.events || [],
    gallery: DATA.gallery || []
  };

  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "SEMS-data-export.json";
  a.click();

  URL.revokeObjectURL(url);

  alert("✅ Exported!\nNow open data.js and replace its content with your exported JSON data.");
}

// ===== LOGOUT =====
function logout(){
  localStorage.removeItem("sems_admin_logged");
  alert("✅ Logged out");
  window.location.href = "index.html#home";
}

// ===== INIT =====
if(requireLogin()){
  // Buttons
  document.getElementById("saveEventBtn").addEventListener("click", saveEvent);
  document.getElementById("clearEventBtn").addEventListener("click", clearEventForm);

  document.getElementById("updateThoughtBtn").addEventListener("click", updateThought);
  document.getElementById("addReviewBtn").addEventListener("click", addReview);

  document.getElementById("addGalleryBtn").addEventListener("click", addGalleryImage);
  document.getElementById("exportBtn").addEventListener("click", exportData);
  document.getElementById("logoutBtn").addEventListener("click", logout);

  // Render initial
  renderEvents();
  renderReviewsMini();
  renderGalleryMini();
          }
