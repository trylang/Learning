
// https://juejin.im/post/5b19e81de51d454e907bd1c5?utm_source=gold_browser_extension

const Vue = function(options) {
  
}

const Observer = function(data) {
  for (let key in data) {
    defineReactive(data, key);
  }
}

const defineReactive = function(obj, key) {
  const dep = new Dep();
}

const Dep = function() {
  const self = this;
  this.target = null;
  this.subs = [];

  this.depend = function() {
    if (Dep.target) {
      Dep.target.addDep(self);
    }
  }
  this.addSub = function(watcher) {
    self.subs.push(watcher);
  }

}

const Watcher = function(vm, fn) {
  const self = this;
  this.vm = vm;
  console.log(Dep);
  Dep.target = this;

  this.addDep = function(dep) {
    dep.addSub(self);
  }

  this.update = function() {
    console.log('in watcher update');
    fn();
  }

  this.value = fn();
  Dep.target = null;

}