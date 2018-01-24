<template>
  <div :class="s.timeBand">
    <div
      :class="s.gap"
      v-for="(gap, index) in gapsPositions"
      :key="`gap-${index}`"
      :style="{
        left: gap.left,
        width: gap.width
      }"
    >
      <button :class="s.gapAdd" type="button" @click="$router.push('events/create')">
        <svg :class="s.cross"><use :xlink:href="icons.cross.url" /></svg>
      </button>
    </div>
    <event-rectangle
      v-for="event in events"
      :key="`event-${event.id}`"
      :event="event"
    />
  </div>
</template>

<script>
import moment from 'moment';
import { mapGetters } from 'vuex';
import cross from '../assets/cross.svg';

export default {
  data() {
    return {
      icons: { cross },
    };
  },
  props: {
    events: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  computed: {
    ...mapGetters('date', ['earliestMoment', 'latestMoment']),
    gapsPositions() {
      const eventMoments = this.events.reduce((moments, event) => {
        moments.push(
          moment(event.dateStart),
          moment(event.dateEnd),
        );
        return moments;
      }, []);
      const moments = [this.earliestMoment, ...eventMoments, this.latestMoment];
      return moments
        .reduce((ranges, _, index, array) => {
          if (index % 2 === 0) {
            const gap = array.slice(index, index + 2);
            let momentStart = gap[0];
            const momentEnd = gap[1];

            while (momentStart.isBefore(momentEnd, 'minute')) {
              const rangeEnd = moment.min(
                momentStart.clone().add(1, 'hours').set({ minute: 0, second: 0 }),
                momentEnd,
              );
              const range = {
                left: `${Math.abs(this.earliestMoment.diff(momentStart, 'hours', true)) * (100 / 17)}%`,
                width: `${rangeEnd.diff(momentStart, 'hours', true) * (100 / 17)}%`,
              };
              momentStart = rangeEnd;
              ranges.push(range);
            }

            return ranges;
          }
          return ranges;
        }, []);
    },
  },
};
</script>


<style module="s" lang="scss">

.timeBand {
  height: 60px;
  width: 100%;
  position: relative;
  border-bottom: 1px solid #E9ECEF;
  border-top: 1px solid #E9ECEF;
}

.gap {
  position: absolute;
  height: 100%;
  background-color: white;
  height: 100%;
}

.gapAdd {
  height: 100%;
  width: 100%;
  background-color: #2B50FD;
  display: flex;
  align-items: center;
  justify-content: center;
  visibility: hidden;
  border: none;

  .gap:hover & {
    visibility: visible;
  }
}

.cross {
  width: 10px;
  height: 10px;
  color: white;
  transform: rotate(45deg);
}

</style>
