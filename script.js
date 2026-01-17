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
