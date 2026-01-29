export default {
  meta: {
    type: 'problem',
    messages: {
      noConsole: '❌ console logs are not allowed. Please clear console logs.'
    }
  },

  create(context) {
    return {
      MemberExpression(node) {
        if (node.object?.name !== 'console') return;

        const method = node.property?.name;

        // ❌ block these
        const forbidden = ['log', 'debug', 'info', 'warn'];

        if (forbidden.includes(method)) {
          context.report({
            node,
            messageId: 'noConsole'
          });
        }
      }
    };
  }
};
