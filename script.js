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

// Trigger flower burst on profile image click
profileImg.addEventListener("click", () => {
  const wrapper = profileImg.parentElement; 
  const rect = wrapper.getBoundingClientRect();

  const startX = rect.width / 2;
  const startY = rect.height / 2 - 75; 

  for (let i = 0; i < 20; i++) {
    spawnFloatingFlower(startX, startY);
  }
});

// Function to spawn a single floating flower
function spawnFloatingFlower(x, y) {
  const flower = document.createElement("img");
  flower.src = "assets/images/flower.png";
  flower.classList.add("flower");
  flower.style.width = `${20 + Math.random() * 20}px`;
  flower.style.position = "absolute";
  flower.style.left = `${x}px`;
  flower.style.top = `${y}px`;
  flower.style.opacity = 1;

  flowerContainer.appendChild(flower);

  // Random velocity and rotation
  let vx = (Math.random() - 0.5) * 4; 
  let vy = (Math.random() - 0.5) * 4;
  let vr = (Math.random() - 0.5) * 4; 
  let rotation = 0;

  // Animate the flower
  function animate() {
    x += vx;
    y += vy;
    rotation += vr;

    flower.style.left = x + "px";
    flower.style.top = y + "px";
    flower.style.transform = `rotate(${rotation}deg)`;

    flower.style.opacity = parseFloat(flower.style.opacity) - 0.002;

    if (flower.style.opacity > 0) requestAnimationFrame(animate);
    else flower.remove();
  }

  requestAnimationFrame(animate);
}
