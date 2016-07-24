import util from './util.js';

class Template {
  constructor() {

  }

  getLogTemplate(arg) {
    let template = `<li class="console-list-item">${ arg }</li>`;
  }

  getWarnTemplate(arg) {

  }

  getInfoTemplate(arg) {

  }

  getErrorTemplate(arg) {

  }

  getTemplateByType(arg) {
    if (util.isObject(arg)) {

    } else if (util.isArray(arg)) {

    } else if (util.isFunction(arg) || util.isSymbol(arg)) {

    } else {

    }
  }
}
