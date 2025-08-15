// Sticky header// ========== Import GSAP for Advanced Animations ==========
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

// ========== API Configuration ==========
const API_ENDPOINTS = {
  MENU: 'https://api.example.com/menu',
  RESERVATIONS: 'https://api.example.com/reservations',
  TESTIMONIALS: 'https://api.example.com/testimonials'
};

// ========== Global Variables ==========
let currentTestimonial = 0;
let menuData = [];
let reservations = JSON.parse(localStorage.getItem('reservations')) || [];
const testimonialInterval = 5000;
let testimonialIntervalId;

// ========== DOM Elements ==========
const elements = {
  navToggle: document.getElementById('navToggle'),
  nav: document.getElementById('nav'),
  reserveBtn: document.getElementById('reserveBtn'),
  reservationForm: document.getElementById('reservationForm'),
  filterButtons: document.querySelectorAll('.filters button'),
  menuGrid: document.getElementById('menuGrid'),
  countdownDays: document.getElementById('days'),
  countdownHours: document.getElementById('hours'),
  countdownMinutes: document.getElementById('minutes'),
  countdownSeconds: document.getElementById('seconds'),
  testimonialSlides: document.querySelectorAll('.slide'),
  dotsContainer: document.getElementById('sliderDots'),
  ctaBtn: document.getElementById('ctaBtn'),
  searchInput: document.createElement('input'),
  ratingContainer: document.createElement('div'),
  header: document.getElementById('header')
};

// ========== Initialize Application ==========
document.addEventListener('DOMContentLoaded', async () => {
  initAnimations();
  await fetchMenuData();
  initMenuSearch();
  initTestimonialSlider();
  initCountdown();
  initReservationForm();
  initSmoothScrolling();
  initStickyHeader();
  initRatingSystem();
});

// ========== Advanced Animations with GSAP ==========
function initAnimations() {
  // Header animation
  gsap.from(elements.header, {
    y: -100,
    duration: 0.8,
    ease: "power3.out"
  });

  // Hero section animation
  gsap.from(".hero-content h1", {
    opacity: 0,
    y: 50,
    duration: 1,
    delay: 0.3
  });

  gsap.from(".hero-content p", {
    opacity: 0,
    y: 50,
    duration: 1,
    delay: 0.6
  });

  gsap.from(".hero-content .btn", {
    opacity: 0,
    y: 50,
    duration: 1,
    delay: 0.9
  });

  // Features animation
  gsap.from(".feature", {
    opacity: 0,
    y: 50,
    duration: 0.8,
    stagger: 0.2,
    scrollTrigger: {
      trigger: ".why-choose-us",
      start: "top 80%"
    }
  });

  // Menu items animation
  gsap.from(".card", {
    opacity: 0,
    y: 50,
    duration: 0.6,
    stagger: 0.1,
    scrollTrigger: {
      trigger: ".grid",
      start: "top 80%"
    }
  });

  // Special offer animation
  gsap.from(".hero-image", {
    opacity: 0,
    x: -100,
    duration: 1,
    scrollTrigger: {
      trigger: ".hero[aria-label='عرض خاص']",
      start: "top 80%"
    }
  });

  gsap.from(".hero-body", {
    opacity: 0,
    x: 100,
    duration: 1,
    scrollTrigger: {
      trigger: ".hero[aria-label='عرض خاص']",
      start: "top 80%"
    }
  });

  // Countdown animation
  gsap.from(".time-box", {
    scale: 0,
    duration: 0.5,
    stagger: 0.1,
    scrollTrigger: {
      trigger: ".countdown",
      start: "top 80%"
    }
  });
}

