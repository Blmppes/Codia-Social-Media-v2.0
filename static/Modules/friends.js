const followFunction = (uid) => {
  let btn = document.getElementsByClassName(`post-follow-btn-${uid}`)
  db.collection("profile").doc(currentId).update({
    friends: firebase.firestore.FieldValue.arrayUnion(uid),
  })
  db.collection("profile").doc(uid).update({
    followers: firebase.firestore.FieldValue.arrayUnion(currentId),
  })
  for(let i = 0; i < btn.length; i++){
    btn[i].innerHTML = "Followed"
    btn[i].className = `btn btn-light post-follow-btn-${uid}`
  } 
}

const printFriends = (id, data) => {
  let friendList = document.getElementById("friends-list-menu");

  friendList.innerHTML += `
    <li class="bg-primary p-1 rounded mb-2" onclick="openChatBox('${id}', '${data}')">
      <img src="${data.avartar}" class="small-avartar"/>
      <h1 class="lead text-light" style="display: inline">${data.name}</h1>
    </li>
  `
}