// For Firebase JS SDK v7.20.0 and later, measurementId is optional
/*const firebaseConfig = {
  apiKey: "AIzaSyBeoZwZGa6f1aHzLIrUU66MgQlvrssLAkA",
  authDomain: "vitatrack-75bda.firebaseapp.com",
  projectId: "vitatrack-75bda",
  storageBucket: "vitatrack-75bda.appspot.com",
  messagingSenderId: "252880004411",
  appId: "1:252880004411:web:671a716ffcb35a2e58431e",
  measurementId: "G-SZZ8S3SJDS"
};

firebase.initializeApp(firebaseConfig); */

function authStateListener() {
  // [START auth_state_listener]
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
        var uid = user.uid;
      // ...
        console.log("UID: "+uid);
    } else {
      // User is signed out
      // ...
      //alert("Not signed in");
        //window.location.assign("login-options.html");
    }
  });
  // [END auth_state_listener]
}
function signout(){
  firebase.auth().signOut().then(() => {
    // Sign-out successful.
    console.log("signed out");
  }).catch((error) => {
    // An error happened.
    console.log(error);
  });
}

