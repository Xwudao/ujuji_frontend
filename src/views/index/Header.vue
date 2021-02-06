<template>
    <div class="header">
        <el-row type="flex" justify="space-between">
            <el-col :span="10" :xs="20">
        <span
            @click="openWeatherDialog"
            :style="[{color: searchSiteColor},{borderColor: searchSiteColor}]"
            class="weather" v-if="hasWeather">{{ weatherData.city }}
          - 今天({{ weekDay }}) - {{ weatherData.today.condition }} - {{ weatherData.today.temp }}</span>
            </el-col>
            <el-col :span="8" class="user">
                <a href="https://nav.ujuji.com" target="_blank">公开导航</a>
                <router-link :to="{name:'UserLogin'}" v-if="!username" :style="{color:searchSiteColor}">
                    登录/注册
                </router-link>
                <router-link :to="{name:'HomeConfig'}" v-else v-text="username" :style="{color:searchSiteColor}"/>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import TransformData from "../../config/TransformData";
import {reqTQData} from "@/api/commonApi";
import {mapState} from 'vuex';
import {getWeekDate} from "@/util/utils";
import {EVENT_OPEN_WEATHER_DIALOG, EVENT_WEATHER} from "@/config/events"

export default {
    name: "Header",
    data() {
        return {
            username: '',
            searchSiteColor: '#fff',
            hasWeather: false,
            weekDay: '',
            weatherData: {}
        }
    },
    computed: {
        ...mapState(['city']),
    },
    methods: {
        openWeatherDialog() {
            TransformData.$emit(EVENT_OPEN_WEATHER_DIALOG);
        },
        _handleReqTQ() {
            // 获取天气预报
            let city = this.city || ''
            reqTQData(city)
                .then((res) => {
                    try {
                        let data = res.data;
                        this.weatherData = JSON.parse(data.data).data.weather.content;
                        this.hasWeather = true
                    } catch (e) {
                        this.weatherData = {}
                    }
                })
        }
    },
    created() {
        this.username = this.$store.state.username;
        // 接受一些背景等信息
        TransformData.$on('setConfigInfo', val => {
            if (val.searchSiteColor) {//搜索站点的颜色
                this.searchSiteColor = val.searchSiteColor;
            }
        });

        TransformData.$on(EVENT_WEATHER, () => {
            this._handleReqTQ();
        })

        // 周几
        this.weekDay = getWeekDate()
        this._handleReqTQ();
    }
}
</script>

<style scoped lang="scss">
.weather {
    border: none;
    color: #fff;

    a {
        color: #f2f2f2;
    }
}

.header {
    padding: .5rem 1rem;

    .user {
        text-align: right;
        //display: flex;
        //justify-content: center;
        //align-items: center;

        a {
            margin: 0 .2rem;
            color: white;
        }
    }

    .weather {
        border: 1px solid #ffffff;
        border-radius: .1rem;
        padding: .3rem .5rem;
        font-size: .8rem;
        cursor: pointer;
    }
}
</style>
