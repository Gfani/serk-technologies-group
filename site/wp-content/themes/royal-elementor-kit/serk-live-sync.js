/**
 * SERK Technologies Group - Live Web Sync
 * Ensures newly added, edited, or deleted items from /admin immediately reflect on the public page
 * without waiting for full rebuilds or stale browser cache.
 */
(function() {
  var path = window.location.pathname;
  if (path.indexOf('/products') === -1 && path.indexOf('/ventures') === -1) {
    return;
  }

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

      // 1. If on /products
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

          // A. Remove cards that were deleted in admin
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

          // B. Add new cards or update existing ones
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
              // Update summary if changed
              var pDesc = existingCard.querySelector('p');
              if (pDesc && p.summary && pDesc.textContent.trim() !== p.summary.trim()) {
                pDesc.textContent = p.summary;
              }
              // Update image if changed
              var imgElem = existingCard.querySelector('img');
              if (imgElem && p.imageUrl && imgElem.getAttribute('src') !== p.imageUrl) {
                imgElem.src = p.imageUrl;
              }
            } else {
              // Append new card
              var cardDiv = document.createElement('div');
              cardDiv.style.cssText = 'background: #FFFFFF; border: 1px solid #DEE6E0; border-radius: 8px; padding: 26px; display: flex; flex-direction: column; justify-content: space-between; box-shadow: 0 1px 3px rgba(0,0,0,0.02); transition: transform 0.2s ease, box-shadow 0.2s ease;';
              cardDiv.innerHTML = '<div>' +
                '<div style="height: 160px; overflow: hidden; border-radius: 6px; margin-bottom: 16px; background: #F8FAFC; display: flex; align-items: center; justify-content: center; border: 1px solid #E2E8F0;">' +
                  '<img src="' + img + '" alt="' + p.name + '" style="width: 100%; height: 100%; object-fit: cover;">' +
                '</div>' +
                '<span class="serk-badge ' + badge.cls + '"><span>' + badge.text + '</span></span>' +
                '<h3 style="font-size: 1.28rem; font-weight: 600; color: #101513; margin: 12px 0 8px 0; line-height: 1.3;">' + p.name + '</h3>' +
                '<p style="font-size: 0.92rem; color: #5B6761; line-height: 1.6; margin: 0 0 16px 0;">' + (p.summary || '') + '</p>' +
              '</div>' +
              '<div style="margin-top: 16px; display: flex; flex-wrap: wrap; gap: 10px; align-items: center;">' +
                '<a href="' + ctaUrl + '" class="elementor-button" style="padding: 9px 16px; font-size: 0.88rem; text-decoration: none; display: inline-block;">' + ctaText + '</a>' +
                '<a href="/contact_us/?interest=' + p.slug + '" style="color: #0D4634; font-size: 0.85rem; font-weight: 600; text-decoration: none; display: inline-flex; align-items: center; gap: 4px;">Inquire &rarr;</a>' +
              '</div>';
              grid.appendChild(cardDiv);
            }
          });

          // C. Update category nav count pill
          var pillLink = document.querySelector('a.serk-cat-pill[href="#' + catId + '"]');
          if (pillLink) {
            var countSpan = pillLink.querySelector('span');
            if (countSpan) {
              countSpan.textContent = '(' + catProjects.length + ')';
            }
          }
        });
      }

      // 2. If on /ventures
      if (path.indexOf('/ventures') !== -1) {
        var vGrid = document.querySelector('div[style*="grid-template-columns: repeat(auto-fit, minmax(320px, 1fr))"]');
        if (vGrid) {
          var vProjects = published.filter(function(p) {
            return p.category === 'ventures' || (p.category && p.category.indexOf('venture') !== -1);
          });
          var vNamesMap = {};
          vProjects.forEach(function(p) { vNamesMap[p.name.trim().toLowerCase()] = p; });

          // Remove deleted ventures
          for (var j = vGrid.children.length - 1; j >= 0; j--) {
            var vCard = vGrid.children[j];
            var vH3 = vCard.querySelector('h3');
            if (vH3) {
              var vName = vH3.textContent.trim().toLowerCase();
              if (!vNamesMap[vName]) {
                vCard.parentNode.removeChild(vCard);
              }
            }
          }

          // Add or update ventures
          vProjects.forEach(function(p) {
            var vExists = false;
            vGrid.querySelectorAll('h3').forEach(function(h3) {
              if (h3.textContent.trim().toLowerCase() === p.name.trim().toLowerCase()) {
                vExists = true;
              }
            });

            if (!vExists) {
              var vBadge = maturityBadges[p.maturity] || { cls: 'serk-badge-alpha', text: (p.maturity || 'Alpha').replace(/_/g, ' ') };
              var vCtaUrl = p.ctaUrl || ('/contact_us/?interest=' + p.slug);
              var vCtaText = p.publicCta || 'Discover Venture';
              var subtitle = p.audience || 'Digital Venture';

              var vCardDiv = document.createElement('div');
              vCardDiv.style.cssText = 'background: #FFFFFF; border: 1px solid #DEE6E0; border-radius: 8px; padding: 32px; display: flex; flex-direction: column; justify-content: space-between;';
              vCardDiv.innerHTML = '<div>' +
                '<span class="serk-badge ' + vBadge.cls + '"><span>' + vBadge.text + '</span></span>' +
                '<h3 style="font-size: 1.5rem; font-weight: 700; color: #101513; margin: 12px 0 8px 0;">' + p.name + '</h3>' +
                '<p style="font-size: 0.85rem; font-weight: 600; color: #101513; text-transform: uppercase; margin-bottom: 14px;">' + subtitle + '</p>' +
                '<p style="font-size: 0.95rem; color: #5B6761; line-height: 1.6;">' + (p.summary || '') + '</p>' +
              '</div>' +
              '<div style="margin-top: 24px;">' +
                '<a href="' + vCtaUrl + '" class="elementor-button" style="padding: 10px 18px; text-decoration: none; display: inline-block;">' + vCtaText + '</a>' +
              '</div>';
              vGrid.appendChild(vCardDiv);
            }
          });
        }
      }
    })
    .catch(function(err) {});
})();
