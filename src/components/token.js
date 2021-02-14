
export function hasToken() {
    if(localStorage.getItem('token')) {
        return true;
    } else {
        return false;
    }
}
export function getToken() {
    if(localStorage.getItem('token')) {
        return localStorage.getItem('token');
    } else {
        return null;
    }
}
export function setToken(token) {
    localStorage.setItem('token', token);
}
export function removeToken() {
    localStorage.removeItem('token');
}
