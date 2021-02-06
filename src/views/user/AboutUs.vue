<template>
    <el-col :span="20">
        <el-row>
            <el-col :span="24">
                <div class="bold" style="margin-right: 1rem;">
                    <el-button size="small">关于我们</el-button>
                </div>
                <div class="links">
                    <p><a href="https://www.misiyu.cn/article/149.html" target="_blank">[优聚集]用户使用说明书</a></p>
                    <p><a href="https://www.misiyu.cn/article/150.html" target="_blank">[优聚集]用户使用与免责申明</a></p>
                    <p><a href="https://www.misiyu.cn/article/151.html" target="_blank">[优聚集]用户背景音乐和背景图片设置</a></p>
                    <p><a href="https://www.misiyu.cn/article/152.html" target="_blank">[优聚集]首页添加搜索站点</a></p>
                </div>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="20">
                <div class="like">
                    <div class="text">
                        赞赏、捐赠纯属自愿，是否捐赠<strong>都不会</strong>影响任何功能的使用
                    </div>
                    <img src="https://wimg.misiyu.cn/images/2020/6/2020-06-11_0166551bfc36f0416a0f012d4c3dd3be.png?x-oss-process=style/common"
                         class="img"
                         alt="无道赞赏码">
                    <img src="https://wimg.misiyu.cn/images/2020/6/2020-06-11_2d9929297ef3c7730232df2bca1a6461.png?x-oss-process=style/common"
                         class="img"
                         alt="无道赞赏码">
                </div>
            </el-col>
        </el-row>
    </el-col>

</template>

<script>
    export default {
        name: "AboutUs"
    }
</script>

<style scoped lang="scss">
    .links {
        margin-top: 1rem;

        a {
            color: #3498db;
            text-decoration: underline;
            margin-top: .5rem;

            &:hover {
                color: rebeccapurple;
            }
        }
    }

    .img {
        width: 15rem;
        margin: 0 1rem;
    }

    .like {
        border-top: 1px solid;
        margin-bottom: .5rem;
        padding-top: .5rem;

        .text {
            color: #666666;
            font-size: 1rem;
        }
    }
</style>