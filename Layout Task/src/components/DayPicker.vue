<template>
  <div :class="s.dateSelector">
    <arrow-button
      title="Предыдущий день"
      @click.native="handlePrevious"
    />
    <button
      type="button"
      :class="s.dateButton"
      @click="$emit('dateClick')"
    >
      {{formattedDate}}
    </button>
    <arrow-button
      title="Следующий день"
      direction="right"
      @click.native="handleNext"
    />
  </div>
</template>


<script>
import moment from 'moment';
import { mapState, mapMutations } from 'vuex';
import capitalize from 'lodash/capitalize';

export default {
  data() {
    return {
      showCalendar: false,
    };
  },
  methods: mapMutations('date', {
    handlePrevious: 'GO_TO_PREVIOUS_DAY',
    handleNext: 'GO_TO_NEXT_DAY',
  }),
  computed: {
    ...mapState('date', ['date']),
    formattedDate() {
      const givenMoment = moment(this.date);

      const date = givenMoment.format('D MMM');
      const calendarTime = givenMoment.calendar(null, {
        lastDay: '[Вчера]',
        sameDay: '[Сегодня]',
        nextDay: '[Завтра]',
        nextWeek: 'dddd',
        lastWeek: 'dddd',
        sameElse: 'dddd',
      });
      return `${date} · ${capitalize(calendarTime)}`;
    },
  },
};
</script>

<style module="s">

.dateSelector {
  height: 55px;
  justify-content: center;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 19px;
  padding-right: 12px;
  overflow-x: hidden;
  border-bottom: 1px solid #E9ECEF;
}

.dateButton {
  background-color: transparent;
  border: none;
  font-size: 15px;
  font-weight: 700;
  display: inline-block;
}

</style>