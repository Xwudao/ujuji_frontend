<template>
    <el-row type="flex" justify="center" align="middle">
        <el-col :span="10" :xs="22" :sm="16" :md="14" :lg="10">
            <el-card class="box">
                <div slot="header" class="clearfix">
                    <span>找回密码</span>
                    <el-button @click="toLogin"
                               style="float: right; padding: 3px 0" type="text">直接登录
                    </el-button>
                </div>
                <el-steps :active="stepActive">
                    <el-step title="步骤 1" icon="el-icon-edit" description="输入用户名和对应邮箱地址"></el-step>
                    <el-step title="步骤 2" icon="el-icon-key" description="输入邮箱验证码和新密码"></el-step>
                </el-steps>
                <div class="container">
                    <!--                    步骤条1-->
                    <div class="step1" v-if="stepActive === 1">
                        <el-row type="flex" align="middle">
                            <el-col :span="20">
                                <el-form :rules="reqEmailRules" :model="reqEmailCodeForm" label-width="80px"
                                         ref="reqEmailForm">
                                    <el-form-item label="用户名" prop="username">
                                        <el-input v-model="reqEmailCodeForm.username"
                                                  @keyup.native.enter="onSendEmail"
                                                  placeholder="请输入用户名"></el-input>
                                    </el-form-item>
                                    <el-form-item label="邮 箱" prop="email">
                                        <el-input v-model="reqEmailCodeForm.email"
                                                  @keyup.native.enter="onSendEmail"
                                                  placeholder="请输入和用户名匹配的邮箱地址"></el-input>
                                    </el-form-item>
                                    <el-form-item label="验证码" prop="verifyCode">
                                        <el-row :gutter="4">
                                            <el-col :span="13">
                                                <el-input v-model="reqEmailCodeForm.verifyCode"
                                                          @keyup.native.enter="onSendEmail"
                                                          placeholder="请输入右侧验证码"></el-input>
                                            </el-col>
                                            <el-col :span="5">
                                                <img class="verifyImage" :src="verifyCodeImg" @click="reqVerifyCode"
                                                     alt="验证码">
                                            </el-col>
                                        </el-row>
                                    </el-form-item>
                                    <el-form-item>
                                        <el-button style="float: right" type="primary" @click="onSendEmail">发送邮箱验证码
                                        </el-button>
                                    </el-form-item>
                                </el-form>
                            </el-col>
                        </el-row>
                    </div>
                    <!--                    步骤条2-->
                    <div class="step2" v-if="stepActive === 2">
                        <el-form label-width="70px" :rules="reqUpdateRules" ref="updateForm" :model="updateForm">
                            <el-form-item label="邮箱" prop="email">
                                <el-input v-model="updateForm.email" autocomplete="off" placeholder="邮箱"></el-input>
                            </el-form-item>
                            <el-form-item label="验证码" prop="code">
                                <el-input v-model="updateForm.code" autocomplete="off"
                                          placeholder="发到您邮箱里面的验证码"></el-input>
                            </el-form-item>
                            <el-form-item label="新密码" prop="newPass">
                                <el-input v-model="updateForm.newPass" autocomplete="off"
                                          type="password"
                                          placeholder="新密码，请牢记您的新密码"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="success" @click="onUpdatePass" style="float: right">更新密码</el-button>
                            </el-form-item>
                        </el-form>
                    </div>
                </div>
            </el-card>
        </el-col>
    </el-row>
</template>

<script>
    export default {
        name: "FindPassStep",
        data() {
            return {
                stepActive: 1,
                reqEmailCodeForm: {
                    username: '',
                    email: '',
                    verifyCode: '',
                    code: '',
                },
                updateForm: {
                    email: '',
                    code: '',
                    newPass: '',
                },
                verifyCodeImg: '',
                reqEmailRules: {
                    username: [
                        {required: true, message: '用户名不能为空', trigger: 'blur'},
                    ],
                    email: [
                        {
                            required: true,
                            pattern: /^([a-zA-Z]|[0-9])(\w|-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/,
                            message: '请正确输入邮箱地址',
                            trigger: 'blur'
                        },
                    ],
                    verifyCode: [
                        {required: true, message: '验证码不能为空', trigger: 'blur'},
                    ],
                },
                reqUpdateRules: {
                    newPass: [
                        {required: true, message: '请输入新密码', trigger: 'blur'},
                        {min: 6, message: '最少6位', trigger: 'blur'}
                    ],
                    email: [
                        {
                            required: true,
                            pattern: /^([a-zA-Z]|[0-9])(\w|-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/,
                            message: '请正确输入邮箱地址',
                            trigger: 'blur'
                        },
                    ],
                    code: [
                        {required: true, message: '请输入发到您邮箱里面的验证码', trigger: 'blur'},
                    ],
                }
            }
        },
        methods: {
            toLogin() {
                this.$router.push({name: 'UserLogin'});
            },
            onSendEmail() {
                this.$refs['reqEmailForm'].validate((valid) => {
                    if (!valid) {
                        return false;
                    }
                    this.reqSendEmail();
                });
            },
            //请求邮箱验证码
            reqSendEmail() {
                // todo 这里要判断是否10min内已经发送给过了，如果是，那么进入步骤2
                this.$http.post('/auth/sendUpdateMail', this.reqEmailCodeForm)
                    .then(res => {
                        let data = res.data;
                        let code = data.code;
                        this.updateForm.email = this.reqEmailCodeForm.email;
                        if (code === 31026) {
                            // 步骤条进入第二步
                            this.stepActive = 2;
                            this.$notify.warning(data.msg);
                        } else {
                            if (code !== 20019) {
                                //有错误
                                this.$notify.error(data.msg);
                            } else {
                                this.stepActive = 2;
                                this.$notify.success(data.msg);
                            }
                        }
                    }).catch(() => {
                    this.$notify.error('系统或网络错误，请稍后重试');
                })
            },

            onUpdatePass() {
                this.$refs['updateForm'].validate((valid) => {
                    if (!valid) {
                        return false;
                    }
                    this.reqUpdatePass();
                });
            },
            reqUpdatePass() {
                this.$http.post('/auth/updatePassWithCode', this.updateForm)
                    .then(res => {
                        let data = res.data;
                        let code = data.code;
                        if (code === 20007) {
                            this.$notify.success(data.msg);
                            setTimeout(() => {
                                this.$router.push({name: 'UserLogin'});
                            }, 1200)
                        } else {
                            this.$notify.error(data.msg);
                        }
                    }).catch(() => {
                    this.$notify.error('系统或网络错误，请稍后重试');
                })
            },
            //请求验证码
            reqVerifyCode() {
                this.$http.get('/public/verifyCode')
                    .then(res => {
                        let data = res.data;
                        this.verifyCodeImg = data.data.image;
                        this.reqEmailCodeForm.code = data.data.code;
                    }).catch(() => {
                    this.$notify.error('抱歉，请求验证码失败');
                });
            },
        },
        created() {
            this.reqVerifyCode();
        }
    }
</script>

<style scoped lang="scss">
    .box {
        margin-top: 5rem;
    }

    .container {
        margin-top: 2rem;
    }

    .verifyImage {
        cursor: pointer;
    }
</style>