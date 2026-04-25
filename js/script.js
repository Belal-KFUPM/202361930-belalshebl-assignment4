// js/script.js

document.addEventListener("DOMContentLoaded", () => {
  const navMenuToggle = document.getElementById("nav-menu-toggle");
  const navLinksContainer = document.getElementById("nav-links");

  function setMobileNavState(isOpen) {
    if (!navMenuToggle || !navLinksContainer) return;

    navMenuToggle.setAttribute("aria-expanded", String(isOpen));
    navLinksContainer.classList.toggle("is-open", isOpen);
  }

  function syncNavForViewport() {
    if (!navLinksContainer || !navMenuToggle) return;

    if (window.innerWidth > 900) {
      navLinksContainer.classList.remove("is-open");
      navMenuToggle.setAttribute("aria-expanded", "false");
    }
  }

  // ---------------------------
  // Smooth scrolling (JS fallback + offset support)
  // ---------------------------
  const navLinks = document.querySelectorAll('nav a[href^="#"]');
  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      const targetId = link.getAttribute("href");
      const target = document.querySelector(targetId);
      if (!target) return;

      e.preventDefault();

      // If you have a sticky nav, this prevents hiding the section title behind it
      const nav = document.querySelector("nav");
      const offset = nav ? nav.offsetHeight + 12 : 0;

      const top =
        target.getBoundingClientRect().top + window.pageYOffset - offset;

      window.scrollTo({ top, behavior: "smooth" });

      // Improve accessibility: move focus to the section
      target.setAttribute("tabindex", "-1");
      target.focus({ preventScroll: true });

      if (window.innerWidth <= 900) {
        setMobileNavState(false);
      }
    });
  });

  navMenuToggle?.addEventListener("click", () => {
    const isExpanded = navMenuToggle.getAttribute("aria-expanded") === "true";
    setMobileNavState(!isExpanded);
  });

  window.addEventListener("resize", syncNavForViewport);
  syncNavForViewport();

  // ---------------------------
  // Dark/Light theme toggle (saved in localStorage)
  // ---------------------------
  const themeBtn = document.getElementById("theme-toggle");
  const root = document.documentElement;

  const applyTheme = (theme) => {
    root.setAttribute("data-theme", theme);
    if (themeBtn) {
      const isDark = theme === "dark";
      themeBtn.textContent = isDark ? "Light mode" : "Dark mode";
      themeBtn.setAttribute("aria-pressed", String(isDark));
    }
  };

  const savedTheme = localStorage.getItem("theme");
  if (savedTheme) {
    applyTheme(savedTheme);
  } else {
    // Default: match system preference
    const prefersDark = window.matchMedia?.("(prefers-color-scheme: dark)").matches;
    applyTheme(prefersDark ? "dark" : "light");
  }

  themeBtn?.addEventListener("click", () => {
    const current = root.getAttribute("data-theme") || "light";
    const next = current === "dark" ? "light" : "dark";
    applyTheme(next);
    localStorage.setItem("theme", next);
  });

  // ---------------------------
  // Greeting message by time of day
  // ---------------------------
  const greetingEl = document.getElementById("greeting");
  const visitorGreetingNameEl = document.getElementById("visitor-greeting-name");

  function getGreetingText() {
    const hour = new Date().getHours();

    if (hour >= 5 && hour < 12) return "Good Morning";
    if (hour >= 12 && hour < 18) return "Good Afternoon";
    return "Good Evening";
  }

  // ---------------------------
  // Stored application state
  // ---------------------------
  const appStateKey = "portfolio-app-state";
  const stateToggleBtn = document.getElementById("state-toggle");
  const stateMenu = document.getElementById("state-menu");
  const closeStateMenuBtn = document.getElementById("close-state-menu");
  const visitorForm = document.getElementById("visitor-form");
  const visitorNameInput = document.getElementById("visitor-name");
  const clearVisitorNameBtn = document.getElementById("clear-visitor-name");
  const customMessage = document.getElementById("custom-message");
  const sectionCheckboxes = Array.from(
    document.querySelectorAll("[data-section-toggle]")
  );

  const defaultAppState = {
    visitorName: "",
    hiddenSections: [],
  };

  function loadAppState() {
    try {
      const storedState = localStorage.getItem(appStateKey);
      if (!storedState) return { ...defaultAppState };

      return { ...defaultAppState, ...JSON.parse(storedState) };
    } catch (error) {
      console.error("Error loading saved app state:", error);
      return { ...defaultAppState };
    }
  }

  const appState = loadAppState();

  function saveAppState() {
    localStorage.setItem(appStateKey, JSON.stringify(appState));
  }

  function isSectionHidden(sectionId) {
    return appState.hiddenSections.includes(sectionId);
  }

  function toggleStateMenu(forceOpen) {
    if (!stateMenu || !stateToggleBtn) return;

    const shouldOpen =
      typeof forceOpen === "boolean" ? forceOpen : stateMenu.hidden;

    stateMenu.hidden = !shouldOpen;
    stateToggleBtn.setAttribute("aria-expanded", String(shouldOpen));
  }

  function renderAppState() {
    if (visitorNameInput) {
      visitorNameInput.value = appState.visitorName;
    }

    if (greetingEl) {
      greetingEl.textContent = getGreetingText();
    }

    if (visitorGreetingNameEl) {
      visitorGreetingNameEl.textContent = appState.visitorName
        ? `${appState.visitorName}, `
        : "";
    }

    if (customMessage) {
      customMessage.textContent = appState.visitorName
        ? "Your saved preferences are active. Explore the sections that match your interests."
        : "Welcome! Explore the sections that match your interests.";
    }

    sectionCheckboxes.forEach((checkbox) => {
      const sectionId = checkbox.dataset.sectionToggle;
      const targetSection = sectionId ? document.getElementById(sectionId) : null;
      const shouldHide = Boolean(sectionId && isSectionHidden(sectionId));

      checkbox.checked = shouldHide;

      if (targetSection) {
        targetSection.hidden = shouldHide;
        targetSection.classList.toggle("section-hidden", shouldHide);
      }
    });
  }

  visitorForm?.addEventListener("submit", (event) => {
    event.preventDefault();

    appState.visitorName = visitorNameInput?.value.trim() || "";
    saveAppState();
    renderAppState();
  });

  clearVisitorNameBtn?.addEventListener("click", () => {
    appState.visitorName = "";
    appState.hiddenSections = [];
    saveAppState();
    renderAppState();
  });

  stateToggleBtn?.addEventListener("click", () => {
    toggleStateMenu();
  });

  closeStateMenuBtn?.addEventListener("click", () => {
    toggleStateMenu(false);
  });

  sectionCheckboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", () => {
      const sectionId = checkbox.dataset.sectionToggle;
      if (!sectionId) return;

      appState.hiddenSections = checkbox.checked
        ? [...new Set([...appState.hiddenSections, sectionId])]
        : appState.hiddenSections.filter((id) => id !== sectionId);

      saveAppState();
      renderAppState();
    });
  });

  document.addEventListener("click", (event) => {
    if (!stateMenu || stateMenu.hidden) return;

    const clickedInsideMenu = stateMenu.contains(event.target);
    const clickedToggle = stateToggleBtn?.contains(event.target);

    if (!clickedInsideMenu && !clickedToggle) {
      toggleStateMenu(false);
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      toggleStateMenu(false);
    }
  });

  renderAppState();

  // ---------------------------
  // Project filtering, sorting, and level-based guidance
  // ---------------------------
  const projectGrid = document.querySelector("#projects .project-grid");
  const projectDetails = Array.from(document.querySelectorAll("#projects details"));
  const categorySelect = document.getElementById("project-category");
  const sortSelect = document.getElementById("project-sort");
  const projectResults = document.getElementById("project-results");
  const levelButtons = Array.from(document.querySelectorAll(".level-btn"));
  const experienceMessage = document.getElementById("experience-message");
  let selectedLevel = "all";

  const experienceCopy = {
    all: "Showing all visitors a full mix of projects. Pick a level to narrow the recommendations.",
    beginner:
      "Beginner mode highlights projects with clearer workflows and a gentler learning curve.",
    advanced:
      "Advanced mode surfaces projects that involve deeper modeling, architecture, and technical decision-making.",
  };

  function updateExperienceMessage() {
    if (!experienceMessage) return;
    experienceMessage.textContent = experienceCopy[selectedLevel];
  }

  function applyProjectFilters() {
    if (!projectGrid || !projectDetails.length) return;

    const selectedCategory = categorySelect?.value || "all";
    const selectedSort = sortSelect?.value || "newest";

    const visibleProjects = projectDetails.filter((project) => {
      const categories = (project.dataset.category || "").split(" ");
      const matchesCategory =
        selectedCategory === "all" || categories.includes(selectedCategory);
      const matchesLevel =
        selectedLevel === "all" || project.dataset.level === selectedLevel;

      const shouldShow = matchesCategory && matchesLevel;
      project.hidden = !shouldShow;

      if (!shouldShow) {
        project.open = false;
      }

      return shouldShow;
    });

    visibleProjects.sort((firstProject, secondProject) => {
      if (selectedSort === "title") {
        const firstTitle = firstProject.querySelector("h3")?.textContent || "";
        const secondTitle = secondProject.querySelector("h3")?.textContent || "";
        return firstTitle.localeCompare(secondTitle);
      }

      const firstDate = new Date(firstProject.dataset.date || 0).getTime();
      const secondDate = new Date(secondProject.dataset.date || 0).getTime();

      return selectedSort === "oldest"
        ? firstDate - secondDate
        : secondDate - firstDate;
    });

    visibleProjects.forEach((project) => {
      projectGrid.appendChild(project);
    });

    if (projectResults) {
      const categoryLabel =
        selectedCategory === "all"
          ? "all categories"
          : `${selectedCategory} projects`;
      const levelLabel =
        selectedLevel === "all" ? "all levels" : `${selectedLevel} visitors`;
      projectResults.textContent =
        visibleProjects.length > 0
          ? `Showing ${visibleProjects.length} project(s) for ${categoryLabel} and ${levelLabel}.`
          : "No projects match both filters right now. Try a different category or level.";
    }
  }

  projectDetails.forEach((detail) => {
    detail.addEventListener("toggle", () => {
      if (!detail.open) return;

      projectDetails.forEach((other) => {
        if (other !== detail) {
          other.open = false;
        }
      });
    });
  });

  categorySelect?.addEventListener("change", applyProjectFilters);
  sortSelect?.addEventListener("change", applyProjectFilters);

  levelButtons.forEach((button) => {
    button.addEventListener("click", () => {
      selectedLevel = button.dataset.level || "all";

      levelButtons.forEach((levelButton) => {
        const isActive = levelButton === button;
        levelButton.classList.toggle("active", isActive);
        levelButton.setAttribute("aria-pressed", String(isActive));
      });

      updateExperienceMessage();
      applyProjectFilters();
    });
  });

  updateExperienceMessage();
  applyProjectFilters();

  // ---------------------------
  // Time-on-site counter
  // ---------------------------
  const timeOnSite = document.getElementById("time-on-site");
  const siteOpenedAt = Date.now();

  function formatElapsedTime(totalSeconds) {
    if (totalSeconds < 60) {
      return `${totalSeconds} second${totalSeconds === 1 ? "" : "s"}`;
    }

    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes} minute${minutes === 1 ? "" : "s"} and ${seconds} second${seconds === 1 ? "" : "s"}`;
  }

  function updateTimer() {
    if (!timeOnSite) return;

    const elapsedSeconds = Math.floor((Date.now() - siteOpenedAt) / 1000);
    timeOnSite.textContent = formatElapsedTime(elapsedSeconds);
  }

  updateTimer();
  window.setInterval(updateTimer, 1000);

  // ---------------------------
  // Fetch and display GitHub repositories
  // ---------------------------
  const githubUsername = "Belal-KFUPM";
  const githubStatus = document.getElementById("github-status");
  const githubRepos = document.getElementById("github-repos");

  function renderGithubRepos(repositories) {
    if (!githubRepos) return;

    githubRepos.innerHTML = repositories
      .map((repo) => {
        const updatedDate = new Date(repo.updated_at).toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        });

        return `
          <article class="github-repo">
            <h3><a href="${repo.html_url}" target="_blank" rel="noreferrer">${repo.name}</a></h3>
            <p>${repo.description || "No description provided for this repository yet."}</p>
            <p class="github-meta">
              <span>Updated: ${updatedDate}</span>
              <span>Language: ${repo.language || "Not specified"}</span>
            </p>
          </article>
        `;
      })
      .join("");
  }

  async function loadGithubRepos() {
    if (!githubStatus || !githubRepos) return;

    githubStatus.textContent = "Loading GitHub repositories...";
    githubRepos.innerHTML = "";

    try {
      const response = await fetch(
        `https://api.github.com/users/${githubUsername}/repos?sort=updated&per_page=6`
      );

      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }

      const repositories = await response.json();
      const portfolioRepos = repositories
        .filter((repo) => !repo.fork)
        .sort((firstRepo, secondRepo) => {
          return new Date(secondRepo.updated_at) - new Date(firstRepo.updated_at);
        })
        .slice(0, 4);

      if (!portfolioRepos.length) {
        githubStatus.textContent = "No public repositories are available to show right now.";
        return;
      }

      githubStatus.textContent = `Showing ${portfolioRepos.length} recent public GitHub repositories.`;
      renderGithubRepos(portfolioRepos);
    } catch (error) {
      githubStatus.textContent =
        "Sorry, I couldn't load GitHub repositories right now. Please try again later.";
      console.error("Error fetching GitHub repositories:", error);
    }
  }

  loadGithubRepos();

  // ---------------------------
  // Fetch and display a fun fact
  // ---------------------------
  const factText = document.getElementById("fact-text");
  const newFactBtn = document.getElementById("new-fact-btn");

  async function loadFunFact() {
    if (!factText) return;

    factText.textContent = "Loading a fun fact...";

    try {
      const response = await fetch("https://uselessfacts.jsph.pl/api/v2/facts/random?language=en");

      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }

      const data = await response.json();
      if (!data.text) {
        factText.textContent = "No fact available right now.";
        return;
      }
      
      factText.textContent = data.text;
    } catch (error) {
      factText.textContent = "Sorry, I couldn't load a fact right now.";
      console.error("Error fetching fact:", error);
    }
  }

  loadFunFact();
  newFactBtn?.addEventListener("click", loadFunFact);


  // ---------------------------
  // Contact form validation
  // ---------------------------
  const contactForm = document.getElementById("contact-form");
  const firstInput = document.getElementById("first");
  const lastInput = document.getElementById("last");
  const emailInput = document.getElementById("email");
  const reasonInput = document.getElementById("contact-reason");
  const messageInput = document.getElementById("message");

  const firstError = document.getElementById("first-error");
  const lastError = document.getElementById("last-error");
  const emailError = document.getElementById("email-error");
  const reasonError = document.getElementById("reason-error");
  const messageError = document.getElementById("message-error");
  const formSuccess = document.getElementById("form-success");

  function showError(input, errorElement, message) {
    input.classList.add("input-error");
    errorElement.textContent = message;
    errorElement.classList.add("show");
  }

  function clearError(input, errorElement) {
    input.classList.remove("input-error");
    errorElement.textContent = "";
    errorElement.classList.remove("show");
  }

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function countWords(text) {
    return text.trim().split(/\s+/).filter(Boolean).length;
  }

  function validateForm() {
    if (!contactForm) return false;

    let isValid = true;
    formSuccess.textContent = "";
    formSuccess.classList.remove("show");

    const firstValue = firstInput.value.trim();
    const lastValue = lastInput.value.trim();
    const emailValue = emailInput.value.trim();
    const reasonValue = reasonInput.value.trim();
    const messageValue = messageInput.value.trim();

    clearError(firstInput, firstError);
    clearError(lastInput, lastError);
    clearError(emailInput, emailError);
    clearError(reasonInput, reasonError);
    clearError(messageInput, messageError);

    if (firstValue === "") {
      showError(firstInput, firstError, "Please enter your first name.");
      isValid = false;
    } else if (firstValue.length < 2) {
      showError(firstInput, firstError, "First name must be at least 2 characters.");
      isValid = false;
    }

    if (lastValue === "") {
      showError(lastInput, lastError, "Please enter your last name.");
      isValid = false;
    } else if (lastValue.length < 2) {
      showError(lastInput, lastError, "Last name must be at least 2 characters.");
      isValid = false;
    }

    if (firstValue && lastValue && firstValue.toLowerCase() === lastValue.toLowerCase()) {
      showError(lastInput, lastError, "First and last name should not be the same.");
      isValid = false;
    }

    if (emailValue === "") {
      showError(emailInput, emailError, "Please enter your email.");
      isValid = false;
    } else if (!isValidEmail(emailValue)) {
      showError(emailInput, emailError, "Please enter a valid email address.");
      isValid = false;
    }

    if (reasonValue === "") {
      showError(reasonInput, reasonError, "Please choose a reason for contacting me.");
      isValid = false;
    }

    if (messageValue === "") {
      showError(messageInput, messageError, "Please enter your message.");
      isValid = false;
    } else if (messageValue.length < 20) {
      showError(messageInput, messageError, "Message must be at least 20 characters long.");
      isValid = false;
    } else if (countWords(messageValue) < 4) {
      showError(messageInput, messageError, "Message should include at least 4 words.");
      isValid = false;
    }

    return isValid;
  }

  contactForm?.addEventListener("submit", (e) => {
    e.preventDefault();

    if (validateForm()) {
      formSuccess.textContent = "Thank you! Your message passed all checks and has been submitted successfully.";
      formSuccess.classList.add("show");
      contactForm.reset();

      setTimeout(() => {
        formSuccess.classList.remove("show");
      }, 3000);
    }
  });

  [firstInput, lastInput, emailInput, reasonInput, messageInput].forEach((input) => {
    input?.addEventListener("input", () => {
      if (!formSuccess.textContent) return;
      formSuccess.textContent = "";
      formSuccess.classList.remove("show");
    });
  });
});
