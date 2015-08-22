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


function sudoku(puzzle) {
  //return the solved puzzle as a 2d array of 9 x 9 

  var list = {row: [], column: [], block: []};
  var coordinates = [];
  var result = JSON.parse(JSON.stringify(puzzle));

  for (var i = 0; i < 9; i++) {
    list.row[i] = [];
    list.column[i] = [];
    for (var j = 0; j < 9; j++) {
      var rowValue = puzzle[i][j]
      if (rowValue > 0) list.row[i][rowValue] = true;
      else coordinates.push([i, j]);
      
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

  while (coordinates.length) {
    var newCoords = [];
    
    for (var i = 0; i < coordinates.length; i++) {
      var x = coordinates[i][0];
      var y = coordinates[i][1];
      var b = Math.floor(x / 3) * 3 + Math.floor(y / 3);
      var answer = undefined;
      
      for (var val = 1; val <= 9; val++) {
        if (!list.row[x][val] && !list.column[y][val] && !list.block[b][val]) {
          if (!answer) {
            answer = val;
          } else {
            answer = null;
            break;
          }
        }
      }

      if (answer !== null) {
        result[x][y] = answer;
        list.row[x][answer] = list.column[y][answer] = list.block[b][answer] = true;
      } else {
        newCoords.push(coordinates[i]);
      }
    }

    coordinates = newCoords;
  }

  return result;
}
