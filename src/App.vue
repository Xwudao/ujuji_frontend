<template>
    <div id="app">
        <router-view/>
    </div>
</template>
<script>

    export default {
        name: 'App',
        methods: {},
        created() {

            let token = localStorage.getItem('token');
            if (token !== '') {
                this.$store.commit('changeToken', token);
            }


            let username = localStorage.getItem('username');
            if (username !== '') {
                this.$store.commit('changeUsername', username);
            }
            let userId = localStorage.getItem('userId');
            if (userId !== '') {
                this.$store.commit('changeUserId', userId);
            }
        }
    }
</script>

<style lang="scss">
    body {
        overflow-x: hidden;

        &::-webkit-scrollbar { /*滚动条整体样式*/
            width: 0; /*高宽分别对应横竖滚动条的尺寸*/
            transition: all .3s;
        }

    }

    .bold {
        font-weight: bold;
        margin-bottom: 1rem;
        color: #666;
    }

    a {
        color: #666;
        text-decoration: none;
    }
</style>
