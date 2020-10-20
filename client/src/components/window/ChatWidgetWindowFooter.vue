<template>
  <div class="p-6 bg-white flex items-center">
    <input
      v-model="inputValue"
      class="flex-grow focus:outline-none text-sm"
      placeholder="Type something..."
      @keypress.enter.exact="sendText"
    />
    <mic-icon
      class="cursor-pointer"
      :class="[
        $client.isRecordingInput
          ? 'text-red-800 hover:text-red-600'
          : 'text-gray-600 hover:text-gray-800',
      ]"
      size="16"
      stroke-width="1"
      @click.prevent="
        $client.isRecordingInput ? $client.stopInputRecording() : $client.startInputRecording()
      "
      @contextmenu.prevent="$client.isRecordingInput ? $client.abortInputRecording() : undefined"
    />
  </div>
</template>

<script lang="ts">
import { RequestType } from 'jovo-client-web-vue';
import MicIcon from 'vue-feather-icons/icons/MicIcon';
import { Component, Vue } from 'vue-property-decorator';

@Component({
  name: 'chat-widget-window-footer',
  components: {
    MicIcon,
  },
})
export default class ChatWidgetWindowFooter extends Vue {
  inputValue = '';

  async sendText() {
    if (!this.inputValue) return;
    const text = this.inputValue;
    this.inputValue = '';
    return this.$client.createRequest({ type: RequestType.Text, body: { text } }).send();
  }
}
</script>
