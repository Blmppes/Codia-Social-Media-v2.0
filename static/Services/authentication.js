const logOutBtn = document.getElementById("logout-btn");

document.getElementById("profile-dropdown").onclick = () => {
    if(document.getElementById("profile-dropdown-menu").style.display == "none"){
        document.getElementById("profile-dropdown-menu").style.display = "block"
    }else{
        document.getElementById("profile-dropdown-menu").style.display = "none"
    }
}

document.getElementById("profile-notification-dropdown-btn").onclick = () => {
    if(document.getElementById("profile-notification-dropdown-menu").style.display == "none"){
        document.getElementById("profile-notification-dropdown-menu").style.display = "block"
    }else{
        document.getElementById("profile-notification-dropdown-menu").style.display = "none"
    }
}

auth.onAuthStateChanged(function(user) {  
    if (user && user.uid != currentId) {  
        currentId = user.uid;

        db.collection("profile").doc(user.uid).get().then((doc) => {
            document.getElementById("profile-dropdown-pic").src = doc.data().avartar
            try{
                suggestFriends(doc.id, doc.data());
            }catch{
                console.log("nothing")
            }
        }) 

        if(window.location == "index.html"){
            localStorage.setItem('profileId', user.uid)
        }
    }else{
        console.log(user)
    }
});      

logOutBtn.onclick = () => {
    firebase.auth().signOut().then(function() {
    }).catch(function(error) {
       console.log(error.message)
    });
    window.location = "login.html"
};

