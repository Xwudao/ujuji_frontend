<template>
    <div class="login" @click="toHome">
        <el-tooltip class="item" effect="dark" content="登录/注册/进入后台"
                    placement="left">
            <i class="iconfont icon-person" :style="{color}"></i>
        </el-tooltip>
    </div>
</template>

<script>
    // import {SEARCH_SITE_URL} from "../../config/config";
    // import * as util from "../../util/utils";


    export default {
        name: "People",
        props: ['color'],
        data() {
            return {}
        },
        methods: {
            toHome() {
                this.$router.push({name: 'HomeConfig'});
            }
        },
        created() {
        },
        computed: {}
    }
</script>

<style scoped lang="scss">
    .login {

        i {
            color: white;
            font-size: 1.7rem;
            cursor: pointer;
        }
    }
</style>