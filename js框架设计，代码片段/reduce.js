// const flattenDeep = (arr) => Array.isArray(arr) 
//   ?arr.reduce((a, b) => [...flattenDeep(a), ...flattenDeep(b)], []) 
//   : [arr];

function flattenDeep(arr) {
  if (Array.isArray(arr)) {
    return arr.reduce((acc, curr) => {
      let arr = [];
      return [...flattenDeep(acc), ...flattenDeep(curr)];
      // let haha = flattenDeep(curr);
      // acc.concat(haha);
      // console.log(haha, acc);
      return arr;
    }, []);
    console.log('flat',flat);
    return flat;
  }else {
    return [arr];
  }
};

function flattenDeep2(arr) {
  let flat = arr.reduce((acc, curr) => {
    let flatCur = [];
    if (Array.isArray(curr)) {
      flatCur = flattenDeep2(curr);
    } else {
      flatCur = curr;
    }
    let haha = acc.concat(flatCur);
    console.log(haha);
    return haha;
  }, []); 
  return flat;
}
let haha = flattenDeep2([1, [[2], [3, [4]], 5]]);
console.log(haha);