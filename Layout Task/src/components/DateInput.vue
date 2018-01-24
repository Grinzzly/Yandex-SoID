<template>
  <div :class="s.dateInput">
    <label>
      <span :class="sh.srOnly">Дата</span>
      <input
        type="text"
        placeholder="Дата"
        :class="sh.input"
        :value="field.value || ''"
        @blur="field.blur"
        @input="field.change($event.target.value)"
        @focus="field.focus"
      />
    </label>
    <button
      type="button"
      :class="[s.calendarButton, { [s.calendarButton_active]: isDatePickerVisible }]"
      @click="isDatePickerVisible = !isDatePickerVisible"
    >
      <svg :class="s.calendarIcon"><use :xlink:href="icons.calendar.url" /></svg>
      <span :class="sh.srOnly">{{isDatePickerVisible ? 'Скрыть календарь' : 'Показать календарь'}}</span>
    </button>
    <date-picker
      v-if="isDatePickerVisible"
      :class="s.datePicker"
      :unix-date="unixDate"
      @dateChange="changeDate"
    />
  </div>
</template>

<script>
import moment from 'moment';
import calendar from '@/assets/calendar.svg';

export default {
  data() {
    return {
      isDatePickerVisible: false,
      field: null,
      icons: {
        calendar,
      },
    };
  },
  inject: ['form'],
  methods: {
    changeDate(unixDate) {
      this.field.change(moment(unixDate).format('D MMMM, YYYY'));
    },
    validate(value) {
      if (moment(value, 'D MMMM, YYYY').isValid()) return undefined;
      return 'Дата введена в некорректном формате';
    },
  },
  computed: {
    unixDate() {
      const inputMoment = moment(this.field.value, 'D MMMM, YYYY');
      if (inputMoment.isValid()) {
        return inputMoment.valueOf();
      }
      return Date.now();
    },
  },
  created() {
    this.unsubscribeField = this.form.registerField(
      'date',
      (fieldState) => {
        this.field = fieldState;
      },
      { value: true },
      { validate: this.validate },
    );
  },
  beforeDestroy() {
    this.unsubscribeField();
  },
};
</script>


<style module="s" lang="scss">

.calendarButton {
  background-color: transparent;
  border: none;
  padding: 0;
  position: absolute;
  top: 0;
  right: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 44px;
  width: 40px;

  &:hover,
  &_active {
    .calendarIcon {
      color: #000;
    }
  }
}

.calendarIcon {
  color: #AFB4B8;
  width: 12px;
  height: 12px;
}

.dateInput {
  position: relative;
  z-index: 2;
  margin-bottom: 8px;
}

.datePicker {
  position: absolute;
}

</style>
<style lang="scss" module="sh" src="../styles/helpers.scss" />
