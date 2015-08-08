var anagramCheck = function(str1, str2) {
  var log = {};
  var length = str1.length;
  for (var i = 0; i < str1.length; i++) {
    if (!log[str1[i]]) {
      log[str1[i]] = 1;
    } else {
      log[str1[i]]++;
    }
  }

  for (var j = 0; j < str2.length; j++) {
    if (!log[str2[j]] || log[str2[j]] - 1 < 0) {
      return false;
    } else {
      log[str2[j]]--;
    }
    if (log[str2[j]] === 0) {
      length--;
    }
  }

  return length === 0;
}