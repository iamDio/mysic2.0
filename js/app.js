var eventDate;
var tickUrl;
var venueZip;
var artistNameArray = [];
$('#zipSubmit').on('click', function(event) {
    event.preventDefault();
    var zip = $("#zipCode").val().trim();
    $.ajax({
        url: "http://api.jambase.com/events?zipCode=" + zip + "&radius=25&page=0&api_key=fr5nf65mebxcwq8q62rjb4tk&o=json",
        method: "GET",   
    }).done(function(response) {
        console.log(response);

        for (var i = 0; i < 9; i++) {
          //Get the events from the response
            console.log(response.Events[i]);
            eventDate = response.Events[i].Date;
            console.log("this is the event date " + eventDate);
            console.log('----------------------');

            tickUrl = response.Events[i].TicketUrl;
            console.log(tickUrl.search("https:"))
            var index = tickUrl.search("https:")
            tickUrl = tickUrl.slice(index)
            console.log("this is the event ID " + tickUrl);
            console.log("----------------------");

            venueZip = response.Events[i].Venue.City;
            console.log("this is the zipcode " + venueZip)
            console.log("--------------");

            const artistsArray = response.Events[i].Artists;
            for (let i = 0; i < artistsArray.length; i += 1) {
                artistNameArray.push(artistsArray[i].Name);
                console.log(artistsArray[i].Name);
            }


            $(".panel-body").append("<tr><td>" + moment(eventDate).format('LL') + "</td><td>" + artistNameArray + "</td><td>" + venueZip + "</td><td>" + "<button styleclass='ticket'><a href=" + tickUrl + '>Buy Tickets</a></button></td>');
            
            artistNameArray = [];
        }


    });
});

$(document).on("click", ".ticket", function(e) {
  e.preventDefault();

  const button = $(this);
  const href = button.find('a').attr('href');
  location.href = href;

})