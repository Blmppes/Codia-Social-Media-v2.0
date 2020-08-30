const updateToFirestore = (docId, userid, type, type2) => {
    if(type == "like"){
        db.collection("post").doc(docId).get().then((doc) => {
            console.log(doc.data().liked, userid)
    
            if(doc.data().liked.includes(userid)){
                db.collection("post").doc(docId).update({
                    like: firebase.firestore.FieldValue.increment(-1),
                    liked: firebase.firestore.FieldValue.arrayRemove(userid)
                })
                document.getElementById(`heart-${docId}`).className = `far fa-heart ${type2}`;
            }else{
                db.collection("post").doc(docId).update({
                    like: firebase.firestore.FieldValue.increment(1),
                    liked: firebase.firestore.FieldValue.arrayUnion(userid)
                })
                document.getElementById(`heart-${docId}`).className = `fas fa-heart ${type2}`;
            }
        })
    }else{
        let val = null;

        if(document.getElementById(`commentIp-${docId}`)){
            val = document.getElementById(`commentIp-${docId}`).value;
        }else{
            val = document.getElementById(`social-info-post-others-inputs-input_field-commentIp-${docId}`).value;
        };

        db.collection("profile").doc(userid).get().then(doc => {
            db.collection("post").doc(docId).update({
                'comments': firebase.firestore.FieldValue.arrayUnion({
                    id: userid,
                    value: val,
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
    commentList.innerHTML = "";
    data.comments.forEach((ele) =>{
        var subHtml = "";
        db.collection("profile").doc(ele['id']).get().then(doc =>{
            subHtml += `
                <li style="display: flex;text-decoration:none">
                    <img src='${doc.data().avartar}' class="small-avartar"/>
                    <p class="lead" onclick="changeProfileId('${ele['id']}', 'p')">${doc.data().name}</p>
            `
        
            if(!(friends.includes(ele['id'])) && currentId != ele['id']){
                console.log(currentId, ele['id'])
                subHtml += `<button class="btn btn-primary post-follow-btn-${data.userId}" style="margin-left: 10px;font-size: 10px;padding: 3px;height: fit-content" onclick="followFunction('${data.userId}')">+ Follow</button>`;
            };
            subHtml += `
                </li>
                <h6 id="comment-${id}" class="comment">${ele["value"]}</h6>
            `;
            commentList.innerHTML += subHtml;
        })
    });
}

const updateComments2 = (id, docId, data, friends, followers) => {
    let commentList = document.getElementById(`social-info-post-others-textbox-${docId}`);
    commentList.innerHTML = "";
    data.comments.forEach((ele) =>{
        var subHtml = "";
        db.collection("profile").doc(ele['id']).get().then(doc =>{
            subHtml += `
                <li style="display: flex;text-decoration:none">
                    <img src='${doc.data().avartar}' class="small-avartar"/>
                    <p class="lead" onclick="changeProfileId('${ele['id']}', 'p')">${doc.data().name}</p>
            `
            let {classFollowOrNot,followOrNot,followBool} = followConditions(doc.id, friends, followers)
            subHtml += `<button class="${classFollowOrNot} py-0 px-1 m-0" style="font-size: 10px;" onclick="${followBool}">${followOrNot}</button>`;
          
            subHtml += `
                </li>
                <h6 id="comment-${docId}" class="comment">${ele["value"]}</h6>
            `;
            commentList.innerHTML += subHtml;
        })
    });
}