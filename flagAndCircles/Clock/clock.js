$(document).ready(function() {
  function updateTime(a, b) {
    var time = new Date();
    if (arguments.length) { // For testing purposes
      time.setHours(a);
      time.setMinutes(b);
    };
    var hour = time.getHours();
    var minutes = time.getMinutes();
    var meridiem = hour > 11 ? 'pm' : 'am';
    if (hour == 0) hour = 12;
    if (hour > 12) hour -= 12;
    if (minutes < 10) minutes = '0' + minutes;

    $('.hour').text(hour);
    $('.minutes').text(minutes);
    $('.meridiem').text(meridiem);
  }

  updateTime();
  setInterval(updateTime, 1000);

  //------------------------------------------------------------------------//

  function test() {
    var testArr = [[0, 0],[1, 1],[11,5],[12,00],[13,11],[18,22],[23,45],[]];
    $('.clock').after('<p></p>');
    testArr.forEach(function(time, i) {
      setTimeout(function() {
        updateTime.apply(null, time);
        $('p').text('input: ' + time);
      }, 2000 * i);
    });
  };

  //test();
});
