// You have to write a function pattern which returns
// the following Pattern upto n number of rows.

// 1
// 22
// 333
// ....
// .....
// nnnnnn

// If n < 1 then it should return "" i.e. empty string.
// There are no whitespaces in the pattern.


function pattern(n){
  var output="";
  for (var i = 1; i <= n; i++) {
    if (i > 1) {
      output += '\n';
    }
    for (var j = 0; j < i; j++) {
      output += i;
    }
  }
  return output;
}
