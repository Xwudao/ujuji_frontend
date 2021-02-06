<template>
    <el-dialog title="添加搜索网站" :visible.sync="showAddSearchSite" :close-on-press-escape="false"
               :show-close="false" width="35%"
               :close-on-click-modal="false">
        <el-form :model="form" :rules="rules" ref="form" label-width="60px" size="medium">
            <el-form-item label="名称" prop="name">
                <el-input v-model="form.name"
                          @keyup.native.enter="onSubmit"
                          placeholder="站点展示名称，两个字为佳"
                          autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="提示" prop="notice">
                <el-input v-model="form.notice" @keyup.native.enter="onSubmit" placeholder="输入框的提示"
                          autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="地址" prop="searchUrl">
                <el-input v-model="form.searchUrl" @keyup.native.enter="onSubmit" placeholder="搜索地址，关键词部分用 [kw] 代替"
                          autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="排序">
                <el-input-number v-model.number="form.siteOrder" placeholder="数字越大,越排在前面，最大100"
                                 @keyup.native.enter="onSubmit"
                                 value="1" :min="1" :max="100" :step="1" autocomplete="off"></el-input-number>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="cancel" size="mini">取 消</el-button>
            <el-button type="primary" @click="onSubmit" size="mini">提交</el-button>
        </div>
    </el-dialog>
</template>

<script>
    import TransformData from "../../config/TransformData";

    export default {
        name: "AddSearchSiteDialog",
        props: {
            showAddSearchSite: {
                type: Boolean,
                default: false
            }
        },
        data() {
            const validateTitleLink = (rule, value, callback) => {
                if (value !== '' && !/^https?:\/\//ig.test(value)) {
                    callback(new Error('链接必须以http(s)开头'));
                } else {
                    callback();
                }
            };
            return {
                form: {
                    name: '',
                    notice: '',
                    searchUrl: '',
                    siteOrder: '',
                },
                rules: {
                    name: [
                        {required: true, message: '名称不能为空', trigger: 'blur'},
                        {min: 2, message: '最少2个字符', trigger: 'blur'},
                    ],
                    notice: [
                        {required: true, message: '提示不能为空', trigger: 'blur'},
                        {min: 2, message: '最少2个字符', trigger: 'blur'},
                    ],
                    searchUrl: [
                        {required: true, message: '地址不能为空', trigger: 'blur'},
                        {validator: validateTitleLink, message: '搜索不能为空', trigger: 'blur'},
                    ],
                }
            }
        },
        methods: {
            onSubmit() {
                this.$refs['form'].validate((valid) => {
                    if (!valid) {
                        return false;
                    } else {

                        this.$http.post('/user/searchSite', this.form).then(res => {
                            let data = res.data;
                            let code = data.code;
                            if (code !== 30002) {
                                this.$notify.error(data.msg);
                            } else {
                                this.$notify.success(data.msg);
                                TransformData.$emit('cancelAddSearchSiteDialog');
                                TransformData.$emit('updateSearchSiteList');//刷新列表
                            }
                        }).catch(() => {
                            this.$notify.error('系统错误，请刷新或联系管理员');
                        })
                    }
                });


            },
            cancel() {
                TransformData.$emit('cancelAddSearchSiteDialog');
            },
        },
        created() {
        }
    }
</script>

<style scoped lang="scss">

</style>