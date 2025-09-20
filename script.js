/* ======================================================
   MOBILE NAVIGATION (BURGER MENU)
====================================================== */
const burger = document.getElementById('burger');
const mobileNav = document.getElementById('mobile-nav');

// Toggle menu on burger click
burger.addEventListener('click', (e) => {
  e.stopPropagation(); // prevent immediate close
  burger.classList.toggle('active');
  mobileNav.classList.toggle('active');
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
  if (
    mobileNav.classList.contains('active') &&
    !mobileNav.contains(e.target) &&
    !burger.contains(e.target)
  ) {
    mobileNav.classList.remove('active');
    burger.classList.remove('active');
  }
});

// Close menu when a link is clicked
mobileNav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    mobileNav.classList.remove('active');
    burger.classList.remove('active');
  });
});


// Logo click functionality
const logo = document.querySelector('.logo');

logo.addEventListener('click', () => {
  // Scroll to top
  window.scrollTo({ top: 0, behavior: 'smooth' });

  // Create heart element
  const heart = document.createElement('img');
  heart.src = 'assets/images/heart.png';
  heart.classList.add('logo-heart');
  logo.appendChild(heart);

  // Animate heart (pop effect)
  requestAnimationFrame(() => {
    heart.style.opacity = 1;
    heart.style.transform = 'translateX(-50%) scale(1.3)';
  });

  // Fade out and remove after 1 second
  setTimeout(() => {
    heart.style.opacity = 0;
    heart.style.transform = 'translateX(-50%) scale(1)';
    setTimeout(() => heart.remove(), 500);
  }, 1000);
});



/* ======================================================
   THEME TOGGLE (LIGHT / DARK MODE)
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

  // Start at center of image
  const startX = rect.left + rect.width / 2;
  const startY = rect.top + rect.height / 2 - rect.height * 0.2; 
  // offset a bit higher (-20% height) so flowers burst from upper half

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

  // Random velocity for more natural float
  let vx = (Math.random() - 0.5) * 3;
  let vy = (Math.random() - 0.7) * 3; // more upward tendency
  let vr = (Math.random() - 0.5) * 4;
  let rotation = 0;
  let opacity = 1;

  function animate() {
    x += vx;
    y += vy;
    rotation += vr;

    // Bounce inside window edges
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



document.querySelectorAll('.view-live-btn').forEach((btn, i) => {
  const urls = [
    'https://mochi-lake.vercel.app/',
    'https://mochi-lake.vercel.app/',
    'https://mochi-mood.vercel.app/'
  ];
  
  btn.addEventListener('click', () => {
    window.open(urls[i], '_blank');
  });
});


