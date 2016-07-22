let author = 'Rlilyyy';

let types = ['Object', 'Array', 'RegExp', 'Function', 'Number', 'Boolean', 'Symbol', 'String'];

class Util {
  constructor() {

  }

  toString() {
    return `Hello, there is ${ author }, looooooool= =`;
  }


  /**
   * 兼容性事件添加，attachEvent 无法接收 event 参数，并且 this 被绑定在 window 上，所以需要指定
   * @param  {Object} target     添加事件目标节点
   * @param  {String} event      添加事件名称
   * @param  {Function} func     添加事件回调函数
   * @param  {Boolean} flag=false 事件是否在捕获阶段获取，默认为 false，仅在支持原生 addEventListener 的浏览器下有效
   * @return {void}
   */
  addEventListener(target, event, func, flag=false) {
    if (target.addEventListener) {
      target.addEventListener(event, func, flag);
    } else if (target.attachEvent) {
      target.attachEvent(`on${ event }`, function() {
        func.call(target, window.event);
      });
    } else {
      if (!!target[`on${ event }`]) {
        let oldEvent = target[`on${ event }`];

        target[`on${ event }`] = function(event) {
          oldEvent.call(this, event);
          func.call(this, event);
        }
      } else {
        target[`on${ event }`] = func;
      }
    }
  }

  output(args) {
    let outputs = '';
    args.forEach(arg => {

      if (this.isObject(arg) || this.isArray(arg)) {
        outputs += JSON.stringify(arg);
      } else if (this.isRegExp(arg) || this.isFunction(arg) || this.isSymbol(arg)) {
        outputs += arg.toString();
      } else {
        outputs += arg;
      }

    });
    return outputs;
  }
};

types.forEach(type => {
  Util.prototype[`is${ type }`] = (function(type) {
    return function(obj) {
      return Object.prototype.toString.call(obj) === `[object ${ type }]`;
    }
  })(type);
});

let util = new Util();
export default util;
