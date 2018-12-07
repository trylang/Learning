# Q1 动态设定内容

页面中有一个输入框，和一个按钮。当用户输入文字后，点击按钮，就会把用户输入的文字显示到 output 元素中。

提醒：注意安全问题。

```
<input type="text">
<button>Write</button>
<output></output>

<!-- 请把您的代码写在这里 -->
<script>
function encodeHtml(html){
  return html && html.replace ? 
    (
      html.replace(/&/g, "&amp;") //转换&符号
      .replace(/ /g, "&nbsp;") // 转换空格
      .replace(/\b&nbsp;+/g, " ") // 转换多个空格为单个空格
      .replace(/</g, "&lt;") // 转换小于符号
      .replace(/>/g, "&gt;") // 转换大于符号
      .replace(/\\/g, "&#92;") // 转换斜杠符号
      .replace(/\'/g, "&#39;") // 转换单引号
      .replace(/\"/g, "&quot;") // 转换双引号
      .replace(/\n/g, "<br/>") // 转换换行符号
      .replace(/\r/g, "") //转换回车符号
    )
    : html;
}

document.getElementsByTagName("button")[0].onclick=function(){
  let output = document.getElementsByTagName("output")[0];
  let input = document.getElementsByTagName("input")[0];
  output.innerHTML = encodeHtml(input.value);
};
</script>
```

# Q2 阻止 a 标签跳转

页面里有一些 a 标签，用户点击后会跳转。用 JavaScript 来阻止跳转——使得用户点击后什么事也不发生。该怎么做？

提醒：不要移除这些 a 标签，或者更改他们的任何属性。

```
<div>
    <a href="https://news.ycombinator.com/">
        HackerNews
    </a>
</div>

<!-- 请把您的代码写在这里 -->
方法一：
<script>
document.getElementsByTagName("a")[0].onclick=function(e){
  event.preventDefault();
};
</script>
方法二：
<style>
    a[href] {
        pointer-events: none;
    }
</style>
```

# Q3 实现一个 Promise 函数

```
const sayHello = () => {
	// 在这里写你的代码
    new Promise(resolve => {
    resolve('Hello Promise!')
  }).then(value => {
    console.log(value)
  }, err => {
    console.log(err)
  });
}

// 目标：我们希望这一行执行后输出 "Hello Promise!"
(async () => console.log(await sayHello()))()
```

# Q4 Badge 组件实现

如何实现一个 Badge 组件，类似这样：https://ant.design/components/badge-cn/

提醒：不需要实现所有功能，实现基础的右上角展示红圈，圈内有数字即可。使用 React 方式实现（如果不熟悉 React 则使用 Vue 或纯 JavaScript 亦可）。

可以把你的代码放到 https://codepen.io/ 上（或者其他你喜欢的在线代码编辑站点），将链接贴到这里即可。

[Badge 组件实现地址：https://codepen.io/trylang/pen/NEQeyb](https://codepen.io/trylang/pen/NEQeyb)

# Q5 复杂设备环境下的图片适配问题

场景：当用户使用手机访问页面时，会向其展示一张欢迎图。该图必须全屏显示——注意无论用户的手机屏幕尺寸如何、像素密度如何，都必须全屏展示。

如何才能让设备差异很大的不同用户也能尽可能获得最好的全屏欢迎图显示效果？在此描述可能的方案。

    1. `background-size: 100%;`
    
    2. `min-height: 100vh;——视窗的高度; background-position: center 0;`

    3. `img元素的父级相对定位，width: 100%; height: 100%; img元素宽高100%；`

# Q6 单页面大量图片的展示问题

场景：某页面需要展示一个图集，其图片均为高清图，且数量超过一百张以上。展示模式为，先显示图片的缩略图（每行 3 张），点击缩略图后显示大图。

提醒：这是一个单页应用，点击缩略图显示大图的过程中无浏览器页面跳转。原地展示。

如何确保用户在大量图片环境下依然能有较好的浏览体验？在此描述可能的方案。

    1. 先使用懒加载方式加载缩略图，不加载高清图，点击缩略图时再显示高清图；

    2. 响应式图片，使用picture元素，通过设置srcset和sizes属性，让浏览器判断需要加载大图还是缩略图；



> 很不好意思，有些问题我也是搜出来的。通过做题，我自己收益很多。很谢谢呀。