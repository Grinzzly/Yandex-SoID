import { createForm } from 'final-form';

export default config => ({
  data() {
    return {
      form: createForm({
        ...config,
        initialValues: config.initialValues || this.initialValues,
        onSubmit: config.onSubmit || this.handleSubmit,
        validate: config.validate || this.validate,
      }),
      formState: null,
    };
  },
  provide() {
    return {
      form: this.form,
    };
  },
  created() {
    this.unsubscribe = this.form.subscribe(
      (formState) => {
        this.formState = formState;
      },
      { values: true, errors: true },
    );
  },
  beforeDestroy() {
    this.unsubscribe();
  },
});
