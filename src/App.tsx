import React, { Component } from 'react';
import logo from './logo.svg';
import ReactDOM from "react-dom";
import * as THREE from "three";
import ThreeCanvas from "./ThreeCanvas";

import './App.css';
interface MyProps {
  cubecolor: string;
  parentCallback: any;
}

interface IProps {
  //  id: string
  // cubecolor: string;
  // parentCallback: any;
}
interface IState {
  rendered: boolean,
  scene: any
}


class App extends Component<IProps, IState>  {

  constructor(props: IProps | Readonly<IProps>) {
    super(props);
    this.changecolor = this.changecolor.bind(this);
    this.state = {
      rendered: true,
      scene: {
        cubecolor: '#0000ff'
      }
    }
  }
  changecolor() {

    //this.state.scene.cubecolor = "#00ff00"
    this.setState({ scene: { cubecolor: "#00ff00" } })
    console.log('color changed to ', this.state.scene.cubecolor)
  }

  callbackFunction(childData: any) {
    console.log('event from app', childData);
    //    this.setState({ message: childData })
  }

  render() {
    return (
      <div>
        <div>test {this.state.scene.cubecolor}</div>
        <button onClick={this.changecolor}>Change color!</button>
        <ThreeCanvas cubecolor={this.state.scene.cubecolor} parentCallback={this.callbackFunction}></ThreeCanvas>
      </div>
    )
  }

}

export default App;
