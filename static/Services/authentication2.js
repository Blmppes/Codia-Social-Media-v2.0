auth.onAuthStateChanged((user) => {
    if(user){
        window.location = "/views/index.html"
    }else{
        window.location = "/views/login.html"
    }
})