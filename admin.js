function escapeHtml(str){
  return String(str ?? "").replace(/[&<>"']/g, (m) => ({
    "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"
  }[m]));
}

const DATA = window.SEMS_DATA || { events: [], reviews: [], thoughts: [] };

function requireLogin(){
  if(localStorage.getItem("sems_admin_logged") !== "yes"){
    alert("❌ Admin login required");
    window.location.href = "index.html#home";
    return false;
  }
  return true;
}

function saveHint(){
  alert("✅ Changes saved in memory!\n⚠️ To make it live for everyone: open data.js and update it with your new data.");
}

function renderEvents(){
  const box = document.getElementById("adminEventsList");
  box.innerHTML = "";

  const evs = DATA.events || [];
  if(evs.length === 0){
    box.innerHTML = `<div class="admin-mini">No events yet ✅</div>`;
    return;
  }

  evs.slice().reverse().forEach(ev => {
    const div = document.createElement("div");
    div.className = "admin-panel";
    div.innerHTML = `
      <h3>${escapeHtml(ev.title)} ${ev.featured ? "🔥" : ""}</h3>
      <div class="admin-mini"><b>Date:</b> ${escapeHtml(ev.date)}</div>
      <div class="admin-mini">${escapeHtml(ev.desc)}</div>
      <div class="admin-mini"><b>Photos:</b> ${(ev.photos || []).length}</div>
    `;
    box.appendChild(div);
  });
}

function addEvent(){
  const title = document.getElementById("evTitle").value.trim();
  const date = document.getElementById("evDate").value.trim();
  const desc = document.getElementById("evDesc").value.trim();
  const featured = document.getElementById("evFeatured").checked;

  // photos: multiple links, one per line
  const photosRaw = document.getElementById("evPhotos").value.trim();
  const photos = photosRaw
    ? photosRaw.split("\n").map(x => x.trim()).filter(Boolean)
    : [];

  if(!title || !date || !desc){
    alert("❌ Fill title, date, description");
    return;
  }

  DATA.events = DATA.events || [];
  DATA.events.push({
    id: "ev_" + Date.now(),
    title, date, desc, featured, photos
  });

  document.getElementById("evTitle").value = "";
  document.getElementById("evDate").value = "";
  document.getElementById("evDesc").value = "";
  document.getElementById("evPhotos").value = "";
  document.getElementById("evFeatured").checked = false;

  renderEvents();
  saveHint();
}

function updateThought(){
  const t = document.getElementById("thoughtInput").value.trim();
  if(!t){
    alert("❌ Enter thought text");
    return;
  }
  DATA.thoughts = [t];
  saveHint();
}

function addReview(){
  const name = document.getElementById("revName").value.trim();
  const stars = Number(document.getElementById("revStars").value);
  const text = document.getElementById("revText").value.trim();

  if(!name || !text){
    alert("❌ Enter name and review text");
    return;
  }

  DATA.reviews = DATA.reviews || [];
  DATA.reviews.unshift({ name, stars: Math.max(1, Math.min(5, stars || 5)), text });

  document.getElementById("revName").value = "";
  document.getElementById("revText").value = "";
  document.getElementById("revStars").value = "5";

  alert("✅ Review added!\n⚠️ To publish: update data.js");
}

function logout(){
  localStorage.removeItem("sems_admin_logged");
  alert("✅ Logged out");
  window.location.href = "index.html#home";
}

if(requireLogin()){
  renderEvents();

  document.getElementById("addEventBtn").addEventListener("click", addEvent);
  document.getElementById("updateThoughtBtn").addEventListener("click", updateThought);
  document.getElementById("addReviewBtn").addEventListener("click", addReview);
  document.getElementById("logoutBtn").addEventListener("click", logout);
                                        }
