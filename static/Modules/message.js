const openChatBox = (id, data) => {
    partnerId = id;
    let textBox = document.getElementById("chat-container-textbox-texts");
    textBox.innerHTML = ""
    console.log('hi');
    db.collection("message").orderBy("time").get().then(snapshot => {
        snapshot.forEach(doc => {
            if(doc.data().send_id == currentId && doc.data().recieve_id == partnerId){
                textBox.innerHTML += `
                <div style="display:block;margin-top: 10px">
                    <img src="${doc.data().send}" class="small-avartar">
                    <p class="bg-primary text-light p-2" style="font-size: 20px;display:inline">${doc.data().text}</p>
                </div>
                `
            }else if(doc.data().recieve_id == currentId && doc.data().send_id == partnerId){
                textBox.innerHTML += `
                <div style="display:block;margin-top: 10px">
                    <img src="${doc.data().send}" class="small-avartar">
                    <p class="bg-light text-dark border p-2" style="font-size: 20px;display:inline">${doc.data().text}</p>
                </div>
                `
            }      
        })
    })
}

document.getElementById("postMessageBtn").addEventListener("click", () => {
    let data = document.getElementById("inputText").value;
    console.log('update');
    db.collection("profile").doc(currentId).get().then(doc => {
        db.collection("profile").doc(partnerId).get().then(innerdoc => {
            db.collection("message").add({
                recieve: innerdoc.data().avartar,
                recieve_id: partnerId,
                send: doc.data().avartar,
                send_id: currentId,
                text: data,
                time: new Date()
            })
        })
    })
})