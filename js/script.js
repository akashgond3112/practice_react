// Toggle active card and update carousel indicators
function toggleActive(clickedCard) {
  // Get all experience cards
  const cards = document.querySelectorAll(".experience-card");
  
  // Find index of clicked card
  let clickedIndex = 0;
  cards.forEach((card, index) => {
    if (card === clickedCard) {
      clickedIndex = index;
      card.classList.remove("inactive");
    } else {
      card.classList.add("inactive");
    }
  });
  
  // Update carousel indicators
  updateCarouselIndicator(clickedIndex);
}

// Update carousel indicator based on active card
function updateCarouselIndicator(activeIndex) {
  const dots = document.querySelectorAll(".carousel-dot");
  dots.forEach((dot, index) => {
    dot.classList.toggle("active", index === activeIndex);
  });
}

// Initialize carousel indicators and handle dot clicks
function initializeCarouselIndicators() {
  const cards = document.querySelectorAll(".experience-card");
  const carouselContainer = document.querySelector(".carousel-indicators");
  
  // Clear existing dots
  carouselContainer.innerHTML = '';
  
  // Create new dots based on number of experience cards
  cards.forEach((_, index) => {
    const dot = document.createElement("div");
    dot.classList.add("carousel-dot");
    if (index === 0) dot.classList.add("active");
    
    // Add click event to each dot
    dot.addEventListener("click", () => {
      cards.forEach((card, cardIndex) => {
        if (cardIndex === index) {
          card.classList.remove("inactive");
        } else {
          card.classList.add("inactive");
        }
      });
      updateCarouselIndicator(index);
    });
    
    carouselContainer.appendChild(dot);
  });
}

// Skills section interactivity
function initializeSkillsSection() {
  const skillIcons = document.querySelectorAll(".skill-icon");
  const skillDetails = document.querySelectorAll(".skill-detail");

  function activateSkill(skill) {
    // Update active class and filter style for skill icons
    skillIcons.forEach((icon) => {
      if (icon.dataset.skill === skill) {
        icon.classList.add("active");
        icon.style.filter = "none"; // Explicitly remove filter for active icon
      } else {
        icon.classList.remove("active");
        icon.style.filter = "grayscale(100%) opacity(0.5)"; // Apply filter to inactive icons
      }
    });

    // Update active class for skill details
    skillDetails.forEach((detail) => {
      detail.classList.toggle("active", detail.dataset.skill === skill);
    });
  }

  // Add click event listeners to skill icons
  skillIcons.forEach((icon) => {
    icon.addEventListener("click", () => {
      // Get the skill name from the data attribute
      const skillName = icon.dataset.skill;
      activateSkill(skillName);
    });
  });

  // Optional: Add hover effect for skill icons
  skillIcons.forEach((icon) => {
    icon.addEventListener("mouseenter", () => {
      if (!icon.classList.contains("active")) {
        icon.style.filter = "grayscale(70%) opacity(0.7)";
      }
    });
    
    icon.addEventListener("mouseleave", () => {
      if (!icon.classList.contains("active")) {
        icon.style.filter = "grayscale(100%) opacity(0.5)";
      }
    });
  });
  
  // Make sure the first skill is active by default (if none is already active)
  if (!document.querySelector(".skill-icon.active") && skillIcons.length > 0) {
    const firstSkill = skillIcons[0].dataset.skill;
    activateSkill(firstSkill);
  }
}

