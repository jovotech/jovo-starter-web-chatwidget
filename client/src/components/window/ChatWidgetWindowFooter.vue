<template>
  <div class="p-6 bg-white flex items-center">
    <input
      ref="textInput"
      v-model="inputValue"
      class="flex-grow focus:outline-none text-sm"
      placeholder="Type something and press Enter..."
      @keypress.enter.exact="sendText"
      autofocus
    />
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="h-5 w-5 cursor-pointer text-primary hover:text-gray-800 transform rotate-45"
      viewBox="0 0 20 20"
      fill="currentColor"
      @click="sendText"
    >
      <path
        d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"
      />
    </svg>
  </div>
</template>

<script lang="ts">
import { ClientEvent, InputType } from '@jovotech/client-web-vue2';
import { Component, Vue } from 'vue-property-decorator';

@Component({
  name: 'chat-widget-window-footer',
  components: {},
})
export default class ChatWidgetWindowFooter extends Vue {
  inputValue = '';

  mounted() {
    this.$client.on(ClientEvent.Request, this.onRequest);
  }

  beforeDestroy() {
    this.$client.off(ClientEvent.Request, this.onRequest);
  }

  focusTextInput() {
    (this.$refs.textInput as HTMLInputElement).focus();
  }

  async sendText() {
    if (!this.inputValue) return;
    const text = this.inputValue;
    this.inputValue = '';
    return this.$client.send({
      type: InputType.Text,
      text,
    });
  }

  private onRequest() {
    this.focusTextInput();
  }
}
</script>
