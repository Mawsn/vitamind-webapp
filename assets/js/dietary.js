var dietary_bubble_counter = 0;
var select_tag_counter = 0;
var input_tag_counter = 0;


function addFood()
{
	var original = document.getElementById('dietary-bubble-' + dietary_bubble_counter);

	var clone = original.cloneNode(true);

	clone.id = "dietary-bubble-" + ++dietary_bubble_counter;

	clone.getElementsByTagName('select')[0].id = "dietary-top-input-" + ++select_tag_counter;
	clone.getElementsByTagName('input')[0].id = "dietary-bottom-input-" + ++input_tag_counter;

	// to reset the value of this input field
	clone.getElementsByTagName('input')[0].value = "";

	original.parentNode.appendChild(clone);
}



function removeFood()
{
	if(dietary_bubble_counter > 0 && select_tag_counter > 0 && input_tag_counter > 0)
	{
		let select_removed = $("#dietary-top-input-" + select_tag_counter);
		$(select_removed).remove();
		--select_tag_counter;

		let input_removed = $("#dietary-bottom-input-" + input_tag_counter);
		$(input_removed).remove();
		--input_tag_counter;

		let element_removed = $("#dietary-bubble-" + dietary_bubble_counter);
		$(element_removed).remove();
		--dietary_bubble_counter;
	}
}

function goBack(){
    window.history.back();
}


// variables to store boolean values used to check whether the form is complete
var dietary_top_field_bool;
var dietary_bottom_field_bool;

var product_groupName;	// this variable will store the name of the document from firestore
var mapValue;			// this variable will store the name of the map present in the document

var name_fromFirestore;
var servingSize_fromFirestore;		// this variable will store the retrieved servingSize value from the firestore
var vitDPerServe_fromFirestore;		// this variable will store the retrieved vitaminD_perServe value from firestore

var db;
var groupOfDietaryProductsRef;

// arrays
var vitDPerServe_values_array = [];
var servingsPerWeek_userInput_values_array = [];

var product_groupName_array = [];
var mapValue_array = [];


function getFirestoreData(temp_loop_counter)
{
	// code needed to retrieve data from firestore
	db = firebase.firestore();

	// after all the if statements, the value for product_groupName is stored
	groupOfDietaryProductsRef = db.collection("groupOfDietaryProducts").doc(product_groupName_array[temp_loop_counter]);
	groupOfDietaryProductsRef.get()
	.then((doc) =>
	{
		if (doc.exists)
		{
			var data_from_doc = doc.data();

			// retrieve the requried data from firestore
			name_fromFirestore = data_from_doc[mapValue_array[temp_loop_counter]]["name"];
			servingSize_fromFirestore = data_from_doc[mapValue_array[temp_loop_counter]]["servingSize"];
			vitDPerServe_fromFirestore = data_from_doc[mapValue_array[temp_loop_counter]]["vitaminD_perServe"];

			// push retrieved vitamin D per serve value inside the array
			vitDPerServe_values_array.push(vitDPerServe_fromFirestore);
			console.log("Value inside array: " + vitDPerServe_values_array[temp_loop_counter] + ", for loop number: " + temp_loop_counter);


			checkServingsPerWeek(document.getElementById('dietary-bottom-input-' + temp_loop_counter).value);

			console.log(document.getElementById('dietary-top-input-' + temp_loop_counter).value + ", " + document.getElementById('dietary-bottom-input-' + temp_loop_counter).value);

			console.log("Loop number: " + temp_loop_counter);
			console.log("vitDPerServe_fromFirestore value: " + vitDPerServe_values_array[temp_loop_counter]);
			console.log("servingsPerWeek_userInput value: " + servingsPerWeek_userInput_values_array[temp_loop_counter]);

			dietaryCalculations(temp_loop_counter);

			total_vitD = total_vitD + vitD_fromDietaryIntake;

			if(temp_loop_counter == dietary_bubble_counter)
			{
				console.log("total_vitD value: " + total_vitD);

				setDietaryIntake_sessionData();

				// testing
				console.log("session storage 'dietaryIntake_result' value: " + sessionStorage.getItem("dietaryIntake_result"));

				// reset the total_vitD value
				total_vitD = 0;
				//reset the array
				for(let count = 0; count <= temp_loop_counter; count++)
				{
					vitDPerServe_values_array.pop();
					servingsPerWeek_userInput_values_array.pop();
					product_groupName_array.pop();
					mapValue_array.pop();
				}
			}
			
		}
		else
		{
			console.log("Document does not exist");
		}
	})
	.catch((error) =>
	{
		console.log("Error in retrieving", error);
	});
}



