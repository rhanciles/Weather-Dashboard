var dailyCast = $("#today");
var weeklyCast = $("#forecast");
var cityInsights = $("#moreInfo");
var createBtn = $("#clrButton")
var header = $("header");
var btnGrp = $("#history");
var container = document.getElementsByClassName(".row");

// Apply current date and time to current weather info.
var currentDate = moment().format("dddd Do MMMM YYYY");


// Set current time to update dynamically
var refresh = function() {
    var currentTime = moment().format("LTS"); 
    $('#time').text(currentTime);
    setTimeout(refresh, 1000);
    // setInterval or setTimeout can be used.
}
refresh();
// console.log(update.currentTime)

var cityRecall = JSON.parse(localStorage.getItem("cityList")) || [];
// console.log(cityRecall);
for (var j = 0; j < cityRecall.length; j++) {
  renderButtons(cityRecall[j]);
  
}

var apiKey = "900fdcffb7a2a35ad536a57ccbc492e5";

function wResults (searchInput) {
  // Clear entries to avoid duplication
  $(dailyCast).empty();
  $(weeklyCast).empty();
  $(cityInsights).empty();
  
  document.querySelector("#search-input").value = ""
  
  var queryURL = "https://api.openweathermap.org/data/2.5/weather?&q=" + searchInput + "&appid=" + apiKey + "&units=metric";

  // Get weather Longitude and Latitude info from API 
  $.ajax({
    url: queryURL,
    method: "GET"
    }).then(function(response) {

    // console.log(response);

    if (!cityRecall.includes(searchInput)) {
      cityRecall.push(searchInput);
      localStorage.setItem("cityList", JSON.stringify(cityRecall));

      $(header).addClass("weather-header");
      $(".mainDiv").addClass("wDboard");
      renderButtons(searchInput);
    }

    var latitude = response.coord.lat;
    var longitude = response.coord.lon;

    // console.log(latitude);
    // console.log(longitude);

    var cityName = response.name
    var tempText = response.main.temp;
    var windText = response.wind.speed;
    var humidText = response.main.humidity;
    var iconImage = response.weather[0].icon;

    // console.log(iconImage);
    // console.log(cityName);

    var searchURL = "https://api.openweathermap.org/data/2.5/forecast?lat=" + latitude + "&lon=" + longitude + "&appid=" + apiKey + "&units=metric";

    // Use weather Longitude and Latitude info to trigger 2nd search.  
    $.ajax({
      url: searchURL,
      method: "GET"
      }).then(function(data) {
  
      // console.log(data);
      
      // Dynamically create elements to populate daily weather info on the dom.
      var dailyTable = $('<ul>').addClass("dailyInfo");
      var dailySymbol = $('<ul>').addClass("dailySymbol");
      var dtShow = $('<ul>').addClass("dateTime");

      var cityTitle = $("<h2>" + data.city.name + " - " + data.city.country + "</h2>");
      var dailyTemp = $("<h5>" + 'Temprature: ' + "</h5>");
      dailyTemp.append("<span class='dailyInfo'>" + tempText + "</span>");
      var dailyWind = $("<h5>" + 'Temprature: ' + "</h5>");
      dailyWind.append("<span class='dailyInfo'>" + windText + "</span>");
      var dailyHumid = $("<h5>" + 'Temprature: ' + "</h5>");
      dailyHumid.append("<span class='dailyInfo'>" + humidText + "</span>");
  
      $(dailyCast).append(dailyTable, dailySymbol, dtShow);
      $(dailyTable).append(cityTitle, dailyTemp, dailyWind, dailyHumid);

      var dailyIcon = $('<img>').attr("src", "http://openweathermap.org/img/wn/" + iconImage + "@4x.png");
      $(dailySymbol).append(dailyIcon);

      // Create element to show time from moment.
      var info = $("<h4 id='info'>" + "Your local time is:" + "</h4>");
      var time = $("<h3 id='time'>");
      var date = $("<h3 id='date'>" + currentDate + "</h3>");

      $(dtShow).append(info, time, date);

      // console.log(searchInput);
      // console.log(apiKey);

      // Dynamically create elements to populate weekly weather info on the dom.
      var weeklyTitle = $("<h3 id='weeklyTitle'>" + "5-Day Forecast:" + "</h3>");
      var weeklyTable = $("<div id='weeklyTable'>");

      $(weeklyCast).append(weeklyTitle, weeklyTable);

      var futureCast = data.list;

      for (var i = 0; i < futureCast.length; i++) {

        if (futureCast[i] !== futureCast[0] && futureCast[i] !== futureCast[8] && futureCast[i] !== futureCast[16] && futureCast[i] !== futureCast[24] && futureCast[i] !== futureCast[32]) {
        continue;
        }

        var wkTempTxt = futureCast[i].main.temp;
        var wkWindTxt = futureCast[i].wind.speed;
        var wkHumidTxt = futureCast[i].main.humidity;
        var wkIconImg = futureCast[i].weather[0].icon;

        var getDate = futureCast[i].dt;
        var wkDateTxt = new Date(getDate * 1000).toLocaleDateString('en-GB', { timeZone: 'UTC' });
        var wkTimeTxt = new Date(getDate * 1000).toLocaleTimeString();

        // console.log(wkDateTxt);
        // console.log(wkTimeTxt);

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

        var timeURL = "https://api.timezonedb.com/v2.1/get-time-zone?key=R7HU0ECRVQW1&format=json&by=position&lat=" + latitude + "&lng=" + longitude;

        // Use city info to get further information from a third API.
        $.ajax({
          url: timeURL,
          method: "GET"
          }).then(function(timeZone) {

          // console.log(timeZone);

          var getTime = timeZone.timestamp;
          var getCity = timeZone.cityName;
          var getRegion = timeZone.regionName;
          var getCountry = timeZone.countryName;

          // console.log(getTime);
          // console.log(getCity);
          // console.log(getRegion);
          // console.log(getCountry);

          // Used moment insted of vanilla JS below to change date format.
          // const zoneDate = new Date(getTime * 1000).toLocaleDateString('en-GB');
          // var zoneTime = new Date(getTime * 1000).toLocaleTimeString('en-GB');

          var zoneDate = moment.unix(getTime).format("dddd Do MMM YYYY");
          var zoneTime = moment.unix(getTime).format("LTS");

          // console.log(zoneDate);
          // console.log(zoneTime);

          // Dynamically create elements to populate further info in the footer from the 3rd API.
          var footerTxt = $("<div id='insights'>"); 
          var zoneInfo = $("<p id='zoneTxt'>" + "It is " + "<span id='zoneDate'>" + zoneDate + ", " + "</span>" + "<span id='zoneTime'>" + zoneTime + "</span>" + " now in " + "<span class='zoneRegion'> " + getCity + " - " + "</span>" + 'Region: ' + "<span class='zoneRegion'>"+ getRegion + "</span>" + ", " + 'Country: ' + "<span class='zoneRegion'>" + getCountry + "." + "</span>" + "</p>");

          $(cityInsights).append(footerTxt)
          $(footerTxt).append(zoneInfo)

        });

      clrButton()
      removeBtns()

    });

  }).catch(function (err) {
    console.log(err);
    alert("City name not recognised");
  });

}     
  
function renderButtons(city) {

  var cityEntry = $("<button class='cityButtons'>")
  .addClass("cityBtn")
  .text(city);
  var deleteIcon = $("<i class='far fa-trash-alt'></i>");

  cityEntry.attr("data-city", cityRecall[j]);
  cityEntry.append(deleteIcon)
  btnGrp.prepend(cityEntry);

};

var clearBtn = $("<button>")
  .addClass("clrBtn")
  .text("Clear");
  $(createBtn).append(clearBtn);
    
function clrButton() {
  if (cityRecall.length >= 5 ) {
    clearBtn.show();
  } else {
    clearBtn.hide();
  }
}

// Function to limit number of buttons created to 8.
function removeBtns() {
  if (cityRecall.length > 8) {
    btnGrp.children('button').eq(8).remove();
    cityRecall.splice(0, 1);
    localStorage.setItem("cityList", JSON.stringify(cityRecall));
  } else if (cityRecall.length > 10) {
    alert("History is full, please delete buttons or reset")
    location.reload();
  } else {
    // console.log(cityRecall.length);
  }
}

// Search button on click event to start search
$("#search-button").on("click", function(event) {
  event.preventDefault();

  var citySearch = document.querySelector("#search-input").value.toUpperCase().trim();
  
  // If statement to regulate search from enpty strings for eg.
  if (citySearch.value = "" || !citySearch) {
    alert("Please enter a city");

  } else if (citySearch.length && !cityRecall.includes(citySearch)) {

    wResults(citySearch)

  } else {
    alert("City name " + citySearch + " is already stored");
  }

  clrButton()
  removeBtns()

});

// Click event to generate buttons.
$(document).on("click", ".cityBtn", function(event) {
  event.preventDefault();
  let citySearch = $(this).text();
  $(header).addClass("weather-header");
  $(".mainDiv").addClass("wDboard");
  // console.log(citySearch); 
  wResults(citySearch);
});

// Click event for delete icon to remove individual buttons.
$(document).on("click", ".fa-trash-alt", function(event) {
  event.preventDefault();
  event.stopPropagation();
  var btnName = $(this).parent('button').attr("data-city");
  $(this).parent('button').remove();
  const cityIndex = cityRecall.indexOf(btnName);
  cityRecall.splice(cityIndex,1);
  localStorage.setItem("cityList", JSON.stringify(cityRecall));

})     

// Click event to remove all buttons.
$(document).on("click", ".clrBtn", function(event) {
  event.preventDefault();

  // console.log("clearBtn Clicked"); 
 
  btnGrp.empty();
  createBtn.empty();
  cityTemp = []
  localStorage.removeItem("cityList");
  localStorage.removeItem("citySave");
  location.reload()
});

clrButton()
 
