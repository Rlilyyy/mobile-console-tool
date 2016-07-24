import util from './util.js';
import handler from './handler.js';

(function(window, document, util, handler) {
  let root = window,
      doc = document;

  const DEBUG_CONTAINER_ID = 'console-list';
  const types = ['log', 'warn', 'info', 'error'];

  handler.init();

  types.forEach(type => {
    console[`_${type}`] = console[type];

    console[type] = (...args) => {
      handler.show(type, args);
    };
  });

})(window, document, util, handler);
