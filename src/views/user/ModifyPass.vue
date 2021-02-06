<template>
    <el-col :span="20">
        <el-row :gutter="10">
            <el-col :span="9">
                <el-button size="small" style="margin-bottom: 1rem;">修改密码</el-button>
                <el-form ref="form" :rules="rules" :model="form" label-width="80px">
                    <el-form-item label="旧的密码" prop="oldPass">
                        <el-input v-model="form.oldPass" type="password"></el-input>
                    </el-form-item>
                    <el-form-item label="新的密码" prop="newPass">
                        <el-input v-model="form.newPass" type="password"></el-input>
                    </el-form-item>
                    <el-form-item label="确认密码" prop="confirmPass">
                        <el-input v-model="form.confirmPass" type="password"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button size="small" style="float: right" type="success"
                                   @click="onsubmit">修改
                        </el-button>
                    </el-form-item>
                </el-form>
            </el-col>
            <el-col :span="5">
                <el-alert
                        style="margin-top: 3rem;"
                        title="如果密码有特殊字符，可能导致之后登陆失败，建议大小写+数字"
                        type="error">
                </el-alert>
            </el-col>
        </el-row>
    </el-col>

</template>

<script>
    export default {
        name: "ModifyPass",
        data() {
            const validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入确认密码'));
                } else if (value !== this.form.newPass) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            return {
                form: {
                    oldPass: '',
                    newPass: '',
                    confirmPass: '',
                },
                rules: {
                    oldPass: [
                        {required: true, message: '旧密码必填', trigger: 'blur'},
                        {min: 6, message: '最少6个字符', trigger: 'blur'},
                    ],
                    newPass: [
                        {required: true, message: '新密码必填', trigger: 'blur'},
                        {min: 6, message: '最少6个字符', trigger: 'blur'},
                    ],
                    confirmPass: [
                        {validator: validatePass, trigger: 'blur'},
                    ],
                }
            }
        },
        methods: {

            onsubmit() {
                this.$refs['form'].validate((valid) => {
                    if (!valid) {
                        return false;
                    }
                    this.$http.post('/user/updatePassword', 'oldPass=' + this.form.oldPass + '&newPass=' + this.form.newPass, {
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded'
                        }
                    }).then(res => {
                        let data = res.data;
                        if (data.code !== 20007) {
                            this.$notify.error(data.msg);
                        } else {
                            this.$notify.success(data.msg);
                            setTimeout(() => {
                                localStorage.removeItem('token');
                                this.$router.push({name: 'UserLogin'})
                            }, 1000)
                        }
                    }).catch(() => {
                        this.$notify.error('系统错误，请稍后重试');
                    })
                });
            }
        }
    }
</script>

<style scoped lang="scss">

</style>