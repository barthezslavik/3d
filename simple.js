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
  return Math.sqrt(x*x+y*y+z*z)
}

force = function() {
  var children = scene.children;
  var particles = children.slice(3);
  var p = particles[0].position
  var masses = [[p["x"], p["y"], p["z"]]];

  var delta_x = 0;
  var delta_y = 0;
  var delta_z = 0;
  var speed = 90;

  $(masses).each(function(index, mass) {
    delta_x += mass[0];
    delta_y += mass[1];
    delta_z += mass[2];
  });

  delta_x = delta_x/masses.length;
  delta_y = delta_y/masses.length;
  delta_z = delta_z/masses.length;

  $(particles).each(function(index, particle) {
    if (distance(particle.position, masses[0][0]) > 20) { particle.translateX((delta_x-particle.position["x"])/speed); }
    if (distance(particle.position, masses[0][1]) > 20) { particle.translateY((delta_y-particle.position["y"])/speed); }
    if (distance(particle.position, masses[0][2]) > 20) { particle.translateZ((delta_z-particle.position["z"])/speed); }
  });

  if (p["z"] < 0) {
    particles[0].translateZ("6");
  } else {
    if (p["x"] > 100) {
    } else {
      particles[0].translateX("2");
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
