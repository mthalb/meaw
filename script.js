function toggleMenu() {
  const navbar = document.getElementById("navbar");
  navbar.classList.toggle("show");
}

// Typing animation on home page
const typingElement = document.getElementById("typing");

if (typingElement) {
  const words = ["Web Developer", "Designer", "Student", "Creative Coder"];
  let wordIndex = 0;
  let charIndex = 0;
  let deleting = false;

  function typeEffect() {
    const currentWord = words[wordIndex];

    if (!deleting) {
      typingElement.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;

      if (charIndex === currentWord.length) {
        deleting = true;
        setTimeout(typeEffect, 1200);
        return;
      }
    } else {
      typingElement.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;

      if (charIndex === 0) {
        deleting = false;
        wordIndex = (wordIndex + 1) % words.length;
      }
    }

    setTimeout(typeEffect, deleting ? 70 : 120);
  }

  typeEffect();
}

// Reveal animation
const revealElements = document.querySelectorAll(".reveal");

function revealOnScroll() {
  revealElements.forEach((element) => {
    const windowHeight = window.innerHeight;
    const elementTop = element.getBoundingClientRect().top;
    const revealPoint = 100;

    if (elementTop < windowHeight - revealPoint) {
      element.classList.add("show");
    }
  });
}

window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);

// Contact form message
function sendMessage(event) {
  event.preventDefault();

  const name = document.getElementById("name").value;
  const formMsg = document.getElementById("formMsg");

  formMsg.textContent = `Thank you, ${name}! Your message has been sent.`;

  event.target.reset();
}