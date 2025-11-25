// analytics.ts - PostHog tracking module
// Assumes window.posthog is already loaded via snippet in <head>

export function initAnalytics() {
  if (!window.posthog) {
    console.warn('PostHog not loaded - analytics disabled');
    return;
  }

  // === SCROLL DEPTH TRACKING ===
  const thresholds = [25, 50, 75, 100];
  let reported = new Set<number>();
  let lastPercent = 0;
  let engagedTimer: ReturnType<typeof setTimeout> | null = null;

  function getDocHeight() {
    return Math.max(
      document.documentElement.scrollHeight,
      document.body.scrollHeight
    );
  }

  function checkScroll() {
    const scrollTop = window.scrollY || window.pageYOffset;
    const winHeight = window.innerHeight || document.documentElement.clientHeight;
    const docHeight = getDocHeight() - winHeight;
    
    if (docHeight <= 0) return; // page too short
    
    const percent = Math.min(100, Math.round((scrollTop / docHeight) * 100));
    
    if (percent <= lastPercent) return; // only track forward scroll
    lastPercent = percent;

    // Report threshold events
    thresholds.forEach(t => {
      if (percent >= t && !reported.has(t)) {
        reported.add(t);
        window.posthog?.capture('scroll_depth', {
          depth: t,
          percent: percent,
          path: window.location.pathname,
          timestamp: new Date().toISOString()
        });
      }
    });

    // Track engaged reading (30s near bottom = serious interest)
    if (percent >= 75) {
      if (engagedTimer) clearTimeout(engagedTimer);
      engagedTimer = setTimeout(() => {
        window.posthog?.capture('engaged_near_bottom', {
          percent: percent,
          path: window.location.pathname,
          timestamp: new Date().toISOString()
        });
      }, 30000); // 30 seconds
    }
  }

  // Debounced scroll handler
  let scrollTimer: ReturnType<typeof setTimeout>;
  function onScroll() {
    if (scrollTimer) clearTimeout(scrollTimer);
    scrollTimer = setTimeout(checkScroll, 150);
  }

  window.addEventListener('scroll', onScroll, { passive: true });

  // === CTA CLICK TRACKING ===
  function registerCTAs() {
    const ctas = document.querySelectorAll('[data-cta-location]');
    
    ctas.forEach(el => {
      el.addEventListener('click', () => {
        const location = el.getAttribute('data-cta-location') || 'unknown';
        
        const scrollPercent = Math.round(
          (window.scrollY / (getDocHeight() - window.innerHeight || 1)) * 100
        ) || 0;

        window.posthog?.capture('cta_book_call_clicked', {
          location: location,
          label: (el as HTMLElement).innerText || el.getAttribute('aria-label') || null,
          scroll_percent: scrollPercent,
          path: window.location.pathname,
          timestamp: new Date().toISOString()
        });

        // Track if Calendly link
        if (el.tagName === 'A' && (el as HTMLAnchorElement).href && (el as HTMLAnchorElement).href.includes('calendly')) {
          window.posthog?.capture('calendly_opened', {
            source_location: location
          });
        }
      }, { passive: true } as AddEventListenerOptions);
    });
  }

  // Wait for DOM
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', registerCTAs);
  } else {
    registerCTAs();
  }

  // === PAGE LOAD EVENT ===
  window.addEventListener('load', () => {
    checkScroll(); // initial scroll check
    window.posthog?.capture('page_loaded', {
      path: window.location.pathname,
      title: document.title,
      timestamp: new Date().toISOString()
    });
  });
}
