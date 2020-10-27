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
import { RequestType } from 'jovo-client-web-vue';
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

  focusTextInput() {
    (this.$refs.textInput as HTMLInputElement).focus();
  }

  async sendText() {
    if (!this.inputValue) return;
    const text = this.inputValue;
    this.inputValue = '';
    (this.$refs.textInput as HTMLElement).focus();
    return this.$client.createRequest({ type: RequestType.Text, body: { text } }).send();
  }
}
</script>
