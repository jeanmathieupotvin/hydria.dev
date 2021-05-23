// _nav-menu-observer.js
// Logic for observers to be embedded into index page (/)


// Media queries ---------------------------------------------------------------


/**
 * @param {MediaQueryList} mediaQuery - A media query used to determine whether
 *     we should extract anchors from the full nav menu or the mobile menu.
 */
 const mediaQuery = window.matchMedia('(max-width: 600px)');


// Observer handler function ---------------------------------------------------


/**
 * A callback function to be passed to an IntersectionObserver constructor.
 * It loops over entries, check if they are currently intersecting and if so,
 * updates the currently active session. This produce a visual change in either
 * nav menu by coloring the active session's underlying anchor.
 * @param {HTMLElement[]} entries - HTMLElement to be observed.
 */
const observerHandler = entries => {
  // Loop over all entries on the stack of the observer.
  // For each entry, update the active section.
  entries.forEach(entry => {
    // Name of class used to color active session's link.
    let className = 'header--nav--link--active';

    // If entry intersects viewport, proceed.
    // Else, do nothing.
    if (entry.isIntersecting) {
      // Remove color class from current active session.
      document.querySelectorAll(`.${className}`).forEach(e => {
        e.classList.toggle(className)
      });

      // Choose an appropriate query selector. This
      // depends on whether we are dealing with the
      // full nav menu, or the mobile one.
      const querySel = (mediaQuery.matches) 
        ? `.header--mobile-nav > a[href="/#${entry.target.id}"]` 
        : `.header--nav > a[href="/#${entry.target.id}"]`;

      // Color active section's anchor in nav menu.
      document.querySelector(querySel).classList.toggle(className);
    }
  });
}


// Construct an IntersectionObserver instance ----------------------------------


/**
 * We wait that a section becomes visible for at least 25%
 * of its height before triggering the callback function.
 * @param {IntersectionObserver} observer
 */
const observer = new IntersectionObserver(observerHandler, {
  root: null, 
  rootMargin: "0px 0px 0px 0px",
  threshold: 0.25
});


// Select sections that should be observed by observer -------------------------


// Add all targets to the IntersectionObserver.
// Sections selection is based on sections that
// has a dedicated id attribute.
document.querySelectorAll('section[id]').forEach(e => observer.observe(e));
