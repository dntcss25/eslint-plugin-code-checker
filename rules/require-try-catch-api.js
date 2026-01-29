export default {
  meta: {
    type: 'problem',
    messages: {
      noTryCatch: '❌ All API calls must be wrapped in try–catch.'
    }
  },

  create(context) {
    function isInsideTry(node) {
      let current = node.parent;
      while (current) {
        if (current.type === 'TryStatement') return true;
        current = current.parent;
      }
      return false;
    }

    function isApiCall(call) {
      if (!call || call.type !== 'CallExpression') return false;

      const callee = call.callee;

      // ✅ read(), create(), update()
      if (
        callee.type === 'Identifier' &&
        ['read', 'create', 'update'].includes(callee.name)
      ) {
        return true;
      }

      // ✅ useAPI().read()
      if (
        callee.type === 'MemberExpression' &&
        ['read', 'create', 'update'].includes(callee.property?.name)
      ) {
        return true;
      }

      // ✅ useFetch() / $fetch()
      if (
        callee.type === 'Identifier' &&
        ['useFetch', '$fetch'].includes(callee.name)
      ) {
        return true;
      }

      return false;
    }

    return {
      AwaitExpression(node) {
        const call = node.argument;

        if (!isApiCall(call)) return;

        if (!isInsideTry(node)) {
          context.report({
            node,
            messageId: 'noTryCatch'
          });
        }
      }
    };
  }
};
