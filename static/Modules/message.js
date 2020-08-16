// const getMessageOnce = (name, img_url) => {
//   messageList.innerHTML = "";
//   title.innerHTML = name
//   title.style.width = "fit-content"
//   document.getElementById("avt").src = img_url

//   db.collection("message")
//     .orderBy("timestamp")
//     .where("name", "in", [name, "Trung Hieu"])
//     .get()
//     .then(function (querySnapshot) {
//       querySnapshot.forEach(function (doc) {
//         // doc.data() is never undefined for query doc snapshots
//         render(doc.data());
//       });
//     })
//     .catch(function (error) {
//       console.log("Error getting documents: ", error);
//     });
// };

// const render = (data) => {
//   try{
//     let className = data.name == "Trung Hieu" ? "admin" : "guest";
//     let nameColor = data.name == "Trung Hieu" ? "time-left" : "time-right";
    
//     let html = `<div class="message-box ${className}">
//                     <img src='${data.avatar}' alt="Hieu" style="width:30px; height: 30px"/>
//                     <p>${data.text}</p>
//                     <span class="${nameColor}">${data.name} at ${convertISOToString(data)}</span>
//                 </div>`;

//     messageList.innerHTML += html;
//     messageList.scrollTop = messageList.scrollHeight;

    
//   }catch(err){
//     console.log("Error")
//     console.log(err)
//     return;
//   }

// };

// const sendToDataBase = () => {
//   var inputField = document.getElementById("input");
//   let date = new Date();

//   db.collection("message")
//     .add({
//       avatar:
//         "https://i7.pngflow.com/pngimage/919/333/png-light-yagami-ryuk-death-note-anime-conan-edogawa-comics-black-hair-manga-fictional-character-clipart.png",
//       name: "Trung Hieu",
//       text: inputField.value,
//       userId: myId,
//       timestamp: date
//     })
//     .catch(function (error) {
//       console.error("Error adding document: ", error);
//     });
  
// };

// inputField.addEventListener("keypress", (e) => {
//   if(e.keyCode == 13){
//     sendToDataBase();
//   }
// })

// const changeTabStatus = () => {
//   let btn = document.getElementById("ocTab");
//   let container = document.getElementById("container");

//   if(btn.className == "fas fa-window-close"){
//     container.style.bottom = "-360px";
//     btn.className = "far fa-window-maximize"
//   }else{
//     container.style.bottom = "0px";
//     btn.className = "fas fa-window-close"
//   }

// }