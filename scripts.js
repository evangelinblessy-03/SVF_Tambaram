/* =========================================================
   SVF ROYAL & ORCHID — COMPLETE CORRECTED SCRIPT
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* =======================================================
     1. INTRO SCREEN -> MAIN PAGE
  ======================================================= */

  const intro = document.getElementById("introScreen");
  const hub = document.getElementById("hubPage");
  const enter = document.getElementById("enterBtn");

  function showMainPage() {
    if (!intro || !hub) return;

    intro.classList.add("hide");
    hub.classList.remove("hub-hidden");
    hub.classList.add("hub-visible");

    setTimeout(() => {
      intro.style.display = "none";
    }, 950);
  }

  if (enter) {
    enter.addEventListener("click", showMainPage);
  }


  /* =======================================================
     2. GENERIC MODAL SYSTEM
  ======================================================= */

  function closeAllModals() {
    document
      .querySelectorAll(".hub-modal.open")
      .forEach(modal => modal.classList.remove("open"));
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

    if (!document.querySelector(".hub-modal.open")) {
      document.body.style.overflow = "";
    }
  }


  /* =======================================================
     3. NAVIGATION / DATA-OPEN BUTTONS
  ======================================================= */

  document.querySelectorAll("[data-open]").forEach(button => {

    button.addEventListener("click", event => {

      event.preventDefault();

      const id = button.getAttribute("data-open");

      if (id) {
        openModal(id);
      }

    });

  });


  /* =======================================================
     4. MODAL CLOSE BUTTONS
  ======================================================= */

  document.querySelectorAll(".hm-close").forEach(button => {

    button.addEventListener("click", () => {

      const modal = button.closest(".hub-modal");

      closeModal(modal);

    });

  });


  /* Close modal when clicking outside modal box */

  document.querySelectorAll(".hub-modal").forEach(modal => {

    modal.addEventListener("click", event => {

      if (event.target === modal) {
        closeModal(modal);
      }

    });

  });


  /* =======================================================
     5. ESCAPE KEY
  ======================================================= */

  document.addEventListener("keydown", event => {

    if (event.key !== "Escape") return;

    const modal = document.querySelector(".hub-modal.open");

    if (modal) {
      closeModal(modal);
    }

    if (typeof window.closeVideoModal === "function") {
      window.closeVideoModal();
    }

    closeChat();

  });


  /* =======================================================
     6. MOBILE MENU
  ======================================================= */

  const menuToggle = document.getElementById("menuToggle");
  const mainNav = document.getElementById("mainNav");

  if (menuToggle && mainNav) {

    menuToggle.addEventListener("click", () => {

      const isOpen = mainNav.classList.toggle("open");

      menuToggle.setAttribute(
        "aria-expanded",
        String(isOpen)
      );

      menuToggle.innerHTML = isOpen
        ? '<i class="fa-solid fa-xmark"></i>'
        : '<i class="fa-solid fa-bars"></i>';

    });

  }


  /* =======================================================
     7. CUSTOMER LOGIN
  ======================================================= */

  const loginForm = document.getElementById("loginCardForm");

  if (loginForm) {

    loginForm.addEventListener("submit", event => {

      event.preventDefault();

      const contact =
        document
          .getElementById("loginContact")
          ?.value
          .trim();

      const message =
        document.getElementById("cardMessage");

      if (!contact) return;

      const saved =
        JSON.parse(
          localStorage.getItem("svfCustomer") || "null"
        );

      if (
        saved &&
        saved.contact &&
        saved.contact.toLowerCase() === contact.toLowerCase()
      ) {

        if (message) {
          message.textContent =
            `Welcome, ${saved.name}.`;
        }

      } else {

        if (message) {
          message.textContent =
            "Please check your email / phone number.";
        }

      }

    });

  }


  /* =======================================================
     8. CONTACT POPUP
     IMPORTANT:
     Need Help DOES NOT open this popup.
     Only WhatsApp / Call / Email buttons open it.
  ======================================================= */

  const contactPopover =
    document.getElementById("contactPopover");

  const contactTitle =
    document.getElementById("contactTitle");

  const contactText =
    document.getElementById("contactText");

  const contactLinks =
    document.getElementById("contactLinks");

  const contactClose =
    document.getElementById("contactClose");


  function positionAndShowPopup(type, btn) {
    const page = document.getElementById("homePage");
    const btnRect = btn.getBoundingClientRect();
    const pageRect = page.getBoundingClientRect();
    // Position popup to the left of the button, vertically centered
    const topRelative = btnRect.top - pageRect.top + (btnRect.height / 2) - 60;
    contactPopover.style.top = topRelative + "px";
    contactPopover.style.bottom = "auto";
    showContactPopup(type);
  }

  function showContactPopup(type) {

    if (!contactPopover || !contactLinks) return;

    const contactData = {

      whatsapp: {
        title: "WhatsApp SVF Homes",

        text:
          "Chat with the SVF Homes team for project enquiries.",

        links:
          '<a href="https://wa.me/919444892265" target="_blank" rel="noopener noreferrer">' +
          '<i class="fa-brands fa-whatsapp"></i> Open WhatsApp</a>' +

          '<a href="tel:+919444892265">' +
          '<i class="fa-solid fa-phone"></i> +91 94448 92265</a>'
      },

      call: {
        title: "Call SVF Homes",

        text:
          "Speak directly with the property team.",

        links:
          '<a href="tel:+919444892265">' +
          '<i class="fa-solid fa-phone"></i> +91 94448 92265</a>' +

          '<a href="tel:+917358528262">' +
          '<i class="fa-solid fa-phone"></i> +91 73585 28262</a>'
      },

      email: {
        title: "Email SVF Homes",

        text:
          "Send your enquiry to the SVF Homes team.",

        links:
          '<a href="mailto:svfhomes@gmail.com">' +
          '<i class="fa-solid fa-envelope"></i> svfhomes@gmail.com</a>'
      }

    }[type];


    if (!contactData) return;


    contactTitle.textContent =
      contactData.title;

    contactText.textContent =
      contactData.text;

    contactLinks.innerHTML =
      contactData.links;

    contactPopover.classList.add("open");

    contactPopover.setAttribute(
      "aria-hidden",
      "false"
    );

  }


  function closeContactPopup() {

    if (!contactPopover) return;

    contactPopover.classList.remove("open");

    contactPopover.setAttribute(
      "aria-hidden",
      "true"
    );

  }


  /* WhatsApp button */

  document
    .getElementById("waBtn")
    ?.addEventListener("click", event => {

      event.stopPropagation();

      closeChat();

      positionAndShowPopup("whatsapp", event.currentTarget);

    });


  /* Call button */

  document
    .getElementById("callBtn")
    ?.addEventListener("click", event => {

      event.stopPropagation();

      closeChat();

      positionAndShowPopup("call", event.currentTarget);

    });


  /* Email button */

  document
    .getElementById("mailBtn")
    ?.addEventListener("click", event => {

      event.stopPropagation();

      closeChat();

      positionAndShowPopup("email", event.currentTarget);

    });


  /* Prevent popup clicks from bubbling */

  contactPopover?.addEventListener(
    "click",
    event => event.stopPropagation()
  );


  /* Close popup */

  contactClose?.addEventListener(
    "click",
    closeContactPopup
  );


  /* Close contact popup when clicking elsewhere */

  document.addEventListener("click", event => {

    if (
      contactPopover &&
      !contactPopover.contains(event.target)
    ) {

      closeContactPopup();

    }

  });


  /* =======================================================
     9. ENQUIRE NOW
  ======================================================= */

  const enquire =
    document.getElementById("enquireBtn");

  if (enquire) {

    enquire.addEventListener("click", event => {

      event.preventDefault();
      event.stopPropagation();

      openModal("enquiryModal");

    });

  }


  /* =======================================================
     10. LEFT PROJECT INFORMATION POPUP
  ======================================================= */

  const sqTrigger =
    document.getElementById("sqTrigger");

  const sqPanel =
    document.getElementById("sqPanel");

  const sqClose =
    document.getElementById("sqClose");


  function openInfoCorner() {

    if (!sqPanel) return;

    sqPanel.classList.add("open");

    sqPanel.setAttribute(
      "aria-hidden",
      "false"
    );

  }


  function closeInfoCorner() {

    if (!sqPanel) return;

    sqPanel.classList.remove("open");

    sqPanel.setAttribute(
      "aria-hidden",
      "true"
    );

  }


  sqTrigger?.addEventListener(
    "click",
    event => {

      event.preventDefault();
      event.stopPropagation();

      if (
        sqPanel?.classList.contains("open")
      ) {

        closeInfoCorner();

      } else {

        openInfoCorner();

      }

    }
  );


  sqClose?.addEventListener(
    "click",
    event => {

      event.preventDefault();
      event.stopPropagation();

      closeInfoCorner();

    }
  );


  sqPanel?.addEventListener(
    "click",
    event => event.stopPropagation()
  );


  document.addEventListener("click", event => {

    if (
      sqPanel &&
      !sqPanel.contains(event.target) &&
      !sqTrigger?.contains(event.target)
    ) {

      closeInfoCorner();

    }

  });


  /* =======================================================
     11. IMAGE ZOOM
  ======================================================= */

  const imgModal =
    document.getElementById("imgModal");

  const modalImg =
    document.getElementById("modalImg");

  const closeImg =
    document.getElementById("closeBtn");

  let zoomed = false;


  function showImage(src) {

    if (!imgModal || !modalImg) return;

    modalImg.src = src;

    imgModal.classList.add("active");

    zoomed = false;

    modalImg.style.transform =
      "scale(1)";

    modalImg.style.cursor =
      "zoom-in";

  }


  document
    .querySelectorAll(".floorPlanImg, .zoomable")
    .forEach(image => {

      image.addEventListener(
        "click",
        () => showImage(image.src)
      );

    });


  closeImg?.addEventListener(
    "click",
    () => {

      imgModal?.classList.remove("active");

      if (modalImg) {
        modalImg.src = "";
      }

    }
  );


  imgModal?.addEventListener(
    "click",
    event => {

      if (event.target === imgModal) {

        imgModal.classList.remove("active");

        if (modalImg) {
          modalImg.src = "";
        }

      }

    }
  );


  modalImg?.addEventListener(
    "click",
    () => {

      zoomed = !zoomed;

      modalImg.style.transform =
        zoomed
          ? "scale(2)"
          : "scale(1)";

      modalImg.style.cursor =
        zoomed
          ? "zoom-out"
          : "zoom-in";

    }
  );


  /* =======================================================
     12. VIDEO MODAL
  ======================================================= */

  const videoModal =
    document.getElementById("videoModal");

  const modalVideo =
    document.getElementById("modalVideo");

  const videoClose =
    document.getElementById("videoModalClose");


  window.closeVideoModal =
    function () {

      if (
        !videoModal ||
        !videoModal.classList.contains("active")
      ) {
        return;
      }

      videoModal.classList.remove("active");

      if (modalVideo) {

        modalVideo.pause();

        modalVideo.src = "";

      }

      if (
        !document.querySelector(".hub-modal.open")
      ) {

        document.body.style.overflow = "";

      }

    };


  document
    .querySelectorAll(".open-video-modal")
    .forEach(link => {

      link.addEventListener(
        "click",
        event => {

          event.preventDefault();

          if (!videoModal || !modalVideo) {
            return;
          }

          const videoPath =
            link.getAttribute("data-video");

          modalVideo.src = videoPath;

          videoModal.classList.add("active");

          document.body.style.overflow =
            "hidden";

          modalVideo.play().catch(() => {});

        }
      );

    });


  videoClose?.addEventListener(
    "click",
    window.closeVideoModal
  );


  videoModal?.addEventListener(
    "click",
    event => {

      if (event.target === videoModal) {
        window.closeVideoModal();
      }

    }
  );


  /* =======================================================
     13. HERO 3D MOUSE PARALLAX
  ======================================================= */

  const bg =
    document.getElementById("heroBg");

  const bgImg =
    bg?.querySelector("img");


  if (
    bg &&
    bgImg &&
    window.matchMedia("(pointer:fine)").matches
  ) {

    let tx = 0;
    let ty = 0;

    let cx = 0;
    let cy = 0;


    bg.addEventListener(
      "mousemove",
      event => {

        tx =
          (event.clientX / window.innerWidth - 0.5) *
          12;

        ty =
          (event.clientY / window.innerHeight - 0.5) *
          7;

      }
    );


    bg.addEventListener(
      "mouseleave",
      () => {

        tx = 0;
        ty = 0;

      }
    );


    function animateHero() {

      cx += (tx - cx) * 0.045;
      cy += (ty - cy) * 0.045;


      bgImg.style.transform =
        `scale(1.065) translate3d(${cx}px,${cy}px,0) rotateX(${-cy * 0.03}deg) rotateY(${cx * 0.03}deg)`;


      requestAnimationFrame(animateHero);

    }


    requestAnimationFrame(
      animateHero
    );

  }


  /* =======================================================
     14. CHATBOT
     IMPORTANT:
     Need Help opens ONLY chatbot.
     It does NOT open WhatsApp.
  ======================================================= */

  const help =
    document.getElementById("helpCard");

  const chat =
    document.getElementById("chatbotPanel");

  const chatClose =
    document.getElementById("chatbotClose");

  const chatForm =
    document.getElementById("chatbotForm");

  const chatInput =
    document.getElementById("chatbotInput");

  const messages =
    document.getElementById("chatbotMessages");


  function openChat() {

    if (!chat) return;


    /* Close WhatsApp / contact popup first */

    closeContactPopup();


    /* Open chatbot */

    chat.classList.add("open");

    chat.setAttribute(
      "aria-hidden",
      "false"
    );


    /* Hide Need Help button */

    if (help) {

      help.style.setProperty(
        "display",
        "none",
        "important"
      );

    }


    /* Focus input */

    if (chatInput) {

      setTimeout(
        () => chatInput.focus(),
        180
      );

    }

  }


  function closeChat() {

    if (!chat) return;


    /* Close chatbot */

    chat.classList.remove("open");

    chat.setAttribute(
      "aria-hidden",
      "true"
    );


    /* Bring Need Help button back */

    if (help) {

      help.style.setProperty(
        "display",
        "flex",
        "important"
      );

    }

  }


  /* =======================================================
     NEED HELP -> ONLY CHATBOT
  ======================================================= */

  help?.addEventListener(
    "click",
    event => {

      event.preventDefault();
      event.stopPropagation();

      /* IMPORTANT:
         Do NOT call showContactPopup("whatsapp")
      */

      openChat();

    }
  );


  /* =======================================================
     CHATBOT CLOSE BUTTON
  ======================================================= */

  chatClose?.addEventListener(
    "click",
    event => {

      event.preventDefault();
      event.stopPropagation();

      closeChat();

    }
  );


  /* Keep chatbot clicks inside chatbot */

  chat?.addEventListener(
    "click",
    event => event.stopPropagation()
  );


  /* =======================================================
     CHATBOT QUICK RESPONSES
  ======================================================= */

  const responses = {

    pricing:
      "For current pricing and available units, please contact our SVF Homes team on +91 94448 92265.",

    visit:
      "You can request a site visit through the Enquire Now form. Our team will contact you to confirm the time.",

    location:
      "The project is in Tambaram, Chennai. Open the Location section for the map and nearby places.",

    enquiry:
      "Please use the Enquire Now button and submit your name, phone number and requirement."

  };


  function addMessage(text, type) {

    if (!messages) return;


    const message =
      document.createElement("div");


    message.className =
      `chat-msg ${type}`;


    message.textContent =
      text;


    messages.appendChild(message);


    messages.scrollTop =
      messages.scrollHeight;

  }


  document
    .querySelectorAll("[data-chat]")
    .forEach(button => {

      button.addEventListener(
        "click",
        () => {

          const key =
            button.getAttribute("data-chat");


          addMessage(
            button.textContent,
            "user"
          );


          setTimeout(
            () => {

              addMessage(
                responses[key] ||
                responses.enquiry,
                "bot"
              );

            },
            220
          );

        }
      );

    });


  /* =======================================================
     CHATBOT TEXT INPUT
  ======================================================= */

  chatForm?.addEventListener(
    "submit",
    event => {

      event.preventDefault();


      const value =
        (chatInput?.value || "").trim();


      if (!value) return;


      addMessage(
        value,
        "user"
      );


      chatInput.value = "";


      setTimeout(
        () => {

          addMessage(
            "Thank you. Our team can help with this enquiry. Please use Enquire Now or call +91 94448 92265.",
            "bot"
          );

        },
        280
      );

    }
  );


  /* =======================================================
     CLICK OUTSIDE CHATBOT
  ======================================================= */

  document.addEventListener(
    "click",
    event => {

      if (
        chat &&
        chat.classList.contains("open") &&
        !chat.contains(event.target) &&
        !help?.contains(event.target)
      ) {

        closeChat();

      }

    }
  );


  /* =======================================================
     INITIAL STATE
  ======================================================= */

  /*
     Make sure chatbot starts closed
     and Need Help starts visible.
  */

  if (chat) {

    chat.classList.remove("open");

    chat.setAttribute(
      "aria-hidden",
      "true"
    );

  }


  if (help) {

    help.style.setProperty(
      "display",
      "flex",
      "important"
    );

  }

});

/* ── Bottom bar project links — force modal open ── */
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".svf-project-link[data-open]").forEach(link => {
    link.addEventListener("click", function(e) {
      e.preventDefault();
      e.stopPropagation();
      const id = this.getAttribute("data-open");
      const modal = document.getElementById(id);
      if (modal) {
        document.querySelectorAll(".hub-modal.open").forEach(m => m.classList.remove("open"));
        modal.classList.add("open");
        document.body.style.overflow = "hidden";
      }
    });
  });
});
