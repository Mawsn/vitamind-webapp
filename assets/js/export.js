let dietGrade = document.getElementById("dietGradeLabel").innerHTML;
let sunGrade = document.getElementById("sunGradeLabel").innerHTML;
let oralLabel = document.getElementById("oralIntakeLabel").innerHTML;
let totalSunTime = document.getElementById("givenTime").innerHTML;
let requiredMinutes = document.getElementById("requiredMinutes").innerHTML;

function exportPDF(){
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

    		[new Date().toISOString().slice(0, 10), dietGrade, sunGrade, oralLabel,totalSunTime,requiredMinutes],
  		],
	})
	
	doc.save('VitaTrack Tool Result.pdf')
}
function exportCSV(){
    //CSV export
    var outData = "";
    var date = new Date().toISOString().slice(0, 10); 
    let csvHeader = ['Date', 'Dietary Intake Grade', 'Sun Exposure Grade','Weekly Oral Intake','Total Time Exposed to Sun','Required Sun Exposure'];
    let csvData = [date, dietGrade, sunGrade, oralLabel,totalSunTime,requiredMinutes];
    
    
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