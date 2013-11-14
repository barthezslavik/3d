atom = function(vector, element) {
  if (element == "h") { color = 0xff5533; radius = 120 }
  if (element == "o") { color = 0x0099ff; radius = 155 }
  if (element == "c") { color = 0xffdd44; radius = 170 }

  var geometry = new THREE.SphereGeometry(radius/10,32,16);
  var material = new THREE.MeshPhongMaterial({ color: color });
  var object = new THREE.Mesh(geometry, material);

  object.position.set(vector.x, vector.y, vector.z);
  object.name = element
  return object;
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
  var speed = 22;

  delta_x += massive.position["x"];
  delta_y += massive.position["y"];
  delta_z += massive.position["z"];

  $([particles[1], particles[2]]).each(function(index, particle) {
    if (distance(particle.position, massive.position) > 30) {
      particle.translateX((delta_x-particle.position["x"])*speed/100);
      particle.translateY((delta_y-particle.position["y"])*speed/100);
      particle.translateZ((delta_z-particle.position["z"])*speed/100);
    }
  });

  if (massive.position["z"] < 10) { massive.translateZ("6"); }
}

scene.add(atom(new THREE.Vector3(-150,50,-1700), "c"));
scene.add(atom(new THREE.Vector3(-1500,50,50), "h"));
scene.add(atom(new THREE.Vector3(200,50,170), "o"));
