var bitFlip = function (binaryString) {
  var binArr = binaryString.split('');
  var currScore = 0;
  var L = 0;
  var R = 0;
  var highScore = 0;
  var bestL = 0;
  var bestR = 0;
  var S = 0;

  for (var i = 0; i < binArr.length; i++) {
    if (binArr[i] === '0') {
      if (currScore === 0) {
        L = i;
      }
      R = i;
      currScore++;
      if (highScore < currScore) {
        highScore = currScore;
        bestL = L;
        bestR = R;
      }
    } else {
      if (currScore > 0) currScore--;
    }
  }

  for (i = 0; i < binArr.length; i++) {
    if (i >= bestL && i <= bestR) {
      binArr[i] = binArr[i] === '0' ? '1' : '0';
    }
    if (binArr[i] === '1') {
      S++;
    }
  }

  console.log(S);
};
