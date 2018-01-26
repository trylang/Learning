
/**
 *  外观设计模式
 * 
 *  此模式为更大的代码体提供了一个方便的高级接口，隐藏了其真实的底层复杂性。
 *  把它看作是为其他开发人员将API简化，这几乎总能提高可用性。
 * 
 *  外观设计模式在JavaScript的库中很常见，例如JQuery，尽管实现的是可能支持具有广泛行为的方法（如：$('selector')用来获取selector所指代的对象），
 *  但展示给使用者的只是一个 facade 或者这些方法的有限抽象。
 *  
 *  我们经常正面接触的是外观（Facade），而不是外观背后具体实现的子系统。就如我们用jQuery，不管什么时候都是用的 $(el).css()，$(el).animate()，
 *  我们使用的都是用的简单的公共接口，这样避免我们手动调用jQuery core的内部方法，也避免了手动操作与dom的交互和维护状态变量的需要。
 * 
 *  外观设计模式不一定单独使用，它可能和其他设计模式一起使用，例如：Module设计模式，正如我们下面看到的，我们的模块设计模式的实例包含了一些私有的方法。通过外观设计模式可以用一些更简单的API访问这些方法。
 * 
 */

 var module = (function(){
    
    var _private = {
      i: 5,
      get: function() {
        return this.i;
      },
      set: function(val) {
        this.i = val;
      },
      run: function() {
        console.log('running');
      },
      jump: function() {
        console.log('jumping');
      }
    };

    return {
      facade: function(args) {
        _private.set(args.val);
        return _private.get();
        if(args.run) {
          _private.run();
        }
      }
    };

 })();

 // usage
 var val = module.facade({run: true, val:12});
 console.log(val);