// Project carousel functionality
function initializeProjectCarousel() {
    const projectCards = document.querySelectorAll('.project-card');
    const carouselDots = document.querySelectorAll('.carousel-dot');
    const prevButton = document.querySelector('.carousel-nav.prev');
    const nextButton = document.querySelector('.carousel-nav.next');
    
    let currentIndex = 0;
    
    // Function to update the active project
    function showProject(index) {
        // Handle index bounds
        if (index < 0) {
            index = projectCards.length - 1;
        } else if (index >= projectCards.length) {
            index = 0;
        }
        
        // Update current index
        currentIndex = index;
        
        // Update project cards
        projectCards.forEach((card, i) => {
            card.classList.toggle('active', i === currentIndex);
        });
        
        // Update dots
        carouselDots.forEach((dot, i) => {
            dot.classList.toggle('active', i === currentIndex);
            dot.classList.toggle('bg-white', i === currentIndex);
            dot.classList.toggle('bg-gray-500', i !== currentIndex);
        });
    }
    
    // Add click handlers to navigation buttons
    if (prevButton) {
        prevButton.addEventListener('click', () => {
            showProject(currentIndex - 1);
        });
    }
    
    if (nextButton) {
        nextButton.addEventListener('click', () => {
            showProject(currentIndex + 1);
        });
    }
    
    // Add click handlers to dots
    carouselDots.forEach((dot, i) => {
        dot.addEventListener('click', () => {
            showProject(i);
        });
    });
    
    // Optional: Auto-rotation
    // let autoRotate = setInterval(() => {
    //     showProject(currentIndex + 1);
    // }, 5000);
    
    // Optional: Pause auto-rotation on hover
    // const carouselContainer = document.querySelector('.project-carousel');
    // carouselContainer.addEventListener('mouseenter', () => {
    //     clearInterval(autoRotate);
    // });
    
    // carouselContainer.addEventListener('mouseleave', () => {
    //     autoRotate = setInterval(() => {
    //         showProject(currentIndex + 1);
    //     }, 5000);
    // });
}

// Initialize when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize project carousel
    initializeProjectCarousel();
    
    // Other initializations...
});

// Make sure to call this function in your document ready event
document.addEventListener('DOMContentLoaded', function() {
  // Other initialization code...
  
  // Initialize skills section interactivity
  initializeSkillsSection();
  
  // Other code...
});

// Make sure to call this function in your document ready event
document.addEventListener('DOMContentLoaded', function() {
  // Other initialization code...
  
  // Initialize skills section interactivity
  initializeSkillsSection();
  
  // Other code...
});

// Page navigation functionality
document.addEventListener('DOMContentLoaded', function() {
  // Initialize carousel indicators
  initializeCarouselIndicators();
  
  // Initialize skills section interactivity
  initializeSkillsSection();
  
  // Initialize page dot navigation
  document.querySelectorAll(".page-dot").forEach((dot) => {
    dot.addEventListener("click", function () {
      const section = this.getAttribute("data-section");
      document
        .getElementById(section)
        .scrollIntoView({ behavior: "smooth" });

      // Update active dot
      document.querySelectorAll(".page-dot").forEach((d) => {
        d.classList.remove("active");
      });
      this.classList.add("active");
    });
  });

  // Detect which section is in view to update navigation
  window.addEventListener("scroll", function () {
    const sections = document.querySelectorAll(".section");
    const dots = document.querySelectorAll(".page-dot");
    const navItems = document.querySelectorAll(".nav-item");

    let current = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (pageYOffset >= sectionTop - sectionHeight / 3) {
        current = section.getAttribute("id");
      }
    });

    // Update active dot
    dots.forEach((dot) => {
      dot.classList.remove("active");
      if (dot.getAttribute("data-section") === current) {
        dot.classList.add("active");
      }
    });

    // Update active nav item
    navItems.forEach((item) => {
      item.classList.remove("active");
      if (item.getAttribute("href") === "#" + current) {
        item.classList.add("active");
      }
    });
  });

  // Make nav items navigate to sections
  document.querySelectorAll(".nav-item").forEach((item) => {
    item.addEventListener("click", function (e) {
      e.preventDefault();
      const section = this.getAttribute("href").substring(1);
      document
        .getElementById(section)
        .scrollIntoView({ behavior: "smooth" });

      // Update active nav item
      document.querySelectorAll(".nav-item").forEach((navItem) => {
        navItem.classList.remove("active");
      });
      this.classList.add("active");
    });
  });
});