<template>
    <el-col :span="20">
        <el-row>
            <el-col :span="15">
                <el-form :model="form" :rules="rules" ref="form" label-width="100px">
                    <el-form-item label="欢迎提示" prop="content">
                        <el-input v-model="form.content" placeholder="一段简短的入站提示(50字，在顶部，自动显示）">
                        </el-input>
                    </el-form-item>
                    <el-form-item label="公告内容" prop="longNotice">
                        <el-input type="textarea" :rows="5" v-model="form.longNotice" placeholder="一段公告（最多450个字符，点击显示）">
                        </el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button size="mini" type="primary" @click="onSubmit">提交</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
    </el-col>

</template>

<script>
    export default {
        name: "NoticeConfig",
        data() {
            return {
                userId: -1,
                form: {
                    id: -1,
                    userId: -1,
                    content: '',
                    longNotice: '',
                },
                rules: {
                    content: [
                        {required: false, min: 1, max: 50, message: '最短1个字，最多50字符'}
                    ],
                    longNotice: [
                        {required: false, min: 1, max: 450, message: '最短1个字，最多450字符'}
                    ],
                }
            }
        },
        methods: {
            reqData() {
                this.$http.get('/user/notice')
                    .then(res => {
                        // console.log(res);
                        let data = res.data;
                        this.form.content = data.data.content;
                        this.form.longNotice = data.data.longNotice;
                        this.form.id = data.data.id;
                        this.form.userId = data.data.userId;
                    });
            },
            reqUpdate() {
                this.$http.put('/user/notice', this.form)
                    .then(res => {
                        let data = res.data;
                        let code = data.code;
                        if (code !== 30006) {
                            this.$notify.error(data.msg);
                        } else {
                            this.$notify.success(data.msg);
                            this.reqData();
                        }
                    })
            },
            onSubmit() {
                this.$refs['form'].validate((valid) => {
                    if (!valid) {
                        return false;
                    } else {
                        this.reqUpdate();
                    }
                });
            }
        },
        created() {
            this.reqData();
        }
    }
</script>

<style scoped lang="scss">

</style>