(function(window, document) {
  let root = window,
      doc = document;

  const DEBUG_CONTAINER_ID = 'debug-container';

  let logs = [];

  let loaded = false;
  let consoles = ['log', 'warn', 'info', 'error'];
  let out = {};

  for(let value of consoles) {

    console[`_${ value }`] = console[value];

    out[value] = (...args) => {
      if (loaded) {
        let item = `<li class="debug-list-item ${ value }">${ args.toString() }</li>`;
        doc.getElementById(DEBUG_CONTAINER_ID).innerHTML += item;

      } else {
        logs.push({
          type: value,
          msg: args
        });
      }
    };

    console[value] = (...args) => {
      console[`_${ value }`].apply(console, args);
      out[value].apply(root, [...args]);
    };
  }

  let addEventListener = function(target, event, func, flag=false) {
    if (target.addEventListener) {
      target.addEventListener(event, func, flag);
    } else if (target.attachEvent) {
      target.attachEvent(`on${ event }`, function() {
        func.call(target);
      });
    } else {
      target[`on${ event }`] = func;
    }
  }

  addEventListener(root, 'load', function() {
    loaded = true;

    let log = null;
    while(log = logs.shift()) {
      let { type, msg } = log;
      out[type](msg);
    }
    console.log(logs);
  });

  addEventListener(root, 'error', function(event) {
    let { message } = event;
    if (loaded) {
      out.error(message);
    } else {
      logs.push({
        type: 'error',
        msg: message
      });
    }
  });

})(window, document);
