var spiralize = function(size) {
  
  var spiral = [];
  for (var i = 0; i < size; i++) {
    spiral.push([]);
    for (var j = 0; j < size; j++) {
      spiral[i].push(1);
    }
  }
  var x = 0;
  var y = 1;
  var direction = 'right';
  var count = 0;

  while (true) {
    spiral[y][x] = 0;
    complete = true;
    count = 0;

    if (direction === 'right') {
      if (spiral[y][x + 2] !== undefined && spiral[y][x + 1] !== 0 && spiral[y][x + 2] !== 0) x++;
      else {
        direction = 'down';
        count++;
      }
    }
    if (direction === 'down') {
      if (spiral[y + 2] !== undefined && spiral[y + 1][x] !== 0 && spiral[y + 2][x] !== 0) y++;
      else {
        direction = 'left';
        count++;
      }
    }
    if (direction === 'left') {
      if (spiral[y][x - 2] !== undefined && spiral[y][x - 1] !== 0 && spiral[y][x - 2] !== 0) x--;
      else {
        direction = 'up';
        count++;
      }
    }
    if (direction === 'up') {
      if (spiral[y - 2] !== undefined && spiral[y - 2][x] !== 0 && spiral[y - 2][x] !== 0) y--;
      else {
        direction = 'right';
        count++;
      }
    }
    if (count > 1) {
      return spiral;
    }
  }
}


// 1       00000
// 2       ....0
// 4       000.0
// 5       0...0
// 6       00000

// 1      000000
// 2      .....0
// 3      0000.0
// 4      0..0.0
// 5      0....0
// 6      000000

// 1     0000000
// 2     ......0
// 3     00000.0
// 4     0...0.0
// 5     0.000.0
// 6     0.....0
// 7     0000000

// 1    00000000
// 2    .......0
// 3    000000.0
// 4    0....0.0
// 5    0.0..0.0
// 6    0.0000.0
// 7    0......0
// 8    00000000

// 1   000000000
// 2   ........0
// 3   0000000.0
// 4   0.....0.0
// 5   0.000.0.0
// 6   0.0...0.0
// 7   0.00000.0
// 8   0.......0
// 9   000000000

// 1  0000000000
// 2  .........0
// 3  00000000.0
// 4  0......0.0
// 5  0.0000.0.0
// 6  0.0..0.0.0
// 7  0.0....0.0
// 8  0.000000.0
// 9  0........0
// 10 0000000000