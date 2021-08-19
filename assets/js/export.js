function exportPDF(){


	var dietGrade = document.getElementById("dietGradeLabel").innerHTML;
	var sunGrade = document.getElementById("sunGradeLabel").innerHTML;
	var oralLabel = document.getElementById("oralIntakeLabel").innerHTML;
	var totalSunTime = document.getElementById("givenTime").innerHTML;
	var requiredMinutes = document.getElementById("requiredMinutes").innerHTML;



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