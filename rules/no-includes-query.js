export default {
  meta: {
    type: 'problem',
    messages: {
      tooManyIncludes:
        '❌ Too many includes ({{count}}). Maximum allowed is 3. Use payload includes instead.'
    }
  },

  create(context) {
    function checkString(value, node) {
      if (!value.includes('includes=')) return;

      const match = value.match(/includes=([^&]+)/);
      if (!match) return;

      const includes = match[1]
        .split(',')
        .map(i => i.trim())
        .filter(Boolean);

      if (includes.length > 3) {
        context.report({
          node,
          messageId: 'tooManyIncludes',
          data: {
            count: includes.length
          }
        });
      }
    }

    return {
      Literal(node) {
        if (typeof node.value === 'string') {
          checkString(node.value, node);
        }
      },

      TemplateLiteral(node) {
        // only static template literals
        if (node.expressions.length === 0) {
          const raw = node.quasis[0]?.value?.raw;
          if (raw) {
            checkString(raw, node);
          }
        }
      }
    };
  }
};
