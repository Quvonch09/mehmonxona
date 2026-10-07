/* ===================================================================
   HotelPro — Interactive Experience & Logic Engine
   =================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initStickyHeader();
  initRoiCalculator();
  initDemoTabs();
  initRoomTiles();
  initFaqAccordion();
  initPricingToggle();
  initModalHandling();
  initContactForms();
  initSocialProofToaster();
  initMobileMenu();
});

// Format numbers with space separator (e.g. 1 000 000)
function formatNumber(num) {
  return Math.round(num).toLocaleString('ru-RU').replace(/\u00a0/g, ' ');
}

/* ===================================================================
   1. Sticky Header Scroll Detection
   =================================================================== */
function initStickyHeader() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
}

/* ===================================================================
   2. Interactive ROI / Profit Calculator (Foyda kalkulyatori)
   =================================================================== */
function initRoiCalculator() {
  const hotelsInput = document.getElementById('calc-hotels');
  const avgFeeInput = document.getElementById('calc-fee');
  const costRatioInput = document.getElementById('calc-cost');

  const hotelsVal = document.getElementById('val-hotels');
  const avgFeeVal = document.getElementById('val-fee');
  const costRatioVal = document.getElementById('val-cost');

  const resMonthlyRev = document.getElementById('res-revenue');
  const resMonthlyNet = document.getElementById('res-monthly-net');
  const resAnnualNet = document.getElementById('res-annual-net');

  if (!hotelsInput || !avgFeeInput || !costRatioInput) return;

  function calculate() {
    const hotels = parseInt(hotelsInput.value, 10);
    const fee = parseInt(avgFeeInput.value, 10);
    const costRatio = parseInt(costRatioInput.value, 10);

    const monthlyRevenue = hotels * fee;
    const monthlyNet = monthlyRevenue * (1 - costRatio / 100);
    const annualNet = monthlyNet * 12;

    hotelsVal.textContent = hotels;
    avgFeeVal.textContent = formatNumber(fee) + " so'm";
    costRatioVal.textContent = costRatio + "%";

    resMonthlyRev.textContent = formatNumber(monthlyRevenue) + " so'm";
    resMonthlyNet.textContent = formatNumber(monthlyNet) + " so'm";
    resAnnualNet.textContent = formatNumber(annualNet) + " so'm";
  }

  [hotelsInput, avgFeeInput, costRatioInput].forEach(input => {
    input.addEventListener('input', calculate);
  });

  calculate();
}

/* ===================================================================
   3. Interactive Product Demo Tabs
   =================================================================== */
function initDemoTabs() {
  const tabs = document.querySelectorAll('.demo-tab-btn');
  const panels = document.querySelectorAll('.demo-tab-panel');

  if (!tabs.length || !panels.length) return;

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const targetId = tab.getAttribute('data-tab');

      tabs.forEach(t => t.classList.remove('active'));
      panels.forEach(p => p.classList.remove('active'));

      tab.classList.add('active');
      const targetPanel = document.getElementById(targetId);
      if (targetPanel) {
        targetPanel.classList.add('active');
      }
    });
  });
}

/* ===================================================================
   4. Interactive Room Tiles (Shaxmatka Grid)
   =================================================================== */
function initRoomTiles() {
  const tiles = document.querySelectorAll('.room-tile');
  tiles.forEach(tile => {
    tile.addEventListener('click', () => {
      const roomNum = tile.querySelector('.room-tile-num')?.textContent || 'Xona';
      const guestName = tile.querySelector('.room-guest-name')?.textContent || '';
      const status = tile.querySelector('.room-status-badge')?.textContent || '';
      
      showToastNotification(`🔔 ${roomNum} ma'lumotlari: ${guestName} (${status})`);
    });
  });
}

/* ===================================================================
   5. FAQ Accordion Handling
   =================================================================== */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    if (!questionBtn) return;

    questionBtn.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');

      // Close other accordions
      faqItems.forEach(otherItem => {
        if (otherItem !== item) otherItem.classList.remove('open');
      });

      if (isOpen) {
        item.classList.remove('open');
      } else {
        item.classList.add('open');
      }
    });
  });
}

/* ===================================================================
   6. Pricing Toggle (Monthly vs Annual Discount)
   =================================================================== */
function initPricingToggle() {
  const monthlyBtn = document.getElementById('billing-monthly');
  const annualBtn = document.getElementById('billing-annual');

  const priceStart = document.getElementById('price-start');
  const pricePro = document.getElementById('price-pro');
  const priceNetwork = document.getElementById('price-network');

  const periodLabels = document.querySelectorAll('.price-period');

  if (!monthlyBtn || !annualBtn) return;

  monthlyBtn.addEventListener('click', () => {
    monthlyBtn.classList.add('active');
    annualBtn.classList.remove('active');

    if (priceStart) priceStart.textContent = "299 000 so'm";
    if (pricePro) pricePro.textContent = "599 000 so'm";
    if (priceNetwork) priceNetwork.textContent = "1 200 000 so'm";

    periodLabels.forEach(label => label.textContent = 'oyiga / mehmonxona uchun');
  });

  annualBtn.addEventListener('click', () => {
    annualBtn.classList.add('active');
    monthlyBtn.classList.remove('active');

    // 20% discount on yearly pre-payment
    if (priceStart) priceStart.textContent = "239 000 so'm";
    if (pricePro) pricePro.textContent = "479 000 so'm";
    if (priceNetwork) priceNetwork.textContent = "960 000 so'm";

    periodLabels.forEach(label => label.textContent = 'oyiga (yillik to\'lovda -20%)');
  });
}

