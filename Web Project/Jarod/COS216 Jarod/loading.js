//make your api requests 
//find the values into []
//when making table add the values from the array into the table


function chartToper()
{
    var req = new XMLHttpRequest();
    req.onreadystatechange = function()
    {
        
        if(req.readyState == 4 && req.status == 200)
        {

            objJSON = JSON.parse(this.responseText);
            console.log(objJSON);
            AddAlbum(objJSON);
            AddSong(objJSON, 0);
            AddArtist(objJSON);
        }
    }
    req.open("GET", "https://cors-anywhere.herokuapp.com/https://api.deezer.com/chart", true);
    req.send();

}

function AddAlbum(objJSON)
{
    var el = document.getElementById("center");
    var count = 0;
    var num =1;
    var album ='<table align = "center"><tr><th>1</th><th>2</th><th>3</th><th>4</th><th>5</th></tr>';
    for(var i=0; i <10; i++){
        var id = objJSON.albums.data[count].id;
        album += '<td><div class ="container">' + 
            '<input type="image" img src="' + objJSON.albums.data[count].cover_medium + '"alt="Cover" align = "middle" class ="image" />' +
            '<div class="overlay" onclick= "loadAlbumPage(' + id +',' + null +')">' +
                '<div class="text">' + 
                    '<p style="color:white; font-size:15px;">Title: ' + objJSON.albums.data[count].title + '</p>' +
                    '<p style="color:white; font-size:15px;">Artist: ' + objJSON.albums.data[count].artist.name + '</p>' +
                '</div>' +
            '</div>' +
        '</div></td >';
        count++;
        num++;
        if(i ==4 ){
            album+= '</tr><tr><th>6</th><th>7</th><th>8</th><th>9</th><th>10</th></tr><tr>';
        }
    }
    album += '</tr></table>';  
    document.getElementById("album").innerHTML = album;
}

function AddSong(objJSON, order)
{
    var el = document.getElementById("center");
    var count = objJSON.nb_tracks;
    if(objJSON.nb_tracks == null){
        count = 10;
    }
    var num =1;
    var songsArray = new Array();
    for(var i=0; i <count; i++){
        
        var songInfo ={sTitle: objJSON.tracks.data[i].title, sPre:  objJSON.tracks.data[i].preview};
        songsArray[i]= songInfo;
    }
    var songs ='<table align = "center"><tr><th><p>Position</p></th><th><p>Song</p></th></tr>';
    if(order == 1){
        for(var i=0; i <count; i++){
            for(var j=0; j <count-1; j++){
                if(songsArray[i].sTitle.localeCompare(songsArray[j].sTitle) < 0){
                    var temp = songsArray[i];
                    songsArray[i] = songsArray[j];
                    songsArray[j] = temp;
                }
            }
        }
        
    }else if(order == 2){
        for(var i=0; i <count; i++){
            for(var j=0; j <count-1; j++){
                if(songsArray[i].sTitle.localeCompare(songsArray[j].sTitle) > 0){
                    var temp = songsArray[i];
                    songsArray[i] = songsArray[j];
                    songsArray[j] = temp;
                }
            }
        }
    }
    for(var i=0; i <count; i++){
        songs += '<div class="chart"><tr>' + 
                    '<td><p>' + num + '</p></td>' +
                    '<td><p id ="trackN" onclick = "Player(this)" data-value="' + songsArray[i].sPre +'">' +songsArray[i].sTitle + '</p></td></tr>' +
            '</div>';
        num++;
    } 
    songs += '</table>';
    document.getElementById("songs").innerHTML = songs;
    document.getElementById("loader").style.display = "none";
    document.getElementById("myDiv").style.display = "block";
    
}

function AddArtist(objJSON)
{
    //console.log(objJSON.artists)
    var el = document.getElementById("center");
    var count = 0;
    var num =1;
    var art ='<table align = "center"><tr><th>1</th><th>2</th><th>3</th><th>4</th><th>5</th></tr>';
    for(var i=0; i <10; i++){
        art += '<td><div class ="container">' + 
            '<img src="' + objJSON.artists.data[count].picture + '"alt="Cover" align = "middle" class ="image" >' +
            '</div>' + 
            '<p style="color:red;text-align:center; font-size:20px;">' + objJSON.artists.data[count].name + '</p></td>';
        count++;
        num++;
        if(i ==4 ){
            art+= '</tr><tr><th>6</th><th>7</th><th>8</th><th>9</th><th>10</th></tr><tr>';
        }
    }
    art += '</tr></table>';
    document.getElementById("artist").innerHTML = art;
    document.getElementById("loader").style.display = "none";
    document.getElementById("myDiv").style.display = "block";
    
}

