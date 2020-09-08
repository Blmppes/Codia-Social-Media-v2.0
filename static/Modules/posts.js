document.getElementById("profile-btn").addEventListener('click', () => {
    changeProfileId(currentId, 'n')
})

const followConditions = (id, friends, followers) => {
    let classFollowOrNot = ""
    let followOrNot = ""
    let followBool = ""

    if(currentId == id) {
        classFollowOrNot = `btn btn-grey mx-3`;
        return {classFollowOrNot, followOrNot, followBool}
    }

    if(friends.includes(currentId) || followers.includes(currentId)) {
        classFollowOrNot = `btn btn-grey border border-light post-follow-btn-${id} mx-3`;
        followOrNot = "Followed"
    }else{
        classFollowOrNot = `btn btn-primary post-follow-btn-${id} mx-3`;
        followOrNot = "Follow"
        followBool = `followFunction('${id}')`
    }

    return {classFollowOrNot, followOrNot, followBool}
}

const redOrGrey = (data) => {
    let heartClassName = "";
    if(data.liked.includes(currentId)){
        heartClassName = "fas fa-heart"
    }else{
        heartClassName = "far fa-heart"
    }
    return heartClassName
}

const changeProfileId = (id, status) => {
    if(status == 'p'){
        localStorage.setItem('profileId', id) 
        window.location = "profile.html"
    }else{
        localStorage.setItem('profileId', id) 
        window.location = "profile.html"
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

const displayProfilePostsModal = (docId, data, id, name, avartar, followers, friends, img_url, status) => {
    let others = document.getElementsByClassName('social-info-post-others')[0];
    let img = document.getElementsByClassName('social-info-post-img')[0]
    let {classFollowOrNot,followOrNot,followBool} = followConditions(id, friends, followers);
    let heartClassName = redOrGrey(data);

    if(status == 'img'){
        img.innerHTML = `<img class="responsize" src="${img_url}" style="width: 100%; height: 100%">`
    }else{
        img.innerHTML = `<video class="responsize" src="${img_url}" style="width: 100%; height: 100%" controls autoplay repeat>`
    }

    let subhtml = `
        <div id="social-info-post-others-header" class="p-3 border-bottom" style="display: flex;">
            <img id="social-info-post-others-img-${docId}" class="small-avartar" src="${avartar}" alt="user-avartar">
            <h1 class="lead" id="social-info-post-others-name-${docId}">${name}</h1>
            <button class="${classFollowOrNot}" style="font-size: 10px;padding: 0px 3px" onclick="${followBool}">${followOrNot}</button>
        </div>
        <ul id="social-info-post-others-textbox-${docId}" class="m-2">
            
        </ul>
        <div id="social-info-post-others-inputs" style="position: absolute;bottom: -2.5%;width:100%;">
            <div id="social-info-post-others-inputs-btns" class="p-3 border-top">
                <div id="social-info-post-others-inputs-btns-1" style="display: flex;font-size:25px;">
                    <i id="heart-${docId}" class="${heartClassName} mr-1" style="cursor: pointer;color:red" onclick="updateToFirestore('${docId}', '${currentId}', 'like', 'mr-1')"></i>
                    <i class="far fa-paper-plane mr-3"></i>
                    <i class="far fa-comment "></i>
                    <i class="far fa-bookmark ml-auto" style="float: right"></i>
                </div>
                <h1 class="mt-2" style="font-size: 15px" id="like-${docId}">${data.like} likes</h1>
            </div>
            <div id="social-info-post-others-inputs-input_field" class="input-group mb-3">
                <input type="text" class="form-control" id="social-info-post-others-inputs-input_field-commentIp-${docId}" placeholder="Add a comment..."/>
                <div class="input-group-append" style="cursor:pointer">
                    <span class="input-group-text" id="social-info-post-others-inputs-input_field-post_btn" onclick="updateToFirestore('${docId}', '${currentId}','comment')">Post</span>
                </div>
            </div>
        </div>
    `
    others.innerHTML = subhtml;

    updateComments2(id, docId, data, friends, followers);
}

const appearFollowUsers = (type, data) => {
    list = document.getElementById("follow-user-list")
    list.innerHTML = ""

    if(type == "following"){
        list.parentElement.childNodes[1].innerHTML = "Followings"
    }else{
        list.parentElement.childNodes[1].innerHTML = "Followers"
    }

    if(data.length == 0){
        return;
    }
    data = data.split(',')

    data.forEach(async user =>{
        await db.collection("profile").doc(user).get().then(doc => {
            list.innerHTML += `
                <li class="follow-user-list-item btn" style="display: flex">
                    <img class="small-avartar" src="${doc.data().avartar}" alt="user avartar"/>
                    <h1 class="lead">${doc.data().name}</h1>
                </li>
            `
        })
    })
}

const displayProfile = async (id, data, friends) => {
    let html = ``
    
    if(id == currentId){
        html = `
            <div id="profile-info-${id}" class="profile-info" style="padding: 3% 0px; position:relative">
                <img src="${data.avartar}" class="big-avartar responsive2 cursor">
                <div class="camera">
                    <label for="avartar-change"><i class="fas fa-camera"></i></label>
                    <input id="avartar-change" type="file" style="visibility:hidden;" accept="image/png, image/jpeg">
                </div>
                <div id="profile-info-text-${id}" style="display: block">
                    <div id="profile-info-text-name-${id}" class="profile-info-text-name" style="display: flex">
                        <h2 style="font-weight: 10;">${data.name}</h2>
                        <button class="btn btn-grey mx-3 border border-grey" style="font-size: 13px;padding: 0px 5px">Edit Profile</button>
                        <i class="fas fa-cog my-auto" style="font-size: 20px"></i>
                    </div>
                    <ul id="profile-info-text-social-${id}" class="mt-3" style="display: flex">
                        <li onclick="appearFollowUsers('following', '${data.friends}')" data-toggle="modal" data-target="#follow-user-modal">
                            <span>${data.friends.length}</span>  following
                        </li>
                        <li onclick="appearFollowUsers('follower', '${data.followers}')" class="mx-auto" data-toggle="modal" data-target="#follow-user-modal">
                            <span>${data.followers.length}</span>  followers
                        </li>
                    </ul>
                </div>
            </div>
            <div id="social-info-${id}" class="social-info">
                <nav class="navbar navbar-expand-lg border-top border-top-secondary p-0">
                    <button id="social-info-posts-btn-${id}" class="btn btn-light ml-auto social-info-btn">POSTS</button>
                    <button id="social-info-igtv-btn-${id}" class="btn btn-light social-info-btn">IGTV</button>
                    <button id="social-info-tagged-btn-${id}" class="btn btn-light mr-auto social-info-btn">TAGGED</button>
                </nav>
                <div id="social-info-posts-${id}" class="row">        
                </div>
            </div>
        `
        document.getElementById("profile-container").innerHTML += html;
        html = ""

        await db.collection("post").where("userId", "==", id).get().then(snapshot => {
            snapshot.forEach(doc => {
                let img_url = doc.data().imageUrl

                let extension = img_url.split("?")[0];
                extension = extension.substring(extension.length - 3, extension.length)

                if (extension == "png" || extension == "PNG" || extension == "jpg" || extension == "jpeg"){
                    img = document.createElement("img");

                    img.src = img_url
                    img.className = "col-lg-4 col-md-6 col-sm-12"
                    img.id = `social-info-post-${doc.id}`
                    img.dataset.toggle = "modal"
                    img.dataset.target = "#social-info-post-modal"
                    img.onclick = () => {
                        displayProfilePostsModal(doc.id, doc.data(), id, data.name, data.avartar, data.followers,
                        friends, img_url, 'img')
                    }
                    document.getElementById(`social-info-posts-${id}`).appendChild(img)

                }else if(extension == "mp4" || extension == "avi"){
                    video = document.createElement("video");

                    video.src = img_url
                    video.className = "col-lg-4 col-md-6 col-sm-12"
                    video.id = `social-info-post-${doc.id}`
                    video.dataset.toggle = "modal"
                    video.dataset.target = "#social-info-post-modal"
                    video.onclick = () => {
                        displayProfilePostsModal(doc.id, doc.data(), id, data.name, data.avartar, data.followers,
                        friends, img_url, 'video')
                    }
                    document.getElementById(`social-info-posts-${id}`).appendChild(video)
                }
            }) 
        })
    }else{
        let {classFollowOrNot,followOrNot,followBool} = followConditions(id, friends, data.followers)
        
        html = `
        <div id="profile-info-${id}" class="profile-info" style="padding: 3% 0px">
            <img src="${data.avartar}" class="big-avartar responsive2">
            <div id="profile-info-text-${id}" style="display: block">
                <div id="profile-info-text-name-${id}" class="profile-info-text-name" style="display: flex">
                    <h2 style="font-weight: 10;">${data.name}</h2>
                    <button class="${classFollowOrNot}" style="font-size: 13px;padding: 0px 5px" onclick="${followBool}">${followOrNot}</button>
                </div>
                <ul id="profile-info-text-social-${id}" class="mt-3" style="display: flex">
                    <li onclick="appearFollowUsers('following', '${data.friends}')" data-toggle="modal"                            data-target="#follow-user-modal">
                        <span>${data.friends.length}</span>  following
                    </li>
                    <li onclick="appearFollowUsers('follower', '${data.followers}')" class="mx-auto" data-toggle="modal" data-target="#follow-user-modal">
                        <span>${data.followers.length}</span>  followers
                    </li>
                </ul>
            </div>
        </div>
        <div id="social-info-${id}" class="social-info">
            <nav class="navbar navbar-expand-lg border-top border-top-secondary p-0">
                <button id="social-info-posts-btn-${id}" class="btn btn-light ml-auto social-info-btn">POSTS</button>
                <button id="social-info-igtv-btn-${id}" class="btn btn-light social-info-btn">IGTV</button>
                <button id="social-info-tagged-btn-${id}" class="btn btn-light mr-auto social-info-btn">TAGGED</button>
            </nav>
            <div id="social-info-posts-${id}" class="row">   
            </div>
        </div>     
        `

        document.getElementById("profile-container").innerHTML += html;

        await db.collection("post").where("userId", "==", id).get().then(snapshot => {
            snapshot.forEach(doc => {
                let img_url = doc.data().imageUrl

                let extension = img_url.split("?")[0];
                extension = extension.substring(extension.length - 3, extension.length)

                if (extension == "PNG" || extension == "jpg" || extension == "jpeg"){
                    img = document.createElement("img");

                    img.src = img_url
                    img.className = "col-lg-4 col-md-6 col-sm-12"
                    img.id = `social-info-post-${doc.id}`
                    img.dataset.toggle = "modal"
                    img.dataset.target = "#social-info-post-modal"
                    img.onclick = () => {
                        displayProfilePostsModal(doc.id, doc.data(), id, data.name, data.avartar, data.followers,
                        friends, img_url, 'img')
                    }
                    document.getElementById(`social-info-posts-${id}`).appendChild(img)
                }else if(extension == "mp4" || extension == "avi"){
                    video = document.createElement("video");

                    video.src = img_url
                    video.className = "col-lg-4 col-md-6 col-sm-12"
                    video.id = `social-info-post-${doc.id}`
                    video.dataset.toggle = "modal"
                    video.dataset.target = "#social-info-post-modal"
                    video.onclick = () => {
                        displayProfilePostsModal(doc.id, doc.data(), id, data.name, data.avartar, data.followers,
                        friends, img_url, 'video')
                    }
                    document.getElementById(`social-info-posts-${id}`).appendChild(video)
                }
            }) 
        })
    }

    $("#avartar-change").change(function() {
        file = this.files[0]

        let storageRef = storage.ref('userAvartar/' + file.name);

        let task = storageRef.put(file);

        task.on('state_changed',
            function progress(snapshot){},

            function error(err){
                console.log(err);
            },

            function complete(){
                //Download Image

                task.snapshot.ref.getDownloadURL().then(function(url) {
                    db.collection("profile").doc(currentId).update({
                        avartar: url
                    })
                }).catch(function(error) {  
                    console.log(error);
                });
            }
        )
    });
      
}

const displayPost = (data, id, friends) => {
    console.log(data.imageUrl)
    //Check if this user has liked or not
    let heartClassName = redOrGrey(data);
  
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
                <a style="font-size: 22px" onclick="changeProfileId('${data.userId}', 'p')">${data.name}</a>
    `

    if(!(friends.includes(data.userId)) && currentId != data.userId){
        html += `<button class="btn btn-primary post-follow-btn-${data.userId}" style="font-size: 12px;padding: 3px;position:absolute;right:10px" onclick="followFunction('${data.userId}')">+ Follow</button>`
    }
    html += `
            </div>
            <h6 style="font-size: 12px;font-weight: light;">${data.timestamp.toDate()}</h6>
            <hr/>
            <h3>${data.caption}</h3>
    `
    let extension = data.imageUrl.split("?")[0];
    extension = extension.substring(extension.length - 3, extension.length)

    if (extension == "PNG" || extension == "png" || extension == "jpg" || extension == "jpeg"){
        html += `
        <img class="card-img-top responsive" src="${data.imageUrl}" alt="Card image cap" width="600px" height="400px"></img>
        `
    }else if(extension == "mp4" || extension == "avi"){
        html += `
        <video class="card-img-top responsive" width="600px" height="400px" src="${data.imageUrl}" controls></video>`
    }
               
    html += `       
            <h6 class="lead m-2 p-1 border-top">${data.text}</h5>
            <div id="other-function" class="border-top" style="display:flex; padding: 13px 5px 0px 5px">
                <i id="heart-${id}" class="${heartClassName} ml-auto" style="font-size: 20px; color:red; cursor: pointer" onclick="updateToFirestore('${id}', '${currentId}', 'like', 'ml-auto')"></i>
                <span class="ml-1 mr-auto" style="font-size: 15px" id="like-${id}">${data.like} likes</span>
                <i style="cursor: pointer" class="far fa-comment-dots ml-auto" onclick="openCommentBox()"></i>
                <h6 class="mr-auto ml-1" onclick="openCommentBox('${id}')" style="cursor: pointer">Comments</h6>
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

