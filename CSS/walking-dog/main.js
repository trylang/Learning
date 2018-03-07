!function() {
  class DogAnimation {
    constructor(canvas) {
      this.canvas = canvas;
      canvas.width = window.innerWidth;
      window.onresize = () => canvas.width = window.innerWidth;
      canvas.height = 200;
      // 记录上一帧的时间
      this.lastWalkingTime = Date.now();
      // 当前画的图片索引
      this.keyFrameIndex = -1;
      this.ctx = this.canvas.getContext("2d");
      // 图片目录
      this.RES_PATH = './dog';
      this.IMG_COUNT = 8;
      this.dog = {
        // 一步10px
        stepDistance: 9,
        // 狗的速度
        speed: 0.15,
        // 鼠标的x坐标
        mouseX: -1,
        // 往前走停留的位置
        frontStopX: -1,
        // 往回走停留的位置
        backStopX: window.innerWidth
      };

    }

    async start() {
      await this.loadResources();
      this.pictureWith = this.dogPictures[0].naturalWidth / 2;
      console.log(this.pictureWith);
      console.log(this.dogPictures[0].naturalWidth);
      // 小狗初始化的位置放在最右边
      this.dog.mouseX = window.innerWidth - this.pictureWith;
      this.recordMousePosition();
      //实际上为了画逐帧动画，我们要使用window.requestAnimationFrame，
      //这个函数在浏览器画它自己的动画的下一帧之前会先调一下这个函数，理想情况下，1s有60帧，即帧率为60 fps。
      //因为不管是播放视频还是浏览网页它们都是逐帧的，例如往下滚动网页的时候就是一个滚动的动画，所以浏览器本身也是在不断地在画动画，
      //只是当你的网页停止不动时（且页面没有动画元素），它可能会降低帧率减少资源消耗。
      window.requestAnimationFrame(this.walk.bind(this));
    }

    // 加载图片
    loadResources() {
      let imagesPath = [];
      for(let i = 0; i <= this.IMG_COUNT; i++) {
        imagesPath.push(`${this.RES_PATH}/${i}.png`);
      }
      let works = [];
      imagesPath.forEach(imgPath => {
        works.push(new Promise(resolve => {
          let img = new Image();
          img.onload = () => resolve(img);
          img.src = imgPath;
        }))
      });
      return new Promise(resolve => {
        Promise.all(works).then(dogPictures => {
          this.dogPictures = dogPictures;
          resolve();
        })
      });

    }

    // 记录鼠标位置
    recordMousePosition() {
      window.addEventListener('mousemove', event => {
        // 如果没减掉图片的宽度，小狗就跑到鼠标后面去了，因为图片的宽度还要占去空间
        this.dog.frontStopX = event.clientX - this.pictureWith;
        this.dog.backStopX = event.clientX;
      });
      window.addEventListener('touchstart', event => {
        this.dog.frontStopX = event.touches[0].clientX - this.pictureWith;
        this.dog.backStopX = event.touchs[0].clientX;
      });
    }

    walk() {
      let now = Date.now();
      let diffDistance = (now - this.lastWalkingTime) * this.dog.speed;
      if(diffDistance < this.dog.stepDistance) {
        window.requestAnimationFrame(this.walk.bind(this));
        return;
      }
      this.keyFrameIndex = ++this.keyFrameIndex % this.IMG_COUNT;
      let direct = -1, stopWalking = false;
      // 如果鼠标在狗的前面则往前走
      if(this.dog.frontStopX > this.dog.mouseX) {
        direct = 1;
      }
      // 如果鼠标在狗的后面则往回走
      else if(this.dog.frontStopX < this.dog.mouseX) {
        direct = -1;
      }
      // 如果鼠标在狗的位置
      else {
        stopWalking = true;
        // 初始化的时候小狗的反方向的，frontStopX为初始值-1
        // 说明鼠标还没动过
        direct = this.dog.frontStopX === -1 ? -1 :
                  this.dog.backStopX - this.dog.mouseX 
                  > this.pictureWith /2 ? 1 : -1;
        this.keyFrameIndex = -1;
      }

      let ctx = this.ctx;
      ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      ctx.save();

      if(!stopWalking) {
        this.dog.mouseX += this.dog.stepDistance * direct;
      }
      // 鼠标在小狗左右来回移动时，小狗会转头, 得到小狗的位置和方向之后就是画上去，正方向的还好，反方向的由于没图片，我们通过canvas的翻转flip进行绘制，如下代码所示：
      if(direct === -1) {
        // 左右翻转绘制
        ctx.scale(direct, 1);
      }
      let img = this.dogPictures[this.keyFrameIndex + 1];
      let drawX = 0;
      // 左右翻转绘制的位置需要计算一下
      drawX = this.dog.mouseX * direct - 
              (direct === 1 ? this.pictureWith : 0);
      console.log(this.dogPictures);
      ctx.drawImage(img, 0, 0, img.naturalWidth, img.naturalHeight, 
                      drawX, 20, 186, 162);
      ctx.restore();
      this.lastWalkingTime = now;
      window.requestAnimationFrame(this.walk.bind(this));
    }
  }
  let canvas = document.querySelector("#dog-walking");
  let dogAnimation = new DogAnimation(canvas);
  dogAnimation.start();
}();

// save：用来保存Canvas的状态。save之后，可以调用Canvas的平移、放缩、旋转、错切、裁剪等操作。 
// restore：用来恢复Canvas之前保存的状态。防止save后对Canvas执行的操作对后续的绘制有影响。