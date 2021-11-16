import { BaseOutput, Output, OutputOptions, OutputTemplate } from '@jovotech/framework';

export interface RedirectIntroOutputOutputOptions extends OutputOptions {}

@Output()
export class OpenDocumentationOutput extends BaseOutput<RedirectIntroOutputOutputOptions> {
  build(): OutputTemplate | OutputTemplate[] {
    const prompt = 'Do you want me to take you there?';
    return [
      {
        message: `The content of this conversation is fully customizable. Our docs can show you how to update the app logic.`,
      },
      {
        message: prompt,
        reprompt: prompt,
        quickReplies: ['Yes', 'No'],
      },
    ];
  }
}
