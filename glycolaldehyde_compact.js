(function render() {
    $([

      { h: [-70, 46, 20 ] },
      { o: [-50, 70, 20 ] },
      { c: [-30, 45, 20 ] },
      { c: [  0, 45, 20 ] },
      { h: [-30, 20, 45 ] },
      { h: [-30, 20, -5] },
      { o: [ 20, 20, 20 ] },
      { h: [ 20, 70, 20 ] },

    ]).each(function(index, item) {

      p = Object.keys(item)[0];
      if (p == "h") color = 0xff5533;
      if (p == "o") color = 0x0099ff;
      if (p == "c") color = 0xffdd44;

      var geometry = new THREE.SphereGeometry(20,32,16);
      var material = new THREE.MeshPhongMaterial({ color: color });
      var object = new THREE.Mesh(geometry, material);
      object.position.set(item[p][0], item[p][1], item[p][2]);

      scene.add(object);
    });
})();
