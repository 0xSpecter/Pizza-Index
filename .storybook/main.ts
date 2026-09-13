import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  "stories": [
    "../app/**/*.mdx",
    "../app/**/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],
  "addons": [
    "@chromatic-com/storybook",
    "@storybook/addon-vitest",
    "@storybook/addon-a11y",
    "@storybook/addon-docs",
    "@storybook/addon-mcp",
    "@storybook/addon-themes"
  ],
  "framework": "@storybook/react-vite",
  // The root vite.config.ts includes the React Router plugin, which requires
  // being run through the react-router CLI and breaks Storybook's own Vite
  // build. Strip it out here; tsconfigPaths stays intact.
  async viteFinal(config) {
    const flatten = (plugins: unknown[]): unknown[] =>
      plugins.flatMap((plugin) => (Array.isArray(plugin) ? flatten(plugin) : plugin));
    config.plugins = flatten(config.plugins ?? []).filter(
      (plugin) =>
        !(plugin && typeof plugin === "object" && "name" in plugin && (plugin as { name: string }).name.startsWith("react-router"))
    ) as typeof config.plugins;
    return config;
  }
};
export default config;