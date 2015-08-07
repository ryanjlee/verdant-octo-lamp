var testData = {
  automobiles:[
    {"mpg":25, "price":11000, "name":"Subcompact"},
    {"mpg":16, "price":36400, "name":"Sports"},
    {"mpg":25, "price":16500, "name":"Compact"},
    {"mpg":22, "price":72000, "name":"Luxury"}
  ]
}

var app = {
  
  init: function() {
    app.getData();
  },

  getData: function() {
    // $.get('example.com/automobile/list', app.displayData, 'json');
    app.displayData(testData); // For testing without API
  },

  displayData: function(json) {
    var automobiles = json.automobiles;
    automobiles.sort(function(a, b) {
      return b.mpg - a.mpg;
    });

    $('#carList').append('<ul></ul>');
    automobiles.forEach(function(car) {
      $('#carList > ul').append('<li>' + car.name + ' - ' + JSON.stringify(car.mpg) + ' mpg - $' + JSON.stringify(car.price) + '</li>');
    });
  }

};
