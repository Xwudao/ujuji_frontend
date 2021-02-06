<template>
    <el-col :span="4" class="left-nav">
        <el-menu :default-active="getDefaultIndex($route.name)" @select="onSelect">
            <el-menu-item index="11">
                <i class="el-icon-s-home"></i>
                <span slot="title">管理首页</span>
            </el-menu-item>
            <el-menu-item index="1">
                <i class="el-icon-setting"></i>
                <span slot="title">站点配置</span>
            </el-menu-item>
            <el-menu-item index="13">
                <i class="el-icon-user"></i>
                <span slot="title">个人中心</span>
            </el-menu-item>

            <el-menu-item index="6">
                <i class="el-icon-bell"></i>
                <span slot="title">公告设置</span>
            </el-menu-item>

            <el-menu-item index="9">
                <i class="el-icon-message-solid"></i>
                <span slot="title">留言管理</span>
            </el-menu-item>

            <el-menu-item index="2">
                <i class="el-icon-suitcase"></i>
                <span slot="title">盒子管理</span>
            </el-menu-item>
            <el-menu-item index="3">
                <i class="el-icon-s-grid"></i>
                <span slot="title">列表管理</span>
            </el-menu-item>
            <el-menu-item index="10">
                <i class="el-icon-search"></i>
                <span slot="title">搜索配置</span>
            </el-menu-item>

            <el-menu-item index="7">
                <i class="el-icon-download"></i>
                <span slot="title">导出功能</span>
            </el-menu-item>

            <el-menu-item index="12">
                <i class="el-icon-upload2"></i>
                <span slot="title">导入功能</span>
            </el-menu-item>

            <el-menu-item index="5">
                <i class="el-icon-notebook-1"></i>
                <span slot="title">更新日记</span>
            </el-menu-item>

<!--            <el-menu-item index="4">-->
<!--                <i class="el-icon-key"></i>-->
<!--                <span slot="title">修改密码</span>-->
<!--            </el-menu-item>-->
            <el-menu-item index="8">
                <i class="el-icon-warning-outline"></i>
                <span slot="title">关于我们</span>
            </el-menu-item>
        </el-menu>
    </el-col>
</template>

<script>
export default {
    name: "Left",
    data() {
        return {
            tabPosition: "left",
            siteForm: {
                siteName: "",
                siteDesc: ""
            }
        };
    },
    methods: {
        getDefaultIndex(name) {
            switch (name) {
                case "SiteConfig":
                    return "1";
                case "BoxConfig":
                    return "2";
                case "ListConfig":
                    return "3";
                case "ModifyPass":
                    return "4";
                case "UpdateNote":
                    return "5";
                case "NoticeConfig":
                    return "6";
                case "ExportConfig":
                    return "7";
                case "AboutUs":
                    return "8";
                case "MsgConfig":
                    return "9";
                case "SearchSiteConfig":
                    return "10";
                case "HomeConfig":
                    return "11";
                case "ImportConfig":
                    return "12";
                case "Profile":
                    return "13";
            }
        },
        onSelect(index) {
            index = parseInt(index);
            let name = this.$route.name;
            switch (index) {
                case 1: //站点配置
                    if (name !== "SiteConfig") this.$router.push({name: "SiteConfig"});
                    break;
                case 2: //盒子管理
                    if (name !== "BoxConfig") this.$router.push({name: "BoxConfig"});
                    break;
                case 3: //列表
                    if (name !== "ListConfig") this.$router.push({name: "ListConfig"});
                    break;
                case 4: //修改密码
                    if (name !== "ModifyPass") this.$router.push({name: "ModifyPass"});
                    break;
                case 5: //更新日记
                    if (name !== "UpdateNote") this.$router.push({name: "UpdateNote"});
                    break;
                case 6: //公告设置
                    if (name !== "NoticeConfig")
                        this.$router.push({name: "NoticeConfig"});
                    break;
                case 7: //导出功能
                    if (name !== "ExportConfig")
                        this.$router.push({name: "ExportConfig"});
                    break;
                case 8: //关于我们
                    if (name !== "AboutUs")
                        this.$router.push({name: "AboutUs"});
                    break;
                case 9: //留言管理
                    if (name !== "MsgConfig")
                        this.$router.push({name: "MsgConfig"});
                    break;
                case 10: //搜索配置
                    if (name !== "SearchSiteConfig")
                        this.$router.push({name: "SearchSiteConfig"});
                    break;
                case 11: //首页
                    if (name !== "HomeConfig")
                        this.$router.push({name: "HomeConfig"});
                    break;
                case 12: //导入
                    if (name !== "ImportConfig")
                        this.$router.push({name: "ImportConfig"});
                    break;
                case 13: //个人中心
                    if (name !== "Profile")
                        this.$router.push({name: "Profile"});
                    break;
            }
        }
    },
    created() {
    }
};
</script>

<style scoped lang="scss">
.font-weight {
    font-weight: bold;
}

.left {
    .left-nav {
        height: 50vh;
    }
}
</style>
