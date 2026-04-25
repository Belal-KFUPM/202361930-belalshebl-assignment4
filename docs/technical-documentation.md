# Technical Documentation – Portfolio Website (Assignment 3)

## Overview
This project is a responsive, single-page portfolio website built with **HTML**, **CSS**, and **JavaScript**.  
It is designed to display well on **desktop, tablet, and mobile** and includes:
- Anchor-based navigation with smooth scrolling
- A collapsible mobile navigation menu
- A dark/light theme toggle (persistent via localStorage)
- A popup state manager for visitor name and hidden-section preferences
- A time-based greeting message in the hero section, including the saved visitor name
- A GitHub API section that fetches recent public repositories
- Expand/collapse project cards with only one open at a time
- Project filtering, sorting, and visitor-level recommendations
- A public API section that fetches and displays a fun fact
- User feedback states for API loading, failure, and empty results
- A contact form with front-end validation
- Animated success and error messages for form submission feedback
- Hover and transition effects on buttons, cards, and links
- A contact form UI (front-end only; no backend)

---

## Project Structure
```text
202361930-belalshebl-assignment3/
├── index.html
├── css/
│   └── styles.css
├── js/
│   └── script.js
├── assets/
│   └── images/
│       ├── headshot-optimized.jpg
│       ├── project1.jpg
│       └── project2.png
├── docs/
│   ├── ai-usage-report.md
│   └── technical-documentation.md
└── README.md
```

# Technologies Used
HTML5: Semantic structure, sections, form elements, and expandable project cards
CSS3: Responsive design using Grid/Flexbox, CSS variables, media queries, hover effects, transitions, and animations
JavaScript (Vanilla): Smooth scrolling, theme toggling, persisted UI state, dynamic greeting logic, project logic, API fetching, and form validation
Public APIs: Used to fetch and display GitHub repositories and a random fun fact
No frameworks: The project intentionally uses lightweight, plain web technologies

# HTML Architecture (index.html)
## Navigation

The <nav> contains anchor links pointing to section IDs:

#about, #projects, #github, #achievements, #hobbies, #contact-me, #fun-fact

The navigation also includes:

- a mobile `Menu` button that expands the navigation links on smaller screens
- a `State Manager` button that opens the saved-preferences popup
- a `Dark mode` button that switches the theme and saves the preference

## Hero Header

The hero section contains:

Greeting target: <span id="greeting"></span>
Saved visitor-name target: <span id="visitor-greeting-name"></span>
The name uses <span class="accent">Belal Shebl</span> for accent color styling.
A subtitle sits below the main heading inside .subtitle.
A live timer and a personalized helper message appear below the subtitle.

## Main Sections

The <main> element includes the following sections:

