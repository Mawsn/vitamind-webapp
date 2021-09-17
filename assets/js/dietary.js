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


// functions for check and 'X' button and to keep entered information between pages
function goToDetailedForm() {

    //removes any previous session storage data
    sessionStorage.removeItem('Butter_Value');
    sessionStorage.removeItem('Margarine_Value');
    sessionStorage.removeItem('Egg_Value');
    sessionStorage.removeItem('Milk_Glass_Value');
    sessionStorage.removeItem('Milk_Coffee_Value');
    sessionStorage.removeItem('Other_Full_Milk_Value');
    sessionStorage.removeItem('Milo_Value');
    sessionStorage.removeItem('Tuna_Value');
    sessionStorage.removeItem('Salmon_Value');
    sessionStorage.removeItem('Barramundi_Value');
    sessionStorage.removeItem('Sardines_Value');
    sessionStorage.removeItem('Pork_Value');
    sessionStorage.removeItem('Chicken_Value');
    sessionStorage.removeItem('Beef_Value');
    sessionStorage.removeItem('Lamb_Value');
    sessionStorage.removeItem('Dark_Choc_Value');


    //sets up the elements to be used for the function
    var element;
    var bubble_ID;
    var food_ID;

    //for loop to go through the dietary bubbles
    for (let i = 0; i < 16; i++) {
        bubble_ID = "dietary-top-input-" + i;
        food_ID = "dietary-bottom-input-" + i;
        element = document.getElementById(bubble_ID);

        //check if the bubble exists
        if (typeof(element) != 'undefined' && element != null) {
            //switch case to determine what product the data was entered for and then storing the amount.
            switch (document.getElementById(bubble_ID).value) {
                case "3":
                    sessionStorage.setItem("Butter_Value", document.getElementById(food_ID).value);
                    break;
                case "4":
                    sessionStorage.setItem("Margarine_Value", document.getElementById(food_ID).value);
                    break;
                case "6":
                    sessionStorage.setItem("Egg_Value", document.getElementById(food_ID).value);
                    break;
                case "8":
                    sessionStorage.setItem("Milk_Glass_Value", document.getElementById(food_ID).value);
                    break;
                case "9":
                    sessionStorage.setItem("Milk_Coffee_Value", document.getElementById(food_ID).value);
                    break;
                case "10":
                    sessionStorage.setItem("Other_Full_Milk_Value", document.getElementById(food_ID).value);
                    break;
                case "11":
                    sessionStorage.setItem("Milo_Value", document.getElementById(food_ID).value);
                case "13":
                    sessionStorage.setItem("Tuna_Value", document.getElementById(food_ID).value);
                    break;
                case "14":
                    sessionStorage.setItem("Salmon_Value", document.getElementById(food_ID).value);
                    break;
                case "15":
                    sessionStorage.setItem("Barramundi_Value", document.getElementById(food_ID).value);
                    break;
                case "16":
                    sessionStorage.setItem("Sardines_Value", document.getElementById(food_ID).value);
                    break;
                case "18":
                    sessionStorage.setItem("Pork_Value", document.getElementById(food_ID).value);
                    break;
                case "19":
                    sessionStorage.setItem("Chicken_Value", document.getElementById(food_ID).value);
                    break;
                case "20":
                    sessionStorage.setItem("Beef_Value", document.getElementById(food_ID).value);
                case "21":
                    sessionStorage.setItem("Lamb_Value", document.getElementById(food_ID).value);
                    break;
                case "23":
                    sessionStorage.setItem("Dark_Choc_Value", document.getElementById(food_ID).value);
                default:
                    break;
            }
            //break for when the last bubble has been reached
        } else {
            break;
        }
    }

    //stores the entered age
    sessionStorage.setItem("stored_Age", document.getElementById("age_Input_Field").value);

    //sends the user to the detailed dietary form.
    window.location.assign("tool-dietary-detailed-form.html");
}

