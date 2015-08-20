// A bomb has been set to go off! You have to find the wire and cut it
// in order to stop the timer. There is a global var that holds the
// numeric ID to which wire to cut. Find that and then you can
// Bomb.CutTheWire(wireKey);

function BuildBomb(global) {
  
  var myWireVar = 'boom' + ~ ~(Math.random() * 10),
  
  bomb = function bomb() {
    this.Explode = function () {
      var myWire = 0;
      eval('myWire = ' + myWireVar + ';');
      console.log('The wire was "cut":');
      Test.expect(typeof myWire === 'undefined', 'BOOM! You failed to cut the wire!');
    };
    this.CutTheWire = function (wireCode) {
      console.log(myWireVar);
      var myWire = 0;
      eval('myWire = ' + myWireVar + ';');
      console.log('A numeric wireCode is specified:');
      Test.expect(typeof wireCode === 'number', 'BOOM! You have to specify the number ID of the wire to cut.');
      console.log('Correct wireCode is specified:');
      Test.expect(wireCode === myWire, 'BOOM! You cut the wrong wire!');
      eval.call(global, 'var ' + myWireVar + ' = undefined;');
    };
  };

  eval.call(global, 'var ' + myWireVar + ' = ' + Math.random() + ';');
  global.bomb = new bomb();
  return global.bomb;
}

var wireCode; // Find the wire.

for(var i=0; i<10; i++){
  if(global["boom"+i]) {
    wireCode = global["boom"+i];
  }
}

Bomb.CutTheWire(wireCode);
