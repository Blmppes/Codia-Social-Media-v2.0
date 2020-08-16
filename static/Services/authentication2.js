auth.onAuthStateChanged((user) => {
    if(user){
        window.location = "index.html"
    }else{
        window.location = "login.html"
    }
})