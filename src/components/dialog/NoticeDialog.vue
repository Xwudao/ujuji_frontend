<template>
    <el-dialog
            title="站点公告"
            :visible.sync="showNoticeDialog"
            width="400px"
            :modal="false"
            :before-close="cancel">
        <p v-if="text" v-text="text" class="notice-text"/>
        <span v-else class="no">站长暂未设置公告哟！</span>
    </el-dialog>
</template>

<script>
    import TransformData from "../../config/TransformData";

    export default {
        name: "NoticeDialog",
        props: {
            showNoticeDialog: {
                default: false,
                type: Boolean
            },
            text: {
                default: '',
                type: String
            }
        },
        methods: {
            cancel() {
                TransformData.$emit('changeNoticeDialog', false);
            }
        }
    }
</script>

<style scoped lang="scss">
    .no {
        color: #3498db;
    }

    .notice-text {
        white-space: pre-line;
    }
</style>