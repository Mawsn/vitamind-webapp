
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

firebase.firestore().enablePersistence().then(()=>{
        console.log("Firestore: Offline Data Enabled");
    }).catch((err) => {
        if (err.code == 'failed-precondition'){
            //Multiple tabs open, persistence can only be enabled
            // in one tab at a a time.
            console.log("Session open in multiple tabs. Offline data cannot be enabled");
        } else if (err.code == 'unimplemented'){
            //Current Browser does not support all features required to enable persistence
            alert("Please note: Your Internet Browser does not support offline data for this application. You will not be able to use this application offline");
        } else {
            console.log(err.code);
        }
});

function getProfile(){
    //const user = firebase.auth().currentUser;
    var emailField = document.getElementById('emailField');
    firebase.auth().onAuthStateChanged((user) => {
        emailField.value = user.email;
    });
}

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


function changePassword(){
    var loadAnim = document.getElementById("loadAnim");
    loadAnim.style.visibility = "visible";
    
    var oldPass = document.getElementById("oldPass").value;
    var newPass = document.getElementById("newPass").value;
    var confirmNewPass = document.getElementById("newPass").value;
    if (newPass != ""){
        if (newPass == confirmNewPass){
            console.log("PASSWORD MATCHING NOT WORKING");
            const user = firebase.auth().currentUser;
            const cred = firebase.auth.EmailAuthProvider.credential(user.email, oldPass)
            
            user.reauthenticateWithCredential(cred).then(() => {

                user.updatePassword(confirmNewPass).then(() => {
                    loadAnim.style.visibility = "hidden";
                    alert("Successfully changed password");
                    window.location.assign('profile.html');
                }).catch((error) => {
                    //error in changing password
                    loadAnim.style.visibility = "hidden";
                    console.log(error.message)
                });

            }).catch((error) => {
                //error reauthenticating
                loadAnim.style.visibility = "hidden";
                console.log(error.message)
            });
                
            //console.log(user.email);
            
        } else {
            loadAnim.style.visibility = "hidden";
           // alert("")
            alert("New passwords do not match. Change this from an alert");
            //change styling of confirm input, change placeholder to inform that does not match
        }
    } else {
        loadAnim.style.visibility = "hidden";
        alert("No password entered. Change this from an alert");
    }
}

function showPass(fieldId){ //Not currently being used
    var field = document.getElementById(fieldId);
    if (field.type === "password"){
        field.type = "text";
    } else {
        field.type = "password";
    }
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

function clickedDelete(){
    var delAccount = confirm("Are you sure you want to delete your account? All data for the account will be lost.");
    if (delAccount){
        const user = firebase.auth().currentUser;
        //remove firestore data then call deleteUser()
        db.collection("users").doc(user.uid).delete().then(() => {
            deleteUser();
            console.log("Document successfully deleted!");
        }).catch((error) => {
            alert("An error occurred while trying to delete the account. Please try again");
            console.error("Error removing document: ", error);
        });
    }
}

function deleteUser(){
    const user = firebase.auth().currentUser;
    user.delete().then(() => {
        window.location.assign("index.html");
    }).catch((error) =>{
        console.log(error);
        document.getElementById("confirmDeleteDiv").style.visibility = "visible";
        document.getElementById("confirm-delete-background").style.visibility = "visible";
        //alert("To continue you must enter your password");
    })
}
function confirmDelete(){
    const user = firebase.auth().currentUser;
    var pass = document.getElementById("confirmPass").value;
    const cred = firebase.auth.EmailAuthProvider.credential(user.email, pass);
    user.reauthenticateWithCredential(cred).then(() => {
        document.getElementById("confirmDeleteDiv").style.visibility = "hidden";
        document.getElementById("confirm-delete-background").style.visibility = "hidden";
        window.location.assign("index.html");
    }).catch((error) => {
        alert("There was an error confirming your identity. Please try again");
        console.log(error.message)
    });
}

//Used to determine whether the logged in user is a guest, if so, the history and profile button will be hidden
function checkGuest(){
	firebase.auth().onAuthStateChanged((user) => {
    if(user.isAnonymous) {
    	//alert("Guest?: "+ user.isAnonymous);
    	document.getElementsByClassName("navbar-button-container")[0].style.display = "none"; 	
    } 
  });
}


