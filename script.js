//Custom Alert
  function showAlert(title, message) {
    document.getElementById('alertTitle').textContent = title;
 document.getElementById('alertMessage').textContent = message;
    document.getElementById('customAlert').style.display = 'block';
 document.getElementById('alertBackdrop').style.display = 'block';
  document.getElementById('contactForm').style.display = 'none';
 
  }
  function closeAlert() {
     document.getElementById('customAlert').style.display = 'none';
  document.getElementById('alertBackdrop').style.display = 'none';
  document.getElementById('contactForm').style.display = 'flex';
}
 
 
 
 document.addEventListener('DOMContentLoaded', function () {
  
  
    /*Hamburger*/
  const hamburger  = document.getElementById('hamburger');
  const mobileNav  = document.getElementById('mobileNav');
  
   if (hamburger && mobileNav) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      mobileNav.classList.toggle('open');
    });
    mobileNav.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        hamburger.classList.remove('open');
        mobileNav.classList.remove('open');
      });
    });
  }

  //Stats Count
  function animateCounters(){
    const counters=document.querySelectorAll('.count');

    counters.forEach(counter => {
      const target = parseInt(counter.getAttribute('data-target'));
      const duration = 2000;
      const increment = target / (duration / 16);
      let current =0;
      const timer = setInterval(() => {
        current += increment;

        if (current >= target){
          counter.textContent = target + (target === 4 ? '' : '+');
          clearInterval(timer);
        } else{
          counter.textContent = Math.floor(current) + (target === 4 ? '' : '+');
        }
      
      }, 16);
    });
  }
window.addEventListener('load', () => {
  const statsSection = document.querySelector('.stats');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounters();
        observer.disconnect(); // Run only once
      }
    });
  }, { threshold: 0.5 });

  observer.observe(statsSection);
});

/* Home page project cards auto-scroll */
(function () {
  const track = document.getElementById('scrollTrack');
  if (!track) return;

  const cards = Array.from(track.querySelectorAll('.script-card'));
  if (cards.length < 2) return;

  let isPaused = false;
  let resumeTimer = null;
   let currentIdx = 0;

  function pauseFor(ms) {
    isPaused = true;
    clearTimeout(resumeTimer);
    resumeTimer = setTimeout(() => { isPaused = false; }, ms);
  }

  function scrollToIndex(idx) {
    const card = cards[idx];
    const trackCenter = track.offsetWidth / 2;
    const cardCenter = card.offsetLeft + card.offsetWidth / 2;
    track.scrollTo({
      left: cardCenter - trackCenter,
      behavior: 'smooth'
    });
  }

  setInterval(() => {
    if (isPaused) return;
     currentIdx = currentIdx >= cards.length - 1 ? 0 : currentIdx + 1;
    scrollToIndex(currentIdx);
  }, 4000);
  track.addEventListener('touchstart', () => pauseFor(4000), { passive: true });
})();

