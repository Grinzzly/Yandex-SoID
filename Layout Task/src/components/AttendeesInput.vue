<template>
  <div :class="s.attendees">
    <label :class="sh.label" for="attendees">Участники</label>
    <div
      :class="s.inputContainer"
      v-click-outside="hideSuggestions"      
    >
      <input
        id="attendees"
        :class="[sh.input, s.input]"
        type="text"
        placeholder="Например, Тор Одинович"
        v-model="attendeeName"
        @focus="showSuggestions = true"
        ref="input"
      />
      <cross-button
        :class="s.clearButton"
        v-if="showSuggestions && attendeeName !== ''"
        @click.native="clearField"
      />
      <div
        v-if="showSuggestions"
        :class="s.suggestions"
      >
        <button
          type="button"
          v-for="user in suggestions"
          :class="s.suggestion"
          :key="user.id"
          @click="pushUser(user)"
        >
          <avatar-image
            :class="s.avatar"
            :src="user.avatarUrl"
          />
          {{user.login}}&nbsp;
          <span :class="s.floor">· {{user.homeFloor}} этаж</span>
        </button>
      </div>
    </div>
    <div :class="s.chosenAttendees">
      <div
        v-for="(attendeeId, index) in field.value"
        :key="attendeeId"
        :class="s.chosenAttendee"
      >
        <avatar-image
          :class="s.avatar"
          :src="usersById[attendeeId].avatarUrl"
        />
        <span>{{usersById[attendeeId].login}}</span>
        <cross-button
          label="Удалить"
          @click.native="form.mutators.remove('usersIds', index)"
        />
      </div>
    </div>
  </div>
</template>


<script>
import { mapActions, mapState } from 'vuex';
import createFormField from '@/mixins/createFormField';
import indexBy from 'ramda/src/indexBy';
import prop from 'ramda/src/prop';

export default {
  data() {
    return {
      attendeeName: '',
      showSuggestions: false,
    };
  },
  mixins: [createFormField('usersIds')],
  computed: {
    ...mapState({ users: state => state.users.data }),
    suggestions() {
      return this.users.filter(user =>
        new RegExp(this.attendeeName, 'g').test(user.login) && !(this.field.value || []).includes(user.id));
    },
    usersById() {
      return indexBy(prop('id'), this.users);
    },
  },
  methods: {
    ...mapActions({ fetchUsers: 'users/fetch' }),
    hideSuggestions() {
      if (this.showSuggestions) {
        this.showSuggestions = false;
      }
    },
    clearField() {
      this.attendeeName = '';
      this.$refs.input.focus();
    },
    pushUser(user) {
      this.form.mutators.push('usersIds', user.id);
      this.clearField();
    },
  },
  created() {
    this.fetchUsers();
  },
};
</script>


<style module="s" lang="scss">

.chosenAttendee {
  display: flex;
  font-size: 15px;
  align-items: center;
  border-radius: 16px;
  background-color: #E9ECEF;
  margin-bottom: 8px;
  position: relative;
}

.attendees {
  position: relative;
  margin-top: 16px;
  margin-bottom: 20px;
}

.suggestions {
  position: absolute;
  width: 100%;
  box-shadow: 0 1px 16px 0 rgba(0,44,92,0.28);
  border-radius: 4px;
  z-index: 1;
}

.suggestion {
  width: 100%;
  display: flex;
  align-items: center;
  background-color: transparent;
  border: none;
  padding: 0;
  text-align: left;
  font-size: 15px;
  padding-left: 16px;
  padding-right: 16px;
  padding-top: 5px;
  padding-bottom: 5px;

  &:first-child {
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
  }

  &:last-child {
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
  }

  &:nth-child(odd) {
    background-color: #fff;
  }

  &:nth-child(even) {
    background-color: #F6F7F9;
  }

  &:hover,
  &:focus {
    font-weight: 700;
  }
}

.input {
  margin-bottom: 0 !important;
  position: relative;
  z-index: 1;
}

.inputContainer {
  position: relative;
  margin-bottom: 10px;
}

.clearButton {
  z-index: 1;
}

.floor {
  color: #858E98;
}

.avatar {
  margin-right: 8px;
}

</style>
<style module="sh" lang="scss" src="@/styles/helpers.scss" />
