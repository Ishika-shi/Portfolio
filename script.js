document.addEventListener("DOMContentLoaded", function () {
  // Contact Form Handling with EmailJS
  const contactForm = document.getElementById("contact-form");
  const formStatus = document.getElementById("form-status");

  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    formStatus.innerText = "Sending...";

    emailjs.sendForm('service_bb9ozkq', 'template_dhyb62y', this)
      .then(() => {
        formStatus.innerText = "✅ Message sent successfully!";
        contactForm.reset();
      })
      .catch((error) => {
        console.error("FAILED...", error);
        formStatus.innerText = "❌ Failed to send message. Please try again.";
      });
  });

  // Typing Text Animation Effect
  const typingText = document.getElementById("typing-text");
  const roles = ["Aspiring Web Developer", "UI Enthusiast", "Problem Solver"];
  let i = 0, j = 0;
  let isDeleting = false;
  let delay = 120;

  function type() {
    const currentRole = roles[i];

    if (isDeleting) {
      typingText.innerText = currentRole.substring(0, j--);
      delay = 80;
    } else {
      typingText.innerText = currentRole.substring(0, j++);
      delay = 150;
    }

    if (!isDeleting && j === currentRole.length + 1) {
      delay = 1500;
      isDeleting = true;
    } else if (isDeleting && j === 0) {
      isDeleting = false;
      i = (i + 1) % roles.length;
      delay = 500;
    }

    setTimeout(type, delay);
  }
  type();

  // Theme Toggle Button
  const toggleBtn = document.getElementById("theme-toggle");
  const icon = toggleBtn.querySelector("i");

  // Vanta.js setup
  let vantaEffect;
  function getVantaColors() {
    const isDark = document.body.classList.contains("dark-mode");
    return isDark
      ? { backgroundColor: 0x181c32, color: 0x5d9fff, points: 0x272e47, maxDistance: 20.0 }
      : { backgroundColor: 0xf5f7ff, color: 0x2c5cff, points: 0xb0c4ff, maxDistance: 18.0 };
  }

  function setupVanta() {
    if (vantaEffect) vantaEffect.destroy();
    const colors = getVantaColors();
    vantaEffect = VANTA.NET({
      el: "#vanta-bg",
      mouseControls: true,
      touchControls: true,
      minHeight: 200.0,
      minWidth: 200.0,
      scale: 1.0,
      scaleMobile: 1.0,
      backgroundColor: colors.backgroundColor,
      color: colors.color,
      points: 15.0,
      maxDistance: colors.maxDistance,
      spacing: 18.0
    });
  }

  setupVanta();

  toggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");

    if (document.body.classList.contains("dark-mode")) {
      icon.classList.replace("ri-moon-line", "ri-sun-line");
    } else {
      icon.classList.replace("ri-sun-line", "ri-moon-line");
    }

    setupVanta();
  });
});
