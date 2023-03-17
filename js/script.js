
var dailyCast = $("#today");
var weeklyCast = $("#forecast");

// Apply current date and time to current weather info.
var currentDate = moment().format("dddd Do MMMM YYYY");
var futureDate = moment().format("DD-MM-YY");
// $('#date').text(currentDate);

// Set current time to update dynamically
var update = function() {
    var currentTime = moment().format("LTS"); 
    $('#time').text(currentTime);
    setTimeout(update, 1000);
    // setInterval or setTimeout can be used.
}
update();
// console.log(update.currentTime)

var storedCity = localStorage.getItem("storedCity")

var apiKey = "900fdcffb7a2a35ad536a57ccbc492e5";


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

function wResults () {

  $("#search-button").on("click", function(event) {
    event.preventDefault();

    // if (dailyCast)
    $(dailyCast).empty();
    $(weeklyCast).empty();

    var citySearch = document.querySelector("#search-input").value.trim();

    localStorage.setItem("storedCity", citySearch);

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
      var iconImage = response.weather[0].icon;
      var iconImage = response.weather[0].icon

      console.log(iconImage);

      var searchURL = "https://api.openweathermap.org/data/2.5/forecast?lat=" + latitude + "&lon=" + longitude + "&appid=" + apiKey + "&units=metric";

      $.ajax({
        url: searchURL,
        method: "GET"
      }).then(function(data) {
    
        console.log(data);

        
        var dailyTable = $('<ul>').addClass("dailyInfo");
        var dailySymbol = $('<ul>').addClass("dailySymbol");
        var dtShow = $('<ul>').addClass("dateTime");

        var cityName = $("<h2>" + data.city.name + " - " + data.city.country + "</h2>");
        var dailyTemp = $("<h5>" + 'Temprature: ' + "</h5>");
        dailyTemp.append("<span class='dailyInfo'>" + tempText + "</span>");
        var dailyWind = $("<h5>" + 'Temprature: ' + "</h5>");
        dailyWind.append("<span class='dailyInfo'>" + windText + "</span>");
        var dailyHumid = $("<h5>" + 'Temprature: ' + "</h5>");
        dailyHumid.append("<span class='dailyInfo'>" + humidText + "</span>");
    
        $(dailyCast).append(dailyTable, dailySymbol, dtShow);
        $(dailyTable).append(cityName, dailyTemp, dailyWind, dailyHumid);

        var dailyIcon = $('<img>').attr("src", "http://openweathermap.org/img/wn/" + iconImage + "@4x.png");
        $(dailySymbol).append(dailyIcon);
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


        // var time = $("<h3 id='time'>" + liveTime + "</h3>");

        var info = $("<h4 id='info'>" + "Your local time is:" + "</h4>");
        var time = $("<h3 id='time'>");
        var date = $("<h3 id='date'>" + currentDate + "</h3>");

        $(dtShow).append(info, time, date);


        console.log(citySearch);
        console.log(apiKey);


        var weeklyTitle = $("<h3 id='weeklyTitle'>" + "5-Day Forecast:" + "</h3>");
        var weeklyTable = $("<div id='weeklyTable'>");

        $(weeklyCast).append(weeklyTitle, weeklyTable);

        var futureCast = data.list;

        for (var i = 0; i < 5; i++) {

          // futureCast[i] += 7
          futureDate[i];

          var wkTempTxt = futureCast[i].main.temp;
          var wkWindTxt = futureCast[i].wind.speed;
          var wkHumidTxt = futureCast[i].main.humidity;
          var wkIconImg = futureCast[i].weather[0].icon;

          var weeklyIcon = $('<img>').attr("src", "http://openweathermap.org/img/wn/" + wkIconImg + "@2x.png");

          var weeklyList = $('<ul>').addClass("weeklyList");
          var weeklyDate = $('<li>').addClass("weeklyInfo");
          var weeklySymbol = $('<li>').addClass("weeklySymbol");
          var weeklyTemp = $('<li>').addClass("weeklyInfo");
          var weeklyWind = $('<li>').addClass("weeklyInfo");
          var weeklyHumid = $('<li>').addClass("weeklyInfo");
          // var dtShow = $('<ul>').addClass("dateTime")

          weeklySymbol.append(weeklyIcon);
          weeklyDate.append("<h4>" + futureDate + "</h4>");
          weeklyTemp = $("<h5>" + "Temp: " + wkTempTxt + "</h5>");
          weeklyWind = $("<h5>" + "Wind: " + wkWindTxt + "</h5>");
          weeklyHumid = $("<h5>" + "Humidity: " + wkHumidTxt + "</h5>");
          

          $(weeklyTable).append(weeklyList);
          $(weeklyList).append(weeklyDate, weeklySymbol, weeklyTemp, weeklyWind, weeklyHumid);

        }

        renderButtons()
        

      });

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

  })

}

wResults()

var btnGrp = $("<div id='cities'>");
$("#history").append(btnGrp);
        
  
function renderButtons() {
  btnGrp.empty()
  for (var j = 0; j < 8; j++) {
    var cityName = $("<button>")
    .addClass("listCities cityBtn")
    .text(storedCity[j]);
    cityName.attr("data-city", storedCity[j])
    btnGrp.append(cityName)
  }
};

// var cities = [];
// function renderButtons() {

//   // Deletes the movies prior to adding new movies
//   // (this is necessary otherwise you will have repeat buttons)
//   $("#history").empty();

//   // Loops through the array of movies
//   for (var j = 0; j < storedCity.length; j++) {

//     // Then dynamicaly generates buttons for each movie in the array
//     // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
//     var btnGrp = $("<button>");
//     // Adds a class of movie to our button
//     btnGrp.addClass("cities");
//     // Added a data-attribute
//     btnGrp.attr("data-name", cities[j]);
//     // Provided the initial button text
//     btnGrp.text(cities[j]);
//     // Added the button to the buttons-view div
//     $("#history").append(btnGrp);
//   }
// }

// // This function handles events where the add movie button is clicked
// $("#search-button").on("click", function(event) {
//   event.preventDefault();
//   // This line of code will grab the input from the textbox
//   var cityName = $("#search-input").val();

//   // The movie from the textbox is then added to our array
//   citiies.push(cityName);

//   // Calling renderButtons which handles the processing of our movie array
//   renderButtons();

// });

// Adding click event listeners to all elements with a class of "movie"
$(document).on("click", ".listCities", wResults);

// Calling the renderButtons function to display the initial buttons
renderButtons();
// wResults();
    console.log(citySearch);
    console.log(apiKey);

  });

})

