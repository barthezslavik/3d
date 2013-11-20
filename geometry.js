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

var start_position = new THREE.Vector3( 0, 0, 0 );
scene.add(atom(start_position, "o"));
var first_vector = new THREE.Vector3( 0, 0, 0 );
scene.add( new THREE.ArrowHelper( first_vector.normalize(), new THREE.Vector3( 0, 0, 0 ), 1000, 0x00ff00 ));

//var axis = new THREE.Vector3( 0, 1, 0 );
//var angle = 104;
//var matrix = new THREE.Matrix4().makeRotationAxis( axis, angle * ( Math.PI / 180 ));
//red_vector.applyMatrix4( matrix );

//scene.add(atom(red_vector, "c"));

//scene.add( new THREE.ArrowHelper( red_vector.normalize(), new THREE.Vector3( 0, 50, 0 ), 100, 0xff0000 ));
