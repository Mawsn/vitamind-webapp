function exportPDF(){
    let dietGradeExport = document.getElementById("dietGradeLabel").innerHTML;
    let oralLabelExport = Number(sessionStorage.getItem("dietaryIntake_result"));//document.getElementById("oralIntakeLabel").innerHTML;
    var suppDoseExport = Number(sessionStorage.getItem("totalSupplementDosage"));
    let totalSunTimeExport = document.getElementById("givenTime").innerHTML;
    //PDF export 
	var doc = new jsPDF()
	var img = new Image();
	img.src = 'https://vitatrack.app/assets/img/logo-standard.png';
	doc.addImage(img, 'png', 75, 10, 57.5, 75);
	doc.text("Result Breakdown", 82, 100);
    var insufficientUV = sessionStorage.getItem("insufficientUV");
    if (insufficientUV == 'true'){ //Does not need to export some data if it does not exist
        doc.autoTable({
  		margin: {top: 110},
  		head: [['Date', 'Dietary Intake Grade','Weekly Oral Intake','Supplement Intake','Total Time Exposed to Sun']],
  		body: [
    		[new Date().toISOString().slice(0, 10), dietGradeExport, oralLabelExport.toFixed(2)+'ug',suppDoseExport.toFixed(2)+'ug',totalSunTimeExport],
  		],
	})
        
    } else {
        let sunGradeExport = sessionStorage.getItem("sunGrade");//document.getElementById("sunGradeLabel").innerHTML;
        let requiredMinutesExport = sessionStorage.getItem("recommendedMinutes")+" minutes."//document.getElementById("requiredMinutes").innerHTML;
        
        doc.autoTable({
  		margin: {top: 110},
  		head: [['Date', 'Dietary Intake Grade', 'Sun Exposure Grade','Weekly Oral Intake','Supplement Intake','Total Time Exposed to Sun','Required Sun Exposure']],
  		body: [

    		[new Date().toISOString().slice(0, 10), dietGradeExport, sunGradeExport, oralLabelExport.toFixed(2)+'ug',suppDoseExport.toFixed(2)+'ug',totalSunTimeExport,requiredMinutesExport],
  		],
	})
    }
	
	doc.save('VitaTrack Tool Result.pdf')
}
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

function openExportMenu(){
    document.getElementById('popup-export-menu').style.display = 'block';
    window.scrollTo({top: 0, behavior: 'smooth'});
}
function closeExportMenu(){
    document.getElementById('popup-export-menu').style.display = 'none';
}