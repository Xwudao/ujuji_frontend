<template>
    <el-dialog title="添加站点" :visible="showAddBox" :close-on-press-escape="false"
               :show-close="false" width="35%"
               :close-on-click-modal="false">
        <el-form :model="form" :rules="rules" ref="form" label-width="60px" size="medium">
            <el-form-item label="标题" prop="title">
                <el-input v-model="form.title"
                          placeholder="不建议过长，会换行导致难看，5-7个中文就好"
                          @keyup.native.enter="onSubmit"
                          autocomplete="off"></el-input>
            </el-form-item>
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
                <el-input v-model="form.titleIcon"
                          @keyup.native.enter="onSubmit"
                          placeholder="为空则使用网站默认的图标，您也可以使用图标工具" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="链接" prop="link">
                <el-input v-model.number="form.link" placeholder="网站地址链接"
                          @keyup.native.enter="onSubmit"
                          value="" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="描述" prop="description">
                <el-input v-model.number="form.description" placeholder="标题不宜过长，剩余的就在这描述就行"
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
            showAddBox: {
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
                    title: '',
                    titleIcon: '',
                    boxId: '',
                    linkOrder: ''
                },
                rules: {
                    title: [
                        {required: true, message: '标题不能为空', trigger: 'blur'},
                        {min: 2, message: '最少2个字符', trigger: 'blur'},
                    ],
                    boxId: [
                        {required: true, message: '必须选择一个盒子', trigger: 'blur'},
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
                    } else {
                        this.$http.post('/user/link', this.form).then(res => {
                            let data = res.data;
                            let code = data.code;
                            if (code !== 30002) {
                                this.$notify.error(data.msg);
                            } else {
                                this.$notify.success(data.msg);
                                TransformData.$emit('cancelLinkAddBox');
                                TransformData.$emit('updateLinkList');//刷新列表
                            }
                        }).catch(() => {
                            this.$notify.error('系统错误，请刷新或联系管理员');
                        })
                    }
                });


            },
            cancel() {
                TransformData.$emit('cancelLinkAddBox');
            }
        },
    }
</script>

<style scoped lang="scss">

</style>