function goToSimpleForm() {

    //removes any previous session storage data
    sessionStorage.removeItem('Value_0');
    sessionStorage.removeItem('Value_1');
    sessionStorage.removeItem('Value_2');
    sessionStorage.removeItem('Value_3');
    sessionStorage.removeItem('Value_4');
    sessionStorage.removeItem('Value_5');
    sessionStorage.removeItem('Value_6');
    sessionStorage.removeItem('Value_7');
    sessionStorage.removeItem('Value_8');
    sessionStorage.removeItem('Value_9');
    sessionStorage.removeItem('Value_10');
    sessionStorage.removeItem('Value_11');
    sessionStorage.removeItem('Value_12');
    sessionStorage.removeItem('Value_13');
    sessionStorage.removeItem('Value_14');
    sessionStorage.removeItem('Value_15');


    var food_Input_ID;
    var Value_ID;
    var count = 0;

    for (let i = 0; i < 16; i++) {
        food_Input_ID = "dietary-detailed-form-servings-input-" + i;
        Value_ID = "Value_" + i;
        if (document.getElementById(food_Input_ID).value != "") {
            sessionStorage.setItem(Value_ID, document.getElementById(food_Input_ID).value);
            count++;
        }
    }
    count = count - 1;
    sessionStorage.setItem("counter", count);
    sessionStorage.setItem("stored_Age", document.getElementById("age_Input_Field").value);

    window.location.assign("tool-dietary.html");
}

function loadSimpleForm() {

    //sets the age to a stored age from the detailed form
    document.getElementById('age_Input_Field').value = sessionStorage.getItem('stored_Age');

    //sets up variables to be used in the function
    var Value_ID;
    var Input_ID = 0;
    var top_Value;
    var bottom_Value;

    //for loop for adding in the correct amount of dietary bubbles
    for (let i = 0; i < sessionStorage.getItem('counter'); i++) {
        addFood();
    }
    //for loop for cycling through and checking whether there is stored data
    for (let i = 0; i < 17; i++) {
        //these variables set up the addresses that are used in the session storage
        Value_ID = 'Value_' + i;
        top_Value = "dietary-top-input-" + Input_ID;
        bottom_Value = "dietary-bottom-input-" + Input_ID;

        //checking whether the stored data has any entered value or is just empty
        if ((sessionStorage.getItem(Value_ID)) != "") {
            //if it has data stored it will see which case it fits and then will enter the correct title and 
            //serving size into the bubble and then push the input bubble id counter to the next one
            switch (i) {
                case 0:
                    document.getElementById(top_Value).value = "3";
                    document.getElementById(bottom_Value).value = sessionStorage.getItem(Value_ID);
                    Input_ID++;
                    break;
                case 1:
                    document.getElementById(top_Value).value = "4";
                    document.getElementById(bottom_Value).value = sessionStorage.getItem(Value_ID);
                    Input_ID++;
                    break;
                case 2:
                    document.getElementById(top_Value).value = "6";
                    document.getElementById(bottom_Value).value = sessionStorage.getItem(Value_ID);
                    Input_ID++;
                    break;
                case 3:
                    document.getElementById(top_Value).value = "8";
                    document.getElementById(bottom_Value).value = sessionStorage.getItem(Value_ID);
                    Input_ID++;
                    break;
                case 4:
                    document.getElementById(top_Value).value = "9";
                    document.getElementById(bottom_Value).value = sessionStorage.getItem(Value_ID);
                    Input_ID++;
                    break;
                case 5:
                    document.getElementById(top_Value).value = "10";
                    document.getElementById(bottom_Value).value = sessionStorage.getItem(Value_ID);
                    Input_ID++;
                    break;
                case 6:
                    document.getElementById(top_Value).value = "11";
                    document.getElementById(bottom_Value).value = sessionStorage.getItem(Value_ID);
                    Input_ID++;
                    break;
                case 7:
                    document.getElementById(top_Value).value = "13";
                    document.getElementById(bottom_Value).value = sessionStorage.getItem(Value_ID);
                    Input_ID++;
                    break;
                case 8:
                    document.getElementById(top_Value).value = "14";
                    document.getElementById(bottom_Value).value = sessionStorage.getItem(Value_ID);
                    Input_ID++;
                    break;
                case 9:
                    document.getElementById(top_Value).value = "15";
                    document.getElementById(bottom_Value).value = sessionStorage.getItem(Value_ID);
                    Input_ID++;
                    break;
                case 10:
                    document.getElementById(top_Value).value = "16";
                    document.getElementById(bottom_Value).value = sessionStorage.getItem(Value_ID);
                    Input_ID++;
                    break;
                case 11:
                    document.getElementById(top_Value).value = "18";
                    document.getElementById(bottom_Value).value = sessionStorage.getItem(Value_ID);
                    Input_ID++;
                    break;
                case 12:
                    document.getElementById(top_Value).value = "19";
                    document.getElementById(bottom_Value).value = sessionStorage.getItem(Value_ID);
                    Input_ID++;
                    break;
                case 13:
                    document.getElementById(top_Value).value = "20";
                    document.getElementById(bottom_Value).value = sessionStorage.getItem(Value_ID);
                    Input_ID++;
                    break;
                case 14:
                    document.getElementById(top_Value).value = "21";
                    document.getElementById(bottom_Value).value = sessionStorage.getItem(Value_ID);
                    Input_ID++;
                    break;
                case 15:
                    document.getElementById(top_Value).value = "23";
                    document.getElementById(bottom_Value).value = sessionStorage.getItem(Value_ID);
                    Input_ID++;
                    break;
                default:
                    break;
            }

        }
    }

}

