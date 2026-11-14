/* ==========================================================================
   Invite link generator — Shayan & Juveria Walima
   ========================================================================== */

(function () {
  "use strict";

  // Live invitation base URL (no trailing slash)
  const INVITE_BASE = "https://shayan-weds-juveria.vercel.app";

  const form = document.getElementById("inviteForm");
  const guestName = document.getElementById("guestName");
  const guestCount = document.getElementById("guestCount");
  const countField = document.getElementById("countField");
  const result = document.getElementById("result");
  const inviteLink = document.getElementById("inviteLink");
  const inviteMessage = document.getElementById("inviteMessage");
  const whatsappShare = document.getElementById("whatsappShare");
  const previewLink = document.getElementById("previewLink");

  function getMode() {
    const checked = form.querySelector('input[name="guestMode"]:checked');
    return checked ? checked.value : "family";
  }

  function syncCountVisibility() {
    const limited = getMode() === "limited";
    countField.hidden = !limited;
    guestCount.required = limited;
    if (!limited) guestCount.value = "";
  }

  form.querySelectorAll('input[name="guestMode"]').forEach((radio) => {
    radio.addEventListener("change", syncCountVisibility);
  });
  syncCountVisibility();

  function cleanName(raw) {
    return String(raw || "")
      .trim()
      .replace(/\s+/g, " ")
      .slice(0, 60);
  }

  function buildInviteUrl(name, mode, count) {
    const params = new URLSearchParams();
    params.set("to", name);
    if (mode === "family") {
      params.set("guests", "family");
    } else {
      params.set("guests", String(count));
    }
    return `${INVITE_BASE}/?${params.toString()}`;
  }

  function guestPhrase(mode, count) {
    if (mode === "family") return "you and your family";
    const n = Number(count);
    if (n === 1) return "you";
    return `you and your guests (${n} persons)`;
  }

  function guestLine(mode, count) {
    if (mode === "family") {
      return "This invitation is for you and your entire family.";
    }
    const n = Number(count);
    if (n === 1) return "This invitation is for 1 guest.";
    return `This invitation is for ${n} guests.`;
  }

  function buildMessage(name, mode, count, url) {
    const who = guestPhrase(mode, count);
    return [
      "Assalamu Alaikum 🤍",
      "",
      `Dear ${name},`,
      "",
      `With the blessings of Allah, we joyfully invite ${who} to celebrate the Walima of Shayan & Juveria.`,
      "",
      guestLine(mode, count),
      "",
      "Your presence and duas would make our celebration truly special.",
      "",
      "📅 Friday, 25th December 2026 · 7:30 PM",
      "📍 Najam Baug, Dongri, Mumbai",
      "",
      "Tap to open your personal invitation:",
      url,
      "",
      "With love,",
      "Shayan & Juveria",
    ].join("\n");
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = cleanName(guestName.value);
    const mode = getMode();
    const count = Number(guestCount.value);

    if (!name) {
      guestName.focus();
      return;
    }

    if (mode === "limited" && (!Number.isFinite(count) || count < 1)) {
      guestCount.focus();
      return;
    }

    const url = buildInviteUrl(name, mode, count);
    const message = buildMessage(name, mode, count, url);

    inviteLink.value = url;
    inviteMessage.value = message;
    previewLink.href = url;
    whatsappShare.href = `https://wa.me/?text=${encodeURIComponent(message)}`;

    result.hidden = false;
    result.scrollIntoView({ behavior: "smooth", block: "start" });
  });

  async function copyFrom(id, button) {
    const el = document.getElementById(id);
    const text = el.value;
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      el.focus();
      el.select();
      document.execCommand("copy");
    }
    const original = button.textContent;
    button.textContent = "Copied";
    button.classList.add("is-copied");
    setTimeout(() => {
      button.textContent = original;
      button.classList.remove("is-copied");
    }, 1600);
  }

  document.querySelectorAll(".btn-copy").forEach((btn) => {
    btn.addEventListener("click", () => copyFrom(btn.dataset.target, btn));
  });
})();
