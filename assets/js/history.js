// Code for the history page
// array
var totalIntake_vitD_array = [];
var previous_recent_totalIntake_vitD_array = [];
var result_date_array = [];
var previous_recent_result_date_array = [];
var user_data_array = [];


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
                let num_of_results = userData["results"].length;

                // testing_01 start
                // let loop_end_counter = 0;
                let loop_start_counter = 0;
                if(userData["results"].length > 6)
                {
                    loop_start_counter = userData["results"].length - 7;
                    // loop_end_counter = userData["results"].length - 1;
                }
                else
                {
                    loop_start_counter = 0;
                    // loop_end_counter = userData["results"].length;
                }
                // testing_01 end


                for(let i = 0; i < num_of_results; i++)
                {
                    let dietaryIntake_vitD = userData["results"][i].dietIntake;
                    let supplementIntake_vitD = userData["results"][i].suppIntake;

                    // testing
                    let user_data = userData["results"][i];
                    user_data_array.push(user_data);
                    
                    // calculate the total vitD
                    let totalIntake_vitD = parseFloat(dietaryIntake_vitD) + parseFloat(supplementIntake_vitD);
                    
                    // Push the total vitamin D value into the array
                    totalIntake_vitD_array.push(totalIntake_vitD);

                    // Push the date value into the arrray
                    // Change the date format to just year month and day
                    result_date_array.push((userData["results"][i].date).toDate().toDateString().slice(4));


                    // testing_02
                    console.log(totalIntake_vitD_array[i]);
                    console.log(result_date_array[i]);
                }


                // create a new array to store the 6 most recent result values that will be used to create the bar chart
                previous_recent_totalIntake_vitD_array = totalIntake_vitD_array.slice(loop_start_counter);
                previous_recent_result_date_array = result_date_array.slice(loop_start_counter);
                
                updateMenuItems(num_of_results);  // test

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
            labels: previous_recent_result_date_array,
            datasets:
            [{
                label: 'Total vitamin D(ug) intake',
                data: previous_recent_totalIntake_vitD_array,
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
            legend:
            {
                labels:
                {
                    fontSize: 14,
                    fontColor: "#ffffff"
                }
            },

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



function updateMenuItems(num_of_results)
{
    for(let i = 0; i < num_of_results; i++)
    {
        let menu_item = document.createElement("button");

        menu_item.id = "dropdown-item-date-" + (i+1);
        menu_item.classList = "dropdown-item";

        menu_item.onclick = function()
        {
            updateResultBreakdown(this.id)
        };

        menu_item.innerText = result_date_array[i];

        document.querySelector(".dropdown-menu").appendChild(menu_item);
    }

}



function updateResultBreakdown(temp_id)
{
    let array_index = parseInt(temp_id.slice(19)) - 1;

    // this is for date
    document.getElementById("historyResultLabel-0").innerHTML = result_date_array[array_index];

    // this is for overal grade
    document.getElementById("historyResultLabel-1").innerHTML = user_data_array[array_index].letterGrade;

    // this is for dietary intake grade
    document.getElementById("historyResultLabel-2").innerHTML = user_data_array[array_index].dietGrade;

    // // this is for sun exposure grade
    document.getElementById("historyResultLabel-3").innerHTML = user_data_array[array_index].sunGrade;

    // // this is for oral intake
    document.getElementById("historyResultLabel-4").innerHTML = totalIntake_vitD_array[array_index] + " ug";

    // // this is for total time exposed to sun
    document.getElementById("historyResultLabel-5").innerHTML = user_data_array[array_index].inputMinutes;

    // // this is for the required sun exposure
    document.getElementById("historyResultLabel-6").innerHTML = user_data_array[array_index].minutesRequired;
}
