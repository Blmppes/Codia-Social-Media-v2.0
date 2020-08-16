
// db.collection("message").orderBy("timestamp").onSnapshot(function (snapshot) {
//   snapshot.docChanges().forEach(function (change) {
//     render(
//       change.doc.data()
//     );
   
//   });
// });
db.collection("post").orderBy('timestamp').onSnapshot(function (snapshot) {
  snapshot.docChanges().forEach(async function (change) {
    if(change.type == "added"){
      
      db.collection("profile").doc(currentId).get().then(doc => {
        console.log(doc.data(), doc.data().friends)   
        displayPost(change.doc.data(), change.doc.id, doc.data().friends)
        updateComments(change.doc.id, change.doc.data(), doc.data().friends);
      })
      // showNotification(change.doc.id, change.doc.data());
      console.log("added")
    }else if(change.type == "modified"){
      db.collection("profile").doc(currentId).get().then(doc => {
        updateLikeBtn(change.doc.id, change.doc.data().like)
        updateComments(change.doc.id, change.doc.data(), doc.data().friends);
        console.log("modified")
      })
    }
  });
});

// db.collection("user")
//   .get()
//   .then(function (snapshot) {
//     snapshot.forEach((doc) => {
//       printFriend(doc.data().name, doc.data().avatar, doc.data().status);
//     });
//   });



