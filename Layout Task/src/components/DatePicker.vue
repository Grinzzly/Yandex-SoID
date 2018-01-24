<template>
  <div :class="s.root">
    <div :class="s.monthSelector">
      <arrow-button
        title="Предыдущий месяц"
        @click.native="handlePrevious"
      />
      <div :class="s.month">{{monthNameAndYear}}</div>
      <arrow-button
        title="Следующий месяц"
        direction="right"
        @click.native="handleNext"
      />
    </div>
    <div :class="s.days">
      <div v-for="weekday in weekdays" :key="weekday" :class="s.day">{{weekday}}</div>
      <div :style="{ width: offset }"></div>
      <button
        type="button"
        v-for="day in daysInMonth"
        :key="day"
        :class="[s.day, { [s.day_active]: day === dayOfMonth }]"
        @click="handleChangeDate(day)"
      >
        {{day}}
      </button>
    </div>
  </div>
</template>

<script>
import moment from 'moment';

export default {
  data() {
    return {
      lookingAtDate: this.unixDate,
      weekdays: ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс'],
    };
  },
  props: {
    unixDate: {
      type: Number,
      required: true,
    },
  },
  methods: {
    handlePrevious() {
      this.lookingAtDate = this.lookingAtMoment.clone().subtract(1, 'month').valueOf();
    },
    handleNext() {
      this.lookingAtDate = this.lookingAtMoment.clone().add(1, 'month').valueOf();
    },
    handleChangeDate(day) {
      this.$emit('dateChange', this.lookingAtMoment.clone().date(day).valueOf());
    },
  },
  computed: {
    givenMoment() {
      return moment(this.unixDate);
    },
    lookingAtMoment() {
      return moment(this.lookingAtDate);
    },
    offset() {
      return `${45 * this.lookingAtMoment.clone().date(1).weekday()}px`;
    },
    daysInMonth() {
      return this.lookingAtMoment.daysInMonth();
    },
    monthNameAndYear() {
      return this.lookingAtMoment.format('MMMM YYYY');
    },
    dayOfMonth() {
      return this.givenMoment.isSame(this.lookingAtMoment, 'month') ?
        this.givenMoment.date() :
        0;
    },
  },
};
</script>

<style module="s" lang="scss">
@import '~@/styles/variables';

.root {
  width: 100%;
  background-color: #fff;
  box-shadow: 0 1px 16px 0 rgba(0,44,92,0.28);
  border-radius: 0 0 8px 8px;
  padding: 16px;

  --day-width: 36px;
  @media (min-width: $breakpoint) {
    --day-width: 45px;
  }
}

.monthSelector {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 15px;
  font-weight: 700;
  margin-bottom: 10px;
  width: calc(var(--day-width) * 7);
  margin-left: auto;
  margin-right: auto;
}

.days {
  display: flex;
  flex-wrap: wrap;
  width: calc(var(--day-width) * 7);
  margin-left: auto;
  margin-right: auto;
}

.day {
  width: var(--day-width);
  height: var(--day-width);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background-color: transparent;
  border: none;
  font-weight: inherit;
  font-size: inherit;
  border: 3px solid white;

  &:hover {
    background-color: #E9ECEF;
  }

  &_active {
    background-color: #007DFF !important;
    color: white;
    font-weight: 700;
  }

  @media (min-width: $breakpoint) {
    border-width: 5px;
  }
}

</style>
