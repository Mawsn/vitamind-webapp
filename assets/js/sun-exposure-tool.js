function goBack(){
    window.history.back();
}

//window.onload=getSeason();
//var lat;
//function getLocation(){}
/*
function showPosition(position){
  lat = position.coords.latitude;
} */
//var lat;
function detectLocation(){
    if (navigator.geolocation){
        navigator.geolocation.getCurrentPosition((position) => {
          var lat = position.coords.latitude;
          if (lat <= -26.4013 && lat >= -30.0888){ //Brisbane
              console.log("Brisbane");
              sessionStorage.setItem("exposureChart", "winterBrisbaneChart");
              sessionStorage.setItem("insufficientUV", false);
              window.location.assign('tool-sun-exposure.html');
          } else if (lat < -30.0888 && lat >= -34.92){ //Sydney Perth
              console.log("Sydney");
              sessionStorage.setItem("exposureChart", "winterSydneyChart");
              sessionStorage.setItem("insufficientUV", false);
              window.location.assign('tool-sun-exposure.html');
          } else if (lat < -34.92) { //Not sufficient sunlight, only use oral intake
              //set some variable
              //move to results screen
              console.log("UV levels too low, sunlight not sufficient");
              console.log("Setting to summer for testing purposes: sun-exposure-tools.js: 38-39");
              sessionStorage.setItem("insufficientUV", true);
              window.location.assign("result-breakdown.html");
              //sessionStorage.setItem("exposureChart", "summerChart");
          }
        }, (error) => {
            switch(error.code){
                case error.PERMISSION_DENIED:
                    alert("Location request was denied. Please use one of the general locations below.");
                    break;
                case error.POSITION_UNAVAILABLE:
                    alert("There was an error detecting your location. Please use one of the general locations below.");
                    break;
                case error.TIMEOUT:
                    alert("There was an error detecting your location. Please use one of the general locations below.");
                    console.log("Geolocation timeout");
                    break;
                case error.UNKNOWN_ERROR:
                    alert("There was an error detecting your location. Please use one of the general locations below.");
                    break;
            }
        });

    } else {
        alert("Geolocation not supported by browser. Please use one of the general locations below.");
    }
}

function generalLocation(lat){
    if (lat <= -26.4013 && lat >= -30.0888){ //Brisbane
        console.log("Brisbane");
        sessionStorage.setItem("exposureChart", "winterBrisbaneChart");
        sessionStorage.setItem("insufficientUV", false);
        window.location.assign('tool-sun-exposure.html');
    } else if (lat < -30.0888 && lat >= -34.92){ //Sydney Perth
        console.log("Sydney");
        sessionStorage.setItem("exposureChart", "winterSydneyChart");
        sessionStorage.setItem("insufficientUV", false);
        window.location.assign('tool-sun-exposure.html');
    } else if (lat < -34.92) { //Not sufficient sunlight, only use oral intake
        //set some variable
        //move to results screen
        console.log("UV levels too low, sunlight not sufficient");
        console.log("Setting to summer for testing purposes: sun-exposure-tools.js: 38-39");
        sessionStorage.setItem("insufficientUV", true);
        window.location.assign("result-breakdown.html");
        //sessionStorage.setItem("exposureChart", "summerChart");
    }
}


