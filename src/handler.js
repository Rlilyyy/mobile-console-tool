class Handler {
  constructor() {
    this.loaded = false;
    this.caches = [];
  }

  isLoaded() {
    return this.loaded;
  }

  hasCache() {
    return this.caches.length > 0;
  }

  init() {
    this.loadEventInit();
    this.errorEventInit();
  }

  loadEventInit() {
    util.addEventListener(window, 'load', () => {
      this.loaded = true;
      this.show();

      this.triggleEventInit();
    }, false);
  }

  errorEventInit() {
    util.addEventListener(window, 'error', event => {
      this.show('catchError', event);
    }, false);
  }

  triggleEventInit() {
    util.addEventListener(document.querySelector('#console-list'), 'click', () => {
      // do something here
    }, false);
  }

  show(type, args) {
    if (this.isLoaded() && this.hasCache()) {
      this.showCache();
    } else if(this.isLoaded && !this.hasCache()) {
      this.showImmediately(type, args);
    } else {
      this.cache(type, args);
    }
  }

  showCache() {
    caches.forEach(cache => {
      this.showImmediately(cache.type, cache.args);
    });
  }

  showImmediately(type, args) {
    // 原始 console 正常输出
    console[`_${type}`].apply(console, args);

    args.forEach(arg => {
      this.showByType(type, arg);
    });
  }

  showByType(type, arg) {
    switch (type) {
      case 'log':
        ex.log(arg);
        break;
      case 'warn':
        ex.warn(arg);
        break;
      case 'info':
        ex.info(arg);
        break;
      case 'error':
        ex.error(arg);
        break;
      case 'catchError':
        ex.catchError(arg);
        break;
    }
  }

  cache(type, args) {
    args.forEach(arg => {
      this.caches.push({type, args});
    });
  }
}

let handler = new Handler();
export default handler;
