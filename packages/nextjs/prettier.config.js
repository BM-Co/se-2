/** @type {import('prettier').Config} */
const config = {
  semi: false,
  singleQuote: true,
  trailingComma: 'all',
  printWidth: 120,
  plugins: [require('prettier-plugin-tailwindcss')],
  parser: 'babel-ts',
}

module.exports = config
