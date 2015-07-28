$(document).ready(function() {
  for (var i = 0; i < 9; i++) {
    var starCount = 6;
    var starDiv = '<div class="star">&#9733;</div>';
    $('.topLeft').append('<div></div>');
    var rowDiv = $('.topLeft > div').last();
    if (i % 2 === 1) {
      rowDiv.addClass('in');
      starCount = 5;
    }
    for (var j = 0; j < starCount; j++) {
      rowDiv.append(starDiv);
    }
  }

  for (i = 0; i < 13; i++) {
    var color = i % 2 === 0 ? 'red stripe' : 'white stripe';
    $('.flag').append('<div></div>');
    $('.flag > div').last().addClass(color);
  }
});
