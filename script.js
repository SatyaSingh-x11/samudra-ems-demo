// script.js — SEMS Website 3.0

function escapeHtml(str){
  return String(str ?? "").replace(/[&<>"']/g, (m) => ({
    "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"
  }[m]));
}

const DATA = window.SEMS_DATA || {};

// ✅ HERO BG
const heroBg = document.getElementById("heroBg");
if(heroBg){
  const url = (DATA.heroPhoto || "").trim();
  if(url){
    heroBg.style.backgroundImage = `url("${url}")`;
  } else {
    heroBg.style.backgroundImage = `linear-gradient(135deg, rgba(29,78,216,0.20), rgba(7,26,61,0.20))`;
  }
}

// ✅ THOUGHT
const thoughtBox = document.getElementById("thoughtBox");
if(thoughtBox){
  const thought = (DATA.thoughts && DATA.thoughts.length) ? DATA.thoughts[0] : "A Sea of Knowledge 📚";
  thoughtBox.innerHTML = `💡 <b>Thought:</b> ${escapeHtml(thought)}`;
}

// ✅ HOME EVENTS
const homeEvents = document.getElementById("homeEvents");
if(homeEvents){
  const events = (DATA.events || []).slice().reverse().slice(0, 3);
  if(events.length === 0){
    homeEvents.innerHTML = `
      <div class="card">
        <h3>No events yet ✅</h3>
        <p class="muted">Events will be updated soon.</p>
      </div>
    `;
  } else {
    homeEvents.innerHTML = "";
    events.forEach(ev => {
      const div = document.createElement("div");
      div.className = "event";
      div.innerHTML = `
        <div class="event-tag">📌</div>
        <div style="width:100%">
          <h3>${escapeHtml(ev.title)} ${ev.featured ? "🔥" : ""}</h3>
          <p class="muted" style="margin:6px 0 10px;"><b>${escapeHtml(ev.date)}</b></p>
          <p class="muted" style="margin:0; line-height:1.7;">${escapeHtml(ev.desc)}</p>
          ${ev.featured ? `<span class="badge-featured">Featured</span>` : ""}
        </div>
      `;
      homeEvents.appendChild(div);
    });
  }
}

// ✅ HOME BLOGS (if section exists)
const homeBlogs = document.getElementById("homeBlogs");
if(homeBlogs){
  const blogs = (DATA.blogs || []).slice().reverse().slice(0, 3);
  if(blogs.length === 0){
    homeBlogs.innerHTML = `
      <div class="card">
        <h3>No blogs yet ✅</h3>
        <p class="muted">Blogs will be added soon.</p>
      </div>
    `;
  } else {
    homeBlogs.innerHTML = "";
    blogs.forEach(b => {
      const div = document.createElement("div");
      div.className = "card";
      div.innerHTML = `
        <h3>${escapeHtml(b.title)}</h3>
        <p class="muted" style="margin:6px 0 10px;"><b>${escapeHtml(b.date)}</b> • ${escapeHtml(b.author || "SEMS")}</p>
        <p class="muted" style="line-height:1.7">${escapeHtml(b.excerpt || "")}</p>
        <a class="btn small primary" href="blog.html?id=${encodeURIComponent(b.id)}">Read More →</a>
      `;
      homeBlogs.appendChild(div);
    });
  }
}

// ✅ DEMO ENQUIRY SAVE (LOCAL)
const demoBtn = document.getElementById("demoSubmitBtn");
if(demoBtn){
  demoBtn.addEventListener("click", () => {
    const sName = (document.getElementById("sName")?.value || "").trim();
    const sClass = (document.getElementById("sClass")?.value || "").trim();
    const sPhone = (document.getElementById("sPhone")?.value || "").trim();
    const sMsg = (document.getElementById("sMsg")?.value || "").trim();

    if(!sName || !sClass || !sPhone){
      alert("❌ Please fill Student Name, Class and Phone.");
      return;
    }

    const enquiries = JSON.parse(localStorage.getItem("sems_enquiries") || "[]");
    enquiries.push({
      name: sName,
      class: sClass,
      phone: sPhone,
      message: sMsg,
      time: new Date().toISOString()
    });

    localStorage.setItem("sems_enquiries", JSON.stringify(enquiries));
    alert("✅ Enquiry saved (Demo). Admin can view it locally.");

    document.getElementById("sName").value = "";
    document.getElementById("sClass").value = "";
    document.getElementById("sPhone").value = "";
    document.getElementById("sMsg").value = "";
  });
}

/* ✅ SIGNATURE MODE (works always) */
(function(){
  const logo = document.getElementById("logoTap");
  const toast = document.getElementById("sigToast");
  if(!logo || !toast) return;

  let count = 0;
  let timer = null;

  function show(){
    toast.style.display = "block";
    clearTimeout(window.__sigHide);
    window.__sigHide = setTimeout(() => {
      toast.style.display = "none";
    }, 4500);
  }

  logo.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();

    count++;
    clearTimeout(timer);
    timer = setTimeout(() => count = 0, 900);

    if(count >= 5){
      count = 0;
      show();
    }
  });
})();