function loadAlbumPage(albumID, search){
    var id = albumID;
    var queryString ="?" + id +"/";
    if(search == null){
        window.location.href = "Album.html" + queryString;
    }else{
        queryString += search;
        window.location.href = "Album.html" + queryString;
    }
}

function AlbumPage(albumID,search){//search = apple name/title
    
    var album = new XMLHttpRequest();
    var url ="https://cors-anywhere.herokuapp.com/https://api.deezer.com/album/"+ albumID;
    album.onreadystatechange = function()
    {
        if(album.readyState == 4 && album.status == 200)
        {
            albJSON = JSON.parse(this.responseText);
            console.log(albJSON);
            if(search == null){
                AlbumTracks(albJSON);
            }else{
                AppleAlbum(search);
            }
            
        }
    }
    
    album.open("GET",url, true);
    album.send();
}

function AlbumTracks(albJSON){
    var el = document.getElementById("center");
    var count = 0;
    var num =1;
    var albumInfo= '<table style="width:540px" align= "left">' + 
        '<tr><td>' + '<img src="' + albJSON.cover_big + '"alt="Cover" class="albumCover" align= "center"></td>' +
        '<td style="width=210px"><p style="color:white; font-size:15px;">Label :' + albJSON.lable + '<br/>' +
        '<p style="color:white; font-size:15px;">Rating :' + albJSON.rating + '<br/>' +
        '<p style="color:white; font-size:15px;">Release Date :' + albJSON.release_date + '<br/>' +
        '<p style="color:white; font-size:15px;">Number of Tracks :' + albJSON.nb_tracks + '</td></tr>' +
    '</table>';
    var albumData ='<table style="width:600px" align = "center"><tr><th style="width:25px"><p>Track Number</p></th><th style="width:575px"><p>Song</p></th></tr>';
    for(var i=0; i <albJSON.nb_tracks; i++){
        //alert(trackpre);
        albumData += '<div class="chart"><tr>' + 
                    '<td class="number"><p>' + num + '</p></td>' +
                    '<td class="track"><p id ="trackN" onclick = "Player(this)" data-value="' + albJSON.tracks.data[count].preview +'">' + albJSON.tracks.data[count].title + '</p></td></tr>' +
               '</div>';
        count++;
        num++;
    }
    albumData += '</table>';
    document.getElementById("allTracks").innerHTML = albumData;
    document.getElementById("info").innerHTML =albumInfo;
    document.getElementById("loader").style.display = "none";
    document.getElementById("myDiv").style.display = "block";
}

function Player(url){
    var trackUrl = url.getAttribute("data-value");
    if(trackUrl == ""){
        alert("cannot play song");
    }else{
        var x = document.getElementById("audioEle");
        if (x.style.display === "none") {
            x.style.display = "block";
        }
        
        var audio = document.getElementById("myAudio");
        var source = document.getElementById("audioSource");
        source.src = trackUrl;
        audio.load();
        audio.play();
    }
}


function playAudio() { 
    var x = document.getElementById("myAudio"); 
    x.play(); 
} 

function pauseAudio() { 
     var x = document.getElementById("myAudio"); 
    x.pause(); 
} 

function trending(sort)

{
    var req = new XMLHttpRequest();
    req.onreadystatechange = function()
    {
        
        if(req.readyState == 4 && req.status == 200)
        {

            objJSON = JSON.parse(this.responseText);
            console.log(objJSON);
            if(sort < 3){
                AddSong(objJSON ,sort);
            }else if(sort <5){
                sortR(objJSON, sort);
            }else if(sort < 7){
                sortArtist(objJSON, sort);
            }else{
                sortAlbum(objJSON, sort);
            }
            
        }
    }
    req.open("GET", "https://cors-anywhere.herokuapp.com/https://api.deezer.com/playlist/908622995", true);
    req.send();
}

