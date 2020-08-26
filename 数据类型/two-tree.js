var levelOrder = function(root) {
  if (!root) return [];
  const q = [root];
  while(q.length) {
    const n = q.shift();
    console.log(333, n);
    if (n.left) q.push(n.left)
    if (n.right) q. push(n.right);
  }
}

levelOrder([3,9,20,null, null, 15,7])
