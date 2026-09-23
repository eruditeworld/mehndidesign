/* ===================================================================
   MANISH MEHNDI ARTIST — SCRIPT
   Vanilla JS only. No dependencies.
=================================================================== */
(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------------- Sticky header + active section ---------------- */
  var header = document.querySelector(".site-header");
  var sections = document.querySelectorAll("main section[id]");
  var navLinks = document.querySelectorAll(".main-nav a, .mobile-nav-links a");

  function onScroll() {
    if (header) {
      header.classList.toggle("scrolled", window.scrollY > 24);
    }
    toggleBackToTop();
    updateActiveNav();
  }

  function updateActiveNav() {
    var scrollPos = window.scrollY + 140;
    var current = null;
    sections.forEach(function (sec) {
      if (sec.offsetTop <= scrollPos) current = sec.id;
    });
    navLinks.forEach(function (link) {
      var href = link.getAttribute("href") || "";
      link.classList.toggle("active", current && href === "#" + current);
    });
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------------- Mobile menu ---------------- */
  var hamburger = document.querySelector(".hamburger");
  var mobileNav = document.querySelector(".mobile-nav");
  var mobileNavClose = document.querySelector(".mobile-nav-close");

  function openMobileNav() {
    mobileNav.classList.add("open");
    hamburger.setAttribute("aria-expanded", "true");
    document.body.style.overflow = "hidden";
  }
  function closeMobileNav() {
    mobileNav.classList.remove("open");
    hamburger.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
  }
  if (hamburger && mobileNav) {
    hamburger.addEventListener("click", function () {
      var isOpen = mobileNav.classList.contains("open");
      if (isOpen) { closeMobileNav(); } else { openMobileNav(); }
    });
  }
  if (mobileNavClose) mobileNavClose.addEventListener("click", closeMobileNav);
  document.querySelectorAll(".mobile-nav-links a").forEach(function (a) {
    a.addEventListener("click", closeMobileNav);
  });

  /* ---------------- Smooth scroll for in-page anchors ---------------- */
  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener("click", function (e) {
      var id = link.getAttribute("href");
      if (id.length < 2) return;
      var target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      var headerH = header ? header.offsetHeight : 0;
      var top = target.getBoundingClientRect().top + window.scrollY - headerH + 1;
      window.scrollTo({ top: top, behavior: reduceMotion ? "auto" : "smooth" });
    });
  });

  /* ---------------- Scroll reveal ---------------- */
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && !reduceMotion) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
    );
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("is-visible"); });
  }

  /* ---------------- Gallery filter ---------------- */
  var filterBtns = document.querySelectorAll(".filter-btn");
  var galleryItems = document.querySelectorAll(".gallery-item");
  filterBtns.forEach(function (btn) {
    btn.addEventListener("click", function () {
      filterBtns.forEach(function (b) { b.classList.remove("active"); });
      btn.classList.add("active");
      var cat = btn.getAttribute("data-filter");
      galleryItems.forEach(function (item) {
        var match = cat === "all" || item.getAttribute("data-category") === cat;
        item.classList.toggle("hidden", !match);
      });
    });
  });

  /* ---------------- Lightbox ---------------- */
  var lightbox = document.querySelector(".lightbox");
  var lightboxImg = lightbox ? lightbox.querySelector("img") : null;
  var lightboxClose = lightbox ? lightbox.querySelector(".lightbox-close") : null;
  var lightboxPrev = lightbox ? lightbox.querySelector(".lightbox-prev") : null;
  var lightboxNext = lightbox ? lightbox.querySelector(".lightbox-next") : null;
  var galleryList = Array.prototype.slice.call(galleryItems);
  var currentIndex = 0;

  function visibleGalleryList() {
    return galleryList.filter(function (item) { return !item.classList.contains("hidden"); });
  }

  function openLightbox(index) {
    var list = visibleGalleryList();
    if (!list.length) return;
    currentIndex = index;
    var img = list[currentIndex].querySelector("img");
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    lightbox.classList.add("open");
    document.body.style.overflow = "hidden";
  }
  function closeLightbox() {
    lightbox.classList.remove("open");
    document.body.style.overflow = "";
  }
  function showRelative(delta) {
    var list = visibleGalleryList();
    if (!list.length) return;
    currentIndex = (currentIndex + delta + list.length) % list.length;
    var img = list[currentIndex].querySelector("img");
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
  }

  galleryItems.forEach(function (item, idx) {
    item.addEventListener("click", function () {
      var list = visibleGalleryList();
      var visIdx = list.indexOf(item);
      openLightbox(visIdx >= 0 ? visIdx : 0);
    });
  });
  if (lightboxClose) lightboxClose.addEventListener("click", closeLightbox);
  if (lightboxPrev) lightboxPrev.addEventListener("click", function () { showRelative(-1); });
  if (lightboxNext) lightboxNext.addEventListener("click", function () { showRelative(1); });
  if (lightbox) {
    lightbox.addEventListener("click", function (e) {
      if (e.target === lightbox) closeLightbox();
    });
  }
  document.addEventListener("keydown", function (e) {
    if (!lightbox || !lightbox.classList.contains("open")) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowLeft") showRelative(-1);
    if (e.key === "ArrowRight") showRelative(1);
  });

  /* ---------------- Video modal ---------------- */
  var videoModal = document.querySelector(".video-modal");
  var videoModalVideo = videoModal ? videoModal.querySelector("video") : null;
  var videoModalSource = videoModalVideo ? videoModalVideo.querySelector("source") : null;
  var videoModalTitle = videoModal ? videoModal.querySelector(".video-modal-head h3") : null;
  var videoModalClose = videoModal ? videoModal.querySelector(".video-modal-close") : null;
  var videoModalNote = videoModal ? videoModal.querySelector(".video-fallback-note") : null;

  document.querySelectorAll(".video-trigger").forEach(function (trigger) {
    trigger.addEventListener("click", function () {
      var card = trigger.closest(".video-card");
      var src = card.getAttribute("data-video-src");
      var poster = card.getAttribute("data-video-poster");
      var title = card.getAttribute("data-video-title");
      if (videoModalSource) videoModalSource.setAttribute("src", src);
      if (videoModalVideo) {
        videoModalVideo.setAttribute("poster", poster);
        videoModalVideo.load();
      }
      if (videoModalTitle) videoModalTitle.textContent = title;
      if (videoModal) {
        videoModal.classList.add("open");
        document.body.style.overflow = "hidden";
      }
    });
  });

  function closeVideoModal() {
    if (videoModalVideo) {
      videoModalVideo.pause();
      videoModalVideo.currentTime = 0;
    }
    if (videoModal) videoModal.classList.remove("open");
    document.body.style.overflow = "";
  }
  if (videoModalClose) videoModalClose.addEventListener("click", closeVideoModal);
  if (videoModal) {
    videoModal.addEventListener("click", function (e) {
      if (e.target === videoModal) closeVideoModal();
    });
  }
  document.addEventListener("keydown", function (e) {
    if (videoModal && videoModal.classList.contains("open") && e.key === "Escape") closeVideoModal();
  });
  if (videoModalVideo) {
    videoModalVideo.addEventListener("error", function () {
      if (videoModalNote) {
        videoModalNote.style.display = "block";
      }
    });
  }

  /* ---------------- FAQ accordion ---------------- */
  document.querySelectorAll(".faq-item").forEach(function (item) {
    var q = item.querySelector(".faq-q");
    var a = item.querySelector(".faq-a");
    q.addEventListener("click", function () {
      var isOpen = item.classList.contains("open");
      document.querySelectorAll(".faq-item.open").forEach(function (openItem) {
        if (openItem !== item) {
          openItem.classList.remove("open");
          openItem.querySelector(".faq-a").style.maxHeight = null;
          openItem.querySelector(".faq-q").setAttribute("aria-expanded", "false");
        }
      });
      if (isOpen) {
        item.classList.remove("open");
        a.style.maxHeight = null;
        q.setAttribute("aria-expanded", "false");
      } else {
        item.classList.add("open");
        a.style.maxHeight = a.scrollHeight + "px";
        q.setAttribute("aria-expanded", "true");
      }
    });
  });

  /* ---------------- Back to top ---------------- */
  var backToTop = document.querySelector(".back-to-top");
  function toggleBackToTop() {
    if (!backToTop) return;
    backToTop.classList.toggle("visible", window.scrollY > 700);
  }
  if (backToTop) {
    backToTop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
    });
  }

  /* ---------------- Footer year ---------------- */
  var yearEl = document.querySelector("[data-year]");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
