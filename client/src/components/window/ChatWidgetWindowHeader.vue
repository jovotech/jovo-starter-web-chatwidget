<template>
  <div class="px-8 py-6 bg-primary text-white">
    <h3 class="text-base font-bold">Jovo Sample Bot</h3>
  </div>
</template>

<script lang="ts">
import Volume2Icon from 'vue-feather-icons/icons/Volume2Icon';
import VolumeIcon from 'vue-feather-icons/icons/VolumeIcon';
import { Component, Vue } from 'vue-property-decorator';

@Component({
  name: 'chat-widget-window-header',
  components: {
    VolumeIcon,
    Volume2Icon,
  },
})
export default class ChatWidgetWindowHeader extends Vue {}
</script>
