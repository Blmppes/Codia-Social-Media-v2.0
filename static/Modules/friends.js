const printFriend = (name, img_url, status) => {
  let onOf = null
  let color = "#96a6a8"
  let maxChar = 12
  let tempName = name

  if(status == "online"){
    onOf = "fas fa-circle"
    color = "#45efff"
  }else{
    onOf = "far fa-circle"
  }

  if(tempName.length > maxChar){
    tempName = tempName.substring(0, 10) + ".."
  }

  if (name != "Trung Hieu") {
    html = `
      <li class="list-group-item" style="background-color:#7c89de; padding:5x; width: 180px">
        <img src="${img_url}" class="friends-avatar" style="border-radius: 50%; width:35px; height: 35px"/>
        <span onclick="getMessageOnce('${name}', '${img_url}')" title=${name} >${tempName}</span>
        <i class="${onOf}" style="color:${color}" ></i>
      </li>
      `;
    friendList.innerHTML += html;
  }
};

const followFunction = (uid) => {
  let btn = document.getElementsByClassName(`post-follow-btn-${uid}`)
  db.collection("profile").doc(currentId).update({
    friends: firebase.firestore.FieldValue.arrayUnion(uid)
  })
  for(let i = 0; i < btn.length; i++){
    btn[i].innerHTML = "Followed"
    btn[i].className = `btn btn-light post-follow-btn-${uid}`
  } 
}