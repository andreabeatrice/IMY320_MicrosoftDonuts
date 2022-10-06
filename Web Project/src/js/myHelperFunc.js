/*myHelperModule.js*/
///FOR WEB API FRONT-END MODULES

// export var lego = '50cent';
///CONSOLE///
export function cout(...vars){
	console.log(...vars);
}

///OBJECT MODIFICATION///
Storage.prototype.setObject = function(key, value) {
    this.setItem(key, JSON.stringify(value));
}

Storage.prototype.getObject = function(key) {
    var value = this.getItem(key);
    return value && JSON.parse(value);
}

Array.prototype.last = function(){
	return this[this.length - 1];
};
Array.prototype.first = function(){
  return this[0];
};
Array.prototype.removeAt = function(index){
	return this.splice(index,1);
}

BigInt.prototype.toJSON = function(){
	return this.toString();
}

///OBJECT AND HTML///
export function loadHTMLtoObject(query,url) {
    document.querySelector(query).setAttribute('data', url);
}

export function docReady(fn) {
    // see if DOM is already available
    if (document.readyState === "complete" || document.readyState === "interactive") {
        // call on next available tick
        setTimeout(fn, 1);
    } else {
        document.addEventListener("DOMContentLoaded", fn);
    }
}

///MEDIA QUERIES///
export const footstrapMediaQueries = {
	xs: '0px',
	sm: '576px',
	md: '768px',
	lg: '992px',
	xl: '1200px',
	xxl: '1400px',
};

export function forMediaQuery(mediaQuery,matchFunc,unmatchFunc){
	var match = window.matchMedia(mediaQuery);
	if(match.matches){
		matchFunc();
	}else{
		unmatchFunc();
	}
}

export function checkBootstrapMedia(){
	var qKeys = Object.keys(footstrapMediaQueries);
	var qVals = Object.values(footstrapMediaQueries);

	for(var c=qVals.length-1;c>=0;c--){
		var qVal = qVals[c];
		var match = window.matchMedia(`(max-width: ${qVal})`);
		if(match.matches) return qKey;
	}
	return 'xs';
}

///FORMS///
export function getFormData(query){
	var formElement;
	if(typeof query === 'string')
		formElement = document.querySelector(query);
	else if(query instanceof HTMLFormElement)
		formElement = query;
	else return null;
	var formData = new FormData(formElement);
	return formData;
}

export function submitForm(query,callback,url){
	var formElement = document.querySelector(query);
	var formData = new FormData(formElement);
	var methodType = formElement.getAttribute('method');
	ajax(formData,callback,url,methodType);
}
var handleForm = (e)=>{
	e.preventDefault();
	// console.log(formDataToJSON(getFormData(e.currentTarget)));
	console.debug('Submit has been defected. Please use JS to override form submit');
};
export function defectAllFormSubmits(){
	var allForms = document.getElementsByTagName('form');
	// console.log(allForms);
	for(var form of allForms){
		form.submit = ()=>{};
		form.addEventListener('submit', handleForm);
	}
}

export function formDataToJSON(formData,stringify=false){
	var object = {};
	formData.forEach((value, key) => {
	    // Reflect.has in favor of: object.hasOwnProperty(key)
	    if(!Reflect.has(object, key)){
	        object[key] = value;
	        return;
	    }
	    if(!Array.isArray(object[key])){
	        object[key] = [object[key]];    
	    }
	    object[key].push(value);
	});
	if(stringify) return JSON.stringify(object);
	return object;

}

export function logg(txt){
	var k = "";
	if(document.querySelectorAll('.logg')){
		k = '.logg';
	}else if(document.querySelectorAll('.mess')){
		k = '.mess';
	}

	if(k!=""){
		var loggElems = document.querySelectorAll(k);
		for(var i=0;i<loggElems.length;i++){
			var loggElem = loggElems[i];
			loggElem.innerHTML = txt;
		}
	}else{
		console.log(txt);
	}
	
}


