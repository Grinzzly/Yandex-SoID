<template>
  <button
    type="button"
    :class="s.clearButton"
  >
    <svg :class="s.clearIcon"><use :xlink:href="icons.cross.url" /></svg>
    <span :class="sh.srOnly">{{label}}</span>
  </button>
</template>

<script>
import cross from '@/assets/cross.svg';

export default {
  data() {
    return {
      icons: { cross },
    };
  },
  props: {
    label: {
      type: String,
      default: 'Стереть',
    },
  },
};
</script>

<style module="s" lang="scss">

.clearButton {
  background-color: transparent;
  border: none;
  padding: 0;
  position: absolute;
  top: 0;
  right: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 40px;

  &:hover,
  &_active {
    .clearIcon {
      color: #000;
    }
  }
}

.clearIcon {
  color: #AFB4B8;
  width: 12px;
  height: 12px;
}

</style>
<style module="sh" lang="scss" src="@/styles/helpers.scss" />
