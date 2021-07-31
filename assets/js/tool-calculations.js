let db = firebase.firestore();
let type = sessionStorage.getItem("skin-tone-value");
let sunExposure = sessionStorage.getItem("skinExposurePerc");
let inputMinutes = sessionStorage.getItem("inputMinutes"); //For winter can only use time between 11am and 1pm
let chartSelect = sessionStorage.getItem("exposureChart");//Should be selected based on geolocation and season
var minutes = 0;

/*
if (chartSelect == null){ //temporary
    chartSelect = "summerChart";
    console.log("Temporary condition defaulting chart to summer: tool-calculations Line 8");
} */

//gets sun exposure data
var exposureRef = db.collection("exposureChart").doc(chartSelect);
exposureRef.get().then((doc) => {
    if (doc.exists){
        var chart = doc.data();
        console.log(type);
        console.log("Exposure Percentage: "+sunExposure);
        minutes = chart[type][sunExposure];
        console.log("Recommended Minutes: "+minutes);
        console.log("Input Minutes: "+inputMinutes);
    } else {
        console.log("Document doesn't exist");
    }
}).catch((error) => {
    console.log("Error getting doc", error);
});

function calGrade(){//calculations
    var inputMinutes = sessionStorage.getItem("inputMinutes");
    
    if (inputMinutes >= minutes){ //meets requirements for sun exposure
        sessionStorage.setItem("sunGrade", "A");
        sessionStorage.setItem("recommendedMinutes", minutes);
    } else if (inputMinutes < minutes){
        var temp = minutes/2;
        if (inputMinutes >= temp){ //Doesn't meet requirements for sun exposure but not bad
            sessionStorage.setItem("sunGrade", "B");
            sessionStorage.setItem("recommendedMinutes", minutes);
        } else { //below 50% recommended exposure
            sessionStorage.setItem("sunGrade", "C");
            sessionStorage.setItem("recommendedMinutes", minutes);
        }
    }
}
