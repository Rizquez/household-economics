import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { defineConfig } from "vite";

const contentSecurityPolicy = [
  "default-src 'self'",
  [
    "script-src 'self' 'unsafe-inline'",
    "https://stirring-wolf-16.clerk.accounts.dev",
    "https://challenges.cloudflare.com",
    "https://*.protect.clerk.com",
  ].join(" "),
  [
    "connect-src 'self'",
    "http://127.0.0.1:8080",
    "https://stirring-wolf-16.clerk.accounts.dev",
    "https://*.protect.clerk.com",
    "https://clerk-telemetry.com",
    "https://*.clerk-telemetry.com",
    "https://fonts.googleapis.com",
    "https://fonts.gstatic.com",
    "ws://localhost:*",
    "ws://127.0.0.1:*",
  ].join(" "),
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' https://fonts.gstatic.com",
  "img-src 'self' data: blob: https://img.clerk.com",
  "worker-src 'self' blob:",
  [
    "frame-src 'self'",
    "https://challenges.cloudflare.com",
    "https://*.protect.clerk.com",
  ].join(" "),
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "manifest-src 'self'",
].join("; ");

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    headers: {
      "Content-Security-Policy": contentSecurityPolicy,
      "X-Frame-Options": "DENY",
      "X-Content-Type-Options": "nosniff",
      "Referrer-Policy": "strict-origin-when-cross-origin",
      "Permissions-Policy": "camera=(), microphone=(), geolocation=()",
    },
  },
});
