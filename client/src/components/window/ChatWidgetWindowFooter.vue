<template>
  <div class="p-6 bg-white flex items-center">
    <input v-model="inputValue" class="flex-grow focus:outline-none text-sm"  placeholder="Type something..."  />
    <mic-icon class="text-gray-800" size="16" stroke-width="1" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import MicIcon from 'vue-feather-icons/icons/MicIcon';

@Component({
  name: 'chat-widget-window-footer',
  components: {
    MicIcon,
  },
})
export default class ChatWidgetWindowFooter extends Vue {
  inputValue = '';

}
</script>
