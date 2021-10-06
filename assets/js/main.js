var firebaseConfig = {
    apiKey: "AIzaSyBeoZwZGa6f1aHzLIrUU66MgQlvrssLAkA",
    authDomain: "vitatrack-75bda.firebaseapp.com",
    projectId: "vitatrack-75bda",
    storageBucket: "vitatrack-75bda.appspot.com",
    messagingSenderId: "252880004411",
    appId: "1:252880004411:web:671a716ffcb35a2e58431e",
    measurementId: "G-SZZ8S3SJDS" //used in firebase analytics
};


async function main(){
	await firebase.initializeApp(firebaseConfig);
}

if(firebase.apps.length == 0){
	main();
	alert(firebase.apps.length);

	//State change detector, helps to track which user is logged in 
	let alertCount = Number(sessionStorage.getItem("alertCount"));

	firebase.auth().onAuthStateChanged((user) => {
	    if (user) { //if logged in

	        if (!user.isAnonymous) { //If it is not the guest user
	            if (window.location.pathname == '/' || window.location.pathname == '/index.html') { //if on landing page and logged in, redirect to homepage
	                // Index (home) page
	                window.location.assign("home.html");
	                sessionStorage.setItem("alertCount", 0);
	            } else {
	                firebase.firestore().enablePersistence().then(() => {
	                    console.log("Firestore: Offline Data Enabled");
	                }).catch((err) => {
	                    if (err.code == 'failed-precondition') {
	                        //Multiple tabs open, persistence can only be enabled
	                        // in one tab at a a time.
	                        console.log("Session open in multiple tabs. Offline data cannot be enabled");
	                    } else if (err.code == 'unimplemented') {
	                        //Current Browser does not support all features required to enable persistence
	                        if (alertCount == 0) {
	                            alert("Please note: Your Internet Browser does not support offline data for this application. You will not be able to use this application offline");
	                        }
	                        sessionStorage.setItem("alertCount", 1);
	                    } else {
	                        if (alertCount == 0) {
	                            alert("Please note: An error occured while trying to activate offline capabilities. You will not be able to use all functionalities of this application offline.");
	                        }
	                        sessionStorage.setItem("alertCount", 1);
	                    }
	                });
	            }
	        }
	    } else {
	        //User is signed out, check if they are allowed on a page
	        var path = window.location.pathname;
	        switch (path) {
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
	            case '/about.html':
	                document.getElementById("profile-image").remove();
	                document.getElementById("logo-landscape").setAttribute('onclick', "location.href='index.html'");

	                var tButton = document.getElementById("tool-button");
	                tButton.innerHTML = "Login";
	                tButton.setAttribute('onclick', "location.href='login-options.html'");

	                var hButton = document.getElementById("history-button");
	                hButton.innerHTML = "Signup";
	                hButton.setAttribute('onclick', "location.href='signup-options.html'");
	                break;
	            default:
	                var toolPages = ['/tool-skin-tone.html', '/tool-dietary.html', '/tool-dietary-detailed-form.html', '/tool-exposure-minutes.html', '/tool-location.html', '/tool-sun-exposure.html', '/tool-sun-exposure-2.html', '/tool-supplement-1.html', '/tool-supplement-2.html', '/tool-supplement-3.html', '/result-breakdown.html']
	                if (!toolPages.includes(path)) {
	                    console.log("User not signed in: Access to page denied.");
	                    window.location.assign("index.html");
	                } else {
	                    document.getElementsByClassName("navbar-button-container")[0].style.display = "none";
	                }
	                break;
	        }
	    }
	});
}

/*.catch((err) => {
    var toolPages = ['/tool-skin-tone.html','/tool-dietary.html', '/tool-dietary-detailed-form.html', '/tool-exposure-minutes.html', '/tool-location.html', '/tool-sun-exposure.html','/tool-sun-exposure-2.html','/tool-supplement-1.html','/tool-supplement-2.html','/tool-supplement-3.html', '/result-breakdown.html']
    if (!toolPages.includes()){
        console.log("User not signed in: Access to page denied.");
        window.location.assign("index.html");
    } 
});*/

