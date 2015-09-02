/* The task is to complete the function below isWord such that given
 * a dictionary(data format described below) and a word, isWord returns 
 * true if the word is a word and false otherwise.
 * 
 * The JSON object dict represents our English dictionary.
 * Our dictionary data structure is a tree. Any given path through
 * the tree represents a string of letters, and at any given node
 * in the tree if is_word == true then that particular traversal of 
 * the tree represents a valid word.
 * 
 * In our tree, the only valid words are:
 * "A"
 * "BAR"
 * "BARK"
 * 
 */
function isWord(dictionary, word) {
  var currNode = dict.children;
  for (var i = 0; i < word.length; i++) {
    if (!currNode[word[i]]) {
      return false;
    }
    if (i == word.length - 1 && currNode[word[i]].is_word) {
      return true;
    }
    currNode = currNode[word[i]].children;
  }
  return false;
}

var dict = {
  children: {
    A : { is_word: true, children: {} },

    B : { children: {
      A: { children: {
        R: { is_word: true, children: {
          K: { is_word: true, children: {} }
        }}
      }}   
    }}
  }
};

var words = {
  A: true,
  AB: false,
  B: false,
  BA: false,
  BI: false,
  BAR: true,
  BARK: true,
  BART: false,
  CAT: false
};


for (var word in words) {
  console.log('Testing word ' + word);
  if (isWord(dict, word) !== words[word]) {
    console.log('Incorrect response for word "' + word + '"');
  }
}