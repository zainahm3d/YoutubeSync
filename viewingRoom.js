var tag = document.createElement('script');
tag.id = 'iframe';
tag.src = 'https://www.youtube.com/iframe_api';
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var adminprivelege = false;
var player;
var videoId = '';
var room = '';

var playlist = new Array();
var made = false;

function onYouTubeIframeAPIReady() {
    player = new YT.Player('iframe', {
        videoId: videoId,
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }
    });
}


function onPlayerReady(event) {
    event.target.playVideo();
}

function onVideoEnd(playerStatus) {
    if (playerStatus == 0) {
        console.log('the video has ended');
        playlist.splice(0, 1);
        fireSet(room, playlist[0].id, (new Date).getTime());
    }
}

function make(roomName) {
    var ytPlayer = document.getElementById('iframe');
    var table = document.createElement("table");
    var newrow = document.createElement('tr');
    var upNext = document.createElement('th');
    var idCol = document.createElement('th');
    makeTable();
    //create new elements
    if (adminprivelege) {
        var newButton = document.createElement("button");
        var button2 = document.createElement('button');
        var cancel = document.createElement('button');
        newButton.id = "addToPlaylist";
        button2.id = "add";
        cancel.id = "cancel";
        cancel.innerText = "Cancel";
        newButton.innerText = "Add to Playlist";
        button2.innerText = "Add";
        button2.style.display = 'none';
        cancel.style.display = 'none';
        newButton.className = "buttons";
        button2.className = 'buttons';
        cancel.className = 'buttons';
        cancel.style.margin = '20px';
        newButton.style.margin = '20px';
        button2.style.margin = '20px';
        newButton.style.marginTop = "20px";
        var container = document.createElement('div');
        container.insertBefore(newButton, container.lastChild);
        container.insertBefore(cancel, container.lastChild);
        container.insertBefore(button2, container.lastChild);
        container.id = "bar"
        ytPlayer.parentElement.insertBefore(container, ytPlayer.parentElement.lastChild);
    }

    //set ID's and inner text, decide whether to hide/show buttons
    table.id = "playlist";
    //Shows the forms and the buttons needed
    if (adminprivelege) {
        newButton.addEventListener("click", () => {
            newButton.style.display = 'none';
            button2.style.display = 'inline-block';
            cancel.style.display = 'inline-block';
            newrow.style.display = 'table-row';
        });
    }
    if (adminprivelege) {
        //Add button appends new item to the end of the table
        button2.addEventListener("click", () => {
            var name = document.getElementById('nameinput').value;
            var id = document.getElementById('idinput').value;
            if (name == "" || id == "") {
                alert("Please make sure that both the name and ID fields are completed");
                return;
            } else {
                newButton.style.display = 'inline-block';
                button2.style.display = 'none';
                newrow.style.display = 'none';
                cancel.style.display = 'none';
                document.getElementById('nameinput').value = '';
                document.getElementById('idinput').value = '';
                var temp = new PlaylistItem(name, id);
                playlist.push(temp);
                fireUpdate(roomName);
                updateTable();
            }
        });
    }
    if (adminprivelege) {
        //event listener for cancel button
        cancel.addEventListener("click", () => {
            newButton.style.display = 'inline-block';
            button2.style.display = 'none';
            newrow.style.display = 'none';
            cancel.style.display = 'none';
            document.getElementById('nameinput').value = '';
            document.getElementById('idinput').value = '';
        });
    }
    fireCheck(room);
    updateTable();
}

function makeTable() {
    var listTables = document.getElementsByTagName('table');
    if (listTables.length == 1) {
        listTables[0].parentElement.removeChild(listTables[0]);
    }
    var ytPlayer = document.getElementById('iframe');
    var table = document.createElement("table");
    var newrow = document.createElement('tr');
    var upNext = document.createElement('th');
    var idCol = document.createElement('th');
    ytPlayer.insertAdjacentElement("afterend", table);
    newrow.className = "rows"
    idCol.innerText = "ID's"
    upNext.innerText = "Up Next"
    newrow.appendChild(upNext);
    newrow.appendChild(idCol);
    table.appendChild(newrow);
    var nameinput = document.createElement('input');
    var idinput = document.createElement('input');
    nameinput.placeholder = "name";
    idinput.placeholder = "video id";
    nameinput.id = "nameinput";
    idinput.id = "idinput";
    nameinput.className = 'inputs';
    idinput.className = 'inputs';
    newrow = document.createElement('tr');
    var namecell = document.createElement('td');
    var idcell = document.createElement('td');
    newrow.id = 'forms';
    namecell.insertAdjacentElement("afterbegin", nameinput);
    idcell.insertAdjacentElement("afterbegin", idinput);
    newrow.appendChild(namecell);
    newrow.appendChild(idcell);
    table.appendChild(newrow);
    newrow.style.display = 'none';
    table.style.display = 'table';
    made = true;
}


function syncRoom(roomName, privelege) {
    adminprivelege = privelege;
    room = roomName;
    fireUpdate(roomName);

    var currentTime = (new Date).getTime();
    var timeIntoVideo = ((currentTime - time) / 1000);
    playlist.push(new PlaylistItem("table", vidId));
    player.cueVideoById(vidId, timeIntoVideo);
    document.getElementById('iframe').style.display = 'block';
    player.playVideo();
    var ytPlayer = document.getElementById("iframe");
    if (document.getElementById("roomTitle") == null) {
        var roomTitle = document.createElement("h2");
        roomTitle.innerText = "Room: " + roomName;
        roomTitle.id = 'roomTitle';
        ytPlayer.parentElement.insertBefore(roomTitle, ytPlayer);
    }
    if (!made) {
        make(roomName);
    }
    pullConnectedNumber();
}

function fireCheck(room) {
    firebase.database().ref("Rooms/" + room + "/next").on("value", function(snapshot) {
        console.log("listen for update event");
        makeTable();
        updateTable();
    });
}

function updateTable() {

    return firebase.database().ref("Rooms/" + room).once('value').then(function(snapshot) {
        var list = snapshot.val().next;
        var newItem = '';
        var itemName = '';
        var table = document.getElementsByTagName('table')[0]
        var itemID = '';
        for (var i = document.getElementsByTagName('table')[0].childNodes.length - 1; i < list.length; i++) {
            newItem = document.createElement('tr');
            itemName = document.createElement('td');
            itemID = document.createElement('td');
            itemID.innerText = list[i].id;
            itemName.innerText = list[i].name;
            newItem.appendChild(itemName);
            newItem.appendChild(itemID);
            table.insertBefore(newItem, table.lastChild);
        }
    });
}

function onPlayerStateChange(event) {
    onVideoEnd(event.data);
}


function PlaylistItem(name, id) {
    this.name = name;
    this.id = id;
}
