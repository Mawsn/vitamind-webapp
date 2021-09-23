let db = firebase.firestore();
//Gets user's location to get weather data
function getLocation(){
  if (navigator.geolocation){
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    console.log("Geolocation not supported by browser")
  }
}

function showPosition(position){ //Get user latitude and longitude to find weather location
  var lat = position.coords.latitude;
  var lon = position.coords.longitude;
  var link = "https://api.openweathermap.org/data/2.5/onecall?lat="+lat+"&lon="+lon+"&exclude=hourly&units=metric&appid=1c62774a9150725e072ade4d16c1040f"; //Requires api key
  xhttp.open("GET", link, true); //Gets data from weather API link
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
  /*var displayDiv = document.getElementById("weather_display");
  displayDiv.innerHTML = "XMLHttpRequest failed: status " + xhttp.status;
    displayDiv.innerHTML += ": <b>To see preview uncomment line 23-24 in weather.js</b>"; */
    console.log("An error occured while trying to get weather data.");
    console.log("XMLHttpRequest failed: status " + xhttp.status);
}

function handleStatusSuccess(xhttp){
  var jsonText = xhttp.responseText; //save requested data
  //process response
  var weatherObj = JSON.parse(jsonText); //Convert received data into JSON format

  displayWeather(weatherObj); //Calls function which presents weather in a table
}

function displayWeather(weatherObj){
  var date = new Date(); //Gets today's date
  var day = date.getDay(); //Gets the day of the week
  var dayArray = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

  var displayDiv = document.getElementById("weather_display");
  displayDiv.style.textAlign = "center";

    if ($(window).width() < 576){ //If the window width is small, system will not present as many days in the table
        var row = displayDiv.insertRow(0);

        for (var i = 0; i < 4; i++){ //Print each day of the week in the top row of the table
            var cell = row.insertCell(i);
            cell.innerHTML = "<b>" + dayArray[day++] + "</b>";
            if (day >= 7){ //if day is increased past 7 resets back to 0 to print start of next week
              day = 0;
            }
        }

        row = displayDiv.insertRow(1);
        for (var i = 0; i < 4; i++){ //Prints the weather image associated with the weather in the next row
            var cell = row.insertCell(i);
             // weather_icons/01d.png
            cell.innerHTML = "<img src='assets/img/weather_icons/"+weatherObj.daily[i].weather[0].icon+".png' draggable='false' class='weather_img'>";
        }

        row = displayDiv.insertRow(2);
        for (var i = 0; i < 4; i++){ //Adds new row with information on minimum and maximum temperatures
            var cell = row.insertCell(i);
            cell.innerHTML = weatherObj.daily[i].temp.min.toFixed(1) + "\t<b>" + weatherObj.daily[i].temp.max.toFixed(1) +"</b>";
        }
        row = displayDiv.insertRow(3);
        for (var i = 0; i < 4; i++){ //Adds row and data on ultra violet index levels
            var cell = row.insertCell(i);
            cell.innerHTML = "UVI: " + weatherObj.daily[i].uvi;
        }
    } else { //If normal display size
        var row = displayDiv.insertRow(0);

        for (var i = 0; i < 7; i++){ //Print each day of the week in the top row of the table
            var cell = row.insertCell(i);
            cell.innerHTML = "<b>" + dayArray[day++] + "</b>";
            if (day >= 7){ //if day is increased past 7 resets back to 0 to print start of next week
              day = 0;
            }
        }

        row = displayDiv.insertRow(1);
        for (var i = 0; i < 7; i++){ //Prints the weather image associated with the weather in the next row
            var cell = row.insertCell(i);
             // weather_icons/01d.png
            cell.innerHTML = "<img src='assets/img/weather_icons/"+weatherObj.daily[i].weather[0].icon+".png' draggable='false' class='weather_img'>";
        }

        row = displayDiv.insertRow(2);
        for (var i = 0; i < 7; i++){ //Adds new row with information on minimum and maximum temperatures
            var cell = row.insertCell(i);
            cell.innerHTML = weatherObj.daily[i].temp.min.toFixed(1) + "\t<b>" + weatherObj.daily[i].temp.max.toFixed(1) +"</b>";
        }
        row = displayDiv.insertRow(3);
        for (var i = 0; i < 7; i++){ //Adds row and data on ultra violet index levels
            var cell = row.insertCell(i);
            cell.innerHTML = "UVI: " + weatherObj.daily[i].uvi;
        }
    }

}

//If user is logged in and has previous result data, will print that
firebase.auth().onAuthStateChanged((user) => {
    if (user !== null){
        var userRef = db.collection("users").doc(user.uid);
        userRef.get().then((doc) => {
           if (doc.exists){ //If previous data is found, put data into table
               var userData = doc.data();
               var prevResult = userData["results"][userData["results"].length-1];
               var date = prevResult["date"].toDate();

               document.getElementById("prevDate").innerHTML = date.getDate()+"/"+(date.getMonth()+1)+"/"+date.getFullYear();;

               document.getElementById("prevGrade").innerHTML = prevResult["letterGrade"];

               document.getElementById("prevLikelyhood").innerHTML = prevResult["deficiencyChance"];

               document.getElementById("prevDietGrade").innerHTML = prevResult["dietGrade"];

               if (prevResult["sunGrade"] == null){ //if previous result didn't include sun data, delete relevant rows
                    var resultsTable = document.getElementById("prevTable");
                    resultsTable.deleteRow(6);
                    resultsTable.deleteRow(5);
               } else {
                   document.getElementById("prevSunGrade").innerHTML = prevResult["sunGrade"];
                   document.getElementById("prevRequiredMinutes").innerHTML = prevResult["minutesRequired"];
               }

           } else { //Otherwise if not found, user does not have previous results
               document.getElementById("prevTable").remove;
               document.getElementById("homeResultContainer").innerHTML = "There is no current status for us to display.";
           }
        }).catch((error) => { //If an error occured while trying to get the data
            console.log("Error getting document: ", error);
        });
    } else { //If the user is not logged in
        console.log("Not logged in");
    }
});
