<template>
    <div>
        <el-dialog
                @open="onOpen"
                :close-on-press-escape="true"
                title="留言板" :visible.sync="showLeaveMsgDialog" width="400px" :before-close="cancel"
                :append-to-body="true"
                :modal="false">

            <div class="form">
                <el-form :model="form" :rules="rules" ref="form">
                    <el-form-item prop="content">
                        <el-input type="textarea" v-model="form.content" :rows="3"
                                  placeholder="留言内容，留言对所有人公开可见，请勿填写私密信息"></el-input>
                    </el-form-item>
                    <el-form-item prop="nickname">
                        <el-row :gutter="5">
                            <el-col :span="10">
                                <el-input @blur="onInputBlur" v-model="form.nickname" placeholder="昵称"
                                          size="small"></el-input>
                            </el-col>
                            <el-col :span="6">
                                <el-input v-model="form.verifyCode" size="small" placeholder="验证码"></el-input>
                            </el-col>
                            <el-col :span="6">
                                <img class="verifyImage" :src="verifyCodeImg" @click="reqVerifyCode" alt="验证码">
                            </el-col>
                        </el-row>
                    </el-form-item>
                    <el-form-item>
                        <el-button size="small" @click="onSubmit">提交</el-button>
                    </el-form-item>
                </el-form>
            </div>
            <hr>
            <div class="message">
                <!--                置顶-->
                <MsgItem :item="cate" v-for="cate in fixedMsg" :key="cate.id"/>
                <!--                普通-->
                <MsgItem :item="cate" v-for="cate in msg" :key="cate.id"/>

                <el-pagination
                        class="pagination"
                        :page-size="msgPageSize"
                        :pager-count="5" background
                        @current-change="pageChange"
                        layout="prev, pager, next"
                        :total="msgTotal">
                </el-pagination>
                <!--                <MsgItem :item=""></MsgItem>-->
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import MsgItem from "../item/MsgItem";
    import TransformData from "../../config/TransformData";

    const KEY_MSG_NICKNAME = 'msgNickname';
    export default {
        name: "LeaveMsgDialog",
        components: {MsgItem},
        props: {
            showLeaveMsgDialog: {
                default: false,
                type: Boolean
            }
        },
        data() {
            const validateNickCode = (rule, value, callback) => {
                if (this.form.verifyCode === '') {
                    callback(new Error('验证码不能为空'));
                } else if (this.form.nickname === '') {
                    callback(new Error('昵称不能为空'));
                } else {
                    callback();
                }
            };
            return {
                msgTotal: 0,
                msgPageSize: 10,
                msgPageNo: 1,
                requested: false,
                verifyCodeImg: '',
                form: {
                    content: '',
                    nickname: '',
                    userId: -1,
                    verifyCode: '',
                    code: -1,
                },
                fixedMsg: [],
                msg: [],
                rules: {
                    content: [
                        {required: true, message: '留言内容不能为空', trigger: 'blur'},
                        {max: 200, message: '最少200个字符', trigger: 'blur'},
                    ],
                    nickname: [
                        {required: true, message: '昵称或验证码不能为空', trigger: 'blur'},
                        {validator: validateNickCode, trigger: 'blur'},
                    ],
                }
            }
        },
        methods: {
            onInputBlur() {
                // 保存昵称
                localStorage.setItem(KEY_MSG_NICKNAME, this.form.nickname);
            },
            /*打开Dialog*/
            onOpen() {
                if (!this.requested) {
                    this.reqMsg();
                    this.reqFixMsg();
                    this.reqVerifyCode();
                }
            },
            pageChange(page) {
                this.msgPageNo = page;
            },
            cancel() {
                TransformData.$emit('changeLeaveMsgDialog', false);
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
            /*请求所有留言*/
            reqMsg() {
                this.requested = true;
                this.$http.get('/public/msg/' + this.userId + '?pageNo=' + this.msgPageNo + '&pageSize=' + this.msgPageSize)
                    .then(res => {
                        let data = res.data;
                        this.msgTotal = data.data.total;
                        this.msg = data.data.records;
                    }).catch(() => {
                    this.$message.error('请求留言失败');
                })
            },
            /*请求置顶留言*/
            reqFixMsg() {
                this.requested = true;
                this.$http.get('/public/msg/fixed/' + this.userId)
                    .then(res => {
                        let data = res.data;
                        this.fixedMsg = data.data;
                    }).catch(() => {
                    this.$message.error('请求留言失败');
                })
            },
            reqInsertMsg() {
                this.form.userId = this.userId;
                this.$http.post('/public/msg', this.form)
                    .then(res => {
                        let data = res.data;
                        let code = data.code;
                        if (code === 30002) {
                            this.$notify.success(data.msg);
                            this.msgPageNo = 1;
                            this.reqMsg();
                        } else {
                            this.$notify.error(data.msg);
                        }
                    }).catch(() => {
                    this.$notify.error('系统错误，留言失败');
                });
            },
            onSubmit() {
                this.$refs['form'].validate((valid) => {
                    if (!valid) {
                        return false;
                    } else {
                        this.reqInsertMsg();
                    }
                });
            }
        },
        computed: {
            userId() {
                return this.$store.state.siteUserId;
            }
        },
        created() {
            this.form.nickname = localStorage.getItem(KEY_MSG_NICKNAME) || '';
        },
        watch: {
            msgPageNo() {
                this.reqMsg();
            },
            userId() {
                if (this.showLeaveMsgDialog) {
                    this.reqFixMsg();
                    this.reqMsg();
                    this.reqVerifyCode();
                }
            }
        }
    }
</script>

<style scoped lang="scss">
    .form {
        padding: 0 .5rem;
    }

    hr {
        border: none;
        border-top: 1px solid #dddddd;
        margin: .5rem;
        padding: .2rem;
    }

    .message {
        overflow-y: auto;
        padding: 0 .5rem;


    }

    .pagination {
        text-align: center;
    }

    .verifyImage {
        vertical-align: middle;
        cursor: pointer;
        height: 30px;
    }
</style>