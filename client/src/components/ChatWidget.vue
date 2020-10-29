<template>
  <div
    class="flex flex-col fixed right-0.5 bottom-0.5 left-0.5 sm:right-2 sm:left-auto sm:bottom-2 sm:max-h-3/4"
    :class="[isVisible ? 'top-0.5 sm:top-auto' : '']"
  >
    <transition
      enter-active-class="transition-opacity duration-300"
      leave-active-class="transition-opacity duration-300"
      enter-class="opacity-0"
      leave-to-class="opacity-0"
    >
      <chat-widget-window
        ref="window"
        v-show="isVisible"
        class="sm:mb-6 flex-1 overflow-y-hidden"
      />
    </transition>
    <chat-widget-toggle-button
      class="ml-auto flex-shrink-0"
      :class="[isVisible ? 'hidden sm:flex' : '']"
      :is-active="isVisible"
      @click="handleToggle"
    />
  </div>
</template>

<script lang="ts">
import ChatWidgetToggleButton from '@/components/ChatWidgetToggleButton.vue';
import ChatWidgetWindow from '@/components/window/ChatWidgetWindow.vue';
import { RequestType, ClientEvent, ActionType, Action } from 'jovo-client-web-vue';
import { Component, Vue } from 'vue-property-decorator';

@Component({
  name: 'chat-widget',
  components: { ChatWidgetWindow, ChatWidgetToggleButton },
})
export default class ChatWidget extends Vue {
  isVisible = false;

  async mounted() {
    this.$client.on(ClientEvent.Action, this.onAction);
  }

  async handleToggle() {
    if (!this.$client.isInitialized) {
      await this.$client.initialize();
      await this.$client.createRequest({ type: RequestType.Launch }).send();
    }
    this.isVisible = !this.isVisible;
    await this.$nextTick();
    if (this.isVisible) {
      // eslint-disable-next-line
      (this.$refs.window as any).focusTextInput();
    }
  }

  private onAction(action: Action) {
    if (action.type === ActionType.Custom) {
      switch (action.command) {
        case 'redirect': {
          setTimeout(() => {
            window.open(action.value);
          }, 800);
          break;
        }
        default:
      }
    }
  }
}
</script>
