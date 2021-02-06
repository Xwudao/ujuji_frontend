<template>
    <div class="search">
        <el-row type="flex" justify="center">
            <el-col :span="24" :xs="23" :sm="18" :md="10">
                <div class="info">
                    <div class="title" v-text="siteConfig.siteName" :style="{color:siteConfig.siteColor}">优聚集</div>
                    <div class="desc" v-text="siteConfig.siteDesc" :style="{color:siteConfig.siteSubColor}">聚集优质网站</div>
                </div>
            </el-col>
        </el-row>
        <el-row type="flex" justify="center" class="search-box" v-if="searchSites.length>0">
            <el-col :span="24" :xs="23" :sm="18" :md="10">
                <el-input class="search-input"
                          autofocus
                          :style="{color: searchSiteColor}"
                          @keyup.native.enter="onSearch"
                          v-model="kw" :placeholder="searchSites[nowChose].notice">
                    <div slot="append">
                        <span @click="onSearch">
                        <i class="el-icon-search" :style="{color: searchSiteColor}"/>
                        </span>
                    </div>
                </el-input>
            </el-col>
        </el-row>
        <el-row justify="center" type="flex" class="search-sites" v-if="searchSites.length>0">
            <span class="list" :class="{active:nowChose === i}" v-for="(item ,i) in searchSites" :key="i"
                  :style="{color: searchSiteColor}"
                  v-text="item.name" @click="changeSite(i)"/>
        </el-row>
    </div>
</template>

<script>
    import TransformData from "../../config/TransformData";
    import {KEY_SEARCH_INDEX} from "../../config/config";

    export default {
        name: "Search",
        data() {
            return {
                introduction: '',
                suffix: '',
                searchSiteColor: '#ffffff',
                siteConfig: {
                    siteName: '',
                    siteDesc: '',
                    siteColor: '',
                    siteSubColor: '',
                },
                nowChose: 0,
                kw: '',
                searchSites: [],
            }
        },
        methods: {
            changeSite(index) {
                this.nowChose = index;
                //保存到local
                localStorage.setItem(KEY_SEARCH_INDEX, index);
            },
            onSearch() {
                if (this.kw === '') {
                    this.$notify.info('请输入关键词哦');
                } else {
                    let searchUrl = this.searchSites[this.nowChose].searchUrl.replace('[kw]', encodeURIComponent(this.kw));
                    window.open(searchUrl, '_blank');
                }
            }
        },
        created() {
            // 获取搜索站点的索引
            let i = localStorage.getItem(KEY_SEARCH_INDEX) || '';
            if (i) {
                this.nowChose = i;
            }
            TransformData.$on('setIntroduction', val => {
                this.introduction = val;
            });

            TransformData.$on('setSearchInfo', val => {
                this.searchSites = val;
            });

            this.suffix = this.$store.state.suffix;

            TransformData.$on('setConfigInfo', (val) => {
                if (val.searchSiteColor) {//搜索站点的颜色
                    this.searchSiteColor = val.searchSiteColor;
                }
                if (val.siteName) {
                    this.siteConfig.siteDesc = val.siteDesc;
                }
                this.siteConfig.siteColor = val.siteColor;
                this.siteConfig.siteSubColor = val.siteSubColor;
                if (val.siteName) {
                    this.siteConfig.siteName = val.siteName;
                    document.title = val.siteName + ' | 优聚集';
                }
            });

        }
    }
</script>

<style scoped lang="scss">
    .search {
        text-align: center;
        margin-top: 3rem;
        position: relative;
        margin-bottom: 3rem;

        .info {
            /*margin-bottom: 1rem;*/

            .title {
                font-size: 1.8rem;
                font-weight: bold;
                margin-bottom: .7rem;
                color: #27ae60;
                border-radius: 5px;
                user-select: none;
                /*color: #FFFFFF;*/
                /*background: #912C22;*/
                /*text-shadow: 0 0 10px #FFFFFF;*/
            }

            .desc {
                font-size: .9rem;
                color: #3498db;
                user-select: none;
            }
        }

        .search-box {
            margin-top: 1rem;
        }

        .search-sites {
            margin-top: 1rem;

            .list {
                font-size: 1rem;
                margin: 0 .5rem;
                cursor: pointer;
                color: white;
                line-height: 1.5rem;
                transition: all .2s;

                &.active {
                    font-weight: bold;
                }
            }
        }
    }
</style>
