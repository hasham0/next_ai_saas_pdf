import { dirname } from "path";
import { fileURLToPath } from "url";

import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript", "prettier"),
  {
    rules: {
      "no-console": "off",
      "no-unused-vars": ["off", { argsIgnorePattern: "^_" }],
      "prefer-const": "error",
      "react/no-escape-entities": "off",
      eqeqeq: ["error", "always"],
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-empty-object-type": "off",
    },
  },
];

// const eslintConfig = {
//   ...compat.config({
//     extends: ["next/core-web-vitals", "next/typescript", "prettier"],
//     plugins: ["prettier"],
//     rules: {
//       "no-console": "off",
//       "no-unused-vars": ["off", { argsIgnorePattern: "^_" }],
//       "prefer-const": "error",
//       "prettier/prettier": "error",
//       "react/no-escape-entities": "off",
//       eqeqeq: ["error", "always"],
//       "@typescript-eslint/explicit-function-return-type": "off",
//       "@typescript-eslint/no-explicit-any": "warn",
//       "@typescript-eslint/no-empty-object-type": "off",
//     },
//   }),
// };

export default eslintConfig;
