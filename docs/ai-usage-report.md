# AI Usage Report (Assignment 3)

This document explains how I used AI across the three submissions for this portfolio project, with emphasis on the work completed for Assignment 3.

## Tools Used & Use Cases

### ChatGPT
I used ChatGPT as a support tool to speed up development and reduce trial-and-error while building my portfolio site. Specifically, I used it to:
- **Plan the workflow** for the assignment (HTML → CSS → JavaScript → documentation) and validate that it was time-efficient.
- **Decide the site structure** (single-page `index.html` with sections vs. multiple HTML pages) and choose an approach aligned with typical portfolio layouts.
- **Create a responsive CSS foundation** using Flexbox/Grid and then refine it to match a specific layout style (pill navigation, section spacing, projects layout).
- **Improve the form section** by explaining how form submission data works without a backend and what’s possible in a static site.
- **Implement key JavaScript features** by generating an external JS file to add:
  - smooth scrolling to section anchors,
  - a dark/light theme toggle with persistence,
  - a time-based greeting message in the hero section.
- **Identify required HTML edits** to connect the JS features (IDs/classes for greeting and theme button, adding the script tag).
- **Add interactive UI enhancements** by helping implement:
  - animated success and error messages for form validation feedback,
  - hover and transition effects for buttons, cards, and navigation links,
  - smooth transition styling to make interactive elements feel more polished and responsive.
- **Support user feedback features** by helping add:
  - validation error messages for empty or invalid form inputs,
  - loading and failure messages for the public API fun-fact section,
  - an empty-state message when no API data is returned.
- **Help debug API integration issues** by assisting with troubleshooting the API setup and integration process, including debugging API key-related issues during implementation.
- **Implement Assignment 3 logic features** by helping design and refine:
  - the complex project display logic for filtering, sorting, and audience-based recommendations,
  - the state management system for saved visitor name and hidden-section preferences,
  - the mobile navigation and responsive interaction behavior.
- **Implement GitHub connectivity** by helping connect the portfolio to GitHub data using the API key / authenticated integration workflow and shaping the logic used to fetch and display repository information.
- **Code review and cleanup support:** Used AI to check for stale references, inconsistent documentation, unnecessary clutter, and weak spots in the implementation, then clean up the project files.
- **Testing and debugging support:** Used AI to help test behavior, reason through bugs, validate JavaScript syntax, and troubleshoot issues such as state persistence, hiding/showing sections, and navigation behavior.

## Benefits & Challenges

### Benefits
- **Faster layout iteration:** AI suggestions helped me quickly move from a basic layout to a responsive design using Grid/Flexbox.
- **Clear direction on best practices:** It guided me toward a single-page section-based portfolio (common industry pattern) and improved navigation behavior.
- **Reduced debugging time:** AI identified small but important issues such as:
  - correct CSS property usage (e.g., `color` instead of `font-color`),
  - where to place theme overrides in the CSS to ensure they apply correctly,
  - how to structure project cards for reliable grid layouts.
- **Improved interface polish:** AI helped me add small front-end details that improve user experience, such as animated feedback messages and button/card hover transitions.
- **Help with integration troubleshooting:** AI also helped diagnose issues during API integration, including problems related to API key setup and usage.
- **Support for more advanced logic:** AI was especially helpful when combining multiple conditions and user states, such as project filters, sorting rules, saved preferences, and personalized messages.
- **Help with code quality:** AI made it easier to spot stale documentation, leftover clutter, and implementation inconsistencies across the project.

### Challenges / Limitations
- **Design tuning still required manual work:** Even with AI-generated CSS, I needed to adjust spacing, alignment, and visual hierarchy to match the intended design.
- **Static site constraints:** AI clarified that storing form submissions to CSV/text is not possible directly from browser-only HTML/JS due to security limitations; it requires a backend or third-party form handling.
- **Avoiding over-reliance:** AI can generate a lot of code; I had to choose only the parts that fit my design and course requirements.
- **Debugging still required judgment:** Even when AI suggested likely fixes, I still had to test them and make sure they actually matched the behavior I wanted in the browser.

## Learning Outcomes

### Technical Skills
- Learned how to build a **responsive layout** using:
  - CSS Grid (e.g., two-column project card grid that collapses to one column on mobile),
  - Flexbox for navigation alignment and adaptive spacing,
  - breakpoints and `clamp()` for responsive sizing.
- Learned how to implement **useful front-end JavaScript** patterns:
  - smooth scrolling with sticky-nav offset handling,
  - theme toggling using a `data-theme` attribute and `localStorage`,
  - dynamic greeting messages using the current time,
  - state management for saved names and hidden sections,
  - conditional rendering based on user selections.
- Learned how to improve **user interaction and feedback** through:
  - animated success and error messages,
  - hover and transition effects on links, buttons, and cards,
  - loading, failure, and empty-state messages for API-based content.
- Learned more about **API integration debugging**, including how to identify and troubleshoot issues related to API configuration and key usage.
- Learned more about **testing and cleanup workflow**, including checking for stale references, validating logic after changes, and making documentation consistent with the final codebase.


## Responsible Use & Modifications

I used AI as an assistant, not a replacement for my own work. To ensure correctness, originality, and academic integrity, I:

- **Reviewed all AI output** before adding it to my project.
- **Modified AI-generated CSS and JS** to match my specific design goals and assignment requirements.  
- **Tested changes manually** by resizing the browser, using DevTools, and checking interactive features to confirm the layout and logic work on desktop, tablet, and mobile.
- **Used AI suggestions critically** for debugging and cleanup, rather than accepting fixes automatically. I verified whether each suggested fix actually solved the issue I was seeing.
- **Kept the content and layout decisions my own:** I chose the final site structure (single-page sections), the final copy/wording, and refined styling choices rather than accepting everything AI suggested.
- **Ensured originality:** I treated AI code as a starting point, then rewrote/adjusted it to fit my project’s structure, naming conventions, and intended UI.

Overall, AI improved my speed and helped with tricky implementation details across all three submissions, but I ensured the final result reflects my own understanding, testing, and work.
