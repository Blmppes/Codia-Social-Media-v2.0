const logOutBtn = document.getElementById("logout-btn");

document.getElementById("profile-dropdown").onclick = () => {
    if(document.getElementById("profile-dropdown-menu").style.display == "none"){
        document.getElementById("profile-dropdown-menu").style.display = "block"
    }else{
        document.getElementById("profile-dropdown-menu").style.display = "none"
    }
}

auth.onAuthStateChanged(function(user) {  
    console.log("abc")
    if (user && user.uid != currentId) {  
        console.log(user.uid)
        db.collection("profile").doc(user.uid).get().then((snapshot) => {
            document.getElementById("profile-dropdown-pic").src = snapshot.data().avartar
        })

        currentId = user.uid;  
        if(window.location == "http://127.0.0.1:5500/views/index.html"){
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
    window.location = "http://127.0.0.1:5500/views/login.html"
};

