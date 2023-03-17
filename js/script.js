var apiKey = "900fdcffb7a2a35ad536a57ccbc492e5";

// var queryURL = "http://api.openweathermap.org/geo/1.0/direct?q" + cityName + "&limit=5&appid=" + apiKey;

$("#search-button").on("click", function(event) {
    event.preventDefault();
    var cityName = document.querySelector("#search-input").value.trim();
    // var citySearch = document.querySelector('.form-input').value;
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?&q=" + cityName + "&appid=" + apiKey;

    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
  
      console.log(response);

      var latitude = response.coord.lat;
      var longitude = response.coord.lon;
  
      console.log(latitude);
      console.log(longitude);

      var searchURL = "https://api.openweathermap.org/data/2.5/forecast?lat=" + latitude + "&lon=" + longitude + "&appid=" + apiKey + "&units=metric";

      $.ajax({
        url: searchURL,
        method: "GET"
      }).then(function(data) {
    
        console.log(data);
   
      });

    });

    console.log(cityName);
    console.log(apiKey);

});