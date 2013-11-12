//formula = "СН2(ОН)СНО";

//if (window.formula.search("CH2")) {
//  console.log("CH2");
//}

var glycolaldehyde = [
    { h: [-70, 46, 20 ] },
    { o: [-50, 70, 20 ] },
    { c: [-30, 45, 20 ] },
    { c: [  0, 45, 20 ] },
    { h: [-30, 20, 45 ] },
    { h: [-30, 20,  0 ] },
    { o: [ 20, 20, 20 ] },
    { h: [ 20, 70, 20 ] },
];

rotate = function (data) {
  return [data[0], data[1]]
}

get_distance = function(p, q) {
  result = Math.sqrt(Math.pow((q[0] - p[0]), 2) + Math.pow((q[1] - p[1]), 2) + Math.pow((q[2] - p[2]), 2));
  console.log(result);
}

Molecule = function (formula) {
  var x = 0
  var y = 0
  var z = 0
  var data = [[x+20, y+20, z, "c"], [x, y, z+25, "h"], [x, y, z-25, "h"]]

  get_distance([x+20, y+20, z, "c"], [x, y, z+25, "h"])

  $(data).each(function(index, item) {
    e = item[3];
    if (e == "h") { color = 0xff5533; radius = 120 }
    if (e == "o") { color = 0x0099ff; radius = 155 }
    if (e == "c") { color = 0xffdd44; radius = 170 }

    var geometry = new THREE.SphereGeometry(radius/10,32,16);
    var material = new THREE.MeshPhongMaterial({ color: color });
    var object = new THREE.Mesh(geometry, material);
    object.position.set(item[0], item[1], item[2]);
    scene.add(object);
  });
};

m = new Molecule("CH2");
