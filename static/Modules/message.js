const openChatBox = (id, data) => {
    partnerId = id;
    let textBox = document.getElementById("chat-container-textbox-texts");
    textBox.innerHTML = ""
    console.log('hi');
    db.collection("message").get().then(snapshot => {
        snapshot.forEach(doc => {
            if(doc.data().send_id == currentId && doc.data().recieve_id == partnerId){
                textBox.innerHTML += `
                <li style="width: 100%">
                    <div>
                        <h6 class="lead">${doc.data().send}</h6>
                        <p class="bg-primary text-light p-2" style="font-size: 20px;">${doc.data().text}</p>
                    </div>
                </li>
                `
            }else if(doc.data().recieve_id == currentId && doc.data().send_id == partnerId){
                textBox.innerHTML += `
                <li style="width: 100%">
                    <div style="float:right">
                        <h6>${doc.data().send}</h6>
                        <p class="bg-light text-dark border p-2" style="font-size: 20px">${doc.data().text}</p>
                    </div>
                </li>
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
                recieve: innerdoc.data().name,
                recieve_id: partnerId,
                send: doc.data().name,
                send_id: currentId,
                text: data
            })
        })
    })
})