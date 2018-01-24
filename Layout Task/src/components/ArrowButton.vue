<template>
  <button
    type="button"
    :class="[s.arrow, { [s.arrow_right]: direction === 'right' }]"
  >
    <span :class="sh.srOnly">{{title}}</span>
    <svg><use :xlink:href="arrow.url" /></svg>
  </button>
</template>

<script>
import arrow from '@/assets/arrow.svg';

export default {
  data() {
    return {
      arrow,
    };
  },
  props: {
    direction: {
      type: String,
      default: 'left',
    },
    title: {
      type: String,
      required: true,
    },
  },
};
</script>

<style module="s" lang="scss">

.arrow {
  display: inline-block;
  border: none;
  position: relative;
  width: 32px;
  height: 32px;
  background-color: #E9ECEF;
  border-radius: 50%;
  color: rgba(0,0,0,0.43);

  &:active {
    background-color: #DCDFE1;
    color: #000;
  }

  svg {
    height: 14px;
    width: 20px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-55%, -50%);
  }

  &_right {
    transform: rotate(180deg)
  }
}

</style>
<style module="sh" lang="scss" src="@/styles/helpers.scss" />
