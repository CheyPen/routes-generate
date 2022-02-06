module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    jest: true // 支持jest
  },
  extends: 'standard',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module'
  },
  rules: {
    'space-before-function-paren': ['error', 'never']
  },
};
