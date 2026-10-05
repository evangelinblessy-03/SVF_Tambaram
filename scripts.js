/* =========================================================
   SVF ROYAL & ORCHID — merged interaction controller
   ========================================================= */
document.addEventListener("DOMContentLoaded", () => {
  const intro = document.getElementById("introScreen");
  const hub = document.getElementById("hubPage");
  const enter = document.getElementById("enterBtn");

  // 1. First page -> main page
  function showMainPage() {
    if (!intro || !hub) return;
    intro.classList.add("hide");
    hub.classList.remove("hub-hidden");
    hub.classList.add("hub-visible");
    setTimeout(() => { intro.style.display = "none"; }, 950);
  }
  if (enter) enter.addEventListener("click", showMainPage);

  // 2. Generic popup system
  function closeAllModals() {
    document.querySelectorAll(".hub-modal.open").forEach(m => m.classList.remove("open"));
  }
  function openModal(id) {
    const modal = document.getElementById(id);
    if (!modal) return;
    closeAllModals();
    modal.classList.add("open");
    document.body.style.overflow = "hidden";
  }
  function closeModal(modal) {
    if (!modal) return;
    modal.classList.remove("open");
    if (!document.querySelector(".hub-modal.open")) document.body.style.overflow = "";
  }

  // Any top navigation / Explore Property button with data-open opens its popup.
  document.querySelectorAll("[data-open]").forEach(btn => {
    btn.addEventListener("click", e => {
      e.preventDefault();
      const id = btn.getAttribute("data-open");
      if (id) openModal(id);
    });
  });

  // Close buttons + backdrop + Escape
  document.querySelectorAll(".hm-close").forEach(btn => {
    btn.addEventListener("click", () => closeModal(btn.closest(".hub-modal")));
  });
  document.querySelectorAll(".hub-modal").forEach(modal => {
    modal.addEventListener("click", e => {
      if (e.target === modal) closeModal(modal);
    });
  });
  document.addEventListener("keydown", e => {
    if (e.key === "Escape") {
      const modal = document.querySelector(".hub-modal.open");
      if (modal) closeModal(modal);
      closeVideoModal();
    }
  });

  // 3. Mobile top navigation
  const menuToggle = document.getElementById("menuToggle");
  const mainNav = document.getElementById("mainNav");
  if (menuToggle && mainNav) {
    menuToggle.addEventListener("click", () => {
      const open = mainNav.classList.toggle("open");
      menuToggle.setAttribute("aria-expanded", String(open));
      menuToggle.innerHTML = open
        ? '<i class="fa-solid fa-xmark"></i>'
        : '<i class="fa-solid fa-bars"></i>';
    });
  }

  // 4. Simple passwordless customer login
  const loginForm = document.getElementById("loginCardForm");
  if (loginForm) {
    loginForm.addEventListener("submit", e => {
      e.preventDefault();
      const contact = document.getElementById("loginContact")?.value.trim();
      const msg = document.getElementById("cardMessage");
      if (!contact) return;
      const saved = JSON.parse(localStorage.getItem("svfCustomer") || "null");
      if (saved && saved.contact && saved.contact.toLowerCase() === contact.toLowerCase()) {
        if (msg) msg.textContent = `Welcome, ${saved.name}.`;
      } else {
        if (msg) msg.textContent = "Please check your email / phone number.";
      }
    });
  }

  // 5. Floating contact icons + bottom-left property shortcut
  const contactPopover = document.getElementById("contactPopover");
  const contactTitle = document.getElementById("contactTitle");
  const contactText = document.getElementById("contactText");
  const contactLinks = document.getElementById("contactLinks");
  const contactClose = document.getElementById("contactClose");

  function showContactPopup(type) {
    if (!contactPopover || !contactLinks) return;
    const data = {
      whatsapp: {
        title: "WhatsApp SVF Homes",
        text: "Chat with the SVF Homes team for project enquiries.",
        links: '<a href="https://wa.me/919444892265" target="_blank" rel="noopener"><i class="fa-brands fa-whatsapp"></i> Open WhatsApp</a><a href="tel:+919444892265"><i class="fa-solid fa-phone"></i> +91 94448 92265</a>'
      },
      call: {
        title: "Call SVF Homes",
        text: "Speak directly with the property team.",
        links: '<a href="tel:+919444892265"><i class="fa-solid fa-phone"></i> +91 94448 92265</a><a href="tel:+917358528262"><i class="fa-solid fa-phone"></i> +91 73585 28262</a>'
      },
      email: {
        title: "Email SVF Homes",
        text: "Send your enquiry to the SVF Homes team.",
        links: '<a href="mailto:svfhomes@gmail.com"><i class="fa-solid fa-envelope"></i> svfhomes@gmail.com</a>'
      }
    }[type];
    if (!data) return;
    contactTitle.textContent = data.title;
    contactText.textContent = data.text;
    contactLinks.innerHTML = data.links;
    contactPopover.classList.add("open");
    contactPopover.setAttribute("aria-hidden", "false");
  }

  function closeContactPopup() {
    if (!contactPopover) return;
    contactPopover.classList.remove("open");
    contactPopover.setAttribute("aria-hidden", "true");
  }

  document.getElementById("waBtn")?.addEventListener("click", e => {
    e.stopPropagation(); showContactPopup("whatsapp");
  });
  document.getElementById("callBtn")?.addEventListener("click", e => {
    e.stopPropagation(); showContactPopup("call");
  });
  document.getElementById("mailBtn")?.addEventListener("click", e => {
    e.stopPropagation(); showContactPopup("email");
  });
  contactPopover?.addEventListener("click", e => e.stopPropagation());
  contactClose?.addEventListener("click", closeContactPopup);

  document.addEventListener("click", e => {
    if (!contactPopover?.contains(e.target)) closeContactPopup();
  });

  const helpCard = document.getElementById("helpCard");
  helpCard?.addEventListener("click", e => {
    e.stopPropagation();
    showContactPopup("whatsapp");
  });


  // 6. Enquiry popup — hero button opens the enquiry form, not the login page.
  const enquire = document.getElementById("enquireBtn");
  if (enquire) {
    enquire.addEventListener("click", e => {
      e.preventDefault();
      e.stopPropagation();
      openModal("enquiryModal");
    });
  }

  // 6b. Left-side project information popup.
  const sqTrigger = document.getElementById("sqTrigger");
  const sqPanel = document.getElementById("sqPanel");
  const sqClose = document.getElementById("sqClose");

  function openInfoCorner() {
    if (!sqPanel) return;
    sqPanel.classList.add("open");
    sqPanel.setAttribute("aria-hidden", "false");
  }
  function closeInfoCorner() {
    if (!sqPanel) return;
    sqPanel.classList.remove("open");
    sqPanel.setAttribute("aria-hidden", "true");
  }
  sqTrigger?.addEventListener("click", e => {
    e.preventDefault();
    e.stopPropagation();
    sqPanel?.classList.contains("open") ? closeInfoCorner() : openInfoCorner();
  });
  sqClose?.addEventListener("click", e => {
    e.preventDefault();
    e.stopPropagation();
    closeInfoCorner();
  });
  sqPanel?.addEventListener("click", e => e.stopPropagation());
  document.addEventListener("click", e => {
    if (sqPanel && !sqPanel.contains(e.target) && !sqTrigger?.contains(e.target)) closeInfoCorner();
  });

  // 7. Image zoom
  const imgModal = document.getElementById("imgModal");
  const modalImg = document.getElementById("modalImg");
  const closeImg = document.getElementById("closeBtn");
  let zoomed = false;
  function showImage(src) {
    if (!imgModal || !modalImg) return;
    modalImg.src = src;
    imgModal.classList.add("active");
    zoomed = false;
    modalImg.style.transform = "scale(1)";
    modalImg.style.cursor = "zoom-in";
  }
  document.querySelectorAll(".floorPlanImg, .zoomable").forEach(img => {
    img.addEventListener("click", () => showImage(img.src));
  });
  if (closeImg) closeImg.addEventListener("click", () => {
    imgModal.classList.remove("active"); modalImg.src = "";
  });
  if (imgModal) imgModal.addEventListener("click", e => {
    if (e.target === imgModal) { imgModal.classList.remove("active"); modalImg.src = ""; }
  });
  if (modalImg) modalImg.addEventListener("click", () => {
    zoomed = !zoomed;
    modalImg.style.transform = zoomed ? "scale(2)" : "scale(1)";
    modalImg.style.cursor = zoomed ? "zoom-out" : "zoom-in";
  });

  // 8. Video modal
  const videoModal = document.getElementById("videoModal");
  const modalVideo = document.getElementById("modalVideo");
  const videoClose = document.getElementById("videoModalClose");
  window.closeVideoModal = function() {
    if (!videoModal || !videoModal.classList.contains("active")) return;
    videoModal.classList.remove("active");
    if (modalVideo) { modalVideo.pause(); modalVideo.src = ""; }
    if (!document.querySelector(".hub-modal.open")) document.body.style.overflow = "";
  };
  document.querySelectorAll(".open-video-modal").forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      if (!videoModal || !modalVideo) return;
      modalVideo.src = link.getAttribute("data-video");
      videoModal.classList.add("active");
      document.body.style.overflow = "hidden";
      modalVideo.play().catch(() => {});
    });
  });
  if (videoClose) videoClose.addEventListener("click", window.closeVideoModal);
  if (videoModal) videoModal.addEventListener("click", e => {
    if (e.target === videoModal) window.closeVideoModal();
  });

  // 9. Hero 3D mouse parallax
  const bg = document.getElementById("heroBg");
  const bgImg = bg ? bg.querySelector("img") : null;
  if (bg && bgImg && window.matchMedia("(pointer:fine)").matches) {
    let tx=0, ty=0, cx=0, cy=0;
    bg.addEventListener("mousemove", e => {
      tx=(e.clientX/window.innerWidth-.5)*12;
      ty=(e.clientY/window.innerHeight-.5)*7;
    });
    bg.addEventListener("mouseleave", () => { tx=0; ty=0; });
    function animate() {
      cx += (tx-cx)*.045; cy += (ty-cy)*.045;
      bgImg.style.transform =
        `scale(1.065) translate3d(${cx}px,${cy}px,0) rotateX(${-cy*.03}deg) rotateY(${cx*.03}deg)`;
      requestAnimationFrame(animate);
    }
    requestAnimationFrame(animate);
  }
});

