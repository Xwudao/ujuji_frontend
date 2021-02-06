<template>
  <div>
    <div class="weather" @click="openDialog">
      <el-tooltip class="item" effect="dark" content="天气预报设置"
                  placement="left">
        <i class="iconfont icon-weathercloud1183092easyiconnet" :style="{color}"></i>
      </el-tooltip>
    </div>

    <weather-dialog :weather-visible="showWeatherDialog"/>
  </div>
</template>

<script>
import WeatherDialog from "@/components/dialog/WeatherDialog";
import TransformData from "@/config/TransformData";
import {EVENT_CLOSE_WEATHER_DIALOG, EVENT_OPEN_WEATHER_DIALOG} from "@/config/events";

export default {
  name: "Weather",
  props: ['color'],
  components: {WeatherDialog},
  data() {
    return {
      showWeatherDialog: false,
    }
  },
  methods: {
    openDialog() {
      this.showWeatherDialog = true;
    }
  },
  created() {

    TransformData.$on(EVENT_OPEN_WEATHER_DIALOG, () => {
      this.showWeatherDialog = true
    })
    TransformData.$on(EVENT_CLOSE_WEATHER_DIALOG, () => {
      this.showWeatherDialog = false
    })
  },
  computed: {}
}
</script>

<style scoped lang="scss">
.weather {

  i {
    color: white;
    font-size: 1.7rem;
    cursor: pointer;
  }
}
</style>
