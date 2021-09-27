var grade = document.getElementById("overallGrade");

var insufficientUV = sessionStorage.getItem("insufficientUV");
if (insufficientUV == 'true'){ //If location was not high enough latitude to gather UV data, sun data does not need to be shown.
    var dietGrade = sessionStorage.getItem("dietGrade");
    document.getElementById("dietGradeLabel").innerHTML = dietGrade;
    grade.innerHTML = dietGrade;
    
    var exposurePerc = Number(sessionStorage.getItem("skinExposurePerc"));
    
    var inputTime = document.getElementById("givenTime");
    
    if (exposurePerc == 0){
        inputTime.innerHTML = "Not enough of your body was exposed to the sun to perform the calculations.";
    } else {
        inputTime.innerHTML = "You are located in an area which does not receive enough Ultra Violet exposure during winter. Sun exposure data is not required.";
    }
    
    //Delete rows in result table that are relevant to sun data
    var recommendedTime = document.getElementById("recommendedTime").remove();

    var resultsTable = document.getElementById("resultsTable");
    resultsTable.deleteRow(2);
    resultsTable.deleteRow(3);
    
} else { //Otherwise user is in a location which used sun exposure data
    var sunGrade = sessionStorage.getItem("sunGrade");
    document.getElementById("sunGradeLabel").innerHTML = sunGrade;
    var dietGrade = sessionStorage.getItem("dietGrade");
    document.getElementById("dietGradeLabel").innerHTML = dietGrade;
    //Determine overall grade, Sun exposure has more weight than diet
    if (dietGrade == 'A'){
        if (sunGrade == 'A'){ //A & A
            grade.innerHTML = 'A';

        } else if (sunGrade == 'B'){ //A & B
            grade.innerHTML = 'B'; ////Sun has more weight than diet

        } else if (sunGrade == 'C'){ //A & C
            grade.innerHTML = 'B';
        }

    } else if (dietGrade == 'B'){
        if (sunGrade == 'A'){ //B & A
            grade.innerHTML = 'A'; //Sun has more weight than diet

        } else if (sunGrade == 'B'){ //B & B
            grade.innerHTML = 'B'; 

        } else if (sunGrade == 'C'){ //B & C
            grade.innerHTML = 'C'; //Sun has more weight than diet
        }

    } else if (dietGrade == 'C'){
        if (sunGrade == 'A'){ //C & A
            grade.innerHTML = 'B';

        } else if (sunGrade == 'B'){ //C & B
            grade.innerHTML = 'B'; //Sun has more weight than diet

        } else if (sunGrade == 'C'){ //C & C
            grade.innerHTML = 'C';
        }
    }

    //Display data and calculations to user
    var inputTime = document.getElementById("givenTime");
    inputTime.innerHTML = sessionStorage.getItem("inputMinutes")+" minutes.";

    var recommendedTime = document.getElementById("recommendedTime");
    recommendedTime.innerHTML = "Recommended Minimum Sun Exposure: "+sessionStorage.getItem("recommendedMinutes")+" minutes.";

    //Sun Exposure Minute Data
    var inputMin = Number(sessionStorage.getItem("inputMinutes"));
    var recommendedMin = Number(sessionStorage.getItem("recommendedMinutes"));

    if (inputMin < recommendedMin){ //If user's input minutes was less than that recommended
        var minutesRequired = recommendedMin - inputMin;
        document.getElementById("requiredMinutes").innerHTML = "Additional: "+minutesRequired + " minute/s required";
    } else { //Otherwise they reached target minutes
        document.getElementById("requiredMinutes").innerHTML = "Required minutes reached";
    }
}

//Displays to user what each grade means
var likelihood = document.getElementById("deficiencyLikelihood");
if (grade.innerHTML == "A"){
    likelihood.innerHTML = "Unlikely to be insufficient";
} else if (grade.innerHTML == "B"){
    likelihood.innerHTML = "Moderately likely to be insufficient";
} else if (grade.innerHTML == "C"){
    likelihood.innerHTML = "Highly likely to be insufficient";
}

//Supplement Data
var oralIntake = Number(sessionStorage.getItem("dietaryIntake_result"));
var suppDose = Number(sessionStorage.getItem("totalSupplementDosage"));

