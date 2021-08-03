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
var vitDSupplement = sessionStorage.getItem("vitDSupplement");
if (vitDSupplement === 'true'){
    vitaminYes();
} else if (vitDSupplement === 'false'){
    vitaminNo();
}
    
function vitaminYes(){
    document.getElementById("vitD_supplement-yes").style.background = "#61AB0E";
    document.getElementById("vitD_supplement-no").style.background = "#DDDD";
    sessionStorage.setItem("vitDSupplement", true);
}
function vitaminNo(){
    document.getElementById("vitD_supplement-no").style.background = "#FF0000";
    document.getElementById("vitD_supplement-yes").style.background = "#DDDD";
    sessionStorage.setItem("vitDSupplement", false);
}
