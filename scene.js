var container, scene, camera, renderer, controls, stats;
var keyboard = new THREEx.KeyboardState();
var clock = new THREE.Clock();
var cube;

init();
animate();

function init()
{

  // SCENE
  scene = new THREE.Scene();

  // CAMERA
  var SCREEN_WIDTH = window.innerWidth, SCREEN_HEIGHT = window.innerHeight;
  var VIEW_ANGLE = 45, ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT, NEAR = 0.1, FAR = 20000;
  camera = new THREE.PerspectiveCamera( VIEW_ANGLE, ASPECT, NEAR, FAR);
  scene.add(camera);
  camera.position.set(0,150,400);
  camera.lookAt(scene.position);

  // RENDERER
  if ( Detector.webgl )
    renderer = new THREE.WebGLRenderer( {antialias:true} );
  else
    renderer = new THREE.CanvasRenderer();
  renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
  container = document.getElementById( 'ThreeJS' );
  container.appendChild( renderer.domElement );

  // EVENTS
  THREEx.WindowResize(renderer, camera);
  THREEx.FullScreen.bindKey({ charCode : 'm'.charCodeAt(0) });

  // CONTROLS
  controls = new THREE.OrbitControls( camera, renderer.domElement );

  // STATS
  stats = new Stats();
  stats.domElement.style.position = 'absolute';
  stats.domElement.style.bottom = '0px';
  stats.domElement.style.zIndex = 100;
  container.appendChild( stats.domElement );

  // LIGHT
  var light = new THREE.PointLight(0xffffff);
  light.position.set(100,250,100);
  scene.add(light);

  // FLOOR
  var floorTexture = new THREE.ImageUtils.loadTexture( 'images/checkerboard.jpg' );
  floorTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping;
  floorTexture.repeat.set( 10, 10 );
  var floorMaterial = new THREE.MeshBasicMaterial( { map: floorTexture, side: THREE.DoubleSide } );
  var floorGeometry = new THREE.PlaneGeometry(1000, 1000, 10, 10);
  var floor = new THREE.Mesh(floorGeometry, floorMaterial);
  floor.position.y = -0.5;
  floor.rotation.x = Math.PI / 2;
  scene.add(floor);

  // SKYBOX
  var skyBoxGeometry = new THREE.CubeGeometry( 10000, 10000, 10000 );
  var skyBoxMaterial = new THREE.MeshBasicMaterial( { color: 0x9999ff, side: THREE.BackSide } );
  var skyBox = new THREE.Mesh( skyBoxGeometry, skyBoxMaterial );
  scene.add(skyBox);

  ////////////
  // CUSTOM //
  ////////////

  Object.build = function (formula, angle, distance, coords) {
    this.formula = formula
    this.angle = angle
    this.distance = distance
    this.coords = coords
    var molecule = [20, 30, 40];
    molecule.forEach(function(entry) {
      var geometry = new THREE.SphereGeometry( 20, 32, 16 );
      var material = new THREE.MeshLambertMaterial( { color: 0xff0000 } );
      var oxygen = new THREE.Mesh(geometry, material);
      oxygen.position.set(0, 70, 0);
      scene.add(oxygen);
    });
  };

  var water = new Object.build("H-O-H", 104.45, 0.9584, [0,70,0])

  //var oxygen_geometry = new THREE.SphereGeometry( 20, 32, 16 );
  //var oxygen_material = new THREE.MeshLambertMaterial( { color: 0xff0000 } );
  //var oxygen = new THREE.Mesh(oxygen_geometry, oxygen_material);
  //oxygen.position.set(0, 70, 0);
  //scene.add(oxygen);

  //var hydrogen_material = new THREE.MeshLambertMaterial( { color: 0xffffff } );
  //var hydrogen_geometry = new THREE.SphereGeometry( 15, 32, 16 );
  //var hydrogen = new THREE.Mesh(hydrogen_geometry, hydrogen_material);
  //hydrogen.position.set(10, 30, 0);
  //scene.add(hydrogen);
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
