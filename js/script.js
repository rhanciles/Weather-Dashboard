var dailyCast = $("#today");
var weeklyCast = $("#forecast");
var citySearch


// Apply current date and time to current weather info.
var currentDate = moment().format("dddd Do MMMM YYYY");


// Set current time to update dynamically
var update = function() {
    var currentTime = moment().format("LTS"); 
    $('#time').text(currentTime);
    setTimeout(update, 1000);
    // setInterval or setTimeout can be used.
}
update();
// console.log(update.currentTime)

var btnGrp = $("#history");
// $("#history").append(btnGrp);

var cityRecall = JSON.parse(localStorage.getItem("cityList")) || [];
console.log(cityRecall);
for (var j = 0; j < cityRecall.length; j++) {
  renderButtons(cityRecall[j]);
}

$("#search-button").on("click", function(event) {
  event.preventDefault();

  // citySearch = $(this).attr("data-city");

  citySearch = document.querySelector("#search-input").value.toUpperCase().trim();
  

if (citySearch.value = "" || !citySearch) {
  alert("Please enter a city");

} else if (citySearch.length && !cityRecall.includes(citySearch)) {

  cityRecall.push(citySearch);
  localStorage.setItem("cityList", JSON.stringify(cityRecall));
  renderButtons(citySearch);
  wResults(citySearch)

} else {
  alert("City name " + citySearch + " is already stored");
}

  console.log(citySearch);

});

var apiKey = "900fdcffb7a2a35ad536a57ccbc492e5";

// var queryURL = "http://api.openweathermap.org/geo/1.0/direct?q" + citySearch + "&limit=5&appid=" + apiKey;

function wResults (searchInput) {

  // $("#search-button").on("click", function(event) {
  //   event.preventDefault();
    // if (dailyCast)
    $(dailyCast).empty();
    $(weeklyCast).empty();

    // citySearch = $(this).attr("data-city");

    // citySearch = document.querySelector("#search-input").value.toUpperCase().trim();

    // const defaultAction = (citySearch.length && !cityRecall.includes(citySearch)) 
        
    //   switch (defaultAction) {
    //     case (citySearch.value = ""):
    //         alert("Please enter a city");
    //       break;
    //       case (defaultAction):
    //         cityRecall.push(citySearch);
    //         localStorage.setItem("cityList", JSON.stringify(cityRecall));
    //         renderButtons(citySearch);
    //       break;
    //       default:
    //         alert("City name already stored")
    //       break;
    //   }
    
    
    document.querySelector("#search-input").value = ""

    // var cityList = []
   
    // console.log(cityList)
    
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?&q=" + searchInput + "&appid=" + apiKey + "&units=metric";

    

    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {

      console.log(response);

      var latitude = response.coord.lat;
      var longitude = response.coord.lon;

      console.log(latitude);
      console.log(longitude);

      let cityName = response.name
      var tempText = response.main.temp;
      var windText = response.wind.speed;
      var humidText = response.main.humidity;
      var iconImage = response.weather[0].icon;

      console.log(iconImage);
      console.log(cityName);

      var searchURL = "https://api.openweathermap.org/data/2.5/forecast?lat=" + latitude + "&lon=" + longitude + "&appid=" + apiKey + "&units=metric";


      $.ajax({
        url: searchURL,
        method: "GET"
      }).then(function(data) {
    
        console.log(data);

        
        var dailyTable = $('<ul>').addClass("dailyInfo");
        var dailySymbol = $('<ul>').addClass("dailySymbol");
        var dtShow = $('<ul>').addClass("dateTime");

        let cityName = $("<h2>" + data.city.name + " - " + data.city.country + "</h2>");
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

        for (var i = 0; i < futureCast.length; i++) {

          // i * 8

          if (futureCast[i] !== futureCast[0] && futureCast[i] !== futureCast[8] && futureCast[i] !== futureCast[16] && futureCast[i] !== futureCast[24] && futureCast[i] !== futureCast[32]) {
          continue;
          }

          var wkTempTxt = futureCast[i].main.temp;
          var wkWindTxt = futureCast[i].wind.speed;
          var wkHumidTxt = futureCast[i].main.humidity;
          var wkIconImg = futureCast[i].weather[0].icon;

          let getDate = futureCast[i].dt;
          var wkDateTxt = new Date(getDate * 1000).toLocaleDateString('en-GB', { timeZone: 'UTC' });
          var wkTimeTxt = new Date(getDate * 1000).toLocaleTimeString();

          console.log(wkDateTxt);
          console.log(wkTimeTxt);

          var weeklyIcon = $('<img>').attr("src", "http://openweathermap.org/img/wn/" + wkIconImg + "@2x.png");

          var weeklyList = $('<ul>').addClass("weeklyList");
          var weeklyDate = $("<li id='weeklyDate'>").addClass("weeklyInfo");
          var weeklySymbol = $('<li>').addClass("weeklySymbol");
          var weeklyTemp = $('<li>').addClass("weeklyInfo");
          var weeklyWind = $('<li>').addClass("weeklyInfo");
          var weeklyHumid = $('<li>').addClass("weeklyInfo");
          // var dtShow = $('<ul>').addClass("dateTime")

          weeklySymbol.append(weeklyIcon);
          weeklyDate.append("<h5>" + wkDateTxt + "</h5>");
          weeklyTemp.append("<h5>" + "Temp: " + wkTempTxt + "</h5>");
          weeklyWind.append("<h5>" + "Wind: " + wkWindTxt + "</h5>");
          weeklyHumid.append("<h5>" + "Humidity: " + wkHumidTxt + "</h5>");
          

          $(weeklyTable).append(weeklyList);
          $(weeklyList).append(weeklyDate, weeklySymbol, weeklyTemp, weeklyWind, weeklyHumid);

        }

        // if (citySearch.length && !cityRecall.includes(citySearch)) {
        //   renderButtons(citySearch);
        // }

        const settings = {
          "async": true,
          "crossDomain": true,
          "url": "https://timezonedb.p.rapidapi.com/?key=R7HU0ECRVQW1&zone=America%2FLos_Angeles&lat=34.048108&lng=-118.244705",
          "method": "GET",
          "headers": {
            "X-RapidAPI-Key": "8a00af485bmsh6bc2edec3b26be2p10d764jsn4c89e3d3f9c8",
            "X-RapidAPI-Host": "timezonedb.p.rapidapi.com"
          }
        };
        
        $.ajax(settings).done(function (response) {
          console.log(response);
        });


        
        // citySearch.value = ""
        console.log("-------1------");
        

      });

      
    });
    

  // })

}

// wResults()
console.log("-------2------");

// var btnGrp = $("<div id='cities'>");
// $("#history").append(btnGrp);
        
  
function renderButtons(city) {
  // btnGrp.empty()
  // for (var j = 0; j < 5; j++) {
    var cityEntry = $("<button>")
    .addClass("cityBtn")
    .text(city);
    // $(cityEntry).on("click", wResults);
    cityEntry.attr("data-city", cityRecall[j]);
    btnGrp.append(cityEntry);
  // }
};


  $(document).on("click", ".cityBtn", function(event) {
    event.preventDefault();
    // wResults(event);
    let citySearch = $(this).html();

    console.log(citySearch); 
    // console.log(this);  
    wResults(citySearch);
  });
 



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
// $(document).on("click", ".listCities", wResults);

// Calling the renderButtons function to display the initial buttons
// renderButtons();
// wResults();