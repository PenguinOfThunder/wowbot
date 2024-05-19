// @ts-check

import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  // ...tseslint.configs.stylisticTypeChecked,
  {
    languageOptions: {
      parserOptions: {
        tsConfigRootDir: __dirname,
        project: "./tsconfig.json"
      }
    }
  },
  {
    files: ["*.js", "*.mjs"],
    ...tseslint.configs.disableTypeChecked
  }
);
