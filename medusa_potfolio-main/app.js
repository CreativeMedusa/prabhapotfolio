/* ==========================================================================
   PRABHA SHARMA - RETRO DIGITAL PAINTING PORTFOLIO & RESUME LOGIC
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // Elements
  const btnPortfolio = document.getElementById('btn-portfolio-view');
  const btnResume = document.getElementById('btn-resume-view');
  const portfolioSection = document.getElementById('retro-portfolio-view');
  const resumeSection = document.getElementById('exact-resume-view');
  const printBtn = document.getElementById('print-resume-btn');
  const toast = document.getElementById('toast');
  const toastMsg = document.getElementById('toast-message');

  // --- View Switcher Functionality ---
  function showPortfolioView() {
    if (portfolioSection) portfolioSection.style.display = 'block';
    if (resumeSection) resumeSection.style.display = 'none';
    if (btnPortfolio) {
      btnPortfolio.classList.add('active');
      btnPortfolio.setAttribute('aria-selected', 'true');
    }
    if (btnResume) {
      btnResume.classList.remove('active');
      btnResume.setAttribute('aria-selected', 'false');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function showResumeView() {
    if (portfolioSection) portfolioSection.style.display = 'none';
    if (resumeSection) resumeSection.style.display = 'block';
    if (btnResume) {
      btnResume.classList.add('active');
      btnResume.setAttribute('aria-selected', 'true');
    }
    if (btnPortfolio) {
      btnPortfolio.classList.remove('active');
      btnPortfolio.setAttribute('aria-selected', 'false');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  if (btnPortfolio && btnResume) {
    btnPortfolio.addEventListener('click', showPortfolioView);
    btnResume.addEventListener('click', showResumeView);
  }

  // --- Print / Save PDF Trigger ---
  if (printBtn) {
    printBtn.addEventListener('click', () => {
      window.print();
    });
  }

  // --- Toast Notification Helper ---
  let toastTimer = null;
  function showToast(message) {
    if (!toast || !toastMsg) return;
    toastMsg.textContent = message;
    toast.classList.add('show');
    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.remove('show');
    }, 3000);
  }

  // --- Clipboard Copy Handlers ---
  document.querySelectorAll('.copy-email-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const email = btn.getAttribute('data-email') || 'medusagaming522.3@gmail.com';
      navigator.clipboard.writeText(email).then(() => {
        showToast(`Email copied: ${email}`);
      }).catch(() => {
        showToast(`Email: ${email}`);
      });
    });
  });

  // --- Interactive Lightbox Modal for Project Works ---
  const workItems = document.querySelectorAll('[data-lightbox]');
  
  const modal = document.createElement('div');
  modal.id = 'retro-artwork-modal';
  modal.style.cssText = `
    position: fixed;
    inset: 0;
    background: rgba(26, 28, 34, 0.92);
    backdrop-filter: blur(12px);
    z-index: 10000;
    display: none;
    align-items: center;
    justify-content: center;
    padding: 24px;
    cursor: zoom-out;
  `;
  
  const modalContent = document.createElement('div');
  modalContent.style.cssText = `
    position: relative;
    max-width: 90vw;
    max-height: 90vh;
    display: flex;
    flex-direction: column;
    align-items: center;
  `;
  
  const modalImg = document.createElement('img');
  modalImg.style.cssText = `
    max-width: 100%;
    max-height: 80vh;
    border-radius: 12px;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.8);
    border: 2px solid #ffffff;
    object-fit: contain;
    background: #ffffff;
  `;

  const modalTitle = document.createElement('div');
  modalTitle.style.cssText = `
    margin-top: 16px;
    font-family: 'Cinzel', serif;
    color: #f7f4ed;
    font-size: 1.15rem;
    letter-spacing: 1px;
    text-align: center;
  `;

  const closeBtn = document.createElement('button');
  closeBtn.innerHTML = '&times;';
  closeBtn.style.cssText = `
    position: absolute;
    top: -45px;
    right: 0;
    background: none;
    border: none;
    color: #ffffff;
    font-size: 2.4rem;
    cursor: pointer;
    line-height: 1;
  `;

  modalContent.appendChild(closeBtn);
  modalContent.appendChild(modalImg);
  modalContent.appendChild(modalTitle);
  modal.appendChild(modalContent);
  document.body.appendChild(modal);

  workItems.forEach(item => {
    item.addEventListener('click', () => {
      const src = item.getAttribute('data-lightbox');
      const title = item.getAttribute('data-title');
      if (src) {
        modalImg.src = src;
        modalTitle.textContent = title || '';
        modal.style.display = 'flex';
      }
    });
  });

  modal.addEventListener('click', (e) => {
    if (e.target !== modalImg) {
      modal.style.display = 'none';
    }
  });

  closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.style.display === 'flex') {
      modal.style.display = 'none';
    }
  });
});
