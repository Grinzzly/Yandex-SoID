<template>
  <div
    :class="s.container"
    v-click-outside="blurField"
  >
    <input
      type="text"
      :id="name"
      :placeholder="placeholder"
      :value="field.value || ''"
      :class="[sh.input, inputClass]"
      @input="field.change($event.target.value)"
      @focus="field.focus"
      ref="input"
    />
    <cross-button
      v-if="field.active && field.value && field.value !== ''"
      @click.native="clearField"
    />
  </div>
</template>

<script>
import createFormField from '@/mixins/createFormField';

export default {
  mixins: [createFormField()],
  props: {
    name: {
      type: String,
      required: true,
    },
    validate: {
      type: Function,
    },
    inputClass: {
      type: String,
    },
    placeholder: {
      type: String,
    },
  },
  methods: {
    clearField() {
      this.field.change('');
      this.$refs.input.focus();
    },
    blurField() {
      if (this.field.active) {
        this.field.blur();
      }
    },
  },
};
</script>

<style module="s">

.container {
  position: relative;
  margin-bottom: 8px;
}

</style>

<style lang="scss" module="sh" src="../styles/helpers.scss" />
