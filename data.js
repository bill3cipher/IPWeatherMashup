

  getData();


function getData() {

  var baseURL = "http://ipinfo.io";
  var request = "/json";

  $.ajax({
    url: baseURL + request,
    dataType: "jsonp",

    success: function(response) {

      $("#location").text("");
      $("#location").append("<i></i>");
      $("#location i").addClass("glyphicon glyphicon-globe");
//      $("#location").append("My Location : ");
      $("#location").append(response.city + ", " + response.region + ", " + response.country);

      $('#myip').text("");
      $("#myip").append("<i></i>");
      $("#myip i").addClass("glyphicon glyphicon-map-marker");
      $('#myip').append(response.ip);

      var locationData = response.loc.split(",");
      getWeatherInfo(locationData[0], locationData[1]);

    },
    error: function(xhr, status, error) {
      $("#location").text("");
      $("#weather").text("");
      $("myip").text("");
      return
    }
  });
}


function getWeatherInfo(longitude, latitude) {


  var baseURL = "http://api.openweathermap.org/data/2.5";
  var request = "/weather?lat=" + longitude + "&lon=" + latitude;
  var API_Key = "&APPID=2b1d1963ae32a943dadf43d12205ce70";


  $.ajax({
    url: baseURL + request + API_Key,
    dataType: "jsonp",


    success: function(response) {

      $("#temp").text("");
      $("#temp").append("<i></i>"+'&nbsp');
      $("#temp i").addClass("wi wi-thermometer");
      $("#temp").append(convertTemperature(response.main.temp, "C"));
      $("#temp").append("<i></i>"+'&nbsp');
      $("#temp i").addClass("wi wi-celsius");


      changeWeatherIcon(response.weather[0].main);
      $("#weather").append(titleCase(response.weather[0].description));
    },

    error: function(xhr, status, error) {
      $("#weather").text("");
    }
  });
}

function convertTemperature(tempRaw, unit) {
  if (unit == "C")
    return (tempRaw - 273.15).toFixed(1).toString();
  else (unit == "F")
    return ((tempRaw - 273.15) * 9 / 5 + 32).toFixed(1).toString() + "°F";
}


function changeWeatherIcon(weatherType) {

  weatherType = weatherType.toLowerCase();
  $("#weather").text("");
  $("#weather").append("<i></i>");

  if (weatherType.indexOf("clouds") != -1) {
    $("#weather i").addClass("wi wi-cloudy");
  } else if (weatherType.indexOf("rain") != -1) {
    $("#weather i").addClass("wi wi-rain");
  } else if (weatherType.indexOf("thunderstorm") != -1) {
    $("#weather i").addClass("wi wi-thunderstorm");
  } else if (weatherType.indexOf("snow") != -1) {
    $("#weather i").addClass("wi wi-snow");
  } else if (weatherType.indexOf("mist") != -1) {
    $("#weather i").addClass("wi wi-smoke");
  } else {
    $("#weather i").addClass("wi wi-day-sunny");
  }

}

function titleCase(str) {

  var array = str.split(" ");

  for (var i = 0; i < array.length; i++) {

    var temp_array = array[i].split('');
    temp_array[0] = temp_array[0].toUpperCase();

    for (var j = 1; j < temp_array.length; j++)
      temp_array[j] = temp_array[j].toLowerCase();

    array[i] = temp_array.join('');
  }

  return array.join(' ');
}
