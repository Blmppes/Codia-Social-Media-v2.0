document.getElementById("profile-btn").addEventListener('click', () => {
    changeProfileId(currentId, 'n')
})
const changeProfileId = (id, status) => {
    console.log(id)
    if(status == 'p'){
        localStorage.setItem('profileId', id) 
        setTimeout(() => {
            window.location = "Codia-Social-Media-v2.0/profile.html"
        },1000)
    }else{
        localStorage.setItem('profileId', id) 
    }
}

const openCommentBox = (id) => {
    let box = document.getElementById(`comment-box-${id}`)
    if(box.style.display == "none"){
        box.style.display = "block"
    }else{
        box.style.display = "none"
    }
}

const displayProfile = (id, data) => {
    console.log(window.innerWidth)
    let html = `
        <div id="profile-info-${id}" style="display: flex;padding: 30px 0px">
            <img src="${data.avartar}" class="big-avartar"/ style="margin-right: 100px">
            <div id="profile-info-text-${id}" style="display: block">
                <div id="profile-info-text-name-${id}" style="display: flex">
                    <h2 style="font-weight: 10;">${data.name}</h2>
                    <button class="btn btn-grey mx-3 border border-grey" style="font-size: 13px;padding: 0px 5px">Edit Profile</button>
                    <i class="fas fa-cog my-auto" style="font-size: 20px"></i>
                </div>
                <ul id="profile-info-text-social-${id}" class="mt-3" style="display: flex">
                    <li><span>${data.friends.length}</span> following</li>
                </ul>
            </div>
        </div>
    `
    document.getElementById("profile-container").innerHTML += html;
}

const displayPost = (data, id, friends) => {
    //Check if this user has liked or not
    let heartClassName = ""
    if(data.liked.includes(currentId)){
      heartClassName = "fas fa-heart"
    }else{
      heartClassName = "far fa-heart"
    }
  
    //If the content is undefined
    text = data.text
    if(text == "" || text == "undefined"){
      text = "Hello!"
    }

    //Display the post
    let html = `
        <div class="card posts" style="padding: 10px; margin-bottom: 50px">
            <div id="postInfo" style="display: flex">
                <img src="${data.avartar}" alt="${data.name} avatar" class="small-avartar">
                <a style="font-size: 18px" onclick="changeProfileId('${data.userId}', 'p')">${data.name}</a>
    `

    if(!(friends.includes(data.userId)) && currentId != data.userId){
        html += `<button class="btn btn-primary post-follow-btn-${data.userId}" style="font-size: 12px;padding: 3px;position:absolute;right:10px" onclick="followFunction('${data.userId}')">+ Follow</button>`
    }
    html += `
            </div>
            <hr/>
            <h3>${data.caption}</h3>
            <img class="card-img-top" src="${data.imageUrl}" alt="Card image cap" width="600px" height="400px">
            <h5 style="margin: 5px; border: 0.5px solid black; border-radius: 5px; padding: 5px">${data.text}</h5>
            <div id="other-function" style="display:flex; padding: 13px 5px 0px 5px">
                <i id="heart-${id}" class="${heartClassName}" style="font-size: 20px; color:red; margin: 0px 5px 0px 10px; cursor: pointer" onclick="updateToFirestore('${id}', '${currentId}', 'like')"></i>
                <span style="font-size: 15px" id="like-${id}">${data.like} likes</span>
                <i style="font-size: 21px; margin: 0px 5px 0px 100px; cursor: pointer" class="far fa-comment-dots" onclick="openCommentBox()"></i>
                <h6 onclick="openCommentBox('${id}')" style="cursor: pointer">Comments</h6>
            </div>
            <div id="comment-box-${id}" style="display: none; height: fit-content">
                <ul id="comments-${id}">
                    
                </ul>
                <div class="input-group mb-3">
                    <input id="commentIp-${id}" type="text" class="form-control" placeholder="Your think about this feed:">
                    <div class="input-group-append">
                        <button class="btn btn-danger" onclick="updateToFirestore('${id}', '${currentId}','comment')">Send</button>
                    </div>
                </div>
            </div>
        </div>
    `
  
    postGroup.innerHTML += html;
}


