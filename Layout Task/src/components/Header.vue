<template>
  <header :class="s.header">
    <router-link to="/">
      <svg :class="s.logo"><use :xlink:href="logo.url" /></svg>
      <h1 :class="sh.srOnly">Яндекс Переговорки</h1>
    </router-link>
  </header>
</template>


<script>
import logo from '@/assets/logo.svg';

export default {
  data() {
    return {
      logo,
    };
  },
};
</script>

<style module="s" lang="scss">

.header {
  height: 48px;
  border-bottom: 1px solid #E9ECEF;
}

.logo {
  margin-left: 21px;
  margin-top: 14px;
  height: 22px;
  width: 151px;
}

</style>
<style module="sh" lang="scss" src="@/styles/helpers.scss" />
