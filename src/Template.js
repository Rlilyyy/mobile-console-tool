import util from './util.js';

class Template {
  constructor() {

  }

  getLogTemplate(arg) {
    let template = `<li class="console-list-item">${ arg }</li>`;
  }

  getWarnTemplate(arg) {
    let template = `<li class="console-list-item warn">${ arg }</li>`;
  }

  getInfoTemplate(arg) {
    let template = `<li class="console-list-item info">${ arg }</li>`;
  }

  getErrorTemplate(arg) {
    let template = `<li class="console-list-item error">${ arg }</li>`;
  }

  getTemplateByType(arg) {
    if (util.isObject(arg)) {
      for (let [ key, value ] of Object.entries(arg)) {
        
      }
    } else if (util.isArray(arg)) {

    } else if (util.isFunction(arg) || util.isSymbol(arg)) {

    } else {

    }
  }
}
