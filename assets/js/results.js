var grade = document.getElementById("overallGrade");
//sessionStorage.setItem("sunGrade", "A");
        //sessionStorage.setItem("inputMinutes", inputMinutes);
        //sessionStorage.setItem("recommendedMinutes", minutes);

//grade.innerHTML = sessionStorage.getItem("sunGrade");

var insufficientUV = sessionStorage.getItem("insufficientUV");
if (insufficientUV == 'true'){
    console.log("If data is not being shown when it should, error could be in results.js line 9-24.")
    var dietGrade = sessionStorage.getItem("dietGrade");
    document.getElementById("dietGradeLabel").innerHTML = dietGrade;
    grade.innerHTML = dietGrade;
    
    var inputTime = document.getElementById("givenTime");
    inputTime.innerHTML = "You are located in an area which does not receive enough Ultra Violet exposure during winter. Sun exposure data is not required.";

    var recommendedTime = document.getElementById("recommendedTime").remove();

    var resultsTable = document.getElementById("resultsTable");
    resultsTable.deleteRow(2);
    resultsTable.deleteRow(4);
    
} else {
    var sunGrade = sessionStorage.getItem("sunGrade");
    document.getElementById("sunGradeLabel").innerHTML = sunGrade;
    var dietGrade = sessionStorage.getItem("dietGrade");
    document.getElementById("dietGradeLabel").innerHTML = dietGrade;
    console.log("SUN: "+ sunGrade + " DIET: "+dietGrade);
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


    var inputTime = document.getElementById("givenTime");
    inputTime.innerHTML = sessionStorage.getItem("inputMinutes")+" minutes.";
    //console.log("THIS: "+sessionStorage.getItem("inputMinutes"));

    var recommendedTime = document.getElementById("recommendedTime");
    recommendedTime.innerHTML = "Recommended Minimum Sun Exposure: "+sessionStorage.getItem("recommendedMinutes")+" minutes.";

    //Sun Exposure Minute Data
    var inputMin = Number(sessionStorage.getItem("inputMinutes"));
    var recommendedMin = Number(sessionStorage.getItem("recommendedMinutes"));

    if (inputMin < recommendedMin){
        var minutesRequired = recommendedMin - inputMin;
        document.getElementById("requiredMinutes").innerHTML = "Additional: "+minutesRequired + " minute/s required";
    } else {
        document.getElementById("requiredMinutes").innerHTML = "Required minutes reached";
    }
}

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
document.getElementById("oralIntakeLabel").innerHTML = oralIntake.toFixed(2)+"ug";
var suppDose = Number(sessionStorage.getItem("totalSupplementDosage"));
//document.getElementById("suppIntakeLabel").innerHTML = suppDose+"ug";


firebase.auth().onAuthStateChanged((user) =>{
    if (user.isAnonymous){
        var doneButton = document.getElementById("done-button");
        doneButton.innerHTML = "Done";
        doneButton.onclick = function(){
            guestConfirmation();
        }
        console.log("GUEST");
        document.getElementById("prevResultsHeading").remove();
        document.getElementById("prevResultsTable").remove();
    } else if (user !== null){
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
               
               document.getElementById("prevLikelihood").innerHTML = prevResult["deficiencyChance"];
               
               document.getElementById("prevDietGrade").innerHTML = prevResult["dietGrade"];
               
               if (prevResult["sunGrade"] == null){
                    var resultsTable = document.getElementById("prevResultContainer");
                    resultsTable.deleteRow(5);
                    resultsTable.deleteRow(7);
               } else {
                   document.getElementById("prevSunGrade").innerHTML = prevResult["sunGrade"];
                   document.getElementById("prevRequiredMinutes").innerHTML = prevResult["minutesRequired"];
               }
               
               document.getElementById("prevOralIntake").innerHTML = prevResult["dietIntake"]+"ug";
               
               document.getElementById("prevSuppIntake").innerHTML = prevResult["suppIntake"]+"ug";
               
        
               
           } else {
               console.log("No previous history");
               document.getElementById("prevResultsHeading").remove();
               document.getElementById("prevResultsTable").remove();
           }
        }).catch((error) => {
            console.log("Error getting document: ", error);
        });
        
        var resultData;
        if (insufficientUV == 'false'){
            resultData = {
                date: firebase.firestore.Timestamp.fromDate(new Date()),
                letterGrade: document.getElementById("overallGrade").innerHTML,
                deficiencyChance: likelihood.innerHTML,
                dietGrade: sessionStorage.getItem("dietGrade"),
                sunGrade: sessionStorage.getItem("sunGrade"),
                dietIntake: oralIntake.toFixed(2),
                suppIntake: suppDose,
                minutesRequired: document.getElementById("requiredMinutes").innerHTML
            }
        } else {
            resultData = {
                date: firebase.firestore.Timestamp.fromDate(new Date()),
                letterGrade: document.getElementById("overallGrade").innerHTML,
                deficiencyChance: likelihood.innerHTML,
                dietGrade: sessionStorage.getItem("dietGrade"),
                dietIntake: oralIntake.toFixed(2),
                suppIntake: suppDose
            }
        }
        /*var resultData = {
            date: firebase.firestore.Timestamp.fromDate(new Date()),
            letterGrade: document.getElementById("overallGrade").innerHTML,
            deficiencyChance: likelihood.innerHTML,
            dietGrade: sessionStorage.getItem("dietGrade"),
            sunGrade: sessionStorage.getItem("sunGrade"),
            dietIntake: oralIntake.toFixed(2),
            suppIntake: suppDose,
            minutesRequired: document.getElementById("requiredMinutes").innerHTML
        } */

        if (!user.isAnonymous){
            userRef.get().then((doc) => {
                if (doc.exists){
                   console.log("User doc exists");
                   userRef.update({
                        results: firebase.firestore.FieldValue.arrayUnion(resultData)
                    });
                } else {
                    console.log("Creating new doc");
                   // console.log("results.js line 167 is where default birthday is set");
                    db.collection("users").doc(user.uid).set({
                        //dob: firebase.firestore.Timestamp.fromDate(new Date("December 13, 1999")),
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

function guestConfirmation(){
    if (confirm("Are you sure you want to leave this page? All data will be lost.")){
       // signout();
        sessionStorage.clear();
        deleteUser();
       // window.location.assign("index.html");
    } else {
        console.log("Cancel");
    }
}

function homeClicked(){
    sessionStorage.clear();
    window.location.assign("home.html");
}

function goBack(){
    window.history.back();
}