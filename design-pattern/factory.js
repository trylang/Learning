/**
 *  factory 工厂设计模式
 * 
 *  定义
 *  工厂模式是另一个有关创建对象概念的模式。它和其他的设计模式的区别在于它没有显示地要求我们使用构造函数，
 *  相反，它为创建对象提供一个通用的接口，用这个接口我们可以创建我们希望创建的指定类型的工厂对象。
 * 
 *  直入话题工厂模式是我们最常用的模式了,著名的前端框架Bootstrap以及服务端基于NodeJS的框架(ExpressJS) ,
 *  就使用了工厂模式，工厂模式在JS程序中可以说是随处可见。为什么工厂模式是如此常用？因为工厂模式就相当于创建实例对象的new，
 *  我们经常要根据类生成实例对象，如var button = new Button({}); 工厂模式也是用来创建实例对象的，
 *  所以以后当我们通过new创建对象时就可以思考一下是否可以用工厂模式来代替，可能多做一些工作，但会给你系统带来更大的可扩展性和尽量少的修改量。
 * 
 *  简单工厂------ 简单工厂的特点就是参数化创建对象，简单工厂必须知道每一种产品以及何时提供给客户端。
 *  有人会说简单工厂还是换汤不换药，添加新类的时候还是需要修改这部分的代码！那么我们获得了什么好处呢？集中变化！ 
 *  这很好的符合了DRY原则，DRY———Don't Repeat Yourself Principle，直译为“不要重复自己”原则^_^ 创建逻辑存放在单一的位置，即使它变化，我们也只需要修改一处就可以了。
 *  DRY 很简单，但却是确保我们代码容易维护和复用的关键。DRY原则同时还提醒我们：对系统职能进行良好的分割！职责清晰的界限一定程度上保证了代码的单一性。
 *  这句话对我们后续的分析极具指导意义，毕竟简单工厂只是低层次上的代码复用
 * 
 *  实例说明
 *  假如我们有一个UI工厂，我们被要求创建一个UI组件类型。我们不用心操作符创建这个组件，也不是通过另一个creational 构造函数创建这个组件，而是向工厂对象请求一个新的组件。
 *  我们通知工厂我们需要什么类型的对象，例如：‘button’，‘panel’，它会实例化它，然后返回给我们使用。
 *  这种模式的的例子在ExtJS这样的UI库总很常见，在那里，创建对象或组件的方法可以进一步划分。
 */

 // Types.js - 在以后场景中需要用到的构造函数
 // 定义新UI的构造函数

  // 按钮Button
  function Button(options) {
    // 默认参数
    this.type = options.type || 'primary';
    this.size = options.size || 'small';
    this.className = options.className || 'submit';
    this.style = options.style || {'height': 18};
  }

  Button.prototype.show = true;
  Button.prototype.onClick = function(){};

  // 卡片Card
  function Card(options) {
    this.title = options.title || '卡片标题';
    this.imgUrl = options.imgUrl || '这是卡片的图片地址';
    this.extra = options.extra || '卡片的副标题';
  }

  //定义一个UI工厂骨架
  function UIFactory() {};

  // 为工厂定义 prototypes 和 utilities

  // 默认 UIClass 是Button
  UIFactory.prototype.UIClass = Button;

  // 创建新UI实例的工厂方法
  UIFactory.prototype.createUI = function(options) {
    switch(options.UItype) {
      case 'button': 
        this.UIClass = Button;
        break;
      case 'card': 
        this.UIClass = Card;
        break;
    }
    return new this.UIClass(options);
  }

  // 创建一个Card类的工厂实例
  var cardFactory = new UIFactory();
  var card = cardFactory.createUI({
    UItype: 'card',
    imgUrl: 'hahahaha,是图片哈',
    extra: '标题是郎朗加油'
  });

  // 测试确认我们的card用 UIClass/prototype Card 创建的
  console.log(card instanceof Card);
  console.log(card);


  // 我们用UIFactory子类创建一个button工厂类
  function ButtonFactory() {};
  ButtonFactory.prototype = new UIFactory();
  ButtonFactory.prototype.UIClass = Button;

  var buttonFactory = new ButtonFactory();
  var myButton = buttonFactory.createUI({
    type : 'warning',
    size : 'big',
    className : 'show',
    style : {'display': 'block'}
  });

  console.log(myButton instanceof Button);
  console.log(myButton);


  /**
   *  什么时候用工厂模式 
   *  有以下情况出现时工厂模式会很好用： 
   *  1.当我们的对象或组件的设置有一很高的复杂度时； 
   *  2.当我们需要根据所处的环境生成不同的对象实例时； 
   *  3.当我们处理很多小对象或组件时，它们共享相同的属性 
   *  4.当用其他对象的实例组合对象时，只需要满足API的约定（aka， duck typing）就可以工作了。这对于解耦很有用
   *  
   *  什么时候不用工厂模式
   *  当应用到作物类型的问题时，这种设计模式会给程序带来不必要的复杂性。除非为对象创建提供接口是我们正在编写的库或框架的设计目标，否则建议继续使用显示构造函数来避免不必要的开销。
   *  由于对象创建的过程时在一个接口后面进行抽象的，所以这也可能导致单元测试的问题，这取决于这个过程可能有多复杂。
   */


   /**
    * 抽象工厂------抽象工厂向客户端提供了一个接口，使得客户端在不指定具体产品类型的时候就可以创建产品中的产品对象。这就是抽象工厂的用意。
    * 抽象工厂面的问题是多个等级产品等级结构的系统设计。抽象工厂和工厂方法模式最大的区别就在于后者只是针对一个产品等级结构；而抽象工厂则是面对多个等级结构。
    * 同样出色的完成了把应用程序从特定的实现中解耦，工厂方法使用的方法是继承，而抽象工厂使用的对象组合。
    * 抽象工厂提供的是一个产品家族的抽象类型，这个类型的子类完成了产品的创建。
    */

    
    /**
     * 了解抽象的工厂模式也是很有用的，它的目标是将一组具有共同目标的单个工厂封装起来。它将一组对象的实现细节与它们的一般用法分离开来。
     * 抽象的工厂模式应该被使用在系统必须独立于它创建的对象的方式情况下，或者它需要处理多种类型的对象。
     * 
     * 紧接上面的例子，UIFactory它定义了获取和注册UI类型的方法。抽象的工厂可以命名AbstractUIFactory，
     * 它允许对UI的类型进行定义，如：button，card，具体的工厂将只实现满足类型的 UI组件.prototype.show 和 UI组件.prototype.onClick
     */

     var abstractUIFactory = (function() {

      // 存储UI的类型
      var types = {};
      return {
        getUI: function(type, options) {
          var UI = types[type];
          return UI ? new UI(options) : null;
        },

        registerUI: function(type, UI) {
          var proto = UI.prototype;

          // 仅注册有ui contract的
          if(proto.show && proto.onClick) {
            types[type] = UI;
          }

          return abstractUIFactory;
        }
      }

     })();

     // Usage:
     abstractUIFactory.registerUI('card', Card);
     abstractUIFactory.registerUI('button', Button);

     var card = abstractUIFactory.getUI('card', {
      UItype: '抽象——card',
      imgUrl: '抽象——hahahaha,是图片哈',
      extra: '抽象——标题是郎朗加油'
     });

     var button = abstractUIFactory.getUI('button', {
      type : '抽象——warning',
      size : '抽象——big',
      className : '抽象——show',
      style : {'display': '抽象——block'}
     });

     console.log(card);
     console.log(button);

     /**
      * 题外话：简单工厂的确简单但是其背后的DRY原则在实践中让我们受益匪浅，去年我和我的搭档做站点的升级工作，写了很多重复的代码；代码重复，源代码组织混乱，没有做好规划和职责分析是原罪。今年新项目，DRY原则是我头顶的达摩克利斯之剑，不做重复的事情成为我进行项目计划组织管理的重要标准。

      * 关于工厂模式的阶段总结：

      * 识别变化隔离变化，简单工厂是一个显而易见的实现方式

      * 简单工厂将创建知识集中在单一位置符合了DRY

      * 客户端无须了解对象的创建过程，某种程度上支持了OCP

      * 添加新的产品会造成创建代码的修改，这说明简单工厂模式对OCP支持不够

      * 简单工厂类集中了所有的实例创建逻辑很容易违反高内聚的责任分配原则
      */


      /**
       * 总结一下
       *
       *（1），我们需要将创建实例的工作与使用实例的工作分开
       *（2），封装(Encapsulation)和分派(Delegation)告诉我们，
       * 尽量将长的代码分派"切割"成每段，将每段再"封装"起来(减少段和段之间偶合联系性)，
       * 这样，就会将风险分散，以后如果需要修改，只要更改每段，不会再发生牵一动百的事情。
       * 
       */

