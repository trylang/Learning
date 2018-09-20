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

// 车辆
class Car {
  constructor(num) {
    this.num = num;
  }
}

// 停车场
class Park {
  constructor(floors) {
    this.floors = floors || [];
    this.camera = new Camera();
    this.screen = new Screen();
    this.carList = {}; // 存储摄像头拍摄返回的车辆信 息  
  }
  in(car) {
    // 通过摄像头获取信息
    const info = this.camera.shot(car);
    // 停到第一层的某个停车位
    const i = parseInt(Math.random() * 100 % 100);
    const place = this.floors[0].places[i];

    // TODO:
    place.in();
    info.place = place;

    // 记录信息
    this.carList[car.num] = info;

  }
  out(car) {
    // 获取信息
    const info = this.carList[car.num];
    // 将停车位清空
    const place = info.place;
    console.log(place);
    place.out();
    // 显示时间
    this.screen.show(car, info.inTime)
    // 清空记录
    delete this.carList;
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

// 测试 ---------------
// 初始化停车场
const floors = [];
for (let i = 0; i < 3; i++) {
  const places = [];
  for (let j = 0; j < 100; j++) {
    places[j] = new Place();
  }
  floors[i] = new Floor(i + 1, places);
}

const park = new Park(floors);

// 初始化车辆
const car1 = new Car(100);
const car2 = new Car(202);
const car3 = new Car(230);

// 执行 ---------------------
console.log(park.emptyNum());

console.log('第一辆车进入');
park.in(car1);
console.log(park.emptyNum());

console.log('第二辆车进入');
park.in(car2);
console.log(park.emptyNum());

console.log('第一辆车出');
park.out(car1);
console.log(park.emptyNum());