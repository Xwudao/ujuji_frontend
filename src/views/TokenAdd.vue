<template>
    <div class="add">
        <el-row type="flex" justify="center" align="center">
            <el-col :span="10">
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span>快捷添加</span>
                        <el-button style="float: right; padding: 3px 0" type="text" @click="back">返回来源页</el-button>
                    </div>
                    <div class="body">
                        <el-form ref="elForm" :model="formData" :rules="rules" size="small" label-width="100px"
                                 label-position="left">
                            <el-form-item label="站点链接" prop="link">
                                <el-input v-model="formData.link" placeholder="请输入站点链接" clearable
                                          @keyup.enter.native="handleConfirm"
                                          :style="{width: '100%'}">
                                </el-input>
                            </el-form-item>
                            <el-form-item label="站点名称" prop="title">
                                <el-input v-model="formData.title" placeholder="请输入站点名称" :maxlength="11" clearable
                                          @keyup.enter.native="handleConfirm"
                                          :style="{width: '100%'}"></el-input>
                            </el-form-item>
                            <el-form-item label="所属分类" prop="boxId">
                                <el-select v-model="formData.boxId" placeholder="请选择所属分类" clearable
                                           :style="{width: '100%'}">
                                    <el-option v-for="(item, index) in boxID_idOptions" :key="index"
                                               :label="item.title"
                                               :value="item.id" :disabled="item.disabled"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="success" style="width: 100%" @click="handleConfirm">添加
                                </el-button>
                            </el-form-item>
                            <el-row style="margin-top: 1rem;">
                                <el-alert title="温馨提示">
                                    请勿使用该功能将含有个人信息的链接添加至公共盒子，具体查看【<a
                                    href="https://www.misiyu.cn/article/164.html#%E6%B3%A8%E6%84%8F%E4%BA%8B%E9%A1%B9"
                                    target="_blank">此篇帖子</a>】的[注意事项]栏
                                </el-alert>
                            </el-row>
                        </el-form>
                    </div>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import {reqAddLink, reqBoxesByToken} from "@/api/boxApi";
import {REQ_BOXES_DATA_ERROR, REQ_DATA_ERROR, TOKEN_PARAM_REQUIRED} from "@/config/strings";
import {ADD_SUCCESS_CODE} from "@/config/code";

export default {
    name: "TokenAdd",
    data() {
        return {
            token: '',
            formData: {
                link: '',
                title: '',
                boxId: null,
            },
            rules: {
                link: [{
                    required: true,
                    message: '请输入站点链接',
                    trigger: 'blur'
                }, {
                    pattern: /(http|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-.,@?^=%&:/~+#]*[\w\-@?^=%&/~+#])?/gi,
                    message: '请输入正确的地址',
                    trigger: 'blur'
                }],
                title: [{
                    required: true,
                    message: '请输入站点名称',
                    trigger: 'blur'
                }],
                boxId: [{
                    required: true,
                    message: '请选择所属分类',
                    trigger: 'change'
                }]
            },
            boxID_idOptions: []
        }
    },
    methods: {
        back() {
            history.go(-1)
        },
        handleConfirm() {
            this.$refs.elForm.validate(valid => {
                if (!valid) return
                reqAddLink(this.token, this.formData).then(({data}) => {
                    const {
                        msg,
                        code
                    } = data
                    if (code === ADD_SUCCESS_CODE) {
                        this.$message.success(msg)
                        return
                    }
                    this.$message.error(msg)
                }).catch(() => {
                    this.$message.error(REQ_DATA_ERROR)
                }).finally(() => {
                })
            })
        },
        reqListCate() {
            reqBoxesByToken(this.token).then(({data}) => {
                this.boxID_idOptions = data.data || []
            }).catch(() => {
                this.$message.error(REQ_BOXES_DATA_ERROR)
            }).finally(() => {

            })
        },
    },
    mounted() {
        this.token = this.$route.query.token || ''
        this.formData.title = this.$route.query.title || ''
        this.formData.link = this.$route.query.link || ''

        if (!this.token) {
            this.$message.error(TOKEN_PARAM_REQUIRED)
            return
        }

        // call method
        this.reqListCate();
    }
}
</script>

<style scoped lang="scss">
.add {
    margin-top: 3rem;
    width: 100%;
    height: 100%;
    background-color: #FDFDFD;

    .box-card {
        width: 500px;
    }
}
</style>
