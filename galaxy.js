var geometry1 = new THREE.SphereGeometry(10,32,16);
var material1 = new THREE.MeshPhongMaterial({ color: 0x00ff0f });
var object1 = new THREE.Mesh(geometry1, material1);
object1.position.set(-150,0,-50);
scene.add(object1);

//var geometry2 = new THREE.SphereGeometry(10,32,16);
//var material2 = new THREE.MeshPhongMaterial({ color: 0xfff00f });
//var object2 = new THREE.Mesh(geometry2, material2);
//object2.position.set(150,0,-50);
//scene.add(object2);
