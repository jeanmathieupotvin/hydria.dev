// _mobile.js
// Logic for mobile navigation menu


// Event listeners -------------------------------------------------------------


// Listen for clicks on .header--mobile-btn. A click toggles .hide class. This
// utility class toggles between display: none and display: whatever.
document.getElementsByClassName('header--mobile-btn')[0]
  .addEventListener('click', () => {
    const nav = document.getElementsByClassName('header--mobile-nav')[0];
    nav.classList.toggle('hide');
  });
