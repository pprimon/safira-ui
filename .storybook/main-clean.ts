import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  stories: ["../stories/UltraSimple.stories.tsx"],
  addons: [],
  framework: {
    name: "@storybook/react-vite",
    options: {}
  },
  typescript: {
    check: false,
    reactDocgen: false,
  },
};
export default config;

