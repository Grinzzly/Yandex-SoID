/* eslint-disable no-underscore-dangle, no-param-reassign, no-console */

export default {
  bind(el, binding, vNode) {
    // Provided expression must evaluate to a function.
    if (typeof binding.value !== 'function') {
      const compName = vNode.context.name;
      let warn = `[Vue-click-outside:] provided expression '${binding.expression}' is not a function, but has to be`;
      if (compName) { warn += `Found in component '${compName}'`; }

      console.warn(warn);
    }
    const handler = (e) => {
      if (!el.contains(e.target) && el !== e.target) {
        binding.value(e);
      }
    };
    el.__vueClickOutside__ = handler;

    // add Event Listeners
    document.addEventListener('click', handler);
  },

  unbind(el) {
    // Remove Event Listeners
    document.removeEventListener('click', el.__vueClickOutside__);
    el.__vueClickOutside__ = null;
  },
};
