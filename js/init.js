(function($){
  $(function(){

    $('.button-collapse').sideNav();
    $('.parallax').parallax();

  }); // end of document ready
})(jQuery); // end of jQuery name space


console.log("Ready!");

var zipcode = document.getElementById("zipcode");
console.log(zipcode);

var submit = document.getElementById("submit");
console.log(submit);

$(submit).on("click", function(event) {
	event.preventDefault();
	console.log(zipcode.value);
});