///AJAX///
export function myAjax(jsonData, callback,url="",type="POST",logResults=true){
	var req = new XMLHttpRequest();
	req.onreadystatechange = function()
	{
		if(req.readyState == 4){
			console.log('STATUS:'+req.status);
			if(req.status >= 200 && req.status < 300){
				// callback(req.responseText);
				if(isJSON(req.responseText)){
					var json = JSON.parse(req.responseText);
					callback(json);
				}
				else{
					callback(req.responseText);
				}
			}
			else if(req.status>=300){
				if(isJSON(req.responseText)){
					var json = JSON.parse(req.responseText);
					if(isObject(json) && 'message' in json)
						if(logResults) logg(json.message);
						else console.log(json.message);
				}
				else{
					if(logResults) logg(req.responseText);
					else console.log(req.responseText);
				}
			}else{
				if(logResults) logg(req.responseText);
				else console.log(req.responseText);
			}
		}
		else{
			if(logResults) logg('Loading...'+req.readyState)
		}
	};

	req.open(type,url,true);
	req.setRequestHeader('Content-Type', 'application/json');
	req.setRequestHeader("Content-Type", "multipart/form-data");
	if(type.toUpperCase()=="POST"){
		req.send(JSON.stringify(jsonData));
	}
	else{
		req.send();
	}
}

export function ajax(data, url="",type="POST",success=function(){},fail=function(){}){
	var req = new XMLHttpRequest();
	req.onreadystatechange = function()
	{
		if(req.readyState == 4){
			console.log('STATUS:'+req.status);
			if(req.status >= 200 && req.status < 300){
				success(req.responseText);
			}
			else if(req.status>=300){
				fail(req.responseText);
			}else{
				console.log(req.responseText);
			}
		}else{
		}
	};
	req.open(type,url,true);
	// req.setRequestHeader('Content-Type', 'application/json');
	// req.setRequestHeader("Content-Type", "multipart/form-data");
	if(type.toUpperCase()=="POST"){
		req.send(data);
	}
	else{
		req.send();
	}
}

export function ajaxGET(url,callback,failback=function(){}){
	ajax("",url,"GET",callback,failback);
}
export function ajaxPOST(data,url,callback,failback=function(){}){
	ajax(data,url,"POST",callback,failback);
}

export function getFileBlob(url,type="",callback=(uurl,bblob,bbytes)=>{}){
	var oReq = new XMLHttpRequest();
	oReq.open("GET", url, true);
	oReq.responseType = "arraybuffer";

	oReq.onload = function(oEvent) {
	  var arrayBuffer = oReq.response;

	  // if you want to access the bytes:
	  var byteArray = new Uint8Array(arrayBuffer);
	  // ...

	  // If you want to use the image in your DOM:
	  var _blob = new Blob([arrayBuffer], {type: type});
	  // var _blob = new File([arrayBuffer], hash32(url), {type: type});
	  var _url = URL.createObjectURL(_blob);
	  
	  callback(_url,_blob,byteArray);
	  //callback(URL,FILEBLOB,FILEDATA);
	};
	oReq.send();
}

export function processAjaxData(contentElement, urlPath="", response=null, state={}, callback=function(){}){
	 var newState = jQuery.extend(true, { }, state);
	 if(response){
	 	newState.html = response.html;
	 	newState.pageTitle = response.pageTitle;
	 	if(contentElement)
	 		contentElement.innerHTML = response.html;
	 	document.title = response.pageTitle;
	 }else{
	 	newState.html = '';
	 	newState.pageTitle = '';
	 }
	 window.history.pushState(newState,newState.pageTitle,urlPath);
	 callback();
}

export function setHistoryState(urlPath="", response=null, state={}, callback=function(){}){
	 var newState = jQuery.extend(true, { }, state);
	 if(response){
	 	newState.html = response.html;
	 	newState.pageTitle = response.pageTitle;
	 	document.title = response.pageTitle;
	 }else{
	 	newState.html = '';
	 	newState.pageTitle = '';
	 }
	 window.history.replaceState(newState,newState.pageTitle,urlPath);
	 callback();
}
export function pushHistoryState(urlPath="", response=null, state={}, callback=function(){}){
	 var newState = jQuery.extend(true, { }, state);
	 if(response){
	 	newState.html = response.html;
	 	newState.pageTitle = response.pageTitle;
	 	document.title = response.pageTitle;
	 }else{
	 	newState.html = '';
	 	newState.pageTitle = '';
	 }
	 window.history.pushState(newState,newState.pageTitle,urlPath);
	 callback();
}

