var container, scene, camera, renderer, controls, stats;
var keyboard = new THREEx.KeyboardState();
var clock = new THREE.Clock();
var cube;

init();
animate();

function init() {
  // SCENE
  scene = new THREE.Scene();

  // CAMERA
  var SCREEN_WIDTH = window.innerWidth, SCREEN_HEIGHT = window.innerHeight;
  var VIEW_ANGLE = 45, ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT, NEAR = 0.1, FAR = 20000;
  camera = new THREE.PerspectiveCamera( VIEW_ANGLE, ASPECT, NEAR, FAR);
  scene.add(camera);
  camera.position.set(0,150,400);
  camera.lookAt(scene.position);

  if ($.cookie("camera_x")) {
    camera.lookAt(new THREE.Vector3(0,0,0));
    camera.position.set($.cookie("camera_x"), $.cookie("camera_y"), $.cookie("camera_z"));
  }

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
  var light = new THREE.PointLight(0xFFFFCC);
  light.position.set(0,0,2100);
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

  function update_camera(event) {
    $.cookie("camera_x", camera.position.x);
    $.cookie("camera_y", camera.position.y);
    $.cookie("camera_z", camera.position.z);
  }

  document.addEventListener('mouseup', update_camera, false);
  document.addEventListener('mousewheel', update_camera, false);

  ////////////
  // CUSTOM //
  ////////////

}

function animate() {
  requestAnimationFrame( animate );
  //if (scene.children[3]) { scene.children[3].rotation.y += 0.05; }
  //if (scene.children[4]) { scene.children[4].rotation.y -= 0.08; }
  //if (scene.children[5]) { scene.children[5].rotation.y -= 0.03; }
  render();
  update();
}

function update() {
  controls.update();
  stats.update();
}

function render() {
  renderer.render( scene, camera );
}
