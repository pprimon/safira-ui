import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  stories: [
    // Documentação MDX e Stories na pasta do componente
    "../src/components/**/*.mdx",
    "../src/components/**/*.stories.@(js|jsx|mjs|ts|tsx)",
    // Stories na pasta stories (legado - manter para compatibilidade)
    "../stories/**/*.mdx",
    "../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],
  addons: [
    "@storybook/addon-essentials",
    "@storybook/addon-a11y"
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {}
  },
  typescript: {
    check: false,
    // TESTE: Desabilitando react-docgen-typescript para investigar o erro
    reactDocgen: false,
  },
};
export default config;