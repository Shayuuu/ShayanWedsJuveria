(function () {
  "use strict";

  const params = new URLSearchParams(window.location.search);
  const to = (params.get("to") || "").trim().replace(/\s+/g, " ").slice(0, 60);
  const guestsRaw = (params.get("guests") || "").trim().toLowerCase();

  const dearLine = document.getElementById("dearLine");
  const guestNote = document.getElementById("guestNote");
  const printBtn = document.getElementById("printBtn");

  if (to) {
    dearLine.textContent = `Dear ${to},`;

    if (guestsRaw === "family") {
      guestNote.textContent = "Invitation for you & your family";
    } else {
      const count = Number(guestsRaw);
      if (Number.isFinite(count) && count >= 1) {
        guestNote.textContent =
          count === 1 ? "Invitation for 1 guest" : `Invitation for ${count} guests`;
      }
    }

    document.title = `Walima Invitation — ${to}`;
  } else {
    dearLine.textContent = "Dear Guest,";
    guestNote.textContent = "";
  }

  printBtn.addEventListener("click", () => window.print());

  // Auto-open print when requested from the generator
  if (params.get("print") === "1") {
    window.addEventListener("load", () => {
      setTimeout(() => window.print(), 400);
    });
  }
})();
