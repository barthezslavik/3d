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

lights = function(lights) {
  $(lights).each(function(index, item) {
    var light = new THREE.PointLight(0xFFFFCC);
    light.position.set(item[0],item[1],item[2]);
    scene.add(light);
  });
}

force = function() {
  var c = scene.children[3]
  var h = scene.children[4]

  get_distance([c.position["x"], c.position["y"], c.position["z"]], [h.position["x"], h.position["y"], h.position["z"]]);

  c.translateZ(0.3);
  c.translateY(0.2);
  h.translateX(0.1);
}

lights([[-1000,0,0],[1000,0,0],[0,-1000,0],[0,1000,0],[0,0,-1000],[0,0,1000]]);

Molecule = function (formula) {
  var x = 0; var y = 20; var z = 0
  var data = [[x+20, y+20, z, "c"], [x, y, z+25, "h"], [x, y, z-25, "h"]]

  get_distance([x+20, y+20, z, "c"], [x, y, z+25, "h"])

  atom(data[0])
  atom(data[1])
};

m = new Molecule("CH2");
