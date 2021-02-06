<template>
    <div id="user">
        <Top/>
        <el-row :gutter="30">
            <Left/>
            <keep-alive exclude="">
                <router-view/>
            </keep-alive>
        </el-row>
        <Bottom/>
    </div>
</template>

<script>
    import Bottom from "../components/user/Bottom";
    import Top from "../components/user/Top";
    import Left from "../components/user/Left";
    import TransformData from "../config/TransformData";
    import {UPDATE_NOTE_SHOW_KEY} from "@/config/config";
    import getInfo from "../config/getInfo";
    import * as util from "../util/utils";

    export default {
        name: "User",
        data() {
            return {}
        },
        components: {
            Bottom, Top, Left
        },
        methods: {
            reqUserInfo() {
                this.$http.get('/user/info').then(res => {
                    let data = res.data;
                    let code = data.code;
                    console.log(code);
                    if (code && code === 1000) {

                        localStorage.setItem('userInfo', JSON.stringify(data));
                        localStorage.setItem('userId', data.data.id);
                        localStorage.setItem('username', data.data.username);
                        this.$store.commit('changeUserId', data.data.id);
                        this.$store.commit('changeUsername', data.data.username);

                        this.$notify.success('欢迎回来，' + data.data.username);
                    } else {
                        this.$notify.error('请登录');
                        this.$router.push({name: 'UserLogin'});
                    }
                }).catch((err) => {
                    let data = err.response.data;
                    if (data.status === 403) {
                        this.$notify.error('登录以过期，请重新登录');
                        this.$router.push({name: 'UserLogin'});
                    }
                    this.$notify.error('系统错误，请稍后重试');
                })
            }
        },


        created: function () {

            // 是手机
            if (getInfo.isMobile) {
                this.$confirm('控制台只适配了电脑PC端哟，手机端无法兼容', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                });
            }

            // this.reqUserInfo();//登录哪里已经获取过一次了，这次就不获取了
            // this.reqUserInfo();

            TransformData.$on('updateUserInfo', () => {
                this.reqUserInfo();
            });

            let item = localStorage.getItem('token');
            if (!item) {
                localStorage.clear();
                this.$router.push({name: 'UserLogin'});
            }

            // 是否已阅读
            let isRead = localStorage.getItem(UPDATE_NOTE_SHOW_KEY);
            if (!isRead) {
                this.$router.push({name: 'UpdateNote'});
                //先清除以前的东西
                util.resetNoteVer(UPDATE_NOTE_SHOW_KEY);
                localStorage.setItem(UPDATE_NOTE_SHOW_KEY, 'true');
            }
        }
    }
</script>

<style scoped lang="scss">

</style>
