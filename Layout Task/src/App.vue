<template>
  <div id="app">
    <app-header />
    <router-view />
  </div>
</template>

<style>
* {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: "Helvetica Neue", Arial, sans-serif;
}

html, body, #app {
  height: 100%;
}

#app {
  display: flex;
  flex-direction: column;
}
</style>