export function objectToURLParams(obj){
	var parts = [];
  for(var key in obj) {
      if(obj.hasOwnProperty(key)) {
          parts.push(encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]));
      }
  }
  return "?" + parts.join('&');
}

//ref: https://stackoverflow.com/questions/814613/how-to-read-get-data-from-a-url-using-javascript
export function parseURLParams(url,typecast=false,autoParseObjects=false) {
    var queryStart = url.indexOf("?") + 1,
        queryEnd   = url.indexOf("#") + 1 || url.length + 1,
        query = url.slice(queryStart, queryEnd - 1),
        pairs = query.replace(/\+/g, " ").split("&"),
        params = {}, i, n, v, nv, nx;

    if (query === url || query === "") return;

    for (i = 0; i < pairs.length; i++) {
        nv = pairs[i].split("=", 2);
        n = decodeURIComponent(nv[0]);
        v = decodeURIComponent(nv[1]);
        nx = null;
        if(typecast){
        	if(autoParseObjects){
	        	if(n.includes('[')){
	        		//test for array
	        		if(n.includes('[]')){
	        			n = n.replace('[]','');
	        			if(!params.hasOwnProperty(n))
	        				params[n] = [];
	        		}
	        		//test for object
	        		else if(n.includes(']')){
	        			var nn = n.split('[', 2);
	        			n = nn[0]; nx = nn[1].replace(']','');
	        			if(!params.hasOwnProperty(n))
	        				params[n] = {};
	        			params[n][nx] = null;
	        		}
	        	}
	        }
        		//test for number
      		if(!(isNaN(v)))
	        	v = Number(v);
	        else{
	        	//test for boolean
	        	v = v === 'true' || (v === 'false' ? false : v);
	        	//test for nullable
	        	v = v === 'undefined' ? undefined : (v === 'null' ? null : v);
	        }
        	
        }
        
        if (!params.hasOwnProperty(n)){
        	params[n] = v;
        }
        else{
					if(typeof params[n] !== 'object'){
						params[n] = [params[n]];
					}
					else if(params[n] instanceof Array)
        		params[n].push(nv.length === 2 ? v : null);
        	else if(nx != null)
        		params[n][nx] = v;
        }
        	
    }
    /*for(var param of Object.keys(params)){
    	if(params[param] instanceof Array && params[param].length == 1)
    		params[param] = params[param][0];
    }*/
    return params;
}

