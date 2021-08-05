
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
//State change detector, helps to track which user is logged in 
firebase.auth().onAuthStateChanged((user) => {
    if(user){ //if logged in
        
        if(!user.isAnonymous){//guest user
            console.log(user.email);
            if ( window.location.pathname == '/' || window.location.pathname == '/index.html'){ //if on landing page and logged in, redirect to homepage
                // Index (home) page
                window.location.assign("home.html");
            } else {
                // Other page
                console.log(window.location.pathname);
            }
        } else {
            console.log("GUEST USER");
            console.log("Will need to delete anonymous users afterward");
        }
    } else {
        //signed out
        console.log("SIGNED OUT");
        var path = window.location.pathname;
        switch (path){
            case '/':
                break;
            case '/index.html':
                break;
            case '/login.html':
                break;
            case '/login-options.html':
                break;
            case '/signup.html':
                break;
            case '/signup-options.html':
                break;
            default:
                window.location.assign("index.html");
        }
    }
});

function guestSignIn(){
    firebase.auth().signInAnonymously()
      .then(() => {
        // Signed in..
        window.location.assign("tool-skin-tone.html");
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode +": " + errorMessage);
      });
}


var eInput = document.getElementById("emailField");
eInput.addEventListener("keyup", function(event){
    if (event.keyCode === 13){
        if (window.location.pathname == '/login.html'){
            document.getElementById("loginForm").click();
        }
    }
}); 
var pInput = document.getElementById("passField");
pInput.addEventListener("keyup", function(event){
    if (event.keyCode === 13){
        if (window.location.pathname == '/login.html'){
            document.getElementById("loginForm").click();
        }
    }
}); 


function signInWithEmailPassword() {
    var loadAnim = document.getElementById("loadAnim");
    loadAnim.style.visibility = "visible";
    
    
	var email = document.getElementById("emailField").value;
	var password = document.getElementById("passField").value;
	var dis = document.getElementById("loginErrorDiv");

	if (email == ""){
        loadAnim.style.visibility = "hidden";
	    dis.innerHTML = "Please enter an email address";
	    return;
	}
	if (password == ""){
        loadAnim.style.visibility = "hidden";
	    dis.innerHTML = "Please enter a password";
	    return;
	}

  // [START auth_signin_password]
  firebase.auth().signInWithEmailAndPassword(email, password)
  .then((userCredential) => {
      // Signed in
      var user = userCredential.user;
      //alert(JSON.stringify(user, null, 4));
      loadAnim.style.visibility = "hidden";
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
            loadAnim.style.visibility = "hidden";

             break;
          case "auth/user-disabled":
            dis.innerHTML = "User has been disabled";
            loadAnim.style.visibility = "hidden";
            break;
          case "auth/invalid-email":
             dis.innerHTML = "User has invalid Email";
             loadAnim.style.visibility = "hidden";
             break;
          case "auth/wrong-password":
            dis.innerHTML = "The password you entered is incorrect. <b><a onclick=\"forgotPassword()\">Forgotten Password?</a></b>";
            loadAnim.style.visibility = "hidden";
            break;
          default:
          console.log(errorCode + ": " + errorMessage);
            loadAnim.style.visibility = "hidden";
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
    var loadAnim = document.getElementById("loadAnim");
    loadAnim.style.visibility = "visible";
    
	var dis = document.getElementById("signupErrorDiv");
	var email = document.getElementById("emailField").value;
	var password = document.getElementById("passField").value;

	if (email == ""){
		dis.innerHTML = "No email was entered";
        loadAnim.style.visibility = "hidden";
		return;
	}
	if (password == ""){
		dis.innerHTML = "No password was entered";
        loadAnim.style.visibility = "hidden";
		return;
	}

	firebase.auth().createUserWithEmailAndPassword(email, password)
	.then((userCredential) => {
		var user = userCredential.user;
		console.log("Signed up:" + user);
        loadAnim.style.visibility = "hidden";
		window.location.assign("home.html");
	})
	.catch((error) => {
		var errorCode = error.code;
		var errorMessage = error.message;
		console.log("Error "+errorCode +": "+errorMessage);
        loadAnim.style.visibility = "hidden";
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
    	alert(error.message);
  	});
}

function signinWithFacebook(){
	var provider = new firebase.auth.FacebookAuthProvider();
	firebase.auth().signInWithPopup(provider)
 	.then((result) => {
    	var credential = result.credential;
    	var user = result.user;
    	var accessToken = credential.accessToken;
    	window.location.assign("home.html");
  	})
  	.catch((error) => {
    	var errorCode = error.code;
	    var errorMessage = error.message;
	    var email = error.email;
	    var credential = error.credential;
	    alert(errorMessage);
  	});
}


function getUserDetails(){
  const user = firebase.auth().currentUser;
  alert(JSON.stringify(user, null, 4));
  console.log(firebase.auth());
   
}

function signout(){
  firebase.auth().signOut().then(() => {
    // Sign-out successful.
    console.log("signed out");
    window.location.assign("index.html");
  }).catch((error) => {
    // An error happened.
    console.log(error);
  });
}

function deleteUser(){
    const user = firebase.auth().currentUser;
    user.delete().then(() => {
        window.location.assign("index.html");
    }).catch((error) =>{
        console.log(error);
    })
}