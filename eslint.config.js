import js from "@eslint/js";
import globals from "globals";
import astroPlugin from "eslint-plugin-astro";
import tseslint from "typescript-eslint";
import prettier from "eslint-config-prettier";

export default tseslint.config(
  {
    ignores: ["dist/**", "node_modules/**", ".astro/**"],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...astroPlugin.configs["flat/recommended"],
  {
    files: ["**/*.astro"],
    languageOptions: {
      parser: astroPlugin.parser,
      parserOptions: {
        parser: tseslint.parser,
        extraFileExtensions: [".astro"],
      },
    },
  },
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        Astro: "readonly",
      },
    },
  },
  {
    rules: {
      ...prettier.rules,
    },
  }
);
