function createAlbum(config = {}){
    let albumTitle = config['albumTitle'] ?? '';
    let albumImage = config['albumImage'] ?? './data/img/album_0.png';
    let albumDate = config['albumDate'] ?? (new Date());
    let albumTracks = config['albumTracks'] ?? [];
    let albumType = config['albumType'] ?? '';

    return {
        getTitle: function(){ return albumTitle; },
        getType: function(){ return albumType; },
        getImage: function(){ return albumImage; },
        getDate: function(){ return albumDate; },
        getTracks: function(){ return albumTracks; }
    };
}

function createAlbumElement(index, album){
    let expanded = true;
    let tracksH = undefined;
    
    let outerElement = document.createElement('div');
    outerElement.className = 'album_container';
    
    let headerElement = document.createElement('div');
    headerElement.className = 'album_header';
    outerElement.appendChild(headerElement);

    let headerImg = document.createElement('img');
    headerImg.src = album.getImage();
    headerElement.appendChild(headerImg);

    let headerTitle = document.createElement('div');
    headerTitle.className = 'title';
    headerTitle.innerText = album.getTitle();
    headerElement.appendChild(headerTitle);

    let headerSubtitle = document.createElement('div');
    headerSubtitle.className = 'subtitle';
    headerSubtitle.innerText = `${album.getType()}  •  ${album.getDate().getFullYear()}  •  ${album.getTracks().length} ${(album.getTracks().length == 1 ? 'song' : 'songs')}`;
    headerElement.appendChild(headerSubtitle);

    let tracksElement = document.createElement('div');
    tracksElement.className = 'album_tracklist';
    outerElement.appendChild(tracksElement);

    let tableElement = document.createElement('table');
    tableElement.setAttribute('cellspacing', '0');
    tracksElement.appendChild(tableElement);

    let tableHeaderElement = document.createElement('tr');
    tableHeaderElement.innerHTML = `
        <td class='tracklist_header' style='width: 80px'>#</td>
        <td class='tracklist_header'>Title</td>
        <td class='tracklist_header' style='width: 15%;'>Plays</td>`;
    tableElement.appendChild(tableHeaderElement);

    let tracks = album.getTracks();
    for(let i=0; i<tracks.length; i++){
        let row = document.createElement('tr');
        row.className = 'norm';

        let iTitle = tracks[i].title;
        let iArtist = tracks[i].artist;
        let iPlays = tracks[i].plays.toLocaleString();
        let iSource = tracks[i].url;

        row.onclick = () => {
            window.open(iSource, 'blank');
        }
        
        row.innerHTML = `
            <td>${i + 1}</td>
            <td>${iTitle}<br><span class='grey'>${iArtist}</span></td>
            <td><span class='grey'>${iPlays}</span></td>`;
        
            tableElement.appendChild(row);
    }

    headerElement.onclick = () => {
        expanded = !expanded;
        tracksH ??= tracksElement.clientHeight;

        tracksElement.style.height = (expanded ? tracksH : 0);

        return;
    };

    return {
        appendTo: function(element){
            var result = element.appendChild(outerElement);
            setTimeout(headerElement.click, 500);
            tracksH = tracksElement.clientHeight;
            tracksElement.style.height = tracksH;
            return result;
        }
    };
}

tuneterra = (function(){
    let profile = {
        profileName: 'Akali',
        profileImage: './data/img/akali_profile_256px.png',
        profileLocation: 'Seoul, South Korea',
        profileFollowers: 13872840,
        profileDescription: 'From her bedroom to the big stage, right back to her bedroom again - ' +
        'Akali Jhomen Tethi secured her status as an SoundCloud rapper turned global K-Pop sensation before returning to her roots as an independent soloist.<br>' +
        'Her proficiency in the rap game has blazed trails and inspired thousands to walk the scorched path in her wake.'
    };

    let discography = [];
    let discographyElements = [];

    return {
        discographyGet: function(){
            return discography;
        },

        discographyAddAlbum: function(album){
            let albumIndex = discography.length;
            let albumElement = createAlbumElement(albumIndex, album);

            albumElement.appendTo(document.getElementById('container'));

            discography.push(album);
            discographyElements.push(albumElement);
            return albumIndex;
        },

        discographyGetAlbum: function(index){
            return discography[index];
        },

        getProfile: function(){
            return profile;
        },

        injectProfile: function(){
            document.getElementById('profile_container').innerHTML = `
                <img class='banner' src='./data/img/akali_banner.jpeg'>
                <img class='avatar' src='${tuneterra.getProfile().profileImage}'>
                <div class='name'>${tuneterra.getProfile().profileName}</div>
                <div class='verified'><img src='./data/img/verified.png' style='width: 16px; height: 16px;'/> Verified Artist</div>
                <div class='details'>${tuneterra.getProfile().profileFollowers.toLocaleString()} followers<br>
                ${Math.floor(tuneterra.getProfile().profileFollowers * 0.613).toLocaleString()} monthly listeners</div>
                <div class='description'>${tuneterra.getProfile().profileDescription}</div>
            `;

            return;
        }
    };
})();