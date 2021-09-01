// variables
var selected_menu_item_id;
var insufficientUV;



// this works, other than the if condition related to the insufficientUV part, hence that part is commented out
function exportPDF()
{
    let resultDate =  document.getElementById("historyResultLabel-0").innerHTML;
    let dietGradeExport = document.getElementById("historyResultLabel-2").innerHTML;
    let oralLabelExport = document.getElementById("historyResultLabel-5").innerHTML
    var suppDoseExport = document.getElementById("historyResultLabel-6").innerHTML
    let totalSunTimeExport = document.getElementById("historyResultLabel-7").innerHTML;

    //PDF export 
	var doc = new jsPDF()
	var img = new Image();
	img.src = 'https://vitatrack.app/assets/img/logo-standard.png';
	doc.addImage(img, 'png', 75, 10, 57.5, 75);
	doc.text("Result Breakdown", 82, 100);
    // var insufficientUV = sessionStorage.getItem("insufficientUV");

    // To make this part functional, I think we might need to first store this value in firestore
    if (insufficientUV == 'true')
    { //Does not need to export some data if it does not exist
        doc.autoTable
        ({
            margin: {top: 110},
            head: [['Date', 'Dietary Intake Grade','Weekly Oral Intake','Supplement Intake','Total Time Exposed to Sun']],
            body: 
            [
                [resultDate, dietGradeExport, oralLabelExport, suppDoseExport, totalSunTimeExport],
            ],
        })
    } 
    else 
    {
        let sunGradeExport = document.getElementById("historyResultLabel-3").innerHTML;
        let requiredMinutesExport = document.getElementById("historyResultLabel-8").innerHTML;
        
        doc.autoTable
        ({
            margin: {top: 110},
            head: [['Date', 'Dietary Intake Grade', 'Sun Exposure Grade','Weekly Oral Intake','Supplement Intake','Total Time Exposed to Sun','Required Sun Exposure']],
            body:
            [

                [resultDate, dietGradeExport, sunGradeExport, oralLabelExport, suppDoseExport, totalSunTimeExport, requiredMinutesExport],
            ],
        })
    }
	
	doc.save('VitaTrack Tool Result.pdf')
}


// Did not change this function to make it work on history page yet
function exportCSV(){
    let dietGradeExport = document.getElementById("dietGradeLabel").innerHTML;
    let oralLabelExport = Number(sessionStorage.getItem("dietaryIntake_result"));//document.getElementById("oralIntakeLabel").innerHTML;
    var suppDoseExport = Number(sessionStorage.getItem("totalSupplementDosage"));
    let totalSunTimeExport = document.getElementById("givenTime").innerHTML;
    //CSV export
    var outData = "";
    var date = new Date().toISOString().slice(0, 10); 
    
    var insufficientUV = sessionStorage.getItem("insufficientUV");
    if (insufficientUV == 'true'){ //Does not need to export some data if it does not exist
        let csvHeader = ['Date', 'Dietary Intake Grade','Weekly Oral Intake','Supplement Intake','Total Time Exposed to Sun'];
        let csvData = [date, dietGradeExport, oralLabelExport.toFixed(2)+'ug',suppDoseExport.toFixed(2)+'ug',totalSunTimeExport];


        csvHeader.forEach(function(row) {  
            outData += row + ","; 
        }); 
        outData += "\n"

        csvData.forEach(function(row) {  
            outData += row + ","; 
        });
        
    } else {
        let sunGradeExport = sessionStorage.getItem("sunGrade");//document.getElementById("sunGradeLabel").innerHTML;
        let requiredMinutesExport = sessionStorage.getItem("recommendedMinutes")+" minutes."//document.getElementById("requiredMinutes").innerHTML;
        
        let csvHeader = ['Date', 'Dietary Intake Grade', 'Sun Exposure Grade','Weekly Oral Intake','Supplement Intake','Total Time Exposed to Sun','Required Sun Exposure'];
        let csvData = [date, dietGradeExport, sunGradeExport, oralLabelExport.toFixed(2)+'ug',suppDoseExport.toFixed(2)+'ug',totalSunTimeExport,requiredMinutesExport];


        csvHeader.forEach(function(row) {  
            outData += row + ","; 
        }); 
        outData += "\n"

        csvData.forEach(function(row) {  
            outData += row + ","; 
        });
    }
    
    let hiddenElement = document.createElement('a');
    hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(outData);  
    hiddenElement.target = '_blank'; 
    hiddenElement.download = "VitatrackData.csv";
    hiddenElement.click();
}



function openExportMenu()
{
    // get some values that are read from firebase


    document.getElementById('popup-export-menu').style.display = 'block';
    window.scrollTo({top: 0, behavior: 'smooth'});
}



function closeExportMenu()
{
    document.getElementById('popup-export-menu').style.display = 'none';
}



function storeFirebaseData(temp_id, insufficientUV_temp)
{
    selected_menu_item_id = temp_id;
    insufficientUV = insufficientUV_temp;
}
