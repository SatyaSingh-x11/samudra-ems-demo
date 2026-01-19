// data.js — SEMS Website 2.2 Database (FREE)

window.SEMS_DATA = {
  // ✅ HERO BACKGROUND PHOTO (PHOTO + BLUR OVERLAY)
  // Put 1 nice school photo link here (Google Drive public image link)
  heroPhoto: "",

  // ✅ Thought of the Day (Admin can change)
  thoughts: [
    "Discipline today = success tomorrow 🔥"
  ],

  // ✅ Parent Reviews (Manual admin entry)
  reviews: [
    { name: "Parent", stars: 5, text: "Good teaching and disciplined environment." },
    { name: "Parent", stars: 5, text: "My child is improving day by day. Thank you SEMS!" },
    { name: "Parent", stars: 4, text: "Nice school and supportive staff." }
  ],

  // ✅ Events (multiple images allowed)
  events: [
    {
      id: "ev1",
      title: "Annual Sports Day",
      date: "2026-01-01",
      featured: true,
      desc: "A day full of energy, team spirit and student confidence building.",
      photos: [
        // Paste Google Drive public image links (1 per line later)
      ]
    },
    {
      id: "ev2",
      title: "Cultural Program",
      date: "2026-02-01",
      featured: false,
      desc: "Celebrating talent through dance, music and stage performances.",
      photos: []
    }
  ],

  // ✅ Gallery (separate gallery page can use this)
  // You can add standalone photos too (not only event photos)
  gallery: [
    // Paste image links here if needed
  ]
};
