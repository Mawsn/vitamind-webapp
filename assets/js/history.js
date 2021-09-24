let db = firebase.firestore();

// Code for the history page

// array
var totalIntake_vitD_array = [];
var previous_recent_totalIntake_vitD_array = [];
var result_date_array = [];
var previous_recent_result_date_array = [];
var user_data_array = [];

// variable for storing the total number of results
var num_of_results;

// variables for changing the fontsize of labels, xAxes, and yAxes when needed
var fontsize_label_value;
var fontsize_xAxes_value;
var fontsize_yAxes_value;


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
                num_of_results = userData["results"].length;

                // testing_01 start
                let loop_start_counter = 0;
                if(userData["results"].length > 6)
                {
                    loop_start_counter = userData["results"].length - 6;
                }
                else
                {
                    loop_start_counter = 0;
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
                    // Change the date format to just year, month and day
                    result_date_array.push((userData["results"][i].date).toDate().toDateString().slice(4));


                    // testing_02
                    console.log(totalIntake_vitD_array[i]);
                    console.log(result_date_array[i]);
                }


                // create a new array to store the 6 most recent result values that will be used to create the bar chart
                previous_recent_totalIntake_vitD_array = totalIntake_vitD_array.slice(loop_start_counter);
                previous_recent_result_date_array = result_date_array.slice(loop_start_counter);
                
                UpdateMenuItems(num_of_results);  // test

                // after reading data from firebase, create chart
                fontsize_label_value = 9;
                fontsize_xAxes_value = 9;
                fontsize_yAxes_value = 9;

                // call this function to create a chart based on the data read
                CreateChart();

                // call this function to use an appropriate font size based on the screen size of the device
                ScreenSizeCheck();
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
function CreateChart()
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
                    fontSize: fontsize_label_value,
                    fontColor: "#ffffff"
                }
            },

            scales:
            {
                xAxes:
                [
                    {
                        ticks: {fontSize: fontsize_xAxes_value, fontColor: "#ffffff"},
                        gridLines: { color: "rgba(255,255,255,0.2)"}
                    }
                ],
                yAxes:
                [
                    {
                        ticks: {fontSize: fontsize_yAxes_value, fontColor: "#ffffff"},
                        gridLines: { color: "rgba(255,255,255,0.2)"}
                    }
                ]
            }
        }

    });
}



function UpdateMenuItems(num_of_results)
{
    for(let i = 0; i < num_of_results; i++)
    {
        let menu_item = document.createElement("button");

        menu_item.id = "dropdown-item-date-" + (i+1);
        menu_item.classList = "dropdown-item";

        menu_item.onclick = function()
        {
            UpdateResultBreakdown(this.id)
        };

        menu_item.innerText = result_date_array[i];

        document.querySelector(".dropdown-menu").appendChild(menu_item);
    }

}



function UpdateResultBreakdown(temp_id)
{
    let array_index = parseInt(temp_id.slice(19)) - 1;

    // this is for date
    document.getElementById("historyResultLabel-0").innerHTML = result_date_array[array_index];

    // this is for overal grade
    document.getElementById("historyResultLabel-1").innerHTML = user_data_array[array_index].letterGrade;

    // this is for dietary intake grade
    document.getElementById("historyResultLabel-2").innerHTML = user_data_array[array_index].dietGrade;

    // // this is for oral intake
    document.getElementById("historyResultLabel-4").innerHTML = totalIntake_vitD_array[array_index] + " ug";

    document.getElementById("historyResultLabel-5").innerHTML = user_data_array[array_index].dietIntake + " ug";

    document.getElementById("historyResultLabel-6").innerHTML = user_data_array[array_index].suppIntake + " ug";

    if(user_data_array[array_index].insufficientUv == "true")
    {
        // this is for sun exposure grade
        document.getElementById("historyResultLabel-3").innerHTML = "Not applicable due to insufficient UV";

        // // this is for total time exposed to sun
        document.getElementById("historyResultLabel-7").innerHTML = "Not applicable due to insufficient UV";

        // // this is for the required sun exposure
        document.getElementById("historyResultLabel-8").innerHTML = "Not applicable due to insufficient UV";
    }
    else if(user_data_array[array_index].insufficientUv == "false")
    {
        // this is for sun exposure grade
        document.getElementById("historyResultLabel-3").innerHTML = user_data_array[array_index].sunGrade;

        // // this is for total time exposed to sun
        document.getElementById("historyResultLabel-7").innerHTML = user_data_array[array_index].inputMinutes + " minutes";

        // // this is for the required sun exposure
        document.getElementById("historyResultLabel-8").innerHTML = user_data_array[array_index].minutesRequired;
    }


    storeFirebaseData(temp_id, user_data_array[array_index].insufficientUv);
}



