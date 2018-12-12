
const obj = { selector: { to: { toutiao: "FE Coder"} }, target: [1, 2, { name: 'byted'}]};

// get(obj, 'selector.to.toutiao', 'target[0]', 'target[2].name');
console.log(212121, get(obj, 'selector.to.toutiao', 'selector.to'));


function get(data, ...args) {
	return args.map((item) => {
		const paths = item.split('.');
		let res = data;
		paths.map(path => {
      res = res[path]
      console.log(res);
    });
		return res;
	})
}
