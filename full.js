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