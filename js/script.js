var apiKey = "900fdcffb7a2a35ad536a57ccbc492e5";
var cityName = $("#search-input").val()
console.log(cityName)
// // Here we are building the URL we need to query the database
// // var queryURL = "http://api.openweathermap.org/geo/1.0/direct?q" + cityName + "&limit=5&appid=" + apiKey;
// var queryURL = "https://api.openweathermap.org/data/2.5/weather?&q=" + cityName + "&appid=" + apiKey;

$("#search-button").on("click", function(event) {
    event.preventDefault();
    
    $.ajax({
      url: "https://api.openweathermap.org/data/2.5/weather?q=London,uk&appid=900fdcffb7a2a35ad536a57ccbc492e5",
      method: "GET"
    }).then(function(response) {
  
      console.log(response);

    });

});