// ===== NAV MENU =====
const hamburger = document.getElementById("hamburger");
const navlinks = document.getElementById("navlinks");

if (hamburger && navlinks) {
  hamburger.addEventListener("click", () => {
    navlinks.classList.toggle("open");
  });
}

// ===== SAVE ENQUIRIES (LOCALSTORAGE) =====
const form = document.getElementById("admissionForm");
const KEY = "sems_enquiries";

if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const student = document.getElementById("studentName").value.trim();
    const classApplying = document.getElementById("classApplying").value.trim();
    const parent = document.getElementById("parentName").value.trim();
    const phone = document.getElementById("phoneNumber").value.trim();
    const message = document.getElementById("messageBox").value.trim();

    if (!student || !classApplying || !parent || !phone) {
      alert("❌ Please fill all required fields");
      return;
    }

    const enquiry = {
      student,
      classApplying,
      parent,
      phone,
      message,
      time: new Date().toLocaleString(),
    };

    const oldData = JSON.parse(localStorage.getItem(KEY) || "[]");
    oldData.push(enquiry);
    localStorage.setItem(KEY, JSON.stringify(oldData));

    form.reset();
    alert("✅ Enquiry saved on THIS device!\nOpen admin.html to view it.");
  });
}

// ===== SECRET ADMIN LOGIN =====
const ADMIN_USERS = [
  { user: "Satya41", pass: "qaZ@123" },
  { user: "Sems2016", pass: "educomp@123" },
];

const adminModal = document.getElementById("adminModal");
const secretAdminBtn = document.getElementById("secretAdminBtn");
const adminLoginBtn = document.getElementById("adminLoginBtn");
const adminCloseBtn = document.getElementById("adminCloseBtn");

function enableAdminMode() {
  document.body.classList.add("admin-mode");
  localStorage.setItem("sems_admin_mode", "on");
}

// Keep theme if already enabled
if (localStorage.getItem("sems_admin_mode") === "on") {
  document.body.classList.add("admin-mode");
}

if (secretAdminBtn && adminModal) {
  secretAdminBtn.addEventListener("click", () => {
    adminModal.classList.add("show");
  });
}

if (adminCloseBtn && adminModal) {
  adminCloseBtn.addEventListener("click", () => {
    adminModal.classList.remove("show");
  });
}

if (adminLoginBtn) {
  adminLoginBtn.addEventListener("click", () => {
    const u = document.getElementById("adminUser").value.trim();
    const p = document.getElementById("adminPass").value.trim();

    const ok = ADMIN_USERS.some((x) => x.user === u && x.pass === p);

    if (ok) {
      enableAdminMode();
      adminModal.classList.remove("show");
      window.location.href = "admin.html";
    } else {
      alert("❌ Invalid username or password");
    }
  });
                                 }
