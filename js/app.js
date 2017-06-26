$('#zipSubmit').on('click', function(event) {
    event.preventDefault();
    const zip = $('#zipCode').val().trim();

    $.ajax({
        url: `http://api.jambase.com/events?zipCode=${zip}&radius=25&page=0&api_key=fr5nf65mebxcwq8q62rjb4tk&o=json`,
        method: 'GET',   
    }).done(function(response) {

        for (let i = 0; i < 9; i++) {
          //Get the events from the response
          const eventDate = response.Events[i].Date;
          const venueZip = response.Events[i].Venue.City;
          const artistsArray = response.Events[i].Artists;
          const artistNameArray = [];

          let tickUrl = response.Events[i].TicketUrl;
          const index = tickUrl.search('https:')
          tickUrl = tickUrl.slice(index)

          for (let i = 0; i < artistsArray.length; i += 1) {
              artistNameArray.push(artistsArray[i].Name);
          }

          $('.panel-body').append('<tr><td>' + moment(eventDate).format('LL') + '</td><td>' + artistNameArray + '</td><td>' + venueZip + '</td><td>' + '<button styleclass='ticket'><a href=' + tickUrl + '>Buy Tickets</a></button></td>');
          artistNameArray.length = 0;
        }


    });
});

$(document).on('click', '.ticket', function(event) {
  event.preventDefault();
  const href = $(this).find('a').attr('href');
  location.href = href;
})
