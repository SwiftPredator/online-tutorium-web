    var editor = ace.edit("editor");
    var modelist = ace.require("ace/ext/modelist");
    editor.setTheme("ace/theme/monokai");
    editor.setShowPrintMargin(false);
    var drag = document.getElementById("editor");
    
    var filesContent = [];

    drag.ondragover = function(e){
        e.preventDefault()
    };

    drag.ondrop = function(e) {
        e.preventDefault();
            
            var length = e.dataTransfer.items.length;
            for (var i = 0; i < length; i++) {
                var entry = e.dataTransfer.items[i].webkitGetAsEntry();
                var file = e.dataTransfer.files[i];

                if (entry.isFile) {
                        var file = e.dataTransfer.files[i];
                        process(file)
                } else {
                    editor.setValue("Failed to import File");
                }
            }
    }

    function process(file){
        var reader = new FileReader();
            reader.onload = function(e) {
                var mode = modelist.getModeForPath(file.name).mode;
                editor.session.setMode(mode);
                editor.setValue(reader.result, -1);
                fileBarhandler(reader.result, file.name);
        }
        reader.readAsText(file);
    }

    function fileBarhandler(result, name) {
        filesContent.push(result);
        $('.navbar-nav .active').removeClass("active");
        var node = document.createElement("LI"); 
        node.classList.add("nav-item");
        node.classList.add("active");
        var aTag = document.createElement('a');
        aTag.innerHTML = name;
        aTag.classList.add("nav-link");
        const para = filesContent.length - 1; 
        aTag.onclick = function(event){ 
            var li = event.target.closest('li');
            var nodes = Array.from( li.closest('ul').children );
            var index = nodes.indexOf( li );
            changeFile(index); 
        };
        node.appendChild(aTag); 
        document.getElementById("fileSaver").appendChild(node); 
    }
    function changeFile(index) {
        //Save changes
        const currIndex =  $('.navbar-nav .active').index();
        filesContent[currIndex] = editor.getValue();
        $('.navbar-nav .active').removeClass("active");
        editor.setValue(filesContent[index],-1);
        $('.navbar-nav li').eq(index).addClass('active');
    }
    

    //Listener for downloading files
    document.getElementById("download").addEventListener("click", ()=>{
      var file = new File([editor.getValue()], "tut-download.txt", {type: "text/plain;charset=utf-8"});
      saveAs(file);
      
    });
 
    //Listen for send test messages
    document.getElementById("sendMessage").addEventListener("submit", function(e){
        e.preventDefault();
        $( ".chat-box" ).append('<div class="media w-50 ml-auto mb-3"> <div class="media-body"> <div class="bg-primary rounded py-2 px-3 mb-2"><p class="text-small mb-0 text-white">'+$('#message').val()+'</p></div><p class="small text-muted">'+ new Date().toLocaleString()+'</p></div></div>' );
        $('#message').val("");
        $(".chat-box").scrollTop($('.chat-box')[0].scrollHeight - $('.chat-box')[0].clientHeight);
    });

    //Listener for close file 
    document.getElementById("closeActiveFile").addEventListener("click", ()=>{
        if(confirm("Möchten Sie den File wirklich schließen?")) {
            const currIndex =  $('.navbar-nav .active').index();
            if(currIndex == -1) {return;}
            $('#fileSaver li').eq(currIndex).remove();
            filesContent.splice(currIndex, 1);
            editor.setValue("", -1);
            if(filesContent.length == 0) {return;}
            $('#fileSaver li').eq(0).addClass('active');
            editor.setValue(filesContent[0],-1);
        }
        
      });

      //Set opening Message Date dynamic
      document.getElementById("opening_message").innerHTML = new Date().toLocaleString();
    

