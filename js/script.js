var dailyCast = $("#today");
var weeklyCast = $("#forecast");
var cityInsights = $("#moreInfo");
var createBtn = $("#clrButton")
var header = $("header");
var btnGrp = $("#history");
var container = document.getElementsByClassName(".row");

console.log("This is Container: " + container.text);


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

// var cityTemp = []
var citySave = JSON.parse(localStorage.getItem("citySave")) || [];
var cityRecall = JSON.parse(localStorage.getItem("cityList")) || [];
console.log(cityRecall);
for (var j = 0; j < cityRecall.length; j++) {
  renderButtons(cityRecall[j]);
  
}

$("#search-button").on("click", function(event) {
  event.preventDefault();

  // citySearch = $(this).attr("data-city");

  var citySearch = document.querySelector("#search-input").value.toUpperCase().trim();
  

if (citySearch.value = "" || !citySearch) {
  alert("Please enter a city");

} else if (citySearch.length && !cityRecall.includes(citySearch)) {

  citySave.push(citySearch);
  cityRecall = citySave.slice(-8);
  localStorage.setItem("cityList", JSON.stringify(cityRecall));
  localStorage.setItem("citySave", JSON.stringify(citySave));
  $(header).addClass("weather-header");
  $(".mainDiv").addClass("wDboard");
  renderButtons(citySearch);
  wResults(citySearch)

} else {
  alert("City name " + citySearch + " is already stored");
}

  console.log(citySearch);

  // switch(clearBtn) {
  //   case cityRecall.length <= 5:
  //     clearBtn.hide();
  //     break;
  //   case cityRecall.length = 0:
  //     clearBtn.text("List Empty");
  //     break;
  // }

  clrButton()
  removeBtns()

  // } else if (cityRecall.length = 0) {
  //   clearBtn.text("List Empty");
  // } else {
  //   clearBtn.text("clear");
  // }
      

});

var apiKey = "900fdcffb7a2a35ad536a57ccbc492e5";

function wResults (searchInput) {

  $(dailyCast).empty();
  $(weeklyCast).empty();
  $(cityInsights).empty();
      
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

    // if (searchInput !== cityName || searchInput.includes(citySearch)) {
    //   alert("City name not recognised");
    // }

    var searchURL = "https://api.openweathermap.org/data/2.5/forecast?lat=" + latitude + "&lon=" + longitude + "&appid=" + apiKey + "&units=metric";


    $.ajax({
      url: searchURL,
      method: "GET"
    }).then(function(data) {
  
      console.log(data);

      
      var dailyTable = $('<ul>').addClass("dailyInfo");
      var dailySymbol = $('<ul>').addClass("dailySymbol");
      var dtShow = $('<ul>').addClass("dateTime");

      let cityTitle = $("<h2>" + data.city.name + " - " + data.city.country + "</h2>");
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


      var info = $("<h4 id='info'>" + "Your local time is:" + "</h4>");
      var time = $("<h3 id='time'>");
      var date = $("<h3 id='date'>" + currentDate + "</h3>");

      $(dtShow).append(info, time, date);


      console.log(searchInput);
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

      $.ajax({
        url: timeURL,
        method: "GET"
      }).then(function(timeZone) {

        console.log(timeZone);

        var getTime = timeZone.timestamp;
        var getCity = timeZone.cityName;
        var getRegion = timeZone.regionName;
        var getCountry = timeZone.countryName;

        console.log(getTime);
        console.log(getCity);
        console.log(getRegion);
        console.log(getCountry);

        // const zoneDate = new Date(getTime * 1000).toLocaleDateString('en-GB');
        // var zoneTime = new Date(getTime * 1000).toLocaleTimeString('en-GB');

        var zoneDate = moment.unix(getTime).format("dddd Do MMM YYYY");
        var zoneTime = moment.unix(getTime).format("LTS");

        // console.log(zoneDate);
        // console.log(zoneTime);

        var footerTxt = $("<div id='insights'>"); 
        var zoneInfo = $("<p id='zoneTxt'>" + "It is " + "<span id='zoneDate'>" + zoneDate + ", " + "</span>" + "<span id='zoneTime'>" + zoneTime + "</span>" + " now in " + "<span class='zoneRegion'> " + getCity + " - " + "</span>" + 'Region: ' + "<span class='zoneRegion'>"+ getRegion + "</span>" + ", " + 'Country: ' + "<span class='zoneRegion'>" + getCountry + "." + "</span>" + "</p>");

        $(cityInsights).append(footerTxt)
        $(footerTxt).append(zoneInfo)

      });
      

      // citySearch.value = ""
      console.log("-------1------");
      clrButton()
      removeBtns()

    });

    
  });
    

}

