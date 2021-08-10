function getLocation(){
  if (navigator.geolocation){
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    console.log("Geolocation not supported by browser")
  }
}

function showPosition(position){
  var lat = position.coords.latitude;
  var lon = position.coords.longitude;
  var link = "https://api.openweathermap.org/data/2.5/onecall?lat="+lat+"&lon="+lon+"&exclude=hourly&units=metric&appid=1c62774a9150725e072ade4d16c1040f"; //Requires api key
  xhttp.open("GET", link, true);
  xhttp.send();
}

var xhttp = new XMLHttpRequest();

xhttp.onreadystatechange = function(){
  readyStateChangeHandler(xhttp);
}

getLocation();

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
    cell.innerHTML = "<img src='http://openweathermap.org/img/wn/"+weatherObj.daily[i].weather[0].icon+"@2x.png' draggable='false' class='weather_img'>";
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

firebase.auth().onAuthStateChanged((user) =>{
    if (user !== null){
        var userRef = db.collection("users").doc(user.uid);
        userRef.get().then((doc) => {
           if (doc.exists){
               console.log("User doc exists");
               var userData = doc.data();
               var prevResult = userData["results"][userData["results"].length-1];
               console.log(prevResult);
               var date = prevResult["date"].toDate();

               document.getElementById("prevDate").innerHTML = date.getDate()+"/"+(date.getMonth()+1)+"/"+date.getFullYear();;
               
               document.getElementById("prevGrade").innerHTML = prevResult["letterGrade"];
               
               document.getElementById("prevLikelyhood").innerHTML = prevResult["deficiencyChance"];
               
               document.getElementById("prevDietGrade").innerHTML = prevResult["dietGrade"];
               
               //document.getElementById("prevSunGrade").innerHTML = prevResult["sunGrade"];
               if (prevResult["sunGrade"] == null){
                    var resultsTable = document.getElementById("prevTable");
                    resultsTable.deleteRow(5);
                    resultsTable.deleteRow(7);
               } else {
                   document.getElementById("prevSunGrade").innerHTML = prevResult["sunGrade"];
                   document.getElementById("prevRequiredMinutes").innerHTML = prevResult["minutesRequired"];
               }
               
               document.getElementById("prevOralIntake").innerHTML = prevResult["dietIntake"]+"ug";
               
               document.getElementById("prevSuppIntake").innerHTML = prevResult["suppIntake"]+"ug";
               
               //document.getElementById("prevRequiredMinutes").innerHTML = prevResult["minutesRequired"];
           } else {
               console.log("No previous history");
               //document.getElementById("prevResultsHeading").remove();
               document.getElementById("prevTable").remove;
               document.getElementById("homeResultContainer").innerHTML = "There is no current status for us to display.";
               
           }
        }).catch((error) => {
            console.log("Error getting document: ", error);
        });
    } else {
        console.log("Not logged in");
    }
});