<template>
    <el-dialog title="添加盒子" :visible.sync="showAddBox" :close-on-press-escape="false"
               :show-close="false" width="35%"
               :close-on-click-modal="false">
        <el-form :model="form" :rules="rules" ref="form" label-width="60px" size="medium">
            <el-form-item label="标题" prop="title">
                <el-input v-model="form.title"
                          placeholder="盒子标题"
                          @keyup.native.enter="onSubmit"
                          autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="图标" prop="titleIcon">
                <el-input v-model="form.titleIcon" @keyup.native.enter="onSubmit" placeholder="可选，建议使用统一的图标风格"
                          autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="pwd">
                <el-input v-model="form.pwd" @keyup.native.enter="onSubmit" placeholder="可选，可设置访问密码，1-10的字符"
                          autocomplete="off"></el-input>
            </el-form-item>

            <el-form-item label="介绍" prop="introduction">
                <el-input v-model="form.introduction" @keyup.native.enter="onSubmit" placeholder="可选，盒子的介绍"
                          autocomplete="off"></el-input>
            </el-form-item>

            <el-form-item label="排序">
                <el-input-number v-model.number="form.boxOrder" placeholder="数字越大,越排在前面，最大100"
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
        name: "AddBoxDialog",
        props: {
            showAddBox: {
                type: Boolean,
                default: false
            }
        },
        data() {
            const validateOrder = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入排序数值'));
                } else if (value <= 0 || value > 100) {
                    callback(new Error('排序值在1-100之间'));
                } else {
                    callback();
                }
            };
            const validateTitleLink = (rule, value, callback) => {
                if (value !== '' && !/^https?:\/\//ig.test(value)) {
                    callback(new Error('链接必须以http(s)开头'));
                } else {
                    callback();
                }
            };
            const validatePwd = (rule, value, callback) => {
                if (value !== '' && !/^[\w\d]{1,10}$/ig.test(value)) {
                    callback(new Error('密码只能英文数字，且1-10位'));
                } else {
                    callback();
                }
            };
            return {
                form: {
                    title: '',
                    titleIcon: '',
                    pwd: '',
                    boxOrder: '',
                    introduction: ''
                },
                rules: {
                    title: [
                        {required: true, message: '标题不能为空', trigger: 'blur'},
                        {min: 2, message: '最少2个字符', trigger: 'blur'},
                    ],
                    titleIcon: [

                        {validator: validateTitleLink, trigger: 'blur'}
                    ],
                    boxOrder: [
                        {validator: validateOrder, trigger: 'blur'}
                    ],
                    pwd: [
                        {validator: validatePwd, trigger: 'blur'}
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

                        this.$http.post('/user/box', this.form).then(res => {
                            let data = res.data;
                            let code = data.code;
                            if (code !== 30002) {
                                this.$notify.error(data.msg);
                            } else {
                                this.$notify.success(data.msg);
                                TransformData.$emit('cancelAddBox');
                                TransformData.$emit('updateList');//刷新列表
                            }
                        }).catch(() => {
                            this.$notify.error('系统错误，请刷新或联系管理员');
                        })
                    }
                });


            },
            cancel() {
                TransformData.$emit('cancelAddBox');
            }
        },
        created() {
        }
    }
</script>

<style scoped lang="scss">

</style>