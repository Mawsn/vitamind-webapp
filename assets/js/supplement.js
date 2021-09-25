var vitaminD_supplement_bool = false;

var boneSupplement_bool = false;

var multivitamin_supplement_bool = false;

function nextPage(pageno){
	var dosageOne;
	var dosageTwo;
	var dosageThree;


	if (pageno == 1) {
		dosageOne = document.getElementById("supplement-input-fields-one").value;

		if(dosageOne == '' || dosageOne == ' ' || dosageOne == null) {
        dosageOne = 0;
		}
    var freq = document.getElementById("vitd-supplement-frequency");
    var freqVal = freq.options[freq.selectedIndex].value;
    sessionStorage.setItem("vitDFrequency", freqVal);

    sessionStorage.setItem("dosageOne", dosageOne);
    if (sessionStorage.getItem("vitDSupplement") == null){
        alert("Please select the Yes or No button to continue");
    } else {
        location.href='tool-supplement-2.html';
    }
	}
	else if (pageno == 2) {
		dosageTwo = document.getElementById("supplement-input-fields-two").value;
		if(dosageTwo == '' || dosageTwo == ' ' || dosageOne == null) {
        dosageOne = 0;
		}
    var freq = document.getElementById("bone-supplement-frequency");
    var freqVal = freq.options[freq.selectedIndex].value;
    sessionStorage.setItem("boneFrequency", freqVal);

    sessionStorage.setItem("dosageTwo", dosageTwo);
    if (sessionStorage.getItem("boneSupplement") == null){
        alert("Please select the Yes or No button to continue");
    } else {
        location.href='tool-supplement-3.html';
    }
	}
	else if (pageno == 3) {
		dosageThree = document.getElementById("supplement-input-fields-three").value;
		if(dosageThree == '' || dosageThree == ' ' || dosageOne == null) {
            dosageOne = 0;
		}
    var freq = document.getElementById("multiVit-supplement-frequency");
    var freqVal = freq.options[freq.selectedIndex].value;
    sessionStorage.setItem("multiVitFrequency", freqVal);

    sessionStorage.setItem("dosageThree", dosageThree);
    if (sessionStorage.getItem("multiVitSupplement") == null){
        alert("Please select the Yes or No button to continue");
    } else {
        getSeason();
    }
	}
}

function getVit(){
    var vitDSupplement = sessionStorage.getItem("vitDSupplement");
    if (vitDSupplement === 'true'){
        vitaminYes();
    } else if (vitDSupplement === 'false'){
        vitaminNo();
    }
    checkSupplementForm_vitD();
}

function getBone(){
    var boneSupplement = sessionStorage.getItem("boneSupplement");
    if (boneSupplement === 'true'){
        boneYes();
    } else if (boneSupplement === 'false'){
        boneNo();
    }
    checkSupplementForm_bone();
}

function getMultiVit(){
    var multiVitSupplement = sessionStorage.getItem("multiVitSupplement");
    if (multiVitSupplement === 'true'){
        multiVitaminYes();
    } else if (multiVitSupplement === 'false'){
        multiVitaminNo();
    }
    checkSupplementForm_multivit();
}

function vitaminYes(){
    document.getElementById("vitD_supplement-yes").style.background = "#61AB0E";
    document.getElementById("vitD_supplement-no").style.background = "#DDDD";

    vitaminD_supplement_bool = true;

    sessionStorage.setItem("vitDSupplement", true);
}

function vitaminNo(){
    document.getElementById("vitD_supplement-no").style.background = "#FF0000";
    document.getElementById("vitD_supplement-yes").style.background = "#DDDD";

    vitaminD_supplement_bool = false;

    sessionStorage.setItem("vitDSupplement", false);
}

function boneYes(){
    document.getElementById("bone_supplement-yes").style.background = "#61AB0E";
    document.getElementById("bone_supplement-no").style.background = "#DDDD";

    boneSupplement_bool = true;

    sessionStorage.setItem("boneSupplement", true);
}
function boneNo(){
    document.getElementById("bone_supplement-no").style.background = "#FF0000";
    document.getElementById("bone_supplement-yes").style.background = "#DDDD";

    boneSupplement_bool = false;

    sessionStorage.setItem("boneSupplement", false);
}

function multiVitaminYes(){
    document.getElementById("multVit_supplement-yes").style.background = "#61AB0E";
    document.getElementById("multVit_supplement-no").style.background = "#DDDD";

    multivitamin_supplement_bool = true;

    sessionStorage.setItem("multiVitSupplement", true);
}
function multiVitaminNo(){
    document.getElementById("multVit_supplement-no").style.background = "#FF0000";
    document.getElementById("multVit_supplement-yes").style.background = "#DDDD";

    multivitamin_supplement_bool = false;

    sessionStorage.setItem("multiVitSupplement", false);
}


