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

var start_position = new THREE.Vector3( 0, 30, 0 );
scene.add(atom(start_position, "o"));
var second_position = new THREE.Vector3( -20, 30, 0 );
scene.add(atom(second_position, "h"));
var angle = 104;
var matrix = new THREE.Matrix4().makeRotationAxis( new THREE.Vector3( 0, 1, 0 ), angle * ( Math.PI / 180 ));
var third_position = second_position.applyMatrix4( matrix );
scene.add(atom(third_position, "h"));
