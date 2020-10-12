import React, { Component } from 'react';
import logo from './logo.svg';
import ReactDOM from "react-dom";
import * as THREE from "three";
import { Interaction } from 'three.interaction';

import './App.css';
interface MyProps {
    cubecolor: string;
    parentCallback: any;
}

interface MyState {
    value: string
}

class ThreeCanvas extends Component<MyProps, MyState> {


    cube: any; // THREE.Mesh;

    constructor(props: MyProps | Readonly<MyProps>) {
        super(props);

        this.state = {
            value: 'test'
        };
    }



    componentDidMount() {
        var scene = new THREE.Scene();
        var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        var renderer = new THREE.WebGLRenderer();
        const interaction = new Interaction(renderer, scene, camera);

        renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(renderer.domElement);
        var geometry = new THREE.BoxGeometry(1, 1, 1);
        var material = new THREE.MeshBasicMaterial({ color: this.props.cubecolor });
        this.cube = new THREE.Mesh(geometry, material);
        scene.add(this.cube);
        camera.position.z = 5;

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
            this.cube.rotation.x += 0.01;
            this.cube.rotation.y += 0.01;
            renderer.render(scene, camera);
        };
        animate();
    }



    componentDidUpdate(prevProps: any, prevState: any, snapshot: any) {
        console.log('component did update ', prevProps, prevState, snapshot);
        // farbe neu setzen
        var material = new THREE.MeshBasicMaterial({ color: this.props.cubecolor });
        this.cube.material = material;
    }

    render() {
        return (
            <div>{this.props.cubecolor}</div>
        )
    }

}

export default ThreeCanvas;
