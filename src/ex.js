import template from './template.js';

class Ex {
  log(arg) {
    this.appendLog(template.getLogTemplate(arg));
  }

  warn(arg) {
    this.appendLog(template.getWarnTemplate(arg));
  }

  info(arg) {
    this.appendLog(template.getInfoTemplate(arg));
  }

  error(arg) {
    this.appendLog(template.getErrorTemplate(arg));
  }

  catchError(arg) {
    // do something here
  }

  appendLog(template) {
    document.querySelector('#console-list').innerHTML += template;
  }
}
