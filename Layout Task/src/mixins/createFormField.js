export default name => ({
  data() {
    return {
      field: null,
    };
  },
  inject: ['form'],
  created() {
    this.unsubscribeField = this.form.registerField(
      name || this.name,
      (fieldState) => {
        this.field = fieldState;
      },
      { value: true, active: true },
      { validate: this.validate },
    );
  },
  beforeDestroy() {
    this.unsubscribeField();
  },
});
