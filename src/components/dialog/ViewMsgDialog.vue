<template>
    <el-dialog
            title="查看留言"
            :visible.sync="showViewMsgDialog"
            width="400px"
            :modal="false"
            :before-close="cancel">
        <span v-text="text" class="text"></span>
    </el-dialog>
</template>

<script>
    import TransformData from "../../config/TransformData";

    export default {
        name: "ViewMsgDialog",
        props: ['showViewMsgDialog'],
        data() {
            return {
                text: ''
            }
        },
        methods: {
            cancel() {
                TransformData.$emit('changeViewMsgDialog', false);
            },
            reqIsRead(id) {
                this.$http.get('/user/leaveMsg/setRead/' + id).then(() => {
                    // 刷新列表
                    TransformData.$emit('refreshMsgList');
                });
            }
        },
        created() {
            TransformData.$on('ViewMsgText', val => {
                this.text = val.content;
                console.log(val);
                if (!val.isRead) {
                    this.reqIsRead(val.id);
                }
            });
        }
    }
</script>

<style scoped lang="scss">
    .text {
        white-space: pre-line;
        word-break: break-word;
    }
</style>