function loadDetailedForm() {
    // Statement for having the stored age displayed in the age box
    document.getElementById('age_Input_Field').value = sessionStorage.getItem('stored_Age');
    // Statements that put the values in of the simple dietary into the detailed form
    document.getElementById('dietary-detailed-form-servings-input-0').value = sessionStorage.getItem('Butter_Value');
    document.getElementById('dietary-detailed-form-servings-input-1').value = sessionStorage.getItem('Margarine_Value');
    document.getElementById('dietary-detailed-form-servings-input-2').value = sessionStorage.getItem('Egg_Value');
    document.getElementById('dietary-detailed-form-servings-input-3').value = sessionStorage.getItem('Milk_Glass_Value');
    document.getElementById('dietary-detailed-form-servings-input-4').value = sessionStorage.getItem('Milk_Coffee_Value');
    document.getElementById('dietary-detailed-form-servings-input-5').value = sessionStorage.getItem('Other_Full_Milk_Value');
    document.getElementById('dietary-detailed-form-servings-input-6').value = sessionStorage.getItem('Milo_Value');
    document.getElementById('dietary-detailed-form-servings-input-7').value = sessionStorage.getItem('Tuna_Value');
    document.getElementById('dietary-detailed-form-servings-input-8').value = sessionStorage.getItem('Salmon_Value');
    document.getElementById('dietary-detailed-form-servings-input-9').value = sessionStorage.getItem('Barramundi_Value');
    document.getElementById('dietary-detailed-form-servings-input-10').value = sessionStorage.getItem('Sardines_Value');
    document.getElementById('dietary-detailed-form-servings-input-11').value = sessionStorage.getItem('Pork_Value');
    document.getElementById('dietary-detailed-form-servings-input-12').value = sessionStorage.getItem('Chicken_Value');
    document.getElementById('dietary-detailed-form-servings-input-13').value = sessionStorage.getItem('Beef_Value');
    document.getElementById('dietary-detailed-form-servings-input-14').value = sessionStorage.getItem('Lamb_Value');
    document.getElementById('dietary-detailed-form-servings-input-15').value = sessionStorage.getItem('Dark_Choc_Value');
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
            window.location.assign("tool-supplement-1.html");
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
        window.location.assign("tool-supplement-1.html");
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
