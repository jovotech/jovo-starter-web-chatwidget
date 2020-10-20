<template>
  <div class="p-8 bg-primary text-white">
    <div class="flex items-center space-x-1 mb-1">
      <h3 class="text-base font-bold">Jovo FAQ Bot</h3>
      <component
        :is="$client.isPlayingAudio ? 'volume-2-icon' : 'volume-icon'"
        size="20"
        stroke-width="1.5"
      />
    </div>
    <p class="text-sm font-light">This is an automated bot trained by the Jovo team.</p>
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
