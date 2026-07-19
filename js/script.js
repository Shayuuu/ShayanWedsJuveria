/* ==========================================================================
   Shayan & Juveria — Wedding Invitation
   ==========================================================================

   ★★★  EDIT EVERYTHING HERE  ★★★
   All wedding details live in this single configuration object.
   You should never need to touch the rest of this file.
   ========================================================================== */

const weddingConfig = {
  groom: "Shayan",
  bride: "Juveria",

  // Shown under each name in the hero. Leave as "" to hide a line.
  groomParents: "Son of Mr. & Mrs. Shaikh",
  brideParents: "Daughter of Mr. & Mrs. Shaikh",

  // Welcome message shown right after the hero.
  welcomeMessage:
    "We are honored to welcome you to the Walima of Shayan & Juveria. " +
    "As they begin their journey in faith and love, thank you for being " +
    "part of this blessed occasion.",

  // The main wedding date & time — used by the countdown, the date reveal,
  // the venue section and the calendar event.
  // Format: "YYYY-MM-DDTHH:MM:SS" (local time)
  weddingDate: "2026-12-25T19:30:00",

  // Shown in the "Save the Date" reveal panel.
  dateReveal: {
    day: "Friday",        // e.g. "Sunday"
    date: "25",           // e.g. "20"
    month: "December",    // e.g. "December"
    year: "2026",         // e.g. "2026"
    // The section heading changes to this once the heart is scratched.
    revealedTitle: "Our forever begins",
  },

  // Walima-day program timeline (shown in "Walima Day Program").
  program: [
    { time: "7:30 PM", title: "Guest Arrival" },
    { time: "8:30 PM", title: "Walima Dinner" },
    { time: "10:30 PM", title: "Rukhsati" },
  ],

  // Dress code shown in the "What to Wear" section.
  dressCode: "Traditional \u2022 Elegant \u2022 Modest",
  dressCodeNote:
    "We kindly request our guests to dress in traditional attire for the celebration.",

  // "How to Reach" — travel options for the venue.
  // icon: "train" | "car" | "bus" | "walk"
  howToReach: [
    {
      icon: "train",
      title: "By Train",
      highlight: "Nearest Station: Sandhurst Road",
      text: "The venue is a short walking distance from the station.",
    },
  ],

  // Main venue — shown in the "Join Us" section and used for the calendar event.
  venue: {
    name: "Najam Baug",
    // Full address — used for the calendar event.
    address: "Samantbhai Nanji Marg, Noor Baug, Dongri, Umerkhadi, Mumbai, Maharashtra 400009, India",
    // Shown on the venue card, as two clean lines.
    displayAddress: ["Samantbhai Nanji Marg, Noor Baug,", "Dongri, Mumbai \u2013 400009"],
    displayDate: "25th December 2026",
    displayTime: "7:30 PM",
    mapsLink: "https://www.google.com/maps/place/Najam+Baug+Trust/@18.9617708,72.8367899,17z/data=!3m1!4b1!4m6!3m5!1s0x3be7ce39a1e5c99f:0xc05435d5946ca065!8m2!3d18.9617708!4d72.8367899!16s%2Fg%2F11rqg08z3h?entry=ttu&g_ep=EgoyMDI2MDcxNS4wIKXMDSoASAFQAw%3D%3D",
    // Length of the calendar event in hours
    eventDurationHours: 4,
  },

  // Photo slider shown between the date reveal and the countdown.
  // Replace with your own photos (keep them landscape, ~1200×800).
  sliderImages: [
    "assets/images/slide-1.jpg",
    "assets/images/slide-2.jpg",
    "assets/images/slide-3.jpg",
  ],

  // Background music (place your file at this path).
  music: "assets/bg-music.mp3",

  // Cinematic hero background video (place your file at this path).
  // Keep it short (10–20s loop), muted, and compressed (~2–4 MB) for mobile.
  // Leave as "" to disable the video and use the plain ivory hero.
  heroVideo: "assets/298376.mp4",
};

/* ==========================================================================
   Implementation — no need to edit below this line
   ========================================================================== */

