Package.describe({
  summary: "three.js version 67 and THREEx packaged for use in Meteor."
});

Package.on_use(function (api) {
	
    api.add_files('lib/three.js', ['client']);
    api.add_files('lib/THREEx.WindowResize.js', ['client']);
    //api.add_files('lib/controls/OrbitControls.js', ['client']);
    //api.export('Detector');
	//api.export('THREE.OrbitControls');
});
