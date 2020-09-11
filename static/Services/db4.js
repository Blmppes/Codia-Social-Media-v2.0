let partnerId = null;
setTimeout(() => {
    db.collection("profile").doc(currentId).get().then(doc => {
        db.collection("profile").onSnapshot(function (snapshot) {
            snapshot.docChanges().forEach(async function (change) {
                if(doc.data().friends.includes(change.doc.id)){
                    printFriends(change.doc.id, change.doc.data())
                }
            });
        });
    })
}, 1000)

try{
    textBox = document.getElementById("chat-container-textbox-texts")
    db.collection("message").onSnapshot(snapshot => {
        snapshot.docChanges().forEach(change => {
            if(change.type == "added"){
                if(change.doc.data().send_id == currentId && change.doc.data().recieve_id == partnerId){
                    textBox.innerHTML += `
                        <div class="mt-2" style="display:block">
                            <img src="${change.doc.data().send}" class="small-avartar">
                            <p class="bg-primary text-light p-2" style="font-size: 20px;display:inline">${change.doc.data().text}</p>
                        </div>
                    `
                }else if(change.doc.data().recieve_id == currentId && change.doc.data().send_id == partnerId){
                    textBox.innerHTML += `
                        <div class="mt-2" style="display:block">
                            <img src="${change.doc.data().send}" class="small-avartar">
                            <p class="bg-light text-dark border p-2" style="font-size: 20px;display:inline">${change.doc.data().text}</p>
                        </div>
                    `
                }      
            }
        })
    })
} catch{
    console.log("waiting...")
}
