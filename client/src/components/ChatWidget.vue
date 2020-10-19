<template>
  <div class="fixed" style="bottom: 2rem; right: 2rem;">
    <transition
      enter-active-class="transition-opacity duration-300"
      leave-active-class="transition-opacity duration-300"
      enter-class="opacity-0"
      leave-to-class="opacity-0"
    >
      <chat-widget-window v-show="isVisible" class="mb-6" />
    </transition>
    <chat-widget-toggle-button class="ml-auto" :is-active="isVisible" @click="handleToggle" />
  </div>
</template>

<script lang="ts">
import ChatWidgetToggleButton from '@/components/ChatWidgetToggleButton.vue';
import ChatWidgetWindow from '@/components/window/ChatWidgetWindow.vue';
import { AudioRecorderEvent, RequestType, SpeechRecognizerEvent } from 'jovo-client-web-vue';
import {Component, ProvideReactive, Vue} from 'vue-property-decorator';

@Component({
  name: 'chat-widget',
  components: { ChatWidgetWindow, ChatWidgetToggleButton },
})
export default class ChatWidget extends Vue {
  isVisible = false;
  hasInitialized = false;

  @ProvideReactive('isCapturingInput')
  isCapturingInput = false;

  mounted() {
    this.$client.$audioRecorder.on(AudioRecorderEvent.Start, this.onInputCapturingStart);
    this.$client.$audioRecorder.on(AudioRecorderEvent.Stop, this.onInputCapturingEnd);
    this.$client.$audioRecorder.on(AudioRecorderEvent.Abort, this.onInputCapturingEnd);

    this.$client.$speechRecognizer.on(SpeechRecognizerEvent.Start, this.onInputCapturingStart);
    this.$client.$speechRecognizer.on(SpeechRecognizerEvent.End, this.onInputCapturingEnd);
  }

  beforeDestroy() {
    this.$client.$audioRecorder.off(AudioRecorderEvent.Start, this.onInputCapturingStart);
    this.$client.$audioRecorder.off(AudioRecorderEvent.Stop, this.onInputCapturingEnd);
    this.$client.$audioRecorder.off(AudioRecorderEvent.Abort, this.onInputCapturingEnd);

    this.$client.$speechRecognizer.off(SpeechRecognizerEvent.Start, this.onInputCapturingStart);
    this.$client.$speechRecognizer.off(SpeechRecognizerEvent.End, this.onInputCapturingEnd);
  }

  async handleToggle() {
    if (!this.hasInitialized) {
      await this.$client.initialize();
      this.hasInitialized = true;
      await this.$client.createRequest({ type: RequestType.Launch }).send();
    }
    this.isVisible = !this.isVisible;
  }

  private onInputCapturingStart() {
    this.isCapturingInput = true;
  }

  private onInputCapturingEnd() {
    this.isCapturingInput = false;
  }
}
</script>