(function () {
  "use strict";

  const $ = (sel) => document.querySelector(sel);
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------------- 1. Loading screen ---------------- */

  const loader = $("#loader");

  window.addEventListener("load", () => {
    setTimeout(() => loader.classList.add("is-done"), prefersReducedMotion ? 100 : 1600);
  });

  // Safety: never leave the loader stuck if `load` is slow
  setTimeout(() => loader.classList.add("is-done"), 4000);

  /* ---------------- 2. Royal 3D door opening ---------------- */

  const doorScene = $("#doorScene");
  const doorTap = $("#doorTap");
  const invitation = $("#invitation");
  const floatingNav = $("#floatingNav");
  const musicToggle = $("#musicToggle");
  let opened = false;
  let revealed = false;

  function revealInvitation() {
    if (revealed) return;
    revealed = true;

    doorScene.classList.add("is-done");
    document.body.classList.remove("no-scroll");
    invitation.classList.add("is-open");
    invitation.setAttribute("aria-hidden", "false");
    floatingNav.hidden = false;
    musicToggle.hidden = false;
    startHeroVideo();
    setTimeout(() => doorScene.remove(), 1400);
    scheduleScrollNudge();
  }

  /* A few seconds after the doors open, gently lift the page and settle
     back, so guests realise the invitation continues below. Repeats a
     couple of times, and stops for good once they scroll themselves. */
  function scheduleScrollNudge() {
    if (prefersReducedMotion) return;

    let userScrolled = false;
    let nudging = false;
    const onScroll = () => { if (!nudging) userScrolled = true; };
    window.addEventListener("scroll", onScroll, { passive: true });

    let attempts = 0;
    const nudge = () => {
      if (userScrolled || window.scrollY > 5) {
        window.removeEventListener("scroll", onScroll);
        return;
      }
      nudging = true;
      window.scrollTo({ top: 130, behavior: "smooth" });
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
        // Let the settle finish before listening for real scrolls again
        setTimeout(() => { nudging = false; }, 900);
      }, 750);

      attempts += 1;
      if (attempts < 3) setTimeout(nudge, 7000);
      else window.removeEventListener("scroll", onScroll);
    };

    setTimeout(nudge, 4500);
  }

  function openInvitation() {
    if (opened) return;
    opened = true;

    startMusic(); // user gesture — safe to start audio now

    // Doors swing open in 3D, light floods through, then the scene
    // dissolves into the invitation.
    doorScene.classList.add("is-opening");
    setTimeout(revealInvitation, prefersReducedMotion ? 150 : 1900);
  }

  doorTap.addEventListener("click", openInvitation);
  doorTap.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      openInvitation();
    }
  });

  /* ---------------- 3. Cinematic hero background video ---------------- */

  const heroVideo = $("#heroVideo");

  function startHeroVideo() {
    const hero = $("#home");

    // Skip entirely if disabled, or the user prefers reduced motion.
    if (!weddingConfig.heroVideo || prefersReducedMotion) {
      heroVideo.remove();
      return;
    }

    heroVideo.src = weddingConfig.heroVideo;
    heroVideo.setAttribute("playsinline", "");
    heroVideo.setAttribute("webkit-playsinline", "");
    heroVideo.muted = true;
    heroVideo.loop = true;
    heroVideo.playsInline = true;

    const markReady = () => {
      heroVideo.classList.add("is-ready");
      hero.classList.add("has-video");
    };

    heroVideo.addEventListener("canplay", markReady, { once: true });
    heroVideo.addEventListener("playing", markReady, { once: true });

    // File missing or unsupported — quietly fall back to the ivory hero.
    heroVideo.addEventListener(
      "error",
      () => {
        hero.classList.remove("has-video");
        heroVideo.remove();
      },
      { once: true }
    );

    heroVideo.play().catch(() => {
      hero.classList.remove("has-video");
      heroVideo.remove();
    });
  }

  /* ---------------- Scroll reveal (IntersectionObserver) ---------------- */

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.18, rootMargin: "0px 0px -6% 0px" }
  );

  document.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));

  /* ---------------- Populate config-driven content ---------------- */

  $("#heroGroom").textContent = weddingConfig.groom;
  $("#heroBride").textContent = weddingConfig.bride;

  const groomParentsEl = $("#heroGroomParents");
  const brideParentsEl = $("#heroBrideParents");
  groomParentsEl.textContent = weddingConfig.groomParents;
  brideParentsEl.textContent = weddingConfig.brideParents;
  if (!weddingConfig.groomParents) groomParentsEl.hidden = true;
  if (!weddingConfig.brideParents) brideParentsEl.hidden = true;

  $("#welcomeText").textContent = weddingConfig.welcomeMessage;

  const d = weddingConfig.dateReveal;
  $("#dateFull").textContent = `${d.month} ${d.date}, ${d.year}`;
  $("#dateDay").textContent = d.day;

  $("#venueName").textContent = weddingConfig.venue.name;
  $("#venueAddress").innerHTML = (weddingConfig.venue.displayAddress || [weddingConfig.venue.address]).join("<br />");
  $("#venueDate").textContent = weddingConfig.venue.displayDate;
  $("#venueTime").textContent = weddingConfig.venue.displayTime;
  $("#venueDirections").href = weddingConfig.venue.mapsLink;

  /* ---------------- Walima day program ---------------- */

  const programList = $("#programList");
  weddingConfig.program.forEach((item, i) => {
    const row = document.createElement("div");
    row.className = "program-item reveal";
    row.style.transitionDelay = `${i * 0.08}s`;
    row.innerHTML = `
      <span class="program-time">${item.time}</span>
      <span class="program-dot"></span>
      <span class="program-title">${item.title}</span>
    `;
    programList.appendChild(row);
    revealObserver.observe(row);
  });

  /* ---------------- Dress code & guest info ---------------- */

  $("#dressCode").textContent = weddingConfig.dressCode;
  $("#dressNote").textContent = weddingConfig.dressCodeNote;

  /* ---------------- How to reach (rendered from config) ---------------- */

  const REACH_ICONS = {
    train:
      '<svg viewBox="0 0 48 48" fill="none" aria-hidden="true"><rect x="12" y="5" width="24" height="29" rx="6" stroke="currentColor" stroke-width="1.4"/><path d="M12 21 H36" stroke="currentColor" stroke-width="1.4"/><path d="M18 10 H30" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/><circle cx="19" cy="27.5" r="2" fill="currentColor"/><circle cx="29" cy="27.5" r="2" fill="currentColor"/><path d="M17 34 L13 42 M31 34 L35 42 M15 39 H33" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></svg>',
    car:
      '<svg viewBox="0 0 48 48" fill="none" aria-hidden="true"><path d="M10 28 L13 17 C13.5 15.2 15 14 16.8 14 H31.2 C33 14 34.5 15.2 35 17 L38 28" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"/><rect x="7" y="28" width="34" height="9" rx="3" stroke="currentColor" stroke-width="1.4"/><path d="M11 37 V41 M37 37 V41" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/><circle cx="14.5" cy="32.5" r="1.8" fill="currentColor"/><circle cx="33.5" cy="32.5" r="1.8" fill="currentColor"/></svg>',
    bus:
      '<svg viewBox="0 0 48 48" fill="none" aria-hidden="true"><rect x="9" y="8" width="30" height="30" rx="5" stroke="currentColor" stroke-width="1.4"/><path d="M9 24 H39 M9 15 H39" stroke="currentColor" stroke-width="1.4"/><circle cx="16" cy="31" r="2" fill="currentColor"/><circle cx="32" cy="31" r="2" fill="currentColor"/><path d="M14 38 V42 M34 38 V42" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></svg>',
    walk:
      '<svg viewBox="0 0 48 48" fill="none" aria-hidden="true"><circle cx="26" cy="9" r="3.5" stroke="currentColor" stroke-width="1.4"/><path d="M25 16 L20 24 L22 32 L18 41 M20 24 L27 27 L29 35 L33 41 M20 23 L14 27 M26 17 L31 21 L35 20" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  };

  const reachCards = $("#reachCards");
  weddingConfig.howToReach.forEach((item, i) => {
    const card = document.createElement("div");
    card.className = "info-card reveal";
    card.style.transitionDelay = `${i * 0.1}s`;
    card.innerHTML = `
      ${REACH_ICONS[item.icon] || REACH_ICONS.train}
      <h3>${item.title}</h3>
      ${item.highlight ? `<p class="info-highlight">${item.highlight}</p>` : ""}
      <p>${item.text}</p>
    `;
    reachCards.appendChild(card);
    revealObserver.observe(card);
  });

  /* ---------------- 5. Scratch-to-reveal date ---------------- */

  const scratchWrap = $("#scratchWrap");
  const canvas = $("#scratchCanvas");
  const scratchSkip = $("#scratchSkip");
  let scratchRevealed = prefersReducedMotion; // skip the game if reduced motion
  let celebrated = false;

  // Once the heart is scratched: swap the heading and rain rose petals.
  function celebrateReveal() {
    if (celebrated) return;
    celebrated = true;

    const title = $("#dateTitle");
    title.textContent = weddingConfig.dateReveal.revealedTitle;
    title.classList.add("swap-in");

    if (prefersReducedMotion) return;

    const petals = $("#petals");
    const lights = ["#f0c9b8", "#ecd0c0", "#e8b4a0", "#f6dfd4"];
    const darks = ["#c98a6e", "#b06a49", "#a45f45", "#8a4b36"];
    for (let i = 0; i < 26; i++) {
      const p = document.createElement("span");
      p.className = "petal " + (i % 3 === 0 ? "petal--dot" : "petal--leaf");
      p.style.left = `${Math.random() * 100}%`;
      p.style.setProperty("--size", `${5 + Math.random() * 9}px`);
      p.style.setProperty("--dur", `${6 + Math.random() * 7}s`);
      p.style.setProperty("--delay", `${Math.random() * 7}s`);
      p.style.setProperty("--drift", `${(Math.random() - 0.5) * 140}px`);
      p.style.setProperty("--spin", `${180 + Math.random() * 360}deg`);
      p.style.setProperty("--peak", `${0.45 + Math.random() * 0.4}`);
      p.style.setProperty("--petal-light", lights[i % lights.length]);
      p.style.setProperty("--petal-dark", darks[i % darks.length]);
      petals.appendChild(p);
    }
  }

  function setupScratch() {
    if (scratchRevealed) {
      scratchWrap.classList.add("is-revealed");
      celebrateReveal();
      return;
    }

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const rect = scratchWrap.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    const ctx = canvas.getContext("2d");
    ctx.scale(dpr, dpr);

    // Glitter foil: bright centre glow fading to deep copper edges
    const grad = ctx.createRadialGradient(
      rect.width * 0.44, rect.height * 0.4, rect.width * 0.05,
      rect.width * 0.5, rect.height * 0.5, rect.width * 0.72
    );
    grad.addColorStop(0, "#f6e0cf");
    grad.addColorStop(0.35, "#d8a482");
    grad.addColorStop(0.7, "#b06a49");
    grad.addColorStop(1, "#8a4b36");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, rect.width, rect.height);

    // Dense glitter speckles in light, mid and dark tones
    const speckColors = [
      "rgba(255, 250, 244, 0.85)",
      "rgba(246, 224, 207, 0.7)",
      "rgba(176, 106, 73, 0.55)",
      "rgba(92, 51, 37, 0.5)",
    ];
    for (let i = 0; i < 320; i++) {
      ctx.fillStyle = speckColors[i % speckColors.length];
      ctx.beginPath();
      ctx.arc(
        Math.random() * rect.width,
        Math.random() * rect.height,
        0.4 + Math.random() * 1.5,
        0, Math.PI * 2
      );
      ctx.fill();
    }

    ctx.fillStyle = "rgba(74, 40, 26, 0.8)";
    ctx.font = "500 12px Jost, sans-serif";
    ctx.textAlign = "center";
    ctx.letterSpacing = "3px";
    ctx.fillText("SCRATCH TO REVEAL", rect.width / 2, rect.height / 2 - 10);
    ctx.font = "italic 20px 'Cormorant Garamond', serif";
    ctx.fillText("\u2740", rect.width / 2, rect.height / 2 + 20);

    ctx.globalCompositeOperation = "destination-out";
    ctx.lineWidth = 46;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    let scratching = false;
    let last = null;
    let scratchedPixels = 0;

    function pointFromEvent(e) {
      const r = canvas.getBoundingClientRect();
      const src = e.touches ? e.touches[0] : e;
      return { x: src.clientX - r.left, y: src.clientY - r.top };
    }

    function scratchTo(p) {
      ctx.beginPath();
      ctx.moveTo(last ? last.x : p.x, last ? last.y : p.y);
      ctx.lineTo(p.x, p.y);
      ctx.stroke();
      if (last) {
        scratchedPixels += Math.hypot(p.x - last.x, p.y - last.y) * ctx.lineWidth;
      }
      last = p;

      // Reveal once most of the frame has been scratched
      // (the scallop fills ~90% of the canvas rectangle)
      if (scratchedPixels > rect.width * rect.height * 0.4) reveal();
    }

    function reveal() {
      if (scratchRevealed) return;
      scratchRevealed = true;
      scratchWrap.classList.add("is-revealed");
      celebrateReveal();
    }

    const start = (e) => { scratching = true; last = null; scratchTo(pointFromEvent(e)); };
    const move = (e) => {
      if (!scratching) return;
      if (e.cancelable) e.preventDefault();
      scratchTo(pointFromEvent(e));
    };
    const end = () => { scratching = false; last = null; };

    canvas.addEventListener("pointerdown", start);
    canvas.addEventListener("pointermove", move);
    window.addEventListener("pointerup", end);
    canvas.addEventListener("touchstart", start, { passive: true });
    canvas.addEventListener("touchmove", move, { passive: false });
    window.addEventListener("touchend", end);

    scratchSkip.addEventListener("click", reveal);
  }

  // Initialise once the section is near the viewport (correct sizing)
  const scratchObserver = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting) {
        setupScratch();
        scratchObserver.disconnect();
      }
    },
    { rootMargin: "200px" }
  );
  scratchObserver.observe(scratchWrap);

  /* ---------------- Photo slider ---------------- */

  (function initSlider() {
    const track = $("#sliderTrack");
    const dotsWrap = $("#sliderDots");
    const images = weddingConfig.sliderImages || [];

    if (!images.length) {
      $("#slider").remove();
      return;
    }

    images.forEach((src, i) => {
      const fig = document.createElement("figure");
      fig.className = "slide" + (i === 0 ? " is-active" : "");
      fig.innerHTML = `<img src="${src}" alt="Shayan and Juveria — photo ${i + 1}" loading="lazy" />`;
      track.appendChild(fig);

      const dot = document.createElement("button");
      dot.className = "slider-dot" + (i === 0 ? " is-active" : "");
      dot.type = "button";
      dot.setAttribute("aria-label", `Go to photo ${i + 1}`);
      dot.addEventListener("click", () => goTo(i, true));
      dotsWrap.appendChild(dot);
    });

    const slides = [...track.children];
    const dots = [...dotsWrap.children];
    let current = 0;
    let autoTimer = null;

    function goTo(i, fromUser) {
      current = i;
      slides.forEach((s, k) => s.classList.toggle("is-active", k === i));
      dots.forEach((d, k) => d.classList.toggle("is-active", k === i));
      if (fromUser) restartAuto();
    }

    function restartAuto() {
      if (images.length < 2) return;
      clearInterval(autoTimer);
      autoTimer = setInterval(() => goTo((current + 1) % images.length, false), 4500);
    }

    // Swiping still changes photos (with a fade instead of a slide)
    let touchStartX = null;
    track.addEventListener(
      "touchstart",
      (e) => { touchStartX = e.touches[0].clientX; },
      { passive: true }
    );
    track.addEventListener(
      "touchend",
      (e) => {
        if (touchStartX === null) return;
        const dx = e.changedTouches[0].clientX - touchStartX;
        touchStartX = null;
        if (Math.abs(dx) < 40) return;
        const next = dx < 0 ? (current + 1) % images.length : (current - 1 + images.length) % images.length;
        goTo(next, true);
      },
      { passive: true }
    );

    // Fade only while the slider is on screen
    const sliderObserver = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          restartAuto();
        } else {
          clearInterval(autoTimer);
        }
      },
      { threshold: 0.35 }
    );
    sliderObserver.observe(track);
  })();

  /* ---------------- 6. Countdown ---------------- */

  const weddingDate = weddingConfig.weddingDate; // "YYYY-MM-DDTHH:MM:SS"
  const target = new Date(weddingDate).getTime();
  const cd = {
    days: $("#cdDays"),
    hours: $("#cdHours"),
    minutes: $("#cdMinutes"),
    seconds: $("#cdSeconds"),
  };
  const pad = (n) => String(n).padStart(2, "0");

  function tick() {
    const diff = target - Date.now();
    if (Number.isNaN(target)) return;

    if (diff <= 0) {
      $("#countdownGrid").style.display = "none";
      $("#countdownDone").hidden = false;
      clearInterval(cdTimer);
      return;
    }

    cd.days.textContent = pad(Math.floor(diff / 86400000));
    cd.hours.textContent = pad(Math.floor(diff / 3600000) % 24);
    cd.minutes.textContent = pad(Math.floor(diff / 60000) % 60);
    cd.seconds.textContent = pad(Math.floor(diff / 1000) % 60);
  }

  const cdTimer = setInterval(tick, 1000);
  tick();

  /* ---------------- 14. Add to Calendar (Google Calendar) ---------------- */

  $("#addToCalendar").addEventListener("click", () => {
    const start = new Date(weddingConfig.weddingDate);
    if (Number.isNaN(start.getTime())) {
      alert("The Walima date has not been set yet.");
      return;
    }
    const end = new Date(start.getTime() + weddingConfig.venue.eventDurationHours * 3600000);

    // Google Calendar expects UTC times as YYYYMMDDTHHMMSSZ
    const fmt = (dt) =>
      dt.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");

    const params = new URLSearchParams({
      action: "TEMPLATE",
      text: `Walima of ${weddingConfig.groom} & ${weddingConfig.bride}`,
      dates: `${fmt(start)}/${fmt(end)}`,
      details:
        "You are warmly invited to celebrate the Walima of " +
        `${weddingConfig.groom} & ${weddingConfig.bride}.`,
      location: `${weddingConfig.venue.name}, ${weddingConfig.venue.address}`,
    });

    window.open(
      `https://calendar.google.com/calendar/render?${params.toString()}`,
      "_blank",
      "noopener"
    );
  });

  /* ---------------- 15. Closing stars ---------------- */

  const stars = $("#stars");
  const starCount = prefersReducedMotion ? 0 : 26;
  for (let i = 0; i < starCount; i++) {
    const s = document.createElement("span");
    s.className = "star";
    s.style.left = `${Math.random() * 100}%`;
    s.style.top = `${Math.random() * 100}%`;
    s.style.setProperty("--dur", `${3 + Math.random() * 4}s`);
    s.style.setProperty("--delay", `${Math.random() * 5}s`);
    s.style.setProperty("--peak", `${0.4 + Math.random() * 0.6}`);
    stars.appendChild(s);
  }

  /* ---------------- 15b. Ambient gold dust on every section ---------------- */

  if (!prefersReducedMotion) {
    const darkPanels = ".hero, .welcome-section, .countdown-section, .message-section, .closing-section";

    document
      .querySelectorAll(".hero, .welcome-section, .section, .closing-section")
      .forEach((sec) => {
        const layer = document.createElement("div");
        layer.className = "ambient" + (sec.matches(darkPanels) ? " ambient--bright" : "");
        layer.setAttribute("aria-hidden", "true");

        for (let i = 0; i < 11; i++) {
          const p = document.createElement("i");
          p.style.left = `${(2 + Math.random() * 96).toFixed(1)}%`;
          p.style.top = `${(6 + Math.random() * 86).toFixed(1)}%`;
          p.style.setProperty("--s", `${(2 + Math.random() * 3.5).toFixed(1)}px`);
          p.style.setProperty("--t", `${(8 + Math.random() * 8).toFixed(1)}s`);
          // Negative delay: particles are already mid-drift on first paint
          p.style.setProperty("--d", `${(-Math.random() * 16).toFixed(1)}s`);
          p.style.setProperty("--x", `${Math.round(Math.random() * 40 - 20)}px`);
          p.style.setProperty("--x2", `${Math.round(Math.random() * 40 - 20)}px`);
          p.style.setProperty("--o", (0.3 + Math.random() * 0.4).toFixed(2));
          layer.appendChild(p);
        }

        sec.prepend(layer);
      });
  }

  /* ---------------- 16. Background music ---------------- */

  const bgMusic = $("#bgMusic");
  bgMusic.src = weddingConfig.music;
  let musicOn = false;

  function setMusicUI() {
    musicToggle.classList.toggle("is-playing", musicOn);
    musicToggle.setAttribute("aria-pressed", String(musicOn));
    musicToggle.setAttribute("aria-label", musicOn ? "Turn music off" : "Turn music on");
  }

  function startMusic() {
    bgMusic.volume = 0.55;
    bgMusic
      .play()
      .then(() => { musicOn = true; setMusicUI(); })
      .catch(() => { /* file missing or blocked — user can tap the toggle */ });
  }

  musicToggle.addEventListener("click", () => {
    if (musicOn) {
      bgMusic.pause();
      musicOn = false;
      setMusicUI();
    } else {
      startMusic();
    }
  });

  /* ---------------- 17. Floating nav active state ---------------- */

  const navItems = document.querySelectorAll(".nav-item");
  const navSections = ["home", "program", "venue"]
    .map((id) => document.getElementById(id))
    .filter(Boolean);

  const navObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          navItems.forEach((item) =>
            item.classList.toggle("is-active", item.dataset.section === entry.target.id)
          );
        }
      });
    },
    { rootMargin: "-40% 0px -50% 0px" }
  );

  navSections.forEach((sec) => navObserver.observe(sec));
})();
