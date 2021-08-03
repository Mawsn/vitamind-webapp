var x = 0;
function addFood()
{
	var original = document.getElementById('dietary-bubble-' + x);

	var clone = original.cloneNode(true);

	clone.id = "dietary-bubble-" + ++x;

	original.parentNode.appendChild(clone);
}



function removeFood()
{
	if(x > 0)
	{
		let element_removed = $("#dietary-bubble-" + x);

		$(element_removed).remove();
		--x;
	}
}

function goBack(){
    window.history.back();
}