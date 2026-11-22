/**
 * SERK Technologies Group - Universal Animated Header System
 * Delivers silky-smooth typing and clipping motion for all page headers
 * Styled in brand orange (#E3AB72) with blinking cursor '|'
 */
(function() {
  function initSerkClipAnimation() {
    var animElements = document.querySelectorAll('.wpr-anim-text-type-clip');
    
    animElements.forEach(function(container) {
      if (container.getAttribute('data-serk-anim-running') === 'true') {
        return;
      }
      container.setAttribute('data-serk-anim-running', 'true');

      var b = container.querySelector('.wpr-anim-text-inner b');
      var cursor = container.querySelector('.wpr-anim-text-cursor');
      if (!b) return;

      // Remember the canonical full text
      var fullText = b.getAttribute('data-full-text') || b.textContent.trim();
      b.setAttribute('data-full-text', fullText);
      b.classList.add('wpr-anim-text-visible');
      b.style.opacity = '1';

      var currentIndex = 0;
      var isDeleting = false;
      var typingSpeed = 85;
      var pauseFull = 2400; // Hold full text for 2.4s
      var pauseEmpty = 550; // Pause before re-typing

      function step() {
        if (!isDeleting) {
          currentIndex++;
          b.textContent = fullText.substring(0, currentIndex);
          if (currentIndex >= fullText.length) {
            isDeleting = true;
            setTimeout(step, pauseFull);
            return;
          }
          setTimeout(step, typingSpeed);
        } else {
          currentIndex--;
          b.textContent = fullText.substring(0, currentIndex);
          if (currentIndex <= 0) {
            isDeleting = false;
            setTimeout(step, pauseEmpty);
            return;
          }
          setTimeout(step, 45);
        }
      }

      // Initial reveal
      setTimeout(function() {
        b.textContent = '';
        step();
      }, 250);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSerkClipAnimation);
  } else {
    initSerkClipAnimation();
  }
  window.addEventListener('load', initSerkClipAnimation);
})();
