<template>
    <div class="box" :style="{
        background: sysInfo.boxColor
    }" :id="item.id">
        <div class="title">
            <img :src="item.titleIcon"
                 v-show="item.titleIcon!=='' && item.titleIcon !== null"
                 alt="">
            <span class="text" v-text="item.title" :style="{
                color:sysInfo.boxTitleColor
            }"/>
        </div>
        <div class="introduction">
            <span v-text="introductionText" :style="{color:sysInfo.descColor}"/>
        </div>
        <el-row class="navigation">
            <div v-if="(item.pwd==='' || item.pwd===null) && !getPwdData">
                <el-col :span="8" v-for="(link,i) in item.links" :key="i"
                        class="nav">
                    <img :src="getFavicon(link.titleIcon,link.link)"
                         v-if="!sysInfo.hideSiteIcon"
                         alt="">
                    <a :href="link.link" target="_blank" @mouseenter="onEnter(link.description)"
                       :style="{
                     color:sysInfo.listItemColor
                   }"
                       v-text="link.title"/>
                </el-col>
            </div>
            <div v-else class="input-pwd" v-show="!getPwdData">
                <input type="text" @keyup.enter="onGetLink(item.id)" aria-label="input-pwd" placeholder="输入密码访问"
                       v-model="inputPwd">
                <button @click="onGetLink(item.id)">提交</button>
            </div>
            <div class="pwdData">
                <el-col :span="8" v-for="(link,i) in pwdData.links" :key="i"
                        class="nav">
                    <img :src="getFavicon(link.titleIcon,link.link)"
                         v-if="!sysInfo.hideSiteIcon"
                         alt="">
                    <a :href="link.link" target="_blank" @mouseenter="onEnter(link.description)"
                       :style="{
                     color:sysInfo.listItemColor
                   }"
                       v-text="link.title"/>
                </el-col>
            </div>

        </el-row>
    </div>
</template>

<script>
import {FAVICON_API_URL} from "@/config/config";

export default {
    name: "NavItem",
    props: ['item', 'sysInfo'],
    data() {
        return {
            introductionText: '',
            inputPwd: '',
            getPwdData: false,
            pwdData: {}
        }
    },

    methods: {
        onGetLink(id) {
            if (this.inputPwd === '' || this.inputPwd === null) {
                this.$message.info('请输入访问密码哟');
            } else {
                this.reqData(id);
            }
        },
        /*请求数据*/
        reqData(id) {
            this.$http.get('/public/nav/pwd/' + id + '/' + this.inputPwd)
                .then(res => {
                    let data = res.data;
                    let code = data.code;
                    if (code === 1000) {
                        this.getPwdData = true;
                        this.pwdData = data.data;
                    } else {
                        this.$message.error(data.msg);
                    }
                })
        },
        getFavicon(icon, url) {
            if (icon !== '' && icon !== null) {
                return icon;
            } else {
                return FAVICON_API_URL + this._match_domain(url);
            }
        },
        _match_domain(url) {
            let d = /^(?:https?:\/\/)?([(\w+).]+)\/?/ig.exec(url);
            if (d && d.length >= 2) {
                return d[1] || '';
            } else {
                return 'ujuji.com';
            }
        },
        onEnter(val) {
            this.introductionText = val;
        }
    },
    mounted() {
        this.introductionText = this.item.introduction;
    },
}
</script>

<style scoped lang="scss">
.box {
    color: white;
    margin: .5rem .5rem;
    padding: 1rem 1.5rem 0.5rem 1.5rem;
    border-radius: 1.5rem;
    background: rgba(0, 0, 0, .1);
    height: 11rem;
    transition: box-shadow 0.5s, transform 0.5s;
    @media only screen and (max-width: 767px) {
        margin-left: .5rem;
        margin-right: .5rem;
    }


    .title {
        /*color: white;*/
        cursor: pointer;
        font-weight: bolder;
        font-size: 1.05rem;
        margin-top: .5rem;
        letter-spacing: .5rem;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;

        img {
            width: 22px;
            height: 22px;
            margin-right: .5rem;
            vertical-align: middle;
            border-radius: 10%;
        }

        .text {
            vertical-align: middle;
        }
    }


    .navigation {
        /*margin-top: 1rem;*/
        height: 7rem;
        overflow-y: auto;
        text-align: left;

        &::-webkit-scrollbar { /*滚动条整体样式*/
            width: 0; /*高宽分别对应横竖滚动条的尺寸*/
            transition: all .3s;
        }

        &::-webkit-scrollbar-thumb { /*滚动条里面小方块*/
            border-radius: 10px;
            background-color: #2ecc71;
        }

        &::-webkit-scrollbar-track { /*滚动条里面轨道*/
            box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
            background: #ededed;
            border-radius: 10px;
        }

        & > div > * {
            margin-bottom: 1rem;
        }

        .nav {
            img {
                vertical-align: middle;
                width: 18px;
                height: 18px;
                margin-right: .3rem;
                border-radius: 15%;
            }

            a {
                font-size: .8rem;
                vertical-align: baseline;
                color: white;
                text-decoration: none;
                transition: all .2s;

                &:hover {
                    transition: all .2s;
                    color: #3498db;
                }
            }
        }


    }

    .introduction {
        font-size: .9rem;
        margin: .5rem 0;
        height: 1rem;
        line-height: 1rem;
        color: #bbbbbb;
        text-overflow: ellipsis;
        overflow: hidden;
        width: 100%;
    }
}

.input-pwd {
    display: flex;
    justify-content: center;
    align-items: center;
    align-content: center;
    width: 100%;
    height: 75%;


    input {
        border-radius: 3px;
        outline: none;
        width: 7rem;
        text-align: center;
        box-sizing: border-box;
        border: none;
        height: 1.8rem;
        padding: .2rem .5rem;
        color: #ffffff;
        background: rgba(0, 0, 0, .4);
        transition: all .2s;

        &:focus, &:hover {
            transition: all .2s;
            background: rgba(0, 0, 0, .6);
        }
    }

    button {
        border-radius: 3px;
        box-sizing: border-box;
        outline: none;
        margin-left: .5rem;
        border: none;
        cursor: pointer;
        color: #fff;
        height: 1.8rem;
        background: rgba(0, 0, 0, .5);
        transition: all .2s;
        font-size: .7rem;

        &:hover {

            transition: all .2s;
            background: rgba(0, 0, 0, .8);
        }
    }
}
</style>
