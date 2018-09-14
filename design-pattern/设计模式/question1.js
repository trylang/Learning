/**
 * 第一题
 * 1. 某停车场，分三层，每层100车位
 * 2. 每个车位都能监控到车辆得驶入和离开
 * 3. 车辆进入前，显示每层得空余车位数量
 * 4. 车辆进入时，摄像头可识别车牌号和时间
 * 5. 车辆出来时，出口显示器显示车牌号和停车时长
 */

// 摄像头
class Camera {
  shot(car) {
    return {
      num: car.num,
      inTime: Date.now()
    }
  }
}

// 出口显示屏
class Screen {
  show(car, inTime) {
    console.log(`车牌号${car.num}: 停车时间：${Date.now() - inTime}`);
  }
}

// 停车场
class Park {
  constructor(floors) {
    this.floors = floors || [];
  }
  in(car) {

  }
  out(car) {

  }
  emptyNum() { //所有停车场剩余车位
    return this.floors.map(floor => {
      return `${floor.index}层还有${floor.emptyPlaceNum()}个空闲车位`;
    }).join('\n');
  }
}

// 楼层
class Floor {
  constructor(index, places) {
    this.index = index;
    this.places = places || [];
  }

  emptyPlaceNum() { //每层楼剩余数量
    let num = 0;
    this.places.forEach(item => {
      if (item.empty) num++;
    });
    return num;
  }
}

// 车位
class Place {
  constructor() {
    this.empty = true;
  }
  in() {
    this.empty = false;
  }
  out() {
    this.empty = true;
  }
}

// 

