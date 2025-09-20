import './style.css'

// GSAP-like animation utilities (lightweight alternative)
class ScrollAnimation {
  constructor() {
    this.init();
  }

  init() {
    this.setupScrollTriggers();
    this.setupParallax();
    this.startAnimationLoop();
  }

  setupScrollTriggers() {
    const steps = document.querySelectorAll('.step');
    const visualElements = document.querySelectorAll('.visual-element');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          
          // Activate corresponding visual element
          const stepIndex = Array.from(steps).indexOf(entry.target);
          if (visualElements[stepIndex]) {
            visualElements[stepIndex].classList.add('active');
          }

          // Add special animations for specific sections
          this.addSectionSpecificAnimations(entry.target);
        }
      });
    }, {
      threshold: 0.3,
      rootMargin: '0px 0px -100px 0px'
    });

    steps.forEach(step => observer.observe(step));
  }

  addSectionSpecificAnimations(target) {
    const stepNumber = target.dataset.step;
    
    switch(stepNumber) {
      case '1':
        this.animateFloatingLamps();
        this.animateBlessingBowls();
        break;
      case '2':
        this.animatePathwayLights();
        this.animateTimelineEvents();
        this.animateFlyingBirds();
        break;
      case '3':
        this.animateRangoli();
        this.animateProsperitySymbols();
        break;
      case '4':
        this.animateFireworks();
        this.animateCelebrationActivities();
        this.animateSweetBoxes();
        break;
      case '5':
        this.animateUniverseLights();
        this.animateWisdomQuotes();
        this.animateConstellation();
        break;
      case '6':
        this.animateTraditionCards();
        this.animateTempleScene();
        break;
    }
  }

  animateFloatingLamps() {
    const lamps = document.querySelectorAll('.lamp');
    lamps.forEach((lamp, index) => {
      setTimeout(() => {
        lamp.style.transform = `translateY(-20px) scale(1.1)`;
        lamp.style.opacity = '1';
        lamp.style.filter = 'brightness(1.3) drop-shadow(0 10px 20px rgba(255, 215, 0, 0.5))';
      }, index * 200);
    });
  }

  animateBlessingBowls() {
    const bowls = document.querySelectorAll('.blessing-bowl');
    bowls.forEach((bowl, index) => {
      setTimeout(() => {
        bowl.style.transform = 'translateY(-10px) scale(1.1)';
        bowl.style.boxShadow = '0 15px 30px rgba(255, 215, 0, 0.5)';
        
        // Add click interaction
        bowl.addEventListener('click', () => {
          this.showBlessingMessage(bowl.dataset.blessing);
        });
      }, index * 300);
    });
  }

  showBlessingMessage(blessing) {
    const messages = {
      prosperity: '💰 May wealth and abundance flow into your life!',
      happiness: '😊 May joy and laughter fill your heart!',
      health: '🌿 May you be blessed with good health and vitality!'
    };
    
    const messageEl = document.createElement('div');
    messageEl.className = 'blessing-message';
    messageEl.textContent = messages[blessing];
    messageEl.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: linear-gradient(135deg, #ffd700, #ff6b35);
      color: white;
      padding: 1rem 2rem;
      border-radius: 25px;
      z-index: 1000;
      font-size: 1.2rem;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
      animation: blessingFade 3s ease-out forwards;
    `;
    
    document.body.appendChild(messageEl);
    setTimeout(() => messageEl.remove(), 3000);
  }

  animatePathwayLights() {
    const lights = document.querySelectorAll('.light');
    lights.forEach((light, index) => {
      setTimeout(() => {
        light.style.animation = 'pathwayGlow 1s ease-in-out infinite alternate';
        light.style.boxShadow = '0 0 30px #ffd700, 0 0 50px #ff6b35';
      }, index * 150);
    });
  }

  animateTimelineEvents() {
    const events = document.querySelectorAll('.timeline-event');
    events.forEach((event, index) => {
      setTimeout(() => {
        event.style.transform = 'translateY(-5px)';
        event.style.boxShadow = '0 10px 25px rgba(102, 126, 234, 0.5)';
        
        event.addEventListener('click', () => {
          this.showTimelineDetail(event.dataset.event);
        });
      }, index * 200);
    });
  }

  showTimelineDetail(event) {
    const details = {
      exile: '🏹 Lord Rama was exiled for 14 years due to palace politics, during which he faced many trials.',
      victory: '⚔️ After a great battle, Rama defeated the ten-headed demon king Ravana, rescuing Sita.',
      return: '🏰 The people of Ayodhya lit thousands of lamps to celebrate their beloved king\'s return.'
    };
    
    const detailEl = document.createElement('div');
    detailEl.className = 'timeline-detail';
    detailEl.innerHTML = `
      <div style="
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: linear-gradient(135deg, #667eea, #764ba2);
        color: white;
        padding: 2rem;
        border-radius: 20px;
        max-width: 400px;
        z-index: 1000;
        text-align: center;
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
        animation: detailSlideIn 0.5s ease-out;
      ">
        <h3 style="margin-bottom: 1rem; font-family: 'Playfair Display', serif;">Story Detail</h3>
        <p style="line-height: 1.6;">${details[event]}</p>
        <button onclick="this.parentElement.parentElement.remove()" style="
          margin-top: 1rem;
          padding: 0.5rem 1rem;
          background: #ffd700;
          color: #1a1a2e;
          border: none;
          border-radius: 10px;
          cursor: pointer;
          font-weight: 600;
        ">Close</button>
      </div>
    `;
    
    document.body.appendChild(detailEl);
  }

  animateRangoli() {
    const center = document.querySelector('.rangoli-center');
    const petals = document.querySelectorAll('.petal');
    
    if (center) {
      center.style.transform = 'scale(1.2)';
    }
    
    petals.forEach((petal, index) => {
      setTimeout(() => {
        petal.style.opacity = '1';
        petal.style.transform = `rotate(${index * 60}deg) scale(1.1)`;
      }, index * 100);
    });
  }

  animateFireworks() {
    const fireworks = document.querySelectorAll('.firework');
    fireworks.forEach((firework, index) => {
      setTimeout(() => {
        firework.style.animation = `explode 2s ease-out infinite`;
      }, index * 500);
    });
  }

  animateUniverseLights() {
    const centralLight = document.querySelector('.central-light');
    const orbits = document.querySelectorAll('.orbit');
    
    if (centralLight) {
      centralLight.style.transform = 'scale(1.3)';
      centralLight.style.boxShadow = '0 0 60px #ffd700, 0 0 100px #ff6b35';
    }
    
    orbits.forEach((orbit, index) => {
      setTimeout(() => {
        orbit.style.borderColor = 'rgba(255, 215, 0, 0.8)';
        orbit.style.boxShadow = `0 0 ${20 + index * 10}px rgba(255, 215, 0, 0.3)`;
      }, index * 200);
    });
  }

  animateFlyingBirds() {
    const birds = document.querySelectorAll('.bird');
    birds.forEach(bird => {
      bird.style.animation = 'flyBird 4s ease-in-out infinite';
    });
  }

  animateProsperitySymbols() {
    const symbols = document.querySelectorAll('.symbol');
    symbols.forEach((symbol, index) => {
      setTimeout(() => {
        symbol.style.transform = 'scale(1.1)';
        symbol.style.filter = 'drop-shadow(0 0 20px #ffd700)';
        
        symbol.addEventListener('click', () => {
          this.showProsperityMessage(symbol.className.split(' ')[1]);
        });
      }, index * 300);
    });
  }

  showProsperityMessage(symbol) {
    const messages = {
      lotus: '🪷 The lotus represents purity, beauty, and spiritual awakening',
      coins: '🪙 Gold coins symbolize material wealth and divine blessings',
      elephant: '🐘 The elephant represents strength, wisdom, and good fortune'
    };
    
    this.showTooltip(messages[symbol]);
  }

  animateCelebrationActivities() {
    const activities = document.querySelectorAll('.activity');
    activities.forEach((activity, index) => {
      setTimeout(() => {
        activity.style.transform = 'translateY(-5px) scale(1.05)';
        activity.style.boxShadow = '0 10px 25px rgba(255, 215, 0, 0.4)';
      }, index * 150);
    });
  }

  animateSweetBoxes() {
    const boxes = document.querySelectorAll('.sweet-box');
    boxes.forEach((box, index) => {
      setTimeout(() => {
        box.style.animation = 'bobSweets 3s ease-in-out infinite';
        
        box.addEventListener('click', () => {
          this.createSweetExplosion(box);
        });
      }, index * 200);
    });
  }

  createSweetExplosion(element) {
    for (let i = 0; i < 6; i++) {
      const particle = document.createElement('div');
      particle.textContent = ['🍬', '🧁', '🍰', '🥮', '✨'][Math.floor(Math.random() * 5)];
      particle.style.cssText = `
        position: absolute;
        font-size: 1.2rem;
        pointer-events: none;
        z-index: 100;
        animation: sweetParticle 1.5s ease-out forwards;
      `;
      
      const rect = element.getBoundingClientRect();
      particle.style.left = rect.left + 'px';
      particle.style.top = rect.top + 'px';
      
      const angle = (i / 6) * Math.PI * 2;
      particle.style.setProperty('--dx', Math.cos(angle) * 100 + 'px');
      particle.style.setProperty('--dy', Math.sin(angle) * 100 + 'px');
      
      document.body.appendChild(particle);
      setTimeout(() => particle.remove(), 1500);
    }
  }

  animateWisdomQuotes() {
    const quotes = document.querySelectorAll('.quote');
    quotes.forEach((quote, index) => {
      setTimeout(() => {
        quote.style.transform = 'translateX(10px)';
        quote.style.boxShadow = '0 5px 15px rgba(255, 215, 0, 0.3)';
      }, index * 500);
    });
  }

  animateConstellation() {
    const stars = document.querySelectorAll('.star');
    stars.forEach((star, index) => {
      setTimeout(() => {
        star.style.animation = 'twinkleStar 2s ease-in-out infinite';
        
        star.addEventListener('click', () => {
          this.createStarBurst(star);
        });
      }, index * 300);
    });
  }

  createStarBurst(star) {
    const burst = document.createElement('div');
    burst.style.cssText = `
      position: absolute;
      width: 50px;
      height: 50px;
      background: radial-gradient(circle, #ffd700, transparent);
      border-radius: 50%;
      animation: starBurst 1s ease-out forwards;
      pointer-events: none;
    `;
    
    const rect = star.getBoundingClientRect();
    burst.style.left = rect.left + 'px';
    burst.style.top = rect.top + 'px';
    
    document.body.appendChild(burst);
    setTimeout(() => burst.remove(), 1000);
  }

  animateTraditionCards() {
    const cards = document.querySelectorAll('.tradition-card');
    cards.forEach((card, index) => {
      setTimeout(() => {
        card.style.transform = 'translateY(-10px)';
        card.style.boxShadow = '0 15px 30px rgba(255, 215, 0, 0.3)';
        card.style.borderColor = '#ffd700';
        
        card.addEventListener('click', () => {
          this.showTraditionDetail(card.dataset.tradition);
        });
      }, index * 200);
    });
  }

  showTraditionDetail(tradition) {
    const details = {
      cleaning: 'Deep cleaning of homes represents purification of mind and soul, preparing for divine blessings.',
      prayers: 'Lakshmi Puja is performed to invoke the goddess of wealth and prosperity into our homes.',
      community: 'Diwali brings communities together, strengthening bonds through shared celebrations and joy.'
    };
    
    this.showTooltip(details[tradition]);
  }

  animateTempleScene() {
    const prayerLamps = document.querySelectorAll('.prayer-lamp');
    const smokeTrails = document.querySelectorAll('.smoke-trail');
    
    prayerLamps.forEach((lamp, index) => {
      setTimeout(() => {
        lamp.style.animation = 'prayerFlicker 2s ease-in-out infinite alternate';
      }, index * 100);
    });
    
    smokeTrails.forEach((trail, index) => {
      setTimeout(() => {
        trail.style.animation = 'smokeRise 4s ease-in-out infinite';
      }, index * 2000);
    });
  }

  startAnimationLoop() {
    // Continuous animations
    this.animateDiyas();
    this.animateSparkles();
  }

  animateDiyas() {
    const diyas = document.querySelectorAll('.diya, .celebration-diya');
    
    setInterval(() => {
      diyas.forEach((diya, index) => {
        setTimeout(() => {
          const currentBrightness = diya.style.filter.includes('brightness') 
            ? parseFloat(diya.style.filter.match(/brightness\(([^)]+)\)/)?.[1] || 1)
            : 1;
          
          const newBrightness = currentBrightness === 1 ? 1.3 : 1;
          diya.style.filter = `brightness(${newBrightness})`;
        }, index * 100);
      });
    }, 2000);
  }

  animateSparkles() {
    const sparklesContainer = document.querySelector('.sparkles');
    if (!sparklesContainer) return;

    setInterval(() => {
      // Create floating sparkle
      const sparkle = document.createElement('div');
      sparkle.className = 'floating-sparkle';
      sparkle.style.cssText = `
        position: absolute;
        width: 4px;
        height: 4px;
        background: #ffd700;
        border-radius: 50%;
        top: ${Math.random() * 100}%;
        left: ${Math.random() * 100}%;
        animation: floatUp 3s ease-out forwards;
        pointer-events: none;
      `;
      
      sparklesContainer.appendChild(sparkle);
      
      // Remove after animation
      setTimeout(() => {
        sparkle.remove();
      }, 3000);
    }, 500);
  }
}

// Smooth scrolling for navigation
class SmoothScroll {
  constructor() {
    this.init();
  }

  init() {
    // Add smooth scrolling between sections
    window.addEventListener('wheel', this.handleWheel.bind(this), { passive: false });
  }

  handleWheel(e) {
    if (Math.abs(e.deltaY) > 50) {
      e.preventDefault();
      
      const sections = document.querySelectorAll('.section');
      const currentSection = this.getCurrentSection();
      const currentIndex = Array.from(sections).indexOf(currentSection);
      
      if (e.deltaY > 0 && currentIndex < sections.length - 1) {
        // Scroll down
        sections[currentIndex + 1].scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      } else if (e.deltaY < 0 && currentIndex > 0) {
        // Scroll up
        sections[currentIndex - 1].scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    }
  }

  getCurrentSection() {
    const sections = document.querySelectorAll('.section');
    const scrollPosition = window.pageYOffset + window.innerHeight / 2;
    
    for (let section of sections) {
      const sectionTop = section.offsetTop;
      const sectionBottom = sectionTop + section.offsetHeight;
      
      if (scrollPosition >= sectionTop && scrollPosition <= sectionBottom) {
        return section;
      }
    }
    
    return sections[0];
  }
}

// Audio and interaction enhancements
class InteractionEnhancer {
  constructor() {
    this.init();
  }

  init() {
    this.addHoverEffects();
    this.addClickEffects();
    this.addKeyboardNavigation();
  }

  addHoverEffects() {
    const diyas = document.querySelectorAll('.diya, .celebration-diya, .lamp');
    
    diyas.forEach(diya => {
      diya.addEventListener('mouseenter', () => {
        diya.style.transform = 'scale(1.2)';
        diya.style.filter = 'brightness(1.5) drop-shadow(0 0 30px #ffd700)';
        diya.style.transition = 'all 0.3s ease';
      });
      
      diya.addEventListener('mouseleave', () => {
        diya.style.transform = 'scale(1)';
        diya.style.filter = 'brightness(1)';
      });
    });
  }

  addClickEffects() {
    const clickableElements = document.querySelectorAll('.diya, .lamp, .firework, .blessing-bowl, .symbol, .sweet-box, .star');
    
    clickableElements.forEach(element => {
      element.addEventListener('click', (e) => {
        // Create ripple effect
        const ripple = document.createElement('div');
        ripple.className = 'ripple-effect';
        ripple.style.cssText = `
          position: absolute;
          width: 100px;
          height: 100px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(255, 215, 0, 0.6) 0%, transparent 70%);
          transform: scale(0);
          animation: rippleAnimation 0.6s ease-out;
          pointer-events: none;
          left: ${e.offsetX - 50}px;
          top: ${e.offsetY - 50}px;
        `;
        
        element.style.position = 'relative';
        element.appendChild(ripple);
        
        // Add sound effect simulation
        this.playClickSound(element.className);
        
        // Create floating text effect
        this.createFloatingText(e.clientX, e.clientY);
        
        setTimeout(() => ripple.remove(), 600);
      });
    });
    
    // Add special effects for diyas
    const diyas = document.querySelectorAll('.diya, .celebration-diya');
    diyas.forEach(diya => {
      diya.addEventListener('mouseenter', () => {
        this.createSparkleEffect(diya);
      });
    });
  }

  playClickSound(elementType) {
    // Simulate different sound effects with visual feedback
    const soundFeedback = document.createElement('div');
    soundFeedback.style.cssText = `
      position: fixed;
      top: 20px;
      left: 20px;
      background: rgba(0, 0, 0, 0.8);
      color: #ffd700;
      padding: 0.5rem 1rem;
      border-radius: 20px;
      z-index: 1000;
      font-size: 0.8rem;
      animation: soundPulse 1s ease-out forwards;
    `;
    
    const soundTypes = {
      'diya': '🔔 Gentle chime',
      'lamp': '✨ Soft glow',
      'firework': '💥 Pop!',
      'blessing-bowl': '🎵 Sacred bell',
      'symbol': '🪔 Temple bell',
      'sweet-box': '🎶 Joyful note',
      'star': '⭐ Celestial hum'
    };
    
    const soundType = Object.keys(soundTypes).find(key => elementType.includes(key)) || 'diya';
    soundFeedback.textContent = soundTypes[soundType];
    
    document.body.appendChild(soundFeedback);
    setTimeout(() => soundFeedback.remove(), 1000);
  }

  createFloatingText(x, y) {
    const texts = ['✨', '🪔', '💫', '🌟', '🎆', '🙏', '💰', '😊'];
    const text = texts[Math.floor(Math.random() * texts.length)];
    
    const floatingText = document.createElement('div');
    floatingText.textContent = text;
    floatingText.style.cssText = `
      position: fixed;
      left: ${x}px;
      top: ${y}px;
      font-size: 1.5rem;
      pointer-events: none;
      z-index: 1000;
      animation: floatUpText 2s ease-out forwards;
    `;
    
    document.body.appendChild(floatingText);
    setTimeout(() => floatingText.remove(), 2000);
  }

  createSparkleEffect(element) {
    for (let i = 0; i < 5; i++) {
      setTimeout(() => {
        const sparkle = document.createElement('div');
        sparkle.textContent = '✨';
        sparkle.style.cssText = `
          position: absolute;
          font-size: 0.8rem;
          pointer-events: none;
          animation: sparkleFloat 1.5s ease-out forwards;
          left: ${Math.random() * 60}px;
          top: ${Math.random() * 40}px;
        `;
        
        element.appendChild(sparkle);
        setTimeout(() => sparkle.remove(), 1500);
      }, i * 100);
    }
  }

  addKeyboardNavigation() {
    document.addEventListener('keydown', (e) => {
      const sections = document.querySelectorAll('.section');
      const currentSection = this.getCurrentSection();
      const currentIndex = Array.from(sections).indexOf(currentSection);
      
      switch(e.key) {
        case 'ArrowDown':
        case ' ':
          e.preventDefault();
          if (currentIndex < sections.length - 1) {
            sections[currentIndex + 1].scrollIntoView({
              behavior: 'smooth',
              block: 'start'
            });
          }
          break;
        case 'ArrowUp':
          e.preventDefault();
          if (currentIndex > 0) {
            sections[currentIndex - 1].scrollIntoView({
              behavior: 'smooth',
              block: 'start'
            });
          }
          break;
        case 'Home':
          e.preventDefault();
          sections[0].scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
          break;
        case 'End':
          e.preventDefault();
          sections[sections.length - 1].scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
          break;
      }
    });
  }

  getCurrentSection() {
    const sections = document.querySelectorAll('.section');
    const scrollPosition = window.pageYOffset + window.innerHeight / 2;
    
    for (let section of sections) {
      const sectionTop = section.offsetTop;
      const sectionBottom = sectionTop + section.offsetHeight;
      
      if (scrollPosition >= sectionTop && scrollPosition <= sectionBottom) {
        return section;
      }
    }
    
    return sections[0];
  }
}

// Initialize all components when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Show loading animation
  showLoadingAnimation();
  
  setTimeout(() => {
    new ScrollAnimation();
    new SmoothScroll();
    new InteractionEnhancer();
    new ParticleSystem();
    
    // Add welcome message
    console.log('🪔 Welcome to the Festival of Lights! 🪔');
    console.log('Use arrow keys, space, or scroll to navigate through the story.');
    
    // Hide loading animation
    hideLoadingAnimation();
  }, 2000);
});

// Loading Animation
function showLoadingAnimation() {
  const loader = document.createElement('div');
  loader.id = 'diwali-loader';
  loader.innerHTML = `
    <div class="loading-diya">🪔</div>
    <div style="
      position: fixed;
      top: 60%;
      left: 50%;
      transform: translateX(-50%);
      color: #ffd700;
      font-family: 'Playfair Display', serif;
      font-size: 1.5rem;
      z-index: 9999;
      text-align: center;
    ">
      <div style="margin-bottom: 1rem;">Lighting the lamps...</div>
      <div style="font-size: 1rem; opacity: 0.8;">शुभ दीपावली</div>
    </div>
  `;
  loader.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
    z-index: 9998;
    display: flex;
    align-items: center;
    justify-content: center;
  `;
  
  document.body.appendChild(loader);
}

function hideLoadingAnimation() {
  const loader = document.getElementById('diwali-loader');
  if (loader) {
    loader.style.opacity = '0';
    loader.style.transition = 'opacity 1s ease-out';
    setTimeout(() => loader.remove(), 1000);
  }
}

// Particle System Class
class ParticleSystem {
  constructor() {
    this.particles = [];
    this.init();
  }

  init() {
    this.createParticleContainer();
    this.startParticleGeneration();
  }

  createParticleContainer() {
    this.container = document.createElement('div');
    this.container.className = 'particle-system';
    document.body.appendChild(this.container);
  }

  startParticleGeneration() {
    setInterval(() => {
      if (this.particles.length < 20) { // Limit particles for performance
        this.createParticle();
      }
    }, 1000);

    setInterval(() => {
      this.cleanupParticles();
    }, 5000);
  }

  createParticle() {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    const colors = ['#ffd700', '#ff6b35', '#f7931e', '#fff'];
    const color = colors[Math.floor(Math.random() * colors.length)];
    
    particle.style.cssText = `
      position: absolute;
      width: ${Math.random() * 6 + 2}px;
      height: ${Math.random() * 6 + 2}px;
      background: ${color};
      border-radius: 50%;
      left: ${Math.random() * 100}vw;
      animation: particleFloat ${6 + Math.random() * 4}s linear infinite;
      box-shadow: 0 0 10px ${color};
    `;
    
    this.container.appendChild(particle);
    this.particles.push(particle);
  }

  cleanupParticles() {
    this.particles = this.particles.filter(particle => {
      if (!particle.parentNode) {
        return false;
      }
      
      const rect = particle.getBoundingClientRect();
      if (rect.top < -50) {
        particle.remove();
        return false;
      }
      
      return true;
    });
  }
}

// Enhanced Mouse Interaction
class MouseEffects {
  constructor() {
    this.init();
  }

  init() {
    this.addMouseTrail();
    this.addClickBurst();
  }

  addMouseTrail() {
    let mouseTrail = [];
    
    document.addEventListener('mousemove', (e) => {
      if (mouseTrail.length > 10) {
        const oldTrail = mouseTrail.shift();
        oldTrail.remove();
      }
      
      const trail = document.createElement('div');
      trail.style.cssText = `
        position: fixed;
        width: 6px;
        height: 6px;
        background: radial-gradient(circle, #ffd700, transparent);
        border-radius: 50%;
        pointer-events: none;
        z-index: 1000;
        left: ${e.clientX - 3}px;
        top: ${e.clientY - 3}px;
        animation: trailFade 1s ease-out forwards;
      `;
      
      document.body.appendChild(trail);
      mouseTrail.push(trail);
    });
  }

  addClickBurst() {
    document.addEventListener('click', (e) => {
      this.createClickBurst(e.clientX, e.clientY);
    });
  }

  createClickBurst(x, y) {
    for (let i = 0; i < 8; i++) {
      const burst = document.createElement('div');
      burst.style.cssText = `
        position: fixed;
            width: 4px;
        height: 4px;
        background: #ffd700;
        border-radius: 50%;
        pointer-events: none;
        z-index: 1000;
        left: ${x}px;
        top: ${y}px;
        animation: burstParticle 1s ease-out forwards;
      `;
      
      const angle = (i / 8) * Math.PI * 2;
      burst.style.setProperty('--dx', Math.cos(angle) * 50 + 'px');
      burst.style.setProperty('--dy', Math.sin(angle) * 50 + 'px');
      
      document.body.appendChild(burst);
      setTimeout(() => burst.remove(), 1000);
    }
  }
}

// Add mouse effects
setTimeout(() => {
  new MouseEffects();
}, 2000);

// Add floating sparkle animation to CSS
const floatingSparkleCSS = `
@keyframes floatUp {
  0% {
    opacity: 0;
    transform: translateY(0) scale(0);
  }
  10% {
    opacity: 1;
    transform: translateY(-10px) scale(1);
  }
  100% {
    opacity: 0;
    transform: translateY(-100px) scale(0);
  }
}

@keyframes rippleAnimation {
  0% {
    transform: scale(0);
    opacity: 1;
  }
  100% {
    transform: scale(4);
    opacity: 0;
  }
}
`;

// Add the CSS to the document
const styleSheet = document.createElement('style');
styleSheet.textContent = floatingSparkleCSS;
document.head.appendChild(styleSheet);

// Initialize all components when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Show loading animation
  showLoadingAnimation();
  
  setTimeout(() => {
    new ScrollAnimation();
    new SmoothScroll();
    new InteractionEnhancer();
    new ParticleSystem();
    
    // Add welcome message
    console.log('🪔 Welcome to the Festival of Lights! 🪔');
    console.log('Use arrow keys, space, or scroll to navigate through the story.');
    
    // Hide loading animation
    hideLoadingAnimation();
  }, 2000);
});

