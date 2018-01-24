<template>
  <div 
    @click="showTooltip"
    :class="s.eventRectangle"
    :style="{
      left: eventPosition.left,
      width: eventPosition.width
    }"
  >
    <div
      :class="s.tooltipPointer"
      v-if="isTooltipVisible"
    />
    <div
      :class="s.tooltip"
      v-if="isTooltipVisible"
      v-click-outside="hideTooltip"
      :style="{ left: tooltipLeft }"
      ref="tooltip"
    >
      <div :class="s.title">{{event.title}}</div>
      <div :class="s.dateAndRoom">{{eventDate}} · {{event.room.title}}</div>
      <div :class="s.attendees">
        <avatar-image :src="firstAttendee.avatarUrl" />
        <div :class="s.attendeesText">{{firstAttendee.login}} <span :class="s.otherAttendees">и {{otherAttendeesCount}} {{noun(otherAttendeesCount, ['участник', 'участника', 'участников'])}}</span></div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment';
import { mapGetters } from 'vuex';
import noun from '../utils/noun';

export default {
  data() {
    return {
      isTooltipVisible: false,
      tooltipLeft: 0,
    };
  },
  props: {
    event: {
      type: Object,
      required: true,
    },
  },
  methods: {
    noun,
    showTooltip() {
      if (this.isTooltipVisible) return;

      this.isTooltipVisible = true;
      this.$nextTick(() => {
        this.tooltipLeft = `-${this.$refs.tooltip.getBoundingClientRect().left}px`;
      });
    },
    hideTooltip() {
      this.isTooltipVisible = false;
      this.tooltipLeft = 0;
    },
  },
  computed: {
    ...mapGetters('date', ['earliestMoment']),
    dateStart() {
      return moment(this.event.dateStart);
    },
    dateEnd() {
      return moment(this.event.dateEnd);
    },
    eventPosition() {
      return {
        left: `${Math.abs(this.earliestMoment.diff(this.dateStart, 'hours', true)) * (100 / 17)}%`,
        width: `${this.dateEnd.diff(this.dateStart, 'hours', true) * (100 / 17)}%`,
      };
    },
    eventDate() {
      return `${this.dateStart.format('D MMMM, H:mm')}—${this.dateEnd.format('H:mm')}`;
    },
    firstAttendee() {
      return this.event.users[0];
    },
    otherAttendeesCount() {
      return this.event.users.length - 1;
    },
  },
};
</script>

<style module="s" lang="scss">

.eventRectangle {
  position: absolute;  
  height: 100%;
  background-color: #D5DFE9;

  &:hover {
    background-color: #98A9B9;
  }

  &:active {
    background-color: #8594a2;
  }
}

.tooltip {
  position: absolute;
  z-index: 1;
  top: 100%;
  width: 100vw;
  background-color: #fff;
  box-shadow: 0 1px 16px 0 rgba(0,44,92,0.28);
  padding: 16px 19px;  
}

.tooltipPointer {
  position: absolute;
  left: 50%;
  bottom: 0;
  transform: translateX(-8px);
  border-bottom: 9px solid white;
  border-left: 8px solid transparent;
  border-right: 8px solid transparent;
  z-index: 2;
}

.title {
  font-weight: 700;
  font-size: 20px;
  margin-bottom: 8px;
}

.dateAndRoom {
  font-size: 15px;
  margin-bottom: 15px;
}

.attendees {
  display: flex;
}

.attendeesText {
  font-size: 15px;
  padding-left: 8px;
  padding-top: 8px;
}

.otherAttendees {
  color: #858E98;
}

</style>
