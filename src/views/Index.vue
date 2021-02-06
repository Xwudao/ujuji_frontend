<template>
    <div>
        <div class="bg" v-loading.fullscreen.lock="fullscreenLoading" :style="{
        backgroundImage:backgroundImage!=='' && backgroundImage!==null ?
        `url('${backgroundImage}')` :
        '#000'
    }">
        </div>
        <div class="index" ref="indexWrapper">
            <Header/>
            <Search/>
            <Nav/>
            <Footer/>
            <RightBar/>
            <!--        <Music :background-music="backgroundMusic"/>-->
            <!--        <Notice :long-notice="longNotice"/>-->
        </div>
    </div>

</template>

<script>
import RightBar from "./index/RightBar";
import Header from "./index/Header";
import Search from "./index/Search";
import Nav from "./index/Nav";
import Footer from "./index/Footer";
import TransformData from "../config/TransformData";
import {BING_IMG_API_URL, ANIME_IMG_API_URL, KEY_BACKGROUND_IMAGE, EVENT_SET_BGI} from "@/config/config";
// import getInfo from "../config/getInfo";
import * as util from "../util/utils";

export default {
    name: "Index",
    components: {Header, Search, Nav, Footer, RightBar},
    data() {
        return {
            backgroundImage: '',
        }
    },
    created() {

        // 判断是否是其他后缀，优先级设为最高嘛
        if (/^(\w+)\.ujuji\.com$/ig.test(location.hostname)) {
            let hosts = /^(\w+)\.ujuji\.com$/ig.exec(location.hostname);
            let h = hosts[1];
            if (h && h !== 'www') {
                this.$store.commit('changeSuffix', hosts[1]);
            }
        }
        // else {
        //     //  检测后缀
        //     let suffix = this.$route.params.suffix;
        //     if (suffix) {
        //         this.$router.push({name: 'Index'});
        //         // this.$store.commit('changeSuffix', suffix);
        //     }
        // }
        let lImg = localStorage.getItem(KEY_BACKGROUND_IMAGE) || ''

        // 接受一些背景等信息
        TransformData.$on('setConfigInfo', val => {
            let bgType = val.otherImg;
            if (util.isMobile() && val.mobileImg) {
                this.backgroundImage = val.mobileImg;
                return;
            }
            if (lImg.trim()) {// 用户自定义了背景图片
                this.backgroundImage = lImg
            } else {

                //选择背景图片
                switch (bgType) {
                    case -1:
                        this.backgroundImage = val.backgroundImage;
                        break;
                    case 1:
                        this.backgroundImage = BING_IMG_API_URL;
                        break;
                    case 2:
                        this.backgroundImage = ANIME_IMG_API_URL;
                        break;
                    default:
                        this.backgroundImage = val.backgroundImage;
                }
            }
        });

        // 改变背景图片
        TransformData.$on(EVENT_SET_BGI, (val) => {
            if (val)
                this.backgroundImage = val
        })
    },
    computed: {
        fullscreenLoading() {
            return this.$store.state.indexLoading;
        }
    },
}
</script>

<style scoped lang="scss">
.bg {
    z-index: -1;
    position: fixed;
    top: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    /*filter: blur(3px);*/
    background-attachment: fixed;
    background-size: cover;
    background-position: 50%;
    min-height: 100vh;
}

.index {
    /*background-color: #f1f1f1;*/
    /*background-image: url('https://tool.misiyu.cn/api/bing');*/
    //background-image: url('https://i.loli.net/2020/04/06/gwS8JGhAPvWDq3K.jpg');
    /*background-image: url('https://wimg.misiyu.cn/images/2020/5/2020-05-26_b678555fd1f6bb38c8bc27bda7b6c44f.png?x-oss-process=style/common');*/
    /*background-image: url('../assets/img/bg.gif');*/

}

.index:before, .bg:before {
    content: ' ';
    position: fixed;
    z-index: -1;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-position: center 0;
    background-repeat: no-repeat;
    /*background: url() center 0 no-repeat;*/
    background-size: cover;
}

.top {
    height: 100%;
    width: 100%;
    background-color: #f2f5f6;
    box-shadow: 0 0 6px rgba(0, 0, 0, .12);
    text-align: center;
    line-height: 40px;
    color: #2ecc71;
}
</style>
