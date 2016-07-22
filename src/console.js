import util from './Util.js';

(function(window, document, util) {
  let root = window,
      doc = document;

  const DEBUG_CONTAINER_ID = 'console-list';

  let logs = [];

  let loaded = false;
  let consoles = ['log', 'warn', 'info', 'error'];
  let out = {};

  for(let value of consoles) {

    console[`_${ value }`] = console[value];

    out[value] = (...args) => {
      if (loaded) {
        let item = `<li class="console-list-item ${ value }">${ util.output(args) }</li>`;
        doc.getElementById(DEBUG_CONTAINER_ID).innerHTML += item;

      } else {
        logs.push({
          type: value,
          msg: args.length === 1 ? args[0] : args,
          stack: ''
        });
      }
    };

    console[value] = (...args) => {
      console[`_${ value }`].apply(console, args);
      out[value].apply(root, args);
    };
  }

  util.addEventListener(root, 'load', function() {
    loaded = true;

    let log = null;
    while(log = logs.shift()) {
      console._log(log);
      let { type, msg, stack } = log;
      out[type](msg, stack);
    }
  });

  util.addEventListener(root, 'error', function(event) {
    let { message, error } = event;
    let { stack } = error;

    if (loaded) {
      out.error(typeof message);
    } else {
      console._log(message);
      logs.push({
        type: 'error',
        msg: message,
        stack: `\n${ stack }`
      });
    }
  });

})(window, document, util);
