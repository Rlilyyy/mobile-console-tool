import util from './Util.js';
export default function() {
  util.addEventListener(window, 'load', function() {

    let style = document.querySelector('style') || document.createElement('style');
    if (!!style) {
      style.innerHTML = ``;
    }
  }, false);
}
