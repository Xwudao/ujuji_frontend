import http from '../config/http';

export const reqImportBox = (data) => {
    return http.post('/user/box/import', {...data})
}
export const reqUserInfo = () => {
    return http.get('/auth/info')
}

export const reqGenerateToken = () => {
    return http.post('/auth/token')
}
