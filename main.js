/* ──────────────────────────────────────────
   main.js — Vasabi Portfolio
   ────────────────────────────────────────── */

/* ── 1. Code Rain Background ── */
const codeLines = [
  "<html>","</html>","<div>","</div>","{}","color: blue;",
  "function()","console.log()","let x = 10;","if(true){}",
  "margin:0;","display:flex;","align-items:center;","const","=>",
  "bootstrap","javascript","css","html","developer","laravel","php"
];

const rain = document.getElementById('code-bg');

function createDrop() {
  const s = document.createElement('span');
  s.innerText = codeLines[Math.floor(Math.random() * codeLines.length)];
  s.style.left = Math.random() * 100 + 'vw';
  s.style.animationDuration = (7 + Math.random() * 8) + 's';
  s.style.fontSize = (11 + Math.random() * 8) + 'px';
  rain.appendChild(s);
  setTimeout(() => s.remove(), 15000);
}

setInterval(createDrop, 600);


/* ── 2. Typed Text Effect ── */
const roles = [
  'Full-Stack Developer',
  'UI/UX Enthusiast',
  'Laravel Developer',
  'Problem Solver'
];

let roleIndex = 0;
let charIndex  = 0;
let isDeleting = false;

const typedEl = document.getElementById('typed-text');

function typeLoop() {
  const word = roles[roleIndex];
  typedEl.textContent = isDeleting
    ? word.slice(0, --charIndex)
    : word.slice(0, ++charIndex);

  if (!isDeleting && charIndex === word.length) {
    isDeleting = true;
    setTimeout(typeLoop, 1800);
    return;
  }

  if (isDeleting && charIndex === 0) {
    isDeleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
  }

  setTimeout(typeLoop, isDeleting ? 60 : 100);
}

typeLoop();


/* ── 3. Scroll-triggered Fade-Up Animations ── */
const fadeObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.fade-up').forEach(el => fadeObserver.observe(el));


/* ── 4. Navbar Shrink + Active Link on Scroll ── */
const nav       = document.getElementById('mainNav');
const scrollBtn = document.getElementById('scrollTop');

window.addEventListener('scroll', () => {
  // Shrink navbar
  nav.classList.toggle('scrolled', window.scrollY > 60);

  // Show / hide scroll-to-top button
  scrollBtn.classList.toggle('visible', window.scrollY > 400);

  // Highlight active nav link
  document.querySelectorAll('section').forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 120) {
      document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
      const activeLink = document.querySelector(`.nav-link[href="#${sec.id}"]`);
      if (activeLink) activeLink.classList.add('active');
    }
  });
});

// Scroll to top
scrollBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});


/* ── 5. Read More / Read Less Toggle ── */
const readMoreBtn  = document.getElementById('readMoreBtn');
const extraAbout   = document.getElementById('extra-about');

readMoreBtn.addEventListener('click', () => {
  const isOpen = extraAbout.classList.toggle('visible');
  readMoreBtn.textContent = isOpen ? 'Read less ↑' : 'Read more →';
});


/* ── 7. Skill Bars Animation ── */
const skillObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;

    const fills = entry.target.querySelectorAll('.skill-fill');
    const pcts  = entry.target.querySelectorAll('.skill-pct');

    fills.forEach((fill, i) => {
      const target = parseInt(fill.dataset.width);
      const pctEl  = pcts[i];

      // Animate bar width
      setTimeout(() => {
        fill.style.width = target + '%';
        fill.classList.add('animated');
      }, i * 120);

      // Animate counter number
      let current = 0;
      const step  = target / 60;
      const timer = setInterval(() => {
        current = Math.min(current + step, target);
        pctEl.textContent = Math.round(current) + '%';
        if (current >= target) clearInterval(timer);
      }, (1200 / 60) + i * 2);
    });

    skillObserver.unobserve(entry.target);
  });
}, { threshold: 0.3 });

const skillSection = document.getElementById('skills');
if (skillSection) skillObserver.observe(skillSection);

window.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('#home .fade-up').forEach((el, i) => {
    setTimeout(() => el.classList.add('visible'), 150 * i);
  });
});


const btn = document.getElementById("downloadBtn");

btn.addEventListener("click", function () {
  const text = btn.querySelector(".btn-text");
  const loader = btn.querySelector(".btn-loader");
  const done = btn.querySelector(".btn-done");

  // Step 1: show loading
  text.classList.add("d-none");
  loader.classList.remove("d-none");
  btn.classList.add("loading");

  // Step 2: simulate download delay
  setTimeout(() => {
    loader.classList.add("d-none");
    done.classList.remove("d-none");
    btn.classList.remove("loading");
    btn.classList.add("done");

    // Step 3: reset after 2 seconds
    setTimeout(() => {
      done.classList.add("d-none");
      text.classList.remove("d-none");
      btn.classList.remove("done");
    }, 2000);

  }, 1500); // adjust time if needed
});