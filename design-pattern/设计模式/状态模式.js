/**
 * 介绍：
 * 1. 一个对象有状态变化；
 * 2. 每次状态变化都会触发一个逻辑；
 * 3. 不能总是用if...else来控制；
 * 
 *  场景：1. 有限状态机； 2.
 */

// 状态 （红，绿，黄灯）
class State {
  constructor(color) {
    this.color = color;
  }
  handle(context) {
    console.log( `${this.color}灯亮了`);
    context.setState(this)
  }
}

class Context {
  constructor() {
    this.state = null;
  }
  getState() {
    return this.state;
  }
  setState(state) {
    this.state = state;
  }
}

// test
let context = new Context();
let green = new State('green');

green.handle(context);
console.log(context.getState())