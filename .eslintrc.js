module.exports = {
  env: {
    browser: true,
    es2020: true
  },
  extends: [
    'standard'
  ],
  parserOptions: {
    ecmaVersion: 11,
    sourceType: 'module'
  },
  rules: {
    "arrow-parens": [2, "as-needed"],
    "no-underscore-dangle": [
      2,
      { "allow": ["_id"] }
    ],
    "comma-dangle": [
      "error",
      {
        "arrays": "always-multiline",
        "objects": "always-multiline"
      }
    ],
    "no-unused-vars": [
      2,
      {
        "argsIgnorePattern": "^_*",
        "varsIgnorePattern": "^_*"
      }
    ],
    "semi": [2, "always"]
  }
}
