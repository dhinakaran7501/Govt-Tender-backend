import tsParser from "@typescript-eslint/parser";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default [
  ...compat.extends(
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended"
  ),
  {
    languageOptions: {
      parser: tsParser,
      ecmaVersion: 2020,
      sourceType: "module",
    },

    rules: {
      semi: ["error", "always"],
      quotes: ["error", "single"],
      indent: ["error", 2],
      "eol-last": ["error", "always"],
      "no-console": "error",
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": ["warn"],
      eqeqeq: ["error", "always"],
      curly: ["error", "all"],
      "arrow-spacing": ["error", { before: true, after: true }],
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/explicit-function-return-type": "warn",
    },
  },
];
