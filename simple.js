//formula = "СН2(ОН)СНО";

//if (window.formula.search("CH2")) {
//  console.log("CH2");
//}

atom = function(item) {
  if (item[3] == "h") { color = 0xff5533; radius = 120 }
  if (item[3] == "o") { color = 0x0099ff; radius = 155 }
  if (item[3] == "c") { color = 0xffdd44; radius = 170 }

  var geometry = new THREE.SphereGeometry(radius/10,32,16);
  var material = new THREE.MeshPhongMaterial({ color: color });
  var object = new THREE.Mesh(geometry, material);

  object.position.set(item[0], item[1], item[2]);
  scene.add(object);
}


distance = function(from, to) {
  var x = to.x-from.x;
  var y = to.y-from.y;
  var z = to.z-from.z;
  var result = Math.sqrt(x*x+y*y+z*z)
  return result
}

force = function() {
  var children = scene.children;
  var particles = children.slice(3);
  var massive = particles[0]

  var delta_x = 0;
  var delta_y = 0;
  var delta_z = 0;
  var speed = 90;

  delta_x += massive.position["x"];
  delta_y += massive.position["y"];
  delta_z += massive.position["z"];

  $(particles).each(function(index, particle) {
    if (distance(particle.position, massive.position) > 20) { particle.translateX((delta_x-particle.position["x"])/speed); }
    if (distance(particle.position, massive.position) > 20) { particle.translateY((delta_y-particle.position["y"])/speed); }
    if (distance(particle.position, massive.position) > 20) { particle.translateZ((delta_z-particle.position["z"])/speed); }
  });

  if (massive.position["x"] < 0) {
    massive.translateZ("6");
  } else {
    if (massive.position["z"] > 100) {
    } else {
      massive.translateX("2");
    }
  }

}

atom([-150,50,-1700,"c"]);
atom([-1500,50,50,"h"]);
atom([200,50,170,"o"]);

/*
Molecule = function (formula) {
  var x = -100; var y = 20; var z = 0
  var data = [[x+20, y+20, z, "c"], [x, y, z+25, "h"], [x, y, z-25, "h"]]

  atom(data[0])
  atom(data[1])
};

m = new Molecule("CH2");
*/
