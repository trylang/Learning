class HeroNode {
  constructor(no = null, name = null, nickname=null, next = null) {
    this.no = no;
    this.name = name;
    this.nickname = nickname;
    // this.next = next;
  }
}

class SingleLinkedList {
  head = new HeroNode(0, '', '');

  add(heroNode) {
    let temp = this.head;
    while(temp.next) {
      temp = temp.next;
    }
    temp.next = heroNode;
    
  }
}