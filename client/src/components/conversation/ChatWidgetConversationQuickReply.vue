<template>
  <div>

  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';

@Component({
  name: 'chat-widget-conversation-quick-reply'
})
export default class ChatWidgetConversationQuickReply extends Vue {
  @Prop({required: true, type: String})
  quickReply!: string;
}
</script>

<style scoped lang="scss">

</style>
