// Pascal's Triangle

// 0:           1
// 1:         1   1
// 2:       1   2   1
// 3:     1   3   3   1
// 4:   1   4   6   4   1
// 5: 1   5   10  10  5   1

// Sample output (no need to make it an equilateral triangle):
// > 1
// > 1 1
// > 1 2 1
// > 1 3 3 1
// > 1 4 6 4 1

// Given 'n', write a function that outputs the nth row of the triangle.
// (You can write any helper functions you may need.)

function pascal(n) {
  var array = [1];

  function do_pascal(n) {
    if (n === 0) {
      return array;
    }

    array.push(0);
    var newArray = [1];
    for (var i = 0; i < array.length; i++) {
      newArray.push(array[i - 1] + array[i]);
    }
    array = newArray;
    return do_pascal(n - 1);
  }

  return do_pascal(n);
}