// wResults()
console.log("-------2------");

// var btnGrp = $("<div id='cityButtons'>");
// $("#history").append(btnGrp);
        
  
function renderButtons(city) {
  // btnGrp.empty()
  // for (var j = 0; j < 5; j++) {
    var cityEntry = $("<button class='cityButtons'>")
    .addClass("cityBtn")
    .text(city);
    var deleteIcon = $("<i class='far fa-trash-alt'></i>");
    // $(cityEntry).on("click", wResults);
    cityEntry.attr("data-city", cityRecall[j]);
    cityEntry.append(deleteIcon)
    btnGrp.prepend(cityEntry);

    // if (cityRecall.length > 2) {
    //   deleteIcon.show();   
    // } else {
    //   deleteIcon.hide();
    // }
};


$(document).on("click", ".fa-trash-alt", function(event) {
  event.preventDefault();
  btnName = $(this).parent('button').attr("data-city");
  var deleteIcon = $(event.target);
  deleteIcon.parent('button').remove();
  const index01 = cityRecall.indexOf(btnName);
  const index02 = citySave.indexOf(btnName);
  console.log(btnName);
  console.log(index01);
  console.log(index02);
  citySave.splice(index02, 1); 
  cityRecall.splice(index01, 1);
  localStorage.setItem("cityList", JSON.stringify(cityRecall));
  localStorage.setItem("citySave", JSON.stringify(citySave));
})      
    


$(document).on("click", ".cityBtn", function(event) {
  event.preventDefault();
  // wResults(event);
  let citySearch = $(this).text();
  $(header).addClass("weather-header");
  $(".mainDiv").addClass("wDboard");
  console.log(citySearch); 
  // console.log(this);  
  wResults(citySearch);
});

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

function removeBtns() {
  if (citySave.length > 8) {
    btnGrp.children('button').eq(8).remove();
  } else if (citySave.length > 16) {
    alert("History is full, please delete buttons or reset")
    // cityTemp = citySave.slice(-8)
    location.reload();
  } else {
    console.log(citySave.length);
  }
}

  

//   //   const newButton = clearBtn.hide()
//   //   switch(newButton) {
//   //   case cityRecall.length <= 5:
//   //     clearBtn.hide();
//   //     break;
//   //   case cityRecall.length >= 6:
//   //     $(createBtn).append(clearBtn);
//   //     break;
//   // }
//   // }
// };


$(document).on("click", ".clrBtn", function(event) {
  event.preventDefault();
  // wResults(event);
  // let citySearch = $(this).html();

  console.log("clearBtn Clicked"); 
  // console.log(this);  
  btnGrp.empty();
  createBtn.empty();
  cityTemp = []
  localStorage.removeItem("cityList");
  localStorage.removeItem("citySave");
  location.reload()
});

// const apiMonitor = new XMLHttpRequest();
// apiMonitor.onreadystatechange = function() {
//   if (apiMonitor.status == 404 || apiMonitor.status == 401) {
//       alert("City name not recognised");
//       return false;
//   }
// }


console.log(cityRecall.length)

clrButton()
 
