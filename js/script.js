// Apply current date and time to current weather info.
var currentDate = moment().format("dddd Do MMMM YYYY"); 
// $('#currentDay').text(currentDate);

// var currentTime = moment().format("LTS");
var dailyCast = $("#today")
var weeklyCast = $("#forecast")
// Set current time to update dynamically
var update = function() {
    currentTime = moment().format("LTS"); 
    $('#time').text(currentTime);
    setTimeout(update, 1000);
    // setInterval or setTimeout can be used.
}
update()
var apiKey = "900fdcffb7a2a35ad536a57ccbc492e5";
// console.log(update.currentTime)
// var queryURL = "http://api.openweathermap.org/geo/1.0/direct?q" + citySearch + "&limit=5&appid=" + apiKey;

$("#search-button").on("click", function(event) {
    event.preventDefault();
    if (dailyCast)
        $(dailyCast).val(" ");

    var citySearch = document.querySelector("#search-input").value.trim();
    
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?&q=" + citySearch + "&appid=" + apiKey + "&units=metric";

    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
  
      console.log(response);

      var latitude = response.coord.lat;
      var longitude = response.coord.lon;
  
      console.log(latitude);
      console.log(longitude);

      var tempText = response.main.temp;
      var windText = response.wind.speed;
      var humidText = response.main.humidity;
      var iconImage = response.weather[0].icon

      console.log(iconImage);

      var searchURL = "https://api.openweathermap.org/data/2.5/forecast?lat=" + latitude + "&lon=" + longitude + "&appid=" + apiKey + "&units=metric";

      $.ajax({
        url: searchURL,
        method: "GET"
      }).then(function(data) {
    
        console.log(data);

        
        var wTable = $('<ul>').addClass("wInfo")
        var wSymbol = $('<ul>').addClass("wSymbol")
        var dtShow = $('<ul>').addClass("dateTime")

        var cityName = $("<h2>" + data.city.name + " - " + data.city.country + "</h2>")
        var wTemp = $("<h5>" + 'Temprature: ' + "</h5>");
        wTemp.append("<span class='wInfo'>" + tempText + "</span>");
        var wWind = $("<h5>" + 'Temprature: ' + "</h5>");
        wWind.append("<span class='wInfo'>" + windText + "</span>");
        var wHumid = $("<h5>" + 'Temprature: ' + "</h5>");
        wHumid.append("<span class='wInfo'>" + humidText + "</span>");
    
        $(dailyCast).append(wTable, wSymbol, dtShow);
        $(wTable).append(cityName, wTemp, wWind, wHumid);

        var wIcon = $('<img>').attr("src", "http://openweathermap.org/img/wn/" + iconImage + "@4x.png");
        $(wSymbol).append(wIcon);

        // var timeURL = "https://okapi-retrieve-current-time-v1.p.rapidapi.com/datetime/lookup/time?timezone-addresslocality=" + citySearch + "&timezone-latitude=" + latitude + "&timezone-name=CEST&timezone-longitude=" + longitude;

        // $.ajax({
        //     url: timeURL,
        //     method: "GET"
        // }).then(function(info) {
        
        //     console.log(info);



        // var refreshTime = function() {
        //     liveTime = currentTime
        //     setInterval(refreshTime, 1000);
        //     // setInterval or setTimeout can be used.
        //     console.log(liveTime)
        // }
        // refreshTime()

        // var time = $("<h3 id='time'>" + liveTime + "</h3>");
        
        var time = $("<h3 id='time'>");
        var date = $("<h3 id='date'>" + currentDate + "</h3>");

        $(dtShow).append(time, date);


       
      // });

    });

    console.log(citySearch);
    console.log(apiKey);

  });

})
