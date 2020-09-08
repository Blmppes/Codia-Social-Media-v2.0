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
                    <li style="width: 100%">
                        <div>
                            <h6 class="lead">${change.doc.data().send}</h6>
                            <p class="bg-primary text-light p-2" style="font-size: 20px;">${change.doc.data().text}</p>
                        </div>
                    </li>
                    `
                }else if(change.doc.data().recieve_id == currentId && change.doc.data().send_id == partnerId){
                    textBox.innerHTML += `
                    <li style="width: 100%">
                        <div style="float:right">
                            <h6>${change.doc.data().send}</h6>
                            <p class="bg-light text-dark border p-2" style="font-size: 20px">${change.doc.data().text}</p>
                        </div>
                    </li>
                    `
                }      
            }
        })
    })
} catch{
    console.log("waiting...")
}
