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

// Form Submission Handler
async function sendMessage(event) {
  event.preventDefault(); // Prevents the page from reloading
  
  // Get form values and UI elements
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const message = document.getElementById("message").value;
  const formMsg = document.getElementById("formMsg");
  const submitBtn = document.querySelector(".btn.primary");

  // Show a loading state on the button
  submitBtn.textContent = "Sending...";
  formMsg.textContent = ""; 

  try {
    // Send the actual data to Web3Forms
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        access_key: "e65f25b5-a1d3-453f-8820-5379fb6d06b4", // <-- PASTE YOUR KEY HERE
        name: name,
        email: email,
        message: message,
        subject: "New Contact Form Submission from Tanvir Portfolio" // Optional: custom email subject
      })
    });

    const result = await response.json();

    if (response.status === 200) {
      // Success
      formMsg.style.color = "#4ade80"; 
      formMsg.textContent = `Thanks ${name}! Your message has been sent.`;
      event.target.reset(); // Clear the form
    } else {
      // API error
      formMsg.style.color = "#f87171"; 
      formMsg.textContent = result.message || "Something went wrong. Please try again.";
    }
  } catch (error) {
    // Network error
    formMsg.style.color = "#f87171"; 
    formMsg.textContent = "Network error. Please check your internet connection.";
  } finally {
    // Reset button text
    submitBtn.textContent = "Send Message";
    
    // Remove the message after 5 seconds
    setTimeout(() => {
      formMsg.textContent = "";
    }, 5000);
  }
}
// Visitor Counter
const visitorCountEl = document.getElementById("visitor-count");
if (visitorCountEl) {
  // Count this visit using localStorage
  let visits = localStorage.getItem("siteVisits");
  visits = visits ? parseInt(visits) + 1 : 1;
  localStorage.setItem("siteVisits", visits);

  // Animate the number counting up
  let current = 0;
  const target = visits;
  const duration = 1500;
  const step = Math.ceil(target / (duration / 30));

  const counter = setInterval(() => {
    current += step;
    if (current >= target) {
      current = target;
      clearInterval(counter);
    }
    visitorCountEl.textContent = current.toLocaleString() + "+";
  }, 30);
}
