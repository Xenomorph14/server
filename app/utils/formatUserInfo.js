
function formatUserInfo( id, name, birthday , department  ){
    userInfo = {
        id : id,
        name : name,
        birthday : birthday,
        department : department,
    }
        return userInfo;
}


module.exports = { formatUserInfo }