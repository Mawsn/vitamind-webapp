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
    window.location.assign("tool-skin-tone.html");
}


// functions for check and 'X' button
function goToDetailedForm()
{
    window.location.assign("tool-dietary-detailed-form.html");
}

function goToSimpleForm()
{
    window.location.assign("tool-dietary.html");
}



// An array of objects for the available products and their details
var productObj_array = [
    {
        // the group of dietary products that belong to fats start from here
        product_name: "butter",
        serving_size: 5,
        serving_unit: "g",
        vitaminD_per_serve: 0.03,
        group_of_dietary_product: "fats"
    },
    {
        product_name: "margarine",
        serving_size: 5,
        serving_unit: "g",
        vitaminD_per_serve: 0.6,
        group_of_dietary_product: "fats"
    },
    {
        // the group of dietary products that belong to eggs start from here
        product_name: "egg",
        serving_size: 50,
        serving_unit: "g",
        vitaminD_per_serve: 0.9,
        group_of_dietary_product: "eggs"
    },
    {
        // the group of dietary products that belong to milk and milk based beverages start from here
        product_name: "full cream cow's milk",
        serving_size: 250,
        serving_unit: "g",
        vitaminD_per_serve: 0.13,
        group_of_dietary_product: "milk and milk based beverages"
    },
    {
        product_name: "milk based coffee on full cream latte, cappuccino etc",
        serving_size: 250,
        serving_unit: "g",
        vitaminD_per_serve: 0.13,
        group_of_dietary_product: "milk and milk based beverages"
    },
    {
        product_name: "other full cream milk based beverages chai latte, milkshake, iced coffee",
        serving_size: 250,
        serving_unit: "g",
        vitaminD_per_serve: 0.13,
        group_of_dietary_product: "milk and milk based beverages"
    },
    {
        product_name: "milo made on full cream milk",
        serving_size: 250,
        serving_unit: "g",
        vitaminD_per_serve: 2.72,
        group_of_dietary_product: "milk and milk based beverages"
    },
    {
        // the group of dietary products that belong to sea food start from here
        product_name: "tuna",
        serving_size: 70,
        serving_unit: "g",
        vitaminD_per_serve: 1.5,
        group_of_dietary_product: "sea food"
    },
    {
        product_name: "salmon",
        serving_size: 100,
        serving_unit: "g",
        vitaminD_per_serve: 5.24,
        group_of_dietary_product: "sea food"
    },
    {
        product_name: "barramundi",
        serving_size: 100,
        serving_unit: "g",
        vitaminD_per_serve: 3.94,
        group_of_dietary_product: "sea food"
    },
    {
        product_name: "sardines",
        serving_size: 125,
        serving_unit: "g",
        vitaminD_per_serve: 5.6,
        group_of_dietary_product: "sea food"
    },
    {
        // the group of dietary products that belong to meat start from here
        product_name: "pork",
        serving_size: 100,
        serving_unit: "g",
        vitaminD_per_serve: 0.6,
        group_of_dietary_product: "meat"
    },
    {
        product_name: "chicken",
        serving_size: 100,
        serving_unit: "g",
        vitaminD_per_serve: 0.37,
        group_of_dietary_product: "meat"
    },
    {
        product_name: "beef",
        serving_size: 100,
        serving_unit: "g",
        vitaminD_per_serve: 0.7,
        group_of_dietary_product: "meat"
    },
    {
        product_name: "lamb",
        serving_size: 100,
        serving_unit: "g",
        vitaminD_per_serve: 0.44,
        group_of_dietary_product: "meat"
    },
    {
        // the group of dietary products that belong to chocolate start from here
        product_name: "dark chocolate",
        serving_size: 25,
        serving_unit: "g",
        vitaminD_per_serve: 0.8,
        group_of_dietary_product: "chocolate"
    }
]



// this function will check which dietary product the user has selected from the array of objects
var selected_product_array_index;

