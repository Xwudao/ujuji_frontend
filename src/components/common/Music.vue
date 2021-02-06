<template>
    <div>
        <div class="music" :class="{pause}" @click="onclickMusic">

            <el-tooltip class="item" effect="dark" content="一些设置"
                        placement="left">
                <i class="iconfont icon-Settingscontroloptions" :style="{color}"></i>
            </el-tooltip>
        </div>
        <audio loop ref="audio" :src="backgroundMusic" :autoplay="!pause" v-if="backgroundMusic"/>
        <MusicSettingDialog :show-music-setting-dialog="showMusicSettingDialog"/>
    </div>
</template>

<script>
    import MusicSettingDialog from "../dialog/MusicSettingDialog";
    import TransformData from "../../config/TransformData";

    export default {
        name: "Music",
        components: {MusicSettingDialog,},
        props: ['color'],
        data() {
            return {
                showMusicSettingDialog: false,
            }
        },
        methods: {
            onclickMusic() {

                //点击就打开Dialog
                this.showMusicSettingDialog = true;

            }
        },
        created() {
            let musicState = localStorage.getItem('musicPause') || '';
            let play = musicState === 'true';
            this.$store.commit('changePlayMusic', play);

            //关闭数据
            TransformData.$on('closeMusicSetting', () => this.showMusicSettingDialog = false);
        },
        computed: {
            pause() {
                return !this.$store.state.playMusic;
            },
            backgroundMusic() {
                return this.$store.state.backgroundMusic;
            }
        },
        watch: {
            //监听当暂停/播放了，那么就要暂停/播放音乐
            pause(val) {
                let audio = this.$refs['audio'];
                if (audio) {
                    if (val) {
                        audio.pause();
                    } else {
                        audio.play();
                    }
                }
            }
        }
    }
</script>

<style scoped lang="scss">
    .music {
        /*transition: all 4s linear;*/
        /*animation: player linear infinite 2.2s;*/

        &.pause {
            animation-play-state: paused;
        }

        i {
            color: white;
            font-size: 1.8rem;
            cursor: pointer;
        }

        @keyframes player {
            0% {
                transform: rotate(0deg);
            }
            100% {
                transform: rotate(360deg);
            }
        }

    }
</style>
