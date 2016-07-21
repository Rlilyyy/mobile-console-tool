(function(window, document) {
  let root = window,
      doc = document;

  const DEBUG_CONTAINER_ID = 'debug-container';

  let logs = [],
      warns = [],
      errors = [];

  let loaded = false;
  let consoles = ['log', 'warn', 'error'];
  let out = {};

  for(let value of consoles) {
    out[value] = (...args) => {
      if (loaded) {
        let item = `<li class="debug-list-item ${ value }">${ args.toString() }</li>`;
        doc.getElementById(DEBUG_CONTAINER_ID).innerHTML += item;
      } else {
        switch (value) {
          case 'log':
            logs.push(args);
            break;
          case 'warn':
            warns.push(args);
            break;
          case 'error':
            errors.push(args);
          default:
            logs.push(args);
            break;
        }
      }
    };
  }

  for(let value of consoles) {
    console[value] = (...args) => {
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

    for(let error of errors) {
      out.error(error);
    }
    for(let log of logs) {
      out.log(log);
    }
  });

  addEventListener(root, 'error', function(event) {
    let { error } = event;
    if (loaded) {
      out.error(error);
    } else {
      errors.push(error);
    }
  });

})(window, document);