function checkSelectedOption(option_value)
{
    // for fats
	if(option_value > 2 && option_value <= 4)
	{
		// check which fat product the user has selected
		if(option_value == 3)
		{
			selected_product_array_index = 0;
		}

		if(option_value == 4)
		{
			selected_product_array_index = 1;
		}
	}

    // for eggs
	if(option_value == 6)
	{
		// check which eggs product the user has selected
		if(option_value == 6)
		{
			selected_product_array_index = 2;
		}
	}

    // for milk based products
	if(option_value > 7 && option_value <= 11)
	{
		// check which milk based product the user has selected
		if(option_value == 8)
		{
			selected_product_array_index = 3;
		}

		if(option_value == 9)
		{
			selected_product_array_index = 4;
		}

		if(option_value == 10)
		{
			selected_product_array_index = 5;
		}

		if(option_value == 11)
		{
			selected_product_array_index = 6;
		}
	}

    // for sea food
	if(option_value > 12 && option_value <= 16)
	{
		// check which sea food product the user has selected
		if(option_value == 13)
		{
			selected_product_array_index = 7;
		}

		if(option_value == 14)
		{
			selected_product_array_index = 8;
		}

		if(option_value == 15)
		{
			selected_product_array_index = 9;
		}

		if(option_value == 16)
		{
			selected_product_array_index = 10;
		}
	}

    // for meat
	if(option_value > 17 && option_value <= 21)
	{
		// check which meat product the user has selected
		if(option_value == 18)
		{
            selected_product_array_index = 11;
		}

		if(option_value == 19)
		{
			selected_product_array_index = 12;
		}

		if(option_value == 20)
		{
			selected_product_array_index = 13;
		}

		if(option_value == 21)
		{
			selected_product_array_index = 14;
		}
	}

    // for dark chocolate
	if(option_value > 22 && option_value <= 23)
	{
		// check which dark chocolate product the user has selected
		if(option_value == 23)
		{
			selected_product_array_index = 15;
		}
	}
    
}


// this function is for the servings per week input field
var servingsPerWeek_userInput;

function checkServingsPerWeek(entered_value)
{
	servingsPerWeek_userInput = entered_value;
}


// this function will perform the dietary calculations
var vitD_fromDietaryIntake;
var total_vitD_calculated = 0;

function dietaryCalculations()
{
    for(let loop_counter = 0; loop_counter <= dietary_bubble_counter; loop_counter++)
    {
        checkSelectedOption(document.getElementById('dietary-top-input-' + loop_counter).value);
        checkServingsPerWeek(document.getElementById('dietary-bottom-input-' + loop_counter).value);
        
        // correct formula
        vitD_fromDietaryIntake = servingsPerWeek_userInput * productObj_array[selected_product_array_index].vitaminD_per_serve;
    
        total_vitD_calculated = total_vitD_calculated + vitD_fromDietaryIntake;
    }
    

    setDietaryIntake_sessionData();

    // reset values
    total_vitD_calculated = 0;

    console.log("Value stored in session storage: " + sessionStorage.getItem("dietaryIntake_result"))
    
}

// for simplified form
function saveData(){
    var age = document.getElementById('age_Input_Field').value;
    if (age != ''){
        sessionStorage.setItem('age', age);

        let foodItem = document.getElementById("dietary-top-input-0").selectedIndex;
        let servingField = Number(document.getElementById("dietary-bottom-input-0").value);
        if (foodItem == 0 && servingField != 0){
            alert("You have entered servings per week, but not selected a food item. Please enter a value to continue");
        } else if (foodItem != 0 && servingField == 0){
            alert("You have selected a food item, but not entered your amount of servings. Please enter a value to continue");
        } else if (foodItem == 0 && servingField == 0){
            var emptyDietary = confirm("You have not entered any data for your dietary consumption. Are you sure you want to continue?");
            if (emptyDietary){
                sessionStorage.setItem("dietaryIntake_result", 0.0);
                window.location.assign("tool-supplement-1.html");
            }
        } else {
            dietaryCalculations();
            //window.location.assign("tool-supplement-1.html");
        }
        
    } else {
        alert("Please enter your age");
    }
}

// for detailed form
function saveData_detailedForm(){
    var age = document.getElementById('age_Input_Field').value;

    if (age != '')
    {
        sessionStorage.setItem('age', age);

        
        dietaryCalculations_forDetailedForm();
        //window.location.assign("tool-supplement-1.html");
    } 
    else 
    {
        alert("Please enter your age");
    }
}


// for session storage for the simplified form
function setDietaryIntake_sessionData()
{
	// set the result of the dietary calculations
	sessionStorage.setItem("dietaryIntake_result", total_vitD_calculated);
}


// for detailed form
function dietaryCalculations_forDetailedForm()
{
    let temp_servings_per_week;

    for(let loop_counter = 0; loop_counter <= 15; loop_counter++)
    {
        if((document.getElementById('dietary-detailed-form-servings-input-' + loop_counter).value) == '')
        {
            document.getElementById('dietary-detailed-form-servings-input-' + loop_counter).value = 0;

            temp_servings_per_week = 0;
            total_vitD_calculated = total_vitD_calculated + (temp_servings_per_week * productObj_array[loop_counter].vitaminD_per_serve);
        }
        else
        {
            temp_servings_per_week = document.getElementById('dietary-detailed-form-servings-input-' + loop_counter).value;
            total_vitD_calculated = total_vitD_calculated + (temp_servings_per_week * productObj_array[loop_counter].vitaminD_per_serve);
        }
    }

    setDietaryIntake_sessionData();

    // reset values
    total_vitD_calculated = 0;

    console.log("Value stored in session storage: " + sessionStorage.getItem("dietaryIntake_result"))
}
