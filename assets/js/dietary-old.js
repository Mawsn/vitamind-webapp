// var x = 0;
// function addFood()
// {
// 	var original = document.getElementById('dietary-bubble-' + x);

// 	var clone = original.cloneNode(true);

// 	clone.id = "dietary-bubble-" + ++x;

// 	original.parentNode.appendChild(clone);
// }



// function removeFood()
// {
// 	if(x > 0)
// 	{
// 		let element_removed = $("#dietary-bubble-" + x);

// 		$(element_removed).remove();
// 		--x;
// 	}
// }

// function goBack(){
//     window.history.back();
// }


// // variables to store boolean values used to check whether the form is complete
// var dietary_top_field_bool;
// var dietary_bottom_field_bool;

// var product_groupName;	// this variable will store the name of the document from firestore
// var mapValue;			// this variable will store the name of the map present in the document

// var name_fromFirestore;
// var servingSize_fromFirestore;		// this variable will store the retrieved servingSize value from the firestore
// var vitDPerServe_fromFirestore;		// this variable will store the retrieved vitaminD_perServe value from firestore

// var db;
// var groupOfDietaryProductsRef;

// function checkSelectedOption(option_value)
// {
// 	// code needed to retrieve data from firestore
// 	db = firebase.firestore();
	
// 	// for fats
// 	if(option_value > 2 && option_value <= 4)
// 	{
// 		// checking
// 		console.log("fats");

// 		product_groupName = "fats";

// 		// check which fat product the user has selected
// 		if(option_value == 3)
// 		{
// 			// set map value
// 			mapValue = "product_1";
// 		}

// 		if(option_value == 4)
// 		{
// 			// set map value
// 			mapValue = "product_2";
// 		}
// 	}

// 	// for eggs
// 	if(option_value == 6)
// 	{
// 		// checking
// 		console.log("eggs");

// 		product_groupName = "eggs";

// 		// check which fat product the user has selected
// 		if(option_value == 6)
// 		{
// 			// set map value
// 			mapValue = "product_1";
// 		}
// 	}

// 	// for milk based products
// 	if(option_value > 7 && option_value <= 11)
// 	{
// 		// checking
// 		console.log("milk products");

// 		product_groupName = "milk_and_milkBasedBeverages";

// 		// check which fat product the user has selected
// 		if(option_value == 8)
// 		{
// 			// set map value
// 			mapValue = "product_1";
// 		}

// 		if(option_value == 9)
// 		{
// 			// set map value
// 			mapValue = "product_2";
// 		}

// 		if(option_value == 10)
// 		{
// 			// set map value
// 			mapValue = "product_3";
// 		}

// 		if(option_value == 11)
// 		{
// 			// set map value
// 			mapValue = "product_4";
// 		}
// 	}
	
// 	// for sea food
// 	if(option_value > 12 && option_value <= 16)
// 	{
// 		// checking
// 		console.log("sea food");

// 		product_groupName = "seaFood";

// 		// check which fat product the user has selected
// 		if(option_value == 13)
// 		{
// 			// set map value
// 			mapValue = "product_1";
// 		}

// 		if(option_value == 14)
// 		{
// 			// set map value
// 			mapValue = "product_2";
// 		}

// 		if(option_value == 15)
// 		{
// 			// set map value
// 			mapValue = "product_3";
// 		}

// 		if(option_value == 16)
// 		{
// 			// set map value
// 			mapValue = "product_4";
// 		}
// 	}

// 	// for meat
// 	if(option_value > 17 && option_value <= 21)
// 	{
// 		// checking
// 		console.log("meat");

// 		product_groupName = "meat";

// 		// check which fat product the user has selected
// 		if(option_value == 18)
// 		{
// 			// set map value
// 			mapValue = "product_1";
// 		}

// 		if(option_value == 19)
// 		{
// 			// set map value
// 			mapValue = "product_2";
// 		}

// 		if(option_value == 20)
// 		{
// 			// set map value
// 			mapValue = "product_3";
// 		}

// 		if(option_value == 21)
// 		{
// 			// set map value
// 			mapValue = "product_4";
// 		}
// 	}

// 	// for dark chocolate
// 	if(option_value > 22 && option_value <= 23)
// 	{
// 		// checking
// 		console.log("chocolate");

// 		product_groupName = "chocolate";

// 		// check which fat product the user has selected
// 		if(option_value == 23)
// 		{
// 			// set map value
// 			mapValue = "product_1";
// 		}
// 	}


