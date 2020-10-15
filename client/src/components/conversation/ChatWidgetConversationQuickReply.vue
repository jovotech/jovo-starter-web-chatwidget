<template>
  <div class="inline bg-quickReply rounded-2xl text-blue-600 border border-blue-600 cursor-pointer py-1 px-2">
    {{quickReply}}
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
