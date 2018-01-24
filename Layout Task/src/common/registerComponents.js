import Vue from 'vue';
import Header from '@/components/Header';
import DayPicker from '@/components/DayPicker';
import ArrowButton from '@/components/ArrowButton';
import DatePicker from '@/components/DatePicker';
import EventRectangle from '@/components/EventRectangle';
import TimeBand from '@/components/TimeBand';
import DateInput from '@/components/DateInput';
import FieldInput from '@/components/FieldInput';
import TimePointer from '@/components/TimePointer';
import CurrentTimePointer from '@/components/CurrentTimePointer';
import DatePickerHome from '@/components/DatePickerHome';
import AttendeesInput from '@/components/AttendeesInput';
import AvatarImage from '@/components/AvatarImage';
import CrossButton from '@/components/CrossButton';

import ClickOutside from '@/directives/ClickOutside';

export default () => {
  Vue.component('app-header', Header);
  Vue.component('day-picker', DayPicker);
  Vue.component('date-picker', DatePicker);
  Vue.component('date-picker-home', DatePickerHome);
  Vue.component('arrow-button', ArrowButton);
  Vue.component('event-rectangle', EventRectangle);
  Vue.component('time-band', TimeBand);
  Vue.component('date-input', DateInput);
  Vue.component('field-input', FieldInput);
  Vue.component('time-pointer', TimePointer);
  Vue.component('current-time-pointer', CurrentTimePointer);
  Vue.component('attendees-input', AttendeesInput);
  Vue.component('avatar-image', AvatarImage);
  Vue.component('cross-button', CrossButton);

  Vue.directive('click-outside', ClickOutside);
};
