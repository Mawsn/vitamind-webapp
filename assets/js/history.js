// Code for the history page
// array
var totalIntake_vitD_array = [];
var result_date_array = [];

Chart.defaults.color = "#ffffff";


function ReadData()
{
    firebase.auth().onAuthStateChanged((user) =>
    {
        var userRef = db.collection("users").doc(user.uid);
        userRef.get().then((doc) => 
        {
            if (doc.exists)
            {
                console.log("User doc exists");
                var userData = doc.data();
                
                // Loop depends on the number of results present in the user's account
                // testing
                let loop_end_counter = 0;
                let loop_start_counter = 0;
                if(userData["results"].length > 6)
                {
                    loop_start_counter = userData["results"].length;
                    loop_end_counter = loop_start_counter - 6;
                }
                else
                {
                    loop_start_counter = userData["results"].length;
                    loop_end_counter = 0;
                }
                for(let i = 0; i < 6; i++)
                {
                    let dietaryIntake_vitD = userData["results"][i].dietIntake;
                    let supplementIntake_vitD = userData["results"][i].suppIntake;
                    
                    // calculate the total vitD
                    let totalIntake_vitD = parseFloat(dietaryIntake_vitD) + parseFloat(supplementIntake_vitD);
                    
                    // Push the total vitamin D value into the array
                    totalIntake_vitD_array.push(totalIntake_vitD);

                    // Push the date value into the arrray
                    // Change the date format to just year month and day
                    result_date_array.push((userData["results"][i].date).toDate().toDateString().slice(4));


                    // testing
                    console.log(totalIntake_vitD_array[i]);
                    console.log(result_date_array[i]);
                }


                // after reading data from firebase, create chart
                createChart();
            } 
            else
            {
                console.log("Document doesn't exist. Invalid data may have been entered");
            }
        }).catch((error) => 
        {
            console.log("Error getting document: ", error);
        });
    });

}


// this function will create a chart based on the data read from firebase
function createChart()
{
    var ctx = document.getElementById("result_chart").getContext("2d");

    window.result_chart = new Chart(ctx, 
    {
        type: "bar",
        data:
        {
            labels: result_date_array,
            datasets:
            [{
                label: 'Total vitamin D(ug) intake',
                data: totalIntake_vitD_array,
                backgroundColor: "rgba(248,182,7,0.65)",
                borderColor: "#f8b607",
                borderWidth: 1.5,
                hoverBorderWidth: 1.5,
                hoverBorderColor: "#1686ab",
                hoverBackgroundColor: "rgba(248,182,7,0.83)"
            }]
        },
        options:
        {
            scales:
            {
                xAxes:
                [
                    {
                        ticks: {fontSize: 14, fontColor: "#ffffff"},
                        gridLines: { color: "rgba(255,255,255,0.2)"}
                    }
                ],
                yAxes:
                [
                    {
                        ticks: {fontSize: 14, fontColor: "#ffffff"},
                        gridLines: { color: "rgba(255,255,255,0.2)"}
                    }
                ]
            }
        }

    });
}

