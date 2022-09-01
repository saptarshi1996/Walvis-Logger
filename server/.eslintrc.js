module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
  },
  extends: [
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  rules: {
    'no-var': 'warn',
    'no-unused-vars': 'error',
    'no-async-promise-executor': 'off',
    'no-useless-escape': 'off',
    'no-multi-assign': 0,
    'global-require': 0,
    camelcase: 'off',
    'max-len': 0,
    'no-console': 0,
    'linebreak-style': 0,
    'comma-dangle': 0,
  },
};
