<template>
    <div class="effects">
        <!--        线条背景-->
        <!--        <script src="../../assets/js/bjxt.js" v-if="siteConfig.backgroundEffects==='xtbj'"></script>-->
    </div>
</template>

<script>
    import TransformData from "../../config/TransformData";

    export default {
        name: "BackgroundEffect",
        data() {
            return {
                siteConfig: {}
            }
        },
        created() {
            TransformData.$on('setConfigInfo', val => {
                // this.siteConfig = val;
                let effect = val.backgroundEffect;
                // console.log(this.siteConfig);
                if (effect === 'xtbj') {
                    require("../../assets/js/bjxt");
                }
            });
        },
        mounted() {
            // let effect = this.siteConfig.backgroundEffect;
            // console.log(this.siteConfig);
            // if (effect === 'xtbj') {
            //     require("../../assets/js/bjxt");
            // }
        }
    }
</script>

<style scoped lang="scss">

</style>