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
  var children = scene.children;
  var particles = children.slice(3);
  var masses = [[100,0,0],[0,100,0],[0,0,100]];
  var delta_x = 0;
  var delta_y = 0;
  var delta_z = 0;
  var speed = 5;

  $(masses).each(function(index, item) {
    delta_x += item[0];
    delta_y += item[1];
    delta_z += item[2];
  });

  delta_x = delta_x/masses.length;
  delta_y = delta_y/masses.length;
  delta_z = delta_z/masses.length;

  $(particles).each(function(index, item) {
    if(item.position["x"] < delta_x) { item.translateX((delta_x-item.position["x"])/speed); }
    if(item.position["y"] < delta_y) { item.translateY((delta_y-item.position["y"])/speed); }
    if(item.position["z"] < delta_z) { item.translateZ((delta_z-item.position["z"])/speed); }
  });

}

atom([50,50,50,"c"]);
atom([-50,50,50,"h"]);
atom([-50,50,170,"o"]);

/*
Molecule = function (formula) {
  var x = -100; var y = 20; var z = 0
  var data = [[x+20, y+20, z, "c"], [x, y, z+25, "h"], [x, y, z-25, "h"]]

  atom(data[0])
  atom(data[1])
};

m = new Molecule("CH2");
*/
