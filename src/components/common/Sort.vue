<template>
    <div class="sort" v-if="!isMobile">
        <el-tooltip class="item" effect="dark" :content="cnt"
                    placement="left">
            <i class="iconfont icon-sort" @click="changeSort" :style="{color}"></i>
        </el-tooltip>
    </div>
</template>

<script>
import isMobile from "@/util/isMobile";

export default {
    name: "Sort",
    props: ['color'],
    data() {
        return {
            cnt: '',
            isMobile: false,
        }
    },
    methods: {
        changeSort() {
            this.$store.commit('changeSort', !this.sort);
        },
        getCnt() {
            let open = this.sort ? '开' : '关';
            this.cnt = '拖动以排序盒子：' + open;
        }
    },
    computed: {
        sort() {
            return this.$store.state.sort;
        }
    },
    watch: {
        sort() {
            this.getCnt();
        }
    },
    created() {
        this.getCnt();
        this.isMobile = isMobile()
    }
}
</script>

<style scoped lang="scss">
.sort {

    i {
        color: white;
        font-size: 1.7rem;
        cursor: pointer;
    }
}
</style>
