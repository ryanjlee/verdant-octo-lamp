function parseMolecule(formula) {
  var elements = formula.match(/[A-Z][a-z]?(?=\d?)|\d+|[()[\]{}]/g);
  var atoms = {};
  var stack = [];
  var brackets = {'(': ')', '[': ']', '{': '}'};
  var multiple = 1;

  function isChar(el) {
    return el.charCodeAt(0) >= 65 && el.charCodeAt(0) <= 90;
  }

  function addAtom(el, num) {
    if (!atoms[el]) atoms[el] = 0;
    atoms[el] += parseInt(num) * multiple;
  }

  for (var i = elements.length - 1; i >= 0; i--) {
    if (parseInt(elements[i])) {
      if (isChar(elements[i - 1])) {
        addAtom(elements[i -1], elements[i]);
      } else {
        stack.push(elements[i]);
        multiple *= elements[i];
      }
      i--;
    } else if (isChar(elements[i])) {
      addAtom(elements[i], 1);
    } else if (brackets[elements[i]]){
      multiple /= stack.pop(elements[i])
    } else {
      stack.push(1);
    }
  }

  return atoms;
}