/* =========================================================
   FINAL REQUEST: CHATBOT + LOCATION + INFO POSITION
========================================================= */
(function initFinalInteractions(){
  const help = document.getElementById('helpCard');
  const chat = document.getElementById('chatbotPanel');
  const chatClose = document.getElementById('chatbotClose');
  const chatForm = document.getElementById('chatbotForm');
  const chatInput = document.getElementById('chatbotInput');
  const messages = document.getElementById('chatbotMessages');

  function openChat(){
    if(!chat) return;
    chat.classList.add('open');
    chat.setAttribute('aria-hidden','false');
    if(chatInput) setTimeout(()=>chatInput.focus(),180);
  }
  function closeChat(){
    if(!chat) return;
    chat.classList.remove('open');
    chat.setAttribute('aria-hidden','true');
  }
  help?.addEventListener('click', e=>{e.preventDefault();e.stopPropagation();openChat();});
  chatClose?.addEventListener('click', e=>{e.preventDefault();closeChat();});
  chat?.addEventListener('click', e=>e.stopPropagation());

  const responses = {
    pricing:'For current pricing and available units, please contact our SVF Homes team on +91 94448 92265.',
    visit:'You can request a site visit through the Enquire Now form. Our team will contact you to confirm the time.',
    location:'The project is in Tambaram, Chennai. Open the Location section for the map and nearby places.',
    enquiry:'Please use the Enquire Now button and submit your name, phone number and requirement.'
  };
  function addMessage(text, type){
    if(!messages) return;
    const el=document.createElement('div'); el.className='chat-msg '+type; el.textContent=text;
    messages.appendChild(el); messages.scrollTop=messages.scrollHeight;
  }
  document.querySelectorAll('[data-chat]').forEach(btn=>btn.addEventListener('click',()=>{
    const key=btn.getAttribute('data-chat');
    addMessage(btn.textContent,'user');
    setTimeout(()=>addMessage(responses[key]||responses.enquiry,'bot'),220);
  }));
  chatForm?.addEventListener('submit',e=>{
    e.preventDefault();
    const value=(chatInput?.value||'').trim(); if(!value) return;
    addMessage(value,'user'); chatInput.value='';
    setTimeout(()=>addMessage('Thank you. Our team can help with this enquiry. Please use Enquire Now or call +91 94448 92265.','bot'),280);
  });
  document.addEventListener('click',e=>{
    if(chat?.classList.contains('open') && !chat.contains(e.target) && !help?.contains(e.target)) closeChat();
  });
})();
