// Write a function that accepts an interger, converts it into binary notation,
// inverses all bits starting from the highest order bit that is set to 1. It then
// converts it back into decimal notation and returns that integer.

// Solution using bitwise operators
var getInversedNumber = function(num) {
  
  // Polyfill for the Math.log2 function
  Math.log2 = Math.log2 || function(x) {
    return Math.log(x) / Math.LN2;
  };

  // Finds highest bit order place and creates a binary number with all ones
  var highestBit = Math.floor(Math.log2(num)) + 1;
  var referenceNum = Math.pow(2, highestBit) - 1;

  return ~num & referenceNum;
}
