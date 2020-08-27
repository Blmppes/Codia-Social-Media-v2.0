
let inter = setInterval(() => {
    try{
        db.collection("profile").doc(localStorage.getItem('profileId')).get().then(innerdoc => {
            console.log(localStorage.getItem('profileId'))
            displayProfile(innerdoc.id, innerdoc.data(), innerdoc.data().followers);
        })
        clearInterval(inter);
    }catch{
        console.log("waiting..")
    }    
}, 500);
