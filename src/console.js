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
        let item = `<li class="console-list-item ${ value } ${ value === 'error' ? 'close' : '' }">${ util.output(args) }</li>`;
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

    util.addEventListener(doc.getElementById(DEBUG_CONTAINER_ID), 'click', function(event) {
      let e = event || window.event;
      let target = e.target || e.srcElement;

      let className = target.className;

      if (/close/.test(target.className)) {
        target.className = className.replace(/close/, 'open');
      } else if (/open/.test(target.className)) {
        target.className = className.replace(/open/, 'close');
      }
    }, false);

    loaded = true;

    let log = null;
    while(log = logs.shift()) {
      let { type, msg, stack } = log;
      out[type](msg + stack);
    }
  });

  util.addEventListener(root, 'error', function(event) {
    let { message, error } = event;
    let { stack } = error;

    let stackPath = stack.split(/\n/);
    let errorStack = '';
    stackPath.forEach((path, idx) => {
      if (idx > 0) {
        errorStack += `<div class="stack" style="padding-left: 15px">${ path }</div>`;
      } else {
        errorStack += `<div class="stack">${ path }</div>`;
      }
    });


    if (loaded) {
      out.error(typeof message);
    } else {
      logs.push({
        type: 'error',
        msg: message,
        stack: errorStack
      });
    }
  });



})(window, document, util);
