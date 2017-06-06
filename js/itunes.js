$(document).ready(function() {

console.log("i'm loading")
    //________________________VARIABLES __________
    var artistArray = [];
    var playButton = document.getElementById('playButton');
    var pauseButton = document.getElementById('pauseButton');
    var previewUrl;
    var searchValue;
    var audio;

    //________________________MAIN CODE____________________
    
    // event listener for the event submit
    $('form').on('submit', function(e) {

         $('#playButton').empty();
         $('#pauseButton').empty();

         searchValue = $("#searchbar").val().trim()
        console.log(searchValue)
        getArtistInfo(searchValue);
        e.preventDefault();
        console.log(e);

        //push values of submit to artistsArray
        var artistSubmit = $('input').val().trim();
        artistArray.push(artistSubmit);
        console.log(artistArray);

        createsPlayButton();
        createsPauseButton();

    });

    //_____________________FUNCTIONS_________________________________

    //Go to Itunes and get the artists
    function getArtistInfo(artist) {

        console.log(artist);
        // var performer = $(artist).attr('artists-name');
        // console.log("this is" + performer);
        var apiUrl = 'https://itunes.apple.com/search?term=' + artist +
            "&media=music&country=US&limit=1";

        $.ajax({
            url: apiUrl,
            method: 'GET',
            dataType: 'json'
        }).done(function(response) {
                console.log(response)

                previewUrl = response.results[0].previewUrl;
                console.log(previewUrl)
        
        }) //AJAX
} //function get artist info

function createsPlayButton(){
                 //var div = $("<div>");
                 var createPlay = $("<button> &#9658 "+  searchValue + "</button>")
                 createPlay.addClass('createPlay btn-success');
                 $('#playButton').append(createPlay)         
}

// @TODO: Remove/refactor global
var lastAudio;

$(document).on('click', ".createPlay", function(e) {
 console.log(e);
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


function createsPauseButton(){
     //var div = $("<div>");
     var createPause = $("<button> &#9724 "+  searchValue + "</button>")
     createPause.addClass('createPause  btn-danger');
     $('#pauseButton').append(createPause)         
}

$(document).on('click', ".createPause", function(e) {

 console.log(e);
 
 console.log(audio.attr('src'));
 getDomElement(audio).pause();
});


//function that creates an audio element 
/*function createPlayButton() {
    var playButton = $('.playButton').html('<button class ="playButton"> play </button>');
    console.log(playButton)
}*/

//create a function that plays the audio and takes previewUrl as an argument
function getDomElement(jqueryAudio) {
    return jqueryAudio.get(0);
}

//function that pauses 
/*function pauseAudio(jqueryAudio) {
    return jqueryAudio.get(0);
}*/

}); //document .ready





