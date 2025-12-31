import { addons } from "@storybook/manager-api";
import { create } from "@storybook/theming/create";
import { colors, typography, borderRadius } from "../src/theme/tokens";

const safiraTheme = create({
  base: "light",

  colorPrimary: colors.primary.main,
  colorSecondary: colors.primary.main,

  // UI
  appBg: "#FAFAFA",
  appContentBg: colors.white,
  appPreviewBg: colors.white,
  appBorderColor: "#E0E0E0",
  appBorderRadius: borderRadius.md,

  // Tipografia
  fontBase: typography.fontFamily.primary,
  fontCode: typography.fontFamily.mono,

  // Texto
  textColor: colors.text.primary,
  textInverseColor: colors.white,
  textMutedColor: colors.text.secondary,

  // Toolbar
  barTextColor: colors.text.secondary,
  barSelectedColor: colors.primary.main,
  barHoverColor: colors.secondary.main,
  barBg: colors.white,

  // Inputs
  inputBg: colors.white,
  inputBorder: "#E0E0E0",
  inputTextColor: colors.text.primary,
  inputBorderRadius: borderRadius.sm,

  // Branding
  brandTitle: "Safira UI",
  brandUrl: "https://github.com/pprimon/safira-ui",
  brandImage: "/safira-ui-logo.png",
  brandTarget: "_blank",
});

addons.setConfig({
  theme: safiraTheme,
  sidebar: {
    showRoots: true,
  },
});

