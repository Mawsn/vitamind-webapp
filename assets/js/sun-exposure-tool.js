
//Used to find latitude in winter months
//Called if user chooses to use current location
function detectLocation(){
    if (navigator.geolocation){
        navigator.geolocation.getCurrentPosition((position) => { //If position was successfully retrieved
          var lat = position.coords.latitude;
          if (lat <= -12 && lat >= -30.0888){ //Sets weather chart to Brisbane
              sessionStorage.setItem("exposureChart", "winterBrisbaneChart");
              sessionStorage.setItem("insufficientUV", false);
              window.location.assign('tool-sun-exposure.html');
          } else if (lat < -30.0888 && lat >= -34.92){ //Sets weather chart to Sydney / Perth
              sessionStorage.setItem("exposureChart", "winterSydneyChart");
              sessionStorage.setItem("insufficientUV", false);
              window.location.assign('tool-sun-exposure.html');
          } else if (lat < -34.92) { //Not sufficient sunlight, only use oral intake
              sessionStorage.setItem("insufficientUV", true);
              window.location.assign("result-breakdown.html");
          }
        }, (error) => { //Error occured while trying to get location
            switch(error.code){ //Alert the user of the error
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

    } else { //If Geolocation is not supported by the browser the user is in
        alert("Geolocation not supported by browser. Please use one of the general locations below.");
    }
}

//If user selects a general location
function generalLocation(lat){ 
    if (lat <= -12 && lat >= -30.0888){ //Sets weather chart to Brisbane
        sessionStorage.setItem("exposureChart", "winterBrisbaneChart");
        sessionStorage.setItem("insufficientUV", false);
        window.location.assign('tool-sun-exposure.html');
    } else if (lat < -30.0888 && lat >= -34.92){ //Sets weather chart to Sydney / Perth
        sessionStorage.setItem("exposureChart", "winterSydneyChart");
        sessionStorage.setItem("insufficientUV", false);
        window.location.assign('tool-sun-exposure.html');
    } else if (lat < -34.92) { //Not sufficient sunlight, only use oral intake
        sessionStorage.setItem("insufficientUV", true);
        window.location.assign("result-breakdown.html");
    }
}

//Removes irrelevant inputs if not required
function displayedTimes(){
    var season = sessionStorage.getItem("exposureChart");
    //If not summer
    if (season != "summerChart"){ //Only 11AM - 1PM input needs to be shown
        document.getElementById("mornLabel").remove();
        document.getElementById("afternoonLabel").remove();
        document.getElementById("morningMinutes").remove();
        document.getElementById("afternoonMinutes").remove();
    }
}

//Called if the head on the figure is clicked 
function headFunction(){
    var checkbox = document.getElementById("headForm");
    if (checkbox.checked == true){ //If user unselects the head
        checkbox.checked = false;
    } else { //If user selects the head
        checkbox.checked = true;
    }

    var headImg = document.getElementById("headImg");
    if (headImg.style.visibility == 'hidden'){ //If head is selected show the hat
        headImg.style.visibility = 'visible';
    } else { //If head is unselected hide the hat
        headImg.style.visibility = 'hidden';
    }
}
//Called if the head on the figure is clicked 
function torsoFunction(){
    var armImg = document.getElementById("longShirtImg");
    var upArmImg = document.getElementById("shirtImg");
    if (armImg.style.visibility == 'visible'){ //Unselects the longsleeve shirt if user deselects it
        armFunction();
        return;
    } else if (upArmImg.style.visibility == 'visible'){ //Unselects the tshirt if user deselects it
        upArmFunction(); 
        return;
    }

    var checkbox = document.getElementById("torsoForm");
    if (checkbox.checked == true){ //If user unselects the torso
        checkbox.checked = false;
    } else { //If user selects the torso
        checkbox.checked = true;
    }
    var torsoImg = document.getElementById("singletImg");
    if (torsoImg.style.visibility == 'hidden'){ //If torso is selected show the singlet
        torsoImg.style.visibility = 'visible';
    } else { //If torso is unselected hide the singlet
        torsoImg.style.visibility = 'hidden';
    }
}
//Called if the tshirt on the figure is clicked 
function upArmFunction(){
    var armImg = document.getElementById("longShirtImg"); 
    if (armImg.style.visibility == 'visible'){ //Unselects the longsleeve shirt if user deselects it
        armFunction();
        return;
    }

    var checkbox = document.getElementById("upperArmForm");
    var checkbox2 = document.getElementById("torsoForm");
    if (checkbox.checked == true){ //If user unselects the tshirt
        checkbox.checked = false; 
        checkbox2.checked = false; //Additionally deselects the torso
    } else { //If user selects the tshirt
        checkbox.checked = true;
        checkbox2.checked = true; //Additionally selects the torso
    }
    var upArmImg = document.getElementById("shirtImg");
    var torsoImg = document.getElementById("singletImg");
    if (upArmImg.style.visibility == 'hidden'){ //If user selects tshirt, show tshirt image and also hide the single
        torsoImg.style.visibility = 'hidden';
        upArmImg.style.visibility = 'visible';
    } else { //if user deselects the tshirt
        upArmImg.style.visibility = 'hidden';
    }
}
//Called if the longsleeve shirt on the figure is clicked 
function armFunction(){
    var checkbox = document.getElementById("lowerArmForm");
    var checkbox2 = document.getElementById("upperArmForm");
    var checkbox3 = document.getElementById("torsoForm");
    if (checkbox.checked == true){ //If user unselects the longsleeve shirt
        checkbox.checked = false;
        checkbox2.checked = false; //Additionally deselects the torso and tshirt
        checkbox3.checked = false;
    } else { //If user selects the longsleeve shirt
        checkbox.checked = true;
        checkbox2.checked = true; //Additionally selects the torso and tshirt
        checkbox3.checked = true;
    }
    var armImg = document.getElementById("longShirtImg");
    var upArmImg = document.getElementById("shirtImg");
    var torsoImg = document.getElementById("singletImg");
    if (armImg.style.visibility == 'hidden'){ //If user selects longsleeve shirt show it, additionally hide the singlet and tshirt if they were visible
        upArmImg.style.visibility = 'hidden';
        torsoImg.style.visibility = 'hidden';
        armImg.style.visibility = 'visible';
    } else { //otherwise user has deselected, hide the longsleeve shirt
        armImg.style.visibility = 'hidden';
    }
}
//If user clicks on hands
function handsFunction(){
    var checkbox = document.getElementById("handsForm");
    if (checkbox.checked == true){ //User has deselected hands
        checkbox.checked = false;
    } else { //user has selected hands were covered
        checkbox.checked = true;
    }

    var handsImg = document.getElementById("handsImg");
    if (handsImg.style.visibility == 'hidden'){ //show hands image
        handsImg.style.visibility = 'visible';
    } else { //hide hands image
        handsImg.style.visibility = 'hidden';
    }
}
//if user clicks on legs
function legsFunction(){
    var checkbox = document.getElementById("legsForm");
    if (checkbox.checked == true){ //user has deselected pants
        checkbox.checked = false;
    } else { //user has selected pants were covered
        checkbox.checked = true;
    }
    var legsImg = document.getElementById("pantsImg");
    if (legsImg.style.visibility == 'hidden'){ //pants selected, show them
        legsImg.style.visibility = 'visible';
    } else { //pants deselected, hide them
        legsImg.style.visibility = 'hidden';
    }
}

//Calculate body percentage which was exposed to the sun
function setSessionData(){ 
    var totalPercentage = 0;
    //! means logical not
    if (!document.getElementById("headForm").checked){ //If the head was exposed
      totalPercentage += 5;
    }
    if (!document.getElementById("handsForm").checked){ //If hands were exposed
      totalPercentage += 5;
    }
    if (!document.getElementById("lowerArmForm").checked){ //if lower arms were exposed
      totalPercentage += 5;
    }
    if (!document.getElementById("upperArmForm").checked){ //if upper arm was exposed
      totalPercentage += 5;
    }
    if (!document.getElementById("legsForm").checked){ //if lower legs were exposed
      totalPercentage += 15;
    }
    if (!document.getElementById("torsoForm").checked){ //if torso was exposed
      totalPercentage += 25;
    }
    //Set Percentage Data
    if (totalPercentage == 0){
        sessionStorage.setItem("insufficientUV", true);
    }
    sessionStorage.setItem("skinExposurePerc", totalPercentage);
}

//Saves data about minutes exposed to sunlight
function setMinutesData(){
    var inputMinutes = 0;
    var inputType = sessionStorage.getItem("exposure-measurement");
    if (chartSelect == "summerChart"){ //If using summer chart, take all input fields
        var morn = Number(document.getElementById("morningMinutes").value);
        var lunch = Number(document.getElementById("lunchMinutes").value);
        var afternoon = Number(document.getElementById("afternoonMinutes").value);
        inputMinutes = morn + lunch + afternoon;

    } 
    else { //if not summer, only use 11AM to 1PM
        inputMinutes = Number(document.getElementById("lunchMinutes").value);
    }
    if (inputType == "weekly"){ //If user selected to input data as weekly unit
        inputMinutes = Math.round(inputMinutes / 7); //Divided into daily units
    }
    if(parseInt(morn) < 0 || parseInt(lunch) < 0 || parseInt(afternoon) < 0 || parseInt(morn) > 120 || parseInt(lunch) > 120 || parseInt(afternoon) > 120 || parseInt(inputMinutes) < 0 || parseInt(inputMinutes) > 120){
        alert("Invalid estimated minutes value/s ");
    }
    //Save data on total minutes exposed to sun
    else {
    	sessionStorage.setItem("inputMinutes", inputMinutes);
    	window.location.assign('result-breakdown.html');

    }
    
}