/*Testimonials Carousel */

 const track      = document.getElementById('track');
  const prevButton = document.getElementById('prevBtn');
  const nextButton = document.getElementById('nextBtn');

  if (track && prevButton && nextButton) {
    var testimonials = [
      { rating: '5.0', text: 'Great work by this freelancer! Its super easy to communicate with him and his quality of work is 5 star. Will work with him on more projects.', name: 'Gerry Regie', role: 'Youtube Creator, Explainer Channel', initials: 'GR', color: '#b85c38' },
      { rating: '5.0', text: 'We have worked with multiple writers. None match the strategic depth Uthmaan brings.', name: 'Youtube Creator', role: 'Owner, Documentary Channel', initials: 'YC', color: '#3a5f7d' },
      { rating: '5.0', text: 'Every script feels intentional. The hooks, pacing, and transitions are on another level.', name: 'Rae Boyce', role: 'Channel Owner, Health Niche', initials: 'RB', color: '#5a3e8c' },
      { rating: '5.0', text: 'Nam libero tempore cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus.', name: 'Robert Fox', role: 'Director, Creative Studio', initials: 'RF', color: '#2e7d55' }
    ];

    var current = 0;

    function isMobile() { return window.innerWidth <= 768; }

    function buildCard(t, cls) {
      var card = document.createElement('div');
      card.className = 'card ' + cls;
      var starsRow = document.createElement('div');
      starsRow.className = 'stars';
      for (var i = 0; i < 5; i++) {
        var s = document.createElement('span');
        s.className = 'star';
        s.textContent = '\u2605';
        starsRow.appendChild(s);
      }
      var ratingNum = document.createElement('span');
      ratingNum.className = 'rating-num';
      ratingNum.textContent = t.rating;
      starsRow.appendChild(ratingNum);
      var reviewText = document.createElement('p');
      reviewText.className = 'review-text';
      reviewText.textContent = t.text;
      var reviewer = document.createElement('div');
      reviewer.className = 'reviewer';
      var avatar = document.createElement('div');
      avatar.className = 'avatar';
      avatar.style.background = t.color;
      avatar.textContent = t.initials;
      var info = document.createElement('div');
      var name = document.createElement('p');
      name.className = 'reviewer-name';
      name.textContent = t.name;
      var role = document.createElement('p');
      role.className = 'reviewer-role';
      role.textContent = t.role;
      info.appendChild(name);
      info.appendChild(role);
      reviewer.appendChild(avatar);
      reviewer.appendChild(info);
      card.appendChild(starsRow);
      card.appendChild(reviewText);
      card.appendChild(reviewer);
      return card;
    }

    function render() {
      var len     = testimonials.length;
      var prevIdx = (current - 1 + len) % len;
      var nextIdx = (current + 1) % len;
      while (track.firstChild) { track.removeChild(track.firstChild); }
      if (isMobile()) {
        track.appendChild(buildCard(testimonials[current], 'center'));
      } else {
        track.appendChild(buildCard(testimonials[prevIdx], 'side'));
        track.appendChild(buildCard(testimonials[current], 'center'));
        track.appendChild(buildCard(testimonials[nextIdx], 'side'));
      }
    }

    prevButton.addEventListener('click', function () {
      current = (current - 1 + testimonials.length) % testimonials.length;
      render();
    });
    nextButton.addEventListener('click', function () {
      current = (current + 1) % testimonials.length;
      render();
    });
    window.addEventListener('resize', render);
    render();
  }

/*FAQ Items */
const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    item.addEventListener('click', () => {
      faqItems.forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove('active');
        }
      });
      item.classList.toggle('active');
    });
  });


//Contact Form
  const form = document.getElementById('contactForm');
  const submitBtn = document.getElementById('submitBtn');

  if (form && submitBtn) {
  form.addEventListener('submit', async function(e) {
    e.preventDefault();
    const requiredFields = form.querySelectorAll('input[required], select[required], textarea[required]');
    let isValid = true;

    requiredFields.forEach(field => {
      if (!field.value.trim()) {
        isValid = false;
        field.style.borderColor = '#e11d48';
      } else {
        field.style.borderColor = '';
      }
    });

    if (!isValid) {
      showAlert("Missing Information", "Please fill in all required fields.");
      return;
    }
    const originalHTML = submitBtn.innerHTML;
    
    submitBtn.classList.add('sending');
    submitBtn.innerHTML = `
      Sending...
      <span class="arrow">→</span>
    `;
    submitBtn.disabled = true;

     const formAction = form.getAttribute('action');
try {
      const response = await fetch("https://formspree.io/f/mlgkvgan", {
        method: "POST",
        body: new FormData(form),
        headers: { "Accept": "application/json" }
      });

if (response.ok) {
        showAlert("Message Sent!", "Thank you for reaching out. Your project inquiry has been received, and I'll respond shortly.");
        form.reset();
      } else {
        showAlert("Error", "Something went wrong. Please try again.");
      }

    } catch (error) {
      showAlert("Error", "Network error. Please check your connection and try again.");
    }
      submitBtn.classList.remove('sending');
      submitBtn.innerHTML = originalHTML;
      submitBtn.disabled = false;
  });
  }

  //Data Reveal Animation
  const revealElements = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

revealElements.forEach(el => observer.observe(el));
    

