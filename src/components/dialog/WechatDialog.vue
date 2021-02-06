<template>
    <el-dialog
            title="微信公众号"
            :visible.sync="visible"
            width="300px"
            :modal="false"
            :before-close="cancel">
        <img src="https://wimg.misiyu.cn/images/2020/2/2020-02-06_2a9aa379437ba54b756e66270364f08f.jpg?x-oss-process=style/common"
             class="wechat"
             alt="微信公众号">
        <p class="text">
            交流、反馈、优质网站推荐，都在【迷思爱】公众号
        </p>
    </el-dialog>
</template>

<script>
    import TransformData from "../../config/TransformData";

    export default {
        props: {
            visible: {
                default: false,
            }
        },
        name: "WechatDialog",
        methods: {
            cancel() {
                TransformData.$emit('changeWechat', false);
            }
        }
    }
</script>

<style scoped lang="scss">
    .wechat {
        width: 255px;
        height: 255px;
    }

    .text {
        color: #666666;
        font-size: .9rem;
    }
</style>