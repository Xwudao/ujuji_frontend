import {KEY_WEATHER} from "@/config/keys";

const state = {
    token: '',
    userInfo: {},
    userId: -1,
    username: '',
    suffix: '',
    city: '',
    defaultSuffix: '',
    indexLoading: false,
    backgroundImage: '',
    backgroundMusic: '',
    siteUserId: -1,
    playMusic: false,
    sort: false,
}

let city = localStorage.getItem(KEY_WEATHER) || '';
if (city) {
    state.city = city
}

export default state
