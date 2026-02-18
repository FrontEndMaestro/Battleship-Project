import config from "eslint-config-standard";
import eslintConfigPrettier from "eslint-config-prettier/flat";

/** @type {import('eslint').Linter.Config[]} */
export default [
  ...[].concat(config),
  eslintConfigPrettier,
  {
    overrides: [
      {
        files: ["tests/**/*"],
        plugins: ["jest"],
        env: {
          "jest/globals": true,
        },
      },
    ],
  },
];
