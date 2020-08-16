auth.onAuthStateChanged((user) => {
    if(user){
        window.location = "Codia-Social-Media-v2.0/views/index.html"
    }else{
        window.location = "Codia-Social-Media-v2.0/views/login.html"
    }
})