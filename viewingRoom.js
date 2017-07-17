var tag = document.createElement('script');
tag.id = 'iframe';
tag.src = 'https://www.youtube.com/iframe_api';
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var player;
var videoId = '';
var room = '';

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
        fireSet(room, playlist[0], (new Date).getTime());
    }
}

function make(roomName) {
    var ytPlayer = document.getElementById("iframe");
    var roomTitle = document.createElement("h2");
    roomTitle.innerText = "Room: " + roomName;
    ytPlayer.parentElement.insertBefore(roomTitle, ytPlayer);
    //create new elements
    var newButton = document.createElement("button");
    var button2 = document.createElement('button');
    var table = document.createElement("table");
    var newrow = document.createElement('tr');
    var upNext = document.createElement('th');
    var idCol = document.createElement('th');
    var cancel = document.createElement('button');
    //set ID's and inner text, decide whether to hide/show buttons
    table.id = "playlist";
    newButton.id = "addToPlaylist";
    button2.id = "add";
    cancel.id = "cancel";
    cancel.innerText = "Cancel";
    newButton.innerText = "Add to Playlist";
    button2.innerText = "Add";
    button2.style.display = 'none';
    cancel.style.display = 'none';
    newButton.className = "buttons1";
    button2.className = 'buttons1';
    cancel.className = 'buttons1';
    cancel.style.margin = '10px';
    newButton.style.margin = '10px';
    button2.style.margin = '10px';
    //Shows the forms and the buttons needed
    newButton.addEventListener("click", () => {
        document.getElementById('addToPlaylist').style.display = 'none';
        document.getElementById('add').style.display = 'inline-block';
        document.getElementById('cancel').style.display = 'inline-block';
        document.getElementById('forms').style.display = 'table-row';
    });
    //Add button appends new item to the end of the table
    button2.addEventListener("click", () => {
        var name = document.getElementById('nameinput').value;
        var id = document.getElementById('idinput').value;
        if (name == "" || id == "") {
            alert("Please make sure that both the name and ID fields are completed");
            return;
        } else {
            document.getElementById('addToPlaylist').style.display = 'inline-block';
            document.getElementById('add').style.display = 'none';
            document.getElementById('forms').style.display = 'none';
            document.getElementById('cancel').style.display = 'none';
            document.getElementById('nameinput').value = '';
            document.getElementById('idinput').value = '';
            var newListItem = document.createElement('tr');
            var itemName = document.createElement('td');
            var itemID = document.createElement('td');
            itemID.innerText = id;
            itemName.innerText = name;
            newListItem.appendChild(itemName);
            newListItem.appendChild(itemID);
            var table = document.getElementsByTagName('table')[0];
            table.insertBefore(newListItem, table.lastChild);
            var temp = new PlaylistItem(name, id);
            playlist.push(temp);
            fireUpdate(roomName);
        }
    });
    //event listener for cancel button
    cancel.addEventListener("click", () => {
        document.getElementById('addToPlaylist').style.display = 'inline-block';
        document.getElementById('add').style.display = 'none';
        document.getElementById('forms').style.display = 'none';
        document.getElementById('cancel').style.display = 'none';
        document.getElementById('nameinput').value = '';
        document.getElementById('idinput').value = '';
    });

    newButton.style.marginTop = "20px";
    var container = ytPlayer.parentElement;
    container.insertBefore(newButton, container.lastChild);
    container.insertBefore(cancel, container.lastChild);
    idCol.innerText = "ID's"
    upNext.innerText = "Up Next"
    newrow.appendChild(upNext);
    newrow.appendChild(idCol);
    table.appendChild(newrow);
    container.insertBefore(table, newButton);
    container.insertBefore(button2, container.lastChild);
    var nameinput = document.createElement('input');
    var idinput = document.createElement('input');
    nameinput.placeholder = "name";
    idinput.placeholder = "video id";
    nameinput.id = "nameinput";
    idinput.id = "idinput";
    nameinput.className = 'inputs1';
    idinput.className = 'inputs1';
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
}


function syncRoom(roomName) {
    room = roomName;
    fireUpdate(roomName);
    var currentTime = (new Date).getTime();
    var timeIntoVideo = ((currentTime - time) / 1000);
    playlist.push(vidId);
    player.cueVideoById(vidId, timeIntoVideo);
    document.getElementById('iframe').style.display = 'block';
    player.playVideo();
    make(roomName);
}

function onPlayerStateChange(event) {
    onVideoEnd(event.data);
}

function PlaylistItem(name, id) {
    this.name = name;
    this.id = id;
}
var playlist = new Array();