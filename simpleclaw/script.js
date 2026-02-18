const STAR_TOTAL = 88;
const STAR_STATES = ["off", "off", "off", "medium", "high"];

function buildStarfield() {
  const host = document.getElementById("edgeStars");
  if (!host) return;

  const fragment = document.createDocumentFragment();

  for (let i = 0; i < STAR_TOTAL; i += 1) {
    const dot = document.createElement("span");
    dot.className = "star-sparkle";
    dot.dataset.state =
      STAR_STATES[Math.floor(Math.random() * STAR_STATES.length)];

    const edgeRoll = Math.random();
    let left;
    let top;

    if (edgeRoll < 0.28) {
      left = Math.random() * 100;
      top = Math.random() * 18;
    } else if (edgeRoll < 0.56) {
      left = Math.random() * 100;
      top = 82 + Math.random() * 18;
    } else if (edgeRoll < 0.78) {
      left = Math.random() * 16;
      top = Math.random() * 100;
    } else {
      left = 84 + Math.random() * 16;
      top = Math.random() * 100;
    }

    dot.style.left = `${left.toFixed(2)}%`;
    dot.style.top = `${top.toFixed(2)}%`;
    dot.style.opacity = (0.12 + Math.random() * 0.48).toFixed(2);

    fragment.appendChild(dot);
  }

  host.appendChild(fragment);

  window.setInterval(() => {
    const stars = host.querySelectorAll(".star-sparkle");
    for (let i = 0; i < stars.length; i += 1) {
      if (Math.random() < 0.22) {
        stars[i].dataset.state =
          STAR_STATES[Math.floor(Math.random() * STAR_STATES.length)];
      }
    }
  }, 820);
}

function setupSelectableCards() {
  const clickable = document.querySelectorAll(
    ".mode-pill[data-group], .pay-pill[data-group]",
  );
  const setupCard = document.querySelector(".setup-card[data-mode]");

  clickable.forEach((btn) => {
    btn.addEventListener("click", () => {
      const group = btn.getAttribute("data-group");
      if (!group) return;

      const peers = document.querySelectorAll(`[data-group="${group}"]`);
      peers.forEach((peer) => peer.classList.remove("selected"));
      btn.classList.add("selected");

      if (group === "mode" && setupCard) {
        const mode = btn.getAttribute("data-mode");
        if (mode === "login" || mode === "onboarding") {
          setupCard.setAttribute("data-mode", mode);
        }
      }
    });
  });
}

function setupMarquees() {
  const tracks = document.querySelectorAll(".marquee-track");

  tracks.forEach((track) => {
    if (track.dataset.cloned === "true") return;

    const items = Array.from(track.children);
    items.forEach((node) => {
      const clone = node.cloneNode(true);
      clone.setAttribute("aria-hidden", "true");
      track.appendChild(clone);
    });

    track.dataset.cloned = "true";
  });
}

function setupRevealOnScroll() {
  const targets = document.querySelectorAll(".reveal-up");

  if (!targets.length) return;

  if (!("IntersectionObserver" in window)) {
    targets.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.16, rootMargin: "0px 0px -40px 0px" },
  );

  targets.forEach((el, index) => {
    el.style.transitionDelay = `${Math.min(index * 60, 260)}ms`;
    observer.observe(el);
  });
}

buildStarfield();
setupSelectableCards();
setupMarquees();
setupRevealOnScroll();
