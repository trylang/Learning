function normalize(identify, data) {
  const id2Value = {};
  data.forEach(item => {
    const idValue = item[identify];
    id2Value[idValue] = item;
  });
  return id2Value;
}

function isEmptyObject(o) {
  return !Object.keys(o).length;
}

function collectChildInsideIds(children) {
  return Object.values(children).reduce((acc, child) => {
    const result = [
      ...acc,
      ...(child.ids || []),
      ...(isEmptyObject(child.children) && child.children
        ? []
        : collectChildInsideIds(child.children))
    ];
    return result;
  }, []);
}

function distinct(target) {
  const tempArr = [];
  target.forEach(item => {
    if (!tempArr.includes(item)) {
      tempArr.push(item);
    }
  });
  return tempArr;
}

let userMap = null;

class Leaf {
  constructor(id = "", value = "") {
    this.ids = id ? [id] : [];
    this.value = value;
    this.children = {};
  }
  share(id) {
    this.ids.push(id);
  }
}

fetch("https://randomuser.me/api/?results=5000&inc=gender,email,phone,cell,nat")
  .then(res => {
    return res.json();
  })
  .then(data => {
    const { results } = data;
    console.log("result", results);
    const root = new Leaf();
    const identifyKey = "email";

    userMap = normalize(identifyKey, results);
    console.log(userMap);

    results.forEach(item => {
      const identifyValue = item[identifyKey];
      // ["female", "camille.gill@example.com", "810-775-4742", "001-974-2253", "CA"]
      Object.values(item).forEach(itemValue => {
        // 注意这里会把 Number 和 Boolean 类型也字符串化
        const stringifiedValue = String(itemValue);
        let tempRoot = root;
        const arraiedStringifiedValue = Array.from(stringifiedValue); // 字符串转成一个个的字符数组 ["f", "e", "m", "a", "l", "e"]
        arraiedStringifiedValue.forEach((character, characterIndex) => {
          // character 代表单个字符
          const reachEnd =
            characterIndex === arraiedStringifiedValue.length - 1; // 末尾出现字符，是否触底
          if (!tempRoot.children[character]) {
            tempRoot.children[character] = new Leaf(
              reachEnd ? identifyKey : "",
              character
            );
            tempRoot = tempRoot.children[character];
          } else {
            if (reachEnd) {
              tempRoot.children[character].share(identifyValue);
            }
            tempRoot = tempRoot.children[character];
          }
        });
      });
    });

    console.log("---------- Data Ready: ----------");
    console.log('userMap', userMap);
    console.log(root);
    const searchKeyword = "a";
    console.log(`---------- Search keyword "${searchKeyword}" ----------`);
    const startTime1 = +new Date();
    const searchResults = searchBlurry(root, searchKeyword, userMap);
    console.log(searchResults, `cost ${+new Date() - startTime1}ms`);
  });

// 模糊搜索
function searchBlurry(root, keyword, userMap) {
  const keywordArr = Array.from(String(keyword));
  let tempRoot = root;
  let result = [];

  for (let i = 0; i < keywordArr.length; i++) {
    const character = keywordArr[i];
    if (!tempRoot.children[character]) {
      break;
    } else {
      tempRoot = tempRoot.children[character];
    }
    if (keywordArr.length - 1 === i) {
      result = [...tempRoot.ids, ...collectChildInsideIds(tempRoot.children)];
    }
    return distinct(result).map(id => {
      return userMap[id];
    });
  }
}
