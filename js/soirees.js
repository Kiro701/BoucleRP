const calendar = document.getElementById("calendar");
const title = document.getElementById("title");
const modal = document.getElementById("dayModal");
const content = document.getElementById("dayContent");

let currentDate = new Date();
let activeTags = [];

/* ===== RENDER CALENDAR ===== */
function renderCalendar() {
  calendar.innerHTML = "";

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  title.textContent = currentDate.toLocaleDateString("fr-FR", {
    month: "long",
    year: "numeric"
  });

  const daysInMonth = new Date(year, month + 1, 0).getDate();

  for (let d = 1; d <= daysInMonth; d++) {
    const iso = `${year}-${String(month + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
    const dayData = soireesData.find(s => s.date === iso);

    if (dayData && activeTags.length > 0) {
      if (!activeTags.every(tag => dayData.tags.includes(tag))) continue;
    }

    const div = document.createElement("div");
    div.className = "day";
    div.innerHTML = `<div class="day-number">${d}</div>`;

    if (dayData) {
      div.classList.add("has-session");
      if (dayData.special) div.classList.add("special");
      div.innerHTML += `<div class="count">${dayData.sessions.length} séance(s)</div>`;
      div.onclick = () => openDay(dayData);
    }

    calendar.appendChild(div);
  }
}

/* ===== OPEN DAY ===== */
function openDay(day) {
  content.innerHTML = `<h3>📅 ${day.date}</h3>`;

  day.sessions.forEach(session => {
    content.innerHTML += `
      <div class="session ${session.major ? "major" : ""}">
        <h4>${session.title}</h4>
        <p>${session.description}</p>
        <div class="images">
          ${session.images.map(img => `
            <div>
              <img src="${img.src}">
              <div class="author">© ${img.author}</div>
            </div>
          `).join("")}
        </div>
      </div>
    `;
  });

  modal.style.display = "flex";
}

modal.onclick = e => {
  if (e.target === modal) modal.style.display = "none";
};

/* ===== FILTERS ===== */
document.querySelectorAll(".filter-btn").forEach(btn => {
  btn.onclick = () => {
    if (btn.dataset.tag === "all") {
      activeTags = [];
      document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
    } else {
      btn.classList.toggle("active");
      activeTags = [...document.querySelectorAll(".filter-btn.active")]
        .map(b => b.dataset.tag)
        .filter(tag => tag !== "all");
    }
    renderCalendar();
  };
});

/* ===== NAVIGATION ===== */
document.getElementById("prev").onclick = () => {
  currentDate.setMonth(currentDate.getMonth() - 1);
  renderCalendar();
};

document.getElementById("next").onclick = () => {
  currentDate.setMonth(currentDate.getMonth() + 1);
  renderCalendar();
};

/* ===== LIGHTBOX ===== */
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");
const closeBtn = document.querySelector(".close");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");

let images = [];
let index = 0;

document.addEventListener("click", e => {
  if (e.target.tagName === "IMG" && e.target.closest(".images")) {
    images = [...e.target.closest(".images").querySelectorAll("img")].map(i => i.src);
    index = images.indexOf(e.target.src);
    openLightbox();
  }
});

function openLightbox() {
  lightbox.style.display = "flex";
  lightboxImg.src = images[index];
  lightboxImg.classList.remove("zoom");
}

lightboxImg.onclick = () => {
  lightboxImg.classList.toggle("zoom");
};

nextBtn.onclick = () => {
  index = (index + 1) % images.length;
  lightboxImg.src = images[index];
};

prevBtn.onclick = () => {
  index = (index - 1 + images.length) % images.length;
  lightboxImg.src = images[index];
};

closeBtn.onclick = () => {
  lightbox.style.display = "none";
};

lightbox.onclick = e => {
  if (e.target === lightbox) lightbox.style.display = "none";
};

renderCalendar();
