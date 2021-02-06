<template>
    <div class="right-bar">

        <!--    <ToHot :color="searchSiteColor"/>-->
        <!--    <ToNav :color="searchSiteColor"/>-->
        <Weather :color="searchSiteColor"/>
        <!--    <People :color="searchSiteColor"/>-->
        <Music :color="searchSiteColor"/>
        <Mall :color="searchSiteColor"/>
        <Notice :color="searchSiteColor" :long-notice="longNotice"/>
        <LeaveMsg :color="searchSiteColor"/>
        <add :color="searchSiteColor"/>
        <Sort :color="searchSiteColor"/>

    </div>
</template>

<script>
import Weather from "@/components/common/Weather";
import Music from "../../components/common/Music";
import Notice from "../../components/common/Notice";
import TransformData from "../../config/TransformData";
import LeaveMsg from "../../components/common/LeaveMsg";
import Mall from "../../components/common/ToMall";
import Sort from "../../components/common/Sort";
import Add from "@/components/common/Add";
// import People from "../../components/common/People";
// import ToHot from "@/components/common/ToHot";

export default {
    name: "RightBar",
    components: {Add, Notice, Music, Weather, LeaveMsg, Sort, Mall},
    // components: {Notice, Music, Weather,LeaveMsg, Sort, ToNavToNav, ToHot},
    data() {
        return {
            longNotice: '',
            searchSiteColor: '#fff',
        }
    },
    created() {

        // 接受一些背景等信息
        TransformData.$on('setConfigInfo', val => {
            let localMusic = localStorage.getItem('backgroundMusic') || null;
            let music = localMusic || val.backgroundMusic;
            this.$store.commit('changeBackgroundMusic', music);//通过store设置背景音乐，不通过父传子了

            if (val.searchSiteColor) {//搜索站点的颜色
                this.searchSiteColor = val.searchSiteColor;
            }
        });
        // 接受公告信息
        TransformData.$on('setNoticeInfo', val => {
            try {
                this.longNotice = val.longNotice;
            } catch (e) {
                this.longNotice = '';
            }
        });
    }
}
</script>

<style scoped lang="scss">

@media screen and (max-width: 500px) {
    .right-bar {
        bottom: 3rem !important;
        top: unset !important;
    }
}

.right-bar {
    position: fixed;
    top: 8rem;
    right: 1rem;

    & > div {
        margin: 1rem 0;
    }
}
</style>
