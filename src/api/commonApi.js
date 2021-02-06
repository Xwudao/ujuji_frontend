import http from '../config/http'

export  const reqTQData = (city = '') => {
    return http.get('/public/weather?city='+city)
}
