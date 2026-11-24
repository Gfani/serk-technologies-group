/**
 * SERK Technologies Group - Universal Live Web Sync
 * Ensures newly added, edited, or deleted items from /admin immediately reflect on the public page
 * without waiting for full rebuilds or stale browser cache.
 */
(function() {
  var path = window.location.pathname;

  // 1. Projects Sync for Products & Ventures
  if (path.indexOf('/products') !== -1 || path.indexOf('/ventures') !== -1) {
    fetch('/api/admin/projects', { cache: 'no-store' })
      .then(function(res) { return res.json(); })
      .then(function(projects) {
        if (!Array.isArray(projects)) return;

        var maturityBadges = {
          PRODUCTION_AVAILABLE: { cls: 'serk-badge-production', text: 'Production Available' },
          PILOT_PRIVATE_BETA: { cls: 'serk-badge-pilot', text: 'Pilot / Private Beta' },
          INTERNAL_ALPHA: { cls: 'serk-badge-alpha', text: 'Internal Alpha / Development' },
          RESEARCH_PROTOTYPE: { cls: 'serk-badge-alpha', text: 'Research & Prototype' },
          OPERATING_VENTURE: { cls: 'serk-badge-production', text: 'Operating Venture' },
          CONCEPT: { cls: 'serk-badge-alpha', text: 'Concept / Feasibility' }
        };

        var published = projects.filter(function(p) { return p.isPublished !== false; });
        var validNamesMap = {};
        published.forEach(function(p) {
          validNamesMap[p.name.trim().toLowerCase()] = p;
          if (p.slug) validNamesMap[p.slug.trim().toLowerCase()] = p;
        });

        if (path.indexOf('/products') !== -1) {
          var categories = [
            'sector-intelligence',
            'ai-security',
            'enterprise-operations',
            'solutions',
            'ventures',
            'affiliated',
            'future-innovation'
          ];

          categories.forEach(function(catId) {
            var catSection = document.getElementById(catId);
            if (!catSection) return;
            var grid = catSection.querySelector('div[style*="grid"]');
            if (!grid) return;

            var cardElements = grid.children;
            for (var i = cardElements.length - 1; i >= 0; i--) {
              var card = cardElements[i];
              var h3 = card.querySelector('h3');
              if (h3) {
                var cardName = h3.textContent.trim().toLowerCase();
                if (!validNamesMap[cardName]) {
                  card.parentNode.removeChild(card);
                }
              }
            }

            var catProjects = published.filter(function(p) {
              var c = p.category ? p.category.toLowerCase().replace(/[\s&_]+/g, '-') : 'sector-intelligence';
              return c === catId;
            });

            catProjects.forEach(function(p) {
              var existingCard = null;
              grid.querySelectorAll('h3').forEach(function(h3) {
                if (h3.textContent.trim().toLowerCase() === p.name.trim().toLowerCase()) {
                  existingCard = h3.closest('div[style*="border"]');
                }
              });

              var badge = maturityBadges[p.maturity] || { cls: 'serk-badge-alpha', text: (p.maturity || 'Alpha').replace(/_/g, ' ') };
              var img = p.imageUrl || '/images/serk-photo-engineering.jpg';
              var ctaUrl = p.ctaUrl || ('/products/' + p.slug + '/');
              var ctaText = p.publicCta || 'Learn More';

              if (existingCard) {
                var pDesc = existingCard.querySelector('p');
                if (pDesc && p.summary && pDesc.textContent.trim() !== p.summary.trim()) {
                  pDesc.textContent = p.summary;
                }
                var imgElem = existingCard.querySelector('img');
                if (imgElem && p.imageUrl && imgElem.getAttribute('src') !== p.imageUrl) {
                  imgElem.src = p.imageUrl;
                }
              } else {
                var cardDiv = document.createElement('div');
                cardDiv.style.cssText = 'background: #FFFFFF; border: 1px solid #DEE6E0; border-radius: 8px; padding: 26px; display: flex; flex-direction: column; justify-content: space-between; box-shadow: 0 1px 3px rgba(0,0,0,0.02); transition: transform 0.2s ease, box-shadow 0.2s ease;';
                cardDiv.innerHTML = '<div>' +
                  '<div style="height: 160px; overflow: hidden; border-radius: 6px; margin-bottom: 16px; background: #F8FAFC; display: flex; align-items: center; justify-content: center; border: 1px solid #E2E8F0;">' +
                    '<img src="' + img + '" alt="' + p.name + '" style="width: 100%; height: 100%; object-fit: cover;">' +
                  '</div>' +
                  '<span class="serk-badge ' + badge.cls + '"><span>' + badge.text + '</span></span>' +
                  '<h3 style="font-size: 1.28rem; font-weight: 600; color: #101513; margin: 12px 0 8px 0; line-height: 1.3;">' + p.name + '</h3>' +
                  '<p style="font-size: 0.92rem; color: #5B6761; line-height: 1.6; margin: 0 0 16px 0;">' + p.summary + '</p>' +
                '</div>' +
                '<div style="margin-top: 16px; display: flex; flex-wrap: wrap; gap: 10px; align-items: center;">' +
                  '<a href="' + ctaUrl + '" class="elementor-button" style="padding: 9px 16px; font-size: 0.88rem; text-decoration: none; display: inline-block;">' + ctaText + '</a>' +
                  '<a href="/contact_us/?interest=' + p.slug + '" style="color: #0D4634; font-size: 0.85rem; font-weight: 600; text-decoration: none; display: inline-flex; align-items: center; gap: 4px;">Inquire &rarr;</a>' +
                '</div>';
                grid.appendChild(cardDiv);
              }
            });
          });
        }
      })
      .catch(function() {});
  }

  // 2. Global Content & Branding Live Sync
  fetch('/api/admin/content', { cache: 'no-store' })
    .then(function(res) { return res.json(); })
    .then(function(content) {
      if (!content) return;

      // Header logo sync
      if (content.branding && content.branding.headerLogoUrl) {
        document.querySelectorAll('img.serk-header-logo').forEach(function(img) {
          if (img.getAttribute('src') !== content.branding.headerLogoUrl) {
            img.src = content.branding.headerLogoUrl;
          }
        });
      }

      // Footer logo sync
      if (content.branding && content.branding.footerMarkUrl) {
        document.querySelectorAll('img.serk-footer-mark-img').forEach(function(img) {
          if (img.getAttribute('src') !== content.branding.footerMarkUrl) {
            img.src = content.branding.footerMarkUrl;
          }
        });
      }

      // Partners page live sync
      if (path.indexOf('/partners') !== -1 && Array.isArray(content.partners)) {
        var partnerGrid = document.querySelector('div[style*="display: grid"][style*="minmax(320px"]');
        if (partnerGrid) {
          var publishedPartners = content.partners.filter(function(p) { return p.isPublished !== false; });
          var existingTitles = {};
          publishedPartners.forEach(function(p) { existingTitles[p.name.trim().toLowerCase()] = p; });

          // Reconcile deleted
          var currentCards = partnerGrid.children;
          for (var c = currentCards.length - 1; c >= 0; c--) {
            var h3El = currentCards[c].querySelector('h3');
            if (h3El && !existingTitles[h3El.textContent.trim().toLowerCase()]) {
              currentCards[c].parentNode.removeChild(currentCards[c]);
            }
          }

          // Update existing or add new
          publishedPartners.forEach(function(p) {
            var found = null;
            partnerGrid.querySelectorAll('h3').forEach(function(h3) {
              if (h3.textContent.trim().toLowerCase() === p.name.trim().toLowerCase()) {
                found = h3.closest('div[style*="border"]');
              }
            });

            if (found) {
              var pDesc = found.querySelector('p');
              if (pDesc && p.description) pDesc.textContent = p.description;
              var imgEl = found.querySelector('img');
              if (imgEl && p.logoUrl) imgEl.src = p.logoUrl;
            } else {
              var newCard = document.createElement('div');
              newCard.style.cssText = 'background: #FFFFFF; border: 1px solid #DEE6E0; border-radius: 12px; padding: 28px 24px; display: flex; flex-direction: column; justify-content: space-between; box-shadow: 0 2px 6px rgba(0,0,0,0.03);';
              var logo = p.logoUrl || '/wp-content/uploads/serk/client-zoscales.png';
              var cat = p.category || 'PARTNER';
              var collab = p.collabText || 'Active Portfolio Collaboration • Verified Partner';
              var webLink = p.websiteUrl && p.websiteUrl !== '#' ? '<a href="' + p.websiteUrl + '" target="_blank" rel="noopener noreferrer" style="color: #0D4634; font-weight: 600; text-decoration: none;">Visit Website &rarr;</a>' : '';

              newCard.innerHTML = '<div>' +
                '<div style="text-align: center; padding: 20px; background: #F8FAFC; border-radius: 8px; margin-bottom: 16px; min-height: 80px; display: flex; align-items: center; justify-content: center;">' +
                  '<img src="' + logo + '" alt="' + p.name + '" style="max-height: 44px; max-width: 100%; object-fit: contain;">' +
                '</div>' +
                '<div style="margin-bottom: 8px;"><span class="serk-badge serk-badge-production"><span>' + cat + '</span></span></div>' +
                '<h3 style="font-size: 1.15rem; font-weight: 700; color: #101513; margin: 0 0 8px 0;">' + p.name + '</h3>' +
                '<p style="font-size: 0.9rem; color: #5B6761; line-height: 1.6; margin: 0;">' + p.description + '</p>' +
              '</div>' +
              '<div style="margin-top: 16px; font-size: 0.82rem; color: #101513; font-weight: 600; border-top: 1px solid #F1F5F9; padding-top: 12px; display: flex; justify-content: space-between; align-items: center;">' +
                '<span>' + collab + '</span>' +
                webLink +
              '</div>';
              partnerGrid.appendChild(newCard);
            }
          });
        }
      }
    })
    .catch(function() {});
})();
