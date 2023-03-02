
			import * as THREE from 'https://unpkg.com/three/build/three.module.js';

			const scene = new THREE.Scene();
			const camera = new THREE.Camera();
            scene.add(camera)

			const renderer = new THREE.WebGLRenderer({antialias:true,alpha:true});
			renderer.setSize( window.innerWidth, window.innerHeight );
			document.body.appendChild( renderer.domElement );

            var ArToolkitSource= new THREE.ArToolkitSource({sourceType: 'webcam', })
            ArToolkitSource.init(function(){
                setTimeout(function(){
                    ArToolkitSource.onResizeElement();
                    ArToolkitSource.copyElementSizeTo(renderer.domElement);
                },2000)
            });

            var ArToolkitContext = new THREE.ArToolkitContext({
                 // url of the camera parameters
                cameraParametersUrl:'camera_para.dat',
                detectionMode: 'color_and_matrix'
            });
			ArToolkitContext.init(function(){
				camera.projectMatrix.copy(ArToolkitContext.getProjectionMatrix());
			});
			var ArMarkerControls= new THREE.ArMarkerControls(ArToolkitContext,camera,{
				type:'Pattern',
				patternUrl: 'pattern-it-logo.patt',
				changeMatrixMode: 'cameraTransformMatrix'
			});
			scene.visible=false;

			const geometry = new THREE.CubeGeometry( 1, 1, 1 );
			const material = new THREE.MeshNormalMaterial( { 
				transparent: true,
				opacity:0.5,
				side: THREE.DoubleSide
			 } );
			const cube = new THREE.Mesh( geometry, material );
			CubeTextureLoader.position.y = geometry.parameters.height/2;
			scene.add( cube );

			

			function animate() {
				requestAnimationFrame( animate );

				ArToolkitContext.update(ArToolkitSource.domElement);
				scene.visible=camera.visible;

				renderer.render( scene, camera );
			}

			animate();