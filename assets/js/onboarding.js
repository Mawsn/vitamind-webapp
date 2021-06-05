
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

	var email = document.getElementById("emailField").value;
	var password = document.getElementById("passField").value;
	var dis = document.getElementById("loginErrorDiv");

	if (email == ""){
	    dis.innerHTML = "Please enter an email address";
	    return;
	}
	if (password == ""){
	    dis.innerHTML = "Please enter a password";
	    return;
	}

  // [START auth_signin_password]
  firebase.auth().signInWithEmailAndPassword(email, password)
  .then((userCredential) => {
      // Signed in
      var user = userCredential.user;
      console.log("Signed in");
      window.location.assign("home.html");
  })
  .catch((error) => {
  	var errorCode = error.code;
  	var errorMessage = error.message;

  	dis.innerHTML = errorMessage;
  	console.log("Error "+errorCode +": "+errorMessage);
  	switch(errorCode){
  		case "auth/user-not-found":
          dis.innerHTML = "User not found";
          dis.innerHTML = "User not found. <b><a onclick=\"location.href='signup-options.html';\">Signup?</a></b>";

          break;
          case "auth/user-disabled":
          dis.innerHTML = "User has been disabled";
          break;
          case "auth/invalid-email":
          dis.innerHTML = "User has invalid Email";
          break;
          case "auth/wrong-password":
          dis.innerHTML = "The password you entered is incorrect. <b><a onclick=\"forgotPassword()\">Forgotten Password?</a></b>";
          break;
          default:
          console.log(errorCode + ": " + errorMessage);
      }
  });
}
function forgotPassword(){
  var emailAddress = document.getElementById("emailField").value;

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
function signinWithGoogle(){
	var provider = new firebase.auth.GoogleAuthProvider();
	
	firebase.auth().signInWithPopup(provider)
  	.then((result) => {
	    var credential = result.credential;
	    var token = credential.accessToken;
	    var user = result.user;
	    window.location.assign("home.html");

  	}).catch((error) => {
	    var errorCode = error.code;
	    var errorMessage = error.message;
	    var email = error.email;
	    var credential = error.credential;
  	});
}

function signinWithMicrosoft(){
	var provider = new firebase.auth.OAuthProvider('microsoft.com');
	firebase.auth().signInWithPopup(provider)
 	.then((result) => {
    	var credential = result.credential;
    	var accessToken = credential.accessToken;
    	var idToken = credential.idToken;
    	//alert(JSON.stringify(result, null, 4));
    	window.location.assign("home.html");
  	})
  	.catch((error) => {
    	alert(error);
  	});
}

function signinWithFacebook(){
	var provider = new firebase.auth.FacebookAuthProvider();
	firebase.auth().signInWithPopup(provider)
 	.then((result) => {
    	var credential = result.credential;
    	var user = result.user;
    	var accessToken = credential.accessToken;
    	alert(JSON.stringify(result, null, 4));
    	window.location.assign("home.html");
  	})
  	.catch((error) => {
    	var errorCode = error.code;
	    var errorMessage = error.message;
	    var email = error.email;
	    var credential = error.credential;
  	});
}