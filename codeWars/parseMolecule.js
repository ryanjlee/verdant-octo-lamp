

function parseMolecule(formula) {
  var elements = formula.match(/[A-Z][a-z]?(?=\d?)|\d+|[()[\]{}]/g);
  var result = {};
  var brackets = {'(': ')', '[': ']', '{': '}'};
  var multiple = 1;

  for (var i = 0; i < elements.length; i++) {
    if (elements[i].charCodeAt(0) >= 65 && elements[i].charCodeAt(0) <= 90) {
      if (!result[elements[i]]) result[elements[i]] = 0;
      if (parseInt(elements[i + 1]) {
        result[elements[i]] += (parseInt(elements[i + 1]) * multiple);
      } else {
        result[elements[i]] += 1;
        i++;
      }
    } else if (brackets[elements[i]]){
      var endBracket = elements.lastIndexOf(brackets[elements[i]]);
      if (parseInt(elements[endBracket + 1])) {
        multiple = elements[endBracket + 1];
      }
    }
  }
}