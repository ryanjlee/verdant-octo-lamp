var calc = function (expression) {
  // evaluate `expression` and return result
  var ops1 = {
    '*': function(num1, num2) {
      return num1 * num2;
    },
    '/': function(num1, num2) {
      return num1 / num2;
    }
  };

  var ops2 = {
    '+': function(num1, num2) {
      return num1 + num2;
    },
    '-': function(num1, num2) {
      return num1 - num2;
    }
  };
  
  var evaluate = function(els) {
    for (var i = 0; i < els.length; i++) {
      if (parseFloat(els[i]) !== NaN) {
        els[i] = parseFloat(els[i];
      }
      if (els[i] == '(') {
        var result = evaluate(els.slice(i));
      }
      if (ops1[els[i]]) {
        ops1[els[i]]()
      }
    }


    return;
  };
  
  var elements = expression.match(/\d+\.?\d*\b|[+\-*/()]/g);

  elements.forEach(function(el){
    if (parseFloat(el[i]) != NaN) {
      el[i] = parseFloat(el[i]);
    }
  });
  elements.forEach(function(el, i, arr){
    if (el[i] === '-') {
      if (el[i + 1] === '-') {
        el[i] = '+';
        arr.splice(el[i + 1], 1);
      }
    }
  });


};



// 123-1 -1- 1 - 1- -1 - -1
// -1 + 1


// 1+1
// 1 - 1
// 1-1
// 1* 1
// 1 /1
// -123
// 123
// 2 /2+3 * 4.75- -6
// 12* 123
// 2 / (2 + 3) * 4.33 - -6

// 1 - 1   1 + -1
// 1 - -1  1 +  1