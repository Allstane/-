export const saveUserName = (value) => {
    localStorage.setItem('userName', value)
}
export const getUserName = () => {
    return localStorage.getItem('userName')
}
let currentUserRole;
export const saveUserRole = (value) => {
    localStorage.setItem('role', value)
    currentUserRole =  localStorage.getItem('role')
}

export const getUserRole = () => {
    return localStorage.getItem('role')
}

export const isUserRoleChanged = () => {
    return currentUserRole === getUserRole()
}