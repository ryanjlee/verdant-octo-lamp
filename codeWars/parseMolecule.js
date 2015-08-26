// For a given chemical formula represented by a string, count the
// number of atoms of each element contained in the molecule and
// return an object.

// For example:

// var water = 'H2O';
// parseMolecule(water); // return {H: 2, O: 1}

// var magnesiumHydroxide = 'Mg(OH)2';
// parseMolecule(magnesiumHydroxide); // return {Mg: 1, O: 2, H: 2}

// var fremySalt = 'K4[ON(SO3)2]2';
// parseMolecule(fremySalt); // return {K: 4, O: 14, N: 2, S: 4}

// As you can see, some formulas have brackets in them. The index
// outside the brackets tells you that you have to multiply count of
// each atom inside the bracket on this index. For example, in
// Fe(NO3)2 you have one iron atom, two nitrogen atoms and six oxygen
// atoms.

// Note that brackets may be round, square or curly and can also be
// nested. Index after the braces is optional.

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