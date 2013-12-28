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
  camera.position.set(0,0,400);
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
  var light = new THREE.PointLight(0xFFFFCC);
  light.position.set(0,0,2100);
  scene.add(light);

  //window.delta1 = 0
  //window.delta2 = 0
  //window.exp = 1.2
  window.t = 0
}

function animate() {
  window.t += 1000000000
  //setTimeout(function() { requestAnimationFrame(animate); }, 500);
  requestAnimationFrame(animate);
  m1 = 30
  m2 = 10
  x1 = scene.children[2].position.x;
  x2 = scene.children[3].position.x;
  r = x2-x1;
  r = r*r
  f = 6.6725e-11
  a1 = f/m1
  a2 = f/m2
  s1 = (a1*t*a1*t)/2
  s2 = (a2*t*a2*t)/2

  //window.delta1 += 0.04
  //window.delta2 += 0.00008
  //window.exp += 0.00001
  //scene.children[0].position.z += window.delta1;
  if (scene.children[2].position.x < (scene.children[3].position.x-40)) {
    scene.children[2].position.x += s1;
    scene.children[3].position.x -= s2;
  }
  //scene.children[2].scale.x += window.delta2*exp;
  //scene.children[2].scale.y += window.delta2*exp;
  //scene.children[2].scale.z += window.delta2*exp;
  //scene.children[3].scale.x += window.delta2*exp;
  //scene.children[3].scale.y += window.delta2*exp;
  //scene.children[3].scale.z += window.delta2*exp;
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
