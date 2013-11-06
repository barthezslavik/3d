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
  //scene.add(floor);

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
    { sphere:   [20,32,16], color: 0xFF794D, position: [-135, 46, 0] },
    { cylinder: [10,10,15,20,20,false], color: 0xFF794D, position: [-120,60,0], rotation: [0,0,0.7853] },
    { cylinder: [10,10,15,20,20,false], color: 0x66FF33, position: [-80,70,0], rotation: [0,0,5.4977] },
    { sphere:   [20,32,16], color: 0x66FF33, position: [-95, 85, 0] },
    { cylinder: [10,10,15,20,20,false], color: 0x66FF33, position: [-110,70,0], rotation: [0,0,0.7853] },
    { cylinder: [10,10,15,20,20,false], color: 0x33CCFF, position: [-70,60,0], rotation: [0,0,5.4977] },
    { sphere:   [20,32,16], color: 0x33CCFF, position: [-55, 45, 0] },
    { cylinder: [10,10,30,20,20, false], color: 0x33CCFF, position: [-30,45,0], rotation: [0,0,1.5707] },
    { sphere:   [20,32,16], color: 0x33CCFF, position: [0, 45, 0] },
    { cylinder: [10,10,15,20,20, false], color: 0x33CCFF, position: [15,60,0], rotation: [0, 0, 0.7853] },
    { cylinder: [10,10,15,20,20, false], color: 0xFF794D, position: [25,70,0], rotation: [0, 0, 0.7853] },
    { sphere:   [20,32,16], color: 0xFF794D, position: [39, 85, 0] },
    { cylinder: [10,10,15,20,20, false], color: 0x33CCFF, position: [-57,31,10], rotation: [0.9, 0, 0]},
    { cylinder: [10,10,15,20,20, false], color: 0xFF794D, position: [-57,23,20], rotation: [0.9, 0, 0]},
    { sphere:   [20,32,16], color: 0xFF794D, position: [-57, 10, 35] },
    { cylinder: [10,10,15,20,20, false], color: 0x33CCFF, position: [-57,31,-10], rotation: [-0.9, 0, 0]},
    { cylinder: [10,10,15,20,20, false], color: 0xFF794D, position: [-57,23,-20], rotation: [-0.9, 0, 0]},
    { sphere:   [20,32,16], color: 0xFF794D, position: [-57, 10, -35] },
    { cylinder: [4,4,15,20,20, false], color: 0x33CCFF, position: [15,30,-5], rotation: [0, 0, 5.4977]},
    { cylinder: [4,4,15,20,20, false], color: 0x33CCFF, position: [15,30,5], rotation: [0, 0, 5.4977]},
    { cylinder: [4,4,15,20,20, false], color: 0x66FF33, position: [25,20,-5], rotation: [0, 0, 5.4977]},
    { cylinder: [4,4,15,20,20, false], color: 0x66FF33, position: [25,20,5], rotation: [0, 0, 5.4977]},
    { sphere:   [20,32,16], color: 0x66FF33, position: [40, 5, 0] },
    ]

    $(data).each(function(index, item) {
      var p = item.position;
      var c = item.color;

      if (item.sphere) {
        var s = item.sphere
        var geometry = new THREE.SphereGeometry( s[0], s[1], s[2] );
        var material = new THREE.MeshPhongMaterial( { color: c } );
        var object = new THREE.Mesh(geometry, material);
        object.position.set(p[0], p[1], p[2]);
      }

      if (item.cylinder) {
        var n = item.cylinder;
        var geometry = new THREE.CylinderGeometry(n[0], n[1], n[2], n[3], n[4], n[5]);
        var material = new THREE.MeshLambertMaterial( { color: c } );
        var object = new THREE.Mesh(geometry, material);
        object.position.set(p[0], p[1], p[2]);
        if (item.rotation[0] != 0) object.rotation.x -= item.rotation[0]
        if (item.rotation[1] != 0) object.rotation.y -= item.rotation[1]
        if (item.rotation[2] != 0) object.rotation.z -= item.rotation[2]
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
