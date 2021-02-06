<template>
    <div class="search">
        <div class="notice">
            <span>搜索</span>
        </div>

        <el-row type="flex" justify="center" class="search-box">
            <el-col :span="23" :xs="23" :sm="18" :md="8" :xl="8">
                <div class="wrapper">
                    <input type="text" aria-label="搜索" placeholder="简化关键词，回车搜索">
                    <i class="el-icon-search"></i>
                </div>
            </el-col>
        </el-row>

        <div class="box">
            <div class="title">
                <img src="https://i.olsh.me/icon?size=80..120..200&url=kilig.ujuji.com"
                     alt="优聚集">
                <span class="text">fsdffds</span>
            </div>
            <div class="introduction">
                <span>介绍文字</span>
            </div>
            <el-row class="navigation">
                <el-col class="nav">
                    <img src="https://i.olsh.me/icon?size=80..120..200&url=kilig.ujuji.com"
                         alt="优聚集">
                    <a target="_blank">链接</a>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Search"
    }
</script>

<style scoped lang="scss">
    .search {
        background-image: url('https://i.loli.net/2020/04/06/gwS8JGhAPvWDq3K.jpg');
        background-attachment: fixed;
        background-size: cover;
        background-position: 50%;
        min-height: 100vh;


        text-align: center;

        .notice {
            width: 100%;
            padding-top: 5rem;

            span {
                font-weight: bold;
                color: white;
                font-size: 2rem;
            }
        }

        .search-box {
            margin-top: 3rem;

            & > * {
                box-sizing: border-box;
            }

            .wrapper {
                position: relative;

                input {
                    background: rgba(0, 0, 0, .3);
                    outline: none;
                    border: none;
                    color: white;
                    font-size: 1rem;
                    border-radius: 1.2rem;
                    width: 100%;
                    height: 2rem;
                    padding: .4rem 2.5rem .4rem 1.5rem;
                    transition: background .2s;
                    position: relative;

                    &:focus {
                        transition: background .2s;
                        background: rgba(0, 0, 0, .5);
                    }
                }

                i {
                    cursor: pointer;
                    vertical-align: middle;
                    position: absolute;
                    right: -3.3rem;
                    top: 0.7rem;
                    bottom: 0;
                    font-size: 1.5rem;
                    color: rgba(255, 255, 255, 0.5);

                }
            }
        }
    }

    .box {
        width: 100%;
        text-align: center;
        color: white;
        /*background-color: #FFFFFF;*/
        margin: .5rem 1rem;
        padding: 1rem 1.5rem;
        border-radius: 1.5rem;
        /*border: 1px solid #f1f1f1;*/
        /*opacity: .9;*/
        background: rgba(0, 0, 0, .3);
        transition: box-shadow 0.5s, transform 0.5s;

        &:hover {
            /*transform: scale(1.1);*/
            /*box-shadow: 0px 0px 50px 10px rgba(0, 0, 0, 0.3);*/
            /*transition: box-shadow 0.5s, transform 0.5s;*/
        }

        @media only screen and (max-width: 767px) {
            margin-left: .5rem;
            margin-right: .5rem;
        }


        .title {
            /*color: white;*/
            font-weight: bolder;
            font-size: 1.05rem;
            margin-top: .5rem;
            letter-spacing: .5rem;

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
            /*&:hover::-webkit-scrollbar { !*滚动条整体样式*!*/
            /*    width: 4px; !*高宽分别对应横竖滚动条的尺寸*!*/
            /*    transition: all .3s;*/
            /*}*/

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

            & > * {
                margin-bottom: 1rem;
            }

            & > .nav {
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
</style>