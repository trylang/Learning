// 接收者
class Reciver {
  cmd() {
    console.log('Invoker 执行');
  }
}

// 命令者
class Command {
  constructor(reciver) {
    this.reciver = reciver;
  }
  cmd() {
    console.log('Invoker 命令');
    this.reciver.cmd();
  }
}

// 
class Invoker {
  constructor(command) {
    this.command = command;
  }
  cmd() {
    console.log('Invoker 发布');
    this.command.cmd();
  }
}

let reciver = new Reciver();
let command = new Command(reciver);
let gender = new Invoker(command);
gender.cmd();