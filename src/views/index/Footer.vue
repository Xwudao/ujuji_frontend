<template>
    <div class="footer">
        <p class="copyright">
            <span>&copy;</span>
            <span class="date" v-text="year"/>
            <a href="#" @click.prevent="toIndex">优聚集</a>
            <a href="#" @click.prevent="toHotHub">爱热榜</a>
            <a href="#" @click.prevent="toLzpan">懒盘搜索</a>
<!--            <a href="#" @click.prevent="toNav">优导航</a>-->
            <a href="#" @click.prevent="toMall">💰淘宝优惠券系统💰</a>
            <a href="#" @click.prevent="showWechat = true">公众号</a>
            <a href="#" @click.prevent="toHuawei" target="_blank">华为云</a>
        </p>
        <a href="http://www.beian.miit.gov.cn/" class="icp" target="_blank">蜀ICP备19005797号</a>
        <WechatDialog :visible="showWechat"/>
        <BackgroundEffect/>
    </div>
</template>

<script>
import WechatDialog from "../../components/dialog/WechatDialog";
import TransformData from "../../config/TransformData";
import {TAOKE_URL, MAIN_URL, LZPAN_URL, HUA_WEI_CLOUD_URL, HOT_HUB_URL, NAV_SITE_URL} from "@/config/config";
import BackgroundEffect from "../../components/common/BackgroundEffect";
import * as util from "../../util/utils";

export default {
    name: "Footer",
    components: {WechatDialog, BackgroundEffect},
    data() {
        return {
            year: '',
            showWechat: false,
        }
    },
    methods: {
        toIndex() {
            window.location.href = MAIN_URL;
        },
        toMall() {
            let r = Math.floor(Math.random() * 100) % TAOKE_URL.length;
            util.jumpUrl(TAOKE_URL[r]);
        },
        toHuawei() {
            util.jumpUrl(HUA_WEI_CLOUD_URL);
        },
        toHotHub() {
            util.jumpUrl(HOT_HUB_URL);
        },
        toNav() {
            util.jumpUrl(NAV_SITE_URL, '_blank');
        },
        toLzpan() {
            util.jumpUrl(LZPAN_URL, '_blank');
        }
    },
    created() {
        this.year = new Date().getFullYear();

        TransformData.$on('changeWechat', val => {
            this.showWechat = val;
        })
    }
}
</script>

<style scoped lang="scss">
.footer {
    text-align: center;
    margin: 2rem 0 0 0;
    color: #ffffff;

    font-size: .9rem;

    p {
        color: #ffffff;
        line-height: -.1;

        a {
            margin-left: .5rem;
            color: #ffffff;
        }
    }

    .icp {
        color: #dddddd;
        font-size: .8rem;

        &:hover {
            color: #2ecc71;
        }
    }

}
</style>
