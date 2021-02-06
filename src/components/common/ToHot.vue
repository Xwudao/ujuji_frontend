<template>
    <div class="nav" @click="toHot" >
        <el-tooltip class="item" effect="dark" content="爱热榜，热点消息一应俱全"
                    placement="left">
            <i class="iconfont icon-hot" :style="{color}"></i>
        </el-tooltip>
    </div>
</template>

<script>
    import {HOT_HUB_URL} from "../../config/config";
    import * as util from "../../util/utils";

    export default {
        name: "ToHot",
        props: ['color'],
        data() {
            return {
            }
        },
        methods: {
          toHot() {
                util.jumpUrl(HOT_HUB_URL , '_blank');
            }
        },
    }
</script>

<style scoped lang="scss">
    .nav {

        i {
            color: white;
            font-size: 1.5rem;
            cursor: pointer;
        }
    }
</style>
