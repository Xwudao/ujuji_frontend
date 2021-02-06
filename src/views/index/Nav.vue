<template>
    <div class="nav">
        <!--导航区域-->
        <el-row class="box-wrapper">

            <div v-if="!isMobile && !isIpad && sort">
                <!--                没有密码肯定显示，或者有密码，但是后台设置的显示，那么就显示-->
                <el-col v-dragging="{ item: item, list: boxes, group: 'box' }"
                        v-show="!item.pwd || (!configInfo.hidePwdBox && item.pwd)"
                        :span="24" :xs="24" :md="8" :sm="12" :xl="6" v-for="(item,boxI) in boxes" :key="boxI">
                    <NavItem
                            :item="item" :sys-info="configInfo"/>
                </el-col>
            </div>
            <div v-else>
                <el-col
                        v-show="!item.pwd || (!configInfo.hidePwdBox && item.pwd)"
                        :span="24" :xs="24" :md="8" :sm="12" :xl="6" v-for="(item,boxI) in boxes" :key="boxI">
                    <NavItem
                            :item="item" :sys-info="configInfo"/>
                </el-col>
            </div>
        </el-row>
    </div>
</template>

<script>
    import NavItem from "../../components/item/NavItem";
    import TransformData from "../../config/TransformData";
    import {KEY_ORDER} from "../../config/config";
    import * as util from "../../util/utils";

    export default {
        name: "Nav",
        components: {NavItem},
        data() {
            return {
                suffix: '',
                defaultSuffix: '',
                systemInfo: {},
                configInfo: {},
                notice: '',
                boxes: [],
                isMobile: false,
                isIpad: false,
                introductionText: {},
                introductionIndex: -1,
                siteConfig: {
                    siteName: '',
                    siteDesc: ''
                }
            }
        },
        methods: {
            reqSystemInfo() {
                this.$store.commit('changeIndexLoading', true);
                this.$http.get('/public/system/info')
                    .then(res => {
                        let data = res.data;
                        this.systemInfo = data.data;
                        this._findDefaultSetting(data.data.settings);
                        this.reqNav();// 请求导航数据
                        this.reqConfig();// 请设置航数据
                    }).catch(() => {
                    this.$notify.error('抱歉，系统错误，无法获取数据');
                });
            },
            reqConfig() {
                let nowSuffix = this.suffix !== '' ? this.suffix : this.defaultSuffix;
                this.$http.get('/public/config/info/' + nowSuffix)
                    .then(res => {
                        let data = res.data;
                        this.configInfo = data.data.config;
                        // console.log(data);
                        TransformData.$emit('setConfigInfo', data.data.config);
                        TransformData.$emit('setNoticeInfo', data.data.notice);
                        TransformData.$emit('setSearchInfo', data.data.searchSite);
                        this.$store.commit('changeSiteUserId', data.data.config.userId);// 保存站点用户id

                        try {
                            this.notice = data.data.notice.content;
                        } catch (e) {
                            this.notice = null;
                        }
                        // 显示公告
                        if (this.notice !== '' && this.notice !== null) {
                            setTimeout(() => {
                                this.$message({
                                    type: 'success',
                                    message: this.notice,
                                    duration: 10000,
                                    showClose: true
                                });
                            }, 1200);
                        }

                    }).catch(() => {
                    this.$notify.error('抱歉，系统错误，请稍后重试');
                }).finally(() => {
                    this.$store.commit('changeIndexLoading', false);
                });
            },
            reqNav() {
                let nowSuffix = this.suffix !== '' ? this.suffix : this.defaultSuffix;
                this.$store.commit('changeSuffix', nowSuffix);
                this.$http.get('/public/nav/info/' + nowSuffix)
                    .then(res => {
                        let data = res.data;
                        this.boxes = this.filterBox(data.data);
                    }).catch(() => {
                    this.$notify.error('抱歉，系统错误，请稍后重试');
                }).finally(() => {
                    this.$store.commit('changeIndexLoading', false);
                });
            },
            _findDefaultSetting(settings) {
                settings.some(item => {
                    if (item.name === 'defaultShow') {
                        this.defaultSuffix = item.value;
                        this.$store.commit('changeDefaultSuffix', item.value);
                        return true;
                    }
                });
            },
            //盒子过滤器，用来根据排序的！
            filterBox(boxes) {
                let orders = localStorage.getItem(KEY_ORDER) || '';
                if (!orders) {//没有排序呢，直接返回！
                    return boxes;
                }
                orders = JSON.parse(orders);//解析回来
                boxes.forEach((box, i) => {
                    let order = orders[box.id];
                    if (order) {//有这个盒子的排序
                        // console.log('order', order);
                        boxes[i].boxOrder = order;
                    }
                });
                return this._sort(boxes);
            },
            _sort(boxes) {//根据order排序的函数
                return boxes.sort(function (box1, box2) {
                    if (box1.boxOrder < box2.boxOrder) {
                        return 1;
                    } else if (box1.boxOrder > box2.boxOrder) {
                        return -1;
                    } else {
                        return 0;
                    }
                });
            },
            //拖拽后，维护一个时间戳
            maintainOrder(items) {
                let orders = {};
                items.forEach((item, i) => {
                    orders[item.id] = items.length - i - 1;
                });
                localStorage.setItem(KEY_ORDER, JSON.stringify(orders));
            }
        },

        created() {
            this.isMobile = util.isMobile();
            this.isIpad = util.isIpad();
            this.suffix = this.$store.state.suffix;
            // 请求信息
            this.reqSystemInfo();
        },
        mounted() {
            this.$dragging.$on('dragged', ({value}) => {
                let items = value.list;//这是排序后的所有的元素的值
                this.maintainOrder(items);
            })
            // this.$dragging.$on('dragend', () => {
            // })
        },
        computed: {
            sort() {
                return this.$store.state.sort;
            }
        }

    }
</script>

<style scoped lang="scss">
    .box-wrapper {
        /*background-color: rgba(0, 0, 0, .06);*/
        text-align: center;
    }

</style>