// Loading Animation
function showLoadingAnimation() {
  const loader = document.createElement('div');
  loader.id = 'diwali-loader';
  loader.innerHTML = `
    <div class="loading-diya">🪔</div>
    <div style="
      position: fixed;
      top: 60%;
      left: 50%;
      transform: translateX(-50%);
      color: #ffd700;
      font-family: 'Playfair Display', serif;
      font-size: 1.5rem;
      z-index: 9999;
      text-align: center;
    ">
      <div style="margin-bottom: 1rem;">Lighting the lamps...</div>
      <div style="font-size: 1rem; opacity: 0.8;">शुभ दीपावली</div>
    </div>
  `;
  loader.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
    z-index: 9998;
    display: flex;
    align-items: center;
    justify-content: center;
  `;
  
  document.body.appendChild(loader);
}

function hideLoadingAnimation() {
  const loader = document.getElementById('diwali-loader');
  if (loader) {
    loader.style.opacity = '0';
    loader.style.transition = 'opacity 1s ease-out';
    setTimeout(() => loader.remove(), 1000);
  }
}

// Particle System Class
class ParticleSystem {
  constructor() {
    this.particles = [];
    this.init();
  }

  init() {
    this.createParticleContainer();
    this.startParticleGeneration();
  }

  createParticleContainer() {
    this.container = document.createElement('div');
    this.container.className = 'particle-system';
    document.body.appendChild(this.container);
  }

  startParticleGeneration() {
    setInterval(() => {
      if (this.particles.length < 20) { // Limit particles for performance
        this.createParticle();
      }
    }, 1000);

    setInterval(() => {
      this.cleanupParticles();
    }, 5000);
  }

  createParticle() {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    const colors = ['#ffd700', '#ff6b35', '#f7931e', '#fff'];
    const color = colors[Math.floor(Math.random() * colors.length)];
    
    particle.style.cssText = `
      position: absolute;
      width: ${Math.random() * 6 + 2}px;
      height: ${Math.random() * 6 + 2}px;
      background: ${color};
      border-radius: 50%;
      left: ${Math.random() * 100}vw;
      animation: particleFloat ${6 + Math.random() * 4}s linear infinite;
      box-shadow: 0 0 10px ${color};
    `;
    
    this.container.appendChild(particle);
    this.particles.push(particle);
  }

  cleanupParticles() {
    this.particles = this.particles.filter(particle => {
      if (!particle.parentNode) {
        return false;
      }
      
      const rect = particle.getBoundingClientRect();
      if (rect.top < -50) {
        particle.remove();
        return false;
      }
      
      return true;
    });
  }
}

// Enhanced Mouse Interaction
class MouseEffects {
  constructor() {
    this.init();
  }

  init() {
    this.addMouseTrail();
    this.addClickBurst();
  }

  addMouseTrail() {
    let mouseTrail = [];
    
    document.addEventListener('mousemove', (e) => {
      if (mouseTrail.length > 10) {
        const oldTrail = mouseTrail.shift();
        oldTrail.remove();
      }
      
      const trail = document.createElement('div');
      trail.style.cssText = `
        position: fixed;
        width: 6px;
        height: 6px;
        background: radial-gradient(circle, #ffd700, transparent);
        border-radius: 50%;
        pointer-events: none;
        z-index: 1000;
        left: ${e.clientX - 3}px;
        top: ${e.clientY - 3}px;
        animation: trailFade 1s ease-out forwards;
      `;
      
      document.body.appendChild(trail);
      mouseTrail.push(trail);
    });
  }

  addClickBurst() {
    document.addEventListener('click', (e) => {
      this.createClickBurst(e.clientX, e.clientY);
    });
  }

  createClickBurst(x, y) {
    for (let i = 0; i < 8; i++) {
      const burst = document.createElement('div');
      burst.style.cssText = `
        position: fixed;
        width: 4px;
        height: 4px;
        background: #ffd700;
        border-radius: 50%;
        pointer-events: none;
        z-index: 1000;
        left: ${x}px;
        top: ${y}px;
        animation: burstParticle 1s ease-out forwards;
      `;
      
      const angle = (i / 8) * Math.PI * 2;
      burst.style.setProperty('--dx', Math.cos(angle) * 50 + 'px');
      burst.style.setProperty('--dy', Math.sin(angle) * 50 + 'px');
      
      document.body.appendChild(burst);
      setTimeout(() => burst.remove(), 1000);
    }
  }
}

// Add mouse effects
setTimeout(() => {
  new MouseEffects();
}, 2000);

// Add floating sparkle animation to CSS
const floatingSparkleCSS = `
@keyframes floatUp {
  0% {
    opacity: 0;
    transform: translateY(0) scale(0);
  }
  10% {
    opacity: 1;
    transform: translateY(-10px) scale(1);
  }
  100% {
    opacity: 0;
    transform: translateY(-100px) scale(0);
  }
}

@keyframes rippleAnimation {
  0% {
    transform: scale(0);
    opacity: 1;
  }
  100% {
    transform: scale(4);
    opacity: 0;
  }
}
`;

// Add the CSS to the document
const styleSheet = document.createElement('style');
styleSheet.textContent = floatingSparkleCSS;
document.head.appendChild(styleSheet);

// Initialize all components when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Show loading animation
  showLoadingAnimation();
  
  setTimeout(() => {
    new ScrollAnimation();
    new SmoothScroll();
    new InteractionEnhancer();
    new ParticleSystem();
    
    // Add welcome message
    console.log('🪔 Welcome to the Festival of Lights! 🪔');
    console.log('Use arrow keys, space, or scroll to navigate through the story.');
    
    // Hide loading animation
    hideLoadingAnimation();
  }, 2000);
});

// Loading Animation
function showLoadingAnimation() {
  const loader = document.createElement('div');
  loader.id = 'diwali-loader';
  loader.innerHTML = `
    <div class="loading-diya">🪔</div>
    <div style="
      position: fixed;
      top: 60%;
      left: 50%;
      transform: translateX(-50%);
      color: #ffd700;
      font-family: 'Playfair Display', serif;
      font-size: 1.5rem;
      z-index: 9999;
      text-align: center;
    ">
      <div style="margin-bottom: 1rem;">Lighting the lamps...</div>
      <div style="font-size: 1rem; opacity: 0.8;">शुभ दीपावली</div>
    </div>
  `;
  loader.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
    z-index: 9998;
    display: flex;
    align-items: center;
    justify-content: center;
  `;
  
  document.body.appendChild(loader);
}

function hideLoadingAnimation() {
  const loader = document.getElementById('diwali-loader');
  if (loader) {
    loader.style.opacity = '0';
    loader.style.transition = 'opacity 1s ease-out';
    setTimeout(() => loader.remove(), 1000);
  }
}

// Particle System Class
class ParticleSystem {
  constructor() {
    this.particles = [];
    this.init();
  }

  init() {
    this.createParticleContainer();
    this.startParticleGeneration();
  }

  createParticleContainer() {
    this.container = document.createElement('div');
    this.container.className = 'particle-system';
    document.body.appendChild(this.container);
  }

  startParticleGeneration() {
    setInterval(() => {
      if (this.particles.length < 20) { // Limit particles for performance
        this.createParticle();
      }
    }, 1000);

    setInterval(() => {
      this.cleanupParticles();
    }, 5000);
  }

  createParticle() {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    const colors = ['#ffd700', '#ff6b35', '#f7931e', '#fff'];
    const color = colors[Math.floor(Math.random() * colors.length)];
    
    particle.style.cssText = `
      position: absolute;
      width: ${Math.random() * 6 + 2}px;
      height: ${Math.random() * 6 + 2}px;
      background: ${color};
      border-radius: 50%;
      left: ${Math.random() * 100}vw;
      animation: particleFloat ${6 + Math.random() * 4}s linear infinite;
      box-shadow: 0 0 10px ${color};
    `;
    
    this.container.appendChild(particle);
    this.particles.push(particle);
  }

  cleanupParticles() {
    this.particles = this.particles.filter(particle => {
      if (!particle.parentNode) {
        return false;
      }
      
      const rect = particle.getBoundingClientRect();
      if (rect.top < -50) {
        particle.remove();
        return false;
      }
      
      return true;
    });
  }
}

// Enhanced Mouse Interaction
class MouseEffects {
  constructor() {
    this.init();
  }

  init() {
    this.addMouseTrail();
    this.addClickBurst();
  }

  addMouseTrail() {
    let mouseTrail = [];
    
    document.addEventListener('mousemove', (e) => {
      if (mouseTrail.length > 10) {
        const oldTrail = mouseTrail.shift();
        oldTrail.remove();
      }
      
      const trail = document.createElement('div');
      trail.style.cssText = `
        position: fixed;
        width: 6px;
        height: 6px;
        background: radial-gradient(circle, #ffd700, transparent);
        border-radius: 50%;
        pointer-events: none;
        z-index: 1000;
        left: ${e.clientX - 3}px;
        top: ${e.clientY - 3}px;
        animation: trailFade 1s ease-out forwards;
      `;
      
      document.body.appendChild(trail);
      mouseTrail.push(trail);
    });
  }

  addClickBurst() {
    document.addEventListener('click', (e) => {
      this.createClickBurst(e.clientX, e.clientY);
    });
  }

  createClickBurst(x, y) {
    for (let i = 0; i < 8; i++) {
      const burst = document.createElement('div');
      burst.style.cssText = `
        position: fixed;
        width: 4px;
        height: 4px;
        background: #ffd700;
        border-radius: 50%;
        pointer-events: none;
        z-index: 1000;
        left: ${x}px;
        top: ${y}px;
        animation: burstParticle 1s ease-out forwards;
      `;
      
      const angle = (i / 8) * Math.PI * 2;
      burst.style.setProperty('--dx', Math.cos(angle) * 50 + 'px');
      burst.style.setProperty('--dy', Math.sin(angle) * 50 + 'px');
      
      document.body.appendChild(burst);
      setTimeout(() => burst.remove(), 1000);
    }
  }
}

// Add mouse effects
setTimeout(() => {
  new MouseEffects();
}, 2000);

// Add floating sparkle animation to CSS
const floatingSparkleCSS = `
@keyframes floatUp {
  0% {
    opacity: 0;
    transform: translateY(0) scale(0);
  }
  10% {
    opacity: 1;
    transform: translateY(-10px) scale(1);
  }
  100% {
    opacity: 0;
    transform: translateY(-100px) scale(0);
  }
}

@keyframes rippleAnimation {
  0% {
    transform: scale(0);
    opacity: 1;
  }
  100% {
    transform: scale(4);
    opacity: 0;
  }
}
`;

// Add the CSS to the document
const styleSheet = document.createElement('style');
styleSheet.textContent = floatingSparkleCSS;
document.head.appendChild(styleSheet);
