import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { CSG } from "@hi-level/three-csg";
import { GridHelper, AxesHelper, Mesh } from "three";


class BaseScene {
  scaleX = 1;
  scaleY = 1;
  public grid: THREE.GridHelper | undefined;
  public axes: THREE.AxesHelper | undefined;
  public dirLabels: THREE.Mesh[] = [];
  public grass: THREE.Mesh = new Mesh;

  constructor(scene: THREE.Scene) {
    console.log('create basescene', scene);
    scene.background = new THREE.Color().setRGB(0.8, 0.9, 1);

    this.addLights(scene, true);
    this.addHelpers(scene);
    this.addLabels(scene);
    scene.fog = new THREE.Fog((scene as any).background, 200, 2000);
  }

  addHelpers(scene) {
    // Achsen
    this.axes = new THREE.AxesHelper(1000 * this.scaleX);
    scene.add(this.axes);
    this.axes.visible = false;
    // Grid
    const size = 2000 * this.scaleX;
    const divisions = 40;
    this.grid = new THREE.GridHelper(size, divisions, 0x000000, 0x888888);
    scene.add(this.grid);
    this.grid.visible = true;

    // bodentextur
    const floor_material = new THREE.MeshPhongMaterial({ color: 0xaaaaaa });
    const loader = new THREE.TextureLoader();
    const Texture = loader.load("/assets/laminate1.jpg", texture => { floor_material.map = texture; floor_material.needsUpdate = true; });
    Texture.wrapS = Texture.wrapT = THREE.RepeatWrapping;
    Texture.repeat.set(200, 100);
    const floor_geometry = new THREE.PlaneGeometry(9000 * this.scaleX, 9000 * this.scaleX);
    this.grass = new THREE.Mesh(floor_geometry, floor_material);
    this.grass.position.y -= 0.9;
    //   floor.position.set(0, -2, 0);
    this.grass.rotation.x -= Math.PI / 2;
    this.grass.receiveShadow = true;
    this.grass.name = "grass";
    this.grass.castShadow = false;
    scene.add(this.grass);
  }


  addLights(scene, showHelper = true) {

    const hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.8);
    //  hemiLight.color.setHSL(1, 1, 1);
    //  hemiLight.groundColor.setHSL(0.095, 1, 0.75);
    hemiLight.position.set(0, 1000 * this.scaleX, 0);
    // hemiLight.castShadow = true;
    scene.add(hemiLight);
    const hemiLightHelper = new THREE.HemisphereLightHelper(hemiLight, 10);
    if (showHelper)
      scene.add(hemiLightHelper);
    // var light = new THREE.AmbientLight(0xffffff); // soft white light
    // scene.add(light);


