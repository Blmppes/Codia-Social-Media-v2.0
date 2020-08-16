function convertISOToString(data){
    let date = data.timestamp.toDate()
    return `${date.getHours()}:${date.getMinutes()} ${date.getMonth()+1}/${date.getDate()}/${date.getFullYear()}`;
}