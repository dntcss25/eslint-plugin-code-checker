export default {
  meta: {
    type: 'suggestion',
    messages: {
      paginateFalse:
        '⚠️ paginate=false is discouraged. Consider using optimized endpoints instead.'
    }
  },

  create(context) {
    function isProbablyUrl(value) {
      return (
        value.startsWith('/') ||
        value.startsWith('http') ||
        value.includes('/v1.') ||
        value.includes('/v2.')
      );
    }

    function check(value, node) {
      if (!value.includes('paginate=false')) return;
      if (!isProbablyUrl(value)) return;

      context.report({
        node,
        messageId: 'paginateFalse'
      });
    }

    return {
      Literal(node) {
        if (typeof node.value === 'string') {
          check(node.value, node);
        }
      },

      TemplateLiteral(node) {
        if (node.expressions.length === 0) {
          const raw = node.quasis[0]?.value?.raw;
          if (raw) check(raw, node);
        }
      }
    };
  }
};