//Turns on offline data for firebase
/*firebase.firestore().enablePersistence().then(() => { 
    console.log("Firestore: Offline Data Enabled");
    alert("XXX");
}).catch((err) => {
    alert("HERE");
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
}); */

//Gets the user's data for the profile page
function getProfile() {
    //const user = firebase.auth().currentUser;
    var emailField = document.getElementById('emailField');
    firebase.auth().onAuthStateChanged((user) => {
        emailField.value = user.email;
    });
}

function guestSignIn() { //Function called when user logs in as a guest
    firebase.auth().signInAnonymously()
        .then(() => { //User successfully logged in
            window.location.assign("tool-skin-tone.html"); //Takes guest user directly to the tool
        })
        .catch((error) => { //Error happened while trying to sign in as a guest

            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorCode + ": " + errorMessage);
            console.log("Running in offline");
            window.location.assign("tool-skin-tone.html");
        });
}

/*if (window.location.pathname == '/login.html' || window.location.pathname == '/signup.html'){
    //Allows the user to user the enter button on the login or signup page to continue
    var eInput = document.getElementById("emailField");
    eInput.addEventListener("keyup", function(event){
        if (event.keyCode === 13){
            if (window.location.pathname == '/login.html'){
                document.getElementById("loginForm").click(); //clicks login button
            } else if (window.location.pathname == '/signup.html'){
                document.getElementById("loginForm").click(); //clicks login button
            }
        }
    }); 
    var pInput = document.getElementById("passField");
    pInput.addEventListener("keyup", function(event){
        if (event.keyCode === 13){
            if (window.location.pathname == '/login.html'){
                document.getElementById("loginForm").click(); //clicks login button
            } else if (window.location.pathname == '/signup.html'){
                document.getElementById("loginForm").click(); //clicks login button
            }
        }
    });
}  */


function signInWithEmailPassword() { //Function called when user signs in with email and password 
    var loadAnim = document.getElementById("loadAnim"); //show loading animation for responsiveness
    loadAnim.style.visibility = "visible";


    var email = document.getElementById("emailField").value;
    var password = document.getElementById("passField").value;
    var errorDiv = document.getElementById("loginErrorDiv");

    if (email == "") { //check user entered an email
        loadAnim.style.visibility = "hidden"; //stop animation
        errorDiv.innerHTML = "Please enter an email address"; //show error
        return; //exits function
    }
    if (password == "") { //check user entered a password
        loadAnim.style.visibility = "hidden"; //stop animation
        errorDiv.innerHTML = "Please enter a password"; //show error
        return; //exits function
    }

    //Attempts to sign in with firebase using provided details
    firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Signed in
            var user = userCredential.user;
            loadAnim.style.visibility = "hidden"; //Hide loading animation
            window.location.assign("home.html"); //Redirect to home screen
        })
        .catch((error) => { //an error occured while trying to sign in
            var errorCode = error.code;
            var errorMessage = error.message;

            //errorDiv.innerHTML = errorMessage;
            console.log("Error " + errorCode + ": " + errorMessage);
            switch (errorCode) {
                case "auth/user-not-found": //user doesn't exist
                    errorDiv.innerHTML = "User not found";
                    errorDiv.innerHTML = "User not found. <b><a onclick=\"location.href='signup-options.html';\">Signup?</a></b>";
                    loadAnim.style.visibility = "hidden";

                    break;
                case "auth/user-disabled": //User's account was disabled
                    errorDiv.innerHTML = "User has been disabled";
                    loadAnim.style.visibility = "hidden";
                    break;
                case "auth/invalid-email": //The provided email was incorrect
                    errorDiv.innerHTML = "User has invalid Email";
                    loadAnim.style.visibility = "hidden";
                    break;
                case "auth/wrong-password": //The given password was wrong
                    errorDiv.innerHTML = "The password you entered is incorrect. <b><a style=\"cursor: pointer;\" onclick=\"forgotPassword()\"><u>Forgotten Password?</u></a></b>";
                    loadAnim.style.visibility = "hidden";
                    break;
                default: //A different error occured
                    console.log(errorCode + ": " + errorMessage);
                    loadAnim.style.visibility = "hidden";
            }
        });
}

