import plugin from '../index.js';

export default {
  plugins: {
    'code-checker': plugin
  },

  rules: {
    'code-checker/no-console-left': 'error',
    'code-checker/no-includes-query': 'error',
    'code-checker/require-try-catch-api': 'error',
    'code-checker/no-paginate-false': 'warn'
  }
};
