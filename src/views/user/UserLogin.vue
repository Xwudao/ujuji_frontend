<template>
    <div class="login">
        <el-row type="flex" justify="center" align="middle">
            <el-col :xs="22" :sm="16" :md="14" :lg="8">
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span v-if="page==='login'">用户登录</span>
                        <span v-if="page==='register'">用户注册</span>

                        <el-button v-if="page==='login'" @click="changePage('register')"
                                   style="float: right; padding: 3px 0" type="text">注册账号
                        </el-button>
                        <el-button v-if="page==='register'" @click="changePage('login')"
                                   style="float: right; padding: 3px 0" type="text">直接登录
                        </el-button>
                    </div>
                    <el-form ref="form" :rules="rules" :model="form" label-width="80px">
                        <el-form-item label="用户名" prop="username">
                            <el-input @keyup.native.enter="onEnter"
                                      placeholder="请输入用户名"
                                      v-model="form.username"></el-input>
                        </el-form-item>
                        <el-form-item label="密  码" prop="password">
                            <el-input @keyup.native.enter="onEnter"
                                      placeholder="请输入密码"
                                      v-model="form.password" type="password"></el-input>
                        </el-form-item>
                        <el-form-item label="邮 箱" prop="email" v-if="page==='register'">
                            <el-input v-model="form.email" placeholder="请输入邮箱"></el-input>
                        </el-form-item>
                        <el-form-item label="验证码" prop="verifyCode">
                            <el-row>
                                <el-col :span="15">
                                    <el-input @keyup.native.enter="onEnter" v-model="form.verifyCode"
                                              placeholder="请输入验证码"></el-input>
                                </el-col>
                                <el-col :span="7">
                                    <img :src="verifyCodeImg" alt="验证码" @click="refreshVerifyImage" ref="verify"
                                         class="verifyImage">
                                </el-col>
                            </el-row>
                        </el-form-item>
                        <el-form-item label="协议" prop="agreement">
                            <el-checkbox label="同意协议" name="agreement" v-model="agree">
                            </el-checkbox>
                            <a href="https://www.misiyu.cn/article/150.html" class="agree" target="_blank">《[优聚集]用户使用与免责申明》</a>
                        </el-form-item>
                        <el-form-item>

                            <el-button v-if="page==='register'" size="small" style="float: right" type="success"
                                       @click="onRegister('form')">注册
                            </el-button>
                            <el-button v-if="page==='login'" size="small" style="float: right" type="primary"
                                       @click="onLogin('form')">登录
                            </el-button>
                            <el-button @click="toFindPass" size="small"
                                       style="float: left;margin-right: 1rem;" type="findPass">忘记密码
                            </el-button>
                        </el-form-item>
                    </el-form>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
// import TransformData from "../../config/TransformData";

export default {
    name: "UserLogin",
    data() {
        return {
            page: 'login',
            form: {
                username: '',
                password: '',
                email: '',
                verifyCode: '',
                code: -1,
            },
            verifyCodeImg: '',
            agree: true,
            rules: {
                username: [
                    {required: true, message: '用户名不能为空', trigger: 'blur'},
                    {min: 2, max: 8, message: '最少2个字符，最多8个字符', trigger: 'blur'},
                ], password: [
                    {required: true, message: '密码不能为空', trigger: 'blur'},
                    {min: 6, message: '最少6个字符，最多8个字符', trigger: 'blur'},
                ],
                verifyCode: [
                    {required: true, message: '验证码不能为空', trigger: 'blur'},
                ],
                email: [
                    {
                        required: true,
                        pattern: /^([a-zA-Z]|[0-9])(\w|-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/,
                        message: '邮箱不能为空',
                        trigger: 'blur'
                    },

                ],
            }
        }
    },
    methods: {
        toFindPass() {
            this.$router.push({name: 'FindPass'});
        },
        //回车键
        onEnter() {
            if (this.page === 'login') {
                this.onLogin('form');
            } else {
                this.onRegister('form');
            }
        },
        //请求验证码
        reqVerifyCode() {
            this.$http.get('/public/verifyCode')
                .then(res => {
                    let data = res.data;
                    this.verifyCodeImg = data.data.image;
                    // this.$refs['verify'].src = 'data:image/jpg;base64,' + this.verifyCodeImg;
                    this.form.code = data.data.code;
                    // console.log('data.data', data.data);
                    // console.log('this.form.code', this.form.code);
                }).catch(() => {
                this.$notify.error('抱歉，请求验证码失败');
            });
        },
        // 刷新验证码
        refreshVerifyImage() {
            this.reqVerifyCode();
        },
        reqRegister() {
            this.$http.post('/auth/register', this.form)
                .then(res => {
                    let data = res.data;
                    if (data.code === 20011) {
                        this.$notify.success(data.msg);
                        this.page = 'login';
                        // 还需要再申请个验证码
                        this.reqVerifyCode();
                    } else {
                        this.$notify.error(data.msg);
                    }
                })
        },
        reqLogin() {
            this.$http.post('/auth/login', this.form)
                .then(res => {
                    let data = res.data;
                    if (data.code !== 20009) {
                        this.$message.error(data.msg);
                        this.reqVerifyCode();//刷新验证码
                    } else {
                        let token = data.data.token;

                        this.$store.commit('changeToken', token);
                        localStorage.setItem('token', token);

                        let userInfo = data.data.userInfo;
                        localStorage.setItem('userInfo', JSON.stringify(userInfo));
                        localStorage.setItem('userId', userInfo.id);
                        localStorage.setItem('username', userInfo.username);
                        this.$store.commit('changeUserId', userInfo.id);
                        this.$store.commit('changeUsername', userInfo.username);

                        // TransformData.$emit('updateUserInfo');//更新用户信息

                        this.$message.success(data.msg);
                        setTimeout(() => {
                            this.$router.push({name: 'HomeConfig'});
                        }, 600);
                    }
                }).catch(() => {
                this.$message.error('请求服务器错误');
            });
        },
        onLogin(val) {
            this.$refs[val].validate((valid) => {
                if (!valid) {
                    return false;
                }
                if (!this.agree) {
                    this.$notify.error('请先阅读协议并同意！')
                    return false;
                }
                this.reqLogin();
            });
        },
        onRegister(val) {
            console.log(val)
            this.$message.info('抱歉，由于某些原因，本站暂停新会员注册');
            // return
            // this.$refs[val].validate((valid) => {
            //     if (!valid) {
            //         return false;
            //     }
            //     if (!this.agree) {
            //         this.$notify.error('请先阅读协议并同意！')
            //         return false;
            //     }
            //     if (this.form.email === '' || this.form.email.indexOf('@') === -1) {
            //         this.$message.info('邮箱不能为空或邮箱格式错误');
            //         return false;
            //     }
            //     this.reqRegister();
            //
            // });
        },
        changePage(val) {
            this.page = val;
        }
    },
    mounted() {
        this.reqVerifyCode();
    }
}
</script>

<style scoped lang="scss">

html, body {
    margin: 0;
    padding: 0;
}

.login {
    /*background-color: #eeeeee;*/
    margin-top: 5rem;
}

.agree {
    text-decoration: underline;
}

.verifyImage {
    margin-left: .5rem;
    cursor: pointer;
}

.findPass {
    color: #2ecc71;
}
</style>
