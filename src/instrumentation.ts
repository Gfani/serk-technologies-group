export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    const PING_INTERVAL_MS = 10 * 60 * 1000; // 10 minutes (Render sleeps after 15 min)
    const TARGET_HOST =
      process.env.APP_URL ||
      (process.env.RENDER_EXTERNAL_URL ? process.env.RENDER_EXTERNAL_URL : 'https://serk-technologies-group.onrender.com');

    const healthUrl = `${TARGET_HOST.replace(/\/$/, '')}/api/health`;

    console.log(`[KEEP-ALIVE] Auto-pinger registered. Pinging ${healthUrl} every 10 minutes to prevent Render sleep.`);

    // Initial ping 30s after server boot
    setTimeout(async () => {
      try {
        const res = await fetch(healthUrl, {
          headers: { 'User-Agent': 'SERK-KeepAlive-Internal/1.0' },
          signal: AbortSignal.timeout(10000),
        });
        console.log(`[KEEP-ALIVE] Initial wake-ping completed. Status: ${res.status}`);
      } catch (err: any) {
        console.warn(`[KEEP-ALIVE] Initial wake-ping skipped (${err?.message || 'offline'})`);
      }
    }, 30000);

    // Periodic ping loop every 10 minutes
    setInterval(async () => {
      try {
        const res = await fetch(healthUrl, {
          headers: { 'User-Agent': 'SERK-KeepAlive-Periodic/1.0' },
          signal: AbortSignal.timeout(10000),
        });
        console.log(`[KEEP-ALIVE] Periodic wake-ping successful (${res.status}) at ${new Date().toISOString()}`);
      } catch (err: any) {
        console.warn(`[KEEP-ALIVE] Periodic ping notice: ${err?.message || err}`);
      }
    }, PING_INTERVAL_MS);
  }
}
