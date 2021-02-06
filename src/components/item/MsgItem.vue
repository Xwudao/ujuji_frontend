<template>
    <div class="item">
        <div>
            <el-tag effect="dark" size="mini" v-if="item.fixed===1">置顶</el-tag>
            <el-tag effect="dark" type="success" size="mini" v-else>留言</el-tag>
            <span class="nickname" v-text="item.nickname"></span>
        </div>
        <p class="content">
            <span v-text="item.content"></span>
        </p>
        <div class="reply" v-if="item.reply">
            <span class="tag">回复：</span>
            <p class="text">
                <span v-text="item.reply"></span>
            </p>
        </div>
        <div class="time" v-text="item.createdAt"></div>
    </div>
</template>

<script>
    export default {
        name: "MsgItem",
        props: ['item'],
    }
</script>

<style scoped lang="scss">
    .item {
        border-bottom: 1px solid #dddddd;
        padding-top: .4rem;
        padding-bottom: .4rem;
        margin-bottom: .4rem;

        .nickname {
            font-size: .9rem;
            font-weight: bold;
            color: blue;
            margin-left: .5rem;
        }

        .content span {
            line-height: 1.6rem;
            font-family: Arial, sans-serif;
            color: #666666;
            font-size: .8rem;
            border-bottom: 1px dashed;
            word-break: break-all;
            padding-bottom: 2px;
        }

        .reply {
            color: #d63031;
            font-size: .9rem;

            .tag {
                display: block;
                font-weight: bold;
            }

            .text span {
                line-height: 1.6rem;
                font-family: Arial, sans-serif;
                color: #2d3436;
                font-size: .8rem;
                border-bottom: 1px dashed;
                word-break: break-all;
                padding-bottom: 2px;
            }


        }

        .time {
            float: right;
            font-size: .8rem;
            color: #666666;
        }

        &::after {
            clear: both;
            content: '';
            display: block;
            width: 0;
            height: 0;
            visibility: hidden;
        }
    }
</style>