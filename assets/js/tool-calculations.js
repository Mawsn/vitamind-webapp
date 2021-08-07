let db = firebase.firestore();

/*
if (chartSelect == null){ //temporary
    chartSelect = "summerChart";
    console.log("Temporary condition defaulting chart to summer: tool-calculations Line 8");
} */

//Dietary Calculation
/* Need to add food diet*/
/*let vitDSupp = sessionStorage.getItem("dosageOne");
let boneSupp = sessionStorage.getItem("dosageTwo");
let multiVitSupp = sessionStorage.getItem("dosageThree"); */
let vitDSupp = sessionStorage.getItem("vitDSupplement");
let boneSupp = sessionStorage.getItem("boneSupplement");
let multiVitSupp = sessionStorage.getItem("multiVitSupplement");
var suppAdd = 0.0; //unit is ug
if (vitDSupp == 'true'){
    let dosage = Number(sessionStorage.getItem("dosageOne"));
    if (dosage == 0){
        suppAdd += 25;
    } else {
        suppAdd += dosage;
    }
}
if (boneSupp == 'true'){
    let dosage = Number(sessionStorage.getItem("dosageTwo"));
    if (dosage == 0){
        suppAdd += 12.5;
    } else {
        suppAdd += dosage;
    }
}
if (multiVitSupp == 'true'){
    let dosage = Number(sessionStorage.getItem("dosageThree"));
    if (dosage == 0){
        suppAdd += 5;
    } else {
        suppAdd += dosage;
    }
}

function calDietary(){
    let age = Number(sessionStorage.getItem("age"));
    var total = suppAdd; //+ dietVit;
    if (age < 50){
        //recommended daily intake 5ug
        if (total >= 5){
            //alert("A");
            sessionStorage.setItem("dietGrade", "A");
        } else if (total >= 2.5 && total < 5){
            //alert("B");
            sessionStorage.setItem("dietGrade", "B");
        } else if (total < 2.5){
            //alert("C");
            sessionStorage.setItem("dietGrade", "C");
        }

    } else if (age >= 51 && age <= 70){
        //recommended daily intake 10ug
        if (total >= 10){
            sessionStorage.setItem("dietGrade", "A");
        } else if (total >= 5 && total < 10){
            sessionStorage.setItem("dietGrade", "B");
        } else if (total < 5){
            sessionStorage.setItem("dietGrade", "C");
        }

    } else if (age > 70){
        //recommended daily intake 15ug
        if (total >= 15){
            sessionStorage.setItem("dietGrade", "A");
        } else if (total >= 7.5 && total < 15){
            sessionStorage.setItem("dietGrade", "B");
        } else if (total < 7.5){
            sessionStorage.setItem("dietGrade", "C");
        }

    }

    //Here should check season and location and if not correct skip to results

}


let type = sessionStorage.getItem("skin-tone-value");
let sunExposure = sessionStorage.getItem("skinExposurePerc");
let inputMinutes = sessionStorage.getItem("inputMinutes"); //For winter can only use time between 11am and 1pm
let chartSelect = sessionStorage.getItem("exposureChart");//Should be selected based on geolocation and season
var minutes = 0;

console.log("CHART: "+chartSelect);

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
