var grade = document.getElementById("overallGrade");
//sessionStorage.setItem("sunGrade", "A");
        //sessionStorage.setItem("inputMinutes", inputMinutes);
        //sessionStorage.setItem("recommendedMinutes", minutes);

grade.innerHTML = sessionStorage.getItem("sunGrade");

var inputTime = document.getElementById("givenTime");
inputTime.innerHTML = "Total Time Exposed to Sun: "+sessionStorage.getItem("inputMinutes");
//console.log("THIS: "+sessionStorage.getItem("inputMinutes"));

var recommendedTime = document.getElementById("recommendedTime");
recommendedTime.innerHTML = "Recommended Minimum Sun Exposure: "+sessionStorage.getItem("recommendedMinutes");

function goBack(){
    window.history.back();
}