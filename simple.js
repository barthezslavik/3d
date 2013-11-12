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

force = function() {
  var particles = [scene.children[3], scene.children[4]]

  var mass_x = 140
  var mass_y = 120
  var mass_z = 30

  $(particles).each(function(index, item) {
    if(item.position["x"] < mass_x) { item.translateX((mass_x-item.position["x"])/100); }
    if(item.position["y"] < mass_y) { item.translateY((mass_y-item.position["y"])/100); }
    if(item.position["z"] < mass_z) { item.translateZ((mass_z-item.position["z"])/100); }
  });
}

Molecule = function (formula) {
  var x = -100; var y = 20; var z = 0
  var data = [[x+20, y+20, z, "c"], [x, y, z+25, "h"], [x, y, z-25, "h"]]

  atom(data[0])
  atom(data[1])
};

m = new Molecule("CH2");