    const dirLight = new THREE.DirectionalLight(0xffffff, 1);
    dirLight.color.setHSL(1, 1, 1);
    dirLight.position.set(-1, 1.75, -1.45);
    dirLight.position.multiplyScalar(3000);
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.width = 2048;  // TODO: ausreichend?
    dirLight.shadow.mapSize.height = 2048;
    const d = 3500;
    dirLight.shadow.camera.left = -d;
    dirLight.shadow.camera.right = d;
    dirLight.shadow.camera.top = d;
    dirLight.shadow.camera.bottom = -d;
    dirLight.shadow.camera.far = 65000;
    dirLight.shadow.bias = -0.00001;
    const dirLightHeper = new THREE.DirectionalLightHelper(dirLight, 10000);
    scene.add(dirLight);
    if (showHelper)
      scene.add(dirLightHeper);
  }


  addLabels(scene) {
    this.dirLabels = [];

    // schriften: https://github.com/mrdoob/three.js/tree/master/examples/fonts
    const loader2 = new THREE.FontLoader();
    loader2.load(
      "assets/Roboto_Bold.json",
      font => {
        // tslint:disable-next-line: one-variable-per-declaration
        let xMid: number,
          text: THREE.Mesh;

        const color = 0x006699;
        const matDark = new THREE.LineBasicMaterial({ color, side: THREE.DoubleSide });
        const matLite = new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.7, side: THREE.DoubleSide });

        let shapes = font.generateShapes("Norden", 60 * this.scaleX);
        let geometry = new THREE.ShapeBufferGeometry(shapes);
        geometry.computeBoundingBox();
        if (geometry.boundingBox) {

          xMid = -0.5 * (geometry.boundingBox.max.x - geometry.boundingBox.min.x);
          geometry.translate(xMid, 0, 0);
        }
        text = new THREE.Mesh(geometry, matLite);
        text.position.z = -1000 * this.scaleX;
        text.name = "label";
        this.dirLabels.push(text);
        scene.add(text);

        shapes = font.generateShapes("Osten", 60 * this.scaleX);
        geometry = new THREE.ShapeBufferGeometry(shapes);
        geometry.computeBoundingBox();
        if (geometry.boundingBox) {
          xMid = -0.5 * (geometry.boundingBox.max.x - geometry.boundingBox.min.x);
          geometry.translate(xMid, 0, 0);
        }
        text = new THREE.Mesh(geometry, matLite);
        text.position.x = 1000 * this.scaleX;
        text.name = "label";
        this.dirLabels.push(text);
        scene.add(text);

        shapes = font.generateShapes("Süden", 60 * this.scaleX);
        geometry = new THREE.ShapeBufferGeometry(shapes);
        geometry.computeBoundingBox();
        if (geometry.boundingBox) {
          xMid = -0.5 * (geometry.boundingBox.max.x - geometry.boundingBox.min.x);
          geometry.translate(xMid, 0, 0);
        }
        text = new THREE.Mesh(geometry, matLite);
        text.position.z = 1000 * this.scaleX;
        text.name = "label";
        this.dirLabels.push(text);
        scene.add(text);

        shapes = font.generateShapes("Westen", 60 * this.scaleX);
        geometry = new THREE.ShapeBufferGeometry(shapes);
        geometry.computeBoundingBox();
        if (geometry.boundingBox) {
          xMid = -0.5 * (geometry.boundingBox.max.x - geometry.boundingBox.min.x);
          geometry.translate(xMid, 0, 0);
        }
        text = new THREE.Mesh(geometry, matLite);
        text.position.x = -1000 * this.scaleX;
        text.name = "label";
        this.dirLabels.push(text);
        scene.add(text);


      }
    ); // end load function
  }
  // GROUND

  // var groundGeo = new THREE.PlaneBufferGeometry(10000, 10000);
  // var groundMat = new THREE.MeshLambertMaterial({ color: 0xffffff });
  // groundMat.color.setHSL(0.095, 1, 0.75);

  // var ground = new THREE.Mesh(groundGeo, groundMat);
  // ground.position.y = -33;
  // ground.rotation.x = -Math.PI / 2;
  // ground.receiveShadow = true;
  // scene.add(ground);

  // SKYDOME

  // var vertexShader = document.getElementById("vertexShader").textContent;
  // var fragmentShader = document.getElementById("fragmentShader").textContent;
  // var uniforms = {
  //   topColor: { value: new THREE.Color(0x0077ff) },
  //   bottomColor: { value: new THREE.Color(0xffffff) },
  //   offset: { value: 33 },
  //   exponent: { value: 0.6 }
  // };
  // uniforms["topColor"].value.copy(hemiLight.color);

  // scene.fog.color.copy(uniforms["bottomColor"].value);

  // var skyGeo = new THREE.SphereBufferGeometry(4000, 32, 15);
  // var skyMat = new THREE.ShaderMaterial({
  //   uniforms: uniforms,
  //   vertexShader: vertexShader,
  //   fragmentShader: fragmentShader,
  //   side: THREE.BackSide
  // });

  // var sky = new THREE.Mesh(skyGeo, skyMat);
  // scene.add(sky);
}

export { BaseScene };










  //  //extruebeispiel
  //   const length = 40;
  //   const width = 20;
  //   const shape = new THREE.Shape();
  //   shape.moveTo(10, 10);
  //   shape.lineTo(10, width);
  //   shape.lineTo(length, width);
  //   shape.lineTo(length, 0);
  //   shape.lineTo(10, 10);
  //   const extrudeSettings = {
  //     steps: 2,
  //     depth: 2,
  //     bevelEnabled: false,
  //     bevelThickness: 1,
  //     bevelSize: 1,
  //     bevelOffset: 0,
  //     bevelSegments: 10
  //   };
  //   const geometry2 = new THREE.ExtrudeGeometry(
  //     shape,
  //     extrudeSettings
  //   );
  //   const material2 = new THREE.MeshPhongMaterial(
  //     {
  //       shadowSide: THREE.DoubleSide,
  //       wireframe: false,
  //       color: 0xaaaaaa,
  //       specular: 0xaaaaaa,
  //       shininess: 100
  //       //   ambient: 0x000000,
  //       //    wrapAround: false
  //     }
  //   ); // new THREE.MeshBasicMaterial({ color: 0x00ff00 });
  //   const mesh2 = new THREE.Mesh(
  //     geometry2,
  //     material2
  //   );
  //   //  mesh2.position.z = 30;
  //   mesh2.rotateOnAxis(new THREE.Vector3(0, 1, 0), THREE.MathUtils.DEG2RAD * 90);
  //   mesh2.castShadow = true;
  //   mesh2.receiveShadow = true;
  //   this.testmesh = mesh2;
  //   // this.scene.add(mesh2);
