let db = firebase.firestore();
let type = "Type_2";
let sunExposure = "5";
let inputMinutes = 3;
var minutes = 0;

//gets sun exposure data
var exposureRef = db.collection("exposureChart").doc("summerChart");
exposureRef.get().then((doc) => {
    if (doc.exists){
        var chart = doc.data();
        minutes = chart[type][sunExposure];
        console.log(minutes);
    } else {
        console.log("Document doesn't exist");
    }
}).catch((error) => {
    console.log("Error getting doc", error);
});

function test(){//calculations
    if (inputMinutes >= minutes){
        alert("Sun Exposure: Grade A " + inputMinutes +" " + minutes);
    } else if (inputMinutes < minutes){
        var temp = minutes/2;
        if (inputMinutes >= temp){
            alert("Sun Exposure: Grade B " + inputMinutes +" "+ temp);
        } else {
            alert("Sun Exposure: Grade C "+ inputMinutes+" "+ temp);
        }
    }
}