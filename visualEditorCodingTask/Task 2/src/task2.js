// Implement a length­based tree structure for an HTML token stream, and perform
// offset searches in that tree. The document format from task 1 is extended to
// add opening and closing tags, to express HTML­like data:

// var doc = [ '<p>', 'O', 'n', 'e', '</p>', '<ul>', '<li>', 'T', 'w', 'o',
// '</li>', '<li>', 'T', 'h', 'r', 'e', 'e', '</li>', '</ul>', '<div>', '</div>'
// ];

// From such a document, it's possible to construct a length­based tree where
// the nodes only contain their type, their (inner) length, and their children.
// For the example document above, the tree would look like this:

// {
//   'type': 'document',
//   'length': 21,
//   'children': [
//     {
//       'type': 'p',
//       'length': 3,
//       'children': []
//     },
//     {
//       'type': 'ul',
//       'length': 12, // 1+3+1 + 1+5+1 = 12
//       'children': [
//         {
//           'type': 'li',
//           'length': 3,
//           'children': []
//         },
//         {
//           'type': 'li',
//           'length': 5,
//           'children': []
//         }
//       ]
//     },
//     {
//       'type': 'div',
//       'length': 0,
//       'children': []
//     }
//   ]
// }

// Write a function that, given a data array, constructs a tree like the one
// above. Additionally, write a function that takes a tree and an index in the
// data array, and finds the node that that index is contained in. A few
// examples based on the document above:

// func(tree, 8) should return the first li, because data[8] is the 'w' in Two,
// and that 'w' is in the first list item

// func(tree, 6) should return the ul, because data[6] == '<li>', which is
// contained in the list. (Not in the list item! The opening tag of a node is
// not 'contained in' that node, but in its parent node.)

// func(tree, 3) should return the paragraph, because data[3] is the 'e' in One,
// and that 'e' is in the paragraph

// func(tree, 4) should return the document, because data[4] == '</p>', which is
// contained in the document (again, not in the paragraph, per the func(tree, 6)
// case)

// For this document, the function will never return the div: the div is empty,
// so there is nothing that is inside the div, so there is no index that you
// could pass to the function that would cause it to return the div.



var createTree = function(htmlArray) {

  function handleElement(arr, el) {
    var node = {
      'type': el,
      'length': 0,
      'children': []
    }

    for (var i = 0; i < arr.length; i++) {
      if ((/<\w+>/).test(arr[i])) { // if element is an opening tag
        var child = handleElement(arr.slice(i + 1), arr[i].match(/\w+/)[0])
        var childLength = child.length + 1;        
        i += childLength;
        node.length += childLength + 1;
        node.children.push(child);
      } else if ((/<\/\w+>/).test(arr[i])) { // if element is a closing tag
        if (arr[i].match(/\w+/)[0] !== node.type) {
          throw new Error('invalid document');
        } else {
          return node;
        }
      } else {
        node.length++;
      }
    }

    if (node.type !== 'document') {
      throw new Error('invalid document');
    }
    
    return node;
  }

  // if first element in htmlArray is not an opening tag, throw error
  if (!(/<\w+>/).test(htmlArray[0])) {
    throw new Error('invalid document');
  }

  return handleElement(htmlArray, 'document');
};



var findNode = function(parent, index) {
  var count = 0;
  
  for (var i = 0; i < parent.children.length; i++) {
    var child = parent.children[i];
    var closingIndex = count + child.length + 1;
    if (index === count || index === closingIndex) {
      return parent;
    }
    if (index < closingIndex) {
      return findNode(child, index - count - 1)
    }
    count = closingIndex + 1;
  }

  return parent;
};
