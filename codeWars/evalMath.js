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
        els[i] = parseFloat(els[i]);
      }
      if (els[i] == '(') {
        var result = evaluate(els.slice(i)); //todo
      }
    }

    for (var i = 0; i < els.length; i++) {
      if (els[i] === '-') {
        if (+els[i - 1]) {
          if (els[i + 1] === '-') {
            els.splice(i + 1, 1);
          } else {
            els[i + 1] *= -1;
          }
          els[i] = '+';
        } else {
          els[i + 1] *= -1;
          els.splice(i, 1);
        }
      }
    }

    for (var i = 1; i < els.length; i += 2) {
      var operator = ops1[els[i]];
      while (operator) {
        els.splice(i - 1, 3, operator(els[i - 1], els[i + 1]));
        operator = ops1[els[i]];
      }
    }

    for (var i = 1; i < els.length; i += 2) {
      var operator = ops2[els[i]];
      while (operator) {
        els.splice(i - 1, 3, operator(els[i - 1], els[i + 1]));
        operator = ops1[els[i]];
      }
    }

    return els[0];
  };
  
  var elements = expression.match(/\d+\.?\d*\b|[+\-*/()]/g).map(function(el){
    if (+el) {
      return parseFloat(el);
    }
    return el;
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