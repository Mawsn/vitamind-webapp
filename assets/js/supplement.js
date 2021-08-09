// for tool-supplement-1.html pages
/*$(document).ready(function()
{
    $("#vitD_supplement-yes").hover(function()
    {
        $(this).css("background", "#61AB0E");
    }, function()
    {
        $(this).css("background", "#DDDD");
    })
});

$(document).ready(function()
{
    $("#vitD_supplement-no").hover(function()
    {
        $(this).css("background", "#FF0000");
    }, function()
    {
        $(this).css("background", "#DDDD");
    })
}); */

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
			//alert("Invalid dosage amount.");
            dosageOne = 0;
		}
		//else {
        sessionStorage.setItem("dosageOne", dosageOne);
        if (sessionStorage.getItem("vitDSupplement") == null){
            alert("Please select the Yes or No button to continue");
        } else {
            location.href='tool-supplement-2.html';
        }
        
		//} 
		
	} 
	else if (pageno == 2) {
		dosageTwo = document.getElementById("supplement-input-fields-two").value;
		if(dosageTwo == '' || dosageTwo == ' ' || dosageOne == null) {
			//alert("Invalid dosage amount.");
            dosageOne = 0;
		}
		//else {
        sessionStorage.setItem("dosageTwo", dosageTwo);
        if (sessionStorage.getItem("boneSupplement") == null){
            alert("Please select the Yes or No button to continue");
        } else {
            location.href='tool-supplement-3.html';
        }
			
		//}
	}
	else if (pageno == 3) {
		dosageThree = document.getElementById("supplement-input-fields-three").value;
		if(dosageThree == '' || dosageThree == ' ' || dosageOne == null) {
			//alert("Invalid dosage amount.");
            dosageOne = 0;
		}
		//else {
        sessionStorage.setItem("dosageThree", dosageThree);
        if (sessionStorage.getItem("multiVitSupplement") == null){
            alert("Please select the Yes or No button to continue");
        } else {
            location.href='tool-sun-exposure.html';
        }
        
		//}
	}
}

function getVit(){
    var vitDSupplement = sessionStorage.getItem("vitDSupplement");
    if (vitDSupplement === 'true'){
        vitaminYes();
    } else if (vitDSupplement === 'false'){
        vitaminNo();
    }
}

function getBone(){
    var boneSupplement = sessionStorage.getItem("boneSupplement");
    if (boneSupplement === 'true'){
        boneYes();
    } else if (boneSupplement === 'false'){
        boneNo();
    }
}

function getMultiVit(){
    var multiVitSupplement = sessionStorage.getItem("multiVitSupplement");
    console.log("multiVitSupplement");
    if (multiVitSupplement === 'true'){
        multiVitaminYes();
    } else if (multiVitSupplement === 'false'){
        multiVitaminNo();
    }
}
    
function vitaminYes(){
    document.getElementById("vitD_supplement-yes").style.background = "#61AB0E";
    document.getElementById("vitD_supplement-no").style.background = "#DDDD";
    console.log("vit yes");

    vitaminD_supplement_bool = true;
    
    sessionStorage.setItem("vitDSupplement", true);
}

function vitaminNo(){
    document.getElementById("vitD_supplement-no").style.background = "#FF0000";
    document.getElementById("vitD_supplement-yes").style.background = "#DDDD";
    console.log("vit no");

    vitaminD_supplement_bool = false;

    sessionStorage.setItem("vitDSupplement", false);
}

function boneYes(){
    document.getElementById("bone_supplement-yes").style.background = "#61AB0E";
    document.getElementById("bone_supplement-no").style.background = "#DDDD";
    console.log("bone yes");

    boneSupplement_bool = true;

    sessionStorage.setItem("boneSupplement", true);
}
function boneNo(){
    document.getElementById("bone_supplement-no").style.background = "#FF0000";
    document.getElementById("bone_supplement-yes").style.background = "#DDDD";
    console.log("mult no");

    boneSupplement_bool = false;

    sessionStorage.setItem("boneSupplement", false);
}

function multiVitaminYes(){
    document.getElementById("multVit_supplement-yes").style.background = "#61AB0E";
    document.getElementById("multVit_supplement-no").style.background = "#DDDD";
    console.log("mult yes");

    multivitamin_supplement_bool = true;

    sessionStorage.setItem("multiVitSupplement", true);
}
function multiVitaminNo(){
    document.getElementById("multVit_supplement-no").style.background = "#FF0000";
    document.getElementById("multVit_supplement-yes").style.background = "#DDDD";
    console.log("mult no");

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