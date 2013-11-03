var container, scene, camera, renderer, controls, stats;
var keyboard = new THREEx.KeyboardState();
var clock = new THREE.Clock();
var cube;

init();
animate();

function init()
{
  scene = new THREE.Scene();
  var SCREEN_WIDTH = window.innerWidth, SCREEN_HEIGHT = window.innerHeight;	
  var VIEW_ANGLE = 45, ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT, NEAR = 0.1, FAR = 20000;
  camera = new THREE.PerspectiveCamera( VIEW_ANGLE, ASPECT, NEAR, FAR);
  scene.add(camera);
  camera.position.set(0,15,4);
  camera.lookAt(scene.position);
  if ( Detector.webgl )
    renderer = new THREE.WebGLRenderer( {antialias:true} );
  else
    renderer = new THREE.CanvasRenderer();
  renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
  container = document.getElementById( 'ThreeJS' );
  container.appendChild( renderer.domElement );
  THREEx.WindowResize(renderer, camera);
  THREEx.FullScreen.bindKey({ charCode : 'm'.charCodeAt(0) });
  controls = new THREE.OrbitControls( camera, renderer.domElement );

  stats = new Stats();
  stats.domElement.style.position = 'absolute';
  stats.domElement.style.bottom = '0px';
  stats.domElement.style.zIndex = 100;
  container.appendChild( stats.domElement );

  var light = new THREE.PointLight(0xffffff);
  light.position.set(0,10,0);
  scene.add(light);

  var light = new THREE.PointLight(0xffffff);
  light.position.set(0,-10,0);
  scene.add(light);

  var light = new THREE.PointLight(0xffffff);
  light.position.set(10,0,0);
  scene.add(light);

  var light = new THREE.PointLight(0xffffff);
  light.position.set(-10,0,0);
  scene.add(light);

  var light = new THREE.PointLight(0xffffff);
  light.position.set(0,0,10);
  scene.add(light);

  var light = new THREE.PointLight(0xffffff);
  light.position.set(0,0,-10);
  scene.add(light);

  var ambientLight = new THREE.AmbientLight(0x111111);
  scene.add(ambientLight);

  //var sphereGeometry = new THREE.SphereGeometry( 50, 32, 16 );
  //var sphereMaterial = new THREE.MeshLambertMaterial( {color: 0x8888ff} );
  //var sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
  //sphere.position.set(100, 50, -50);
  //scene.add(sphere);

  var hGeometry = new THREE.SphereGeometry( 1.1, 50, 50 );
  var hMaterial = new THREE.MeshLambertMaterial( {color: 0xff0000} );
  var h = new THREE.Mesh(hGeometry, hMaterial);
  h.position.set(0, 0, 0);
  scene.add(h);

  var oGeometry = new THREE.SphereGeometry( 0.9, 50, 50 );
  var oMaterial = new THREE.MeshLambertMaterial( {color: 0xffffff} );
  var o = new THREE.Mesh(oGeometry, oMaterial);
  o.position.set(1, 1, 0);
  scene.add(o);

  var oGeometry = new THREE.SphereGeometry( 0.9, 50, 50 );
  var oMaterial = new THREE.MeshLambertMaterial( {color: 0xffffff} );
  var o = new THREE.Mesh(oGeometry, oMaterial);
  o.position.set(-1, 1, 0);
  scene.add(o);


  //var cubeMaterialArray = [];
  //cubeMaterialArray.push( new THREE.MeshBasicMaterial( { color: 0xff3333 } ) );
  //cubeMaterialArray.push( new THREE.MeshBasicMaterial( { color: 0xff8800 } ) );
  //cubeMaterialArray.push( new THREE.MeshBasicMaterial( { color: 0xffff33 } ) );
  //cubeMaterialArray.push( new THREE.MeshBasicMaterial( { color: 0x33ff33 } ) );
  //cubeMaterialArray.push( new THREE.MeshBasicMaterial( { color: 0x3333ff } ) );
  //cubeMaterialArray.push( new THREE.MeshBasicMaterial( { color: 0x8833ff } ) );
  //var cubeMaterials = new THREE.MeshFaceMaterial( cubeMaterialArray );
  //var cubeGeometry = new THREE.CubeGeometry( 100, 100, 100, 1, 1, 1 );
  //cube = new THREE.Mesh( cubeGeometry, cubeMaterials );
  //cube.position.set(-100, 50, -50);
  //scene.add( cube );

  //var axes = new THREE.AxisHelper(100);
  //scene.add( axes );

  var skyBoxGeometry = new THREE.CubeGeometry( 10000, 10000, 10000 );
  var skyBoxMaterial = new THREE.MeshBasicMaterial( { color: 0x9999ff, side: THREE.BackSide } );
  var skyBox = new THREE.Mesh( skyBoxGeometry, skyBoxMaterial );
  //scene.add(skyBox);
  scene.fog = new THREE.FogExp2( 0x9999ff, 0.00025 );
}

function animate()
{
  requestAnimationFrame( animate );
  render();
  update();
}

function update()
{
  var delta = clock.getDelta();
  if ( keyboard.pressed("1") )
    document.getElementById('message').innerHTML = ' Have a nice day! - 1';
  if ( keyboard.pressed("2") )
    document.getElementById('message').innerHTML = ' Have a nice day! - 2 ';
  controls.update();
  stats.update();
}

function render()
{
  renderer.render( scene, camera );
}
