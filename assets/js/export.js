function exportPDF(){
    let dietGradeExport = document.getElementById("dietGradeLabel").innerHTML;
    let sunGradeExport = document.getElementById("sunGradeLabel").innerHTML;
    let oralLabelExport = document.getElementById("oralIntakeLabel").innerHTML;
    let totalSunTimeExport = document.getElementById("givenTime").innerHTML;
    let requiredMinutesExport = document.getElementById("requiredMinutes").innerHTML;
    //PDF export 
	var doc = new jsPDF()
	var img = new Image();
	img.src = 'https://vitatrack.app/assets/img/logo-standard.png';
	doc.addImage(img, 'png', 75, 10, 57.5, 75);
	doc.text("Result Breakdown", 82, 100);
  	doc.autoTable({
  		margin: {top: 110},
  		head: [['Date', 'Dietary Intake Grade', 'Sun Exposure Grade','Weekly Oral Intake','Total Time Exposed to Sun','Required Sun Exposure']],
  		body: [

    		[new Date().toISOString().slice(0, 10), dietGradeExport, sunGradeExport, oralLabelExport,totalSunTimeExport,requiredMinutesExport],
  		],
	})
	
	doc.save('VitaTrack Tool Result.pdf')
}
function exportCSV(){
    let dietGradeExport = document.getElementById("dietGradeLabel").innerHTML;
    let sunGradeExport = document.getElementById("sunGradeLabel").innerHTML;
    let oralLabelExport = document.getElementById("oralIntakeLabel").innerHTML;
    let totalSunTimeExport = document.getElementById("givenTime").innerHTML;
    let requiredMinutesExport = document.getElementById("requiredMinutes").innerHTML;
    //CSV export
    var outData = "";
    var date = new Date().toISOString().slice(0, 10); 
    let csvHeader = ['Date', 'Dietary Intake Grade', 'Sun Exposure Grade','Weekly Oral Intake','Total Time Exposed to Sun','Required Sun Exposure'];
    let csvData = [date, dietGradeExport, sunGradeExport, oralLabelExport,totalSunTimeExport,requiredMinutesExport];
    
    
    csvHeader.forEach(function(row) {  
        outData += row + ","; 
    }); 
    outData += "\n"
    
    csvData.forEach(function(row) {  
        outData += row + ","; 
    });
    
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