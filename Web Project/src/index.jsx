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
	metadata, settings, colors
} from "./js/myMainVars.js";

var myModules = [];
import * as myHelper from './js/myHelperFunc.js'; myModules.push(myHelper);

for(let mod of myModules){
	Object.entries(mod).forEach(([name, exported]) => window[name] = exported);
}

//constants needed

var scrollBottom = ()=>{
	return $(window).scrollTop() + $(window).height();
}

function generateBGDonut(){

	const scene = new THREE.Scene();
	const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

	const renderer = new THREE.WebGLRenderer({ alpha: true });
	renderer.setSize( window.innerWidth, window.innerHeight );

	renderer.setClearColor( 0x000000, 0 );

	$('.background-container .the3Dspace').append( renderer.domElement );

	let rect = $('.background-container .the3Dspace')[0].getBoundingClientRect();

	let ratio = window.innerWidth/window.innerHeight;
	renderer.setSize( rect.height, rect.height / ratio);

	let obs = new ResizeObserver(()=>{
		renderer.setSize( window.innerWidth, window.innerHeight );
		let ratio = window.innerWidth/window.innerHeight;
		renderer.setSize( rect.height, rect.height / ratio);
	});

	obs.observe($('.background-container .the3Dspace')[0]);

	camera.position.set(0,0,10);

	let light = new THREE.HemisphereLight(colors.shockingPink,colors.shockingPink,2);
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
				// let props = {
				// 	color: new THREE.Color(colors.blueJeans),
				// }
				// let newmat = new THREE.MeshBasicMaterial(props);

				o.material = mat;
				o.material.wireframe = true;
			}
		});


		let _scale = 100;

		obj.scale.set(_scale,_scale,_scale);

		scene.add( obj );

		var angleOffset = deg2rad(-15);

