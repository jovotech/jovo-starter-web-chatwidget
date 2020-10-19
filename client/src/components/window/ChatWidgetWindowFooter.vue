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
        isCapturingInput ? 'text-red-800 hover:text-red-600' : 'text-gray-600 hover:text-gray-800',
      ]"
      size="16"
      stroke-width="1"
      @click.prevent="
        isCapturingInput ? $client.stopInputCapturing() : $client.startInputCapturing()
      "
      @contextmenu.prevent="isCapturingInput ? $client.abortInputCapturing() : undefined"
    />
  </div>
</template>

<script lang="ts">
import { RequestType } from 'jovo-client-web-vue';
import MicIcon from 'vue-feather-icons/icons/MicIcon';
import { Component, InjectReactive, Vue } from 'vue-property-decorator';

@Component({
  name: 'chat-widget-window-footer',
  components: {
    MicIcon,
  },
})
export default class ChatWidgetWindowFooter extends Vue {
  inputValue = '';

  @InjectReactive({
    from: 'isCapturingInput',
    default: false,
  })
  isCapturingInput!: boolean;

  async sendText() {
    if (!this.inputValue) return;
    const text = this.inputValue;
    this.inputValue = '';
    return this.$client.createRequest({ type: RequestType.Text, body: { text } }).send();
  }
}
</script>
