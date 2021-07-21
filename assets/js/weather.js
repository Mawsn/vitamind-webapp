function getLocation(){
  if (navigator.geolocation){
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    console.log("Geolocation not supported by browser")
  }
}

var lat;
var lon;
function showPosition(position){
  //x.innerHTML = "Latitude: " + position.coords.latitude + "Longitiude: " + position.coords.longitude;
  lat = position.coords.latitude;
  lon = position.coords.longitude;
  console.log("1:"+lat);
  console.log("1:"+lon);
}

var xhttp = new XMLHttpRequest();

xhttp.onreadystatechange = function(){
  readyStateChangeHandler(xhttp);
}

/*lat = -34.4250728;
lon = 150.89314939999997; */ //uncomment this if you would like a preview of weather chart
getLocation();
console.log("2:"+lat);
console.log("2:"+lon);
var link = "https://api.openweathermap.org/data/2.5/onecall?lat="+lat+"&lon="+lon+"&exclude=hourly&units=metric&appid=1c62774a9150725e072ade4d16c1040f"; //Requires api key
xhttp.open("GET", link, true);
xhttp.send();

function readyStateChangeHandler(xhttp){
  if (xhttp.readyState == 4) { //ready
    if (xhttp.status == 200) { //status ok
      handleStatusSuccess(xhttp);
    } else { //status not ok
      handleStatusFailure(xhttp);
    }
  }
}

function handleStatusFailure(xhttp){
  var displayDiv = document.getElementById("weather_display");
  displayDiv.innerHTML = "XMLHttpRequest failed: status " + xhttp.status;
    displayDiv.innerHTML += ": <b>To see preview uncomment line 23-24 in weather.js</b>";
}

function handleStatusSuccess(xhttp){
  var jsonText = xhttp.responseText;
  //process response
  var weatherObj = JSON.parse(jsonText);

  displayWeather(weatherObj);
}

function displayWeather(weatherObj){
  console.log("Temp: " + weatherObj.current.temp);
  console.log("UV: " + weatherObj.daily[0].uvi);

  var date = new Date();
  var day = date.getDay();
  var dayArray = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

  var displayDiv = document.getElementById("weather_display");
  displayDiv.style.textAlign = "center";
  var sr = "http://openweathermap.org/img/wn/"+weatherObj.daily[0].weather[0].icon+"@2x.png";

  var row = displayDiv.insertRow(0);

  for (var i = 0; i < 7; i++){
    var cell = row.insertCell(i);
    cell.innerHTML = "<b>" + dayArray[day++] + "</b>";
    if (day >= 7){
      day = 0;
    }
  }

  row = displayDiv.insertRow(1);
  for (var i = 0; i < 7; i++){
    var cell = row.insertCell(i);
    cell.innerHTML = "<img src='http://openweathermap.org/img/wn/"+weatherObj.daily[i].weather[0].icon+"@2x.png' draggable='false'>";
  }

  row = displayDiv.insertRow(2);
  for (var i = 0; i < 7; i++){
    var cell = row.insertCell(i);
    cell.innerHTML = weatherObj.daily[i].temp.min.toFixed(1) + "\t<b>" + weatherObj.daily[i].temp.max.toFixed(1) +"</b>";
  }
  row = displayDiv.insertRow(3);
  for (var i = 0; i < 7; i++){
    var cell = row.insertCell(i);
    cell.innerHTML = "UVI: " + weatherObj.daily[i].uvi;
  }

  //displayDiv.innerHTML = "<h3>"+weatherObj.current.temp+"</h3>";
  //displayDiv.innerHTML += "<h5>"+weatherObj.daily[0].uvi+"</h5>";
}
