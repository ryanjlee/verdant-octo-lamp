// Given the following Markup
// <ul>
//        <li> 4 </li>
//        <li> 1 </li>
//        <li> 7 </li>
//        <li> 5 </li>
//        <li> 3 </li>
// </ul>

// Write a function to convert that to

// <ul>
//        <li> 1 </li>
//        <li> 3 </li>
// </ul>

// <ul>
//        <li> 4 </li>
//        <li> 5 </li>
// </ul>

// <ul>
//        <li> 7 </li>
// </ul>


// 1. Sort the list (you can use default JS/jquery sorting functions )
// 2. Break the sorted list apart into different sub-lists with a maximum of 'x' items each,  'x' being a parameter you pass in. The above sample result assumes x=2.


// Default JS implementation
var sortUl = function (max) {
  var parent = document.getElementsByTagName('ul')[0];
  var items = parent.children;
  var arr = [];
  var currUl = parent;
  var currLi;

  for (var i = 0; i < items.length; i++) {
    arr.push(items[i].innerHTML);
  }
  
  parent.innerHTML = '';
  arr.sort(function(a,b){return a-b;});
  
  for (i = 0; i < arr.length; i++) {
    if (i % max === 0 && i > 0) {
      prevUl = currUl;
      currUl = document.createElement('ul');
      prevUl.parentNode.insertBefore(currUl, prevUl.nextSibling);
    }
    currLi = document.createElement('li');
    currLi.innerHTML = arr[i];
    currUl.appendChild(currLi);
  }
}

//sortUl(2);



// jQuery implementation
var sortUl2 = function (max) {
  var parent = $('ul');
  var currNode = parent;
  var nodes = parent.children('li').get();
  nodes.sort(function(a, b){
    return $(a).text() - $(b).text();
  });
  parent.children('li').remove();
  
  for (var i = 0; i < nodes.length; i++) {
    if (i % max === 0 && i > 0) {
      var newParent = $('<ul></ul>');
      currNode.after(newParent);
      currNode = newParent;
    }
    currNode.append(nodes[i]);
  }
}

$(document).ready(function(){
  sortUl2(2);
});

