import vueParser from 'vue-eslint-parser';
import tsParser from '@typescript-eslint/parser';

import codeCheckerRecommended from 'eslint-plugin-code-checker/configs/recommended.js';

export default [
  {
    files: ['**/*.vue'],
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        parser: tsParser
      }
    }
  },

  codeCheckerRecommended
];
