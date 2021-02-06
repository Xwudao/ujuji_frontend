import axios from "axios";
import router from "../router";
import store from "../store";

let url;
if (process.env.NODE_ENV === 'production') {
    url = 'https://api.ujuji.com'
} else {
    url = 'http://localhost:4037'
}
axios.defaults.baseURL = url;
axios.defaults.headers.common['Content-Type'] = 'application/json';
// axios.defaults.headers.common['Authorization'] = store.state.token;
axios.interceptors.request.use(
    config => {
        config.headers['Authorization'] = 'Bearer ' + store.state.token;
        return config;
    }
)
axios.interceptors.response.use(
    (responses) => responses,
    (error) => {
        if (error.response && error.response.status === 403) {
            console.log(error);
            localStorage.removeItem('token');
            router.push({name: "UserLogin"});
            return new Promise(() => {
            }) // pending的promise，中止promise链
        }
    }
);
export default axios;