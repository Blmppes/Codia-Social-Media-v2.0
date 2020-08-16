let searchFriendInput = document.getElementById("search-friend-input");
let suggestionList = document.getElementById("suggestionList");

searchFriendInput.addEventListener("keyup", (event) => {
    db.collection("profile").get().then((snapshot) => {
        suggestionList.innerHTML = "";
        snapshot.forEach(doc => {
            console.log(searchFriendInput.value.toLowerCase(), doc.data().name.substring(0, searchFriendInput.value.length).toLowerCase())
            if(searchFriendInput.value != ""){
                if(searchFriendInput.value.toLowerCase() == doc.data().name.substring(0, searchFriendInput.value.length).toLowerCase()){
                    let li = document.createElement("li");
                    let name = document.createElement("p");
                    let avartar = document.createElement("img");
    
                    li.className = "suggestion border-top"
                    li.onclick = () => {
                        changeProfileId(doc.id, 'p');
                    }
                    name.innerHTML = doc.data().name
                    avartar.src = doc.data().avartar
                    avartar.className = "small-avartar"
                    name.className = "lead"
    
                    li.appendChild(avartar)
                    li.appendChild(name)
                    suggestionList.appendChild(li)
                    console.log(suggestionList)
                }
            }else{
                suggestionList.innerHTML = '';
            }
        })
    })
})  