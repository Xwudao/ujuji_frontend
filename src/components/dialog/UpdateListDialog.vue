<template>
    <el-dialog title="修改站点" :visible="showUpdateBox" :close-on-press-escape="false"
               :show-close="false" width="35%"
               :close-on-click-modal="false">
        <el-form :model="form" :rules="rules" ref="form" label-width="60px" size="medium">
            <el-form-item label="标题" prop="title">
                <el-input v-model="form.title"
                          @keyup.native.enter="onSubmit"
                          placeholder="站点标题"
                          autocomplete="off"></el-input>
            </el-form-item>
<!--            <el-form-item label="状态" prop="isShow">-->
<!--                <el-radio-group v-model="form.isShow">-->
<!--                    <el-radio :label="true">显示</el-radio>-->
<!--                    <el-radio :label="false">隐藏</el-radio>-->
<!--                </el-radio-group>-->
<!--            </el-form-item>-->
            <el-form-item label="盒子" prop="boxId">
                <el-select v-model="form.boxId" filterable placeholder="请选择一个盒子"
                           style="margin-right: 1rem;">
                    <el-option
                            v-for="item in boxes"
                            :key="item.id"
                            :label="item.title"
                            :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="图标" prop="titleIcon">
                <el-input v-model="form.titleIcon" placeholder="为了统一风格，建议使用图标工具" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="链接" prop="link">
                <el-input v-model.number="form.link" placeholder="网站地址链接"
                          @keyup.native.enter="onSubmit"
                          value="" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="描述" prop="description">
                <el-input v-model.number="form.description" placeholder="站点描述（推荐语）"
                          @keyup.native.enter="onSubmit"
                          value="" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="排序">
                <el-input-number v-model.number="form.linkOrder" placeholder="数字越大,越排在前面，最大100"
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
        name: "AddListDialog",
        props: {
            showUpdateBox: {
                type: Boolean,
                default: false
            },
            boxes: {}
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
                    isShow: false,
                    title: '',
                    titleIcon: '',
                    boxId: '',
                    link: '',
                    description: '',
                    linkOrder: '',
                    id: -1,
                },
                rules: {
                    title: [
                        {required: true, message: '标题不能为空', trigger: 'blur'},
                        {min: 2, message: '最少2个字符', trigger: 'blur'},
                    ],
                    boxId: [
                        {required: true, message: '必须选择一个盒子', trigger: 'blur'},
                    ],
                    isShow: [
                        {required: true, message: '必须选择其状态，要么显示，要么隐藏', trigger: 'blur'},
                    ],
                    link: [
                        {required: true, message: '链接不能为空', trigger: 'blur'},
                        {validator: validateTitleLink, trigger: 'blur'},
                    ],
                    titleIcon: [
                        {validator: validateTitleLink, trigger: 'blur'},
                    ],
                    boxOrder: [
                        {required: true, message: '排序权值不能为空', trigger: 'blur'}
                    ],
                }
            }
        },
        methods: {
            onSubmit() {
                this.$refs['form'].validate((valid) => {
                    if (!valid) {
                        return false;
                    }
                    this.$http.put('/user/link', this.form).then(res => {
                        let data = res.data;
                        let code = data.code;
                        if (code === 30006) {
                            this.$notify.success(data.msg);
                            TransformData.$emit('cancelLinkUpdateBox');
                            TransformData.$emit('updateLinkList');//刷新列表
                        } else {
                            this.$notify.error(data.msg);
                        }
                    }).catch(() => {
                        this.$notify.error('系统错误，请刷新或联系管理员');
                    })

                });


            },
            cancel() {
                TransformData.$emit('cancelLinkUpdateBox');

            }
        },
        created() {
            TransformData.$on('updateLink', item => {
                this.form = {...item};
                // this.form.id = item.id;
                // this.form.title = item.title;
                // this.form.titleIcon = item.titleIcon;
                // this.form.link = item.link;
                // this.form.description = item.description;
                // this.form.boxId = item.boxId;
            });
        }
    }
</script>

<style scoped lang="scss">

</style>
