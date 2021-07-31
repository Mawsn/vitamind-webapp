var x = 0
function addFood(){
	var original = document.getElementById('dietary-bubble-' + x);
	var clone = original.cloneNode(true);
	clone.id = "dietary-bubble-" + ++x;
	original.parentNode.appendChild(clone);
}