function checkSupplementForm_vitD()
{
    if(vitaminD_supplement_bool == false)
    {
        $(".supplement-form").hide();
    }
    else
    {
        $(".supplement-form").show();
    }
}

function checkSupplementForm_bone()
{
    if(boneSupplement_bool == false)
    {
        $(".supplement-form").hide();
    }
    else
    {
        $(".supplement-form").show();
    }
}

function checkSupplementForm_multivit()
{
    if(multivitamin_supplement_bool == false)
    {
        $(".supplement-form").hide();
    }
    else
    {
        $(".supplement-form").show();
    }
}

//Gets season to determine how or if sun exposure data is collected
function getSeason(){
    var date = new Date();
    var month = date.getMonth();

    //Summer is classified as months between October and March, otherwise Winter
    if ((month >= 9 && month <= 11) || (month >= 0 && month <= 2)){
        console.log("Summer");
        sessionStorage.setItem("exposureChart", "summerChart");
        sessionStorage.setItem("insufficientUV", false);
        window.location.assign('tool-sun-exposure.html');
    } else { //If not summer, take to tool-location to determine latitude
        window.location.assign("tool-location.html");

    }

}

function setSuppPic(fileNum){
    const storage = firebase.storage().ref();
    const user = firebase.auth().currentUser;
    var date = new Date();
    var formatDate = date.getDate()+'-'+(date.getMonth()+1)+'-'+date.getFullYear();
    console.log(formatDate);

    switch (fileNum){
        case 1:
            var img = document.getElementById("suppFile").files[0];
            var thisRef = storage.child('users/'+user.uid +'/VitaminSupplementFront');
            thisRef.put(img).then(function(snapshot){
                var snackBar = document.getElementById("uploadedSnackbar");
                snackBar.innerHTML = "Front Vitamin Supplement Photo Uploaded";
                snackBar.className = "show";
                setTimeout(function(){
                	snackBar.className = snackBar.className.replace("show", "");
                }, 3000);
            });
            break;
        case 2:
            var img = document.getElementById("suppFileBack").files[0];
            var thisRef = storage.child('users/'+user.uid +'/VitaminSupplementBack');
            thisRef.put(img).then(function(snapshot){
							var snackBar = document.getElementById("uploadedSnackbar");
							snackBar.innerHTML = "Back Vitamin Supplement Photo Uploaded";
							snackBar.className = "show";
							setTimeout(function(){
								snackBar.className = snackBar.className.replace("show", "");
							}, 3000);
            });
            break;
        case 3:
            var img = document.getElementById("suppFile").files[0];
            var thisRef = storage.child('users/'+user.uid +'/BoneSupplementFront');
            thisRef.put(img).then(function(snapshot){
							var snackBar = document.getElementById("uploadedSnackbar");
							snackBar.innerHTML = "Front Bone Supplement Photo Uploaded";
							snackBar.className = "show";
							setTimeout(function(){
								snackBar.className = snackBar.className.replace("show", "");
							}, 3000);
            });
            break;
        case 4:
            var img = document.getElementById("suppFileBack").files[0];
            var thisRef = storage.child('users/'+user.uid +'/BoneSupplementBack');
            thisRef.put(img).then(function(snapshot){
							var snackBar = document.getElementById("uploadedSnackbar");
							snackBar.innerHTML = "Back Bone Supplement Photo Uploaded";
							snackBar.className = "show";
							setTimeout(function(){
								snackBar.className = snackBar.className.replace("show", "");
							}, 3000);
            });
            break;
        case 5:
            var img = document.getElementById("suppFile").files[0];
            var thisRef = storage.child('users/'+user.uid +'/MultiVitSupplementFront');
            thisRef.put(img).then(function(snapshot){
							var snackBar = document.getElementById("uploadedSnackbar");
							snackBar.innerHTML = "Front Multi-Vitamin Supplement Photo Uploaded";
							snackBar.className = "show";
							setTimeout(function(){
								snackBar.className = snackBar.className.replace("show", "");
							}, 3000);
            });
            break;
        case 6:
            var img = document.getElementById("suppFileBack").files[0];
            var thisRef = storage.child('users/'+user.uid +'/MultiVitSupplementBack');
            thisRef.put(img).then(function(snapshot){
							var snackBar = document.getElementById("uploadedSnackbar");
							snackBar.innerHTML = "Back Multi-Vitamin Supplement Photo Uploaded";
							snackBar.className = "show";
							setTimeout(function(){
								snackBar.className = snackBar.className.replace("show", "");
							}, 3000);
            });
            break;
    }
}
