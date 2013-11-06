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
  light.position.set(0,0,100);
  scene.add(light);
  var light = new THREE.PointLight(0xffffff);
  light.position.set(0,0,-100);
  scene.add(light);
  var light = new THREE.PointLight(0xffffff);
  light.position.set(0,1000,0);
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
    data =  [
    { geometry: "Sphere", options: [20,32,16], color: 0xFF794D, position: [-135, 46, 0] },
    { geometry: "Cylinder", options: [10, 10, 15, 20, 20, false], color: 0xFF794D, position: [-120,60,0], rotation: 0.7853 },
    { geometry: "Cylinder", options: [10, 10, 15, 20, 20, false], color: 0x66FF33, position: [-80,70,0], rotation: 5.4977 },
    { geometry: "Sphere", options: [20,32,16], color: 0x66FF33, position: [-95, 85, 0] },
    { geometry: "Cylinder", options: [10, 10, 15, 20, 20, false], color: 0x66FF33, position: [-110,70,0], rotation: 0.7853 },
    { geometry: "Cylinder", options: [10, 10, 15, 20, 20, false], color: 0x33CCFF, position: [-70,60,0], rotation: 5.4977 },
    { geometry: "Sphere", options: [20,32,16], color: 0x33CCFF, position: [-50, 50, 0] },
    { geometry: "Cylinder", options: [10, 10, 30, 20, 20, false], color: 0x33CCFF, position: [-20,50,0], rotation: 1.5707 },
    { geometry: "Sphere", options: [20,32,16], color: 0xFF794D, position: [-70, 0, -50] },
    { geometry: "Sphere", options: [20,32,16], color: 0xFF794D, position: [-70, 0, 50] },
    { geometry: "Sphere", options: [20,32,16], color: 0x33CCFF, position: [10, 50, 0] },
    { geometry: "Sphere", options: [20,32,16], color: 0xFF794D, position: [50, 100, 0] },
    { geometry: "Sphere", options: [20,32,16], color: 0x66FF33, position: [50, 0, 0] },
    ]

    $(data).each(function(index, item) {
      var o = item.options;
      var p = item.position;
      var c = item.color;

      if (item.geometry == "Sphere") {
        var geometry = new THREE.SphereGeometry( o[0], o[1], o[2] );
        var material = new THREE.MeshLambertMaterial( { color: c } );
        var object = new THREE.Mesh(geometry, material);
        object.position.set(p[0], p[1], p[2]);
      }

      if (item.geometry == "Cylinder") {
        var geometry = new THREE.CylinderGeometry(o[0], o[1], o[2], o[3], o[4], o[5]);
        var material = new THREE.MeshLambertMaterial( { color: c } );
        var object = new THREE.Mesh(geometry, material);
        object.position.set(p[0], p[1], p[2]);
        object.rotation.z -= item.rotation
      }

      scene.add(object);

    });
  })();
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