/* ── Ticker ── */
  function buildTicker() {
    const bandTrack = document.getElementById('bandTrack');
    if (!bandTrack) return;
    const items = [
      'Long-Form Scriptwriting', 'Hook Engineering', 'Clip Sourcing',
      'Outline Writing', 'YouTube SEO', 'Faceless Channel Scripts',
      'Retention Writing', 'Audience Psychology', 'Content Strategy'
    ];
    let html = '';
    for (let i = 0; i < 3; i++) {
      items.forEach(item => {
        html += `<span class="band-item"><span class="band-star">✳</span>${item}</span>`;
      });
    }
    bandTrack.innerHTML = html;
  }

  buildTicker();

  /*Projects Scripts*/
    const trackProject       = document.getElementById('scrollTrack');
    const leftBtn     = document.getElementById('leftBtn');
    const rightBtn     = document.getElementById('rightBtn');
    const dotsWrap    = document.getElementById('dots');
    const searchInput = document.getElementById('searchInput');
    const searchClear = document.getElementById('searchClear');
    const pillsWrap   = document.getElementById('filterPills');
    const resultCount = document.getElementById('resultCount');
    const emptyState  = document.getElementById('emptyState');
 
    // All script cards (not the empty-state div)
    const allCards = Array.from(trackProject.querySelectorAll('.script-card[data-title]'));
 
    // Store original HTML for title/desc so we can restore/highlight
    allCards.forEach(c => {
      c._origTitle = c.querySelector('.card-title').innerHTML;
      c._origDesc  = c.querySelector('.card-desc').innerHTML;
    });
 
    let activeNiche = 'all';
    let searchQuery = '';
 
    /* ── Filter logic ── */
    function getVisible() {
      return allCards.filter(c => {
        const niches  = c.dataset.niches || '';
        const title   = (c.dataset.title  || '').toLowerCase();
        const desc    = (c.dataset.desc   || '').toLowerCase();
        const q       = searchQuery.toLowerCase();
 
        const nicheOk  = activeNiche === 'all' || niches.includes(activeNiche);
        const searchOk = !q || title.includes(q) || desc.includes(q) || niches.includes(q);
        return nicheOk && searchOk;
      });
    }
 
    function highlight(text, query) {
      if (!query) return text;
      const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      return text.replace(new RegExp(`(${escaped})`, 'gi'), '<mark>$1</mark>');
    }
 
    function applyFilter() {
      const visible = getVisible();
 
      allCards.forEach(c => {
        const show = visible.includes(c);
        c.classList.toggle('hidden', !show);
 
        // restore then highlight
        c.querySelector('.card-title').innerHTML = highlight(c._origTitle, searchQuery);
        c.querySelector('.card-desc').innerHTML  = highlight(c._origDesc,  searchQuery);
      });
 
      // empty state
      emptyState.style.display = visible.length === 0 ? 'flex' : 'none';
 
      // result count
      if (searchQuery || activeNiche !== 'all') {
        resultCount.innerHTML = `Showing <strong>${visible.length}</strong> script${visible.length !== 1 ? 's' : ''}${activeNiche !== 'all' ? ` in <strong>${capitalize(activeNiche)}</strong>` : ''}${searchQuery ? ` matching "<strong>${searchQuery}</strong>"` : ''}`;
      } else {
        resultCount.innerHTML = '';
      }
 
      // reset scroll
      trackProject.scrollTo({ left: 0, behavior: 'smooth' });
      rebuildDots(visible);
    }
 
    function capitalize(s) { return s.charAt(0).toUpperCase() + s.slice(1); }
 
    /* ── Dots: rebuild whenever visible set changes ── */
    function rebuildDots(visible) {
      dotsWrap.innerHTML = '';
      visible.forEach((_, i) => {
        const d = document.createElement('span');
        d.className = 'dot' + (i === 0 ? ' active' : '');
        dotsWrap.appendChild(d);
      });
      syncNav(visible, 0);
    }
 
    /* ── Sync dot highlight + button disabled state ── */
    function syncNav(visible, idx) {
      const dotEls = dotsWrap.querySelectorAll('.dot');
      dotEls.forEach((d, i) => d.classList.toggle('active', i === idx));
      leftBtn.disabled = visible.length === 0 || idx === 0;
      rightBtn.disabled = visible.length === 0 || idx >= visible.length - 1;
    }
 
    /* ── Which visible-card index is closest to the left edge of the track? ── */
    function activeIndex(visible) {
      if (!visible.length) return 0;
      const trackLeft  = trackProject.getBoundingClientRect().left;
      const scrollLeft = trackProject.scrollLeft;
      let best = 0, bestDist = Infinity;
      visible.forEach((card, i) => {
        const dist = Math.abs(card.offsetLeft - scrollLeft - trackLeft + trackProject.getBoundingClientRect().left);
        // simpler: distance of card left edge from track scroll position
        const d2 = Math.abs(card.offsetLeft - trackProject.offsetLeft - scrollLeft);
        if (d2 < bestDist) { bestDist = d2; best = i; }
      });
      return best;
    }
 
    /* ── Called on every scroll event ── */
    function onScroll() {
      const visible = getVisible();
      syncNav(visible, activeIndex(visible));
    }
 
    /* ── Pill clicks ── */
    pillsWrap.addEventListener('click', e => {
      const pill = e.target.closest('.pill');
      if (!pill) return;
      activeNiche = pill.dataset.niche;
      pillsWrap.querySelectorAll('.pill').forEach(p => p.classList.toggle('active', p === pill));
      applyFilter();
    });
 
    /* ── Search input ── */
    searchInput.addEventListener('input', () => {
      searchQuery = searchInput.value.trim();
      searchClear.classList.toggle('visible', searchQuery.length > 0);
      applyFilter();
    });
 
    searchClear.addEventListener('click', () => {
      searchInput.value = '';
      searchQuery = '';
      searchClear.classList.remove('visible');
      searchInput.focus();
      applyFilter();
    });
 
    /* ── Nav buttons: scroll by one visible card's width ── */
    function cardStepWidth() {
      const visible = getVisible();
      if (!visible.length) return 404;
      return visible[0].offsetWidth + parseInt(getComputedStyle(trackProject).gap || '24');
    }
 
    leftBtn.addEventListener('click', () => {
      trackProject.scrollBy({ left: -cardStepWidth(), behavior: 'smooth' });
    });
    rightBtn.addEventListener('click', () => {
      trackProject.scrollBy({ left: cardStepWidth(), behavior: 'smooth' });
    });
 
    trackProject.addEventListener('scroll', onScroll, { passive: true });
 
    /* ── Init: wait one frame so layout is painted before measuring ── */
    requestAnimationFrame(() => applyFilter());

    //Auto-scroll
