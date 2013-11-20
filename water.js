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

water = function(x, y, z) {
  molecule = new THREE.Object3D();
  var startPosition = new THREE.Vector3( 0, 30, 0 );
  molecule.add(atom(startPosition, "o"));
  var secondPosition = new THREE.Vector3( -20, 30, 0 );
  molecule.add(atom(secondPosition, "h"));
  var angle = 104;
  var matrix = new THREE.Matrix4().makeRotationAxis( new THREE.Vector3( 0, 1, 0 ), angle * ( Math.PI / 180 ));
  var thirdPosition = secondPosition.applyMatrix4( matrix );
  molecule.add(atom(thirdPosition, "h"));
  molecule.position.set(x, y, z);
  molecule.rotation.set(x, y, z);
  scene.add( molecule );
}

water(0,0,0);
water(30,60,0);
