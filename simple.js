//formula = "СН2(ОН)СНО";

//if (window.formula.search("CH2")) {
//  console.log("CH2");
//}

get_distance = function(p, q) {
  result = Math.sqrt(Math.pow((q[0] - p[0]), 2) + Math.pow((q[1] - p[1]), 2) + Math.pow((q[2] - p[2]), 2));
  console.log(result);
}

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

force = function() {
  var c = scene.children[3]
  var h = scene.children[4]

  //get_distance([c.position["x"], c.position["y"], c.position["z"]], [h.position["x"], h.position["y"], h.position["z"]]);

  var mass_x = 140
  var mass_y = 120
  var mass_z = 30

  var xv = (mass_x-c.position["x"])/100;
  var yv = (mass_y-c.position["y"])/100;
  var zv = (mass_z-c.position["z"])/100;

  if(c.position["x"] < mass_x) { c.translateX(xv); }
  if(c.position["y"] < mass_y) { c.translateY(xv); }
  if(c.position["z"] < mass_z) { c.translateZ(xv); }
}

var mass_map = [100,100,100,100]

Molecule = function (formula) {
  var x = -100; var y = 20; var z = 0
  var data = [[x+20, y+20, z, "c"], [x, y, z+25, "h"], [x, y, z-25, "h"]]

  get_distance([x+20, y+20, z, "c"], [x, y, z+25, "h"])

  atom(data[0])
  atom(data[1])
};

m = new Molecule("CH2");
