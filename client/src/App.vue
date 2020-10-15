<template>
  <div id="app">
    <chat-widget />
  </div>
</template>

<script lang="ts">
import ChatWidget from '@/components/ChatWidget.vue';
import { Component, Vue } from 'vue-property-decorator';

@Component({
  components: { ChatWidget },
})
export default class App extends Vue {}
</script>

<style>
@import 'assets/css/theme.css';

body {
}

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
