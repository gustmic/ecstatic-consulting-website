/// <reference types="vite/client" />

// TypeScript declarations for Calendly and PostHog
declare global {
  interface Window {
    Calendly?: {
      initPopupWidget: (options: { url: string }) => void;
    };
    posthog?: {
      capture: (event: string, properties?: Record<string, any>) => void;
      init: (key: string, options: Record<string, any>) => void;
      [key: string]: any;
    };
  }
}

export {};
