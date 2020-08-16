auth.onAuthStateChanged((user) => {
    if(user){
        window.location = "http://127.0.0.1:5500/views/index.html"
    }else{
        window.location = "http://127.0.0.1:5500/views/login.html"
    }
})