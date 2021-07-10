//Window resize listener is used to automatically close the mobile menu when the window becomes desktop sized 
window.addEventListener('resize', function(event) {
    if(window.innerWidth >= 767){
        document.getElementById("menu-fragment").style.display = "none";
    }
}, true);
//JQuery, used to handle the opening and closing of the mobile menu 
$(document).ready(function(){
  	$("#mobile-menu-icon").click(function(){
    	$("#menu-fragment").slideToggle("slow");
  	});
});