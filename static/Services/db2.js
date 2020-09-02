db.collection("post").orderBy('timestamp').onSnapshot(function (snapshot) {
    snapshot.docChanges().forEach(async function (change) {
      if(change.type == "added"){
        await db.collection("profile").doc(currentId).get().then(doc => {
          if(!(change.doc.data().read.includes(currentId)) && doc.data().friends.includes(change.doc.data().userId)){
            showNotification(change.doc.id, change.doc.data());
          }
        })
        await db.collection("profile").doc(localStorage.getItem('profileId')).get().then(innerdoc => {
            let img_url = change.doc.data().imageUrl

            let extension = img_url.split("?")[0];
            extension = extension.substring(extension.length - 3, extension.length)

            if (extension == "PNG" || extension == "jpg" || extension == "jpeg"){
                displayProfilePostsModal(change.doc.id, change.doc.data(), innerdoc.id, innerdoc.data().name, innerdoc.data().avartar, innerdoc.data().followers,
                innerdoc.data().friends, img_url, 'img', change.doc.data().comments)
            }else if(extension == "mp4" || extension == "avi"){
                displayProfilePostsModal(change.doc.id, change.doc.data(), innerdoc.id, innerdoc.data().name, innerdoc.data().avartar, innerdoc.data().followers,
                innerdoc.data().friends, img_url, 'video', change.doc.data().comments)
            }
        })
      }
      else if(change.type == "modified"){
        await db.collection("profile").doc(localStorage.getItem('profileId')).get().then(innerdoc => {
          updateLikeBtn(change.doc.id, change.doc.data().like)
          updateComments2(innerdoc.id, change.doc.id ,change.doc.data(), innerdoc.data().friends, innerdoc.data().followers);
        })
      }       
    });
  });
  

let inter = setInterval(() => {
    try{
        db.collection("profile").doc(localStorage.getItem('profileId')).get().then(innerdoc => {
            displayProfile(innerdoc.id, innerdoc.data(), innerdoc.data().followers);
        })
        clearInterval(inter);
    }catch{
        console.log("waiting..")
    }    
}, 500);
