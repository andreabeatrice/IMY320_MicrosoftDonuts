"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return generator._invoke = function (innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; }(innerFn, self, context), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; this._invoke = function (method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); }; } function maybeInvokeDelegate(delegate, context) { var method = delegate.iterator[context.method]; if (undefined === method) { if (context.delegate = null, "throw" === context.method) { if (delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method)) return ContinueSentinel; context.method = "throw", context.arg = new TypeError("The iterator does not provide a 'throw' method"); } return ContinueSentinel; } var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) { if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; } return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, define(Gp, "constructor", GeneratorFunctionPrototype), define(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (object) { var keys = []; for (var key in object) { keys.push(key); } return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) { "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); } }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var http = require('http'),
    fs = require('fs'),
    url = require('url'),
    events = require('events'),
    express = require("express"),
    fetch = require('node-fetch'),
    // ejs = require('ejs'),
WebSocket = require('ws'),
    socketIO = require('socket.io'),
    XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest,
    FileAPI = require('file-api'),
    querystring = require('querystring'),
    jsonrepair = require('jsonrepair'),
    compression = require('compression'),
    path = require('path'); //Initialise File API


var File = FileAPI.File;
var FileList = FileAPI.FileList;
var FileReader = FileAPI.FileReader; //SERVER RUNTIME SETTINGS

var FileProcess = {
  nodePath: '',
  filePath: '',
  args: []
};
var MySystem = {
  test: false,
  dev: false
}; //OUR VARIABLES AND HELPER FUNCTIONS

var MY = require(path.resolve('./myNodeModules/myHelperFunc.js'));

var MAINVARS = require(path.resolve('./src/js/myMainVars.js')); //PROCESSING RUNNING ARGS


process.argv.forEach(function (val, index, array) {
  switch (index) {
    case 0:
      FileProcess.nodePath = val;
      MY.clog("NodePath: ".concat(FileProcess.nodePath));
      break;

    case 1:
      FileProcess.filePath = val;
      MY.clog("FilePath: ".concat(FileProcess.filePath));
      break;

    default:
      FileProcess.args.push(String(val).toLowerCase());
      break;
  }
});

if (FileProcess.args.length > 0) {
  MY.clog(FileProcess.args);
  FileProcess.args.forEach(function (arg, index) {
    switch (arg) {
      case '-test':
        MySystem.test = true;
        break;

      case '-dev':
        MySystem.dev = true;
        break;

      default:
        MY.clog("Invalid argument:\t".concat(arg));
        break;
    }
  });
} //OTHER VARIABLES


var defaultPort = MySystem.test || MySystem.dev ? 8080 : process.env.PORT || 8080;
var PORT = defaultPort;
var syncSeconds = 60;
var syncElapsed = 0;
var syncTimerFlag = false; //CREATE APP AND START SERVER

var app = express();
var server = app.listen(defaultPort, function () {
  console.log('Server started! @ ' + new Date());
  switchPort(this, PORT);
}); // var io = new socketIO.Server(server);

var myUsers = {};
var myClients = []; //SERVE A STATIC PAGE IN THE PUBLIC DIRECTORY

app.use(express["static"]("public")); // app.use(express.static(__dirname));