// 	// after all the if statements, the value for product_groupName is stored
// 	groupOfDietaryProductsRef = db.collection("groupOfDietaryProducts").doc(product_groupName);
// 	groupOfDietaryProductsRef.get().then((doc) =>
// 	{
// 		if (doc.exists)
// 		{
// 			var data_from_doc = doc.data();

// 			// checking in console
// 			// console.log("The value of product_groupName: " + product_groupName);
// 			// console.log("The value of mapValue: " + mapValue);

// 			// retrieve the requried data from firestore
// 			name_fromFirestore = data_from_doc[mapValue]["name"];
// 			servingSize_fromFirestore = data_from_doc[mapValue]["servingSize"];
// 			vitDPerServe_fromFirestore = data_from_doc[mapValue]["vitaminD_perServe"];

// 			// checking in console
// 			console.log("Retrieved data of name from firestore: "+ name_fromFirestore);
// 			console.log("Retrieved data of servingSize from firestore: "+ servingSize_fromFirestore);
// 			console.log("Retrieved data of vitaminD_perServe from firestore: "+ vitDPerServe_fromFirestore);
		
			
// 			// check if this part of the field is entered
// 			if(option_value > 1 && option_value < 24)
// 			{
// 				dietary_top_field_bool = true;
// 			}
// 			else
// 			{
// 				dietary_top_field_bool = false;
// 			}

// 			// check if the form is complete
// 			if(dietary_top_field_bool == true && dietary_bottom_field_bool == true)
// 			{
// 				dietaryCalculations();
// 			}
// 		}
// 		else
// 		{
// 			console.log("Document does not exist");
// 		}
// 	}).catch((error) =>
// 	{
// 		console.log("Error in retrieving", error);
// 	});
// }


// // this funciton is for the servings per week input field
// var servingsPerWeek_userInput;

// function checkServingsPerWeek(entered_value)
// {
// 	servingsPerWeek_userInput = entered_value

// 	// checking
// 	console.log("Servings Per Week Entered by User: " + servingsPerWeek_userInput);

// 	// check if this part of the field is entered
// 	if(entered_value != 0)
// 	{
// 		dietary_bottom_field_bool = true;
// 	}
// 	else
// 	{
// 		dietary_bottom_field_bool = false;
// 	}


// 	// check if the form is complete
// 	if(dietary_top_field_bool == true && dietary_bottom_field_bool == true)
// 	{
// 		dietaryCalculations();
// 	}
// }

// // this function will perform the dietary calculations
// var vitD_fromDietaryIntake;
// var dietaryIntakeCalculation_bool;

// function dietaryCalculations()
// {
// 	if(dietary_top_field_bool == true && dietary_top_field_bool == true)
// 	{
// 		dietaryIntakeCalculation_bool = true;

// 		// this formula is wrong
// 		// vitD_fromDietaryIntake = servingsPerWeek_userInput * (vitDPerServe_fromFirestore / servingSize_fromFirestore);

// 		// correct formula
// 		vitD_fromDietaryIntake = servingsPerWeek_userInput * vitDPerServe_fromFirestore;
	
// 		// checking
// 		console.log("Calculated vitamin D from dietary intake: " + vitD_fromDietaryIntake);

// 		// call this function for setting item on session storage
// 		setDietaryIntake_sessionData();

// 		// checking
// 		console.log("CHECK SESSION STORAGE: " + sessionStorage.getItem("dietaryIntake_result"));
// 	}
// 	else
// 	{
// 		dietaryIntakeCalculation_bool = false;
// 	}
// }

// // for session storage
// function setDietaryIntake_sessionData()
// {
// 	// set the result of the dietary calculations
// 	if(dietaryIntakeCalculation_bool == true)
// 	{
// 		sessionStorage.setItem("dietaryIntake_result", vitD_fromDietaryIntake);
// 	}
// }

// function saveData(){
//     var age = document.getElementById('age_Input_Field').value;
//     if (age != ''){
//         sessionStorage.setItem('age', age);
        
//         var foodItem = document.getElementById("dietary-top-input").selectedIndex;
//         var servingField = Number(document.getElementById("dietary-bottom-input").value);
//         if (foodItem == 0 && servingField != 0){
//             alert("You have entered servings per week, but not selected a food item. Please enter a value to continue");
//         } else if (foodItem != 0 && servingField == 0){
//             alert("You have selected a food item, but not entered your amount of servings. Please enter a value to continue");
//         } else {
//             window.location.assign("tool-supplement-1.html");
//         }
        
//     } else {
//         alert("Please enter your age");
//     }
// }