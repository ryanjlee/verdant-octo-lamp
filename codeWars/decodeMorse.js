// The Morse code encodes every character as a sequence of "dots" and "dashes".For
// example, the letter A is coded as ·−, letter Q is coded as −−·−, and digit 1 is
// coded as ·−−−. The Morse code is case-insensitive, traditionally capital letters
// are used. When the message is written in Morse code, a single space is used to
// separate the character codes and 3 spaces are used to separate words. For
// example, the message HEY JUDE in Morse code is ···· · −·−− ·−−− ··− −·· ·.

// NOTE: Extra spaces before or after the code have no meaning and should be
// ignored.

// In addition to letters, digits and some punctuation, there are some special
// service codes, the most notorious of those is the international distress signal
// SOS (that was first issued by Titanic), that is coded as ···−−−···. These
// special codes are treated as single special characters, and usually are
// transmitted as separate words.

// Your task is to implement a function decodeMorse(morseCode), that would take the
// morse code as input and return a decoded human-readable string.

// The Morse code table is preloaded for you as MORSE_CODE dictionary, feel free
// to use it.

decodeMorse = function(morseCode){
  return morseCode.split('   ').map(function(word) {
    return word.split(' ').map(function(letter) {
      return MORSE_CODE[letter];
    }).join('');
  }).join(' ').trim();
}