function getSeason(){
    var date = new Date();
    var month = date.getMonth();

    if ((month >= 8 && month <= 11) || (month == 0 || month == 1)){
        console.log("Summer");
        sessionStorage.setItem("exposureChart", "summerChart");
        sessionStorage.setItem("insufficientUV", false);
        window.location.assign('tool-sun-exposure.html');
    } else {
        window.location.assign("tool-location.html");
        /*
        if (window.location.pathname == '/tool-exposure-minutes.html'){
            document.getElementById("mornLabel").remove();//.style.visibility = "hidden";
            document.getElementById("afternoonLabel").remove();//.style.visibility = "hidden";
            document.getElementById("morningMinutes").remove();//.style.visibility = "hidden";
            document.getElementById("afternoonMinutes").remove();//.style.visibility = "hidden";
        }
        if (navigator.geolocation){
            navigator.geolocation.getCurrentPosition((position) => {
              var lat = position.coords.latitude;
              if (lat <= -26.4013 && lat >= -30.0888){ //Brisbane
                  console.log("Brisbane");
                  sessionStorage.setItem("exposureChart", "winterBrisbaneChart");
                  sessionStorage.setItem("insufficientUV", false);
              } else if (lat < -30.0888 && lat >= -34.92){ //Sydney Perth
                  console.log("Sydney");
                  sessionStorage.setItem("exposureChart", "winterSydneyChart");
                  sessionStorage.setItem("insufficientUV", false);
              } else if (lat < -34.92) { //Not sufficient sunlight, only use oral intake
                  //set some variable
                  //move to results screen
                  console.log("UV levels too low, sunlight not sufficient");
                  console.log("Setting to summer for testing purposes: sun-exposure-tools.js: 38-39");
                  sessionStorage.setItem("insufficientUV", true);
                  window.location.assign("result-breakdown.html");
                  //sessionStorage.setItem("exposureChart", "summerChart");
              }
            }, (error) => {
                var lat;
                switch(error.code){
                    case error.PERMISSION_DENIED:
                        console.log("Geolocation: No permission");
                        break;
                    case error.POSITION_UNAVAILABLE:
                        console.log("Geolocation: couldnt get position");
                        break;
                    case error.TIMEOUT:
                        //x.innerHTML = "The request to get user location timed out."
                        console.log("Geolocation timeout");
                        break;
                    case error.UNKNOWN_ERROR:
                        console.log("geolocation unknown error");
                        //x.innerHTML = "An unknown error occurred."
                        break;
                }
                
                
                if (lat <= -26.4013 && lat >= -30.0888){ //Brisbane
                  console.log("Brisbane");
                  sessionStorage.setItem("exposureChart", "winterBrisbaneChart");
                  sessionStorage.setItem("insufficientUV", false);
              } else if (lat < -30.0888 && lat >= -34.92){ //Sydney Perth
                  console.log("Sydney");
                  sessionStorage.setItem("exposureChart", "winterSydneyChart");
                  sessionStorage.setItem("insufficientUV", false);
              } else if (lat < -34.92) { //Not sufficient sunlight, only use oral intake
                  //set some variable
                  //move to results screen
                  console.log("UV levels too low, sunlight not sufficient");
                  console.log("Setting to summer for testing purposes: sun-exposure-tools.js: 38-39");
                  sessionStorage.setItem("insufficientUV", true);
                  window.location.assign("result-breakdown.html");
                  //sessionStorage.setItem("exposureChart", "summerChart");
              }
            });

        } else {
            console.log("Geolocation not supported by browser")
        } */
    } 

}

