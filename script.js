(function () {
  "use strict";

  // Where contact-form messages are sent (opens the visitor's email app).
  var CONTACT_EMAIL = "hello@sannidhientreprizes.org";

  // Footer year
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Header shadow on scroll
  var header = document.querySelector(".site-header");
  function onScroll() {
    header.classList.toggle("scrolled", window.scrollY > 8);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // Mobile nav
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("site-nav");
  function setNav(open) {
    nav.classList.toggle("open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  }
  toggle.addEventListener("click", function () {
    setNav(!nav.classList.contains("open"));
  });
  nav.addEventListener("click", function (e) {
    if (e.target.closest("a")) setNav(false);
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") setNav(false);
  });

  // Preselect the form topic from "volunteer" buttons
  var topicSelect = document.getElementById("topic");
  document.querySelectorAll("[data-topic]").forEach(function (el) {
    el.addEventListener("click", function () {
      topicSelect.value = el.getAttribute("data-topic");
    });
  });

  // Reveal-on-scroll
  var revealTargets = document.querySelectorAll(
    ".section-head, .card, .step, .value, .tags li, .volunteer-copy, .pull-quote, .contact-info, .contact-form, .split > div"
  );
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    revealTargets.forEach(function (el, i) {
      el.classList.add("reveal");
      el.style.transitionDelay = (i % 4) * 70 + "ms";
      io.observe(el);
    });
  }

  // Contact form: validate, then hand off to the visitor's email client
  var form = document.getElementById("contact-form");
  var f = form.elements;
  var status = form.querySelector(".form-status");
  var emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var name = f.name.value.trim();
    var email = f.email.value.trim();
    var org = f.org.value.trim();
    var topicText = topicSelect.options[topicSelect.selectedIndex].text;
    var message = f.message.value.trim();

    var bad = [];
    [["name", !name], ["email", !emailRe.test(email)], ["message", !message]].forEach(function (pair) {
      var input = f[pair[0]];
      input.classList.toggle("invalid", pair[1]);
      input.setAttribute("aria-invalid", String(pair[1]));
      if (pair[1]) bad.push(input);
    });

    if (bad.length) {
      status.className = "form-status err";
      status.textContent = "Please fill in your name, a valid email and a message.";
      bad[0].focus();
      return;
    }

    var subject = topicText + (org ? " — " + org : "");
    var body =
      "Name: " + name + "\n" +
      "Email: " + email + "\n" +
      (org ? "Organization: " + org + "\n" : "") +
      "Topic: " + topicText + "\n\n" +
      message;

    window.location.href =
      "mailto:" + CONTACT_EMAIL +
      "?subject=" + encodeURIComponent(subject) +
      "&body=" + encodeURIComponent(body);

    status.className = "form-status ok";
    status.textContent = "Thank you, " + name + "! Your email app should open with your message ready to send.";
    form.reset();
  });
})();