// ========== API Functions ==========
async function fetchMenuData() {
  try {
    // In a real app, you would fetch from actual API
    // const response = await fetch(API_ENDPOINTS.MENU);
    // menuData = await response.json();
    
    // Mock data for demonstration
    menuData = [
      {
        id: 1,
        name: "Iced Coffee",
        category: "Drinks",
        price: 55,
        description: "Refreshing cold coffee with ice",
        image: "download (1).jpg",
        rating: 4.5
      },
      {
        id: 2,
        name: "Chocolate Cake",
        category: "Desserts",
        price: 80,
        description: "Rich chocolate cake with frosting",
        image: "hq720.jpg",
        rating: 5
      },
      {
        id: 3,
        name: "Margherita Pizza",
        category: "Main",
        price: 120,
        description: "Classic pizza with tomato and mozzarella",
        image: "download (2).jpg",
        rating: 4.8
      },
      {
        id: 4,
        name: "Fresh Juice",
        category: "Drinks",
        price: 45,
        description: "Freshly squeezed seasonal fruit juice",
        image: "download.jpg",
        rating: 4.2
      },
      {
        id: 5,
        name: "Crème Brûlée",
        category: "Desserts",
        price: 95,
        description: "Classic French dessert with caramelized sugar",
        image: "download (3).jpg",
        rating: 4.9
      },
      {
        id: 6,
        name: "Grilled Chicken",
        category: "Main",
        price: 140,
        description: "Juicy grilled chicken with herbs",
        image: "download (4).jpg",
        rating: 4.7
      }
    ];

    renderMenuItems(menuData);
  } catch (error) {
    console.error("Error fetching menu data:", error);
    // Fallback to default menu items
    menuData = Array.from(elements.menuGrid.querySelectorAll('.card')).map(card => {
      return {
        name: card.querySelector('.item-name').textContent,
        category: card.querySelector('.item-cat').textContent,
        price: parseInt(card.querySelector('.price').textContent.replace('EGP ', '')),
        image: card.querySelector('img').src
      };
    });
  }
}

async function submitReservation(reservationData) {
  try {
    // In a real app, you would send to actual API
    // const response = await fetch(API_ENDPOINTS.RESERVATIONS, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify(reservationData)
    // });
    // const result = await response.json();
    
    // Mock response for demonstration
    const result = { success: true, reservationId: Date.now() };
    
    // Save to localStorage
    reservations.push({ ...reservationData, id: result.reservationId });
    localStorage.setItem('reservations', JSON.stringify(reservations));
    
    return result;
  } catch (error) {
    console.error("Error submitting reservation:", error);
    return { success: false, error: "Failed to submit reservation" };
  }
}

// ========== Menu Functions ==========
function renderMenuItems(items) {
  elements.menuGrid.innerHTML = '';
  
  items.forEach(item => {
    const card = document.createElement('article');
    card.className = 'card';
    card.dataset.category = item.category;
    card.setAttribute('aria-label', item.name);
    
    card.innerHTML = `
      <img src="${item.image}" alt="${item.name}">
      <div class="card-body">
        <div class="item-info">
          <p class="item-name">${item.name}</p>
          <p class="item-cat">${item.category}</p>
          ${item.description ? `<p class="item-desc">${item.description}</p>` : ''}
          <div class="stars" data-rating="${item.rating || 0}"></div>
        </div>
        <div class="price">EGP ${item.price}</div>
      </div>
    `;
    
    elements.menuGrid.appendChild(card);
  });
  
  // Re-init animations for new items
  gsap.from(".card", {
    opacity: 0,
    y: 50,
    duration: 0.6,
    stagger: 0.1
  });
}

function initMenuSearch() {
  const searchContainer = document.querySelector('.filters');
  elements.searchInput.type = 'text';
  elements.searchInput.placeholder = 'ابحث في القائمة...';
  elements.searchInput.className = 'menu-search';
  searchContainer.appendChild(elements.searchInput);
  
  elements.searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filteredItems = menuData.filter(item => 
      item.name.toLowerCase().includes(searchTerm) || 
      item.description?.toLowerCase().includes(searchTerm)
    );
    renderMenuItems(filteredItems);
  });
}

// ========== Testimonial Slider ==========
function initTestimonialSlider() {
  createDots();
  if (elements.testimonialSlides.length > 0) {
    testimonialIntervalId = setInterval(nextTestimonial, testimonialInterval);
  }
  
  // Fetch testimonials from API in a real app
  // fetch(API_ENDPOINTS.TESTIMONIALS).then(...)
}

function createDots() {
  elements.dotsContainer.innerHTML = '';
  elements.testimonialSlides.forEach((_, index) => {
    const dot = document.createElement('span');
    dot.addEventListener('click', () => {
      goToTestimonial(index);
    });
    elements.dotsContainer.appendChild(dot);
  });
  updateDots();
}

function updateDots() {
  const dots = elements.dotsContainer.querySelectorAll('span');
  dots.forEach((dot, index) => {
    dot.classList.toggle('active', index === currentTestimonial);
  });
}

function goToTestimonial(index) {
  elements.testimonialSlides.forEach(slide => slide.classList.remove('active'));
  elements.testimonialSlides[index].classList.add('active');
  currentTestimonial = index;
  updateDots();
  resetTestimonialInterval();
}

