const
    http = require('http'),
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
    path = require('path');
//Initialise File API
var File = FileAPI.File;
var FileList = FileAPI.FileList;
var FileReader = FileAPI.FileReader;

//SERVER RUNTIME SETTINGS
var FileProcess = {
    nodePath : '',
    filePath : '',
    args : [],
};

var MySystem = {
    test: false,
    dev: false
};

//OUR VARIABLES AND HELPER FUNCTIONS
const MY = require(path.resolve('./myNodeModules/myHelperFunc.js'));
const MAINVARS = require(path.resolve('./src/js/myMainVars.js'));

//PROCESSING RUNNING ARGS
process.argv.forEach(function (val, index, array) {
  switch(index){
    case 0:
        FileProcess.nodePath = val;
        MY.clog(`NodePath: ${FileProcess.nodePath}`);
        break;
    case 1:
        FileProcess.filePath = val;
        MY.clog(`FilePath: ${FileProcess.filePath}`);
        break;
    default:
        FileProcess.args.push(String(val).toLowerCase());
        break;
  }
});
if(FileProcess.args.length>0){
    MY.clog(FileProcess.args);
    FileProcess.args.forEach((arg,index)=>{
        switch(arg){
            case '-test':
                MySystem.test = true;break;
            case '-dev':
                MySystem.dev = true;break;
            default:
                MY.clog(`Invalid argument:\t${arg}`);
                break;
        }
    });
}

//OTHER VARIABLES
const defaultPort = (MySystem.test||MySystem.dev)?8080:(process.env.PORT ||8080);
var PORT = defaultPort;

var syncSeconds = 60;
var syncElapsed = 0;
var syncTimerFlag = false;

//CREATE APP AND START SERVER
const app = express();

var server = app.listen(defaultPort, function(){
    console.log('Server started! @ '+ new Date());
    switchPort(this, PORT);
});

// var io = new socketIO.Server(server);

var myUsers = {};
var myClients = [];
 
//SERVE A STATIC PAGE IN THE PUBLIC DIRECTORY
app.use(express.static("public"));
// app.use(express.static(__dirname));

const ExpressApp = {
    routes : [
        {route:"/", render: "public/index.html", status:200, preRender:function(req,res,data){

        }},
        {route:"*", render: "public/index.html", status:404, preRender:function(req,res,data){

        }},
    ],
    defaultURL: !(MySystem.test)?`https://microsoft-donuts-portfolio.herokuapp.com/`:`https://localhost:${PORT}`,
    routeDirectory: "./dist/",
    meta: MAINVARS.metadata,
};

ExpressApp.routes.forEach((val)=>{
    app.set("views", __dirname);
    app.use(express.static(path.join(__dirname, 'public')));
    app.get(val.route, (req,res)=>{
        res.status(val.status);
        // res.setHeader('Accept-Encoding','gzip');

        let urlParams = MY.parseURLParams(req.url);

        let viewData = {
            local:{}
        };
        if(urlParams){
            viewData.local.urlParams = urlParams;
        }
        viewData.local = Object.assign(viewData.local,ExpressApp.meta);

        viewData.local.url = (MySystem.test||MySystem.dev)?`${ExpressApp.meta.url || `https://${req.headers.host}${req.url}`}`:`https://${req.headers.host}${req.url}`;


        var renderPath = ExpressApp.routeDirectory+val.render;
        // var renderPath = val.render;
        if(val.preRender){
            val.preRender(req,res,viewData);
        }
        res.sendFile(path.resolve(renderPath));
        // fs.readFile(renderPath, 'utf8', function(err, filedata){
        //     if(err){
        //         throw err;
        //     }
            
        //     if(val.postRender){
        //         val.postRender(req,res,filedata);
        //     }

            
        // });

    });
});

// app
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

async function getBase64(file) {

    return new Promise((res,rej)=>{
        let reader = new FileReader();
        
        reader.onload = ()=>{
            return res(reader.result);
        };
        reader.onerror = (err)=>{
            rej(err);
        };
        reader.readAsDataURL(file);
    });
}

function switchPort(s, p){
    s.close();
    syncTimerFlag = true;
    s.listen(p,()=>{
        console.log('Server is listening on port '+p);
    });
    myClients = []; myUsers = {};
    syncTimerFlag = false;
    syncTimer(syncSeconds);
}


function syncTimer(seconds){
    if(seconds<=0.01) seconds = 10;
    if(seconds>=360) seconds = 359.99;
    if(!syncTimerFlag){
        syncTimerFlag = true;
        var tS = setTimeout(()=>{
            syncTimerFlag = false;
            // updateClients();
            // MY.clog('Synced Server : '+new Date());
            syncElapsed+=seconds;
            syncTimer(seconds);
        }, Math.floor(seconds*1000));
    }
}

function AJAX(jsonData,callback,url){
    var req = new XMLHttpRequest();
    req.onreadystatechange = function()
    {
        if(req.readyState == 4){
            if(req.status == 200){
                var json = JSON.parse(req.responseText);
                callback(json);
            }
        }
        else{
            console.log(req.readyState);
        }
        
    };
    req.open("GET",url,true);
    req.setRequestHeader('Content-Type', 'application/json');
    req.send(JSON.stringify(jsonData));
}

function getRequestURL(req){
    var hostname = req?.headers?.host;
    var pathname = url.parse(req?.url)?.pathname;
    if(!hostname||!pathname) return null;
    // console.log(`http://${hostname}${pathname}`);
    return `http://${hostname}${pathname}`;
}


function toJsonString(data) {
  if (data !== undefined) {
      let intCount = 0, repCount = 0;
      const json = JSON.stringify(data, (_, v) => {
          if (typeof v === 'bigint') {
              intCount++;
              return `${v}#bigint`;
          }
          return v;
      });
      const res = json.replace(/"(-?\d+)#bigint"/g, (_, a) => {
          repCount++;
          return a;
      });
      if (repCount > intCount) {
          // You have a string somewhere that looks like "123#bigint";
          throw new Error(`BigInt serialization conflict with a string value.`);
      }
      return res;
  }
}

function toObject() {
  return JSON.parse(JSON.stringify(this, (key, value) =>
      typeof value === 'bigint'
          ? value.toString()
          : value // return everything else unchanged
  ));
}