<template>
    <el-dialog
            title="回复留言"
            :visible.sync="showReplyMsgDialog"
            width="400px"
            :modal="false"
            :before-close="cancel">
        <el-form :model="form">
            <el-form-item>
                <el-input type="textarea" v-model="form.reply" :rows="7"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button size="mini" @click="onsubmit">提交</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
</template>

<script>
    import TransformData from "../../config/TransformData";

    export default {
        name: "MsgReplyDialog",
        props: ['showReplyMsgDialog'],
        data() {
            return {
                form: {
                    reply: '',
                    id: -1,
                }
            }
        }, methods: {
            cancel() {
                TransformData.$emit('changeReplyMsgDialog', false);
            },
            onsubmit() {
                this.$http.put('/user/leaveMsg/reply', this.form)
                    .then(res => {
                        let data = res.data;
                        let code = data.code;
                        if (code === 31018) {
                            this.$notify.success(data.msg);
                            TransformData.$emit('refreshMsgList');
                        } else {
                            this.$notify.error(data.msg);
                        }
                    }).catch(() => {
                    this.$notify.error('系统错误');
                });
            }
        },
        created() {
            TransformData.$on('ReplyMsgText', val => {
                this.form.reply = val.reply;
                this.form.id = val.id;
            });
        }
    }
</script>

<style scoped lang="scss">

</style>