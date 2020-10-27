<template>
  <button
    class="bg-primary w-16 h-16 flex items-center justify-center rounded-full text-white shadow-xl focus:outline-none"
    @click="$emit('click')"
  >
    <transition
      mode="out-in"
      enter-active-class="transition-opacity duration-150"
      leave-active-class="transition-opacity duration-150"
      enter-class="opacity-0"
      leave-to-class="opacity-0"
    >
      <message-circle-icon key="inactive" v-if="!isActive" size="24" />
      <chevron-down-icon key="active" v-else size="24" />
    </transition>
  </button>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import ChevronDownIcon from 'vue-feather-icons/icons/ChevronDownIcon';
import MessageCircleIcon from 'vue-feather-icons/icons/MessageCircleIcon';

@Component({
  name: 'chat-widget-toggle-button',
  components: {
    ChevronDownIcon,
    MessageCircleIcon,
  },
})
export default class ChatWidgetToggleButton extends Vue {
  @Prop({ required: true, type: Boolean })
  isActive!: boolean;
}
</script>
