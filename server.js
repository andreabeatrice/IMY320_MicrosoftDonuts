const express = require("express"),
    path = require("path"); 
//CREATE APP
const app = express();
 
//SERVE A STATIC PAGE IN THE PUBLIC DIRECTORY
app.use(express.static("public"));
 
//PORT TO LISTEN TO
app.listen(8080, () => {
    console.log("Listening on localhost:8080");
});

app.get('/', (req,res) => {
    res.sendFiles(path.resolve(`./public/index.html`));
});