<template>
    <div class="bottom">
        <p class="copyright">
            <span>&copy;</span>
            <span class="date" v-text="year"/>
            <a href="#" @click.prevent="toIndex">优聚集</a>
        </p>
    </div>
</template>

<script>
    export default {
        name: "Bottom",
        data() {
            return{
                year:''
            }
        },
        methods: {
            toIndex() {
                window.location.href = 'https://ujuji.com';
            }
        },
        created() {
            this.year = new Date().getFullYear();
        }
    }
</script>

<style scoped lang="scss">
    .bottom {
        text-align: center;
        margin: 2rem 0 0 0;
        color: #666666;

        font-size: .9rem;

        p {
            color: #666666;
            line-height: -.1;

            a {
                margin-left: .5rem;
                color: #666666;
            }
        }

        .icp {
            color: #808080;
            font-size: .8rem;

            &:hover {
                color: #2ecc71;
            }
        }

    }
</style>