//Functoin called when user wants to change their password
function changePassword() {
    var loadAnim = document.getElementById("loadAnim");
    loadAnim.style.visibility = "visible"; //Show loading animation

    var oldPass = document.getElementById("oldPass").value;
    var newPass = document.getElementById("newPass").value;
    var confirmNewPass = document.getElementById("confirmNewPass").value;
    if (newPass != "") { //Ensure new password was entered into field
        if (newPass === confirmNewPass) { //make sure password matches with confirmation password
            document.getElementById("newPass").style = "border:0px";
            document.getElementById("confirmNewPass").style = "border:0px";

            const user = firebase.auth().currentUser;
            const cred = firebase.auth.EmailAuthProvider.credential(user.email, oldPass)

            user.reauthenticateWithCredential(cred).then(() => { //If user recently logged in

                user.updatePassword(confirmNewPass).then(() => { //Successfully changed password
                    loadAnim.style.visibility = "hidden";
                    alert("Successfully changed password");
                    window.location.assign('profile.html');
                }).catch((error) => {
                    //error in changing password
                    loadAnim.style.visibility = "hidden";
                    var errDiv = document.getElementById("changePassError");
                    errDiv.innerHTML = error.message;
                });

            }).catch((error) => {
                //error reauthenticating
                loadAnim.style.visibility = "hidden";
                var errDiv = document.getElementById("changePassError");
                errDiv.innerHTML = error.message;
            });

        } else { //If password does not match with confirmation password
            loadAnim.style.visibility = "hidden";
            var errDiv = document.getElementById("changePassError");
            errDiv.innerHTML = "Passwords do not match";

            document.getElementById("newPass").style = "border:2px solid red;";
            document.getElementById("confirmNewPass").style = "border:2px solid red;";
        }
    } else { //If no password was entered
        loadAnim.style.visibility = "hidden";
        errDiv.innerHTML = "No password or wrong password entered.";
    }
}

function showPass(fieldId) { //Not currently being used
    var field = document.getElementById(fieldId);
    if (field.type === "password") {
        field.type = "text";
    } else {
        field.type = "password";
    }
}

function forgotPassword() { //If user has clicked forgot password sends password reset email
    var emailAddress = document.getElementById("emailField").value;

    firebase.auth().sendPasswordResetEmail(emailAddress).then(function() { //If email sent
        var dis = document.getElementById("loginErrorDiv");
        dis.style.color = "blue";
        dis.innerHTML = "Email Sent";
    }).catch(function(error) {
        console.log("error sending email");
    })
}

function createUser() { //Called when user tries to sign up with new email
    var loadAnim = document.getElementById("loadAnim");
    loadAnim.style.visibility = "visible";

    var dis = document.getElementById("signupErrorDiv");
    var email = document.getElementById("emailField").value;
    var password = document.getElementById("passField").value;

    if (email == "") { //If the user didn't provide an email 
        dis.innerHTML = "No email was entered";
        loadAnim.style.visibility = "hidden";
        return;
    }
    if (password == "") { //If the user didn't provide an password
        dis.innerHTML = "No password was entered";
        loadAnim.style.visibility = "hidden";
        return;
    }

    //Uses firebase to create new account
    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => { //Account successfully created
            var user = userCredential.user;
            console.log("Signed up:" + user);
            loadAnim.style.visibility = "hidden";
            window.location.assign("home.html");
        })
        .catch((error) => { //Error in creating the new account
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log("Error " + errorCode + ": " + errorMessage);
            loadAnim.style.visibility = "hidden";
            dis.innerHTML = errorMessage;

        });
}

function signinWithGoogle() { //If user wants to sign in with Google
    var provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth().signInWithPopup(provider)
        .then((result) => { //Signed in with Google
            var credential = result.credential;
            var token = credential.accessToken;
            var user = result.user;
            window.location.assign("home.html");

        }).catch((error) => { //Error while tring to sign in
            var errorCode = error.code;
            var errorMessage = error.message;
            var email = error.email;
            var credential = error.credential;
        });
}

