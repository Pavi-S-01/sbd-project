// MUSIC LOGIC
const music = document.getElementById("bgMusic");
const musicToggle = document.getElementById("musicToggle");

function toggleMusic() {
  if (music.paused) {
    music
      .play()
      .then(() => {
        musicToggle.innerText = "⏸️ Pause Music";
      })
      .catch((err) => console.log("Audio waiting for user click interaction."));
  } else {
    music.pause();
    musicToggle.innerText = "🎵 Play Music";
  }
}

function scrollToMemories(event) {
  event.preventDefault();
  const aboutSection = document.getElementById("about-us-start");
  if (aboutSection) {
    aboutSection.scrollIntoView({ behavior: "smooth" });
  }
}

function scrollToTimeline(event) {
  event.preventDefault();
  const timelineSection = document.getElementById("timeline-start");
  if (timelineSection) {
    timelineSection.scrollIntoView({ behavior: "smooth" });
  }
}

function revealLetter() {
  const letter = document.getElementById("secretLetter");
  const gift = document.getElementById("giftBox");
  if (letter.style.display === "block") {
    letter.style.display = "none";
    gift.innerText = "🎁";
  } else {
    letter.style.display = "block";
    gift.innerText = "🔓🎈";
    if (music.paused) toggleMusic();
    setTimeout(() => {
      letter.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }
}

// MEMORY MODAL FUNCTIONS
function openMemory(cardElement) {
  // Close any previously open modal
  closeModal();

  const modal = document.getElementById("memoryModal");
  const date = cardElement.querySelector(".card-date")?.textContent || "";
  const title = cardElement.querySelector("h3.card-content")?.textContent || "";
  const description =
    cardElement.querySelector("p.card-content")?.textContent || "";

  // Find the image
  const img = cardElement.querySelector("img.card-content");

  // Populate modal with card content
  document.querySelector(".modal-date").textContent = date;
  document.querySelector(".modal-title").textContent = title;
  document.querySelector(".modal-description").textContent = description;

  if (img) {
    document.querySelector(".modal-image").src = img.src;
    document.querySelector(".modal-image").alt = img.alt;
  }

  // Show modal with animation
  modal.classList.add("active");
  document.body.style.overflow = "hidden"; // Prevent scroll
}

function closeModal() {
  const modal = document.getElementById("memoryModal");
  modal.classList.remove("active");
  document.body.style.overflow = "auto"; // Restore scroll
}

// COUNTDOWN & CONFETTI ENGINE
const overlay = document.getElementById("intro-overlay");
const countdownText = document.getElementById("countdown-text");
let count = 3;

const countdownInterval = setInterval(() => {
  count--;
  if (count > 0) {
    countdownText.innerText = count;
  } else if (count === 0) {
    countdownText.innerText = "GO! ❤️";
  } else {
    clearInterval(countdownInterval);
    overlay.style.opacity = 0;
    setTimeout(() => {
      overlay.style.visibility = "hidden";
      startConfetti(); // Trigger celebration popups immediately!
    }, 1000);
  }
}, 1000);

// ROMANTIC HEART & ROSE PETAL PARTICLE GENERATOR
function startConfetti() {
  const canvas = document.getElementById("celebration-canvas");
  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  let particles = [];
  const heartColors = ["#ff6b81", "#ff69b4", "#ff1493", "#ff69b4"];

  // Create heart particles
  for (let i = 0; i < 80; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height - canvas.height,
      size: Math.random() * 20 + 10,
      color: heartColors[Math.floor(Math.random() * heartColors.length)],
      speed: Math.random() * 3 + 2,
      angle: Math.random() * 2 - 1,
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: Math.random() * 0.05 - 0.025,
      type: "heart",
    });
  }

  // Create rose petal particles
  for (let i = 0; i < 60; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height - canvas.height,
      size: Math.random() * 8 + 4,
      color: ["#ff6b81", "#ff69b4", "#ff85a1"][Math.floor(Math.random() * 3)],
      speed: Math.random() * 2 + 1,
      angle: Math.random() * 2 - 1,
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: Math.random() * 0.08,
      type: "petal",
    });
  }

  function drawHeart(ctx, x, y, size, color) {
    ctx.save();
    ctx.translate(x, y);
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(0, -size / 3);
    ctx.bezierCurveTo(-size / 2, -size, -size, -size / 2, 0, size / 2);
    ctx.bezierCurveTo(size, -size / 2, size / 2, -size, 0, -size / 3);
    ctx.fill();
    ctx.restore();
  }

  function drawPetal(ctx, x, y, size, color, rotation) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rotation);
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.ellipse(0, 0, size, size * 2, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach((p) => {
      p.y += p.speed;
      p.x += p.angle;
      p.rotation += p.rotationSpeed;

      if (p.type === "heart") {
        drawHeart(ctx, p.x, p.y, p.size, p.color);
      } else {
        drawPetal(ctx, p.x, p.y, p.size, p.color, p.rotation);
      }
    });

    requestAnimationFrame(update);
  }
  update();
}

// SCROLL ANIMATION FOR MEMORY CARDS
function initScrollAnimations() {
  const cards = document.querySelectorAll(".memory-card");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("fade-in-up");
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    },
  );

  cards.forEach((card) => {
    observer.observe(card);
  });
}

// Initialize scroll animations when page loads
document.addEventListener("DOMContentLoaded", initScrollAnimations);
function scrollToTimeline(event) {
  event.preventDefault();
  const targetSection = document.getElementById("timeline-start");

  if (targetSection) {
    targetSection.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  } else {
    console.error("Target section #timeline-start not found in the DOM.");
  }
}