function  AppleAlbum(search){
    var appleReq = new XMLHttpRequest();
    var checkSearch =search;
    if(checkSearch.includes(" ")){
        search = search.split(" ");
        var temp = search[0];
        for(var i=1; i< search.length; i++){
            temp += "+" +search[i];
        }
        checkSearch =temp;
    }
    appleReq.onreadystatechange = function()
    {        
        if(appleReq.readyState == 4 && appleReq.status == 200)
        {

            objJSON = JSON.parse(this.responseText);
            console.log(objJSON);
            
        }
    }
    appleReq.open("GET", "https://cors-anywhere.herokuapp.com/https://itunes.apple.com/search?term="+ checkSearch, true);
    appleReq.send();
}

function appleSearch(){
    var search = document.getElementById("mySearch");
    temp = search.value;
    searchArr = temp.split(" ");
    temp = searchArr[0];
    for(var i = 1; i < searchArr.length; i++){
        temp += "+" + searchArr[i];
    }
    search = temp;

    var req = new XMLHttpRequest();
    req.onreadystatechange = function()
    {
        
        if(req.readyState == 4 && req.status == 200)
        {

            objJSON = JSON.parse(this.responseText);
            console.log(objJSON);
            var el = document.getElementById("center");
            var count = objJSON.resultCount;
            var arrcount =0;
            var num =1;
            var songsArray = new Array();
            for(var i=0; i <count; i++){
                    var songInfo ={sTitle: objJSON.results[i].trackName, sPre:  objJSON.results[i].previewUrl};
                    songsArray[arrcount]= songInfo;
                    arrcount++;
            }
            var songs ='<table align = "center"><tr><th><p>Position</p></th><th><p>Song</p></th></tr>';
            for(var i=0; i <arrcount; i++){
                songs += '<div class="chart"><tr>' + 
                            '<td><p>' + num + '</p></td>' +
                            '<td><p id ="trackN" onclick = "Player(this)" data-value="' + songsArray[i].sPre +'">' +songsArray[i].sTitle + '</p></td></tr>' +
                    '</div>';
                num++;
            } 
            songs += '</table>';
            document.getElementById("songs").innerHTML = songs;
            document.getElementById("loader").style.display = "none";
            document.getElementById("myDiv").style.display = "block";
        }
    }
    req.open("GET", "https://cors-anywhere.herokuapp.com/https://itunes.apple.com/search?term=" + search, true);
    req.send();
    
}

function sortR(objJSON, sort){
    var el = document.getElementById("center");
    var count = objJSON.nb_tracks;
    if(objJSON.nb_tracks == null){
        count = 10;
    }
    var num =1;
    var songsArray = new Array();
    for(var i=0; i <count; i++){
        
        var songInfo ={sTitle: objJSON.tracks.data[i].title, sPre:  objJSON.tracks.data[i].preview , rank: objJSON.tracks.data[i].rank , dur: objJSON.tracks.data[i].duration};
        songsArray[i]= songInfo;
    }
    var songs ='<table align = "center"><tr><th><p>Position</p></th><th><p>Rank</p></th><th><p>Song</p></th></tr>';
    if(sort == 3){
        for(var i=0; i <count; i++){
            for(var j=0; j <count-1; j++){
                if(songsArray[i].rank > songsArray[j].rank){
                    var temp = songsArray[i];
                    songsArray[i] = songsArray[j];
                    songsArray[j] = temp;
                    
                }
            }
        }
    }else if(sort == 4){
        for(var i=0; i <count; i++){
            for(var j=0; j <count-1; j++){
                if(songsArray[i].rank < songsArray[j].rank){
                    var temp = songsArray[i];
                    songsArray[i] = songsArray[j];
                    songsArray[j] = temp;
                    
                }
            }
        }  
    }
    for(var i=0; i <count; i++){
        songs += '<div class="chart"><tr>' + 
                    '<td><p>' + num + '</p></td>' +
                    '<td><p>' + songsArray[i].rank + '</p></td>' +
                    '<td><p id ="trackN" onclick = "Player(this)" data-value="' + songsArray[i].sPre +'">' +songsArray[i].sTitle + '</p></td></tr>' +
                    
            '</div>';
        num++;
    } 
    songs += '</table>';
    document.getElementById("songs").innerHTML = songs;
    document.getElementById("loader").style.display = "none";
    document.getElementById("myDiv").style.display = "block";
}



