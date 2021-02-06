<template>
    <el-dialog title="图标工具" :visible.sync="showImageBox" width="32%" :before-close="cancelBox"
               :close-on-click-modal="false"
               :close-on-press-escape="false">

        <span class="notice">为了统一图标的风格，强烈建议使用此工具，生成统一的图标风格</span>


        <el-form label-width="40px">
            <el-form-item label="文字">
                <el-input v-model="text" placeholder="请输入一个字符，建议和网站名称有关"></el-input>
            </el-form-item>
            <el-form-item label="颜色">
                <span class="text-color-span">文字颜色：</span>
                <el-color-picker v-model="textColor"/>
                <span class="text-color-span">背景颜色</span>
                <el-color-picker v-model="bgColor"/>
            </el-form-item>
            <el-form-item label="链接">
                <el-input v-model="link" placeholder="" class="img-link"></el-input>
            </el-form-item>
            <el-button size="mini" class="copy">复制链接</el-button>
            <span class="copy-result" v-if="copyResult!==''" v-text="copyResult"/>
            <el-form-item label="效果">
                <img :src="link" alt="" class="square">
                <img :src="link" alt="" class="round">
            </el-form-item>
        </el-form>

        <span slot="footer" class="dialog-footer">
            <el-button type="danger" size="small" @click="cancelBox">关 闭</el-button>
        </span>
    </el-dialog>
</template>

<script>
    import TransformData from "../../config/TransformData";
    import {IMAGE_URL} from "../../config/config";
    import ClipboardJS from "clipboard";

    export default {
        name: "ImageDialog",
        props: {
            showImageBox: {
                type: Boolean,
                default: false
            },
        },
        data() {
            return {
                textColor: '#fff',
                bgColor: '#2ecc71',
                text: '优',
                copyResult: ''
            }
        },
        methods: {
            cancelBox() {
                TransformData.$emit('cancelImageBox');//取消box
            }
        },
        computed: {
            link() {
                return IMAGE_URL.replace('[bgColor]', this.bgColor.replace('#', ''))
                    .replace('[textColor]', this.textColor.replace('#', ''))
                    .replace('[text]', encodeURIComponent(this.text));
            }
        },
        mounted() {
            const cb = new ClipboardJS('.copy', {
                text: () => {
                    return this.link;
                }
            });
            cb.on('success', () => {
                this.copyResult = '复制成功';
                setTimeout(() => {
                    this.copyResult = '';
                }, 1200);
            });
            cb.on('error', () => {
                this.copyResult = '复制失败，请手动复制';
                setTimeout(() => {
                    this.copyResult = '';
                }, 1200);
            });
        }
    }
</script>

<style scoped lang="scss">
    .copy {
        margin-bottom: 1rem;
    }

    .copy-result {
        margin-left: 1rem;
        color: #3498db;
    }

    .el-color-picker {
        vertical-align: middle;
        margin: 0 1rem;
    }

    .text-color-span {
        vertical-align: middle;
    }

    .notice {
        margin-bottom: 1rem;
        display: block;
        font-weight: bold;
    }

    img {
        width: 30px;
        height: 30px;
        margin: 0 1rem;

        &.square {

        }

        &.round {
            border-radius: 50%;
        }
    }
</style>