$(document).ready(function() {
    //________________________VARIABLES __________
    // @TODO: Remove/Refactor Globals
    let artistArray = [];
    let playButton = document.getElementById('playButton');
    let pauseButton = document.getElementById('pauseButton');
    let previewUrl;
    let searchValue;
    let audio;
    let lastAudio;

    //________________________MAIN CODE____________________
    
    // event listener for the event submit
    $('form').on('submit', function(e) {
        e.preventDefault();

        $('#playButton').empty();
        $('#pauseButton').empty();

        searchValue = $("#searchbar").val().trim()
        getArtistInfo(searchValue);

        //push values of submit to artistsArray
        const artistSubmit = $('input').val().trim();
        artistArray.push(artistSubmit);

        createsPlayButton();
        createsPauseButton();
    });

    //_____________________FUNCTIONS_________________________________

//Go to Itunes and get the artists
function getArtistInfo(artist) {

    var apiUrl = 'https://itunes.apple.com/search?term=' + artist +
        '&media=music&country=US&limit=1';

    $.ajax({
        url: apiUrl,
        method: 'GET',
        dataType: 'json'
    }).done(function(response) {
        previewUrl = response.results[0].previewUrl;
    }) //AJAX
} //function get artist info

function createsPlayButton(){
  const createPlay = $(`<button> &#9658 ${searchValue}</button>`)
  createPlay.addClass('createPlay btn-success');
  $('#playButton').append(createPlay)         
}


function createsPauseButton(){
   var createPause = $("<button> &#9724 "+  searchValue + "</button>")
   createPause.addClass('createPause  btn-danger');
   $('#pauseButton').append(createPause)         
}

$(document).on('click', '.createPlay', function(e) {
    e.preventDefault();
    if (lastAudio) {
        getDomElement(lastAudio).pause();
        lastAudio.remove();
    }

    audio = $("<audio>");
    audio.attr('src', previewUrl);
    console.log(audio.attr('src'));
    getDomElement(audio).play();
    
    lastAudio = audio;
});

$(document).on('click', ".createPause", function(e) {
  getDomElement(audio).pause();
});

function getDomElement(jqueryAudio) {
    return jqueryAudio.get(0);
}
}); //document .ready
