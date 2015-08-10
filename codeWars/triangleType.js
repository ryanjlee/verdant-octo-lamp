/* Given 3 sides, it should return ᐃ type:
  0 : if ᐃ cannot be made with given sides
  1 : acute ᐃ
  2 : right ᐃ
  3 : obtuse ᐃ
*/

function triangleType(a, b, c){
  var sides = Array.prototype.slice.call(arguments);
  sides.sort(function(a,b){return a-b;});
	var abSquared = Math.pow(sides[0], 2) + Math.pow(sides[1], 2);
  var cSquared = Math.pow(sides[2], 2);
  
  if (sides[0] + sides[1] <= sides[2]) return 0;
  if (abSquared >  cSquared) return 1;
  if (abSquared == cSquared) return 2;
  if (abSquared <  cSquared) return 3;
}
