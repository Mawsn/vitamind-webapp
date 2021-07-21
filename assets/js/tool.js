//window.onload=getSeason();
function getSeason(){
    var date = new Date(2021,2,1);
    var month = date.getMonth();
    
    if ((month >= 8 && month <= 11) || (month == 0 || month == 1)){
        console.log("Summer");
    } else {
        console.log("Winter");
    }
}

function headFunction(){
    var checkbox = document.getElementById("headForm");
   // alert("Head Pressed");
    if (checkbox.checked == true){
        checkbox.checked = false;
    } else {
        checkbox.checked = true;
    }
    
    var headImg = document.getElementById("headImg");
    if (headImg.style.visibility == 'hidden'){
        headImg.style.visibility = 'visible';
    } else {
        headImg.style.visibility = 'hidden';
    } 
}
function torsoFunction(){
    var armImg = document.getElementById("longShirtImg");
    var upArmImg = document.getElementById("shirtImg");
    if (armImg.style.visibility == 'visible'){
        armFunction();
        return;
    } else if (upArmImg.style.visibility == 'visible'){
        upArmFunction();
        return;
    }
    
    var checkbox = document.getElementById("torsoForm");
    if (checkbox.checked == true){
        checkbox.checked = false;
    } else {
        checkbox.checked = true;
    }
    //alert("Torso pressed");
    var torsoImg = document.getElementById("singletImg");
    if (torsoImg.style.visibility == 'hidden'){
        torsoImg.style.visibility = 'visible';
    } else {
        torsoImg.style.visibility = 'hidden';
    } 
}
function upArmFunction(){
    var armImg = document.getElementById("longShirtImg");
    if (armImg.style.visibility == 'visible'){
        armFunction();
        return;
    }
    
    var checkbox = document.getElementById("upperArmForm");
    var checkbox2 = document.getElementById("torsoForm");
    if (checkbox.checked == true){
        checkbox.checked = false;
        checkbox2.checked = false;
    } else {
        checkbox.checked = true;
        checkbox2.checked = true;
    }
   // alert("Upper Arm Pressed");
    var upArmImg = document.getElementById("shirtImg");
    var torsoImg = document.getElementById("singletImg");
    if (upArmImg.style.visibility == 'hidden'){
        torsoImg.style.visibility = 'hidden';
        upArmImg.style.visibility = 'visible';
    } else {
        upArmImg.style.visibility = 'hidden';
    } 
}
function armFunction(){
    var checkbox = document.getElementById("lowerArmForm");
    var checkbox2 = document.getElementById("upperArmForm");
    var checkbox3 = document.getElementById("torsoForm");
    //should also check off upper arm and torso
    if (checkbox.checked == true){
        checkbox.checked = false;
        checkbox2.checked = false;
        checkbox3.checked = false;
    } else {
        checkbox.checked = true;
        checkbox2.checked = true;
        checkbox3.checked = true;
    }
    //alert("Arm Pressed");
    var armImg = document.getElementById("longShirtImg");
    var upArmImg = document.getElementById("shirtImg");
    var torsoImg = document.getElementById("singletImg");
    if (armImg.style.visibility == 'hidden'){
        upArmImg.style.visibility = 'hidden';
        torsoImg.style.visibility = 'hidden';
        armImg.style.visibility = 'visible';
    } else {
        armImg.style.visibility = 'hidden';
    } 
}
function handsFunction(){
    var checkbox = document.getElementById("handsForm");
   // alert("Head Pressed");
    if (checkbox.checked == true){
        checkbox.checked = false;
    } else {
        checkbox.checked = true;
    }
    
    var handsImg = document.getElementById("handsImg");
    if (handsImg.style.visibility == 'hidden'){
        handsImg.style.visibility = 'visible';
    } else {
        handsImg.style.visibility = 'hidden';
    } 
}
function legsFunction(){
    var checkbox = document.getElementById("legsForm");
    if (checkbox.checked == true){
        checkbox.checked = false;
    } else {
        checkbox.checked = true;
    }
   // alert("Legs pressed");
    var legsImg = document.getElementById("pantsImg");
    if (legsImg.style.visibility == 'hidden'){
        legsImg.style.visibility = 'visible';
    } else {
        legsImg.style.visibility = 'hidden';
    } 
}

function getSessionData(){
    alert(sessionStorage.getItem("skinExposurePerc"));
}
function setSessionData(){
    var totalPercentage = 0;

    if (!document.getElementById("headForm").checked){
      totalPercentage += 5;
    }
    if (!document.getElementById("handsForm").checked){
      totalPercentage += 5;
    }
    if (!document.getElementById("lowerArmForm").checked){
      totalPercentage += 5;
    }
    if (!document.getElementById("upperArmForm").checked){
      totalPercentage += 5;
    }
    if (!document.getElementById("legsForm").checked){
      totalPercentage += 15;
    }
    if (!document.getElementById("torsoForm").checked){
      totalPercentage += 25;
    }
    sessionStorage.setItem("skinExposurePerc", totalPercentage);
}
