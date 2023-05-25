/** @type {import("eslint").Linter.Config['rules']} */
const offRules = {
  "@typescript-eslint/no-explicit-any": "off",
  "@typescript-eslint/no-unsafe-assignment": "off",
  "@typescript-eslint/no-unsafe-member-access": "off",
  "@typescript-eslint/no-floating-promises": "off",
  "@typescript-eslint/no-misused-promises": "off",
  "@typescript-eslint/no-empty-function": "off",
  "@typescript-eslint/no-unsafe-call": "off",
  "@typescript-eslint/no-unsafe-return": "off",
  "@typescript-eslint/require-await": "off",
  "@typescript-eslint/no-unused-vars": "off",
  "react/no-unescaped-entities": "warn",
  "react/prop-types": "off",
  "react/jsx-key": "warn",
};

/** @type {import("eslint").Linter.Config} */
const config = {
  overrides: [
    {
      extends: [
        "plugin:@typescript-eslint/recommended-requiring-type-checking",
      ],
      files: ["*.ts", "*.tsx"],
      parserOptions: {
        project: "tsconfig.json",
      },
      rules: {
        ...offRules,
      },
    },
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "./tsconfig.json",
  },
  plugins: ["@typescript-eslint"],
  extends: ["next/core-web-vitals", "plugin:@typescript-eslint/recommended"],
  rules: {
    ...offRules,
    "@typescript-eslint/consistent-type-imports": [
      "warn",
      {
        prefer: "type-imports",
        fixStyle: "inline-type-imports",
      },
    ],
  },
};

module.exports = config;
