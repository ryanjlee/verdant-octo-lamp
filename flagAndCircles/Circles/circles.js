
var jsonCircles = [];

var createTriangle = function(num, originX, originY) {
  if (!num) {
    return;
  }
  var r = 15;
  var currY = originY;
  for (var i = 0; i < num; i++) {
    var currX = currX || originX;
    var x = currX
    for (var j = 0; j < num - i; j++) {
      jsonCircles.push({ "x_axis": x, "y_axis": currY, "radius": r, "color" : "#1C7C75", "opacity" : 0.8});
      x += 2 * r;
    }
    currY -= Math.sqrt(3) * r;
    currX = currX + r
  }

  createTriangle(num - 1, originX + r, originY - (r / Math.sqrt(3)));
}

createTriangle(5, 50, 140);



var jsonCircles2 = [
  { "x_axis": 50, "y_axis": 50, "radius": 10, "color" : "green", "opacity" : 0.7},
  { "x_axis": 30, "y_axis": 80, "radius": 10, "color" : "green", "opacity" : 0.7},
  { "x_axis": 80, "y_axis": 80, "radius": 10, "color" : "green", "opacity" : 0.7}];

var svgContainer = d3.select("body").append("svg")
                                    .attr("width", 200)
                                    .attr("height", 200);

var circles = svgContainer.selectAll("circle")
                          .data(jsonCircles)
                          .enter()
                          .append("circle");

var circleAttributes = circles
                       .attr("cx", function (d) { return d.x_axis; })
                       .attr("cy", function (d) { return d.y_axis; })
                       .attr("r", function (d) { return d.radius; })
                       .style("fill", function(d) { return d.color; })
                       .style("opacity", function(d) { return d.opacity; });
