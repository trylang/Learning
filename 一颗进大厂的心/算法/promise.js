

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

document.getElementsByTagName("a")[0].onclick=function(e){
  console.log(33232);
  event.preventDefault();
};

// Q3
const sayHello = () => {
  new Promise(resolve => {
    resolve('Hello Promise!')
  }).then(value => {
    console.log(value)
  }, err => {
    console.log(err)
  })
};

(async () => console.log(await sayHello()))();

// Q4