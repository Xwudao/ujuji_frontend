<template>
    <el-col :span="20">
        <el-row>
            <el-col :span="24">
                <div class="bold" style="margin-right: 1rem;">
                    <el-button size="small">个人中心</el-button>
                </div>
            </el-col>
        </el-row>
        <el-row>
            <el-col>
                <el-tabs v-model="activeName" @tab-click="handleClick">
                    <el-tab-pane label="用户中心" name="profile">
                        <el-row>
                            <el-col :span="9">
                                <el-form label-width="80px" label-position="left">
                                    <el-form-item label="用户名" prop="oldPass">
                                        <el-input size="small" v-model="userInfo.username" disabled
                                                  type="text"></el-input>
                                    </el-form-item>
                                    <el-form-item label="邮箱" prop="oldPass">
                                        <el-input size="small" v-model="userInfo.email" disabled type="text"></el-input>
                                    </el-form-item>

                                    <el-form-item label="Token" prop="oldPass">
                                        <el-row>
                                            <el-col :span="18">
                                                <el-input size="small" v-model="userInfo.accessToken"
                                                          type="text"></el-input>
                                            </el-col>
                                            <el-col :span="3">
                                                <el-form-item>
                                                    <el-button style="margin-left: 1rem;"
                                                               @click="reqGenToken"
                                                               type="primary" size="small">
                                                        生成/刷新
                                                    </el-button>
                                                </el-form-item>
                                            </el-col>
                                        </el-row>
                                    </el-form-item>

                                    <el-col>
                                        <el-alert
                                            title="请知悉：token是个人信息的凭证，告诉他人将导致账号泄露风险"
                                            type="error">
                                        </el-alert>
                                    </el-col>

                                </el-form>
                            </el-col>
                            <el-col :span="8" class="right-profile">
                                <el-button size="small">快捷添加链接</el-button>
                                <div class="no-token" v-if="!userInfo.accessToken">
                                    <el-alert
                                        :closable="false"
                                        title="快捷添加链接需要您先生成个人专属token"
                                        type="warning">
                                    </el-alert>
                                </div>
                                <el-row class="token-link">
                                    <el-col v-if="userInfo.accessToken">
                                        <el-input type="textarea" disabled
                                                  v-model="quickAddLink"
                                                  clearable :rows="4">
                                        </el-input>
                                        <el-button
                                            :data-clipboard-text="quickAddLink"
                                            class="copy-btn" type="success" size="small">复制
                                        </el-button>
                                    </el-col>
                                    <el-col>
                                        <el-alert
                                            style="margin-top: 1rem;"
                                            :closable="false"
                                            title="使用说明"
                                            type="info">
                                            新建一个浏览器书签，将上面这串代码粘贴到您的浏览器书签【地址栏】，然后当您遇到想添加到优聚集的网站，那么在此网站页面上点击此书签即可
                                            【<a href="https://www.misiyu.cn/article/164.html" target="_blank">更多说明-></a>】
                                        </el-alert>
                                    </el-col>
                                </el-row>
                            </el-col>
                        </el-row>
                    </el-tab-pane>
                    <el-tab-pane label="修改密码" name="updatePass">
                        <el-row>
                            <el-col :span="8" :push="7">
                                <el-alert
                                    style="margin: 1rem;"
                                    title="如果密码有特殊字符，可能导致之后登陆失败，建议大小写+数字"
                                    type="error">
                                </el-alert>
                                <el-form ref="form" :rules="rules" :model="updatePassForm" label-width="80px">
                                    <el-form-item label="旧的密码" prop="oldPass">
                                        <el-input v-model="updatePassForm.oldPass" type="password"></el-input>
                                    </el-form-item>
                                    <el-form-item label="新的密码" prop="newPass">
                                        <el-input v-model="updatePassForm.newPass" type="password"></el-input>
                                    </el-form-item>
                                    <el-form-item label="确认密码" prop="confirmPass">
                                        <el-input v-model="updatePassForm.confirmPass" type="password"></el-input>
                                    </el-form-item>
                                    <el-form-item>
                                        <el-button size="small" style="float: right" type="success"
                                                   @click="onsubmitUpdatePass">修改
                                        </el-button>
                                    </el-form-item>
                                </el-form>
                            </el-col>
                        </el-row>
                    </el-tab-pane>
                </el-tabs>
            </el-col>
        </el-row>
    </el-col>
</template>

<script>
import {reqGenerateToken, reqUserInfo} from "@/api/userApi";
import {MAIN_URL} from "@/config/config";
import Clipboard from 'clipboard'
import {TEXT_COPY_FAIL, TEXT_COPY_SUCCESS} from "@/config/strings";

export default {
    name: "Profile",
    data() {
        const validatePass = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入确认密码'));
            } else if (value !== this.updatePassForm.newPass) {
                callback(new Error('两次输入密码不一致!'));
            } else {
                callback();
            }
        };
        return {
            clip: null,
            activeName: 'profile',
            updatePassForm: {
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
            },
            userInfo: {
                username: '',
                email: '',
                accessToken: '',
            }
        }
    },
    methods: {
        handleClick(tab) {
            console.log(tab.name);
        },
        reqGenToken() {

            this.$confirm('若您是刷新token，那么需注意以前依赖token的链接、服务将不可用【第一次生成无所谓】', '提示', {
                confirmButtonText: '我知道',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                reqGenerateToken().then(({data}) => {
                    if (data.data) {
                        this.userInfo.accessToken = data.data;
                        this.$message.success('生成成功');
                    }
                }).catch(() => {
                    this.$message.error('生成token失败，请稍后重试');
                })
            })


        },
        reqUserInfo() {
            reqUserInfo().then(({data}) => {
                this.userInfo = data.data
            })
        },

        onsubmitUpdatePass() {
            this.$refs['form'].validate((valid) => {
                if (!valid) {
                    return false;
                }
                this.$http.post('/user/updatePassword', 'oldPass=' + this.updatePassForm.oldPass + '&newPass=' + this.updatePassForm.newPass, {
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
        },
    },
    mounted() {
        this.reqUserInfo()
        if (!this.clip) {
            this.clip = new Clipboard('.copy-btn');
            this.clip.on('success', () => {
                this.$notify.success(TEXT_COPY_SUCCESS)
            })
            this.clip.on('error', () => {
                this.$notify.error(TEXT_COPY_FAIL)
            })
        }
    },
    destroyed() {
        this.clip = null
    },
    computed: {
        quickAddLink() {
            return `javascript:location.href='${MAIN_URL}/token_add?token=${this.userInfo.accessToken}&title='+document.title+'&link='+decodeURIComponent(location.href);`
        }
    }
}
</script>

<style scoped lang="scss">
.right-profile {
    margin-left: .5rem;
    padding-left: .5rem;
    border-left: 1px solid #dddddd;
}

.no-token {
    margin-top: 1rem;
}

.token-link {
    margin-top: 1rem;
}

.copy-btn {
    margin-top: 1rem;
}
</style>
