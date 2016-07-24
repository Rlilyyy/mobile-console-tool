class Handler {
  constructor() {
    this.loaded = false;
    this.caches = [];
  }

  isLoaded() {
    return this.loaded;
  }

  loaded() {
    this.loaded = true;
  }

  hasCache() {
    return this.caches.length > 0;
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
    args.forEach(arg => {
      this.showByType(type, arg);
    });
  }

  showByType(type, arg) {
    switch (type) {
      case 'log':
        util.log(arg);
        break;
      case 'warn':
        util.warn(arg);
        break;
      case 'info':
        util.info(arg);
        break;
      case 'error':
        util.error(arg);
        break;
    }
  }

  cache(type, args) {
    args.forEach(arg => {
      this.caches.push({type, args});
    });
  }
}
