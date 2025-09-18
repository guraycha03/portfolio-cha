const burger = document.getElementById('burger');
const mobileNav = document.getElementById('mobile-nav');

// Toggle open/close on burger click
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

// Optional: close menu when clicking a link inside
mobileNav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    mobileNav.classList.remove('active');
    burger.classList.remove('active');
  });
});

// Theme Toggle
const themeToggle = document.getElementById("themeToggle");
const themeIcon = document.getElementById("themeIcon");

// load saved theme
if(localStorage.getItem("theme") === "dark") {
  document.documentElement.classList.add("dark-mode");
  themeIcon.src = "assets/icons/sun.svg";
}

// toggle theme on click
themeToggle.addEventListener("click", () => {
  document.documentElement.classList.toggle("dark-mode");

  if(document.documentElement.classList.contains("dark-mode")){
    themeIcon.src = "assets/icons/sun.svg";
    localStorage.setItem("theme", "dark");
  } else {
    themeIcon.src = "assets/icons/moon.svg";
    localStorage.setItem("theme", "light");
  }
});

