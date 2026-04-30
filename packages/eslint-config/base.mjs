import js from "@eslint/js";
import importPlugin from "eslint-plugin-import";
import tseslint from "typescript-eslint";

/**
 * Shared base ESLint config for the puzzles monorepo.
 * Apps extend this and can add framework-specific rules on top.
 *
 * @param {{ tsconfigPath?: string, tsconfigRootDir?: string }} [options]
 */
export const baseConfig = ({
  tsconfigPath = "./tsconfig.json",
  tsconfigRootDir,
} = {}) => [
  {
    ignores: [
      ".next/**",
      ".expo/**",
      "node_modules/**",
      "dist/**",
      "next-env.d.ts",
      "expo-env.d.ts",
      "coverage/**",
    ],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    languageOptions: {
      parserOptions: {
        tsconfigRootDir,
      },
    },
    plugins: {
      import: importPlugin,
    },
    settings: {
      "import/resolver": {
        typescript: {
          alwaysTryTypes: true,
          project: tsconfigPath,
        },
        node: true,
      },
    },
    rules: {
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],

      "no-restricted-syntax": [
        "error",
        {
          selector: "FunctionDeclaration[id.name=/^[a-z]/]",
          message:
            "Use an arrow function for non-component functions. `function` declarations are reserved for React components (PascalCase).",
        },
        {
          selector:
            "ExportDefaultDeclaration > FunctionDeclaration[id.name=/^[a-z]/]",
          message:
            "Use an arrow function (or PascalCase component) instead of a default-exported lowercase function declaration.",
        },
        {
          selector:
            "VariableDeclarator[init.type='FunctionExpression'][init.id=null]",
          message:
            "Use an arrow function instead of `const x = function () {}`.",
        },
      ],
      "prefer-arrow-callback": ["error", { allowNamedFunctions: false }],

      "import/order": [
        "error",
        {
          groups: [
            "builtin",
            "external",
            "internal",
            "parent",
            "sibling",
            "index",
            "type",
          ],
          pathGroups: [
            {
              pattern: "next",
              group: "external",
              position: "after",
            },
            {
              pattern: "next/**",
              group: "external",
              position: "after",
            },
            {
              pattern: "@puzzles/**",
              group: "internal",
              position: "before",
            },
            {
              pattern: "@/app/**",
              group: "internal",
              position: "before",
            },
            {
              pattern: "@/pages/**",
              group: "internal",
              position: "before",
            },
            {
              pattern: "@/widgets/**",
              group: "internal",
              position: "before",
            },
            {
              pattern: "@/features/**",
              group: "internal",
              position: "before",
            },
            {
              pattern: "@/entities/**",
              group: "internal",
              position: "before",
            },
            {
              pattern: "@/shared/**",
              group: "internal",
              position: "before",
            },
          ],
          pathGroupsExcludedImportTypes: ["next", "type"],
          "newlines-between": "always",
          alphabetize: {
            order: "asc",
            caseInsensitive: true,
          },
        },
      ],
      "import/no-duplicates": "error",
      "import/first": "error",
      "import/newline-after-import": "error",
    },
  },
];

export default baseConfig;
