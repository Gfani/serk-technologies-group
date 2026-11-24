import { DEFAULT_SITE_CONTENT, getStoredSiteContent, saveStoredSiteContent } from '../src/lib/contentStore';

async function main() {
  console.log('Seeding site content...');
  const current = await getStoredSiteContent();
  const merged = await saveStoredSiteContent(current);
  console.log('Successfully saved and synced site content!');
  console.log('Partners count:', merged.partners.length);
  console.log('Industries count:', merged.industriesList.length);
  console.log('Services count:', merged.servicesList.length);
  console.log('Insights count:', merged.insightsList.length);
  console.log('Branding Header Logo:', merged.branding.headerLogoUrl);
}

main().catch(err => {
  console.error('Seed error:', err);
  process.exit(1);
});
