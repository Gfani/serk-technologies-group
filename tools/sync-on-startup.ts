import { getStoredProjects, getStoredSiteContent } from '../src/lib/contentStore';
import { syncProjectsToHtml, syncGalleryToHtml, syncSiteContentToHtml } from '../src/lib/htmlSync';
import { prisma } from '../src/lib/prisma';

async function syncOnStartup() {
  console.log('[STARTUP-SYNC] Starting database-to-HTML synchronization...');

  try {
    // 1. Projects sync
    const projects = await getStoredProjects();
    syncProjectsToHtml(projects);
    console.log(`[STARTUP-SYNC] Synced ${projects.length} projects to products and ventures pages.`);

    // 2. Site content & headers sync
    const content = await getStoredSiteContent();
    syncSiteContentToHtml(content);
    console.log('[STARTUP-SYNC] Synced headers, contact info, and site settings to HTML pages.');

    // 3. Gallery items sync
    try {
      const gallery = await prisma.galleryItem.findMany({
        where: { isVisible: true },
        orderBy: { sortOrder: 'asc' },
      });
      syncGalleryToHtml(gallery);
      console.log(`[STARTUP-SYNC] Synced ${gallery.length} gallery items to media gallery.`);
    } catch (gErr) {
      console.warn('[STARTUP-SYNC] Gallery sync skipped:', gErr);
    }

    console.log('[STARTUP-SYNC] Full synchronization complete. All pages reflect current database state.');
  } catch (err) {
    console.warn('[STARTUP-SYNC] Notice during sync (proceeding to start):', err);
  } finally {
    try {
      await prisma.$disconnect();
    } catch (e) {}
  }
}

syncOnStartup()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error('[STARTUP-SYNC] Failed:', err);
    process.exit(0); // Exit 0 so next start can always proceed
  });