function checkSelectedOption(option_value, temp_loop_counter)
{
	// for fats
	if(option_value > 2 && option_value <= 4)
	{
		// checking
		console.log("fats");

		product_groupName = "fats";

		// check which fat product the user has selected
		if(option_value == 3)
		{
			// set map value
			mapValue = "product_1";
		}

		if(option_value == 4)
		{
			// set map value
			mapValue = "product_2";
		}
	}

	// for eggs
	if(option_value == 6)
	{
		// checking
		console.log("eggs");

		product_groupName = "eggs";

		// check which fat product the user has selected
		if(option_value == 6)
		{
			// set map value
			mapValue = "product_1";
		}
	}

	// for milk based products
	if(option_value > 7 && option_value <= 11)
	{
		// checking
		console.log("milk products");

		product_groupName = "milk_and_milkBasedBeverages";

		// check which fat product the user has selected
		if(option_value == 8)
		{
			// set map value
			mapValue = "product_1";
		}

		if(option_value == 9)
		{
			// set map value
			mapValue = "product_2";
		}

		if(option_value == 10)
		{
			// set map value
			mapValue = "product_3";
		}

		if(option_value == 11)
		{
			// set map value
			mapValue = "product_4";
		}
	}
	
	// for sea food
	if(option_value > 12 && option_value <= 16)
	{
		// checking
		console.log("sea food");

		product_groupName = "seaFood";

		// check which fat product the user has selected
		if(option_value == 13)
		{
			// set map value
			mapValue = "product_1";
		}

		if(option_value == 14)
		{
			// set map value
			mapValue = "product_2";
		}

		if(option_value == 15)
		{
			// set map value
			mapValue = "product_3";
		}

		if(option_value == 16)
		{
			// set map value
			mapValue = "product_4";
		}
	}

	// for meat
	if(option_value > 17 && option_value <= 21)
	{
		// checking
		console.log("meat");

		product_groupName = "meat";

		// check which fat product the user has selected
		if(option_value == 18)
		{
			// set map value
			mapValue = "product_1";
		}

		if(option_value == 19)
		{
			// set map value
			mapValue = "product_2";
		}

		if(option_value == 20)
		{
			// set map value
			mapValue = "product_3";
		}

		if(option_value == 21)
		{
			// set map value
			mapValue = "product_4";
		}
	}

	// for dark chocolate
	if(option_value > 22 && option_value <= 23)
	{
		// checking
		console.log("chocolate");

		product_groupName = "chocolate";

		// check which fat product the user has selected
		if(option_value == 23)
		{
			// set map value
			mapValue = "product_1";
		}
	}

    // insert values into array
	product_groupName_array.push(product_groupName);
    mapValue_array.push(mapValue);


	getFirestoreData(temp_loop_counter);
}


// this funciton is for the servings per week input field
var servingsPerWeek_userInput;

function checkServingsPerWeek(entered_value)
{
	servingsPerWeek_userInput = entered_value;

	servingsPerWeek_userInput_values_array.push(servingsPerWeek_userInput);
}

// this function will perform the dietary calculations
var vitD_fromDietaryIntake;
var dietaryIntakeCalculation_bool;

function dietaryCalculations(temp_loop_counter)
{
	// correct formula
	vitD_fromDietaryIntake = servingsPerWeek_userInput_values_array[temp_loop_counter] * vitDPerServe_values_array[temp_loop_counter];

	// checking
	console.log("Calculated vitamin D from dietary intake: " + vitD_fromDietaryIntake + ", Loop counter: " + temp_loop_counter);

}

// for session storage
function setDietaryIntake_sessionData()
{
	// set the result of the dietary calculations
	sessionStorage.setItem("dietaryIntake_result", total_vitD);
}

function saveData(){
    var age = document.getElementById('age_Input_Field').value;
    if (age != ''){
        sessionStorage.setItem('age', age);
        
        var foodItem = document.getElementById("dietary-top-input").selectedIndex;
        var servingField = Number(document.getElementById("dietary-bottom-input").value);
        if (foodItem == 0 && servingField != 0){
            alert("You have entered servings per week, but not selected a food item. Please enter a value to continue");
        } else if (foodItem != 0 && servingField == 0){
            alert("You have selected a food item, but not entered your amount of servings. Please enter a value to continue");
        } else {
            window.location.assign("tool-supplement-1.html");
        }
        
    } else {
        alert("Please enter your age");
    }
}


// function for test button
var total_vitD = 0;
function testButton()
{
	for(let loop_counter = 0; loop_counter <= dietary_bubble_counter; loop_counter++)
	{
		console.log("TESTING FIRST: " + document.getElementById('dietary-top-input-' + loop_counter).value);
		checkSelectedOption(document.getElementById('dietary-top-input-' + loop_counter).value, loop_counter);
	}


	// check loop
	console.log("TEST LOOP: testButton()");
	
}