function sortArtist(objJSON, sort){
    var order = sort;
    var el = document.getElementById("center");
    var count = objJSON.nb_tracks;
    if(objJSON.nb_tracks == null){
        count = 10;
    }
    var num =1;
    var songsArray = new Array();
    for(var i=0; i <count; i++){
        
        var songInfo ={sTitle: objJSON.tracks.data[i].title, sPre:  objJSON.tracks.data[i].preview, artistN: objJSON.tracks.data[i].artist.name};
        songsArray[i]= songInfo;
    }
    var songs ='<table align = "center"><tr><th><p>Position</p></th><th><p>Artist</p></th><th><p>Song</p></th></tr>';
    if(order == 5){
        for(var i=0; i <count; i++){
            for(var j=0; j <count-1; j++){
                if(songsArray[i].artistN.localeCompare(songsArray[j].artistN) < 0){
                    var temp = songsArray[i];
                    songsArray[i] = songsArray[j];
                    songsArray[j] = temp;
                }
            }
        }
        
    }else if(order == 6){
        for(var i=0; i <count; i++){
            for(var j=0; j <count-1; j++){
                if(songsArray[i].artistN.localeCompare(songsArray[j].artistN) > 0){
                    var temp = songsArray[i];
                    songsArray[i] = songsArray[j];
                    songsArray[j] = temp;
                }
            }
        }
    }
    for(var i=0; i <count; i++){
        songs += '<div class="chart"><tr>' + 
                    '<td><p>' + num + '</p></td>' +
                    '<td><p>' + songsArray[i].artistN + '</p></td>' +
                    '<td><p id ="trackN" onclick = "Player(this)" data-value="' + songsArray[i].sPre +'">' +songsArray[i].sTitle + '</p></td></tr>' +
                    
            '</div>';
        num++;
    } 
    songs += '</table>';
    document.getElementById("songs").innerHTML = songs;
    document.getElementById("loader").style.display = "none";
    document.getElementById("myDiv").style.display = "block";
}


function sortAlbum(objJSON, sort){
    var order = sort;
    var el = document.getElementById("center");
    var count = objJSON.nb_tracks;
    if(objJSON.nb_tracks == null){
        count = 10;
    }
    var num =1;
    var songsArray = new Array();
    for(var i=0; i <count; i++){
        
        var songInfo ={sTitle: objJSON.tracks.data[i].title, sPre:  objJSON.tracks.data[i].preview, albumT: objJSON.tracks.data[i].album.title, aID: objJSON.tracks.data[i].album.id};
        songsArray[i]= songInfo;
    }
    var songs ='<table align = "center"><tr><th><p>Position</p></th><th><p>Album</p></th><th><p>Song</p></th></tr>';
    if(order == 7){
        for(var i=0; i <count; i++){
            for(var j=0; j <count-1; j++){
                if(songsArray[i].albumT.localeCompare(songsArray[j].albumT) < 0){
                    var temp = songsArray[i];
                    songsArray[i] = songsArray[j];
                    songsArray[j] = temp;
                }
            }
        }
        
    }else if(order == 8){
        for(var i=0; i <count; i++){
            for(var j=0; j <count-1; j++){
                if(songsArray[i].albumT.localeCompare(songsArray[j].albumT) > 0){
                    var temp = songsArray[i];
                    songsArray[i] = songsArray[j];
                    songsArray[j] = temp;
                }
            }
        }
    }
    for(var i=0; i <count; i++){
        songs += '<div class="chart"><tr>' + 
                    '<td><p>' + num + '</p></td>' +
                    '<td><p onclick = "loadAlbumPage(' + songsArray[i].aID +',' + null +')">' + songsArray[i].albumT + '</p></td>' +
                    '<td><p id ="trackN" onclick = "Player(this)" data-value="' + songsArray[i].sPre +'">' +songsArray[i].sTitle + '</p></td></tr>' +
                    
            '</div>';
        num++;
    } 
    songs += '</table>';
    document.getElementById("songs").innerHTML = songs;
    document.getElementById("loader").style.display = "none";
    document.getElementById("myDiv").style.display = "block";
}