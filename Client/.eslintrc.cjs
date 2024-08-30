/* eslint-env node */
module.exports = {
  root: true,
  env: {
    browser: true, // Allows for browser globals like `window` and `document`
    node: true, // Allows for Node.js globals like `process`
    es2021: true, // Enables modern ECMAScript features
  },
  extends: ["plugin:vue/vue3-essential", "eslint:recommended"],
  parserOptions: {
    ecmaVersion: "latest",
  },
};