function SetChartType(temp_id)
{
    // check the type of chart selected
    if(temp_id == "dropdown_item_bar_chart")
    {
        result_chart.config.type = "bar";
        result_chart.update();
    }
    else if(temp_id == "dropdown_item_line_chart")
    {
        result_chart.config.type = "line";
        result_chart.update();
    }
}



// this function will find the screen size of the device and then will select an appropriate font size for the labels of the legend, xAxes, and yAxes
function ScreenSizeCheck()
{
    let screen_width_value = screen.width;
    let screen_height_value = screen.height;


    if(screen_width_value >= 1400 && screen_height_value >= 869)
    {
        // for screen size 1400px x 869px

        fontsize_label_value = 15;
        fontsize_xAxes_value = 14;
        fontsize_yAxes_value = 14;
    }
    else if(screen_width_value >= 1200 && screen_height_value >= 869)
    {
        // for screen size 1200px x 869px

        fontsize_label_value = 15;
        fontsize_xAxes_value = 14;
        fontsize_yAxes_value = 14;

    }
    else if(screen_width_value >= 992 && screen_height_value >= 869)
    {
        // for screen size 992px x 869px

        fontsize_label_value = 13;
        fontsize_xAxes_value = 12;
        fontsize_yAxes_value = 12;
    }
    else if(screen_width_value >= 768 && screen_height_value >= 869)
    {
        // for screen size 768px x 869px

        fontsize_label_value = 11;
        fontsize_xAxes_value = 10;
        fontsize_yAxes_value = 10;
    }
    else if(screen_width_value >= 576 && screen_height_value >= 869)
    {
        // for screen size 576px x 869px

        fontsize_label_value = 10;
        fontsize_xAxes_value = 9;
        fontsize_yAxes_value = 9;
    }
    else if(screen_width_value >= 360 && screen_height_value >= 869)
    {
        // for screen size 360px x 869px

        fontsize_label_value = 9;
        fontsize_xAxes_value = 8;
        fontsize_yAxes_value = 8;
    }

    result_chart.options.legend.labels.fontSize = fontsize_label_value;
    result_chart.options.scales.xAxes[0].ticks.fontSize = fontsize_xAxes_value;
    result_chart.options.scales.yAxes[0].ticks.fontSize = fontsize_yAxes_value;
    result_chart.update(); 
}


// the font size of the lables in the legend, xAxes, and yAxes will change depending on the resized window's size
window.addEventListener('resize', function(event)
{
    let window_width_value = window.innerWidth;
    let window_height_value = window.innerHeight;

    if(window_width_value >= 1400 && window_height_value >= 869)
    {
        // for screen size 1400px x 869px

        fontsize_label_value = 15;
        fontsize_xAxes_value = 14;
        fontsize_yAxes_value = 14;
    }
    else if(window_width_value >= 1200 && window_height_value >= 869)
    {
        // for screen size 1200px x 869px

        fontsize_label_value = 15;
        fontsize_xAxes_value = 14;
        fontsize_yAxes_value = 14;

    }
    else if(window_width_value >= 992 && window_height_value >= 869)
    {
        // for screen size 992px x 869px

        fontsize_label_value = 13;
        fontsize_xAxes_value = 12;
        fontsize_yAxes_value = 12;
    }
    else if(window_width_value >= 768 && window_height_value >= 869)
    {
        // for screen size 768px x 869px

        fontsize_label_value = 11;
        fontsize_xAxes_value = 10;
        fontsize_yAxes_value = 10;
    }
    else if(window_width_value >= 576 && window_height_value >= 869)
    {
        // for screen size 576px x 869px

        fontsize_label_value = 10;
        fontsize_xAxes_value = 9;
        fontsize_yAxes_value = 9;
    }
    else if(window_width_value >= 360 && window_height_value >= 869)
    {
        // for screen size 360px x 869px

        fontsize_label_value = 9;
        fontsize_xAxes_value = 8;
        fontsize_yAxes_value = 8;
    }

    result_chart.options.legend.labels.fontSize = fontsize_label_value;
    result_chart.options.scales.xAxes[0].ticks.fontSize = fontsize_xAxes_value;
    result_chart.options.scales.yAxes[0].ticks.fontSize = fontsize_yAxes_value;
    result_chart.update();

});





