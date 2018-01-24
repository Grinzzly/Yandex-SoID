<template>
  <time-pointer
    v-if="format && position"
    :formatted-time="format"
    :left="position"
    :formatted-time-class="s.hour"
    :line-class="s.verticalLine"
  />
</template>

<script>
import moment from 'moment';

export default {
  data() {
    return {
      format: null,
      position: null,
    };
  },
  methods: {
    setCurrentTime() {
      const currentMoment = moment();
      const format = currentMoment.format('k:mm');

      if (this.format === format) return;

      let forcePosition;
      const diff = currentMoment.diff(moment().set({ hour: 7, minute: 0, second: 0 }), 'hours', true);
      if (diff < 0) { forcePosition = '0'; }
      if (diff > 17) { forcePosition = '100%'; }

      Object.assign(this, {
        format: currentMoment.format('k:mm'),
        position: forcePosition || `${diff * (100 / 17)}%`,
      });
    },
  },
  mounted() {
    this.setCurrentTime();
    this.currentTimeUpdateInterval = setInterval(this.setCurrentTime, 1000);
  },
  beforeDestroy() {
    clearInterval(this.currentTimeUpdateInterval);
  },
};
</script>

<style module="s">

.verticalLine {
  border-left-color: #007DFF;
  top: 26px;
  height: calc(100% - 26px);
}

.hour {
  background-color: #007DFF;
  border-radius: 100px;
  width: 49px;
  height: 20px;
  color: white;
  transform: translate(-50%, 6px);
  display: flex;
  align-items: center;
  justify-content: center;
}

</style>
