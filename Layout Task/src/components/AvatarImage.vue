<template>
  <div
    :class="s.avatar"
    :style="{
      backgroundImage: `url(${src})`,
      width: size,
      height: size
    }"
  />
</template>

<script>
export default {
  props: {
    src: {
      type: String,
      required: true,
    },
    size: {
      type: String,
    },
  },
};
</script>

<style module="s">

.avatar {
  background-size: cover;
  background-repeat: no-repeat;
  width: 32px;
  height: 32px;
  border-radius: 50%;
}

</style>
