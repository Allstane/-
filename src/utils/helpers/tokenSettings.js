export const getToken = () => {
    return localStorage.getItem('token') || ''
}

export const saveToken = (value) => {
    return localStorage.setItem('token', value)
}

export const verifyToken = () => {
    return !!getToken()
}

