/* globals $,_ */

var app = {};
app.init = function() {};

app.send = function(message) {
  var newMessage = {
    'username': window.location.search.substring(10),
    'text': message,
    'roomname': app.currentRoom
  };
  $.ajax({
    url: 'https://api.parse.com/1/classes/chatterbox',
    type: 'POST',
    data: JSON.stringify(newMessage),
    contentType: 'application/json',
    success: function (data){
      console.log('chatterbox: Message sent');
    },
    error: function (data) {
      console.error('chatterbox: Failed to send message');
    }
  });
};

$(document).ready(function() {
  $('#login').submit(function(event) {
  	console.log($('#id').val());
    // if ($('input:first').val()) {
    //   // app.send($('input:first').val());
    //   $('input:first').val('');
    // }
    event.preventDefault();
  });
});