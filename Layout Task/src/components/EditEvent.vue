<template>
  <div :class="s.root">
    <form>
      <h1 :class="s.heading">{{eventId ? 'Редактирование встречи' : 'Новая встреча'}}</h1>
      <label :class="sh.label" for="title">Тема</label>
      <field-input
        name="title"
        placeholder="О чём будете говорить?"
        :class="s.topic"
      />
      <div :class="s.dateAndTime">
        <div :class="sh.label">Дата и время</div>
        <date-input />
        <div :class="s.timeRange">
          <label :class="sh.srOnly" for="timeStart">Начало</label>
          <field-input
            name="timeStart"
            placeholder="Начало"
            :class="s.time"
          />
          <div :class="s.dash">—</div>
          <label :class="sh.srOnly" for="timeEnd">Конец</label>
          <field-input
            name="timeEnd"
            placeholder="Конец"
            :class="s.time"
          />
        </div>
      </div>
      <hr :class="s.hr" />
      <attendees-input />
      <hr :class="s.hr" />      
      <!-- <fieldset>
        <legend>Рекомендованные переговорки</legend>
        <label v-for="room in recommendedRooms" :key="room.id">
          <input type="checkbox" />
          <div></div>
        </label>
      </fieldset> -->
    </form>
  </div>
</template>

<script>
import moment from 'moment';
import arrayMutators from 'final-form-arrays';
import createForm from '../mixins/createForm';

const formMixin = createForm({
  mutators: arrayMutators,
  validateOnBlur: true,
});

export default {
  props: ['eventId'],
  mixins: [formMixin],
  methods: {
    handleSubmit() {},
    validate(values) {
      const errors = {};

      if (!moment(values.timeStart, 'k:mm').isValid()) {
        errors.timeStart = 'Время начала введено в некорректном формате';
      }

      if (!moment(values.timeEnd, 'k:mm').isValid()) {
        errors.timeEnd = 'Время конца введено в некорректном формате';
      }
    },
  },
};
</script>

<style module="s">

.root {
  padding-left: 17px;
  padding-right: 17px;
}

.heading {
  font-size: 20px;
  margin-top: 24px;
  margin-bottom: 16px;
  font-weight: 700;
}

.time {
  flex-grow: 1;
}

.topic {
  margin-bottom: 8px;
}

.dateAndTime {
  display: block;
  margin-bottom: 12px;
}

.hr {
  border: none;
  border-top: 8px solid #E9ECEF;
  margin-left: -17px;
  margin-right: -17px;
  margin-top: 0;
  margin-bottom: 0;
}

.timeRange {
  display: flex;
  font-size: 13px;
}

.dash {
  flex-shrink: 0;
  padding-left: 4px;
  padding-right: 4px;
  padding-top: 14px;
  font-weight: 700;
}

</style>

<style lang="scss" module="sh" src="../styles/helpers.scss" />
