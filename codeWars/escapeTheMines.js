// A poor miner is trapped in a mine and you have to help him to get out
// !

// Only, the mine is all dark so you have to tell him where to go.

// In this kata, you will have to implement a method solve(map, miner,
// exit) that has to return the path the miner must take to reach the
// exit as an array of moves, such as : ['up', 'down', 'right', 'left'].
// There are 4 possible moves, up, down, left and right, no diagonal.

// map is a 2-dimensional array of boolean values, representing squares.
// false for walls, true for open squares (where the miner can walk). It
// will never be larger than 5 x 5. It is laid out as an array of
// columns. All columns will always be the same size, though not
// necessarily the same size as rows (in other words, maps can be
// rectangular). The map will never contain any loop, so there will
// always be only one possible path. The map may contain dead-ends
// though.

// miner is the position of the miner at the start, as an object made of
// two zero-based integer properties, x and y. For example {x:0, y:0}
// would be the top-left corner.

// exit is the position of the exit, in the same format as miner.

// Note that the miner can't go outside the map, as it is a tunnel.

// var map = [[true, false],
//            [true, true ]];
// solve(map, {x:0,y:0}, {x:1,y:1});
// Should return ['right', 'down']


function solve(map, miner, exit) {
  var currMap = JSON.parse(JSON.stringify(map));
  var directions = [];

  function toggle(x, y) {
    currMap[x][y] = currMap[x][y] ? false : true;
  }

  function escape(x, y) {
    if (x == exit.x && y == exit.y) {
      return true;
    }
    if (currMap[x + 1] && currMap[x + 1][y]) {
      toggle(x, y);
      if (escape(x + 1, y)) {
        directions.unshift('right');
        return true;
      }
      toggle(x, y);
    }
    if (currMap[x][y + 1]) {
      toggle(x, y);
      if (escape(x, y + 1)) {
        directions.unshift('down');
        return true;
      }
      toggle(x, y);
    }
    if (currMap[x - 1] && currMap[x - 1][y]) {
      toggle(x, y);
      if (escape(x - 1, y)) {
        directions.unshift('left');
        return true;
      }
      toggle(x, y);
    }
    if (currMap[x][y - 1]) {
      toggle(x, y);
      if (escape(x, y - 1)) {
        directions.unshift('up');
        return true;
      }
      toggle(x, y);
    }

    return false;
  }
  
  escape(miner.x, miner.y);

  return directions;
}
