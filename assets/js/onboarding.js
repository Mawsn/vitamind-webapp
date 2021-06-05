
const firebaseConfig = {
	apiKey: "AIzaSyBeoZwZGa6f1aHzLIrUU66MgQlvrssLAkA",
	authDomain: "vitatrack-75bda.firebaseapp.com",
	projectId: "vitatrack-75bda",
	storageBucket: "vitatrack-75bda.appspot.com",
	messagingSenderId: "252880004411",
	appId: "1:252880004411:web:671a716ffcb35a2e58431e",
  measurementId: "G-SZZ8S3SJDS" //used in firebase analytics
};

firebase.initializeApp(firebaseConfig);

function signInWithEmailPassword() {
  //var email = "test@example.com";
//  var password = "hunter2";
var email = document.getElementById("emailField").value;
var password = document.getElementById("passField").value;
var dis = document.getElementById("loginErrorDiv");

if (email == ""){
    //...change some div to no email entered
    //console.log("No email was entered");
    dis.innerHTML = "Please enter an email address";
    return;
}
if (password == ""){
    //...
    //console.log("No password was entered");
    dis.innerHTML = "Please enter a password";
    return;
}

  // [START auth_signin_password]
  firebase.auth().signInWithEmailAndPassword(email, password)
  .then((userCredential) => {
      // Signed in
      var user = userCredential.user;
      console.log("Signed in");
      // ...
      window.location.assign("home.html"); //change this to actual web home page
  })
  .catch((error) => {
  	var errorCode = error.code;
  	var errorMessage = error.message;

  	dis.innerHTML = errorMessage;
  	console.log("Error "+errorCode +": "+errorMessage);
  	switch(errorCode){
  		case "auth/user-not-found":
          //console.log("User not found"); //change this into showing error in div
          dis.innerHTML = "User not found";
          break;
          case "auth/user-disabled":
          //console.log("User has been disabled");
          dis.innerHTML = "User has been disabled";
          break;
          case "auth/invalid-email":
          //console.log("User has invalid Email");
          dis.innerHTML = "User has invalid Email";
          break;
          case "auth/wrong-password":
          //console.log("Email or password is incorrect");
          dis.innerHTML = "The password you entered is incorrect. <b><a onclick=\"forgotPassword()\">Forgotten Password?</a></b>";
          break;
          default:
          console.log(errorCode + ": " + errorMessage);
      }
  });
  // [END auth_signin_password]
}
function forgotPassword(){
	var emailAddress = document.getElementById("emailField").value;

  //should really take to some other screen instead where this can be completed

  firebase.auth().sendPasswordResetEmail(emailAddress).then(function() {
  	var dis = document.getElementById("loginErrorDiv");
  	dis.style.color = "blue";
  	dis.innerHTML = "Email Sent";
  }).catch(function(error){
  	console.log("error sending email");
  })
}

function createUser() {
	var dis = document.getElementById("signupErrorDiv");
	var email = document.getElementById("emailField").value;
	var password = document.getElementById("passField").value;

	if (email == ""){
		dis.innerHTML = "No email was entered";
		return;
	}
	if (password == ""){
		dis.innerHTML = "No password was entered";
		return;
	}

	firebase.auth().createUserWithEmailAndPassword(email, password)
	.then((userCredential) => {
		var user = userCredential.user;
	})
	.catch((error) => {
		var errorCode = error.code;
		var errorMessage = error.message;
		console.log("Error "+errorCode +": "+errorMessage);

		dis.innerHTML = errorMessage;

	});
}
