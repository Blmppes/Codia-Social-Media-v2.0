document.getElementById("profile-btn").addEventListener('click', () => {
    changeProfileId(currentId, 'n')
})

const changeProfileId = (id, status) => {
    console.log(id)
    if(status == 'p'){
        localStorage.setItem('profileId', id) 
        setTimeout(() => {
            window.location = "profile.html"
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

const displayProfilePostsModal = (id, data, friend, img_url, status) => {
    if(status == 'img'){
        document.getElementsByClassName('social-info-post-img')[0].innerHTML = `
        <img class="responsize" src="${img_url}" style="width: 100%; height: 100%">`
    }else{
        document.getElementsByClassName('social-info-post-img')[0].innerHTML = `
        <video class="responsize" src="${img_url}" style="width: 100%; height: 100%" controls autoplay repeat>`
    }
}

const displayProfile = async (id, data, friends) => {
    console.log(window.innerWidth)
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
                        <li ><span>${data.friends.length}</span>  following</li>
                        <li class="mx-auto"><span>${data.followers.length}</span>  followers</li>
                    </ul>
                </div>
            </div>
            <div id="social-info-${id}" class="social-info">
                <nav class="navbar navbar-expand-lg border-top border-top-secondary p-0">
                    <button id="social-info-posts-btn-${id}" class="btn btn-light ml-auto social-info-btn">POSTS</button>
                    <button id="social-info-igtv-btn-${id}" class="btn btn-light social-info-btn">IGTV</button>
                    <button id="social-info-tagged-btn-${id}" class="btn btn-light mr-auto social-info-btn">TAGGED</button>
                </nav>
                <div id="social-info-posts" class="row">        
        `

        await db.collection("post").where("userId", "==", id).get().then(snapshot => {
            snapshot.forEach(doc => {
                let img_url = doc.data().imageUrl

                let extension = img_url.split("?")[0];
                extension = extension.substring(extension.length - 3, extension.length)

                if (extension == "PNG" || extension == "jpg" || extension == "jpeg"){
                    html += `
                    <img src="${img_url}" class="col-lg-4 col-md-6 col-sm-12 cursor" id="social-info-post-${doc.id}" onclick="displayProfilePostsModal('${id}', '${data}', '${friends}', '${img_url}', 'img')" data-toggle="modal" data-target="#social-info-post-modal"></img>
                    `
                }else if(extension == "mp4" || extension == "avi"){
                    html += `
                    <video src="${img_url}"  class="col-lg-4 col-md-6 col-sm-12 cursor" id="social-info-post-${doc.id}" onclick="displayProfilePostsModal('${id}', '${data}', '${friends}', '${img_url}', 'video')" data-toggle="modal" data-target="#social-info-post-modal"></video>`
                }
            }) 
        })

        html += `
                    </div>
                </div>
            `
    }else{
        let classFollowOrNot = ""
        let followOrNot = ""
        let followBool = ""

        console.log(friends, id)

        if(friends.includes(currentId)){
            classFollowOrNot = "btn btn-grey border border-light post-follow-btn-${id} mx-3";
            followOrNot = "Followed"
        }else{
            classFollowOrNot = "btn btn-primary post-follow-btn-${id} mx-3";
            followOrNot = "Follow"
            followBool = "followFunction('${id}')"
        }
        
        html = `
        <div id="profile-info-${id}" class="profile-info" style="padding: 3% 0px">
            <img src="${data.avartar}" class="big-avartar responsive2">
            <div id="profile-info-text-${id}" style="display: block">
                <div id="profile-info-text-name-${id}" class="profile-info-text-name" style="display: flex">
                    <h2 style="font-weight: 10;">${data.name}</h2>
                    <button class="${classFollowOrNot}" style="font-size: 13px;padding: 0px 5px" onclick="${followBool}">${followOrNot}</button>
                </div>
                <ul id="profile-info-text-social-${id}" class="mt-3" style="display: flex">
                    <li><span>${data.friends.length}</span>  following</li>
                    <li class="mx-auto"><span>${data.followers.length}</span>  followers</li>
                </ul>
            </div>
        </div>
        <div id="social-info-${id}" class="social-info">
                <nav class="navbar navbar-expand-lg border-top border-top-secondary p-0">
                    <button id="social-info-posts-btn-${id}" class="btn btn-light ml-auto social-info-btn">POSTS</button>
                    <button id="social-info-igtv-btn-${id}" class="btn btn-light social-info-btn">IGTV</button>
                    <button id="social-info-tagged-btn-${id}" class="btn btn-light mr-auto social-info-btn">TAGGED</button>
                </nav>
                <div id="social-info-posts" class="row">        
        `

        await db.collection("post").where("userId", "==", id).get().then(snapshot => {
            snapshot.forEach(doc => {
                let img_url = doc.data().imageUrl

                let extension = img_url.split("?")[0];
                extension = extension.substring(extension.length - 3, extension.length)

                if (extension == "PNG" || extension == "jpg" || extension == "jpeg"){
                    html += `
                    <img src="${img_url}" class="col-lg-4 col-md-6 col-sm-12" id="social-info-post-${doc.id}" onclick="displayProfilePostsModal('${id}', '${data}', '${friends}', '${img_url}', 'img')" data-toggle="modal" data-target="#social-info-post-modal"></img>
                    `
                }else if(extension == "mp4" || extension == "avi"){
                    html += `
                    <video src="${img_url}"  class="col-lg-4 col-md-6 col-sm-12" id="social-info-post-${doc.id}" onclick="displayProfilePostsModal('${id}', '${data}', '${friends}', '${img_url}', 'video')" data-toggle="modal" data-target="#social-info-post-modal"></video>`
                }
            }) 
        })

        html += `
                    </div>
                </div>
        `
    }

    document.getElementById("profile-container").innerHTML += html;

    $("#avartar-change").change(function() {
        file = this.files[0]
        // console.log(filename);

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
    `
    let extension = data.imageUrl.split("?")[0];
    extension = extension.substring(extension.length - 3, extension.length)
    console.log(extension)
    if (extension == "PNG" || extension == "jpg" || extension == "jpeg"){
        html += `
        <img class="card-img-top responsive" src="${data.imageUrl}" alt="Card image cap" width="600px" height="400px"></img>
        `
    }else if(extension == "mp4" || extension == "avi"){
        html += `
        <video class="card-img-top responsive" width="600px" height="400px" src="${data.imageUrl}" controls></video>`
    }
               
    html += `        
            <h5 style="margin: 5px; border: 0.5px solid black; border-radius: 5px; padding: 5px">${data.text}</h5>
            <div id="other-function" style="display:flex; padding: 13px 5px 0px 5px">
                <i id="heart-${id}" class="${heartClassName} ml-auto" style="font-size: 20px; color:red; cursor: pointer" onclick="updateToFirestore('${id}', '${currentId}', 'like')"></i>
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