///COOKIES///
//reference: https://www.w3schools.com/js/js_cookies.asp
export function checkCookie(cname) {
	let cookey = getCookie(cname);
	if(cookey != "") return true;
	return false;
}
export function setCookie(cname, cvalue, exdays=1) {
	const d = new Date();
	d.setTime(d.getTime() + (exdays*24*60*60*1000));
	let expires = "expires="+ d.toUTCString();
	document.cookie = cname + "=" + cvalue + ";" + expires + "; path=/";
}
export function deleteCookie(cname){
	document.cookie = cname+"=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}
export function getCookie(cname) {
	var name = cname + "=";
	var decodedCookie = decodeURIComponent(document.cookie);
	var ca = decodedCookie.split(';');
	for(var i = 0; i <ca.length; i++){
		var c = ca[i];
		while (c.charAt(0) == ' '){
			c = c.substring(1);
		}
		if (c.indexOf(name) == 0){
			return c.substring(name.length, c.length);
		}
	}
	return "";
}
///VERIFY DATA TYPE///
export function isInt(val){
	return (isNumber(val) && Math.trunc(val) === val);
}
export function isNumber(val){
	return !isNaN(Number(val));
}
export function isArray(arr){
	return (typeof arr === 'object' && arr instanceof Array);
}
export function isString(str){
	return (typeof str === 'string');
}
export function isFunction(func){
	return (typeof func === 'function' || func instanceof Function);
}
export function isObject(object) {
  return (object != null && typeof object === 'object');
}
export function isInRange(num,min,max,inclusive=true){
	if(inclusive)
		return (num>=min && num<=max);
	else
		return (num>min && num<max);
}
export function isJSON(str) {
		var obj = null;
    try {
      obj = JSON.parse(str);
    } catch (e) {
        return false;
    }
    if(isObject(obj))
    	return true;
    return false;
}
export function link_is_external(link_element, _location=window.location) {
  return (link_element.host !== _location.host);
}
export function isExternalURLFast(url) {
  var match = url.match(/^([^:\/?#]+:)?(?:\/\/([^\/?#]*))?([^?#]+)?(\?[^#]*)?(#.*)?/);
  if (typeof match[1] === "string" && match[1].length > 0 && match[1].toLowerCase() !== location.protocol) return true;
  if (typeof match[2] === "string" && match[2].length > 0 && match[2].replace(new RegExp(":("+{"http:":80,"https:":443}[location.protocol]+")?$"), "") !== location.host) return true;
  return false;
}
export function isExternalURL(url){
	var res = false;
	try {
		res = (new URL(url).origin !== location.origin);
	} catch(e) {
		return false;
	}
	return res;
}
export function JSONobjectsAreEqual(objA,objB){
  var jsonA = JSON.stringify(objA);
  var jsonB = JSON.stringify(objB);
  if(jsonA===jsonB) return true;
  return false;
}

///GENERATING RANDOM VALUE///

export function randomId(_prefix='',_suffix=''){
	return _prefix+(Math.random().toString(36).substr(2, 9))+_suffix;
}

export function randomID(_prefix='',_suffix='',_length=9){
	return _prefix+randomString(9)+_suffix;
}

export function randomString(length, chars) {
	if(!chars) chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    else chars = String(chars);
    var result = '';
    for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
    return result;
}
export function randomCharFrom(str){
	return randomString(1,str);
}

export function rndInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1) ) + min;
}

export function randomItemFrom(arr){
	return arr[rndInt(0,arr.length-1)];
}

///HASHING///
export function hash32(str){
	var hash = 0, i, chr;
	str = String(str);
  if (str.length === 0) return hash;
  for (i = 0; i < str.length; i++) {
    chr   = str.charCodeAt(i);
    hash  = ((hash << 5) - hash) + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return String(hash);
}
export function hash64(str) {
    var h1 = hash32(str);  // returns 32 bit (as 8 byte hex string)
    return h1 + hash32(h1 + str);  // 64 bit (as 16 byte hex string)
}
export function hash128(str) {
    var h1 = hash64(str);  // returns 64 bit (as 16 byte hex string)
    return h1 + hash64(h1 + str);  // 128 bit (as 32 byte hex string)
}

//OTHER//
export function stringTrimToLength(_str,_len){
	if(_len==null) _len = String(_str).length;
	_str = String(_str);
	return _str.substring(0, _len);
}
export function jsonFix(str){
	str = String(str);
	// let regex = /\,(?=\s*?[\}\]])/g;
	let regex = /\,(?!\s*?[\{\[\"\'\w])/g;
	var newStr = str.replace(regex, '');
	return newStr;
}

export function deg2rad(deg){
	var res = (deg * Math.PI)/180;
	return res;
}
export function rad2deg(rad){
	var res = (rad * 180)/Math.PI;
	return res;
}
export function stepify(value,step){
	if(step==0) return value;
	if(step==Infinity)return 1;
	return Math.round((value+Number.EPSILON)/step)*step;
}

export function splitStringByLength(str,len){
	var parts = [];
	for (var i = 0; i < str.length; i += len) {
	    parts.push(str.substring(i, i + len));
	}
	return parts;
}
export function sanitizeString(str){
  str = str.replace(/[^a-z0-9áéíóúñü \.,_-]/gim,"");
  return str.trim();
}
export function validateEmail(email){
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
}
//https://stackoverflow.com/questions/7744912/making-a-javascript-string-sql-friendly
export function mysql_real_escape_string (str) {
  return str.replace(/[\0\x08\x09\x1a\n\r"'\\\%]/g, function (char) {
      switch (char) {
          case "\0":
              return "\\0";
          case "\x08":
              return "\\b";
          case "\x09":
              return "\\t";
          case "\x1a":
              return "\\z";
          case "\n":
              return "\\n";
          case "\r":
              return "\\r";
          case "\"":
          case "'":
          case "\\":
          case "%":
              return "\\"+char; // prepends a backslash to backslash, percent,
                                // and double/single quotes
          default:
              return char;
      }
  });
}

export class Vector2{
	x; y;
	constructor(x=0,y=0){
		if(typeof x === 'object' && x instanceof Vector2){
			this.x = x.x; this.y = x.y;
		}
		else if(typeof x === 'number' && typeof y === 'number'){
			this.x = Number(x); this.y = Number(y);
		}
		else{
			this.x = 0; this.y = 0;
		}
	}
	abs = () =>{
		var v = new Vector2(Math.abs(this.x),Math.abs(this.y));
		return v;
	}
	lengthSquared = ()=>{
		var llengthSquared = Math.pow(this.x,2) + Math.pow(this.y,2);
		return llengthSquared;
	}
	length = ()=>{
		return Math.sqrt(this.lengthSquared());
	}
	normalized = ()=>{
		var dir = new Vector2();
		var llen = this.length();
		dir.x = this.x/llen;
		dir.y = this.y/llen;
		return dir;
	}
	dot = (other)=>{
		return (this.x-other.x)+(this.y-other.y);
	}
	lineTo = (other)=>{
		var v2 = new Vector2();
		v2.x = other.x - this.x;
		v2.y = other.y - this.y;
		return v2;
	}
	angle = ()=>{
		if(this.y==0) return 0;
		if(this.x==0) return Infinity;
		return Math.atan(this.y/this.x);
	}
	angleTo = (other)=>{
		return (this.angle())-(other.angle());
	}
	angleToPoint = (other)=>{
		return this.lineTo(other).angle();
	}
	toString = ()=>{
		var out = "(";
		out+= String(stepify(this.x,0.001))+","+String(stepify(this.y,0.001))+")";
		return out;
	}
}


export function hardPush(arr,item,compareProperties){
	if(!arr || !(arr instanceof Array)) return false;
	if(!item) return false;
	if(arr.length==0){
		arr.push(item);
		return true;
	}
	for(var i=0;i<arr.length;i++){
		var arrItem;
		if(arrItem instanceof Object && item instanceof Object){
			if(compareProperties && compareProperties instanceof Array){
				for(pproperty of compareProperties){
					if(arrItem.hasOwnProperty(pproperty) && arrItem[pproperty]===item[pproperty]) return false;
				}
			}
			else if(shallowEqual(arrItem,item)) return false;
		}
		else if(arrItem===item)
			return false;
	}
	arr.push(item);
	return true;
}

export function shallowEqual(object1, object2) {
  const keys1 = Object.keys(object1);
  const keys2 = Object.keys(object2);

  if (keys1.length !== keys2.length) {
    return false;
  }

  for (let key of keys1) {
    if (object1[key] !== object2[key]) {
      return false;
    }
  }

  return true;
}

export function deepEqual(object1, object2) {
  const keys1 = Object.keys(object1);
  const keys2 = Object.keys(object2);

  if (keys1.length !== keys2.length) {
    return false;
  }

  for (const key of keys1) {
    const val1 = object1[key];
    const val2 = object2[key];
    const areObjects = isObject(val1) && isObject(val2);
    if (
      areObjects && !deepEqual(val1, val2) ||
      !areObjects && val1 !== val2
    ) {
      return false;
    }
  }

  return true;
}

export function findItemIndex(arr,item){
	if(!arr || !(arr instanceof Array)) return null;
	if(!item) return null;

	for(var i=0;i<arr.length;i++){
		var arrItem;
		if(isObject(arrItem) && isObject(item))
			if(shallowEqual(arrItem,item)) return i;
		else if(arrItem===item)
			return i;
	}
	return false;
}

export function findItem(arr,item){
	var res =  findItemIndex(arr,item);
	if(res === false) return false;
	return true;
}
