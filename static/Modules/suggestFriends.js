const suggestFriends = (id, data) => {
    let c = 0;
    let searched = [];
    
    for(let i = 0; i < data.friends.length; i++){
        if(c > 10){
            return;
        }

        db.collection("profile").doc(data.friends[i]).get().then(doc => {
            for(let j = 0; j < doc.data().friends.length; j++){
                if(c > 10){
                    return;
                }
                if(doc.data().friends[j] == currentId || searched.includes(doc.data().friends[j])){
                    continue;
                }
                c += 1;
            
                db.collection("profile").doc(doc.data().friends[j]).get().then(innerdoc => {
                    let {classFollowOrNot,followOrNot,followBool} = followConditions(innerdoc.id, innerdoc.data().friends, innerdoc.data().followers); 

                    if(followOrNot == "Followed"){
                        return;
                    }
                    friendsSuggestionList.innerHTML += `
                        <li>
                            <img class="small-avartar mr-1" src="${innerdoc.data().avartar}" alt="avartar"/>
                            <h1 class="lead my-auto" onclick="changeProfileId('${innerdoc.id}', 'p')" style="display: inline">${innerdoc.data().name}</h1>
                            <button class="${classFollowOrNot}" style="font-size: 10px;padding: 0px 3px" onclick="${followBool}">${followOrNot}</button>
                        </li>
                    `
                    searched.push(innerdoc.id)
                })
            }
        })
    }
}