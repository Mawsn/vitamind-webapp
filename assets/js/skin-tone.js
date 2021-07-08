function getSessionData(){
    alert(sessionStorage.getItem("skin-tone-value"));
}
function setSessionData(key,value){
    sessionStorage.setItem(key, value);
}