var ExpressApp = {
  routes: [{
    route: "/",
    render: "public/index.html",
    status: 200,
    preRender: function preRender(req, res, data) {}
  }, {
    route: "*",
    render: "public/index.html",
    status: 404,
    preRender: function preRender(req, res, data) {}
  }],
  defaultURL: !MySystem.test ? "https://microsoft-donuts-portfolio.herokuapp.com/" : "https://localhost:".concat(PORT),
  routeDirectory: "./dist/",
  meta: MAINVARS.metadata
};
ExpressApp.routes.forEach(function (val) {
  app.set("views", __dirname);
  app.use(express["static"](path.join(__dirname, 'public')));
  app.get(val.route, function (req, res) {
    res.status(val.status); // res.setHeader('Accept-Encoding','gzip');

    var urlParams = MY.parseURLParams(req.url);
    var viewData = {
      local: {}
    };

    if (urlParams) {
      viewData.local.urlParams = urlParams;
    }

    viewData.local = Object.assign(viewData.local, ExpressApp.meta);
    viewData.local.url = MySystem.test || MySystem.dev ? "".concat(ExpressApp.meta.url || "https://".concat(req.headers.host).concat(req.url)) : "https://".concat(req.headers.host).concat(req.url);
    var renderPath = ExpressApp.routeDirectory + val.render; // var renderPath = val.render;

    if (val.preRender) {
      val.preRender(req, res, viewData);
    }

    res.sendFile(path.resolve(renderPath)); // fs.readFile(renderPath, 'utf8', function(err, filedata){
    //     if(err){
    //         throw err;
    //     }
    //     if(val.postRender){
    //         val.postRender(req,res,filedata);
    //     }
    // });
  });
}); // app
//     .set('views', __dirname)
//     .use(express.static(path.join(__dirname, 'public')))
//     .get('/', (req,res) => {
//         res.sendFile(path.resolve(`./public/index.html`));
//     });
// app
//     .set('views', __dirname)
//     .use(express.static(path.join(__dirname, 'public')))
//     .get('*', (req,res) => {
//         res.sendFile(path.resolve(`./dist/public/index.html`));
//     });
// app.use(express.static("public"))
//     .set('views', __dirname)
//     .route("/")
//     .get((req,res,next)=>{
//         console.log("/");
//         res.status(200);
//         res.sendFile(path.resolve(`./dist/public/index.html`));
//     });
// app.use(express.static("public"));
// app.set('views', __dirname);
// app.route("*").get((req,res,next)=>{
//     console.log("*");
//     res.status(404);
//     res.sendFile(path.resolve(`./dist/public/index.html`));
// });
///////SERVER FUNCTIONS///////
// function updateClients(){
//     //Use sync broadcast to update whenever new user joins or leave
//     var dat = {
//         type : 'sync',
//         data : {
//             time : new Date(),
//             message : 'Synchronised',
//             server : {
//                 online:io.engine.clientsCount,
//             }
//         }
//     };
//     // my.clog(dat);
//     for(var i=0;i<myClients.length;i++){
//         var cl = myClients[i];
//         /*if(cl.new){
//             cl.new = false;
//             console.log('New Client: '+cl.detail.id+' - '+ (cl.detail.username!='' ? cl.detail.username : 'Guest') );
//         }*/
//         cl.emit('sync',JSON.stringify(dat));
//     }
// }

function getBase64(_x) {
  return _getBase.apply(this, arguments);
}

function _getBase() {
  _getBase = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(file) {
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            return _context.abrupt("return", new Promise(function (res, rej) {
              var reader = new FileReader();

              reader.onload = function () {
                return res(reader.result);
              };

              reader.onerror = function (err) {
                rej(err);
              };

              reader.readAsDataURL(file);
            }));

          case 1:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _getBase.apply(this, arguments);
}

function switchPort(s, p) {
  s.close();
  syncTimerFlag = true;
  s.listen(p, function () {
    console.log('Server is listening on port ' + p);
  });
  myClients = [];
  myUsers = {};
  syncTimerFlag = false;
  syncTimer(syncSeconds);
}

function syncTimer(seconds) {
  if (seconds <= 0.01) seconds = 10;
  if (seconds >= 360) seconds = 359.99;

  if (!syncTimerFlag) {
    syncTimerFlag = true;
    var tS = setTimeout(function () {
      syncTimerFlag = false; // updateClients();
      // MY.clog('Synced Server : '+new Date());

      syncElapsed += seconds;
      syncTimer(seconds);
    }, Math.floor(seconds * 1000));
  }
}

function AJAX(jsonData, callback, url) {
  var req = new XMLHttpRequest();

  req.onreadystatechange = function () {
    if (req.readyState == 4) {
      if (req.status == 200) {
        var json = JSON.parse(req.responseText);
        callback(json);
      }
    } else {
      console.log(req.readyState);
    }
  };

  req.open("GET", url, true);
  req.setRequestHeader('Content-Type', 'application/json');
  req.send(JSON.stringify(jsonData));
}

function getRequestURL(req) {
  var _req$headers, _url$parse;

  var hostname = req === null || req === void 0 ? void 0 : (_req$headers = req.headers) === null || _req$headers === void 0 ? void 0 : _req$headers.host;
  var pathname = (_url$parse = url.parse(req === null || req === void 0 ? void 0 : req.url)) === null || _url$parse === void 0 ? void 0 : _url$parse.pathname;
  if (!hostname || !pathname) return null; // console.log(`http://${hostname}${pathname}`);

  return "http://".concat(hostname).concat(pathname);
}

function toJsonString(data) {
  if (data !== undefined) {
    var intCount = 0,
        repCount = 0;
    var json = JSON.stringify(data, function (_, v) {
      if (typeof v === 'bigint') {
        intCount++;
        return "".concat(v, "#bigint");
      }

      return v;
    });
    var res = json.replace(/"(-?\d+)#bigint"/g, function (_, a) {
      repCount++;
      return a;
    });

    if (repCount > intCount) {
      // You have a string somewhere that looks like "123#bigint";
      throw new Error("BigInt serialization conflict with a string value.");
    }

    return res;
  }
}

function toObject() {
  return JSON.parse(JSON.stringify(this, function (key, value) {
    return typeof value === 'bigint' ? value.toString() : value;
  } // return everything else unchanged
  ));
}