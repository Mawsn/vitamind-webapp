let db = firebase.firestore(); //let db = firebase.firestore(); //Connects the database to firestore

//Gets already entered data to perform some calculations
let type = sessionStorage.getItem("skin-tone-value");
let sunExposure = sessionStorage.getItem("skinExposurePerc");
let inputMinutes = sessionStorage.getItem("inputMinutes");
let chartSelect = sessionStorage.getItem("exposureChart");
var minutes = 0;

//Dietary Calculation
let vitDSupp = sessionStorage.getItem("vitDSupplement"); //Gets if user uses Vitamin D supplement
let boneSupp = sessionStorage.getItem("boneSupplement"); //Gets if user uses Bone Supplement
let multiVitSupp = sessionStorage.getItem("multiVitSupplement"); //Gets if user uses Multi-vitamin supplement
var suppAdd = 0.0; //unit is ug
var oralIntake = Number(sessionStorage.getItem("dietaryIntake_result")); //unit is ug
//Adds supplement intake to calculations
if (vitDSupp == 'true'){ //if user does use supplements
    let dosage = Number(sessionStorage.getItem("dosageOne"));
    let freq = Number(sessionStorage.getItem("vitDFrequency"));
    if (dosage == 0){ //If the user did not provide dosage input, use default
        var dos = 25 * freq;
        suppAdd += dos; //add dosage to overall supplement intake
    } else { //otherwise use entered dosage amount
        var dos = dosage * freq;
        suppAdd += dos;
    }
}
//Adds supplement intake to calculations
if (boneSupp == 'true'){ //if user does use supplements
    let dosage = Number(sessionStorage.getItem("dosageTwo"));
    let freq = Number(sessionStorage.getItem("boneFrequency"));
    if (dosage == 0){ //If the user did not provide dosage input, use default
        var dos = 12.5 * freq;
        suppAdd += dos; //add dosage to overall supplement intake
    } else { //otherwise use entered dosage amount
        var dos = dosage * freq;
        suppAdd += dos;
    }
}
//Adds supplement intake to calculations
if (multiVitSupp == 'true'){ //if user does use supplements
    let dosage = Number(sessionStorage.getItem("dosageThree"));
    let freq = Number(sessionStorage.getItem("multiVitFrequency"));
    if (dosage == 0){ //If the user did not provide dosage input, use default
        var dos = 5 * freq;
        suppAdd += dos; //add dosage to overall supplement intake
    } else { //otherwise use entered dosage amount
        var dos = dosage * freq;
        suppAdd += dos;
    }
}
//Save total supplement intake amount
sessionStorage.setItem("totalSupplementDosage", suppAdd);

function calDietary(){
    let age = Number(sessionStorage.getItem("age")); //Get user's age
    var total = suppAdd + (oralIntake/7); //once all diet data input is ready, must divide weekly intake by 7 to get daily intake
    if (age < 50){ //If user is less than 50 years old
        //recommended daily intake 5ug
        if (total >= 5){ //If greater than or equal to 5ug, grade is A
            sessionStorage.setItem("dietGrade", "A");
        } else if (total >= 2.5 && total < 5){ //If greater than or equal to 2.5ug but less 5ug, grade is B
            sessionStorage.setItem("dietGrade", "B");
        } else if (total < 2.5){ //If less than 2.5ug, grade is C
            sessionStorage.setItem("dietGrade", "C");
        }

    } else if (age >= 51 && age <= 70){ //If user is older than 50 years old but younger than 70 years old
        //recommended daily intake 10ug
        if (total >= 10){ //If greater than or equal to 10ug, grade is A
            sessionStorage.setItem("dietGrade", "A");
        } else if (total >= 5 && total < 10){ //If greater than or equal to 5ug but less 10ug, grade is B
            sessionStorage.setItem("dietGrade", "B");
        } else if (total < 5){ //If less than 5ug, grade is C
            sessionStorage.setItem("dietGrade", "C");
        }

    } else if (age > 70){ //If user is older than 70
        //recommended daily intake 15ug
        if (total >= 15){ //If greater than or equal to 15ug, grade is A
            sessionStorage.setItem("dietGrade", "A");
        } else if (total >= 7.5 && total < 15){ //If greater than or equal to 7.5ug but less 15ug, grade is B
            sessionStorage.setItem("dietGrade", "B");
        } else if (total < 7.5){ //If less than 7.5ug, grade is C
            sessionStorage.setItem("dietGrade", "C");
        }

    }
}


//gets sun exposure data
var exposureRef = db.collection("exposureChart").doc(chartSelect);
exposureRef.get().then((doc) => { //Tries getting data related to recommended UV exposure
    if (doc.exists){ //If data for chart is found
        var chart = doc.data();
        minutes = chart[type][sunExposure]; //Gets recommened Minutes for sun exposure
    } else {
        console.log("Document doesn't exist. Invalid data may have been entered");
    }
}).catch((error) => {
    console.log("Error getting doc", error);
});

function calGrade(){ //Calculates the sun grade for the user
    var inputMinutes = sessionStorage.getItem("inputMinutes"); //Gets the total minutes the user entered

    if (inputMinutes >= minutes){ //meets requirements for sun exposure
        sessionStorage.setItem("sunGrade", "A"); //Set grade to A
        sessionStorage.setItem("recommendedMinutes", minutes); //Save recommended minutes user should be in the sun
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

