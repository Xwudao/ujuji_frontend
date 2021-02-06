<template>
    <div class="mall" @click="toMall">
        <el-tooltip class="item" effect="dark" content="淘宝天猫内部优惠券"
                    placement="left">
            <i class="iconfont icon-shop_car" :style="{color}"></i>
        </el-tooltip>
    </div>
</template>

<script>
    import * as util from "../../util/utils";
    import {MALL_URL} from "@/config/config";

    export default {
        name: "ToMall",
        props: ['color'],
        data() {
            return {
            }
        },
        methods: {
            toMall() {
                util.jumpUrl(MALL_URL, '_blank');
            }
        },
        computed: {
            suffix() {
                return this.$store.state.suffix;
            }
        }
    }
</script>

<style scoped lang="scss">
    .mall {

        i {
            color: white;
            font-size: 1.7rem;
            cursor: pointer;
        }
    }
</style>
