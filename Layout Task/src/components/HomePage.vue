<template>
  <div :class="s.root">
    <div :class="s.pickers">
      <day-picker @dateClick="openDatePicker" />
      <date-picker-home v-if="showDatePicker" :class="s.datePicker" v-click-outside="closeDatePicker" />
    </div>
    <div :class="s.rooms">
      <div :class="s.roomList">
        <div :class="s.timeLine" />
        <ul :class="s.list">
          <li v-for="floor in floors" :key="floor">
            <div :class="s.floor">{{floor}} этаж</div>
            <ul :class="s.list">
              <li :class="s.listItem" v-for="room in roomsByFloor[floor]" :key="room.id">
                <div :class="s.roomTitle">{{room.title}}</div>
                <div :class="s.roomCapacity">до {{room.capacity}} человек</div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <div :class="s.eventsDiagram">
        <div :class="s.timeLine" />
        <time-pointer
          v-for="(hour, index) in hoursRange"
          :key="hour"
          :formatted-time="hour"
          :left="`${(index + 1) * (100 / 17)}%`"
        />
        <current-time-pointer />
        <div v-for="floor in floors" :key="floor">
          <div :class="s.floor" />
          <time-band
            v-for="room in roomsByFloor[floor]"
            :key="room.id"
            :events="eventsByRoomId[room.id]"
          />
        </div>  
      </div>
    </div>
  </div>
</template>


<script>
import moment from 'moment';
import { mapGetters, mapState, mapActions } from 'vuex';
import range from 'ramda/src/range';
import path from 'ramda/src/path';
import groupBy from 'ramda/src/groupBy';

export default {
  data() {
    return {
      hoursRange: range(8, 24),
      showDatePicker: false,
    };
  },
  methods: {
    ...mapActions({
      fetchRooms: 'rooms/fetch',
      fetchEvents: 'events/fetch',
    }),
    openDatePicker() {
      this.showDatePicker = true;
    },
    closeDatePicker() {
      this.showDatePicker = false;
    },
  },
  computed: {
    ...mapGetters('date', ['earliestMoment', 'latestMoment']),
    ...mapState({
      rooms: state => state.rooms.data,
      events: state => state.events.data,
    }),
    roomsByFloor() {
      return this.rooms.reduce((acc, room) => ({
        ...acc,
        [room.floor]: [
          ...(acc[room.floor] || []),
          room,
        ],
      }), {});
    },
    floors() {
      return Object.keys(this.roomsByFloor).sort((a, b) => a - b);
    },
    eventsByRoomId() {
      return groupBy(path(['room', 'id']), this.eventsOnChosenDate);
    },
    eventsOnChosenDate() {
      if (!this.events) return [];
      return this.events.filter(event => moment(event.dateStart).isBetween(this.earliestMoment, this.latestMoment, null, '[]'));
    },
  },
  created() {
    this.fetchRooms();
    this.fetchEvents();
  },
};
</script>

<style module="s" lang="scss">

.floor {
  height: 36px;
  color: #858E98;
  text-transform: uppercase;
  font-size: 11px;
  letter-spacing: 0.4px;
  font-weight: 700;
  padding-top: 17px;
  padding-bottom: 7px;
  padding-left: 19px;
}

.timeLine {
  height: 33px;
  background-color: #fff;
  border-bottom: 1px solid #E9ECEF;
}

.root {
  flex: 1 0 auto;
  display: flex;
  flex-direction: column;
}

.rooms {
  flex: 1 0 auto;
  display: flex;
  background-color: #f7f8f9;
  width: 100vw;
  overflow: auto;
}

.roomList {
  width: 181px;
  flex-shrink: 0;
}

.timeBand {
  display: flex;
}

.hourBand {
  width: 66px;
}

.hourBand,
.listItem {
  height: 60px;
  border-bottom: 1px solid #E9ECEF;
  border-top: 1px solid #E9ECEF;
  background-color: white;  
}

.list {
  list-style: none;
  padding-left: 0;
  margin-top: 0;
  margin-bottom: 0;
}

.listItem {
  padding-top: 13px;
  padding-left: 19px;
  padding-right: 25px;
}

.roomTitle {
  font-weight: 700;
  font-size: 15px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.roomCapacity {
  font-size: 13px;
  padding-top: 2px;
}

.eventsDiagram {
  position: relative;
  width: 66px * 17;
  flex-shrink: 0;
}

.datePicker {
  position: absolute;
  top: 100%;
  z-index: 2;
}

.pickers {
  position: relative;
}

</style>