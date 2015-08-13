// Wikipedia article on Pascal's Triangle:
// http://en.wikipedia.org/wiki/Pascal's_triangle

// Write a function that, given a depth (n), returns a single-dimensional array
// representing Pascal's Triangle to the n-th level.

// For example:
// pascalsTriangle(4) == [1,1,1,1,2,1,1,3,3,1]

function pascalsTriangle(n) {
  var result = [1];
  
  (function addLevel(level, arr) {
    if (level == 1) return result;
    arr.push(0);
    var newArr = [1];
    for (var i = 0; i < arr.length - 1; i++) {
      newArr.push(arr[i] + arr[i + 1]);
    }
    result = result.concat(newArr);
    addLevel(level - 1, newArr);
  })(n, result.slice());
  
  return result;
}
