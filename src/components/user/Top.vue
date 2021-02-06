<template>
    <div class="top">
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
            <el-menu-item index="1">控制台</el-menu-item>
            <el-submenu index="2" class="user-submenu">
                <template slot="title">{{ username }}</template>
                <el-menu-item index="2-1" @click="$router.push({name:'Index'})">返回首页</el-menu-item>
                <el-menu-item index="2-2" @click="logout">退出</el-menu-item>
            </el-submenu>
        </el-menu>
    </div>
</template>

<script>
    // import getUserInfo from "../../config/getInfo";

    export default {
        name: "Top",
        data() {
            return {
                activeIndex: "1",
                username: ''
            }
        },
        methods: {
            handleSelect() {

            },
            logout() {
                localStorage.removeItem('token');
                this.$router.push({name: 'UserLogin'});
            }
        },
        created() {
            this.username = this.$store.state.username;

        }
    }
</script>

<style scoped lang="scss">
    .top {
        margin-bottom: 1rem;

        .user-submenu {
            float: right;
        }
    }
</style>