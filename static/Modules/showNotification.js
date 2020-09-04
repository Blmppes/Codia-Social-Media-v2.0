const showNotification = (id, data) => {
    console.log(data)
    menu = document.getElementById("profile-notification-dropdown-menu");

    if(!(data.read.includes(currentId))){
        let text = $("#profile-notification-dropdown-btn span").text()
        $("#profile-notification-dropdown-btn span").text(String(Number(text) + 1))
    }
   
    menu.innerHTML += `
        <div id="profile-notification-dropdown-menu-${id}" style="border-bottom: 1px solid rgb(117, 116, 116);">
            <img src="${data.avartar}" class="small-avartar"/>
            <a style="font-size: 22px;display:inline" onclick="changeProfileId('${data.userId}', 'p')">${data.name}</a>
            <h6 style="font-size: 13px">Has posted a new status at ${data.timestamp.toDate()}</h6>
        </div>
    `
}