import React, { Component } from 'react';
import logo from './logo.svg';
import ReactDOM from "react-dom";
import * as THREE from "three";
import { Interaction } from 'three.interaction';
import { BaseScene } from './basescene';


import './App.css';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
interface MyProps {
    cubecolor: string;
    parentCallback: any;
}

interface MyState {
    value: string
}

class ThreeCanvas extends Component<MyProps, MyState> {

    renderer = new THREE.WebGLRenderer({ antialias: true });
    cube: any; // THREE.Mesh;
    scene: THREE.Scene;
    camera: any;
    controls: any; // THREE.Control;
    raycaster = null;
    mouse = new THREE.Vector2();
    baseScene: BaseScene;
    constructor(props: MyProps | Readonly<MyProps>) {
        super(props);

        this.state = {
            value: 'test'
        };


        this.scene = new THREE.Scene();
        this.baseScene = new BaseScene(this.scene);

        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 20000);
        this.camera.position.z = 2500;
        this.camera.position.x = 1500;
        this.camera.position.y = 2000;

        this.scene = new THREE.Scene();
        this.baseScene = new BaseScene(this.scene);

    }

    componentDidMount() {
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 10000);
        this.renderer = new THREE.WebGLRenderer();
        const interaction = new Interaction(this.renderer, this.scene, this.camera);

        this.renderer.setSize(window.innerWidth, window.innerHeight - 200);
        this.renderer.shadowMap.enabled = true; // https://threejsfundamentals.org/threejs/lessons/threejs-shadows.html
        this.renderer.shadowMap.autoUpdate = true;
        this.renderer.shadowMap.needsUpdate = false;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap; //.PCFSoftShadowMap;
        // this.renderer.shadowMap.autoUpdate = false;
        // this.renderer.shadowMap.needsUpdate = true;

        // TODO: in resize event
        // this.camera.aspect = window.innerWidth / window.innerHeight;
        // this.camera.updateProjectionMatrix();
        // this.renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(this.renderer.domElement);

        var geometry = new THREE.BoxGeometry(40, 40, 40);
        var material = new THREE.MeshPhongMaterial({ color: this.props.cubecolor, flatShading: false });

        this.cube = new THREE.Mesh(geometry, material);
        this.cube.receiveShadow = true;
        this.cube.castShadow = true;
        this.scene.add(this.cube);

        this.camera.position.z = 500;

        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        this.controls.enableDamping = false;
        this.controls.dampingFactor = 0.1;
        this.controls.enableRotate = true;
        this.controls.enablePan = true;
        this.controls.enableZoom = true;

        // this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        // this.camera.position.z = 10;
        // this.camera.position.x = 10;
        // this.camera.position.y = 180;
        // this.controls.target = new THREE.Vector3(this.camera.position.x + 1, this.camera.position.y + 1, this.camera.position.z + 1)
        // this.camera.rotateZ(THREE.MathUtils.DEG2RAD * 45);
        // //      this.controls.update();
        // this.camera.lookAt(11110, 0, 0);
        // //  this.controls.target = new THREE.Vector3(1, 1, 1)
        // this.controls.enableZoom = false;
        // this.camera.rotation.z = Math.PI;
        // this.controls.update();
        // this.controls.enableRotation = true;
        // this.controls.enablePan = true;
        // this.controls.panSpeed = 4000;
        // this.controls.keyPanSpeed = 26000;
        // this.controls.maxDistance = 2000;

        // test events
        (this.cube as any).cursor = 'pointer';
        (this.cube as any).on('click', (ev) => {
            console.log('mousclkick ', ev)
            this.props.parentCallback("Dieses Event wurde von der Three-Canvas Child Komponente gefeuert!");
        });
        (this.cube as any).on('mousedown', function (ev) { });
        (this.cube as any).on('mouseout', function (ev) { });
        (this.cube as any).on('mouseover', function (ev) {
            console.log('mouseover ', ev)
        });
        (this.cube as any).on('mousemove', function (ev) { });
        (this.cube as any).on('mouseup', function (ev) { });

        // render loop
        var animate = () => {
            requestAnimationFrame(animate);
            this.cube.position.y = 50;
            this.cube.rotation.x += 0.01;
            this.cube.rotation.y += 0.01;
            this.renderer.render(this.scene, this.camera);
        };
        animate();
    }

    componentDidUpdate(prevProps: any, prevState: any, snapshot: any) {
        console.log('component did update ', prevProps, prevState, snapshot);
        // farbe neu setzen
        var material = new THREE.MeshPhongMaterial({ color: this.props.cubecolor });
        this.cube.material = material;
    }


    // für zoom auf Mousepointer
    // navChange(event) {
    //     console.log('navchange', event);
    //     console.log(this.navigationType);

    //     this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 20000);
    //     this.camera.position.z = 3000;
    //     this.camera.position.x = 3000;
    //     this.camera.position.y = 3000;

    //     if (this.navigationType === 'free') {
    //         this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    //         this.controls.enableDamping = false;
    //         this.controls.dampingFactor = 0.1;
    //         this.controls.enableZoom = false;
    //         // this.controls.activeLook = false;
    //     }
    //     else {
    //         this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    //         this.camera.position.z = 10;
    //         this.camera.position.x = 10;
    //         this.camera.position.y = 180;
    //         this.controls.target = new THREE.Vector3(this.camera.position.x + 1, this.camera.position.y + 1, this.camera.position.z + 1)
    //         this.camera.rotateZ(THREE.MathUtils.DEG2RAD * 45);
    //         //      this.controls.update();
    //         this.camera.lookAt(11110, 0, 0);
    //         //  this.controls.target = new THREE.Vector3(1, 1, 1)
    //         this.controls.enableZoom = false;
    //         this.camera.rotation.z = Math.PI;

    //         this.controls.update();
    //         this.controls.enableRotation = true;
    //         this.controls.enablePan = true;

    //         this.controls.panSpeed = 4000;
    //         this.controls.keyPanSpeed = 26000;
    //         this.controls.maxDistance = 2000;
    //     }
    // }
    // mouseWheel(event) {
    //     // console.log('Wheel event: ', this.navigationType);
    //     if (this.navigationType === 'free') {
    //         var factor = 200;
    //         var mX = event.clientX / window.innerWidth * 2 - 1;
    //         var mY = -event.clientY / window.innerHeight * 2 + 1;
    //         var vector = new THREE.Vector3(mX, mY, 0.1);
    //         vector.unproject(this.camera);
    //         vector.sub(this.camera.position);
    //         if (event.deltaY < 0) {
    //             this.camera.position.addVectors(this.camera.position, vector.setLength(factor));
    //             this.controls.target.addVectors(this.controls.target, vector.setLength(factor));
    //         } else {
    //             this.camera.position.subVectors(this.camera.position, vector.setLength(factor));
    //             this.controls.target.subVectors(this.controls.target, vector.setLength(factor));
    //         }
    //     }
    // }

    render() {
        return (
            <div>{this.props.cubecolor}</div>
        )
    }

}

export default ThreeCanvas;
