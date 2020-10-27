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
    <send-icon class="cursor-pointer" size="20" stroke-width="1" @click="sendText" />
  </div>
</template>

<script lang="ts">
import { RequestType, ClientEvent, WebRequest } from 'jovo-client-web-vue';
import SendIcon from 'vue-feather-icons/icons/SendIcon';
import { Component, Vue } from 'vue-property-decorator';

@Component({
  name: 'chat-widget-window-bottom',
  components: {
    SendIcon,
  },
})
export default class ChatWidgetWindowBottom extends Vue {
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
    return this.$client.createRequest({ type: RequestType.Text, body: { text } }).send();
  }

  private onRequest(req: WebRequest) {
    this.focusTextInput();
  }
}
</script>
