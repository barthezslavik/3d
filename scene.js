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

  (function render(data) {
    data =  [{ geometry: "Sphere", details: [20,32,16], color: 0xffffff, position: [0,100,0] },
             { geometry: "Sphere", details: [20,32,16], color: 0xff0000, position: [50,150,0] },
             { geometry: "Sphere", details: [20,32,16], color: 0xff0000, position: [100,100,0] }]

    $(data).each(function(index, item) {
      var geometry = new THREE.SphereGeometry( item.details[0], item.details[1], item.details[2] );
      var material = new THREE.MeshLambertMaterial( { color: item.color } );
      var object = new THREE.Mesh(geometry, material);
      object.position.set(item.position[0], item.position[1], item.position[2]);
      scene.add(object);
    });

  })();

  var geometry = new THREE.CylinderGeometry(100, 100, 400, 50, 50, false);
  var material =  new THREE.MeshNormalMaterial();
  var cylinder = new THREE.Mesh(geometry, material);
  cylinder.overdraw = true;
  //scene.add(cylinder);
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
