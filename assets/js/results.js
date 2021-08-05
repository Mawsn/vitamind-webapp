var grade = document.getElementById("overallGrade");
//sessionStorage.setItem("sunGrade", "A");
        //sessionStorage.setItem("inputMinutes", inputMinutes);
        //sessionStorage.setItem("recommendedMinutes", minutes);

grade.innerHTML = sessionStorage.getItem("sunGrade");

var inputTime = document.getElementById("givenTime");
inputTime.innerHTML = "Total Daily Time Exposed to Sun: "+sessionStorage.getItem("inputMinutes")+" minutes.";
//console.log("THIS: "+sessionStorage.getItem("inputMinutes"));

var recommendedTime = document.getElementById("recommendedTime");
recommendedTime.innerHTML = "Recommended Minimum Sun Exposure: "+sessionStorage.getItem("recommendedMinutes")+" minutes.";

var likelyhood = document.getElementById("deficiencyLikelyhood");
if (sessionStorage.getItem("sunGrade") == "A"){
    likelyhood.innerHTML = "Unlikely to be insufficient";
} else if (sessionStorage.getItem("sunGrade") == "B"){
    likelyhood.innerHTML = "Moderately likely to be insufficient";
} else if (sessionStorage.getItem("sunGrade") == "C"){
    likelyhood.innerHTML = "Highly likely to be insufficient";
}


var inputMin = Number(sessionStorage.getItem("inputMinutes"));
var recommendedMin = Number(sessionStorage.getItem("recommendedMinutes"));

if (inputMin < recommendedMin){
    var minutesRequired = recommendedMin - inputMin;
    document.getElementById("requiredMinutes").innerHTML = "Additional: "+minutesRequired + " minute/s required";
} else {
    document.getElementById("requiredMinutes").innerHTML = "Required minutes reached";
}

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
               
               document.getElementById("prevLikelyhood").innerHTML = prevResult["deficiencyChance"];
               
               document.getElementById("prevRequiredMinutes").innerHTML = prevResult["minutesRequired"];
           } else {
               console.log("No previous history");
               document.getElementById("prevResultsHeading").remove();
               document.getElementById("prevResultsTable").remove();
           }
        }).catch((error) => {
            console.log("Error getting document: ", error);
        });
        
        
        var resultData = {
            date: firebase.firestore.Timestamp.fromDate(new Date()),
            letterGrade: sessionStorage.getItem("sunGrade"),
            deficiencyChance: likelyhood.innerHTML,
            minutesRequired: document.getElementById("requiredMinutes").innerHTML
        }

        if (!user.isAnonymous){
            userRef.get().then((doc) => {
                if (doc.exists){
                   console.log("User doc exists");
                   userRef.update({
                        results: firebase.firestore.FieldValue.arrayUnion(resultData)
                    });
                } else {
                    console.log("Creating new doc");
                    db.collection("users").doc(user.uid).set({
                        dob: firebase.firestore.Timestamp.fromDate(new Date("December 13, 1999")),
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
        deleteUser();
       // window.location.assign("index.html");
    } else {
        console.log("Cancel");
    }
}

function goBack(){
    window.history.back();
}