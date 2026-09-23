import { defineConfig } from "eslint/config";
import js from "@eslint/js";
import tseslint from "typescript-eslint";
import astro from "eslint-plugin-astro";
import jsxA11y from "eslint-plugin-jsx-a11y-x";
import reactHooks from "eslint-plugin-react-hooks";
import globals from "globals";

export default defineConfig(
  { ignores: ["dist", ".astro", "node_modules"] },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...astro.configs.recommended,
  ...astro.configs["jsx-a11y-recommended"],
  { files: ["**/*.tsx"], ...reactHooks.configs.flat.recommended },
  { files: ["**/*.tsx"], ...jsxA11y.configs.recommended },
  {
    languageOptions: {
      globals: { ...globals.browser, ...globals.node },
    },
  },
);
