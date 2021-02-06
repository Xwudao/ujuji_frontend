<template>
  <el-dialog
      title="天气预报设置"
      :visible="weatherVisible"
      width="400px"
      :close-on-click-modal="false"
      :modal="false"
      :before-close="cancel">
    <span class="text">地区：</span>
    <el-input size="small" @blur="onBlur" @keyup.native.enter="onBlur" v-model="input"
              placeholder="请输入天气预报地区，移除光标保存"></el-input>
  </el-dialog>
</template>

<script>
import {mapState, mapMutations} from "vuex"
import TransformData from "@/config/TransformData";
import {KEY_WEATHER} from '@/config/keys'
import {EVENT_CLOSE_WEATHER_DIALOG, EVENT_WEATHER} from "@/config/events";

export default {
  name: "WeatherDialog",
  props: {
    weatherVisible: {
      default: false,
      type: Boolean
    }
  },
  data() {
    return {
      input: '',
    }
  },
  computed: {
    ...mapState(['city'])
  },
  created() {
    this.input = this.city
  },
  methods: {
    ...mapMutations(['changeCity']),
    cancel() {
      console.log('cancel')
      TransformData.$emit(EVENT_CLOSE_WEATHER_DIALOG)
    },
    onBlur() {
      let c = this.input
      console.log('this.city', this.city);
      console.log(c)
      if (!c || this.city === c) {
        return;
      }
      this.$notify.success('已成功将天气预报地区改为：' + c)

      localStorage.setItem(KEY_WEATHER, c);
      this.$store.commit('changeCity', c)
      TransformData.$emit(EVENT_WEATHER)
    }
  },
}
</script>

<style scoped lang="scss">
.text {
  display: block;
  margin-bottom: 1rem;
}
</style>
