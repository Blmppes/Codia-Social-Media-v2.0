setTimeout(() => {
    let inter = setInterval(() => {
        try{
            db.collection("profile").doc(localStorage.getItem('profileId')).get().then(doc => {
                console.log(localStorage.getItem('profileId'))
                displayProfile(doc.id, doc.data());
            })
            clearInterval(inter);
        }catch{
            console.log("waiting..")
        }    
    }, 500);
}, 1000)