function headFunction(){
    var checkbox = document.getElementById("headForm");
    if (checkbox.checked == true){
        checkbox.checked = false;
    } else {
        checkbox.checked = true;
    }

    var headImg = document.getElementById("headImg");
    if (headImg.style.visibility == 'hidden'){
        headImg.style.visibility = 'visible';
    } else {
        headImg.style.visibility = 'hidden';
    }
}
function torsoFunction(){
    var armImg = document.getElementById("longShirtImg");
    var upArmImg = document.getElementById("shirtImg");
    if (armImg.style.visibility == 'visible'){
        armFunction();
        return;
    } else if (upArmImg.style.visibility == 'visible'){
        upArmFunction();
        return;
    }

    var checkbox = document.getElementById("torsoForm");
    if (checkbox.checked == true){
        checkbox.checked = false;
    } else {
        checkbox.checked = true;
    }
    var torsoImg = document.getElementById("singletImg");
    if (torsoImg.style.visibility == 'hidden'){
        torsoImg.style.visibility = 'visible';
    } else {
        torsoImg.style.visibility = 'hidden';
    }
}
function upArmFunction(){
    var armImg = document.getElementById("longShirtImg");
    if (armImg.style.visibility == 'visible'){
        armFunction();
        return;
    }

    var checkbox = document.getElementById("upperArmForm");
    var checkbox2 = document.getElementById("torsoForm");
    if (checkbox.checked == true){
        checkbox.checked = false;
        checkbox2.checked = false;
    } else {
        checkbox.checked = true;
        checkbox2.checked = true;
    }
    var upArmImg = document.getElementById("shirtImg");
    var torsoImg = document.getElementById("singletImg");
    if (upArmImg.style.visibility == 'hidden'){
        torsoImg.style.visibility = 'hidden';
        upArmImg.style.visibility = 'visible';
    } else {
        upArmImg.style.visibility = 'hidden';
    }
}
function armFunction(){
    var checkbox = document.getElementById("lowerArmForm");
    var checkbox2 = document.getElementById("upperArmForm");
    var checkbox3 = document.getElementById("torsoForm");
    if (checkbox.checked == true){
        checkbox.checked = false;
        checkbox2.checked = false;
        checkbox3.checked = false;
    } else {
        checkbox.checked = true;
        checkbox2.checked = true;
        checkbox3.checked = true;
    }
    var armImg = document.getElementById("longShirtImg");
    var upArmImg = document.getElementById("shirtImg");
    var torsoImg = document.getElementById("singletImg");
    if (armImg.style.visibility == 'hidden'){
        upArmImg.style.visibility = 'hidden';
        torsoImg.style.visibility = 'hidden';
        armImg.style.visibility = 'visible';
    } else {
        armImg.style.visibility = 'hidden';
    }
}
function handsFunction(){
    var checkbox = document.getElementById("handsForm");
    if (checkbox.checked == true){
        checkbox.checked = false;
    } else {
        checkbox.checked = true;
    }

    var handsImg = document.getElementById("handsImg");
    if (handsImg.style.visibility == 'hidden'){
        handsImg.style.visibility = 'visible';
    } else {
        handsImg.style.visibility = 'hidden';
    }
}
function legsFunction(){
    var checkbox = document.getElementById("legsForm");
    if (checkbox.checked == true){
        checkbox.checked = false;
    } else {
        checkbox.checked = true;
    }
    var legsImg = document.getElementById("pantsImg");
    if (legsImg.style.visibility == 'hidden'){
        legsImg.style.visibility = 'visible';
    } else {
        legsImg.style.visibility = 'hidden';
    }
}

function setSessionData(){
    var totalPercentage = 0;

    if (!document.getElementById("headForm").checked){
      totalPercentage += 5;
    }
    if (!document.getElementById("handsForm").checked){
      totalPercentage += 5;
    }
    if (!document.getElementById("lowerArmForm").checked){
      totalPercentage += 5;
    }
    if (!document.getElementById("upperArmForm").checked){
      totalPercentage += 5;
    }
    if (!document.getElementById("legsForm").checked){
      totalPercentage += 15;
    }
    if (!document.getElementById("torsoForm").checked){
      totalPercentage += 25;
    }
    //Set Percentage Data
    sessionStorage.setItem("skinExposurePerc", totalPercentage);
}

function setMinutesData(){
    var inputMinutes = 0;
    var inputType = sessionStorage.getItem("exposure-measurement");
    if (chartSelect == "summerChart"){
        var morn = Number(document.getElementById("morningMinutes").value);
        var lunch = Number(document.getElementById("lunchMinutes").value);
        var afternoon = Number(document.getElementById("afternoonMinutes").value);
        inputMinutes = morn + lunch + afternoon;

    } else {
        inputMinutes = Number(document.getElementById("lunchMinutes").value);
    }
    if (inputType == "weekly"){
        inputMinutes = Math.round(inputMinutes / 7); //Divided into daily units
    }
    sessionStorage.setItem("inputMinutes", inputMinutes);

}