let autoScrollInterval = null;
let isPaused = false;
function startAutoScroll() {
  stopAutoScroll();
  autoScrollInterval = setInterval(() => {
    if (isPaused) return;
    const visible = getVisible();
    if (!visible.length) return;

    const currentIdx = activeIndex(visible);
    const nextIdx = currentIdx >= visible.length - 1 ? 0 : currentIdx + 1;
    const targetCard = visible[nextIdx];

trackProject.scrollTo({
      left: targetCard.offsetLeft - 60,
      behavior: 'smooth'
    });
  }, 2000);
}
function stopAutoScroll() {
  if (autoScrollInterval) {
    clearInterval(autoScrollInterval);
    autoScrollInterval = null;
  }
}
trackProject.addEventListener('mouseenter', () => { isPaused = true; });
trackProject.addEventListener('mouseleave', () => { isPaused = false; });
trackProject.addEventListener('touchstart', () => {
  isPaused = true;
  clearTimeout(trackProject._resumeTimer);
  trackProject._resumeTimer = setTimeout(() => { isPaused = false; }, 4000);
}, { passive: true });

[leftBtn, rightBtn].forEach(btn => {
  btn.addEventListener('click', () => {
    isPaused = true;
    clearTimeout(trackProject._resumeTimer);
    trackProject._resumeTimer = setTimeout(() => { isPaused = false; }, 4000);
  });
});

startAutoScroll();
});
