<template>
    <el-dialog
        :close-on-press-escape="true"
        :close-on-click-modal="true"
        :show-close="true"
        :modal-fade="true"
        :modal="false"
        title="设置"
        :visible.sync="showMusicSettingDialog"
        width="400px"
        @open="onOpen"
        :before-close="cancel">
        <div class="t">背景音乐设置</div>
        <el-switch
            @change="onChange"
            v-model="isPlay"
            active-text="播放"
            inactive-text="暂停">
        </el-switch>
        <el-form style="margin-top: 1rem;">
            <el-form-item>
                <el-input v-model="music"
                          size="small"
                          @blur="onBlur"
                          placeholder="输入音乐的网络链接，点击本弹窗空白处保存"></el-input>
            </el-form-item>

            <a class="link"
               href="https://www.misiyu.cn/article/151.html#3.%20%E8%AE%BE%E7%BD%AE%E8%83%8C%E6%99%AF%E9%9F%B3%E4%B9%90"
               target="_blank">如何获取网易云永久音乐外链，请细看这里</a>
            <el-divider/>

            <div class="t">背景图片设置
                <el-tag class="btn" @click="clearImg" size="small">清空</el-tag>
            </div>

            <el-form-item>
                <el-input v-model="bgi"
                          size="small"
                          @blur="onBGIBlur"
                          placeholder="输入图片的网络链接（图床），点击本弹窗空白处保存"></el-input>
            </el-form-item>
        </el-form>
    </el-dialog>
</template>

<script>
import TransformData from "../../config/TransformData";
import {EVENT_SET_BGI, KEY_BACKGROUND_IMAGE} from "@/config/config";

export default {
    name: "MusicSettingDialog",
    data() {
        return {
            isPlay: false,
            music: '',
            bgi: '',
        }
    },
    props: {
        showMusicSettingDialog: {
            default: false,
            type: Boolean
        }
    },
    methods: {
        // clear image
        clearImg() {
            localStorage.setItem(KEY_BACKGROUND_IMAGE, '')//clear
            location.reload()
        },
        // 背景图片
        onBGIBlur() {
            let validate = /^(?:https?:\/\/).*?/ig.test(this.bgi);
            if (!this.bgi) {
                return;
            }
            if (!validate) {
                this.$notify.warning('您输入的网络地址不合要求，必须以http开头');
                return;
            }
            localStorage.setItem(KEY_BACKGROUND_IMAGE, this.bgi)
            TransformData.$emit(EVENT_SET_BGI, this.bgi)

            this.$notify.success('背景图片设置已保存');
        },
        //输入音乐的链接
        onBlur() {
            let validate = /^(?:https?:\/\/).*?(\.mp3|\.wav|\.ogg)$/ig.test(this.music);
            if (!this.music) {
                return;
            }
            if (!validate) {
                this.$notify.warning('您输入的网络地址不合要求，必须以http开头且以mp3/wav/ogg结尾');
                return;
            }
            //合了要求，就推送到store和保存到本地
            localStorage.setItem('backgroundMusic', this.music);
            this.$store.commit('changeBackgroundMusic', this.music);
            this.$notify.success('背景音乐设置已保存');
        },
        cancel() {
            TransformData.$emit('closeMusicSetting', false);
        },
        //dialog 打开了
        onOpen() {
            //从LocalStorage获取数据
            let musicState = localStorage.getItem('musicPause') || '';
            this.isPlay = musicState === 'true';

            //从本地获取数据
            this.music = localStorage.getItem('backgroundMusic') || '';
        },
        //状态的改变
        onChange(val) {
            //state和localStorage都要保存一份即可
            this.$store.commit('changePlayMusic', val);
            localStorage.setItem('musicPause', val);
        }
    },
    created() {

        let lImg = localStorage.getItem(KEY_BACKGROUND_IMAGE) || ''
        if (lImg) {
            this.bgi = lImg
        }
    }

}
</script>

<style scoped lang="scss">
.link {
    text-decoration: underline;
}

.t {
    margin-bottom: 1rem;
    font-weight: bold;
}

.btn {
    cursor: pointer;
    margin-left: .4rem;
}

.t-muted {
    font-size: .8rem;
    color: #666666;
}
</style>
