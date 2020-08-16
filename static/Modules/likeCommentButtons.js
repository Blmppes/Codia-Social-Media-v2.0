const updateToFirestore = (docId, userid, type) => {
    if(type == "like"){
        db.collection("post").doc(docId).get().then((doc) => {
            console.log(doc.data().liked, userid)
    
            if(doc.data().liked.includes(userid)){
                db.collection("post").doc(docId).update({
                    like: firebase.firestore.FieldValue.increment(-1),
                    liked: firebase.firestore.FieldValue.arrayRemove(userid)
                })
                document.getElementById(`heart-${docId}`).className = "far fa-heart";
            }else{
                db.collection("post").doc(docId).update({
                    like: firebase.firestore.FieldValue.increment(1),
                    liked: firebase.firestore.FieldValue.arrayUnion(userid)
                })
                document.getElementById(`heart-${docId}`).className = "fas fa-heart";
            }
        })
    }else{
        let val = document.getElementById(`commentIp-${docId}`).value;
        let random = Math.floor(Math.random() * 10000000);

        db.collection("profile").doc(userid).get().then(doc => {
            db.collection("post").doc(docId).update({
                'comments': firebase.firestore.FieldValue.arrayUnion({
                    id: userid,
                    value: val,
                    name: doc.data().name,
                    avartar: doc.data().avartar
                })
            });
        })
    }
}

const updateLikeBtn = (id, data) => {
    document.getElementById(`like-${id}`).innerHTML = `${data} likes`;
}

const updateComments = (id, data, friends) => {
    let commentList = document.getElementById(`comments-${id}`);

    let subHtml = ""

    data.comments.forEach((ele) =>{
        subHtml += `
        <li style="display: flex">
            <img src='${ele["avartar"]}' class="small-avartar"/>
            <p class="lead" onclick="changeProfileId('${data.userId}', 'p')">${ele["name"]}</p>
        `
        console.log(friends)
        if(!(friends.includes(ele['id'])) && currentId != ele['id']){
            console.log(currentId, ele['id'])
            subHtml += `<button class="btn btn-primary post-follow-btn-${data.userId}" style="margin-left: 10px;font-size: 10px;padding: 3px;height: fit-content" onclick="followFunction('${data.userId}')">+ Follow</button>`;
        };
        subHtml += `
        </li>
        <h6 id="comment-${id}" class="comment">${ele["value"]}</h6>
        `;
    });

    commentList.innerHTML = subHtml;
}