/// <reference types="vite/client" />

// TypeScript declarations for Calendly
declare global {
  interface Window {
    Calendly?: {
      initPopupWidget: (options: { url: string }) => void;
    };
  }
}

export {};
