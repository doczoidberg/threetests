import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { CSG } from "@hi-level/three-csg";
import { GridHelper, AxesHelper, Mesh } from "three";


class Room {

  testroom = {
    layout: {
      height: 200,
      wallwidth: 5,
      walls: [
        { x1: 100, y1: 0, x2: 200, y2: 0 },
        { x1: 100, y1: 0, x2: 200, y2: 0 },
        { x1: 100, y1: 0, x2: 200, y2: 0 },
        { x1: 100, y1: 0, x2: 200, y2: 0 },
        { x1: 100, y1: 0, x2: 200, y2: 0 }
      ]

    }

  }

  constructor(scene: THREE.Scene) {
    console.log('create room');

  }

}

export { Room };










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
