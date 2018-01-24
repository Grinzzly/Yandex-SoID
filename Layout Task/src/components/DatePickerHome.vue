<template>
  <date-picker
    :unixDate="date"
    @dateChange="changeDate"
  />
</template>

<script>
import { mapState, mapMutations } from 'vuex';

export default {
  computed: mapState('date', ['date']),
  methods: mapMutations('date', {
    changeDate: 'SET_DATE',
  }),
};
</script>
