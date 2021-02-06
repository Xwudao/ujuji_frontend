<template>
    <el-col :span="20">
        <el-row>
            <el-col :span="24">
                <el-button size="small">控制首页</el-button>
            </el-col>
            <el-col :span="24">
                <el-alert title="新手指导" class="title" :closable="false"/>
                <div class="links">
                    <!--                    <div class="title">-->
                    <!--                        <span>新手指导</span>-->
                    <!--                    </div>-->
                    <el-button type="small" @click="jumpLink(guide.url)" v-for="(guide,i) in guides" :key="i"
                               v-text="guide.title"/>
                </div>
            </el-col>
            <el-col :span="24">
                <el-alert title="待办事项" class="title" :closable="false"/>

                <!--                <div class="title">-->
                <!--                    <span>待办事项</span>-->
                <!--                </div>-->
                <div class="todo">
                    <el-button type="primary" size="small" @click="toMsg">
                        未读留言：<span class="count" v-text="nonReadMsgCount"/>
                    </el-button>
                </div>
            </el-col>
        </el-row>
    </el-col>
</template>

<script>
    import {guides} from "../../config/guide.json";

    export default {
        name: "Home",
        data() {
            return {
                nonReadMsgCount: 0,
                guides: {},
            }
        },
        methods: {
            jumpLink(link) {
                window.open(link, '_blank');
            },
            reqMsgCount() {
                this.$http.get('/user/leaveMsg/getNonReadCount')
                    .then(res => {
                        let data = res.data;
                        this.nonReadMsgCount = data.data;
                    });
            },
            toMsg() {
                this.$router.push({name: 'MsgConfig'});
            }
        },
        created() {
            // this.reqMsgCount();
            this.guides = guides;
        },
        activated() {
            // 再次获取数据，上面的created就不能再次获取数据了
            this.reqMsgCount();
        }
    }
</script>

<style scoped lang="scss">
    .title {
        margin: 1rem 0;

        span {
            font-size: 1.1rem;
            cursor: default;
            color: #000000;
            user-select: none;
            font-weight: bold;
            border-left: .3rem solid #e74c3c;
            padding: .3rem .7rem;
            /*border-radius: .2rem;*/
            /*display: inline-block;*/
            /*padding: .5rem 1rem;*/
            /*background-color: #e74c3c;*/
        }
    }

    .links {
        margin-left: .5rem;
        margin-top: 1rem;

        a {
            color: #ffffff;
            /*margin-top: .5rem;*/
            display: inline-block;
            padding: .5rem 1rem;
            margin: .5rem 1rem;
            background-color: #2ecc71;
            transition: all .2s;
            border-radius: .3rem;
            font-size: .9rem;

            &:first-child {
                margin-left: 0;
            }

            &:hover {
                transition: all .2s;
                background-color: #27ae60;
            }
        }
    }

    .todo {
        margin-left: .5rem;

        .list {
            cursor: pointer;
            /*color: #ffffff;*/
            /*margin-top: .5rem;*/
            /*display: inline-block;*/
            /*padding: .5rem 1rem;*/
            /*margin: .5rem 1rem;*/
            /*background-color: #3498db;*/
            /*transition: all .2s;*/
            /*border-radius: .3rem;*/
            /*font-size: .9rem;*/

            /*&:hover {*/
            /*    transition: all .2s;*/
            /*    background-color: #2980b9;*/
            /*}*/
        }

        /*.count {*/
        /*    font-size: 1.2rem;*/
        /*    font-weight: bold;*/
        /*}*/
    }
</style>