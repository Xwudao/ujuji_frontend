<template>
    <div class="add" v-if="!isMobile">
        <el-tooltip class="item" effect="dark" content="首页快捷添加站点"
                    placement="left">
            <i class="iconfont icon-01gongjutiao-3Dbeifen3" @click="openDrawer" :style="{color}"></i>
        </el-tooltip>
        <add-drawer :open="isOpenDrawer" @close="isOpenDrawer=false"/>
    </div>
</template>

<script>
import isMobile from "@/util/isMobile";
import AddDrawer from "@/components/drawer/AddDrawer";

export default {
    name: "Add",
    components: {AddDrawer},
    props: ['color'],
    data() {
        return {
            cnt: '',
            isOpenDrawer: false,
            isMobile: false,
        }
    },
    methods: {
        openDrawer() {
            this.isOpenDrawer = true
        },
        closeDrawer() {
            this.isOpenDrawer = false
        }
    },
    created() {
        this.isMobile = isMobile()
    }
}
</script>

<style scoped lang="scss">
.add {

    i {
        color: white;
        font-size: 1.7rem;
        cursor: pointer;
    }
}
</style>
