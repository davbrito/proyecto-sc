/**
 * @type {import("prettier").Config &
 *   import("prettier-plugin-tailwindcss").PluginOptions}
 */
const config = {
  trailingComma: "es5",
  plugins: ["prettier-plugin-jsdoc", "prettier-plugin-tailwindcss"],
  tailwindFunctions: ["clsx"],
};

module.exports = config;
