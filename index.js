import noConsole from './rules/no-console-left.js';
import noIncludes from './rules/no-includes-query.js';
import requireTryCatch from './rules/require-try-catch-api.js';
import noPaginate from './rules/no-paginate-false.js';

export default {
  rules: {
    'no-console-left': noConsole,
    'no-includes-query': noIncludes,
    'require-try-catch-api': requireTryCatch,
    'no-paginate-false': noPaginate
  }
};
