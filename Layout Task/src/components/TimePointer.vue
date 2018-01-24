<template>
  <div
    :class="s.timePointer"
    :style="{ left }"
  >
    <div :class="[s.hour, formattedTimeClass]">{{formattedTime}}</div>
    <div :class="[s.verticalLine, lineClass]" />
  </div>
</template>

<script>
export default {
  props: {
    left: {
      type: String,
      required: true,
    },
    formattedTime: {
      type: [String, Number],
      required: true,
    },
    formattedTimeClass: {
      type: String,
    },
    lineClass: {
      type: String,
    },
  },
};
</script>

<style module="s" lang="scss">

.timePointer {
  position: absolute;
  height: 100%;
  top: 0;
  z-index: 1;
  pointer-events: none;
}

.verticalLine {
  position: absolute;
  top: 33px;
  display: block;
  width: 1px;
  height: calc(100% - 33px);
  border-left: 1px solid rgba(19,100,205,0.1);
}

.hour {
  font-size: 11px;
  color: #252525;
  letter-spacing: 0.4px;
  font-weight: 700;
  transform: translate(-50%, 10px);
}

</style>

