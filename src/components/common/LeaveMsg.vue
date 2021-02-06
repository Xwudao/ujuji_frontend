<template>
    <div>
        <div class="leaveMsg" @click="openMsgDrawer">
            <el-tooltip class="item" effect="dark" content="留言板"
                        placement="left">
                <i class="iconfont icon-text-fields" :style="{color}"></i>
            </el-tooltip>
        </div>
        <LeaveMsgDialog :show-leave-msg-dialog="showLeaveMsgDialog"/>
    </div>
</template>

<script>
    import LeaveMsgDialog from "../dialog/LeaveMsgDialog";
    import TransformData from "../../config/TransformData";

    export default {
        name: "LeaveMsg",
        props: ['color'],
        components: {LeaveMsgDialog},
        data() {
            return {
                showLeaveMsgDialog: false,
            }
        },
        methods: {
            openMsgDrawer() {
                this.showLeaveMsgDialog = true;
            }
        },
        created() {

            // 接收关于留言抽屉的状态
            TransformData.$on('changeLeaveMsgDialog', val => {
                this.showLeaveMsgDialog = val;
            })
        }
    }
</script>

<style scoped lang="scss">
    .leaveMsg {

        i {
            color: white;
            font-size: 1.7rem;
            cursor: pointer;
        }
    }
</style>