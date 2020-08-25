const uploadImage = () => {

    //Upload file to storage
    let file = FILE.files[0];
    console.log(file)

    let storageRef = storage.ref('pictures/' + file.name);

    let task = storageRef.put(file);

    task.on('state_changed',
        function progress(snapshot){},

        function error(err){
            console.log(err);
        },

        function complete(){
            //Download Image

            task.snapshot.ref.getDownloadURL().then(function(url) {
                db.collection("profile").doc(currentId).get().then(doc => {
                    db.collection("post")
                    .add({
                        avartar: doc.data().avartar,
                        name: doc.data().name,
                        text: postText.value,
                        userId: currentId,
                        timestamp: new Date(),
                        imageUrl: url,
                        caption: postCaption.value,
                        like: 0,
                        liked: [],
                        comments: []
                    })
                    .catch(function (error) {
                        console.error("Error adding document: ", error);
                    });
                })
            }).catch(function(error) {  
                console.log(error);
            });
        }
    )
   
};