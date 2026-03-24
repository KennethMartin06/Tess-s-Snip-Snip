// ===== NAVBAR SCROLL =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
});

// ===== MOBILE NAV TOGGLE =====
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  navToggle.classList.toggle('active');
  navLinks.classList.toggle('open');
});

// Close mobile nav on link click
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navToggle.classList.remove('active');
    navLinks.classList.remove('open');
  });
});

// ===== REVIEWS CAROUSEL =====
const track = document.getElementById('reviewsTrack');
const prevBtn = document.getElementById('revPrev');
const nextBtn = document.getElementById('revNext');
let reviewIndex = 0;

function getCardWidth() {
  const card = track.querySelector('.review-card');
  if (!card) return 364;
  return card.offsetWidth + 24; // card width + gap
}

function getVisibleCards() {
  const containerWidth = track.parentElement.offsetWidth;
  return Math.floor(containerWidth / getCardWidth()) || 1;
}

function getMaxIndex() {
  const totalCards = track.querySelectorAll('.review-card').length;
  return Math.max(0, totalCards - getVisibleCards());
}

function slideReviews() {
  track.style.transform = `translateX(-${reviewIndex * getCardWidth()}px)`;
}

nextBtn.addEventListener('click', () => {
  if (reviewIndex < getMaxIndex()) {
    reviewIndex++;
    slideReviews();
  }
});

prevBtn.addEventListener('click', () => {
  if (reviewIndex > 0) {
    reviewIndex--;
    slideReviews();
  }
});

// Reset position on resize
window.addEventListener('resize', () => {
  reviewIndex = Math.min(reviewIndex, getMaxIndex());
  slideReviews();
});

// ===== BOOKING FORM =====
const bookingForm = document.getElementById('bookingForm');
const bookingSuccess = document.getElementById('bookingSuccess');
const bookAnother = document.getElementById('bookAnother');
const dateInput = document.getElementById('dateSelect');

// Set minimum date to today
const today = new Date().toISOString().split('T')[0];
dateInput.setAttribute('min', today);

bookingForm.addEventListener('submit', (e) => {
  e.preventDefault();

  // Gather form data
  const formData = {
    name: document.getElementById('clientName').value,
    phone: document.getElementById('clientPhone').value,
    service: document.getElementById('serviceSelect').value,
    date: document.getElementById('dateSelect').value,
    time: document.querySelector('input[name="timeSlot"]:checked')?.value,
    notes: document.getElementById('notesField').value
  };

  // Store in localStorage as simple booking log
  const bookings = JSON.parse(localStorage.getItem('tess_snipsnip_bookings') || '[]');
  bookings.push({ ...formData, bookedAt: new Date().toISOString() });
  localStorage.setItem('tess_snipsnip_bookings', JSON.stringify(bookings));

  // Show success state
  bookingForm.classList.add('hidden');
  bookingSuccess.classList.add('active');
});

bookAnother.addEventListener('click', () => {
  bookingForm.reset();
  bookingForm.classList.remove('hidden');
  bookingSuccess.classList.remove('active');
});

// ===== SCROLL ANIMATIONS =====
const observerOptions = { threshold: 0.15, rootMargin: '0px 0px -40px 0px' };
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, observerOptions);

// Add fade-in class to animatable elements
document.querySelectorAll('.service-card, .review-card, .gallery-item, .about-stat, .booking-form').forEach(el => {
  el.classList.add('fade-in');
  observer.observe(el);
});

// ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    e.preventDefault();
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
