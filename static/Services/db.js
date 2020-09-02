
db.collection("post").orderBy('timestamp').onSnapshot(function (snapshot) {
  snapshot.docChanges().forEach(async function (change) {
    if(change.type == "added"){
      await db.collection("profile").doc(currentId).get().then(doc => {
        if(!(change.doc.data().read.includes(currentId)) && doc.data().friends.includes(change.doc.data().userId)){
          showNotification(change.doc.id, change.doc.data());
        }
        displayPost(change.doc.data(), change.doc.id, doc.data().friends)
      })
      await db.collection("profile").doc(currentId).get().then(doc => {
        updateComments(change.doc.id, change.doc.data(), doc.data().friends);
      })
      // showNotification(change.doc.id, change.doc.data());
    }else if(change.type == "modified"){
      await db.collection("profile").doc(currentId).get().then(doc => {
        updateLikeBtn(change.doc.id, change.doc.data().like)
        updateComments(change.doc.id, change.doc.data(), doc.data().friends);
      })
    }
  });
});