<<<<<<< Updated upstream
loader.load( 'Projects/Assets/donut3d/scene.gltf', function ( gltf ) {
=======
		obj.rotation.y = deg2rad(0);
>>>>>>> Stashed changes

		var rotateDonut = (_x,_y, _ox, _oy) => {
			let _rect = renderer.domElement.getBoundingClientRect();

			let cx = (_rect.x + (_rect.width/2));
			let cy = (_rect.y + (_rect.height/2));

			obj.rotation.z = (new THREE.Vector2(_x, cx).angle() + _ox);
			obj.rotation.x = (new THREE.Vector2(cy, _y).angle() + _oy);
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

}

function generateFGDonut(){

	const scene = new THREE.Scene();
	const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

	// let rect = $('.main-container .the3Dspace')[0].getBoundingClientRect();

	const renderer = new THREE.WebGLRenderer({ alpha: true });
	renderer.setSize( window.innerWidth, window.innerHeight );

	renderer.setClearColor( 0x000000, 0 );

	$('.main-container .the3Dspace').append( renderer.domElement );

	let rect = $('.main-container .the3Dspace')[0].getBoundingClientRect();

	let ratio = window.innerWidth/window.innerHeight;
	renderer.setSize( rect.height, rect.height / ratio);

	let obs = new ResizeObserver(()=>{
		renderer.setSize( window.innerWidth, window.innerHeight );
		let ratio = window.innerWidth/window.innerHeight;
		renderer.setSize( rect.height, rect.height / ratio);
	});

	obs.observe($('.main-container .the3Dspace')[0]);

	camera.position.set(0,0,10);

	let light = new THREE.HemisphereLight(colors.eggShell,colors.eerieBlack,2);
	scene.add(light);

	let obj;

	// scene.background = new THREE.Color(0xF4EBD9);

	function animate() {
		requestAnimationFrame( animate );

		obj.rotation.y += 0.01;

		renderer.render( scene, camera );
	};

	// var controls = new OrbitControls( camera, renderer.domElement );

	const loader = new GLTFLoader();

	loader.load( '/Assets/donut3d/scene.gltf', function ( gltf ) {

		obj = gltf.scene;

		// obj.traverse((o) => {
		// 	if(o instanceof THREE.Mesh){
		// 		o.material.wireframe = true;
		// 		// let mat = o.material;
		// 		// // let props = Object.assign({
		// 		// // 	color: new THREE.Color('0xffff'),
		// 		// // }, mat);
		// 		// let props = {
		// 		// 	color: new THREE.Color(colors.shockingPink),
		// 		// }
		// 		// let newmat = new THREE.MeshBasicMaterial(props);


		// 		// o.material = newmat;
		// 	}
		// });


		let _scale = 120;

		obj.scale.set(_scale,_scale,_scale);

		scene.add( obj );

		var angleOffset = deg2rad(0);

		obj.rotation.y = deg2rad(0);

		var rotateDonut = (_x,_y, _ox, _oy) => {
			let _rect = renderer.domElement.getBoundingClientRect();

			let cx = (_rect.x + (_rect.width/2));
			let cy = (_rect.y + (_rect.height/2));

			obj.rotation.z = (new THREE.Vector2(_x, cx).angle() + _ox);
			obj.rotation.x = (new THREE.Vector2(cy, _y).angle() + _oy);
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

}

function handleSectionShowByScroll(elem){
	let rect = $(elem)[0].getBoundingClientRect();
	// let cx = rect.x + (rect.height/2);

	if($(window).scrollTop() < (rect.top)){
		$(elem).addClass('opacity-0').addClass('no-display');
	}else{
		$(elem).removeClass('opacity-0').removeClass('no-display');
	}
}

function handleBGByScroll(){
	let rect = $('.homeDonut')[0].getBoundingClientRect();
	if($(window).scrollTop() > rect.bottom){
		$('.bgDonut').removeClass('opacity-0').addClass('opacity-10');
	}else{
		$('.bgDonut').addClass('opacity-0').removeClass('opacity-10');
	}
}

generateBGDonut();
generateFGDonut();

$(()=>{
	handleBGByScroll();
	handleSectionShowByScroll($('.donutsCont'));

	$(window).scroll(function(){
		handleSectionShowByScroll($('.donutsCont'));
		handleBGByScroll();
	});

	$.ajax("Assets/vector_donut.svg",{
      dataType:'text',
      success:function(data){
        $(".donut1").replaceWith(data);
        

        $("#donut1 .donutImg").css("background-image",`url("${"Assets/about_pics/md_caleb.png"}")`);
        $("#donut2 .donutImg").css("background-image",`url("${"Assets/about_pics/md_liez.png"}")`);
        $("#donut3 .donutImg").css("background-image",`url("${"Assets/about_pics/md_jarod.png"}")`);
        $("#donut4 .donutImg").css("background-image",`url("${"Assets/about_pics/md_cass.png"}")`);
        $("#donut5 .donutImg").css("background-image",`url("${"Assets/about_pics/md_andy.png"}")`);

        let clickLock = false;
        let currCont = null;

        let resetConts = (elem)=>{
        	$('.donutCont').removeClass('scale-80').removeClass('scale-120').removeClass('scale-150');
        	$('.donutImg').removeClass('scale-120').removeClass('scale-150');
        }
        let hoverOnCont = (elem)=>{
        	$('.donutCont').addClass('scale-80');
        	$(elem).removeClass('scale-80').addClass('scale-120');
        	$(elem).find('.donutImg').addClass('scale-120');
        }
        let selectCont = (elem)=>{
        	$('.donutCont').addClass('scale-80');
        	$(elem).removeClass('scale-80').addClass('scale-150');
        	$(elem).find('.donutImg').addClass('scale-150');
        }
        let hideInfoConts = ()=>{
        	$('.about-info').addClass('no-display').addClass('no-height').addClass('opacity-0');
        }

        let selectInfoCont = (index)=>{
        	$($('.about-info')[index]).removeClass('no-display').removeClass('no-height').removeClass('opacity-0');
        }
     
        $('.donutCont').on('mouseover',(e)=>{
        	let elem = e.currentTarget;

        	if(!clickLock){
        		hoverOnCont(elem);
        	}
        	
        }).on('mouseout',(e)=>{
        	let elem = e.currentTarget;

        	if(!clickLock){
        		resetConts(elem);
        	}
        	
        }).on('click',(e)=>{
        	let elem = e.currentTarget;

        	if(clickLock && elem == currCont){
    			clickLock = false;
        		resetConts();

	        	hideInfoConts();
	        	currCont = null;
        	}else{
        		clickLock = true;
        		resetConts();
        		hideInfoConts();

	        	selectCont(elem);

	        	$('.donutCont').each(function(_i,_e){
	        		if(_e == elem){
	        			selectInfoCont(_i);
	        		}
	        	});

	        	currCont = elem;
        	}
        	
        });
      },
      error:function(){
        console.log("Err bro");
      }
    });
});