About (#about): Two-column layout (text + photo frame + tagline)
Projects (#projects): Expandable project cards inside .project-grid with filtering and sorting
GitHub (#github): A public API section that shows recent repositories
Achievements (#achievements): Headings with bullet lists
Hobbies (#hobbies): Bullet list that can be shown/hidden through saved state
Fun Fact (#fun-fact): A public API section with dynamic content and a refresh button
Contact (#contact-me): A structured form using .contact-form and .form-row

State management is controlled through a popup panel outside the main content rather than a standalone section.

## Projects Section

The projects section now uses expandable cards:

Each project is wrapped in a <details> element with class .project-card
The clickable header is provided by <summary>
Each card includes a .project-toggle label that visually changes between “Show details” and “Hide details”
Projects are stacked vertically so expanding one project does not push another card sideways
JavaScript ensures only one project remains open at a time

## Fun Fact Section

A new section was added to demonstrate fetching data from a public API:

Section ID: fun-fact
Content target: #fact-text
Button ID: new-fact-btn

This section displays:

a loading message while the API request is in progress
a friendly error message if the request fails
an empty-state message if no fact is returned
a new fact whenever the button is clicked

## Contact Form

The contact form includes:

First name, last name, email, and message fields
Dedicated error message containers below each field
A success message container shown after valid submission

The form uses:

id="contact-form"
novalidate

This allows custom validation and user feedback through JavaScript.

# CSS Design (css/styles.css)
## Design System (CSS Variables)

The site’s theme and sizing are managed through CSS custom properties in :root:

Layout: --max-width, --pad
Colors: --bg, --text, --muted, --line
Accent palette: --accent, --accent-soft
Styling: --radius, --pill, --shadow

This supports consistency and makes theme changes easier.

## Layout & Responsiveness

The project uses Flexbox and CSS Grid for responsiveness:

- Navigation (nav)
  - Uses a one-line desktop layout.
  - Switches to a collapsible menu on smaller screens.
  - position: sticky keeps nav visible while scrolling.
- Hero (header.hero)
  - Centered, responsive typography using clamp() for scalable headings.
- About Section (.about)
  - grid-template-columns: 1fr auto places text left and photo right.
  - Collapses to a single column on smaller screens.
- Projects (.project-grid)
  - Now uses a single-column layout so project cards stack vertically.
  - This better supports expand/collapse interaction.
- Contact Form (.contact-form / .form-row)
  - .form-row is a two-column grid for first/last name.
  - Collapses to a single column on small screens.

## Breakpoints
- @media (max-width: 900px):
  - Stacks about section into one column
  - Keeps projects in a single-column layout
- @media (max-width: 600px):
  - Stacks form row inputs
  - Makes submit button full width for mobile usability

## Visual Style
- Dotted paper background via body::before (radial gradient pattern)
- Sections are presented as “cards” (border + shadow + rounded corners)
- Yellow gradient applied to:
  - nav links
  - project cards
  - submit button
  - API card
- Explicit rule keeps text readable (black) on yellow surfaces:
  - nav a, .project-card, .btn { color: #141414; }

## Hover & Transition Effects

Interactive elements now include hover and transition effects:

Navigation links lift slightly and gain a shadow on hover/focus
Buttons (.btn, .nav-btn) lift and scale slightly
Cards (.project-card, .api-card) rise and gain a stronger shadow on hover
Project summary row and .project-toggle also have hover feedback for better interactivity

Transitions are applied to:

transform
box-shadow
background
border-color

These changes improve responsiveness and provide more polished visual feedback.

## Expand/Collapse Project Styling

The expandable project cards include custom styling:

.project-card summary is styled as a clickable row
The default browser summary marker is hidden
.project-toggle changes visually depending on whether the card is open or closed
.project-content is spaced below the summary when expanded

## Animated Form Feedback

Form messages use animation styling:

.error-message and .success-message are hidden by default
Adding the .show class makes them appear with motion
Error messages use a small shake animation
Success messages use a pop-in animation

This makes validation feedback clearer and more polished.

## API Section Styling

The fun-fact section uses:

.api-card for a centered highlighted card
#fact-text for displaying the fetched response

This section visually matches the rest of the site while standing out as dynamic content.

## Dark Mode (CSS)

Dark mode is controlled by a data-theme attribute on :root:

:root[data-theme="dark"] { ... }

When enabled, variables update for a dark background and light text:

--bg becomes dark
--text becomes light
--muted and --line adjust for contrast

To keep UI readable in dark mode:

section and nav backgrounds become darker translucent panels:
:root[data-theme="dark"] section, :root[data-theme="dark"] nav { background: rgba(20,22,28,0.85); }

The theme toggle button also changes color depending on mode:

Light mode: dark grey background
Dark mode: light grey background

# JavaScript Functionality (js/script.js)

The JavaScript runs on DOMContentLoaded and now implements multiple features:

1) Smooth Scrolling
Targets nav anchors: nav a[href^="#"]
Prevents default jump navigation and performs smooth scroll.
Applies a scroll offset based on sticky nav height:
Prevents section headings from being hidden behind the sticky nav.
Accessibility improvement:
Temporarily sets tabindex="-1" and focuses the target section after scrolling.
2) Dark/Light Theme Toggle (Persistent)
Toggle button: #theme-toggle
Theme is applied by setting:
document.documentElement.setAttribute("data-theme", "dark" | "light")
Persistence:
Saves the selected theme in localStorage under key "theme".
Default theme behavior:
If no saved theme exists, uses system preference via:
window.matchMedia("(prefers-color-scheme: dark)")
Accessibility:
Updates button label and aria-pressed to reflect the active theme.
3) Greeting Message by Time of Day
Element target: #greeting
Reads the current hour from the user’s device:
Morning (05:00–11:59): "Good Morning,"
Afternoon (12:00–17:59): "Good Afternoon,"
Evening (otherwise): "Good Evening,"
Inserts the greeting into the hero heading.
4) Expand/Collapse Projects with One Open at a Time
Targets all project <details> elements inside #projects
Uses the toggle event listener on each card
When one project opens, any other open project is closed automatically

This keeps the project section tidy and prevents multiple expanded cards from taking too much space at once.

5) Public API Fetching (Fun Fact Section)

The site includes a dynamic section that fetches data from a public API.

Implementation details:

Targets:
#fact-text
#new-fact-btn
Uses an async function loadFunFact()
Calls fetch(...) to request JSON data from the API
Displays the returned fact on the page

The feature includes basic user feedback:

Loading state: "Loading a fun fact..."
Failure state: "Sorry, I couldn't load a fact right now."
Empty state: "No fact available right now."

The “Get another fact” button allows the user to fetch a new result without reloading the page.

6) Contact Form Validation

The contact form uses front-end validation only.

Targets:

Form: #contact-form
Inputs:
#first
#last
#email
#message
Feedback containers:
#first-error
#last-error
#email-error
#message-error
#form-success

Validation rules:

First name must not be empty
Last name must not be empty
Email must not be empty
Email must match a valid format
Message must not be empty
Message must be at least 10 characters long

Behavior on submit:

Prevents the default submission with e.preventDefault()
Clears previous success/error messages
Validates each field
Shows field-specific error messages when needed
Adds .input-error to invalid fields
Shows an animated success message when validation passes
Resets the form after successful submission

Helper functions:

showError(...)
clearError(...)
isValidEmail(...)

# Contact Form Behavior (Front-End Only)

The contact form is currently UI-only:

It uses standard HTML form fields and method="POST".
JavaScript validates the inputs and shows user feedback in the browser.
No backend endpoint is provided, so submissions are not stored.
Persisting submissions would require:
a backend server, serverless function, or third-party form service.

# Accessibility Notes
Smooth scrolling focuses the destination section to support keyboard users.
The theme toggle uses aria-pressed to indicate state.
Images include alt text for screen readers.
Expand/collapse project cards use semantic <details> / <summary> elements.
The success message container uses aria-live="polite" so assistive technologies can announce confirmation feedback.

# Performance & Optimization
What makes the site fast
Static site architecture: The project uses plain HTML/CSS/JS with no framework bundles, which minimizes network requests and parsing/execution time.
Small JavaScript footprint: JavaScript is limited to focused UX features such as smooth scrolling, theme toggle, greeting, project toggling, API fetching, and form validation, keeping runtime overhead low.

## Image optimization

Images are typically the biggest performance cost for portfolio sites. This project improves image loading behavior by:

Lazy loading images: Non-critical images (e.g., project screenshots) use native browser lazy loading:
loading="lazy" delays image loading until the user scrolls near them, improving initial load time and reducing bandwidth usage.

## API loading considerations

The fun-fact section introduces a small external network request. Performance impact is minimal because:

only one request is made on initial load
additional requests happen only when the user clicks the refresh button
loading text provides immediate feedback while waiting for the response

# How to Run Locally
Option 1: Open directly

Open index.html in any browser.

Option 2: Run a local server (recommended)
cd assignment-1
python3 -m http.server 8000

Then open:

http://localhost:8000
# Future Improvements
Connect the contact form to a real backend or form service
Add active-section highlighting in the nav while scrolling
Add live validation while the user types