//Displaying previous result data
firebase.auth().onAuthStateChanged((user) =>{
    if (user.isAnonymous){ //If guest user, previous result data is not relevant and button functionality needs to change
        var doneButton = document.getElementById("done-button");
        doneButton.innerHTML = "Done";
        doneButton.onclick = function(){
            guestConfirmation();
        }
        //Removes table for previous result data
        document.getElementById("prevResultsHeading").remove();
        document.getElementById("prevResultsTable").remove();
    } else if (user !== null){ //Otherwise show previous data 
        var userRef = db.collection("users").doc(user.uid);
        userRef.get().then((doc) => { 
           if (doc.exists){ //if previous data was found
               var userData = doc.data();
               var prevResult = userData["results"][userData["results"].length-1]; //Get previous entry
               var date = prevResult["date"].toDate();
               
               //Display data of previous result in table
               document.getElementById("prevDate").innerHTML = date.getDate()+"/"+(date.getMonth()+1)+"/"+date.getFullYear();;
               
               document.getElementById("prevGrade").innerHTML = prevResult["letterGrade"];
               
               document.getElementById("prevLikelihood").innerHTML = prevResult["deficiencyChance"];
               
               document.getElementById("prevDietGrade").innerHTML = prevResult["dietGrade"];
               
               if (prevResult["sunGrade"] == null){ //if previous result didn't include sun data, delete relevant rows
                    var resultsTable = document.getElementById("prevResultContainer");
                    resultsTable.deleteRow(5);
                    resultsTable.deleteRow(7);
               } else {
                   document.getElementById("prevSunGrade").innerHTML = prevResult["sunGrade"];
                   document.getElementById("prevRequiredMinutes").innerHTML = prevResult["minutesRequired"];
               }
               
               document.getElementById("prevOralIntake").innerHTML = Number(prevResult["dietIntake"]).toFixed(2)+"ug";
               
               document.getElementById("prevSuppIntake").innerHTML = Number(prevResult["suppIntake"]).toFixed(2)+"ug";
               
           } else { //Otherwise there is no previous data
               document.getElementById("prevResultsHeading").remove();
               document.getElementById("prevResultsTable").remove();
           }
        }).catch((error) => {
            console.log("Error getting document: ", error);
        });
        
        //Saves new data to firebase
        var resultData;
        if (insufficientUV == 'false'){ //if sun data was included
            resultData = {
                date: firebase.firestore.Timestamp.fromDate(new Date()),
                letterGrade: document.getElementById("overallGrade").innerHTML,
                deficiencyChance: likelihood.innerHTML,
                dietGrade: sessionStorage.getItem("dietGrade"),
                sunGrade: sessionStorage.getItem("sunGrade"),
                dietIntake: oralIntake.toFixed(2),
                suppIntake: suppDose,
                inputMinutes: Number(sessionStorage.getItem("inputMinutes")),
                minutesRequired: document.getElementById("requiredMinutes").innerHTML,
                insufficientUv: insufficientUV
            }
        } else { //otherwise sun data was not recorded
            resultData = {
                date: firebase.firestore.Timestamp.fromDate(new Date()),
                letterGrade: document.getElementById("overallGrade").innerHTML,
                deficiencyChance: likelihood.innerHTML,
                dietGrade: sessionStorage.getItem("dietGrade"),
                dietIntake: oralIntake.toFixed(2),
                suppIntake: suppDose,
                insufficientUv: insufficientUV
            }
        }

        if (!user.isAnonymous){ //If not guest user, save data
            userRef.get().then((doc) => {
                if (doc.exists){ //If user already has result data, append new data to end of result array
                   userRef.update({
                        results: firebase.firestore.FieldValue.arrayUnion(resultData)
                    });
                } else { //Otherwise no previous data exists so create a new document for the user
                    db.collection("users").doc(user.uid).set({
                        results: [resultData]
                    });
                }
            }).catch((error) => {
                console.log("Error getting document: ", error);
            });
        }
    } else {
        console.log("Not logged in");
    }
});

//If guest user tries to leave result page, reminds them that data will be lost
function guestConfirmation(){
    if (confirm("Are you sure you want to leave this page? All data will be lost.")){
        sessionStorage.clear();
        deleteUser(); //Deletes guest user as Firebase does not automatically do this with guest users
    } else {
        console.log("Cancel");
    }
}

//If signed in user leaves result page, clears any data used during use of tool
function homeClicked(){ 
    let alertCount = Number(sessionStorage.getItem("alertCount"));
    sessionStorage.clear();
    sessionStorage.setItem("alertCount", alertCount);
    window.location.assign("home.html");
}

function goBack(){
    window.history.back();
}