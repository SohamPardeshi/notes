var ref = db.ref("meta");
var notes = []


ref.once('value').then(function(snap){
    for(var key in snap.val()){
        notes.push(snap.val()[key])
    }
    sortNotes();
    filterNotes();
});


function sortNotes(){
    function compare(a, b) {
      if (a.dateModified > b.dateModified)
        return -1;
      if (a.dateModified < b.dateModified)
        return 1;
      return 0;
    }
    notes.sort(compare);
}

function filterNotes() {
    var urlParams;
    // Thank you Stack Overflow's Andy E!
    (window.onpopstate = function () {
        var match,
            pl     = /\+/g,  // Regex for replacing addition symbol with a space
            search = /([^&=]+)=?([^&]*)/g,
            decode = function (s) { return decodeURIComponent(s.replace(pl, " ")); },
            query  = window.location.search.substring(1);

        urlParams = {};
        while (match = search.exec(query))
           urlParams[decode(match[1])] = decode(match[2]);
    })();
    
    if(urlParams.search == undefined){
        display()
        return;
    }
    
    var files = {}
    db.ref("files").once('value').then(function(snap){
        for(var tmp in snap.val())
            files[tmp] = snap.val()[tmp];
        
        var search = urlParams.search.toLowerCase();
        notes = notes.filter(function(obj){
            return obj.className.toLowerCase().includes(search) ||
                files[obj.className + " - " + obj.filename].toLowerCase().includes(search)|| 
                obj.filename.toLowerCase().includes(search);
        });

        display();
    });
}


function display() {
    if(notes.length == 0) return alert("No notes found...");
    
    var container = document.getElementById('contain');
    container.innerHTML = "";
  
    var spinner = document.getElementById('myspinner');
    if(spinner !== null) spinner.remove();
    
    for(note in notes){
        var obj = notes[note];
        var date = new Date(obj.dateModified);
        
        var str = "view?content=" + btoa(encodeURIComponent(obj.className + " - " + obj.filename));
        
        var txt = 
        "" +
        "        <div class='col s12 m3'>"+
        "            <div class='card darken-1'>"+
        "                <div class='card-content black-text'>"+
        "                    <span class='myclass'>" + obj.className +  "</span>"+
        "                    <span class='card-title'>" + obj.filename +  "</span>"+
        "                </div>"+
        "          <center><div class='card-action'>"+
        "                       <span class='mydate'>" + date.toRelativeTime() + "</span>" +
        "                       <a class='waves-effect waves-light btn' style='margin-left: 40px;' href='" + str + "' >View</a>" +
        "                </div></center>"+
        "            </div>"+
        "        </div>";
        
        container.innerHTML += txt;
    }
    equalize();
}

function equalize() {
    var maxHeight = 0;
    var part = ".card-content";
    
    
    $(part).each(function(){
        $(this).css('height', 'auto');
        if ($(this).height() > maxHeight) { maxHeight = $(this).height(); }
    });

    $(part).height(maxHeight);
}

function modal() {
    $('.fixed-action-btn.toolbar').closeToolbar();
    $('.fixed-action-btn.toolbar').hide();
    
    var modal = document.getElementById('myModal');
    var span = document.getElementsByClassName("close")[0];

    modal.style.display = "block";
    span.onclick = function() {
            modal.style.display = "none";
            $('.fixed-action-btn.toolbar').show();
    };
    
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
            $('.fixed-action-btn.toolbar').show();
        }
    }
}

function closeModal() {
    
}


window.addEventListener("resize", function() {
    equalize();
});