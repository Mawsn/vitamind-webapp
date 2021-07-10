function expandMenu(){
	var x = document.getElementById("menu-fragment");
	if (x.style.display === "block") {
		x.style.display = "none";
	} 
	else {
	    x.style.display = "block";
	}
}
window.addEventListener('resize', function(event) {
    if(window.innerWidth >= 767){
        document.getElementById("menu-fragment").style.display = "none";
    }
}, true);