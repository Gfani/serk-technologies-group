/**
 * SERK Technologies Group - Smart Contact Link Handler
 * Desktop: Copies phone/email to clipboard + displays #0D4634 toast (avoids "Pick an app" browser dialog).
 * Mobile: Native action proceeds (opens phone dialer or email app).
 */
(function() {
  function isDesktopDevice() {
    var isMobileUA = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    var hasTouch = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);
    var isWide = window.innerWidth > 768;
    return !isMobileUA && (isWide || !hasTouch);
  }

  function showSerkToast(message) {
    var existing = document.getElementById('serk-contact-toast');
    if (existing && existing.parentNode) {
      existing.parentNode.removeChild(existing);
    }

    var toast = document.createElement('div');
    toast.id = 'serk-contact-toast';
    toast.style.cssText = [
      'position: fixed',
      'bottom: 24px',
      'right: 24px',
      'background: #0D4634',
      'color: #FFFFFF',
      'padding: 12px 20px',
      'border-radius: 6px',
      'box-shadow: 0 10px 28px rgba(13, 70, 52, 0.35)',
      'font-family: var(--serk-font-sans, "Poppins", -apple-system, BlinkMacSystemFont, sans-serif)',
      'font-size: 13.5px',
      'font-weight: 500',
      'letter-spacing: 0.01em',
      'display: inline-flex',
      'align-items: center',
      'gap: 8px',
      'z-index: 999999',
      'opacity: 0',
      'transform: translateY(12px)',
      'transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
      'border: 1px solid rgba(227, 171, 114, 0.3)'
    ].join(';');

    toast.innerHTML = '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#E3AB72" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0;"><path d="M20 6 9 17l-5-5"/></svg><span>' + message + '</span>';

    document.body.appendChild(toast);
    requestAnimationFrame(function() {
      toast.style.opacity = '1';
      toast.style.transform = 'translateY(0)';
    });

    setTimeout(function() {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(8px)';
      setTimeout(function() {
        if (toast.parentNode) {
          toast.parentNode.removeChild(toast);
        }
      }, 300);
    }, 2500);
  }

  function copyTextToClipboard(text, successMsg) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(function() {
        showSerkToast(successMsg);
      }).catch(function() {
        fallbackCopy(text, successMsg);
      });
    } else {
      fallbackCopy(text, successMsg);
    }
  }

  function fallbackCopy(text, successMsg) {
    var textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-9999px';
    textArea.style.top = '0';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand('copy');
      showSerkToast(successMsg);
    } catch (e) {
      console.error('Clipboard copy failed', e);
    }
    document.body.removeChild(textArea);
  }

  function attachContactHandlers() {
    var links = document.querySelectorAll('a[href^="tel:"], a[href^="mailto:"]');
    links.forEach(function(link) {
      if (link.getAttribute('data-smart-contact-bound') === 'true') return;
      link.setAttribute('data-smart-contact-bound', 'true');

      link.addEventListener('click', function(e) {
        if (!isDesktopDevice()) {
          // Mobile device: proceed with native dialer / mailer
          return;
        }

        e.preventDefault();
        var href = link.getAttribute('href') || '';
        if (href.indexOf('tel:') === 0) {
          var rawPhone = href.replace('tel:', '').trim();
          var formattedPhone = '+251 999 911 192';
          if (rawPhone.indexOf('251') !== -1) {
            formattedPhone = '+251 999 911 192';
          } else if (rawPhone.length > 5) {
            formattedPhone = rawPhone;
          }
          copyTextToClipboard(formattedPhone, 'Copied ' + formattedPhone + ' to clipboard');
        } else if (href.indexOf('mailto:') === 0) {
          var email = href.replace('mailto:', '').split('?')[0].trim();
          copyTextToClipboard(email, 'Copied ' + email + ' to clipboard');
        }
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', attachContactHandlers);
  } else {
    attachContactHandlers();
  }
  window.addEventListener('load', attachContactHandlers);
})();
