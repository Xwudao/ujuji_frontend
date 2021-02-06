import http from '../config/http';

export const reqBoxData = (userId) => {
    return http.get('/user/box/user/' + userId)
}
export const reqBoxesByToken = (token) => {
    return http.get(`/public/allBoxes/token/${token}`)
}

export const reqAddLink = (token, data) => {
    return http.post(`/public/token/${token}`, {...data})
}
