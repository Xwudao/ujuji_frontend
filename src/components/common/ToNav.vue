<template>
    <div class="nav" @click="toNav">
        <el-tooltip class="item" effect="dark" content="优聚集 - 发现宝藏网站"
                    placement="left">
            <i class="iconfont icon-navigation-fill" :style="{color}"></i>
        </el-tooltip>
    </div>
</template>

<script>
    import * as util from "../../util/utils";
    import {NAV_SITE_URL} from "@/config/config";

    export default {
        name: "ToNav",
        props: ['color'],
        data() {
            return {
                isMobile: false,
            }
        },
        methods: {
            toNav() {
                util.jumpUrl(NAV_SITE_URL, '_blank');
            }
        },
        created() {
            this.isMobile = util.isMobile();
        },
        computed: {
            suffix() {
                return this.$store.state.suffix;
            }
        }
    }
</script>

<style scoped lang="scss">
    .nav {

        i {
            color: white;
            font-size: 1.7rem;
            cursor: pointer;
        }
    }
</style>
