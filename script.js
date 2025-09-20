/* ======================================================
   MOBILE NAVIGATION (BURGER MENU)
====================================================== */
const burger = document.getElementById("burger");
const mobileNav = document.getElementById("mobile-nav");

// Toggle menu on burger click
burger.addEventListener("click", (e) => {
  e.stopPropagation(); // prevent immediate close
  burger.classList.toggle("active");
  mobileNav.classList.toggle("active");
});

// Close menu when clicking outside
document.addEventListener("click", (e) => {
  if (
    mobileNav.classList.contains("active") &&
    !mobileNav.contains(e.target) &&
    !burger.contains(e.target)
  ) {
    mobileNav.classList.remove("active");
    burger.classList.remove("active");
  }
});

/* ======================================================
   NAVIGATION LINKS (Smooth fade + scroll)
====================================================== */
document.querySelectorAll("nav a, .mobile-nav a").forEach((link) => {
  link.addEventListener("click", (e) => {
    const targetId = link.getAttribute("href");
    if (targetId && targetId.startsWith("#")) {
      e.preventDefault();

      // Close mobile nav if open
      mobileNav.classList.remove("active");
      burger.classList.remove("active");

      // Fade out effect
      document.body.classList.add("fade-out");

      setTimeout(() => {
        // Smooth scroll to target
        document.querySelector(targetId).scrollIntoView({
          behavior: "smooth",
        });

        // Fade back in
        setTimeout(() => {
          document.body.classList.remove("fade-out");
          document.body.classList.add("fade-in");
          setTimeout(() => document.body.classList.remove("fade-in"), 400);
        }, 200);
      }, 200);
    }
  });
});

/* ======================================================
   LOGO CLICK (Scroll to top + Heart pop)
====================================================== */
const logo = document.querySelector(".logo");

logo.addEventListener("click", () => {
  // Scroll to top
  window.scrollTo({ top: 0, behavior: "smooth" });

  // Heart pop animation
  const heart = document.createElement("img");
  heart.src = "assets/images/heart.png";
  heart.classList.add("logo-heart");
  logo.appendChild(heart);

  requestAnimationFrame(() => {
    heart.style.opacity = 1;
    heart.style.transform = "translateX(-50%) scale(1.3)";
  });

  setTimeout(() => {
    heart.style.opacity = 0;
    heart.style.transform = "translateX(-50%) scale(1)";
    setTimeout(() => heart.remove(), 500);
  }, 1000);
});

/* ======================================================
   THEME TOGGLE (Light / Dark Mode)
====================================================== */
const themeToggle = document.getElementById("themeToggle");
const themeIcon = document.getElementById("themeIcon");

// Load saved theme
if (localStorage.getItem("theme") === "dark") {
  document.documentElement.classList.add("dark-mode");
  themeIcon.src = "assets/icons/sun.svg";
}

// Toggle theme on click
themeToggle.addEventListener("click", () => {
  document.documentElement.classList.toggle("dark-mode");

  if (document.documentElement.classList.contains("dark-mode")) {
    themeIcon.src = "assets/icons/sun.svg";
    localStorage.setItem("theme", "dark");
  } else {
    themeIcon.src = "assets/icons/moon.svg";
    localStorage.setItem("theme", "light");
  }
});

/* ======================================================
   FLOATING FLOWERS EFFECT
====================================================== */
const profileImg = document.getElementById("profile-img");
const flowerContainer = document.getElementById("flower-confetti-container");

const MAX_FLOWERS = 15;
let currentFlowers = 0;

profileImg.addEventListener("click", () => {
  if (currentFlowers >= MAX_FLOWERS) return;

  const rect = profileImg.getBoundingClientRect();
  const startX = rect.left + rect.width / 2;
  const startY = rect.top + rect.height / 2 - rect.height * 0.2;

  const flowersToSpawn = Math.min(MAX_FLOWERS - currentFlowers, 5);
  for (let i = 0; i < flowersToSpawn; i++) {
    spawnFloatingFlower(startX, startY);
    currentFlowers++;
  }
});

function spawnFloatingFlower(x, y) {
  const flower = document.createElement("img");
  flower.src = "assets/images/flower.png";
  flower.classList.add("flower");

  const size = 20 + Math.random() * 20;
  flower.style.width = size + "px";
  flower.style.left = `${x}px`;
  flower.style.top = `${y}px`;

  flowerContainer.appendChild(flower);

  let vx = (Math.random() - 0.5) * 3;
  let vy = (Math.random() - 0.7) * 3; // more upward tendency
  let vr = (Math.random() - 0.5) * 4;
  let rotation = 0;
  let opacity = 1;

  function animate() {
    x += vx;
    y += vy;
    rotation += vr;

    if (x <= 0 || x >= window.innerWidth - size) vx *= -1;
    if (y <= 0 || y >= window.innerHeight - size) vy *= -1;

    flower.style.left = x + "px";
    flower.style.top = y + "px";
    flower.style.transform = `rotate(${rotation}deg)`;

    opacity -= 0.004;
    flower.style.opacity = opacity;

    if (opacity > 0) requestAnimationFrame(animate);
    else {
      flower.remove();
      currentFlowers--;
    }
  }

  requestAnimationFrame(animate);
}

/* ======================================================
   PROJECT BUTTONS (View Live)
====================================================== */
const funProjectUrls = [
  "https://cute-doll.vercel.app/",
  "https://mochi-lake.vercel.app/",
  "https://mochi-mood.vercel.app/",
];

document.querySelectorAll("#fun-projects .view-live-btn").forEach((btn, i) => {
  btn.addEventListener("click", () => {
    if (funProjectUrls[i]) window.open(funProjectUrls[i], "_blank");
  });
});

/* ======================================================
   IFRAME HANDLING (Loading + Fallback)
====================================================== */
document.querySelectorAll(".iframe-wrapper").forEach((wrapper) => {
  const iframe = wrapper.querySelector("iframe");
  const fallback = wrapper.querySelector(".iframe-fallback");

  iframe.addEventListener("error", () => {
    fallback.style.display = "block";
  });

  iframe.addEventListener("load", () => {
    fallback.style.display = "none";
  });
});




const modal = document.getElementById("certModal");
  const modalImg = document.getElementById("certModalImg");
  const closeBtn = document.querySelector(".cert-close");

  // Open modal when certificate clicked
  document.querySelectorAll(".cert-thumb").forEach(img => {
    img.addEventListener("click", () => {
      modal.style.display = "block";
      modalImg.src = img.dataset.src;
    });
  });

  // Close modal
  closeBtn.onclick = () => modal.style.display = "none";

  // Close on outside click
  modal.onclick = (e) => {
    if (e.target === modal) modal.style.display = "none";
  };