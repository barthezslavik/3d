atom = function(vector, element) {
  var radiusK = 3.87;
  if (element == "h") { color = 0xff5533; radius = 31*radiusK }
  if (element == "o") { color = 0x0099ff; radius = 48*radiusK }
  if (element == "c") { color = 0xffdd44; radius = 67*radiusK }
  if (element == "n") { color = 0x44ff44; radius = 56*radiusK }

  var geometry = new THREE.SphereGeometry(radius/10,32,16);
  var material = new THREE.MeshPhongMaterial({ color: color });
  var object = new THREE.Mesh(geometry, material);

  object.position.set(vector.x, vector.y, vector.z);
  object.name = element
  return object;
}

h2o = function(x, y, z) {
  molecule = new THREE.Object3D();
  var startPosition = new THREE.Vector3( 0, 0, 0 );
  molecule.add(atom(startPosition, "o"));
  var secondPosition = new THREE.Vector3( 16, 0, 0 );
  molecule.add(atom(secondPosition, "h"));
  var angle = 104.5;
  var matrix = new THREE.Matrix4().makeRotationAxis( new THREE.Vector3( 0, 0, 1 ), angle * ( Math.PI / 180 ));
  var thirdPosition = secondPosition.applyMatrix4( matrix );
  molecule.add(atom(thirdPosition, "h"));
  molecule.position.set(x, y, z);
  scene.add( molecule );
}

ch4 = function(x, y, z) {
  molecule = new THREE.Object3D();
  var startPosition = new THREE.Vector3( 0, 0, 0 );
  molecule.add(atom(startPosition, "c"));
  var secondPosition = new THREE.Vector3( 0, 22, 0 );
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

nh3 = function(x, y, z) {
  molecule = new THREE.Object3D();
  var startPosition = new THREE.Vector3( 0, 0, 0 );
  molecule.add(atom(startPosition, "n"));
  var secondPosition = new THREE.Vector3( 0, 18, 0 );
  molecule.add(atom(secondPosition, "h"));
  var angle = 107.5;
  var matrix = new THREE.Matrix4().makeRotationAxis( new THREE.Vector3( 1, 0, 0 ), angle * ( Math.PI / 180 ));
  var thirdPosition = secondPosition.applyMatrix4( matrix );
  molecule.add(atom(thirdPosition, "h"));
  var matrix = new THREE.Matrix4().makeRotationAxis( new THREE.Vector3( 0, 1, 0 ), angle * ( Math.PI / 180 ));
  var thirdPosition = secondPosition.applyMatrix4( matrix );
  molecule.add(atom(thirdPosition, "h"));
  molecule.position.set(x, y, z);
  scene.add( molecule );
}

h2 = function(x, y, z) {
  molecule = new THREE.Object3D();
  var startPosition = new THREE.Vector3( 0, 0, 0 );
  molecule.add(atom(startPosition, "h"));
  var secondPosition = new THREE.Vector3( 0, 18, 0 );
  molecule.add(atom(secondPosition, "h"));
  molecule.position.set(x, y, z);
  scene.add( molecule );
}

co = function(x, y, z) {
  molecule = new THREE.Object3D();
  var startPosition = new THREE.Vector3( 0, 0, 0 );
  molecule.add(atom(startPosition, "c"));
  var secondPosition = new THREE.Vector3( 0, 22, 0 );
  molecule.add(atom(secondPosition, "o"));
  molecule.position.set(x, y, z);
  scene.add( molecule );
}

h2o(-150,40,0);
ch4(-50,40,0);
nh3(50,40,0);
h2(130,40,0);
co(-90,40,80);
