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

// ===== STAR RATING =====
const stars = document.querySelectorAll('#starRating .star');
const ratingInput = document.getElementById('reviewRating');
let selectedRating = 0;

stars.forEach(star => {
  star.addEventListener('click', () => {
    selectedRating = parseInt(star.dataset.value);
    ratingInput.value = selectedRating;
    stars.forEach(s => {
      s.classList.toggle('active', parseInt(s.dataset.value) <= selectedRating);
    });
  });

  star.addEventListener('mouseenter', () => {
    const hoverVal = parseInt(star.dataset.value);
    stars.forEach(s => {
      s.classList.toggle('active', parseInt(s.dataset.value) <= hoverVal);
    });
  });
});

document.getElementById('starRating').addEventListener('mouseleave', () => {
  stars.forEach(s => {
    s.classList.toggle('active', parseInt(s.dataset.value) <= selectedRating);
  });
});

// ===== ADD REVIEW FORM =====
const addReviewForm = document.getElementById('addReviewForm');
const reviewSuccess = document.getElementById('reviewSuccess');

addReviewForm.addEventListener('submit', (e) => {
  e.preventDefault();

  if (selectedRating === 0) {
    alert('Please select a star rating!');
    return;
  }

  const name = document.getElementById('reviewName').value.trim();
  const detail = document.getElementById('reviewDetail').value.trim();
  const text = document.getElementById('reviewText').value.trim();

  // Create new review card and add to carousel
  const starFull = '\u2605';
  const starEmpty = '\u2606';
  const starsHTML = starFull.repeat(selectedRating) + starEmpty.repeat(5 - selectedRating);
  const initial = name.charAt(0).toUpperCase();

  const card = document.createElement('div');
  card.className = 'review-card fade-in visible';
  card.innerHTML = `
    <div class="review-stars">${starsHTML}</div>
    <p class="review-text">"${text}"</p>
    <div class="review-author">
      <div class="review-avatar">${initial}</div>
      <div>
        <strong>${name}</strong>
        ${detail ? `<span>${detail}</span>` : ''}
      </div>
    </div>
  `;
  track.appendChild(card);

  // Save to localStorage
  const reviews = JSON.parse(localStorage.getItem('tess_snipsnip_reviews') || '[]');
  reviews.push({ name, detail, text, rating: selectedRating, createdAt: new Date().toISOString() });
  localStorage.setItem('tess_snipsnip_reviews', JSON.stringify(reviews));

  // Show success
  addReviewForm.classList.add('hidden');
  reviewSuccess.classList.add('active');

  // Reset after 3 seconds
  setTimeout(() => {
    addReviewForm.reset();
    selectedRating = 0;
    ratingInput.value = 0;
    stars.forEach(s => s.classList.remove('active'));
    addReviewForm.classList.remove('hidden');
    reviewSuccess.classList.remove('active');
  }, 3000);
});

// ===== LOAD SAVED REVIEWS =====
(function loadSavedReviews() {
  const reviews = JSON.parse(localStorage.getItem('tess_snipsnip_reviews') || '[]');
  const starFull = '\u2605';
  const starEmpty = '\u2606';
  reviews.forEach(r => {
    const starsHTML = starFull.repeat(r.rating) + starEmpty.repeat(5 - r.rating);
    const initial = r.name.charAt(0).toUpperCase();
    const card = document.createElement('div');
    card.className = 'review-card';
    card.innerHTML = `
      <div class="review-stars">${starsHTML}</div>
      <p class="review-text">"${r.text}"</p>
      <div class="review-author">
        <div class="review-avatar">${initial}</div>
        <div>
          <strong>${r.name}</strong>
          ${r.detail ? `<span>${r.detail}</span>` : ''}
        </div>
      </div>
    `;
    track.appendChild(card);
  });
})();

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
document.querySelectorAll('.service-card, .review-card, .gallery-item, .about-stat, .booking-form, .showcase-item, .add-review-wrapper').forEach(el => {
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
