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

firebase.auth().onAuthStateChanged((user) =>{
    if (user !== null){
        var resultData = {
            date: firebase.firestore.Timestamp.fromDate(new Date()),
            exposureMinutes: sessionStorage.getItem("inputMinutes"),
            recommendedMinutes: sessionStorage.getItem("recommendedMinutes"),
            skinTone: sessionStorage.getItem("skin-tone-value")
        }
        var userRef = db.collection("users").doc(user.uid);

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
    } else {
        console.log("Not logged in");
    }
});

function goBack(){
    window.history.back();
}