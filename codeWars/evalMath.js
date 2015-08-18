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

  var simplify = function(elements, ops) {
    for (var i = 1; i < elements.length; i += 2) {
      while (operator = ops[elements[i]]) {
        elements.splice(i - 1, 3, operator(elements[i - 1], elements[i + 1]));
      }
    }
  };
  
  var evaluate = function(elements) {
    var operator;
    var end = 1;

    // Evaluate parens with recursion
    for (var i = 0; i < elements.length; i++) {
      if (elements[i] == '(') {
        var result = evaluate(elements.slice(i + 1));
        elements.splice(i, result[1] + 1, result[0]);
        end += result[1];
      }
      if (elements[i] == ')') {
        end += i;
        elements.splice(i, elements.length - i);
        break;
      }
    }

    // Simplify minuses and negatives
    for (var i = 0; i < elements.length ; i++) {
      if (elements[i] === '-') {
        if (+elements[i - 1]) {
          if (elements[i + 1] === '-') {
            elements.splice(i + 1, 1);
          } else {
            elements[i + 1] *= -1;
          }
          elements[i] = '+';
        } else {
          elements[i + 1] *= -1;
          elements.splice(i, 1);
        }
      }
    }

    // Process multiplication and division
    simplify(elements, ops1);
    // Process addition and subtraction
    simplify(elements, ops2);

    return [elements[0], end];
  };
  


  // Convert expression into an array of strings symbols and numbers
  var expressionArr = expression.match(/\d+\.?\d*\b|[+\-*/()]/g).map(function(el){
    if (+el) return parseFloat(el);
    return el;
  });

  return evaluate(expressionArr)[0];
};