// The following functions are for exporting all user result data

function openExportAllResultMenu()
{
    // get some values that are read from firebase


    document.getElementById('popup-export-all-result-menu').style.display = 'block';
    window.scrollTo({top: 0, behavior: 'smooth'});
}



function closeExportAllResultMenu()
{
    document.getElementById('popup-export-all-result-menu').style.display = 'none';
}



function exportAllResultPDF()
{
    //PDF export 
	var doc = new jsPDF()
	var img = new Image();
	img.src = 'https://vitatrack.app/assets/img/logo-standard.png';
	doc.addImage(img, 'png', 75, 10, 57.5, 75);
	doc.text("Result Breakdown", 82, 100);


    var temp_values;
    var pdf_head_values = ['Date', 'Dietary Intake Grade', 'Sun Exposure Grade','Weekly Oral Intake','Supplement Intake','Total Time Exposed to Sun','Required Sun Exposure'];
    var pdf_body_values = [];

    for(let i = 0; i < num_of_results; i++)
    {
        if(user_data_array[i].insufficientUv == 'true')
        {
            temp_values = [result_date_array[i], user_data_array[i].dietGrade, "N/A", user_data_array[i].dietIntake + " ug", user_data_array[i].suppIntake + " ug", "N/A", "N/A"];
            pdf_body_values.push(temp_values);
        } 
        else 
        {
            temp_values = [result_date_array[i], user_data_array[i].dietGrade, user_data_array[i].sunGrade, user_data_array[i].dietIntake + " ug", user_data_array[i].suppIntake + " ug", user_data_array[i].inputMinutes + " minutes", user_data_array[i].minutesRequired];
            pdf_body_values.push(temp_values);
        }
    }

    doc.autoTable
    ({
        margin: {top: 110},
        head: [pdf_head_values],
        body: pdf_body_values,
    })
	
	doc.save('VitaTrack Tool Result.pdf');
}



function exportAllResultCSV()
{
    //CSV export
    var outData = "";
    
    let csvHeader = ['Date', 'Dietary Intake Grade', 'Sun Exposure Grade','Weekly Oral Intake','Supplement Intake','Total Time Exposed to Sun','Required Sun Exposure'];
    
    csvHeader.forEach(function(row)
    {  
        outData += row + ","; 
    });

    outData += "\n"

    for(let i = 0; i < num_of_results; i++)
    {
        if(user_data_array[i].insufficientUv == 'true')
        {
            let csvData = [result_date_array[i], user_data_array[i].dietGrade, "N/A", user_data_array[i].dietIntake + " ug", user_data_array[i].suppIntake + " ug", "N/A", "N/A"];

            csvData.forEach(function(row)
            {  
                outData += row + ","; 
            });
            
            outData += "\n"
        }
        else
        {
            let csvData = [result_date_array[i], user_data_array[i].dietGrade, user_data_array[i].sunGrade, user_data_array[i].dietIntake + " ug", user_data_array[i].suppIntake + " ug", user_data_array[i].inputMinutes + " minutes", user_data_array[i].minutesRequired];
            
            csvData.forEach(function(row)
            {  
                outData += row + ","; 
            });
            
            outData += "\n"
        }
    }
    
    let hiddenElement = document.createElement('a');
    hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(outData);  
    hiddenElement.target = '_blank'; 
    hiddenElement.download = "VitatrackData.csv";
    hiddenElement.click();
}
