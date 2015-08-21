// Extend the String object to create a function that converts the
// value of the String to and from Base64 using the ASCII character
// set.

// Extend the String object with toBase64() and fromBase64() functions


String.prototype.toBase64 = function() {
  var text = this;
  var bitPattern = '';
  var base64 = '';
  var keyStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
  var sigBytes = text.length % 3;
  
  for (var i = 0; i < text.length; i++) {
    var inputBit = text.charCodeAt(i).toString(2);
    while (inputBit.length != 8) inputBit = '0' + inputBit;
    bitPattern += inputBit;
  }
  
  if (sigBytes == 1) bitPattern += '0000';
  if (sigBytes == 2) bitPattern += '00';
  
  for (i = 0; i < bitPattern.length; i += 6) {
    var index = parseInt(bitPattern.substr(i, 6), 2);
    base64 += keyStr[index];
  }
  
  if (sigBytes == 1) base64 += '==';
  if (sigBytes == 2) base64 += '=';
  
  return base64;
}

String.prototype.fromBase64 = function() {
  var base64 = this;
  var bitPattern = '';
  var text = '';
  var keyStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
  var equalSigns = base64.match(/=/g) ? base64.match(/=/g).length : 0;
  
  base64 = base64.replace(/=/g, '');
  
  for (var i = 0; i < base64.length; i++) {
    var inputBit = keyStr.indexOf(base64[i]).toString(2);
    while (inputBit.length != 6) inputBit = '0' + inputBit;
    bitPattern += inputBit;
  }
  
  if (equalSigns == 2) bitPattern = bitPattern.slice(0, bitPattern.length - 4);
  if (equalSigns == 1) bitPattern = bitPattern.slice(0, bitPattern.length - 2);
  
  for (i = 0; i < bitPattern.length; i += 8) {
    var ascii = parseInt(bitPattern.substr(i, 8), 2);
    text += String.fromCharCode(ascii);
  }
  
  return text;
}
