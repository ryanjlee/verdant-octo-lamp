/* 
var puzzle =
 [[5,3,0, 0,7,0, 0,0,0],
  [6,0,0, 1,9,5, 0,0,0],
  [0,9,8, 0,0,0, 0,6,0],
 
  [8,0,0, 0,6,0, 0,0,3],
  [4,0,0, 8,0,3, 0,0,1],
  [7,0,0, 0,2,0, 0,0,6],
 
  [0,6,0, 0,0,0, 2,8,0],
  [0,0,0, 4,1,9, 0,0,5],
  [0,0,0, 0,8,0, 0,7,9]];

sudoku(puzzle);
Should return
  [[5,3,4,6,7,8,9,1,2],
  [6,7,2,1,9,5,3,4,8],
  [1,9,8,3,4,2,5,6,7],
  [8,5,9,7,6,1,4,2,3],
  [4,2,6,8,5,3,7,9,1],
  [7,1,3,9,2,4,8,5,6],
  [9,6,1,5,3,7,2,8,4],
  [2,8,7,4,1,9,6,3,5],
  [3,4,5,2,8,6,1,7,9]]
*/

  // var coordinates = [];

  // function checkHorizontal(x, y) {

  //   return;
  // }
  
  // function checkVertical(x, y) {
  //   return;
  // }
  
  // function checkBlock(x, y) {
  //   return;
  // }
  // puzzle.forEach(function(v, i) {
  //   puzzle[i].forEach(function(v, j) {
  //     if (puzzle[i][j] == 0) coordinates.push([i, j]);
  //   });
  // });

  // while (coordinates.length) {
  //   coordinates.forEach(function(v, i) {
  //     checkHorizontal(v[0], v[1]);
  //     checkVertical(v[0], v[1]);
  //     checkBlock(v[0], v[1]);
  //   });
  // }


  // var list = [];

  // puzzle.forEach(function(v, i){
  //   list.push({});
  //   list[i]['row ' + i] = [];
  //   puzzle[i].forEach(function(v, j){
  //     list[i]['row ' + i][v] = v > 0;
  //   });
  // });

  // for (var i = 0; i < 9; i++) {
  //   list.push({});
  //   list[i + 9]['column ' + (i + 9)] = [];
  //   puzzle.forEach(function(v, j){
  //     list[i + 9]['column ' + (i + 9)][j] = puzzle[j][i] > 0;
  //   });
  // }

function sudoku(puzzle) {
  //return the solved puzzle as a 2d array of 9 x 9 
  

  var list = {row: [], column: [], block: []};

  for (var i = 0; i < 9; i++) {
    list.row[i] = [];
    list.column[i] = [];
    for (var j = 0; j < 9; j++) {
      var rowValue = puzzle[i][j]
      if (rowValue > 0) list.row[i][rowValue] = true;
      
      var columnValue = puzzle[j][i]
      if (columnValue > 0) list.column[i][columnValue] = true;
    }
  }

  for (var i = 0; i < 3; i++) {
    for (var j = 0; j < 3; j++) {
      var index = (i * 3) + j;
      list.block[index] = [];
      for (var k = j * 3; k < (j + 1) * 3; k++) {
        for (var l = i * 3; l < (i + 1) * 3; l++) {
          var blockValue = puzzle[l][k];
          if (blockValue > 0) list.block[index][blockValue] = true;
        }
      }
    }
  }

}