function nextTestimonial() {
  currentTestimonial = (currentTestimonial + 1) % elements.testimonialSlides.length;
  goToTestimonial(currentTestimonial);
}

function resetTestimonialInterval() {
  clearInterval(testimonialIntervalId);
  testimonialIntervalId = setInterval(nextTestimonial, testimonialInterval);
}

// ========== Countdown Timer ==========
function initCountdown() {
  const countdownDate = new Date();
  countdownDate.setDate(countdownDate.getDate() + 7);
  
  function update() {
    const now = new Date();
    const distance = countdownDate - now;
    
    if (distance < 0) {
      clearInterval(timer);
      document.getElementById('countdown').innerHTML = '<div class="expired">العرض انتهى!</div>';
      return;
    }
    
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
    elements.countdownDays.textContent = days.toString().padStart(2, '0');
    elements.countdownHours.textContent = hours.toString().padStart(2, '0');
    elements.countdownMinutes.textContent = minutes.toString().padStart(2, '0');
    elements.countdownSeconds.textContent = seconds.toString().padStart(2, '0');
  }
  
  update();
  const timer = setInterval(update, 1000);
}

// ========== Reservation System ==========
function initReservationForm() {
  elements.reservationForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = new FormData(elements.reservationForm);
    const reservation = {
      name: formData.get('name'),
      phone: formData.get('phone'),
      date: formData.get('date'),
      people: formData.get('people'),
      time: formData.get('time') || '19:00',
      specialRequests: formData.get('requests') || ''
    };
    
    const result = await submitReservation(reservation);
    
    if (result.success) {
      showReservationConfirmation(reservation);
      elements.reservationForm.reset();
    } else {
      alert('حدث خطأ في الحجز. يرجى المحاولة مرة أخرى.');
    }
  });
}

function showReservationConfirmation(reservation) {
  const confirmationHTML = `
    <div class="confirmation-modal">
      <div class="confirmation-content">
        <h3>تم تأكيد حجزك!</h3>
        <p><strong>الاسم:</strong> ${reservation.name}</p>
        <p><strong>التاريخ:</strong> ${reservation.date}</p>
        <p><strong>الوقت:</strong> ${reservation.time}</p>
        <p><strong>عدد الأشخاص:</strong> ${reservation.people}</p>
        <button class="btn btn-primary close-confirmation">حسناً</button>
      </div>
    </div>
  `;
  
  document.body.insertAdjacentHTML('beforeend', confirmationHTML);
  
  // Animation for modal
  gsap.from(".confirmation-modal", {
    opacity: 0,
    y: 50,
    duration: 0.5
  });
  
  document.querySelector('.close-confirmation').addEventListener('click', () => {
    document.querySelector('.confirmation-modal').remove();
  });
}

// ========== Rating System ==========
function initRatingSystem() {
  // This would be called after menu items are loaded
  document.querySelectorAll('.stars').forEach(starsContainer => {
    const rating = parseFloat(starsContainer.dataset.rating);
    renderStars(starsContainer, rating);
  });
}

function renderStars(container, rating) {
  container.innerHTML = '';
  
  for (let i = 1; i <= 5; i++) {
    const star = document.createElement('i');
    star.className = 'fas fa-star';
    
    if (i <= Math.floor(rating)) {
      star.classList.add('filled');
    } else if (i - 0.5 <= rating) {
      star.classList.add('half-filled');
    }
    
    container.appendChild(star);
  }
}

// ========== UI Helpers ==========
function initSmoothScrolling() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth'
        });
      }
    });
  });
}

function initStickyHeader() {
  window.addEventListener('scroll', () => {
    elements.header.classList.toggle('sticky', window.scrollY > 100);
  });
}

// ========== Event Listeners ==========
elements.navToggle.addEventListener('click', () => {
  elements.nav.classList.toggle('active');
  elements.navToggle.classList.toggle('active');
  document.body.classList.toggle('no-scroll');
});

elements.reserveBtn.addEventListener('click', () => {
  document.getElementById('reservation').scrollIntoView({
    behavior: 'smooth'
  });
});

elements.ctaBtn.addEventListener('click', (e) => {
  e.preventDefault();
  document.getElementById('reservation').scrollIntoView({
    behavior: 'smooth'
  });
});

elements.filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    elements.filterButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
    
    const filterValue = button.dataset.filter;
    const itemsToShow = filterValue === 'all' ? 
      menuData : 
      menuData.filter(item => item.category === filterValue);
    
    renderMenuItems(itemsToShow);
  });
});