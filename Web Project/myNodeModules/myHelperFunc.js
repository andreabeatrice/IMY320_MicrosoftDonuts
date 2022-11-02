/*myHelperModule.js*/
///FOR BACK-END NODE.JS MODULES

const MY = {
	///CONSOLE///
	clog: function(...vars){
		console.log(...vars);
	},
	///OBJECT AND HTML///
	footstrapMediaQueries : {
		xs: '0px',
		sm: '576px',
		md: '768px',
		lg: '992px',
		xl: '1200px',
		xxl: '1400px',
	},
///FORMS///
	formDataToJSON:function(formData,stringify=false){
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
	},
	ajax:function(data, url="",type="POST",success=function(){},fail=function(){}){
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
	},
	ajaxGET:function(url,callback,failback=function(){}){
		ajax("",url,"GET",callback,failback);
	},
	ajaxPOST:function(data,url,callback,failback=function(){}){
		ajax(data,url,"POST",callback,failback);
	},
	objectToURLParams:function(obj,addQuestionMark=false){
		var parts = [];
		for(var key in obj) {
			if(obj.hasOwnProperty(key)) {
				parts.push(encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]));
			}
		}
		return (addQuestionMark?"?":"") + (parts.join('&'));
	},
	parseURLParams:function(url,typecast=false,autoParseObjects=false){
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
		        			var nn = String(n.split('[', 2));
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
	},
	///VERIFY DATA TYPE///
	isInt:function(val){
		return (typeof val === 'number' && Math.trunc(val) === val);
	},
	isString:function(val){
		return (typeof val === 'string');
	},
	isArray:function(arr){
		return (typeof arr === 'object' && arr instanceof Array);
	},
	isObject:function (object) {
	  return (object != null && typeof object === 'object');
	},
	isInRange:function (num,min,max,inclusive=true){
		if(inclusive)
			return (num>=min && num<=max);
		else
			return (num>min && num<max);
	},
	isJSON:function (str) {
			var obj = null;
	    try {
	      obj = JSON.parse(str);
	    } catch (e) {
	        return false;
	    }
	    if(MY.isObject(obj))
	    	return true;
	    return false;
	},
	isExternalURL:function(url) {
	  var match = url.match(/^([^:\/?#]+:)?(?:\/\/([^\/?#]*))?([^?#]+)?(\?[^#]*)?(#.*)?/);
	  if (typeof match[1] === "string" && match[1].length > 0 && match[1].toLowerCase() !== location.protocol) return true;
	  if (typeof match[2] === "string" && match[2].length > 0 && match[2].replace(new RegExp(":("+{"http:":80,"https:":443}[location.protocol]+")?$"), "") !== location.host) return true;
	  return false;
	},
	objectsAreEqual:function(objA,objB){
		if(!ALL.isObject(objA)||!ALL.isObject(objB)){
			return false;
		}
		for(var p in objA)
	    {
	        switch(typeof(objA[p]))
	        {
	            case 'object':
	                if (!objectsAreEqual(objA[p],objB[p])) { return false }; break;
	            case 'function':
	                if (typeof(objB[p])=='undefined' || (objA[p].toString() != objB[p].toString())) { return false; }; break;
	            default:
	                if (objA[p] != objB[p]) { return false; }
	        }
	    }

	    for(var p in objB)
	    {
	        if(typeof(objA[p])=='undefined') {return false;}
	    }

	    return true;
	},
	compareVars:function(a,b){
		if(ALL.isObject(a)){
			return ALL.objectsAreEqual(a,b);
		}else{
			if(typeof a === typeof b){
				return a === b;
			}
		}
		return false;
	},
	///GENERATING RANDOM VALUE///
	randomId:function (_prefix='',_suffix=''){
		return _prefix+(Math.random().toString(36).substr(2, 9))+_suffix;
	},
	randomID:function (_prefix='',_suffix='',_length=9){
		return _prefix+MY.randomString(9)+_suffix;
	},
	hexadecimalID: function(_len=16,_pow=4){
		return Math.floor((1 + Math.random()) * (Math.pow(_len,_pow))).toString(16).substring(1);
	},
	rndStr:function(len,chars){
		return MY.randomString(len,chars);
	},
	randomString:function (length, chars) {
		if(!chars) chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
	    else chars = String(chars);
	    var result = '';
	    for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
	    return result;
	},
	randomCharFrom:function (str){
		return MY.randomString(1,str);
	},
	rndInt:function (min, max) {
		return Math.floor(Math.random() * (max - min + 1) ) + min;
	},
	randomItemFrom:function(arr){
		return arr[MY.rndInt(0,arr.length-1)];
	},
	///STRING///
	safeStringify:function(obj){
		let cache = [];
		let s = JSON.stringify(obj, (key, value) => {
		  if (typeof value === 'object' && value !== null) {
		    // Duplicate reference found, discard key
		    if (cache.includes(value)) return;
		    // Store value in our collection
		    cache.push(value);
		  }
		  return value;
		});
		cache = null; // Enable garbage collection

		return s;
	},
	///HASHING///
	hash32:function(str){
		var hash = 0, i, chr;
		str = String(str);
	  if (str.length === 0) return hash;
	  for (i = 0; i < str.length; i++) {
	    chr   = str.charCodeAt(i);
	    hash  = ((hash << 5) - hash) + chr;
	    hash |= 0; // Convert to 32bit integer
	  }
	  return String(hash);
	},
	hash64:function(str) {
	    var h1 = MY.hash32(str);  // returns 32 bit (as 8 byte hex string)
	    return h1 + MY.hash32(h1 + str);  // 64 bit (as 16 byte hex string)
	},
	hash128:function(str) {
	    var h1 = MY.hash64(str);  // returns 64 bit (as 16 byte hex string)
	    return h1 + MY.hash64(h1 + str);  // 128 bit (as 32 byte hex string)
	},
	//OTHER//
	getNameOfClass:function(obj){
		let funcNameRegex = /function (.{1,})\(/;
 		let results = (funcNameRegex).exec(obj.constructor.toString());
  		return (results && results.length > 1) ? results[1] : "";
	},
	stringTrimToLength:function(_str,_len){
		if(_len==null) _len = String(_str).length;
		_str = String(_str);
		return _str.substring(0, _len);
	},
	jsonFix:function (str){
		let regex = /\,(?=\s*?[\}\]])/g;
		str = String(str);
		// let regex = /\,(?!\s*?[\{\[\"\'\w])/g;
		var newStr = str.replace(regex, '');
		return newStr;
	},
	deg2rad:function (deg){
		var res = (deg * Math.PI)/180;
		return res;
	},
	rad2deg:function (rad){
		var res = (rad * 180)/Math.PI;
		return res;
	},
	stepify:function (value,step){
		if(step==0) return value;
		if(step==Infinity)return 1;
		return Math.round((value+Number.EPSILON)/step)*step;
	},
	splitStringByLength:function (str,len){
		str = String(str);
		var parts = [];
		for (var i = 0; i < str.length; i += len) {
		    parts.push(str.substring(i, i + len));
		}
		return parts;
	},
	sanitizeString:function(str){
	    str = str.replace(/[^a-z0-9áéíóúñü \.,_-]/gim,"");
	    return str.trim();
	},
	validateEmail:function(email){
	  return String(email)
	    .toLowerCase()
	    .match(
	      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
	    );
	},
	validateURL:function(string){
	  let url;
	  var {URL} = require('url');
	  
	  try {
	    url = new URL(string);
	  } catch (_) {
	    return false;  
	  }

	  return url.protocol === "http:" || url.protocol === "https:";
	},
	//https://stackoverflow.com/questions/7744912/making-a-javascript-string-sql-friendly
	mysql_real_escape_string:function (str) {
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
	},
	hardPush:function (arr,item,compareProperties=null){
		if(!arr || !(arr instanceof Array)) return false;
		if(!item) return false;
		if(arr.length==0){
			arr.push(item);
			return true;
		}
		for(let i=0;i<arr.length;i++){
			let arrItem = arr[i];
			if(arrItem instanceof Object && item instanceof Object){
				if(compareProperties && compareProperties instanceof Array){
					for(let pproperty of compareProperties){
						if(arrItem.hasOwnProperty(pproperty) && arrItem[pproperty]===item[pproperty]) return false;
					}
				}
				else if(MY.shallowEqual(arrItem,item)) return false;
			}
			else if(arrItem===item)
				return false;
		}
		arr.push(item);
		return true;
	},
	shallowEqual:function (object1, object2) {
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
	},
	deepEqual:function (object1, object2) {
	  const keys1 = Object.keys(object1);
	  const keys2 = Object.keys(object2);

	  if (keys1.length !== keys2.length) {
	    return false;
	  }

	  for (let key of keys1) {
	    let val1 = object1[key];
	    let val2 = object2[key];
	    let areObjects = MY.isObject(val1) && MY.isObject(val2);
	    if (
	      areObjects && !MY.deepEqual(val1, val2) ||
	      !areObjects && val1 !== val2
	    ) {
	      return false;
	    }
	  }

	  return true;
	},
	findItemIndex:function (arr,item){
		if(!arr || !(arr instanceof Array)) return null;
		if(!item) return null;

		for(var i=0;i<arr.length;i++){
			var arrItem;
			if(MY.isObject(arrItem) && MY.isObject(item))
				if(MY.shallowEqual(arrItem,item)) return i;
			else if(arrItem===item)
				return i;
		}
		return false;
	},
	findItem:function (arr,item){
		var res =  MY.findItemIndex(arr,item);
		if(res === false) return false;
		return true;
	},
	findIndexID:function (itemID,arr){
		for(var i=0;i<arr.length;i++){
			if(arr[i].id==itemID){
				return i;
			}
		}
		return -1;
	},
	getObjectFromArray:function(arr,properties){
		if(!arr || !(arr instanceof Array)) return false;
		if(!properties) return false;
		if(arr.length==0){
			return false;
		}
		var item = properties;
		var compareProperties = Object.keys(item);
		for(var i=0;i<arr.length;i++){
			let arrItem = arr[i];
			if(arrItem instanceof Object && item instanceof Object){
				if(compareProperties && compareProperties instanceof Array){
					for(var pproperty of compareProperties){
						if(arrItem.hasOwnProperty(pproperty) && arrItem[pproperty]===item[pproperty]) return arrItem;
					}
				}
				else if(shallowEqual(arrItem,item)) return arrItem;
			}
			else if(arrItem===item)
				return arrItem;
		}
		return false;
	},
	findItemObjectIndex:function(arr,item,compareProperties=null){
		if(!arr || !(arr instanceof Array)) return false;
		if(!item) return false;
		if(arr.length==0){
			return false;
		}
		for(var i=0;i<arr.length;i++){
			let arrItem = arr[i];
			if(arrItem instanceof Object && item instanceof Object){
				if(compareProperties && compareProperties instanceof Array){
					for(var pproperty of compareProperties){
						if(arrItem.hasOwnProperty(pproperty) && arrItem[pproperty]===item[pproperty]) return i;
					}
				}
				else if(shallowEqual(arrItem,item)) return i;
			}
			else if(arrItem===item)
				return i;
		}
		return false;
	},
	unitToPx:(str)=>{
		let val,unit;
		unit = parseFloat(str);
		val = str.split(String(unit))[0];
		switch(unit){
			case 'cm':
				return `${(96/2.54)*val}px`;
			case 'mm':
				return `${(96/2.54)*val*1000}px`;
			case 'in':
				return `${(96*val)}px`;
			case 'pt':
				return `${(96*val)/72}px`;
			case 'pc':
				return `${(12*val)}px`;
			default:
				return `${val}${unit}`;
		}
	}
}

module.exports = MY;