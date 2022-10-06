///index.jsx

// import React from "react";
// import ReactDOM from "react-dom";
// import PropTypes from "prop-types";
// import socketClient from "socket.io-client";

import $ from "jquery";
import anime from "animejs/lib/anime.es.js";
import jsonrepair from "jsonrepair";

import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

import {
	metadata, settings,
} from "./js/myMainVars.js";

var myModules = [];
import * as myHelper from './js/myHelperFunc.js'; myModules.push(myHelper);

for(let mod of myModules){
	Object.entries(mod).forEach(([name, exported]) => window[name] = exported);
}

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

// scene.color = 0xFFFFFF;

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );

$('.the3Dspace').append( renderer.domElement );

let rect = $('.the3Dspace')[0].getBoundingClientRect();

let ratio = window.innerWidth/window.innerHeight;
renderer.setSize( rect.height, rect.height / ratio);

let obs = new ResizeObserver(()=>{
	renderer.setSize( window.innerWidth, window.innerHeight );
	let ratio = window.innerWidth/window.innerHeight;
	renderer.setSize( rect.height, rect.height / ratio);
});

obs.observe($('.the3Dspace')[0]);

camera.position.set(0,0,10);

let light = new THREE.HemisphereLight(0xF4EBD9,0x000000,2);
scene.add(light);

let obj;

scene.background = new THREE.Color(0xF4EBD9);

function animate() {
	requestAnimationFrame( animate );

	obj.rotation.y += 0.01;

	renderer.render( scene, camera );
};

// var controls = new OrbitControls( camera, renderer.domElement );

const loader = new GLTFLoader();

loader.load( '/Assets/donut3d/scene.gltf', function ( gltf ) {

	obj = gltf.scene;

	obj.traverse((o) => {
		if(o instanceof THREE.Mesh){
			let mat = o.material;
			let props = Object.assign({}, mat);
			let newmat = new THREE.MeshBasicMaterial();


			o.material = mat;
		}
	});


	obj.scale.set(100,100,100);

	scene.add( obj );

	var angleOffset = 0;

	var rotateDonut = (_x,_y, _ox, _oy) => {
		let _rect = renderer.domElement.getBoundingClientRect();
		obj.rotation.z = (new THREE.Vector2(_x, _rect.height).angle() - _ox);
		obj.rotation.x = (new THREE.Vector2(_rect.width, _y).angle() - _oy);
		obj.rotation.y = obj.rotation.y;

		renderer.render( scene, camera );
	}

	rotateDonut(window.clientX, window.clientY, angleOffset, angleOffset);

	document.body.addEventListener("mousemove", function(e){
		e.stopPropagation();
		rotateDonut(e.clientX, e.clientY, angleOffset, angleOffset);
	});

	
}, undefined, function ( error ) {

	console.error( error );

} );

$(()=>{

});

