import type { Config } from "@react-router/dev/config";

export default {
  // Config options...
  // Server-side render by default, to enable SPA mode set this to `false`
  ssr: false,
  // Must match vite.config.ts's `base` when deployed under a subpath (e.g. GitHub Pages project sites)
  basename: "/",
} satisfies Config;
