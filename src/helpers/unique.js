export function isUniqueEmail(users, currentEmail){
    let isValid = true
    users.forEach(user => {
        if(user.email === currentEmail){
            isValid = false
        } else {
            return
        }
    });
   
    return isValid
}