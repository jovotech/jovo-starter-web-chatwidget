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
import {
  AudioRecorderEvent,
  RequestType,
  SpeechRecognizerEvent,
  AudioPlayerEvent,
  SpeechSynthesizerEvent,
} from 'jovo-client-web-vue';
import { Component, ProvideReactive, Vue } from 'vue-property-decorator';

@Component({
  name: 'chat-widget',
  components: { ChatWidgetWindow, ChatWidgetToggleButton },
})
export default class ChatWidget extends Vue {
  isVisible = false;
  hasInitialized = false;

  @ProvideReactive('isCapturingInput')
  isCapturingInput = false;

  @ProvideReactive('isOutputtingSound')
  isOutputtingSound = false;

  mounted() {
    this.$client.$audioRecorder.on(AudioRecorderEvent.Start, this.onInputCapturingStart);
    this.$client.$audioRecorder.on(AudioRecorderEvent.Stop, this.onInputCapturingEnd);
    this.$client.$audioRecorder.on(AudioRecorderEvent.Abort, this.onInputCapturingEnd);

    this.$client.$speechRecognizer.on(SpeechRecognizerEvent.Start, this.onInputCapturingStart);
    this.$client.$speechRecognizer.on(SpeechRecognizerEvent.End, this.onInputCapturingEnd);

    this.$client.$audioPlayer.on(AudioPlayerEvent.Play, this.onSoundOutputtingStart);
    this.$client.$audioPlayer.on(AudioPlayerEvent.Resume, this.onSoundOutputtingStart);
    this.$client.$audioPlayer.on(AudioPlayerEvent.Pause, this.onSoundOutputtingEnd);
    this.$client.$audioPlayer.on(AudioPlayerEvent.Stop, this.onSoundOutputtingEnd);
    this.$client.$audioPlayer.on(AudioPlayerEvent.End, this.onSoundOutputtingEnd);

    this.$client.$speechSynthesizer.on(SpeechSynthesizerEvent.Speak, this.onSoundOutputtingStart);
    this.$client.$speechSynthesizer.on(SpeechSynthesizerEvent.Resume, this.onSoundOutputtingStart);
    this.$client.$speechSynthesizer.on(SpeechSynthesizerEvent.Pause, this.onSoundOutputtingEnd);
    this.$client.$speechSynthesizer.on(SpeechSynthesizerEvent.Stop, this.onSoundOutputtingEnd);
    this.$client.$speechSynthesizer.on(SpeechSynthesizerEvent.End, this.onSoundOutputtingEnd);
  }

  beforeDestroy() {
    this.$client.$audioRecorder.off(AudioRecorderEvent.Start, this.onInputCapturingStart);
    this.$client.$audioRecorder.off(AudioRecorderEvent.Stop, this.onInputCapturingEnd);
    this.$client.$audioRecorder.off(AudioRecorderEvent.Abort, this.onInputCapturingEnd);

    this.$client.$speechRecognizer.off(SpeechRecognizerEvent.Start, this.onInputCapturingStart);
    this.$client.$speechRecognizer.off(SpeechRecognizerEvent.End, this.onInputCapturingEnd);

    this.$client.$audioPlayer.off(AudioPlayerEvent.Play, this.onSoundOutputtingStart);
    this.$client.$audioPlayer.off(AudioPlayerEvent.Resume, this.onSoundOutputtingStart);
    this.$client.$audioPlayer.off(AudioPlayerEvent.Pause, this.onSoundOutputtingEnd);
    this.$client.$audioPlayer.off(AudioPlayerEvent.Stop, this.onSoundOutputtingEnd);
    this.$client.$audioPlayer.off(AudioPlayerEvent.End, this.onSoundOutputtingEnd);

    this.$client.$speechSynthesizer.off(SpeechSynthesizerEvent.Speak, this.onSoundOutputtingStart);
    this.$client.$speechSynthesizer.off(SpeechSynthesizerEvent.Resume, this.onSoundOutputtingStart);
    this.$client.$speechSynthesizer.off(SpeechSynthesizerEvent.Pause, this.onSoundOutputtingEnd);
    this.$client.$speechSynthesizer.off(SpeechSynthesizerEvent.Stop, this.onSoundOutputtingEnd);
    this.$client.$speechSynthesizer.off(SpeechSynthesizerEvent.End, this.onSoundOutputtingEnd);
  }

  async handleToggle() {
    if (!this.hasInitialized) {
      await this.$client.initialize();
      this.hasInitialized = true;
      await this.$client.createRequest({ type: RequestType.Launch }).send();
    }
    this.isVisible = !this.isVisible;
  }

  private onSoundOutputtingStart() {
    this.isOutputtingSound = true;
  }

  private onSoundOutputtingEnd() {
    this.isOutputtingSound = false;
  }

  private onInputCapturingStart() {
    this.isCapturingInput = true;
  }

  private onInputCapturingEnd() {
    this.isCapturingInput = false;
  }
}
</script>
