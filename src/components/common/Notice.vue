<template>
    <div v-if="longNotice">
        <div class="notice" @click="showNoticeDialog = true">
            <el-tooltip class="item" effect="dark" content="站点公告"
                        placement="left">
                <i class="iconfont icon-notifications-active" :style="{color}"></i>
            </el-tooltip>
        </div>
        <NoticeDialog :show-notice-dialog="showNoticeDialog" :text="longNotice"/>
    </div>
</template>

<script>
    import TransformData from "../../config/TransformData";
    import NoticeDialog from "../dialog/NoticeDialog";

    export default {
        name: "Notice",
        props: ['longNotice', 'color'],
        components: {NoticeDialog},
        data() {
            return {
                showNoticeDialog: false,
            }
        },
        created() {
            // 改变公告栏
            TransformData.$on('changeNoticeDialog', val => {
                this.showNoticeDialog = val;
            });
        }
    }
</script>

<style scoped lang="scss">
    .notice {
        text-align: center;

        i {
            color: white;
            font-size: 1.7rem;
            cursor: pointer;
        }
    }
</style>
