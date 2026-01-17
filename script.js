// Mobile menu toggle
const hamburger = document.getElementById("hamburger");
const navlinks = document.getElementById("navlinks");

hamburger.addEventListener("click", () => {
  navlinks.classList.toggle("open");
});

// Fake submit (under construction)
const form = document.getElementById("admissionForm");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  alert("✅ Enquiry saved (Demo)!\n⚡ Form submission is under construction.");
});

// ======= SECRET ADMIN LOGIN =======

const ADMIN_USERS = [
  { user: "Satya41", pass: "qaZ@123" },
  { user: "Sems2016", pass: "educomp@123" },
];

const adminModal = document.getElementById("adminModal");
const secretAdminBtn = document.getElementById("secretAdminBtn");
const adminLoginBtn = document.getElementById("adminLoginBtn");
const adminCloseBtn = document.getElementById("adminCloseBtn");

function enableAdminMode(){
  document.body.classList.add("admin-mode");
  localStorage.setItem("sems_admin_mode", "on");
}

function disableAdminMode(){
  document.body.classList.remove("admin-mode");
  localStorage.removeItem("sems_admin_mode");
}

// Keep admin theme if already enabled
if(localStorage.getItem("sems_admin_mode") === "on"){
  document.body.classList.add("admin-mode");
}

secretAdminBtn.addEventListener("click", () => {
  adminModal.classList.add("show");
});

adminCloseBtn.addEventListener("click", () => {
  adminModal.classList.remove("show");
});

adminLoginBtn.addEventListener("click", () => {
  const u = document.getElementById("adminUser").value.trim();
  const p = document.getElementById("adminPass").value.trim();

  const ok = ADMIN_USERS.some(x => x.user === u && x.pass === p);

  if(ok){
    enableAdminMode();
    adminModal.classList.remove("show");
    window.location.href = "admin.html"; // open enquiries page
  } else {
    alert("❌ Invalid username or password");
  }
});
