<template>
    <el-drawer
        title="添加站点"
        @open="openDrawer"
        :before-close="close"
        @close="close"
        size="400px"
        :modal="false"
        :show-close="true"
        :wrapperClosable="false"
        :append-to-body="false"
        :visible.sync="open">
        <el-form :model="form" class="form" :rules="rules" ref="form" label-width="60px" size="medium">
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
            <el-form-item>
                <el-button type="primary" @click="onSubmit" size="mini">提交</el-button>
            </el-form-item>
        </el-form>
    </el-drawer>
</template>

<script>

import TransformData from "@/config/TransformData";
import {reqBoxData} from "@/api/boxApi";

export default {
    name: "addDrawer",
    props: {
        open: {
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
            boxes: [],
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
        close() {
            this.$emit('close')
        },
        openDrawer() {
            const userID = this.$store.state.userId
            const token = this.$store.state.token
            if (!token || !userID) {
                this.$notify.error('请先登录')
                return
            }
            reqBoxData(userID).then((res) => {
                this.boxes = res.data.data
                if (this.boxes.length === 0) {
                    this.$notify.warning('检测到盒子数量为0，请确认该功能仅供盒子数量>0且已登录的用户使用！')
                }
            }).catch(() => {
                // console.log('err')
            });
        }
    },
    mounted() {
    }
}
</script>

<style scoped lang="scss">
.form {
    padding: 1rem;
}
</style>
