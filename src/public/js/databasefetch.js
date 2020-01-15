/*
XMLHttpRequest:
https://en.wikipedia.org/wiki/XMLHttpRequest
CouchDB:
http://guide.couchdb.org/draft/tour.html
https://wiki.apache.org/couchdb/HTTP_Document_API
http://docs.couchdb.org/en/1.6.1/config/intro.html
http://docs.couchdb.org/en/1.6.1/config/http.html#cross-origin-resource-sharing
http://docs.couchdb.org/en/1.6.1/intro/curl.html
HTML(5):
http://www.w3schools.com/html/default.asp
http://www.w3schools.com/jsref/default.asp
Local HTTP server (not strictly needed):
python -m SimpleHTTPServer 8080
CouchDB configuration (Mac OS X):
~/Library/Application Support/CouchDB/etc/couchdb/local.ini
/Applications/Apache CouchDB.app/Contents/Resources/couchdbx-core/etc/couchdb/local.ini
CouchDB configuration (Windows):
C:\Program Files (x86)\Apache Software Foundation\CouchDB\etc\couchdb\local.ini
start/stop/restart: Control Panel --> Services --> Apache CouchDB
[httpd]
enable_cors = true
bind_address = 0.0.0.0
[cors]
origins = *
*/

var request = new XMLHttpRequest();

request.onreadystatechange = function() {
    // console.log("onreadystatechange: " + request.readyState + ", " +  request.status);
    // console.log(request.responseText);
    if (request.readyState == 4) {
        if (request.status == 200) {
            var response = JSON.parse(request.responseText);
            handlers[response._id](response);
        }
        if (request.status == 404) {
            console.log("not found: " + request.responseText);
        }
    }
};

function get(variable) {
    // console.log("get " + variable);
    request.open("GET", dburl + variable, false);
    request.send();
}

function update() {
    for (var name in handlers) {
        // console.log("updating " + name);
        get(name);
    }
}

// request updates at a fixed interval (ms)
var intervalID = setInterval(update, 2000);

///////////////////////////////////////////////////////////////////////////////
// your code below

var dbname = "onlinetutdb";
var dburl = "http://127.0.0.1:5984/" + dbname + "/";
var handlers = {
    "queuePos" : updatePos,
    "chatMessage" : updateMsg,
};

var accdec = false;
function updatePos(response) {
    console.log(window.location.href.includes("startseite"));
    if(response.value == 0 && !accdec && window.location.href.includes("startseite")) {
        accdec = true;
        if(confirm("Du bist an der Reihe möchstest du mit dem Tutor reden?")) {
            window.location.href = "tutor_room.html";
        }  else {
            document.getElementById("queueDesc").innerHTML = "Personen in der Schlange";
            document.getElementById("enqueue_student").innerHTML =  "Eintragen";
            document.getElementById("enqueue_student").style.color ="green";
        }
    }
    document.getElementById("queuePos").innerHTML =  response.value;   
}

var prevMSG = "";
var count = 0;
function updateMsg(response) {
    let msg = response.msg;
    
    if(msg == prevMSG) {return;}
    prevMSG = msg;
    if(!count){count++; return;}
    $( ".chat-box" ).append('<div class="media w-50 mb-3"><img src="https://res.cloudinary.com/mhmd/image/upload/v1564960395/avatar_usae7z.svg" alt="user" width="50" class="rounded-circle"><div class="media-body ml-3"><div class="bg-light rounded py-2 px-3 mb-2"><p class="text-small mb-0 text-muted">'+msg+'</p></div> <p id="opening_message"class="small text-muted">' + new Date().toLocaleString()+'</p> </div></div>');
    $(".chat-box").scrollTop($('.chat-box')[0].scrollHeight - $('.chat-box')[0].clientHeight);  
}