/* ===================================================================
   7. Demo Request Modal Dialog
   =================================================================== */
function initModalHandling() {
  const modalBackdrop = document.getElementById('demo-modal');
  const openButtons = document.querySelectorAll('.open-demo-modal');
  const closeButton = document.getElementById('modal-close');

  if (!modalBackdrop) return;

  openButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      modalBackdrop.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  });

  const closeModal = () => {
    modalBackdrop.classList.remove('open');
    document.body.style.overflow = '';
  };

  if (closeButton) {
    closeButton.addEventListener('click', closeModal);
  }

  modalBackdrop.addEventListener('click', (e) => {
    if (e.target === modalBackdrop) {
      closeModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalBackdrop.classList.contains('open')) {
      closeModal();
    }
  });
}

/* ===================================================================
   8. Contact & Demo Form Submissions
   =================================================================== */
function initContactForms() {
  const forms = document.querySelectorAll('form.ajax-form');

  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const submitBtn = form.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;

      submitBtn.disabled = true;
      submitBtn.innerHTML = `
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="spin-icon">
          <circle cx="12" cy="12" r="10" stroke-opacity="0.25"></circle>
          <path d="M12 2a10 10 0 0 1 10 10"></path>
        </svg> Yuborilmoqda...
      `;

      setTimeout(() => {
        submitBtn.innerHTML = `✅ Muvaffaqiyatli qabul qilindi!`;
        submitBtn.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';
        form.reset();

        showToastNotification("🎉 Rahmat! Mutaxassisimiz 15 daqiqada siz bilan bog'lanadi.");

        // If in modal, close after 2 seconds
        const modal = form.closest('.modal-backdrop');
        if (modal) {
          setTimeout(() => {
            modal.classList.remove('open');
            document.body.style.overflow = '';
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalText;
            submitBtn.style.background = '';
          }, 1800);
        } else {
          setTimeout(() => {
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalText;
            submitBtn.style.background = '';
          }, 4000);
        }
      }, 1000);
    });
  });
}

/* ===================================================================
   9. Social Proof Toast Popups (Real-time Simulation)
   =================================================================== */
const toastEvents = [
  {
    name: "Grand Hotel Samarqand",
    action: "HotelPro tizimiga ulandi",
    time: "2 daqiqa oldin",
    img: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=120&q=80"
  },
  {
    name: "Silk Road Boutique (Buxoro)",
    action: "32 ta xonani shaxmatkaga kiritdi",
    time: "15 daqiqa oldin",
    img: "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=120&q=80"
  },
  {
    name: "Zomin Mountain Resort",
    action: "Restoran va oshxona modulini faollashtirdi",
    time: "35 daqiqa oldin",
    img: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&w=120&q=80"
  },
  {
    name: "Registan Plaza (Qarshi)",
    action: "Telegram bot hisobotlarini yoqdi",
    time: "1 soat oldin",
    img: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=120&q=80"
  }
];

function initSocialProofToaster() {
  const toast = document.getElementById('social-toast');
  if (!toast) return;

  const toastImg = document.getElementById('toast-img');
  const toastName = document.getElementById('toast-name');
  const toastAction = document.getElementById('toast-action');
  const toastClose = document.getElementById('toast-close');

  let currentIndex = 0;

  function showNextToast() {
    const item = toastEvents[currentIndex];
    if (toastImg) toastImg.src = item.img;
    if (toastName) toastName.textContent = item.name;
    if (toastAction) toastAction.textContent = `${item.action} • ${item.time}`;

    toast.classList.add('show');

    setTimeout(() => {
      toast.classList.remove('show');
    }, 5500);

    currentIndex = (currentIndex + 1) % toastEvents.length;
  }

  if (toastClose) {
    toastClose.addEventListener('click', () => {
      toast.classList.remove('show');
    });
  }

  // First trigger after 7 seconds, then every 22 seconds
  setTimeout(() => {
    showNextToast();
    setInterval(showNextToast, 22000);
  }, 7000);
}

function showToastNotification(text) {
  const toast = document.getElementById('social-toast');
  if (!toast) return;

  const toastName = document.getElementById('toast-name');
  const toastAction = document.getElementById('toast-action');

  if (toastName) toastName.textContent = "HotelPro Bildirishnoma";
  if (toastAction) toastAction.textContent = text;

  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 4500);
}

/* ===================================================================
   10. Mobile Menu Drawer
   =================================================================== */
function initMobileMenu() {
  const toggleBtn = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (!toggleBtn || !navLinks) return;

  toggleBtn.addEventListener('click', () => {
    const isVisible = navLinks.style.display === 'flex';
    if (isVisible) {
      navLinks.style.display = 'none';
    } else {
      navLinks.style.display = 'flex';
      navLinks.style.flexDirection = 'column';
      navLinks.style.position = 'absolute';
      navLinks.style.top = '80px';
      navLinks.style.left = '0';
      navLinks.style.right = '0';
      navLinks.style.background = 'rgba(10, 15, 29, 0.98)';
      navLinks.style.padding = '24px';
      navLinks.style.borderBottom = '1px solid rgba(255, 255, 255, 0.1)';
      navLinks.style.backdropFilter = 'blur(16px)';
    }
  });

  navLinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      if (window.innerWidth <= 820) {
        navLinks.style.display = 'none';
      }
    });
  });
}
