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
  var secondPosition = new THREE.Vector3( 12, 30, 0 );
  molecule.add(atom(secondPosition, "h"));
  var angle = 104.5;
  var matrix = new THREE.Matrix4().makeRotationAxis( new THREE.Vector3( 0, 1, 0 ), angle * ( Math.PI / 180 ));
  var thirdPosition = secondPosition.applyMatrix4( matrix );
  molecule.add(atom(thirdPosition, "h"));
  molecule.position.set(x, y, z);
  scene.add( molecule );
}

methanum = function(x, y, z) {
  molecule = new THREE.Object3D();
  var startPosition = new THREE.Vector3( 0, 0, 0 );
  molecule.add(atom(startPosition, "c"));
  var secondPosition = new THREE.Vector3( 0, 12, 0 );
  molecule.add(atom(secondPosition, "h"));
  var angle = 109.5;
  var matrix = new THREE.Matrix4().makeRotationAxis( new THREE.Vector3( 1, 0, 0 ), angle * ( Math.PI / 180 ));
  var thirdPosition = secondPosition.applyMatrix4( matrix );
  molecule.add(atom(thirdPosition, "h"));
  var matrix = new THREE.Matrix4().makeRotationAxis( new THREE.Vector3( 0, 1, 0 ), angle * ( Math.PI / 180 ));
  var thirdPosition = secondPosition.applyMatrix4( matrix );
  molecule.add(atom(thirdPosition, "h"));
  var fourthPosition = thirdPosition.applyMatrix4( matrix );
  molecule.add(atom(fourthPosition, "h"));
  molecule.position.set(x, y, z);
  scene.add( molecule );
}

water(0,0,0);
water(30,60,0);
methanum(-60,60,0);
