<template>
    <el-col :span="20">
        <el-row>
            <el-col :span="8" :md="12" :sm="18" :xs="24">
                <el-button size="small" style="margin-bottom: 1rem;">站点配置</el-button>
                <el-form ref="siteConfigForm" :rules="rules" :model="siteConfigForm" label-width="80px">

                    <el-form-item label="站点标签" prop="suffix">
                        <el-row :gutter="3">
                            <el-col :span="10">
                                <el-input v-model="siteConfigForm.suffix" :disabled="disableSuffix"
                                          placeholder="设置后不可修改，请慎重"></el-input>
                            </el-col>
                            <!--                            <el-col :span="2">-->
                            <!--                                <el-tooltip class="item" effect="dark" content="设置后，可以通过专属二级网址访问自己的导航站点"-->
                            <!--                                            placement="top">-->
                            <!--                                    <i class="el-icon-question suffix-helper"></i>-->
                            <!--                                </el-tooltip>-->
                            <!--                            </el-col>-->
                            <el-col :span="12">
                                <span v-text="checkSuffixResult" class="check-result"></span>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="3">
                                <el-button size="mini" @click="onCheckSuffix" :disabled="disableSuffix">检测</el-button>
                            </el-col>
                            <el-col :span="16">
                                <span class="site-url">专属地址：<em v-html="siteUrl"/>
                                </span>
                            </el-col>
                        </el-row>
                    </el-form-item>
                    <el-form-item label="站点名称" prop="siteName">
                        <el-row :gutter="3">
                            <el-col :span="13">
                                <el-input v-model="siteConfigForm.siteName"></el-input>
                            </el-col>
                            <el-col :span="4">
                                <span class="pick">设置颜色:</span>
                            </el-col>
                            <el-col :span="4">
                                <el-color-picker v-model="siteConfigForm.siteColor"/>
                            </el-col>
                        </el-row>
                    </el-form-item>
                    <el-form-item label="站点简介">
                        <el-row :gutter="3">
                            <el-col :span="13">
                                <el-input v-model="siteConfigForm.siteDesc"></el-input>
                            </el-col>
                            <el-col :span="4">
                                <span class="pick">设置颜色:</span>
                            </el-col>
                            <el-col :span="4">
                                <el-color-picker v-model="siteConfigForm.siteSubColor"/>
                            </el-col>
                        </el-row>
                    </el-form-item>
                    <el-form-item label="颜色配置">
                        <el-row :gutter="1">
                            <el-col :span="7">
                                <el-tooltip class="item" effect="dark" content="站点描述的颜色"
                                            placement="top">
                                    <span class="someColorText">站点描述</span>
                                </el-tooltip>
                                <el-color-picker class="pick" v-model="siteConfigForm.descColor"/>
                            </el-col>
                            <el-col :span="7">
                                <el-tooltip class="item" effect="dark" content="盒子标题的颜色"
                                            placement="top">
                                    <span class="someColorText">盒子标题</span>
                                </el-tooltip>
                                <el-color-picker class="pick" v-model="siteConfigForm.boxTitleColor"/>
                            </el-col>
                            <el-col :span="7">
                                <el-tooltip class="item" effect="dark" content="列表标题的颜色"
                                            placement="top">
                                    <span class="someColorText">列表标题</span>
                                </el-tooltip>
                                <el-color-picker class="pick" v-model="siteConfigForm.listItemColor"/>
                            </el-col>
                        </el-row>
                        <el-row :gutter="1" style="margin-top: .5rem;">
                            <el-col :span="7">
                                <el-tooltip class="item" effect="dark" content="盒子的背景色"
                                            placement="top">
                                    <span class="someColorText">盒子背景</span>
                                </el-tooltip>
                                <el-color-picker class="pick" show-alpha v-model="siteConfigForm.boxColor"/>
                            </el-col>
                            <el-col :span="7">
                                <el-tooltip class="item" effect="dark" content="自定义搜索站点、右侧按钮、登录注册的文字颜色"
                                            placement="top">
                                    <span class="someColorText">站点搜索</span>
                                </el-tooltip>
                                <el-color-picker class="pick" v-model="siteConfigForm.searchSiteColor"/>
                            </el-col>
                        </el-row>
                    </el-form-item>
                    <el-form-item label="密码盒子" prop="hidePwdBox">
                        <el-switch
                                style="display: block;margin-top: 0.6rem;"
                                v-model="siteConfigForm.hidePwdBox"
                                active-color="#13ce66"
                                active-text="隐藏"
                                inactive-text="显示">
                        </el-switch>
                        <span>(带有密码的盒子，是否显示在首页)</span>
                    </el-form-item>
                    <el-form-item label="站点图标" prop="hidePwdBox">
                        <el-switch
                                style="display: block;margin-top: 0.6rem;"
                                v-model="siteConfigForm.hideSiteIcon"
                                active-color="#13ce66"
                                active-text="隐藏"
                                inactive-text="显示">
                        </el-switch>
                        <span>(是否显示盒子里面的链接前面的图标)</span>
                    </el-form-item>
                    <el-form-item label="背景图片" prop="backgroundImage">
                        <el-input v-model="siteConfigForm.backgroundImage"
                                  placeholder="尽量上传到sm.ms图床，不要使用百度上找的图片"
                                  :disabled="siteConfigForm.otherImg !== -1"></el-input>
                    </el-form-item>
                    <el-form-item label="其他背景">
                        <el-select v-model="siteConfigForm.otherImg" placeholder="请选择">
                            <el-option
                                    v-for="item in bgTypes"
                                    :key="item.value"
                                    :label="item.name"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                        <!--                        <el-tooltip class="item" effect="dark" content="使用必应的壁纸作为背景图片，此图片每日都会变，且基本为风景美图"-->
                        <!--                                    placement="top">-->
                        <!--                            <span class="text">必应美图</span>-->
                        <!--                        </el-tooltip>-->
                        <!--                        <el-switch-->
                        <!--                                v-model="siteConfigForm.enableBingImg"-->
                        <!--                                active-color="#13ce66">-->
                        <!--                        </el-switch>-->
                    </el-form-item>

                    <el-form-item label="手机背景" prop="mobileImg">
                        <el-input v-model="siteConfigForm.mobileImg" placeholder="由于两端不兼容，可以在此设置手机的专属背景"></el-input>
                    </el-form-item>
                    <el-form-item label="背景音乐" prop="backgroundMusic">
                        <el-input v-model="siteConfigForm.backgroundMusic"
                                  placeholder="如何获取永久外链？请看管理首页的相关说明"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button size="small" style="float: right" type="success"
                                   @click="onUpdate('siteConfigForm')">修改
                        </el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
    </el-col>