function signinWithMicrosoft() { //If user wants to sign in with Microsoft
    var provider = new firebase.auth.OAuthProvider('microsoft.com');
    firebase.auth().signInWithPopup(provider)
        .then((result) => { //Signed in
            var credential = result.credential;
            var accessToken = credential.accessToken;
            var idToken = credential.idToken;
            //alert(JSON.stringify(result, null, 4));
            window.location.assign("home.html");
        })
        .catch((error) => { //Error while tring to sign in
            alert(error.message);
        });
}

function signinWithFacebook() { //If user wants to sign in with Facebook
    var provider = new firebase.auth.FacebookAuthProvider();
    firebase.auth().signInWithPopup(provider)
        .then((result) => { //Signed in
            var credential = result.credential;
            var user = result.user;
            var accessToken = credential.accessToken;
            window.location.assign("home.html");
        })
        .catch((error) => { //Error while tring to sign in
            var errorCode = error.code;
            var errorMessage = error.message;
            var email = error.email;
            var credential = error.credential;
            alert(errorMessage);
        });
}


function getUserDetails() {
    const user = firebase.auth().currentUser;
    alert(JSON.stringify(user, null, 4));
    console.log(firebase.auth());

}

function signout() { //Called when user presses sign out button
    firebase.auth().signOut().then(() => {
        // Sign-out successful.
        console.log("signed out");
        window.location.assign("index.html");
    }).catch((error) => {
        // An error happened.
        console.log(error);
    });
}

function clickedDelete() { //If user tries to delete their account
    var delAccount = confirm("Are you sure you want to delete your account? All data for the account will be lost.");
    if (delAccount) { //If user clicks confirm
        const user = firebase.auth().currentUser;
        //remove firestore data then call deleteUser() 
        var db = firebase.firestore();
        db.collection("users").doc(user.uid).delete().then(() => {
            deleteUser();
            console.log("Document successfully deleted!");
        }).catch((error) => {
            alert("An error occurred while trying to delete the account. Please try again");
            console.error("Error removing document: ", error);
        });
    }
}

function deleteUser() { //Deletes the user's account
    const user = firebase.auth().currentUser;
    user.delete().then(() => { //Successful, redirects to landing page
        window.location.assign("index.html");
    }).catch((error) => { //error while trying to delete account
        console.log(error);
        document.getElementById("confirmDeleteDiv").style.visibility = "visible";
        document.getElementById("confirm-delete-background").style.visibility = "visible";
    })
}

function confirmDelete() {
    const user = firebase.auth().currentUser;
    var pass = document.getElementById("confirmPass").value;
    const cred = firebase.auth.EmailAuthProvider.credential(user.email, pass);
    user.reauthenticateWithCredential(cred).then(() => {
        document.getElementById("confirmDeleteDiv").style.visibility = "hidden";
        document.getElementById("confirm-delete-background").style.visibility = "hidden";
        deleteUser();
        //window.location.assign("index.html");
    }).catch((error) => {
        alert("There was an error confirming your identity. Please try again");
        console.log(error.message)
    });
}

//Used to determine whether the logged in user is a guest, if so, the history and profile button will be hidden
function checkGuest() {
    firebase.auth().onAuthStateChanged((user) => {
        if (user.isAnonymous) {
            //alert("Guest?: "+ user.isAnonymous);
            document.getElementsByClassName("navbar-button-container")[0].style.display = "none";
        }
    });
}

//Called if the user tries to leave the tool early to confirm if they want to leave
function leaveTool(pageRef) {
    const user = firebase.auth().currentUser;

    var leave = confirm("Are you sure you want to leave this page?\nAll progress will be lost.");
    if (leave) {
        sessionStorage.clear();
        if (user.isAnonymous) { //If it is a guest user, return them to the landing screen and delete their account
            if (pageRef == 'home.html') {
                deleteUser();
            }
        } else { //Otherwise if user is not guest, take them to relevant page
            window.location.assign(pageRef);
        }
    }
}

function goBack() { //Allows users to move back in the tool
    window.history.back();
}