</template>

<script>
    import {BASE_URL} from "../../config/config";
    // import TransformData from "../../config/TransformData";

    export default {
        name: "SiteConfig",
        data() {
            const validateSuffix = (rule, value, callback) => {
                if (value !== '' && !/^[a-zA-Z0-9]{4,23}$/ig.test(value)) {
                    callback(new Error('只能为字母数字哟，且>=4个字符'));
                } else {
                    callback();
                }
            };
            const validateBackgroundImage = (rule, value, callback) => {
                if (value && !/^(?:https?:\/\/).*?(\.jpg|\.png|\.gif)$/ig.test(value)) {
                    callback(new Error('只能填写网络图片且结尾只能是jpg或png或gif哟'));
                } else {
                    callback();
                }
            };
            const validateBackgroundMusic = (rule, value, callback) => {
                if (value !== '' && value !== null && !/^(?:https?:\/\/).*?(\.mp3|\.wav|\.ogg)$/ig.test(value)) {
                    callback(new Error('只能填写网络音乐且结尾只能是mp3或ogg或wav结尾哟'));
                } else {
                    callback();
                }
            };
            return {
                userInfo: {},
                bgTypes: [
                    {name: '不使用其他背景', value: -1},
                    {name: '必应美图【每日一换】', value: 1},
                    {name: '二次元美图【随机更换】', value: 2},
                ],
                siteConfigForm: {
                    siteName: '',
                    siteDesc: '',
                    suffix: '',
                    siteColor: '',
                    descColor: '',
                    boxTitleColor: '',
                    otherImg: -1,
                    boxColor: '',
                    listItemColor: '',
                    searchSiteColor: '',
                    hidePwdBox: false,
                    hideSiteIcon: false,
                    siteSubColor: '',
                    backgroundImage: '',
                    mobileImg: '',
                    backgroundMusic: '',
                },
                disableSuffix: false,
                checkSuffixResult: '',
                rules: {
                    siteName: [
                        {required: true, message: '站点名不能为空', trigger: 'blur'}
                    ],
                    suffix: [
                        {validator: validateSuffix, trigger: 'blur'}
                    ],
                    backgroundImage: [
                        {validator: validateBackgroundImage, trigger: 'blur'}
                    ],
                    mobileImg: [
                        {validator: validateBackgroundImage, trigger: 'blur'}
                    ],
                    backgroundMusic: [
                        {validator: validateBackgroundMusic, trigger: 'blur'}
                    ]
                }
            }
        },
        methods: {
            /*这里自己来测试一些数据，不正常就返回*/
            beforeCheck() {
                let boxColor = /(^rgb\((\d+),\s*(\d+),\s*(\d+)\)$)|(^rgba\((\d+),\s*(\d+),\s*(\d+)(,\s*\d+\.\d+)*\)$)/ig.test(this.siteConfigForm.boxColor);
                if (!boxColor) {
                    this.$notify.error('请输入正确的[盒子]颜色配置，其格式为: rgba(x,x,x,0.x)');
                    return false;
                }
                return true;
            },
            onCheckSuffix() {
                if (!/^[a-zA-Z0-9]{4,23}$/ig.test(this.siteConfigForm.suffix)) {
                    this.$notify.info('请先正确输入站点后缀');
                    return false;
                }
                if (this.siteConfigForm.suffix !== null && this.siteConfigForm.suffix !== '') {
                    this.reqCheckSuffix();
                }
            },
            reqCheckSuffix() {
                this.$http.get('/user/siteConfig/suffix/available/' + this.siteConfigForm.suffix)
                    .then(res => {
                        let data = res.data;
                        this.checkSuffixResult = data.data ? '可用: ' + this.siteConfigForm.suffix : '不可用: ' + this.siteConfigForm.suffix;
                    }).catch(() => {
                    this.checkSuffixResult = '系统错误，稍后重试';
                })
            },
            reqSiteConfig() {
                this.$http.get('/public/siteConfig/' + this.$store.state.userId)
                    .then(res => {
                        let data = res.data;
                        this.siteConfigForm = {...data.data};//省略参数真方便
                        if (data.data.suffix !== null && data.data.suffix !== '')
                            this.disableSuffix = true;

                        this.$store.commit('changeBackgroundImage', data.data.backgroundImage);
                    });
            },
            reqUpdateSiteConfig() {
                let res = this.beforeCheck();
                if (!res) {
                    return;
                }
                // siteConfigForm
                this.$http.put('/user/siteConfig', {...this.siteConfigForm})
                    .then(res => {
                        let data = res.data;
                        let code = data.code || 0;
                        if (code === 30006) {
                            this.$notify.success(data.msg);
                            this.reqSiteConfig();
                        } else {
                            this.$notify.warning(data.msg);
                        }
                    }).catch(() => {
                    this.$notify.warning('系统错误，请稍后重试');
                });
            },
            onUpdate(val) {
                this.$refs[val].validate((valid) => {
                    if (valid) {
                        this.reqUpdateSiteConfig();
                    } else {
                        // console.log('error submit!!');
                        return false;
                    }
                });
            }
        },
        created() {
            this.reqSiteConfig();
            this.userInfo = this.$store.state.userInfo.data;
        },
        computed: {
            siteUrl() {
                if (!this.siteConfigForm.suffix) {
                    return '请先设置站点标签以生成专属地址';
                }
                return `<a href="${BASE_URL.replace("[suffix]", this.siteConfigForm.suffix)}" target="_blank">
                        ${BASE_URL.replace("[suffix]", this.siteConfigForm.suffix)}
                        </a>`;
            }
        }
    }
</script>

<style scoped lang="scss">
    .site-url {
        font-size: .9rem;

        em {
            font-style: normal;
            color: coral;
        }

        a {
            color: rebeccapurple;
            text-decoration: underline;
        }
    }

    .someColorText {
        vertical-align: middle;
        margin-right: .5rem;
        cursor: help;
    }

    .pick {
        color: #666666;
        vertical-align: middle;
        margin: 0 .3rem;
    }

    .suffix-helper {
        margin: 0 .5rem;
        cursor: pointer;
        font-size: 1.4rem;
    }

    .check-result {
        margin-left: 1rem;
        color: #e74c3c;
    }

    .text {
        margin-right: .4rem;
        cursor: help;
    }
</style>
